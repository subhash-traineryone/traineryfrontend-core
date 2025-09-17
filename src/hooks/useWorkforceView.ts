"use client"

import { useState, useCallback } from 'react';

export type ViewMode = 'chart' | 'list' | 'board';

export const useWorkforceView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const changeViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const toggleSelectAll = useCallback(() => {
    setIsSelectAll(prev => !prev);
  }, []);

  const toggleNodeExpansion = useCallback((nodeId: string) => {
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

  const expandAll = useCallback(() => {
    // This should be dynamic based on actual employee data
    setExpandedNodes(new Set(['ceo', 'cfo', 'cpo', 'cto', 'head-design', 'head-sales', 'head-strategy', 'head-operations']));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  return {
    viewMode,
    searchTerm,
    isSelectAll,
    expandedNodes,
    changeViewMode,
    updateSearchTerm,
    toggleSelectAll,
    toggleNodeExpansion,
    expandAll,
    collapseAll,
  };
};
