"use client";
import supabaseBrowser from "@/lib/supabase/Client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Spinner from "./Spinner";
import { ToggleButton } from "./ToggleButton";
import OnlinePresence from "./OnlinePresence";

const ChatHeader = ({ user }: { user: User | undefined }) => {
   const [loading, setLoading] = React.useState(false);
   const Router = useRouter();
   const handleLoginWithGithub = () => {
      try {
         setLoading(true);
         const supabase = supabaseBrowser();
         supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
               redirectTo: location.origin + "/auth/callback",
            },
         });
         setLoading(false);
      } catch (error) {
         console.log("error", error);
         setLoading(false);
      }
   };

   const handleLogout = async () => {
      try {
         setLoading(true);
         const supabase = supabaseBrowser();
         await supabase.auth.signOut();
         Router.refresh();
         setLoading(false);
      } catch (error) {
         setLoading(false);
         console.log("error", error);
      }
   };
   return (
      <div className="h-20">
         <div className="border-b p-5 h-full flex items-center justify-between">
            <div>
               <h1 className="text-[1.3rem] font-medium">NowChat</h1>
               {user && <OnlinePresence />}
            </div>

            <div className="flex gap-4">
               <ToggleButton />
               {user ? (
                  <Button
                     disabled={loading}
                     className={`${
                        loading ? "cursor-not-allowed opacity-50" : ""
                     }`}
                     onClick={handleLogout}
                  >
                     {loading && <Spinner />}
                     Logout
                  </Button>
               ) : (
                  <>
                     <Button
                        disabled={loading}
                        className={`${
                           loading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        onClick={handleLoginWithGithub}
                     >
                        {loading && <Spinner />}
                        Sign in
                     </Button>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default ChatHeader;
