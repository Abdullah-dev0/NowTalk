"use client";
import { useRef, useEffect } from "react";
import { Imessage, useMessage } from "./messages";

export const InitMessages = ({ messages }: { messages: Imessage[] }) => {
   const messagesRef = useRef(false);

   useEffect(() => {
      if (!messagesRef.current) {
         useMessage.setState({ messages });
      }
      messagesRef.current = true;
   }, []);
   return <></>;
};
