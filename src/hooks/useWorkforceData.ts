"use client"

import { useState, useEffect, useCallback } from 'react';
import { employeeService, type Employee } from '../services/employeeService';
import { useEmployeeDetailsStore } from '../stores/employeeDetailsStore';

export const useWorkforceData = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setOnEmployeeUpdated } = useEmployeeDetailsStore();

  const loadEmployees = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const employeeData = employeeService.getAllEmployees();
      setEmployees(employeeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load employees');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEmployeeUpdated = useCallback(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Load employees on mount
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Set up callback for employee updates
  useEffect(() => {
    setOnEmployeeUpdated(handleEmployeeUpdated);
  }, [setOnEmployeeUpdated, handleEmployeeUpdated]);

  const addEmployee = useCallback((newEmployee: Employee) => {
    try {
      employeeService.addEmployee(newEmployee);
      loadEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add employee');
    }
  }, [loadEmployees]);

  const updateEmployee = useCallback((id: string, updates: Partial<Employee>) => {
    try {
      employeeService.updateEmployee(id, updates);
      loadEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee');
    }
  }, [loadEmployees]);

  const deleteEmployee = useCallback((id: string) => {
    try {
      employeeService.deleteEmployee(id);
      loadEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee');
    }
  }, [loadEmployees]);

  return {
    employees,
    isLoading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    refreshEmployees: loadEmployees,
  };
};
