import ContactPreview from "@/app/_components/contact-preview";
import DemoPage from "@/app/_components/contacts-table/table-page";
import { Sidebar } from "@/app/_components/sidebar";
import { api } from "@/trpc/react";

interface ContactIdPageProps {
  params: {
    contactId: number;
  };
}

const RootPage = async ({ params }: ContactIdPageProps) => {
  return (
    <div className="RootPage flex h-[calc(100%-64px)]  ">
      <div className="sidebar-div inset-y-0  h-full w-20 flex-col  md:flex ">
        <Sidebar isPro={false} />
      </div>
      <div className=" w-full pb-6">
        <ContactPreview contactId={params.contactId} />
      </div>
    </div>
  );
};

export default RootPage;
