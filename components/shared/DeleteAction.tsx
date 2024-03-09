"use client";
import {
   AlertDialog,
   AlertDialogTrigger,
   AlertDialogContent,
   AlertDialogTitle,
   AlertDialogDescription,
   AlertDialogCancel,
   AlertDialogAction,
} from "../ui/alert-dialog";
import React from "react";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";
import { useMessage } from "@/lib/store/messages";
import supabaseBrowser from "@/lib/supabase/Client";
import { toast } from "sonner";

const DeleteAction = () => {
   const message = useMessage((state) => state.actionMessage);
   const optimizeMessage = useMessage((state) => state.optimizeMessage);
   const handleDeleteMessage = async () => {
      const supabase = supabaseBrowser();
      optimizeMessage(message?.id!);
      const { error } = await supabase
         .from("messages")
         .delete()
         .eq("id", message?.id!);

      if (error) {
         toast.error(error.message);
      } else {
         toast.success("Successfully delete a message");
      }
   };
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <button id="delete-trigger"></button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleDeleteMessage}>
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteAction;
