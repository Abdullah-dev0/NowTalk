"use client";
import { Imessage, useMessage } from "@/lib/store/messages";
import supabaseBrowser from "@/lib/supabase/Client";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import DeleteAction, { EditAction } from "./ActionButtons";
import Messages from "./Messages";

const ListsMessages = () => {
   const messages = useMessage((state) => state.messages);
   const { optimizeIds } = useMessage((state) => state);
   const removeMessage = useMessage((state) => state.removeMessage);
   const editMessage = useMessage((state) => state.editMessage);
   const { addMessage } = useMessage((state) => state);
   const scrollRef = useRef<HTMLDivElement>(null);
   const [userScrolled, setUserScrolled] = useState<boolean>(false);
   useEffect(() => {
      const supabase = supabaseBrowser();
      const channel = supabase
         .channel("chat-room")
         .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            async (payload) => {
               if (!optimizeIds.includes(payload.new.id)) {
                  const { data, error } = await supabase
                     .from("users")
                     .select("*")
                     .eq("id", payload.new.sent_by)
                     .single();

                  if (error) {
                     toast.error(error.message);
                  } else {
                     const newMessage = {
                        ...payload.new,
                        users: data,
                     };
                     addMessage(newMessage as unknown as Imessage);
                  }
               }
            }
         )
         .on(
            "postgres_changes",
            {
               event: "DELETE",
               schema: "public",
               table: "messages",
            },
            (payload) => {
               removeMessage(payload.old.id);
            }
         )
         .on(
            "postgres_changes",
            {
               event: "UPDATE",
               schema: "public",
               table: "messages",
            },
            (payload) => {
               editMessage(payload.new as Imessage);
            }
         )
         .subscribe();

      return () => {
         channel.unsubscribe();
      };
   }, [messages]);

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   }, [messages]);

   const scrollhandler = () => {
      if (scrollRef.current) {
         const isscroll =
            scrollRef.current.scrollTop <
            scrollRef.current.scrollHeight -
               scrollRef.current.clientHeight -
               10;
         setUserScrolled(isscroll);
      }
   };
   const scrollDown = () => {
      if (scrollRef.current) {
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   };

   return (
      <div
         className="p-5 flex flex-col flex-1 h-full overflow-y-auto"
         ref={scrollRef}
         onScroll={scrollhandler}
      >
         <div className="flex-1"></div>
         <div className="space-y-7">
            {messages.map((item, index) => (
               <Messages message={item} key={index} />
            ))}
         </div>
         {userScrolled && (
            <div className="absolute md:bottom-32 bottom-20 right-1/2 ">
               <div
                  className="w-8 bg-blue-600 hover:scale-110 transition-all text-white rounded-full flex justify-center items-center cursor-pointer  h-8 mx-auto"
                  onClick={scrollDown}
               >
                  <ArrowDown />
               </div>
            </div>
         )}
         <DeleteAction />
         <EditAction />
      </div>
   );
};

export default ListsMessages;
