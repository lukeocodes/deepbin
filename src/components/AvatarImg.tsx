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
          // className="avatar image "
          className="h-8 w-8 rounded-full bg-gray-800"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
    </>
  );
}
