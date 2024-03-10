import { InitMessages } from "@/lib/store/InitMessages";
import supabaseServer from "@/lib/supabase/server";
import { Suspense } from "react";
import ListsMessages from "./ListsMessages";
import Spinner from "./Spinner";

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
         <Suspense
            fallback={
               <div className="flex justify-center items-center h-50vh">
                  <Spinner />
               </div>
            }
         >
            <ListsMessages />
            <InitMessages messages={data || []} />
         </Suspense>
      </>
   );
};

export default ChatMessages;
