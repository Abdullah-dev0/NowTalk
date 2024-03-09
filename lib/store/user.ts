import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type Users = {
   user: User | undefined;
};

export const useUser = create<Users>()((set) => ({
   user: undefined,
}));
