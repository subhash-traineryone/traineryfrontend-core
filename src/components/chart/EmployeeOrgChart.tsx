"use client"

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
} from 'reactflow';
import type { Node, Edge, Connection, NodeTypes, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { EmployeeNode } from './EmployeeNode';
import type { Employee } from '../../services/employeeService';

interface EmployeeOrgChartProps {
  employee: Employee;
  allEmployees: Employee[];
}

const nodeTypes: NodeTypes = {
  employee: EmployeeNode,
};

export const EmployeeOrgChart: React.FC<EmployeeOrgChartProps> = ({
  employee,
  allEmployees
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Helper function to find manager by name (handles partial name matching)
  const findManagerByName = useCallback((managerName: string) => {
    if (managerName === '-' || !managerName) return null;
    
    // First try exact match
    let manager = allEmployees.find(emp => emp.name === managerName);
    
    // If not found, try partial match (e.g., 'Jean' matches 'Jean Armstrong')
    if (!manager) {
      manager = allEmployees.find(emp => 
        emp.name.toLowerCase().includes(managerName.toLowerCase()) ||
        managerName.toLowerCase().includes(emp.name.toLowerCase())
      );
    }
    
    return manager;
  }, [allEmployees]);

  // Find the top-most manager (CEO or root)
  const findTopManager = useCallback((emp: Employee): Employee => {
    if (emp.manager === '-' || !emp.manager) {
      return emp; // This is the top-level employee
    }
    const manager = findManagerByName(emp.manager);
    return manager ? findTopManager(manager) : emp;
  }, [findManagerByName]);

  // Build complete hierarchy tree
  const buildHierarchy = useCallback((emp: Employee, visited: Set<string> = new Set()): any => {
    if (visited.has(emp.id)) return null; // Prevent infinite loops
    visited.add(emp.id);
    
    const directReports = allEmployees.filter(e => 
      e.manager === emp.name && e.id !== emp.id
    );
    
    return {
      employee: emp,
      directReports: directReports.map(report => buildHierarchy(report, new Set(visited))).filter(Boolean),
      isSelected: emp.id === employee.id
    };
  }, [allEmployees, employee.id]);

  // Initialize expanded nodes with the complete path from top to selected employee
  useEffect(() => {
    const topManager = findTopManager(employee);
    const expandedSet = new Set<string>();
    
    // Add top manager
    expandedSet.add(topManager.id);
    
    // Add all managers in the chain to the selected employee
    let currentEmp = employee;
    while (currentEmp.manager !== '-' && currentEmp.manager) {
      const manager = findManagerByName(currentEmp.manager);
      if (manager) {
        expandedSet.add(manager.id);
        currentEmp = manager;
      } else {
        break;
      }
    }
    
    // Add the selected employee
    expandedSet.add(employee.id);
    
    setExpandedNodes(expandedSet);
  }, [employee, findManagerByName, findTopManager]);

  // Toggle node expansion
  const toggleNodeExpansion = useCallback((nodeId: string) => {
    setExpandedNodes((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Create nodes for the complete hierarchy organization chart
  const createNodes = useCallback((): Node[] => {
    const nodes: Node[] = [];
    const horizontalSpacing = 300;
    const levelHeight = 150;
    
    // Starting position for the top of the hierarchy
    const startX = 400;
    const startY = 100;
    
    // Get the top manager and build hierarchy
    const topManager = findTopManager(employee);
    const hierarchyTree = buildHierarchy(topManager);
    
    if (!hierarchyTree) return nodes;
    
    // Recursive function to create nodes for the hierarchy tree
    const createHierarchyNodes = (hierarchyNode: any, level: number = 0, parentX: number = startX): Node[] => {
      const nodeList: Node[] = [];
      
      if (!hierarchyNode) return nodeList;
      
      const currentY = startY + (level * levelHeight);
      const currentX = parentX;
      
      // Create node for current employee
      const currentNode: Node = {
        id: hierarchyNode.employee.id,
        type: 'employee',
        position: { x: currentX, y: currentY },
        data: {
          id: hierarchyNode.employee.id,
          name: hierarchyNode.employee.name,
          title: hierarchyNode.employee.jobTitle,
          teamCount: hierarchyNode.directReports.length,
          initial: hierarchyNode.employee.avatarInitial,
          isSelected: hierarchyNode.isSelected, // Highlight selected employee
          isExpanded: expandedNodes.has(hierarchyNode.employee.id),
          onToggleExpand: toggleNodeExpansion,
          nodeId: hierarchyNode.employee.id,
        }
      };
      nodeList.push(currentNode);
      
      // Add direct reports if expanded
      if (expandedNodes.has(hierarchyNode.employee.id) && hierarchyNode.directReports.length > 0) {
        const reportsStartX = currentX - (hierarchyNode.directReports.length - 1) * (horizontalSpacing / 2);
        
        hierarchyNode.directReports.forEach((report: any, index: number) => {
          const reportX = reportsStartX + (index * horizontalSpacing);
          const reportNodes = createHierarchyNodes(report, level + 1, reportX);
          nodeList.push(...reportNodes);
        });
      }
      
      return nodeList;
    };
    
    // Start from the top manager and build the complete hierarchy
    const allNodes = createHierarchyNodes(hierarchyTree);
    nodes.push(...allNodes);
    
    return nodes;
  }, [employee, findTopManager, buildHierarchy, expandedNodes, toggleNodeExpansion]);

  // Create edges (connections) for the complete hierarchy organization chart
  const createEdges = useCallback((): Edge[] => {
    const edges: Edge[] = [];
    
    // Get the top manager and build hierarchy
    const topManager = findTopManager(employee);
    const hierarchyTree = buildHierarchy(topManager);
    
    if (!hierarchyTree) return edges;
    
    // Recursive function to create edges for the hierarchy tree
    const createHierarchyEdges = (hierarchyNode: any): Edge[] => {
      const edgeList: Edge[] = [];
      
      if (!hierarchyNode) return edgeList;
      
      // Create edges to direct reports if expanded
      if (expandedNodes.has(hierarchyNode.employee.id) && hierarchyNode.directReports.length > 0) {
        hierarchyNode.directReports.forEach((report: any) => {
          edgeList.push({
            id: `${hierarchyNode.employee.id}-${report.employee.id}`,
            source: hierarchyNode.employee.id,
            target: report.employee.id,
            type: 'smoothstep',
            style: { 
              stroke: hierarchyNode.isSelected ? '#EF4444' : '#3B82F6', 
              strokeWidth: hierarchyNode.isSelected ? 3 : 2 
            },
            markerEnd: {
              type: 'arrowclosed' as MarkerType,
              color: hierarchyNode.isSelected ? '#EF4444' : '#3B82F6',
            },
          });
          
          // Recursively create edges for sub-hierarchy
          const subEdges = createHierarchyEdges(report);
          edgeList.push(...subEdges);
        });
      }
      
      return edgeList;
    };
    
    // Start from the top manager and build all edges
    const allEdges = createHierarchyEdges(hierarchyTree);
    edges.push(...allEdges);
    
    return edges;
  }, [employee, findTopManager, buildHierarchy, expandedNodes]);

  // Update nodes and edges when dependencies change
  useEffect(() => {
    const newNodes = createNodes();
    const newEdges = createEdges();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [createNodes, createEdges, setNodes, setEdges]);

  // Handle edge connections
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Get fit view options
  const getFitViewOptions = () => {
    return {
      padding: 0.2,
      includeHiddenNodes: false,
    };
  };

  return (
    <div className="space-y-4">
      {/* Organization Chart */}
      <div className="h-[500px] w-full border border-gray-200 rounded-lg bg-white overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={getFitViewOptions()}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};