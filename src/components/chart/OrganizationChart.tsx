"use client"

import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
} from 'reactflow';
import type { Node, Edge, Connection, NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import { EmployeeNode, type EmployeeNodeData } from './EmployeeNode';
import type { Employee } from '../../services/employeeService';

interface OrganizationChartProps {
  employees: Employee[];
  expandedNodes: Set<string>;
  onToggleNode: (nodeId: string) => void;
}

const nodeTypes: NodeTypes = {
  employee: EmployeeNode,
};

export const OrganizationChart: React.FC<OrganizationChartProps> = ({
  employees,
  expandedNodes,
  onToggleNode
}) => {
  // Convert service employees to chart format
  const chartEmployees: EmployeeNodeData[] = employees.map(emp => ({
    id: emp.id,
    name: emp.name,
    title: emp.jobTitle || 'Employee',
    teamCount: 0, // This should come from the service data
    initial: emp.name.charAt(0).toUpperCase(),
    isSelected: false,
    isExpanded: expandedNodes.has(emp.id),
    onToggleExpand: onToggleNode,
    nodeId: emp.id,
  }));

  // Define initial nodes with positions
  const initialNodes: Node[] = chartEmployees.map((emp, index) => ({
    id: emp.id,
    type: 'employee',
    position: { 
      x: (index % 4) * 300 + 100, 
      y: Math.floor(index / 4) * 200 + 100 
    },
    data: emp
  }));

  // Define edges (connections) - this should be dynamic based on actual org structure
  const initialEdges: Edge[] = [
    // Placeholder edges - should be generated from actual org structure
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when expanded state changes
  useEffect(() => {
    const updatedNodes = initialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isExpanded: expandedNodes.has(node.id),
        onToggleExpand: onToggleNode,
        nodeId: node.id,
      }
    }));
    setNodes(updatedNodes);
  }, [expandedNodes, onToggleNode, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-[600px] lg:h-[800px] w-full border border-gray-200 rounded-lg bg-white overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </div>
  );
};
