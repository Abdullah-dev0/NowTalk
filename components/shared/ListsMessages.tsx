"use client";
import { Imessage, useMessage } from "@/lib/store/messages";
import supabaseBrowser from "@/lib/supabase/Client";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import DeleteAction, { EditAction } from "./ActionButtons";
import Messages from "./Messages";
import SeeMore from "./SeeMore";

const ListsMessages = () => {
   const messages = useMessage((state) => state.messages);
   const { optimizeIds } = useMessage((state) => state);
   const removeMessage = useMessage((state) => state.removeMessage);
   const editMessage = useMessage((state) => state.editMessage);
   const { addMessage } = useMessage((state) => state);
   const [notification, setNotification] = useState<number>(0);
   const scrollRef = useRef<HTMLDivElement>(null);
   const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
   const [userScrolled, setUserScrolled] = useState<boolean>(false);

   setTimeout(() => {
      setShowSeeMore(true);
   }, 2000);

   
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
               const scrollContainer = scrollRef.current;
               if (
                  scrollContainer &&
                  scrollContainer.scrollTop <
                     scrollContainer.scrollHeight -
                        scrollContainer.clientHeight -
                        10
               ) {
                  setNotification((current) => current + 1);
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
      if (scrollRef.current && !userScrolled) {
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   }, [messages]);

   const scrollhandler = () => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
         const isScroll =
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
         setUserScrolled(isScroll);
         if (
            scrollContainer.scrollTop ===
            scrollContainer.scrollHeight - scrollContainer.clientHeight
         ) {
            setNotification(0);
         }
      }
   };
   const scrollDown = () => {
      if (scrollRef.current) {
         setNotification(0);
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   };

   return (
      <>
         <div
            className="p-5 flex flex-col  flex-1 h-full overflow-y-auto"
            ref={scrollRef}
            onScroll={scrollhandler}
         >
            <div className="flex-1 pb-5">{showSeeMore && <SeeMore />}</div>
            <div className="space-y-7">
               {messages.map((item, index) => (
                  <Messages message={item} key={index} />
               ))}
            </div>
            <DeleteAction />
            <EditAction />
         </div>

         {userScrolled && (
            <div className=" absolute bottom-20 w-full">
               {notification ? (
                  <div
                     className="w-36 mx-auto bg-indigo-500 p-2 text-white  rounded-md cursor-pointer"
                     onClick={scrollDown}
                  >
                     <h1>New {notification} messages</h1>
                  </div>
               ) : (
                  <div
                     className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex text-white mx-auto border cursor-pointer hover:scale-110 transition-all"
                     onClick={scrollDown}
                  >
                     <ArrowDown />
                  </div>
               )}
            </div>
         )}
      </>
   );
};

export default ListsMessages;
