"use client";
import { useUser } from "@/lib/store/user";
import supabaseBrowser from "@/lib/supabase/Client";
import { useEffect, useState } from "react";

function OnlinePresence() {
   const supabase = supabaseBrowser();
   const user = useUser((state) => state.user);
   const [online, setOnlineUsers] = useState<number>(0);
   useEffect(() => {
      console.log("user", user);
      const channel = supabase.channel("room1");
      channel
         .on("presence", { event: "sync" }, () => {
            const userIds = [];
            
            for (const id in channel.presenceState()) {
               // @ts-ignore
               userIds.push(channel.presenceState()[id][0].user_id);
            }
            setOnlineUsers([...new Set(userIds)].length);
         })
         .subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
               await channel.track({
                  online_at: new Date().toISOString(),
                  user_id: user?.id,
               });
            }
         });
   }, [user]);
   if (!user) return null;
   return (
      <div className="flex gap-2 mt-1 items-center">
         <div className="bg-green-900 h-4 w-4 rounded-full animate-pulse"></div>
         <h1 className="text-sm">{online} online</h1>
      </div>
   );
}

export default OnlinePresence;
