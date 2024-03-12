"use client";
import { useRef, useEffect } from "react";
import { Imessage, useMessage } from "./messages";
import { LIMIT_MESSAGE } from "@/constant";

export const InitMessages = ({ messages }: { messages: Imessage[] }) => {
   const messagesRef = useRef(false);
   const hasMore = messages.length >= LIMIT_MESSAGE;

   useEffect(() => {
      if (!messagesRef.current) {
         useMessage.setState({ messages, hasMore });
      }
      messagesRef.current = true;
      // eslint-disable-next-line
   }, []);
   return <></>;
};
