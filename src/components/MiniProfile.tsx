import { Database } from "@/types/supabase";
import { useErrorsContext } from "@/components/context/errors";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import AvatarImg from "@/components/AvatarImg";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const MiniProfile = () => {
  const { add: addError } = useErrorsContext();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!user) return;

        let { data, error } = await supabase
          .from("profiles")
          .select(`username, avatar_url`)
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      } catch (err: unknown) {
        if (err instanceof Error) addError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [user, supabase]);

  if (!user || loading) {
    return (
      <span className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white">
        Loading...
      </span>
    );
  }

  return (
    <a
      href="#"
      className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-800"
    >
      <AvatarImg uid={user!.id} url={avatar_url} size={32} />
      <span className="sr-only">Your profile</span>
      <span aria-hidden="true">{username || user.email}</span>
    </a>
  );
};

export default MiniProfile;
