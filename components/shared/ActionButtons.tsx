"use client";
import { Imessage, useMessage } from "@/lib/store/messages";
import supabaseBrowser from "@/lib/supabase/Client";
import { useRef } from "react";
import { toast } from "sonner";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

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

export const EditAction = () => {
   const message = useMessage((state) => state.actionMessage);
   const editMessage = useMessage((state) => state.editMessage);
   const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
   const editHandler = async () => {
      const text = inputRef.current?.value.trim();
      if (text) {
         const supabase = supabaseBrowser();
         const { error } = await supabase
            .from("messages")
            .update({ text, is_edit: true })
            .eq("id", message?.id!);
         editMessage({ ...message, text, is_edit: true } as Imessage);
         document.getElementById("edit-trigger")?.click();
         if (error) {
            toast.error(error.message);
         } else {
            toast.success("Successfully Updated a message");
         }
      } else {
         document.getElementById("edit-trigger")?.click();
         document.getElementById("delete-trigger")?.click();
      }
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <button id="edit-trigger"></button>
         </DialogTrigger>
         <DialogContent className="w-full">
            <DialogHeader>
               <DialogTitle>Edit Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
               <Input defaultValue={message?.text} ref={inputRef} />
            </div>
            <DialogFooter>
               <Button type="submit" onClick={editHandler}>
                  Save changes
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
