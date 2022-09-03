import { Session } from "@supabase/supabase-js";
import { supabase } from "src/lib/supabase/supabase";

export const useGetUserId = () => {
  const session: Session | null = supabase.auth.session();
  return session ? session.user!.id : null;
};
