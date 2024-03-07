import { Sidebar } from "@/app/_components/sidebar";
import WorkFlow from "@/app/_components/workflow/work-flow";

import "reactflow/dist/style.css";

const RootPage = async () => {
  return (
    <div className="RootPage flex h-[calc(100%-64px)]  ">
      <div className="sidebar-div inset-y-0  h-full w-20 flex-col  md:flex ">
        <Sidebar isPro={false} />
      </div>
      <div className=" w-full pb-6">
        <WorkFlow />
        {/* <DemoPage /> */}
        {/* <MsgList /> */}
      </div>
    </div>
  );
};

export default RootPage;
