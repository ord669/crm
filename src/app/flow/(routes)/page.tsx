import DemoPage from "@/app/_components/contacts-table/table-page";
import MsgList from "@/app/_components/msg-list";
import { Sidebar } from "@/app/_components/sidebar";
import WorkFlow from "@/app/_components/workflow/work-flow";
import { msgService } from "@/server/api/services/msg.service";
import { Message } from "@prisma/client";

import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}
interface FirstMessageRecord {
  [key: number]: Message;
}

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

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
