"use client"

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  Controls,
} from 'reactflow';
import type { Node, Edge, Connection, NodeTypes, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { EmployeeNode } from './EmployeeNode';
import type { Employee } from '../../services/employeeService';

interface OrganizationChartProps {
  employees: Employee[];
  onToggleNode: (nodeId: string) => void;
}

const nodeTypes: NodeTypes = {
  employee: EmployeeNode,
};

export const OrganizationChart: React.FC<OrganizationChartProps> = ({ employees }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Find CEO (employee with no manager or manager is '-')
  const findCEO = useCallback((employees: Employee[]): Employee | null => {
    return employees.find(emp => emp.manager === '-' || !emp.manager) || employees[0] || null;
  }, []);

  // Find direct reports by matching manager name (partial match for flexibility)
  const findDirectReports = useCallback((employees: Employee[], managerName: string): Employee[] => {
    return employees.filter(emp => {
      if (!emp.manager || emp.manager === '-') return false;
      
      // Exact match
      if (emp.manager === managerName) return true;
      
      // Partial match (first name)
      const managerFirstName = managerName.split(' ')[0];
      const empManagerFirstName = emp.manager.split(' ')[0];
      if (managerFirstName === empManagerFirstName) return true;
      
      // Check if manager name is contained in emp.manager
      if (emp.manager.includes(managerName.split(' ')[0])) return true;
      
      return false;
    });
  }, []);

  // Toggle node expansion
  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Build complete hierarchy tree recursively
  const buildHierarchy = useCallback((employees: Employee[], manager: Employee, level: number = 0, parentX: number = 0): { nodes: Node[], edges: Edge[], nodeCount: number } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let nodeCount = 0;

    // Create current manager node
    const currentNode: Node = {
      id: `node-${manager.id}`,
      type: 'employee',
      position: { x: parentX, y: level * 200 },
      data: {
        id: manager.id,
        name: manager.name,
        title: manager.jobTitle,
        teamCount: 0, // Will be updated
        initial: manager.avatarInitial || manager.name.split(' ').map(n => n[0]).join(''),
        isSelected: false,
        isExpanded: expandedNodes.has(manager.id),
        onToggleExpand: toggleNode,
        nodeId: manager.id
      }
    };
    nodes.push(currentNode);
    nodeCount++;

    // Find direct reports
    const directReports = findDirectReports(employees, manager.name);
    
    if (directReports.length > 0) {
      // Update count
      currentNode.data.teamCount = directReports.length;
      
      // Only show children if this node is expanded
      if (expandedNodes.has(manager.id)) {
        // Position children
        const childSpacing = 300;
        const startX = parentX - ((directReports.length - 1) * childSpacing) / 2;
        
        directReports.forEach((report, index) => {
          const childX = startX + (index * childSpacing);
          
          // Recursively build hierarchy for this child
          const childHierarchy = buildHierarchy(employees, report, level + 1, childX);
          
          // Add child nodes and edges
          nodes.push(...childHierarchy.nodes);
          edges.push(...childHierarchy.edges);
          nodeCount += childHierarchy.nodeCount;
          
          // Create edge from current node to child
          edges.push({
            id: `edge-${manager.id}-${report.id}`,
            source: `node-${manager.id}`,
            target: `node-${report.id}`,
            type: 'smoothstep',
            markerEnd: {
              type: 'arrowclosed' as MarkerType,
              color: '#6B7280',
            },
            style: { stroke: '#6B7280', strokeWidth: 2 }
          });
        });
      }
    }

    return { nodes, edges, nodeCount };
  }, [findDirectReports, expandedNodes, toggleNode]);

  // Create complete organization chart
  const createOrgChart = useCallback((employees: Employee[]) => {
    if (employees.length === 0) return { nodes: [], edges: [] };

    const ceo = findCEO(employees);
    if (!ceo) return { nodes: [], edges: [] };

    // Build complete hierarchy starting from CEO
    const hierarchy = buildHierarchy(employees, ceo, 0, 400);
    
    return { nodes: hierarchy.nodes, edges: hierarchy.edges };
  }, [findCEO, buildHierarchy]);

  // Update nodes and edges when employees or expanded nodes change
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = createOrgChart(employees);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [employees, expandedNodes, createOrgChart, setNodes, setEdges]);

  // Initialize with CEO expanded
  useEffect(() => {
    const ceo = findCEO(employees);
    if (ceo) {
      setExpandedNodes(new Set([ceo.id]));
    }
  }, [employees, findCEO]);

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
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
};