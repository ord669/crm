import { Sidebar } from "@/app/_components/sidebar";
import { msgService } from "@/server/api/services/msg.service";

import { Message } from "@prisma/client";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}
interface FirstMessageRecord {
  [key: number]: Message;
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const msgs = await msgService.getAll();
  console.log("msgs: ", msgs.length);
  const incomingMsgs = msgs.reduce((accumulator: Message[], message) => {
    if (message.traffic === "incoming") {
      accumulator.push(message);
    }
    return accumulator;
  }, []);
  console.log("incomingMsgs: ", incomingMsgs.length);
  // Helper function to sort messages by createdAt
  const sortByCreatedAt = (a: Message, b: Message) =>
    a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0;

  // Sort incoming messages by createdAt to ensure we're processing them in order
  const sortedIncomingMsgs = incomingMsgs.sort(sortByCreatedAt);

  const firstMessageTimeByContact = sortedIncomingMsgs.reduce(
    (acc: FirstMessageRecord, message) => {
      const existingMessage = acc[message.contactId];
      // Ensure the message exists and has a createdAt before comparing
      if (!existingMessage || existingMessage.createdAt > message.createdAt) {
        acc[message.contactId] = message;
      }
      return acc;
    },
    {},
  );
  // If you need just the timestamps (now createdAts) and not the entire message objects, you can map this object:
  const firstCreatedAtByContact: { [contactId: number]: Date } = Object.keys(
    firstMessageTimeByContact,
  ).reduce<{ [contactId: number]: Date }>((acc, contactIdStr) => {
    const contactId = Number(contactIdStr);
    const message = firstMessageTimeByContact[contactId];
    // Ensure message exists before attempting to access its properties
    if (message) {
      acc[contactId] = message.createdAt;
    }
    return acc;
  }, {});

  // console.log(firstCreatedAtByContact);
  const createdAtArray: Date[] = Object.values(firstCreatedAtByContact);
  console.log("createdAtArray: ", createdAtArray.length);

  return (
    <div className="RootPage flex h-[calc(100%-64px)]  ">
      <div className="sidebar-div inset-y-0  h-full w-20 flex-col  md:flex ">
        <Sidebar isPro={false} />
      </div>
      <div className=" w-full pb-6">
        {createdAtArray && <p>{createdAtArray.toString()}</p>}
        {/* <DemoPage /> */}
        {/* <MsgList /> */}
      </div>
    </div>
  );
};

export default RootPage;
