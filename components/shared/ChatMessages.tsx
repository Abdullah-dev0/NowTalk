import React, { Suspense } from "react";
import ListsMessages from "./ListsMessages";
import supabaseServer from "@/lib/supabase/server";
import { InitMessages } from "@/lib/store/InitMessages";

const ChatMessages = async () => {
   const supabase = await supabaseServer();

   const { data, error } = await supabase.from("messages").select(`
    *,
    users (
      *
    )
  `);
   if (error) console.log("error", error);
   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <ListsMessages />
            <InitMessages messages={data || []} />
         </Suspense>
      </>
   );
};

export default ChatMessages;
