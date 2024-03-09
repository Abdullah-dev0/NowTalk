import ToggleButton from "@/components/ToggleButton";
import { Button } from "@/components/ui/button";
export default function Home() {
   return (
      <div className="max-w-3xl h-screen mx-auto md:py-10 ">
         <div className="h-full border rounded-md ">
            <div className="h-20">
               <div className="border-b p-5 flex items-center justify-between">
                  <div>
                     <h1 className="text-2xl font-bold">NowTalk</h1>
                     <div className="flex gap-2 mt-1 items-center">
                        <div className="bg-green-700 h-4 w-4 rounded-full animate-pulse"></div>
                        <h1 className="text-sm">2 online</h1>
                     </div>
                  </div>
                  <Button>Sign in</Button>
               </div>
            </div>
         </div>
      </div>
   );
}
