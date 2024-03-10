import { create } from "zustand";

export type Imessage = {
   created_at: string;
   id: string;
   is_edit: boolean;
   sent_by: string | undefined;
   text: string;
   users:
      | {
           avatar_url: string;
           created_at: string;
           display_name: string;
           id: string;
        }[];
};

interface MessageState {
   messages: Imessage[];
   optimizeIds: string[];
   setOptimizeIds: (ids: string) => void;
   addMessage: (message: Imessage) => void;
   actionMessage: Imessage | undefined;
   setActionMessage: (message: Imessage) => void;
   optimizeMessage: (messageId: string) => void;
   removeMessage: (id: string) => void;
   editMessage: (message: Imessage) => void;
}

export const useMessage = create<MessageState>()((set) => ({
   messages: [],
   optimizeIds: [],
   actionMessage: undefined,
   setOptimizeIds: (ids) =>
      set((state) => ({ optimizeIds: [...state.optimizeIds, ids] })),
   addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),

   optimizeMessage: (messageId) =>
      set((state) => ({
         messages: state.messages.filter((message) => message.id !== messageId),
      })),
   setActionMessage: (message) => set(() => ({ actionMessage: message })),
   removeMessage: (id) =>
      set((state) => ({
         messages: state.messages.filter((message) => message.id !== id),
      })),
   editMessage: (message) =>
      set((state) => ({
         messages: state.messages.filter((item) => {
            if (item.id === message.id) {
               item.text = message.text;
               item.is_edit = message.is_edit;
            }
            return item;
         }),
      })),
}));
