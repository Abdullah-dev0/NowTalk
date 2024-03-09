import { InitMessages } from "@/lib/store/InitMessages";
import supabaseServer from "@/lib/supabase/server";
import { Suspense } from "react";
import ListsMessages from "./ListsMessages";

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
