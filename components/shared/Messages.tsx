import React from "react";
import Image from "next/image";
const Messages = ({ item }: any) => {
   return (
      <>
         <div className="flex gap-2">
            <div>
               <Image
                  src={item.users.avatar_url}
                  width={30}
                  height={30}
                  className="rounded-full ring-2"
                  alt="avatar"
               />
            </div>
            <div className="flex-1">
               <div className="flex gap-2">
                  <h1>{item.users.display_name}</h1>
                  <h1>{new Date(item.created_at).toDateString()}</h1>
               </div>
               <p className="text-sm text-slate-200">{item.text}</p>
            </div>
         </div>
      </>
   );
};

export default Messages;
