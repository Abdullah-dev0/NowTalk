import ChatHeader from "@/components/shared/ChatHeader";
import { ToggleButton } from "@/components/shared/ToggleButton";
import supabaseServer from "@/lib/supabase/server";
export default async function Home() {
   let supabase = await supabaseServer();
   const { data } = await supabase.auth.getSession();

   return (
      <div className="max-w-3xl h-screen mx-auto md:py-10 ">
         <div className="h-full border rounded-md ">
            <ChatHeader user={data.session?.user} />
         </div>
      </div>
   );
}
