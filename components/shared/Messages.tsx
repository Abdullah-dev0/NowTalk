import { Imessage, useMessage } from "@/lib/store/messages";
import { useUser } from "@/lib/store/user";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Messages = ({ message }: { message: any }) => {
   const user = useUser((state) => state.user);
   return (
      <>
         <div className="flex gap-2">
            <div>
               <Image
                  src={message.users?.avatar_url}
                  width={30}
                  height={30}
                  className="rounded-full ring-2"
                  alt="avatar"
               />
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-center">
                  <div className="flex flex-col sm:flex-row   sm:gap-2 sm:items-center">
                     <h1>{message.users?.display_name}</h1>
                     <h1 className="text-[13px] font-light">
                        {new Date(message.created_at).toDateString()}
                     </h1>
                     <h1 className="text-xs text-slate-400">
                        {message.is_edit && "edited"}
                     </h1>
                  </div>
                  {message.users?.id === user?.id && (
                     <ActionButtons message={message} />
                  )}
               </div>
               <p className="text-sm dark:text-slate-100 text-slate-700">
                  {message.text}
               </p>
            </div>
         </div>
      </>
   );
};

export default Messages;

const ActionButtons = ({ message }: { message: Imessage }) => {
   const setActionMessage = useMessage((state) => state.setActionMessage);
   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger>
               <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuLabel>Actions</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  onClick={() => {
                     document.getElementById("delete-trigger")?.click();
                     setActionMessage(message);
                  }}
               >
                  Delete
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => {
                     document.getElementById("edit-trigger")?.click();
                     setActionMessage(message);
                  }}
               >
                  Edit
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};
