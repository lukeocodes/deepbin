import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  url,
  size,
}: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
}) {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
  const [blobUrlCache, setBlobUrlCache] = useState<Record<string, string>>({});

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        if (blobUrlCache[path]) {
          setAvatarUrl(blobUrlCache[path]);
          return;
        }

        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
        setBlobUrlCache((prevCache) => ({ ...prevCache, [path]: url }));
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase.storage, blobUrlCache]);

  return (
    <>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="h-8 w-8 rounded-full bg-zinc-800"
          style={{ height: size, width: size }}
        />
      ) : (
        <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
    </>
  );
}
