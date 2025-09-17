export interface Employee {
  id: string;
  name: string;
  empId: string;
  email: string;
  jobTitle: string;
  grade: string;
  lastLogin: string;
  manager: string;
  hrPartner: string;
  location: string;
  department: string;
  source: string;
  status: 'Active' | 'In-active';
  avatarColor: string;
  avatarInitial: string;
}

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Jean Armstrong',
    empId: '123456',
    email: 'jean.armstrong@email.com',
    jobTitle: 'Chief Executive Officer',
    grade: 'A',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: '-',
    hrPartner: 'Michelle',
    location: 'SF Bay, USA',
    department: 'Executive',
    source: 'Internal',
    status: 'Active',
    avatarColor: 'bg-[#b1e3ff]',
    avatarInitial: 'J'
  },
  {
    id: '2',
    name: 'Andrew Nelson',
    empId: '456234',
    email: 'andrew.nelson@email.com',
    jobTitle: 'Finance Manager',
    grade: 'A',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Jean',
    hrPartner: 'Dan',
    location: 'SF Bay, USA',
    department: 'Finance',
    source: 'External',
    status: 'Active',
    avatarColor: 'bg-[#ffcb83]',
    avatarInitial: 'A'
  },
  {
    id: '3',
    name: 'Bruce Johnson',
    empId: '567567',
    email: 'bruce.johnson@email.com',
    jobTitle: 'Chief Technology Officer',
    grade: 'A',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Jean',
    hrPartner: 'Sarah',
    location: 'SF Bay, USA',
    department: 'Technology',
    source: 'Internal',
    status: 'Active',
    avatarColor: 'bg-[#c6c7f8]',
    avatarInitial: 'B'
  },
  {
    id: '4',
    name: 'Carrie Johnson',
    empId: '678678',
    email: 'carrie.johnson@email.com',
    jobTitle: 'Chief Product Officer',
    grade: 'A',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Jean',
    hrPartner: 'Lisa',
    location: 'SF Bay, USA',
    department: 'Product',
    source: 'Internal',
    status: 'Active',
    avatarColor: 'bg-[#a8c5da]',
    avatarInitial: 'C'
  },
  {
    id: '5',
    name: 'Adrian Lobo',
    empId: '789789',
    email: 'adrian.lobo@email.com',
    jobTitle: 'Sales Manager',
    grade: 'B',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Andrew',
    hrPartner: 'Mike',
    location: 'Athens, Greece',
    department: 'Sales',
    source: 'External',
    status: 'Active',
    avatarColor: 'bg-[#ffe999]',
    avatarInitial: 'A'
  },
  {
    id: '6',
    name: 'Ben Mooney',
    empId: '890890',
    email: 'ben.mooney@email.com',
    jobTitle: 'UX Designer',
    grade: 'B',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Carrie',
    hrPartner: 'Emma',
    location: 'SF Bay, USA',
    department: 'Design',
    source: 'Internal',
    status: 'In-active',
    avatarColor: 'bg-[#a1e3cb]',
    avatarInitial: 'B'
  },
  {
    id: '7',
    name: 'Carl Sullivan',
    empId: '901901',
    email: 'carl.sullivan@email.com',
    jobTitle: 'Marketing Manager',
    grade: 'B',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Andrew',
    hrPartner: 'John',
    location: 'SF Bay, USA',
    department: 'Marketing',
    source: 'External',
    status: 'Active',
    avatarColor: 'bg-[#ffe999]',
    avatarInitial: 'C'
  },
  {
    id: '8',
    name: 'Chitin Sign',
    empId: '012012',
    email: 'chitin.sign@email.com',
    jobTitle: 'HR Manager',
    grade: 'B',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Jean',
    hrPartner: 'Anna',
    location: 'SF Bay, USA',
    department: 'Human Resources',
    source: 'Internal',
    status: 'Active',
    avatarColor: 'bg-[#c6c7f8]',
    avatarInitial: 'C'
  },
  {
    id: '9',
    name: 'Alison Jones',
    empId: '123123',
    email: 'alison.jones@email.com',
    jobTitle: 'Sales Representative',
    grade: 'C',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Adrian',
    hrPartner: 'Tom',
    location: 'SF Bay, USA',
    department: 'Sales',
    source: 'Internal',
    status: 'Active',
    avatarColor: 'bg-[#baedbd]',
    avatarInitial: 'A'
  },
  {
    id: '10',
    name: 'Brian Griffin',
    empId: '234234',
    email: 'brian.griffin@email.com',
    jobTitle: 'Software Engineer',
    grade: 'C',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Bruce',
    hrPartner: 'Kate',
    location: 'SF Bay, USA',
    department: 'Technology',
    source: 'Internal',
    status: 'Active',
    avatarColor: 'bg-[#a8c5da]',
    avatarInitial: 'B'
  },
  {
    id: '11',
    name: 'Carly Brieley',
    empId: '345345',
    email: 'carly.brieley@email.com',
    jobTitle: 'Product Designer',
    grade: 'C',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Carrie',
    hrPartner: 'Sam',
    location: 'SF Bay, USA',
    department: 'Design',
    source: 'External',
    status: 'Active',
    avatarColor: 'bg-[#ffcb83]',
    avatarInitial: 'C'
  },
  {
    id: '12',
    name: 'Chris Robinson',
    empId: '456456',
    email: 'chris.robinson@email.com',
    jobTitle: 'Marketing Specialist',
    grade: 'C',
    lastLogin: '24 Jul 2025 7:08:24 PM',
    manager: 'Carl',
    hrPartner: 'Alex',
    location: 'SF Bay, USA',
    department: 'Marketing',
    source: 'Internal',
    status: 'In-active',
    avatarColor: 'bg-[#baedbd]',
    avatarInitial: 'C'
  }
];

// Service functions for employee data
export const employeeService = {
  // Get all employees
  getAllEmployees: (): Employee[] => {
    return mockEmployees;
  },

  // Get employee by ID
  getEmployeeById: (id: string): Employee | undefined => {
    return mockEmployees.find(emp => emp.id === id);
  },

  // Get employees by department
  getEmployeesByDepartment: (department: string): Employee[] => {
    return mockEmployees.filter(emp => emp.department === department);
  },

  // Get active employees
  getActiveEmployees: (): Employee[] => {
    return mockEmployees.filter(emp => emp.status === 'Active');
  },

  // Search employees
  searchEmployees: (query: string): Employee[] => {
    const lowercaseQuery = query.toLowerCase();
    return mockEmployees.filter(emp => 
      emp.name.toLowerCase().includes(lowercaseQuery) ||
      emp.email.toLowerCase().includes(lowercaseQuery) ||
      emp.jobTitle.toLowerCase().includes(lowercaseQuery) ||
      emp.department.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Get total count
  getTotalCount: (): number => {
    return mockEmployees.length;
  },

  // Get active count
  getActiveCount: (): number => {
    return mockEmployees.filter(emp => emp.status === 'Active').length;
  },

  // Add new employee
  addEmployee: (employee: Omit<Employee, 'id'>): Employee => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString()
    };
    mockEmployees.push(newEmployee);
    return newEmployee;
  },

  // Update employee
  updateEmployee: (id: string, updates: Partial<Employee>): Employee | null => {
    const index = mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      mockEmployees[index] = { ...mockEmployees[index], ...updates };
      return mockEmployees[index];
    }
    return null;
  },

  // Delete employee
  deleteEmployee: (id: string): boolean => {
    const index = mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      mockEmployees.splice(index, 1);
      return true;
    }
    return false;
  }
};
