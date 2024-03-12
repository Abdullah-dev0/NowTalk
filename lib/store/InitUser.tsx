"use client";
import { User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { useUser } from "./user";
export const InitUser = ({ user }: { user: User | undefined }) => {
   const userRef = useRef(false);

   useEffect(() => {
      if (!userRef.current) {
         useUser.setState({ user });
      }
      userRef.current = true;
      // eslint-disable-next-line
   }, []);

   return <></>;
};
