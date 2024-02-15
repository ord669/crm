import DemoPage from "@/app/_components/contacts-table/table-page";
import { Sidebar } from "@/app/_components/sidebar";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  return (
    <div className="RootPage flex h-[calc(100%-64px)]  ">
      <div className="sidebar-div inset-y-0  h-full w-20 flex-col  md:flex ">
        <Sidebar isPro={false} />
      </div>
      <div className=" w-full pb-6">
        <DemoPage />
      </div>
    </div>
  );
};

export default RootPage;
