import React, { Suspense } from "react";
import ListsMessages from "./ListsMessages";
import supabaseServer from "@/lib/supabase/server";

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
            <ListsMessages userdata={data} />
         </Suspense>
      </>
   );
};

export default ChatMessages;
