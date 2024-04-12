import { Github, HeartCrackIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const SocialLinks = () => {
   return (
      <div className="absolute top-1/2 right-20 lg:block hidden ">
         <p className="text-lg leading-4">Developed By ❤️</p>
         <p className="w-36 bg-green-600 h-1"></p>
         <div className="flex gap-6 mt-4">
            <span>
               <Link href={"https://github.com/Abdullah-dev0"} target="_blank">
                  <Github size={27} />
               </Link>
            </span>
            <span>
               <Link
                  href={"https://www.linkedin.com/in/abdullah14200"}
                  target="_blank"
               >
                  <Linkedin size={27} />
               </Link>
            </span>
            <span>
               <Link href={"https://twitter.com/abdu_lah14"} target="_blank">
                  <Twitter size={27} />
               </Link>
            </span>
         </div>
      </div>
   );
};

export default SocialLinks;
