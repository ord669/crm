"use client";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange, // Import EdgeChange type
  Connection, // Make sure to import Connection type
} from "reactflow";
import CustomEdge from "./CustomEdge";

import "reactflow/dist/style.css";
import TextUpdaterNode from "./template";

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

const nodeTypes = { textUpdater: TextUpdaterNode };

export default function WorkFlow() {
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  console.log("nodes: ", nodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  console.log("edges: ", edges);
  const [days, setDays] = useState(0);
  console.log("days: ", days);

  const edgeTypes = {
    "custom-edge": (edgeProps: any) => (
      <CustomEdge {...edgeProps} days={days} setDays={setDays} />
    ),
  };
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  // Correct the type for edge changes to EdgeChange[]
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  // Correctly annotate the type for the connection parameter as Connection
  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
