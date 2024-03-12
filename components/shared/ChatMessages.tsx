import React, { Suspense } from "react";
import ListMessages from "./ListsMessages";
import supabaseServer from "@/lib/supabase/server";
import {InitMessages }from "@/lib/store/InitMessages";
import { LIMIT_MESSAGE } from "@/constant/index";

export default async function ChatMessages() {
   const supabase = await supabaseServer();

   const { data } = await supabase
      .from("messages")
      .select("*,users(*)")
      .range(0, LIMIT_MESSAGE)
      .order("created_at", { ascending: false });

   return (
      <Suspense fallback={"loading.."}>
         <ListMessages />
         <InitMessages messages={data?.reverse() || []} />
      </Suspense>
   );
}
