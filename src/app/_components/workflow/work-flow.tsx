"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import CustomEdge from "./CustomEdge";

import "reactflow/dist/style.css";
import TextUpdaterNode from "./template";
import { api } from "@/trpc/react";
import { Button } from "../ui/button";

interface CustomNodeData {
  value: number;
}

type CustomNode = Node<CustomNodeData>;

const initialNodes: CustomNode[] = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "node-2",
    type: "textUpdater",
    position: { x: 450, y: 450 },
    data: { value: 1234 },
  },
];

let nodeTypes: any = { textUpdater: TextUpdaterNode };

let id = 1;
const getId = () => `${id++}`;
const WorkFlow = () => {
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  console.log("nodes: ", nodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  console.log("edges: ", edges);
  const [days, setDays] = useState(0);
  const [template, setTemplate] = useState("");
  console.log("days: ", days);
  const [time, setTime] = useState("10:00");
  const [workflow, setWorkflow] = useState();

  useEffect(() => {
    nodeTypes = {
      textUpdater: (nodeProps: any) => (
        <TextUpdaterNode {...nodeProps} time={time} setTime={setTime} />
      ),
    };
  }, [time, setTime]);

  const { mutate, isLoading, error } = api.cron.create.useMutation();

  const createCronJob = (
    hours: string,
    minutes: string,
    template: string,
    contactId: string,
  ) => {
    mutate({
      hours,
      minutes,
      template,
      contactId,
    });
  };

  const edgeTypes = {
    "custom-edge": (edgeProps: any) => (
      <CustomEdge
        {...edgeProps}
        days={days}
        setDays={setDays}
        setTemplate={setTemplate}
      />
    ),
  };
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, type: "custom-edge" };
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          type: "textUpdater", // Specify the node type here
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          // Ensure the data structure matches what TextUpdaterNode expects
          data: { value: 123 }, // You might want to customize this value
        };

        setNodes((nds) => nds.concat(newNode));
        // Note: You may not need to automatically connect the new node to the previous node
        // But if you do, make sure to create a valid edge here.
      }
    },
    [screenToFlowPosition, setNodes],
  );

  const [hours, minutes] = time.split(":");
  function postCron(
    hours: string,
    minutes: string,
    template: string,
    contactId: string,
  ) {
    createCronJob(hours, minutes, template, contactId);
  }
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="wrapper"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        {hours && minutes && (
          <Panel
            onClick={() => postCron(hours, minutes, template, contactId)}
            position="top-center"
          >
            Save
          </Panel>
        )}

        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <WorkFlow />
  </ReactFlowProvider>
);
