import AfterLogout from "@/components/shared/Welcome";
import ChatHeader from "@/components/shared/ChatHeader";
import ChatInput from "@/components/shared/ChatInput";
import ChatMessages from "@/components/shared/ChatMessages";
import {InitUser} from "@/lib/store/InitUser";
import supabaseServer from "@/lib/supabase/server";
export default async function Home() {
   let supabase = await supabaseServer();
   const { data } = await supabase.auth.getSession();

   return (
      <>
         <div className="max-w-3xl h-screen mx-auto md:py-10 ">
            <div className="h-full border relative rounded-md flex flex-col">
               <ChatHeader user={data.session?.user} />
               {data.session?.user ? (
                  <>
                     <ChatMessages />
                     <ChatInput />
                  </>
               ) : (
                  <AfterLogout />
               )}
            </div>
         </div>
         <InitUser user={data.session?.user} />
      </>
   );
}
