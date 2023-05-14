import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "@/types/supabase";
import mime from "mime-types";
import crypto from "crypto";
import fetch, { Headers } from "node-fetch";
import multer from "multer";
import { Readable } from "stream";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// const toArrayBuffer = (buffer: any): ArrayBuffer => {
//   const arrayBuffer = new ArrayBuffer(buffer.length);
//   const view = new Uint8Array(arrayBuffer);
//   for (let i = 0; i < buffer.length; ++i) {
//     view[i] = buffer[i];
//   }
//   return arrayBuffer;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, headers: reqHeaders, method: reqMethod, url: reqUrl } = req;

  /**
   * Error if we have no method.
   */
  if (reqMethod === undefined) {
    return res.status(400).json({
      message: "Unknown HTTP method received.",
    });
  }

  /**
   * Error if an invalid request is recieved.
   */
  if (!["POST", "GET", "PUT", "PATCH", "DELETE"].includes(reqMethod)) {
    return res.status(400).json({
      message:
        "Acceptable HTTP methods include `POST`, `GET`, `PUT`, `PATCH`, and `DELETE`.",
    });
  }

  const reqContentType = reqHeaders["content-type"];

  /**
   * Error if we have no content type.
   */
  if (!reqContentType) {
    return res.status(400).json({ message: "Missing content-type" });
  }

  /**
   * Error if an invalid content type is submitted.
   */
  if (
    !reqContentType?.startsWith("audio/") &&
    !reqContentType?.startsWith("video/") &&
    reqContentType !== "application/json"
  ) {
    return res.status(400).json({
      message:
        "Acceptable content types include `audio/*`, `video/*`, and `application/json`.",
    });
  }

  /**
   * With bodyParser disabled, we can fetch both file buffer and JSON.
   */
  let reqBody;

  /**
   * If not JSON, parse the raw stream into a Uint8Array.
   */
  if (reqContentType !== "application/json") {
    const rawRequest = await buffer(req);
    reqBody = new Uint8Array(rawRequest).buffer;
  }

  /**
   * If JSON, parse the raw stream into an object.
   */
  if (reqContentType === "application/json") {
    const rawRequest = await buffer(req);
    reqBody = JSON.parse(rawRequest.toString("utf8"));
  }

  const reqAuthorization = reqHeaders["authorization"];

  /**
   * Error if for some reason we don't have a path.
   */
  if (typeof reqAuthorization !== "string") {
    return res.status(500).json({
      message: `Header required: 'Authorization: Token <your DG key>'`,
    });
  }

  /**
   * Check with supabase for a user that has a matching Authorization token stored.
   * Return an error if it is not associated with a user.
   */

  let dgBody;

  if (reqContentType === "application/json") {
    /**
     * Error if there is no `url` property in the JSON body.
     */
    if (!reqBody.url) {
      return res.status(400).json({
        message: "Missing `url` from the request body.",
      });
    }

    dgBody = reqBody;
  }

  if (
    reqContentType?.startsWith("audio/") ||
    reqContentType?.startsWith("video/")
  ) {
    const ext = mime.extension(reqContentType);
    const fileName = crypto.randomUUID();

    /**
     * Create a supabase client.
     */
    const supabase = createServerSupabaseClient<Database>({
      req,
      res,
    });

    const { data, error } = await supabase.storage
      .from("transcriptionFiles")
      .upload(`${fileName}.${ext}`, reqBody, {
        contentType: reqContentType,
      });

    /**
     * Return an error when a file upload doesn't happen.
     */
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: `Unable to process file into storage: ${fileName}.${ext}`,
      });
    }

    const { path } = data;

    /**
     * Error if for some reason we don't have a path.
     */
    if (path === "") {
      return res.status(500).json({
        message: `Unknown error occured: ${fileName}.${ext}`,
      });
    }

    const {
      data: { publicUrl },
    } = await supabase.storage.from("transcriptionFiles").getPublicUrl(path);

    /**
     * Error if supabase can't give us a public URL.
     */
    if (!publicUrl) {
      return res.status(500).json({
        message: `Unable to fetch public URL for file: ${path}`,
      });
    }

    dgBody = {
      url: `${publicUrl}`,
    };
  }

  const thisPath = "/api/proxy/";
  const apiRoute = reqUrl?.replace(thisPath, "");

  /**
   * Set specific vars for Deepgram request.
   */
  const dgUrl = `https://api.deepgram.com/${apiRoute}`;
  const dgMethod = reqMethod;
  const dgHeaders = new Headers();
  dgHeaders.append("accept", "application/json");
  dgHeaders.append("content-type", "application/json");
  dgHeaders.append("authorization", reqAuthorization);

  const dgRequest = await fetch(dgUrl, {
    method: dgMethod,
    headers: dgHeaders,
    body: JSON.stringify(dgBody),
  });

  return res.status(dgRequest.status).json(await dgRequest.json());
}
