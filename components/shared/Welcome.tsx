import React from "react";

function AfterLogout() {
   return (
      <div className="flex flex-col gap-5 text-center mx-auto w-[30rem]  justify-center items-center h-screen">
         <h1 className="md:text-3xl text-lg">Welcome To NowChat App</h1>
         <p className="text-[16px]">
            This is a chat application that power by supabase realtime db. Login
            to send message
         </p>
      </div>
   );
}

export default AfterLogout;
