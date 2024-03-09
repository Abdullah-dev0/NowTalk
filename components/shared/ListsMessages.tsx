"use client";
import { useMessage } from "@/lib/store/messages";
import Messages from "./Messages";

const ListsMessages = () => {
   const messages = useMessage((state) => state.messages);
   return (
      <div className="p-5 flex flex-col flex-1 h-full overflow-y-auto">
         <div className="flex-1"></div>
         <div className="space-y-7">
            {messages.map((item, index) => (
               <Messages item={item} key={index} />
            ))}
         </div>
      </div>
   );
};

export default ListsMessages;
