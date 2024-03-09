import Messages from "./Messages";

const ListsMessages = ({ userdata }: any) => {
   return (
      <div className="p-5 flex flex-col flex-1 h-full overflow-y-auto">
         <div className="flex-1"></div>
         <div className="space-y-7">
            {userdata.map((item: any, index: number) => (
               <Messages item={item} key={index} />
            ))}
         </div>
      </div>
   );
};

export default ListsMessages;
