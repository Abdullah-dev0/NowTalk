"use client";
import supabaseBrowser from "@/lib/supabase/Client";
import { toast } from "sonner";
import { Input } from "../ui/input";

const ChatInput = () => {
   const sentMessage = async (message: string) => {
      if (!message) return toast.error("Message is required");
      const supabase = supabaseBrowser();
      const { error } = await supabase
         .from("messages")
         .insert({ text: message });
      if (error) {
         toast.error(error.message);
      }
   };
   return (
      <div className="p-5">
         <Input
            required
            placeholder="Sent message"
            onKeyDown={(e) => {
               if (e.key === "Enter") {
                  sentMessage(e.currentTarget.value);
                  e.currentTarget.value = "";
               }
            }}
         />
      </div>
   );
};

export default ChatInput;
