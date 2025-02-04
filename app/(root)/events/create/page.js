import { auth } from "@clerk/nextjs/server";
import EventForm from "@/components/EventForm";

const CreateEvent = async () => {
  const  {userId}  = await auth(); 
  console.log(userId);

  return (
    <>
      <div className="w-full select-none h-20 border-b-2 text-black flex justify-center items-center">
        <h3 className="text-4xl font-bold">Create Event</h3>
      </div>
      <EventForm type="create" userId={userId} />
    </>
  );
};

export default CreateEvent;
