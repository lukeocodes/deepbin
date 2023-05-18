import * as curlconverter from "curlconverter";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const curl = JSON.parse(body);

  return res.status(200).json({
    python: curlconverter.toPython(curl),
    node: curlconverter.toNodeFetch(curl),
    go: curlconverter.toGo(curl),
    ruby: curlconverter.toRuby(curl),
    dotnet: curlconverter.toCSharp(curl),
  });
}
