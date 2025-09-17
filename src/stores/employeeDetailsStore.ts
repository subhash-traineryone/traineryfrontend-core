import { create } from 'zustand';
import { employeeService, type Employee as ServiceEmployee } from '../services/employeeService';

export interface EmployeeDetails extends ServiceEmployee {
  // Personal Information
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  profilePicture?: string;
  
  // Education & Experience
  educations?: Array<{
    id: string;
    university: string;
    education: string;
    degree: string;
    year: string;
  }>;
  experiences?: Array<{
    id: string;
    organisation: string;
    startDate: string;
    jobTitle: string;
    endDate: string;
  }>;
  totalYearsOfExperience?: string;
  
  // Contact & Address
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  };
  
  // Performance Data
  performance?: {
    overallRating: number;
    goalsCompleted: number;
    awardsReceived: number;
    reviews: Array<{
      id: string;
      cycleName: string;
      reviewer: {
        name: string;
        avatar: string;
      };
      template: string;
      cycleType: 'Annual' | 'Onboard' | 'Standard';
      status: 'Active' | 'Inactive';
      startDate: Date;
      dueDate: Date;
      lastUpdated?: Date;
    }>;
    checkIns: Array<{
      id: string;
      employee: {
        name: string;
        avatar: string;
      };
      status: 'Active' | 'Inactive';
      requestDate: Date;
      dueDate: Date;
    }>;
    feedback360: Array<{
      id: string;
      employee: {
        name: string;
        avatar: string;
      };
      status: 'Active' | 'Inactive';
      requestDate: Date;
      dueDate: Date;
    }>;
    goals: Array<{
      id: string;
      title: string;
      description: string;
      dueDate: Date;
      progress: number;
      status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
    }>;
    metrics: Array<{
      id: string;
      name: string;
      value: number;
      target: number;
      unit: string;
      period: string;
    }>;
  };
  
  // Documents
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    createdBy: {
      name: string;
      avatar: string;
    };
    creationDate: string;
    lastUpdated: string;
    folder: string;
    size?: string;
  }>;
  
  // Admin Settings
  adminSettings?: {
    passwordManager: {
      lastUpdated: Date;
      passwordHistory: Array<{
        id: string;
        date: Date;
        action: string;
        sentBy: string;
      }>;
    };
    accessManager: {
      systemAccess: boolean;
      welcomeMailHistory: Array<{
        id: string;
        date: Date;
        sentBy: string;
      }>;
    };
    roles: Array<{
      id: string;
      application: string;
      role: string;
      assignedDate: Date;
      assignedBy: string;
    }>;
  };
  
  // Updates & Activity
  updates?: Array<{
    id: string;
    type: 'note' | 'status_change' | 'assignment' | 'milestone' | 'system';
    title: string;
    description: string;
    author: string;
    date: Date;
    priority: 'low' | 'medium' | 'high';
  }>;
  
  notes?: string;
  lastUpdated?: Date;
}

interface EmployeeDetailsStore {
  // State
  selectedEmployee: EmployeeDetails | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
  error: string | null;
  activeSection: string;
  onEmployeeUpdated?: () => void;
  
  // Basic Actions
  openEmployeeDetails: (employeeId: string) => Promise<void>;
  closeEmployeeDetails: () => void;
  updateEmployee: (updates: Partial<EmployeeDetails>) => Promise<void>;
  deleteEmployee: (employeeId: string) => Promise<void>;
  setActiveSection: (section: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setOnEmployeeUpdated: (callback: () => void) => void;
  
  // Profile CRUD Operations
  updatePersonalInfo: (updates: Partial<EmployeeDetails>) => Promise<void>;
  updateEducation: (educationId: string, updates: any) => Promise<void>;
  addEducation: (education: any) => Promise<void>;
  removeEducation: (educationId: string) => Promise<void>;
  updateExperience: (experienceId: string, updates: any) => Promise<void>;
  addExperience: (experience: any) => Promise<void>;
  removeExperience: (experienceId: string) => Promise<void>;
  
  // Performance CRUD Operations
  updatePerformance: (updates: Partial<EmployeeDetails['performance']>) => Promise<void>;
  addReview: (review: any) => Promise<void>;
  updateReview: (reviewId: string, updates: any) => Promise<void>;
  removeReview: (reviewId: string) => Promise<void>;
  addCheckIn: (checkIn: any) => Promise<void>;
  updateCheckIn: (checkInId: string, updates: any) => Promise<void>;
  removeCheckIn: (checkInId: string) => Promise<void>;
  addFeedback360: (feedback: any) => Promise<void>;
  updateFeedback360: (feedbackId: string, updates: any) => Promise<void>;
  removeFeedback360: (feedbackId: string) => Promise<void>;
  addGoal: (goal: any) => Promise<void>;
  updateGoal: (goalId: string, updates: any) => Promise<void>;
  removeGoal: (goalId: string) => Promise<void>;
  
  // Documents CRUD Operations
  addDocument: (document: any) => Promise<void>;
  updateDocument: (documentId: string, updates: any) => Promise<void>;
  removeDocument: (documentId: string) => Promise<void>;
  
  // Admin CRUD Operations
  updateAdminSettings: (updates: Partial<EmployeeDetails['adminSettings']>) => Promise<void>;
  updateAdminSettingsDirect: (adminSettings: any) => void;
  addRole: (role: Omit<any, 'id'>) => void;
  updateRole: (roleId: string, updates: Partial<any>) => void;
  removeRole: (roleId: string) => void;
  
  // Updates CRUD Operations
  addUpdate: (update: Omit<any, 'id'>) => void;
  updateUpdate: (updateId: string, updates: Partial<any>) => void;
  removeUpdate: (updateId: string) => void;
}

export const useEmployeeDetailsStore = create<EmployeeDetailsStore>((set, get) => ({
  // Initial state
  selectedEmployee: null,
  isSidebarOpen: false,
  isLoading: false,
  error: null,
  activeSection: 'profile',

  // Open employee details
  openEmployeeDetails: async (employeeId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const employee = employeeService.getEmployeeById(employeeId);
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Convert ServiceEmployee to EmployeeDetails with comprehensive mock data
      const employeeDetails: EmployeeDetails = {
        ...employee,
        firstName: employee.name.split(' ')[0] || '',
        lastName: employee.name.split(' ').slice(1).join(' ') || '',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        profilePicture: '',
        
        // Education & Experience
        educations: [
          {
            id: '1',
            university: 'University of California',
            education: 'Computer Science',
            degree: 'Bachelor of Science',
            year: '2020'
          },
          {
            id: '2',
            university: 'Stanford University',
            education: 'Business Administration',
            degree: 'Master of Business Administration',
            year: '2022'
          }
        ],
        experiences: [
          {
            id: '1',
            organisation: 'Memric',
            startDate: '24 Jul 2025',
            jobTitle: 'UX Design Intern',
            endDate: '31 Dec 2025'
          },
          {
            id: '2',
            organisation: 'Memric',
            startDate: '1 Jan 2023',
            jobTitle: 'UX Designer',
            endDate: 'Present'
          }
        ],
        totalYearsOfExperience: '4.5',
        
        // Contact & Address
        emergencyContact: {
          name: 'John Doe',
          relationship: 'Spouse',
          phone: '+1 (555) 123-4567',
          email: 'john.doe@email.com'
        },
        address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        },
        bankDetails: {
          bankName: 'Chase Bank',
          accountNumber: '****1234',
          routingNumber: '021000021'
        },
        
        // Performance Data
        performance: {
          overallRating: 4.2,
          goalsCompleted: 8,
          awardsReceived: 2,
          reviews: [
            {
              id: '1',
              cycleName: 'Strategic to Organization mission and values',
              reviewer: {
                name: 'Jacob',
                avatar: 'J'
              },
              template: 'Lorem Ipsum',
              cycleType: 'Annual' as const,
              status: 'Active' as const,
              startDate: new Date('2024-12-15'),
              dueDate: new Date('2024-12-15'),
              lastUpdated: undefined
            },
            {
              id: '2',
              cycleName: 'Supports, develops and retains workforce...',
              reviewer: {
                name: 'Cynthia',
                avatar: 'C'
              },
              template: 'Lorem Ipsum',
              cycleType: 'Onboard' as const,
              status: 'Inactive' as const,
              startDate: new Date('2024-11-20'),
              dueDate: new Date('2024-11-20'),
              lastUpdated: undefined
            },
            {
              id: '3',
              cycleName: 'Works to comply with safety regulations an...',
              reviewer: {
                name: 'Brian',
                avatar: 'B'
              },
              template: 'Lorem Ipsum',
              cycleType: 'Standard' as const,
              status: 'Inactive' as const,
              startDate: new Date('2025-01-15'),
              dueDate: new Date('2025-01-15'),
              lastUpdated: undefined
            }
          ],
          checkIns: [
            {
              id: '1',
              employee: {
                name: 'Jacob',
                avatar: 'J'
              },
              status: 'Active' as const,
              requestDate: new Date('2025-08-12'),
              dueDate: new Date('2025-08-12')
            },
            {
              id: '2',
              employee: {
                name: 'Cynthia',
                avatar: 'C'
              },
              status: 'Inactive' as const,
              requestDate: new Date('2025-08-12'),
              dueDate: new Date('2025-08-12')
            },
            {
              id: '3',
              employee: {
                name: 'Brian',
                avatar: 'B'
              },
              status: 'Inactive' as const,
              requestDate: new Date('2025-08-12'),
              dueDate: new Date('2025-08-12')
            }
          ],
          feedback360: [
            {
              id: '1',
              employee: {
                name: 'Jacob',
                avatar: 'J'
              },
              status: 'Active' as const,
              requestDate: new Date('2025-08-12'),
              dueDate: new Date('2025-08-12')
            },
            {
              id: '2',
              employee: {
                name: 'Cynthia',
                avatar: 'C'
              },
              status: 'Inactive' as const,
              requestDate: new Date('2025-08-12'),
              dueDate: new Date('2025-08-12')
            },
            {
              id: '3',
              employee: {
                name: 'Brian',
                avatar: 'B'
              },
              status: 'Inactive' as const,
              requestDate: new Date('2025-08-12'),
              dueDate: new Date('2025-08-12')
            }
          ],
          goals: [
            {
              id: '1',
              title: 'Complete Project Alpha',
              description: 'Lead the development of the new customer portal',
              dueDate: new Date('2025-03-31'),
              progress: 75,
              status: 'in_progress'
            },
            {
              id: '2',
              title: 'Team Training Program',
              description: 'Implement comprehensive training for the development team',
              dueDate: new Date('2025-02-28'),
              progress: 40,
              status: 'in_progress'
            },
            {
              id: '3',
              title: 'Code Quality Improvement',
              description: 'Achieve 95% code coverage and implement best practices',
              dueDate: new Date('2024-12-31'),
              progress: 100,
              status: 'completed'
            }
          ],
          metrics: [
            {
              id: '1',
              name: 'Code Quality Score',
              value: 92,
              target: 90,
              unit: '%',
              period: 'Monthly'
            },
            {
              id: '2',
              name: 'Project Delivery',
              value: 8,
              target: 6,
              unit: 'projects',
              period: 'Quarterly'
            },
            {
              id: '3',
              name: 'Team Satisfaction',
              value: 4.5,
              target: 4.0,
              unit: '/5',
              period: 'Monthly'
            }
          ]
        },
        
        // Documents
        documents: [
          {
            id: '1',
            name: 'Test Image',
            type: 'PNG',
            createdBy: { name: 'Jacob', avatar: 'J' },
            creationDate: '12 Aug 2025',
            lastUpdated: '12 Aug 2025',
            folder: 'Identity Information',
            size: '2.4 MB'
          },
          {
            id: '2',
            name: 'Test Image 2',
            type: 'PNG',
            createdBy: { name: 'Cynthia', avatar: 'C' },
            creationDate: '12 Aug 2025',
            lastUpdated: '12 Aug 2025',
            folder: 'Identity Information',
            size: '1.8 MB'
          },
          {
            id: '3',
            name: 'Test Image 3',
            type: 'PNG',
            createdBy: { name: 'Brian', avatar: 'B' },
            creationDate: '12 Aug 2025',
            lastUpdated: '12 Aug 2025',
            folder: 'Identity Information',
            size: '3.2 MB'
          },
          {
            id: '4',
            name: 'Employment Contract',
            type: 'PDF',
            createdBy: { name: 'HR Team', avatar: 'H' },
            creationDate: '01 Jan 2024',
            lastUpdated: '01 Jan 2024',
            folder: 'Contracts',
            size: '1.2 MB'
          },
          {
            id: '5',
            name: 'Performance Review 2024',
            type: 'PDF',
            createdBy: { name: 'Manager', avatar: 'M' },
            creationDate: '15 Dec 2024',
            lastUpdated: '15 Dec 2024',
            folder: 'Reviews',
            size: '0.8 MB'
          },
          {
            id: '6',
            name: 'Certification - AWS',
            type: 'PDF',
            createdBy: { name: 'Employee', avatar: 'E' },
            creationDate: '10 Nov 2024',
            lastUpdated: '10 Nov 2024',
            folder: 'Certificates',
            size: '0.5 MB'
          }
        ],
        
        // Admin Settings
        adminSettings: {
          passwordManager: {
            lastUpdated: new Date('2025-07-28T14:14:18'),
            passwordHistory: [
              {
                id: '1',
                date: new Date('2025-07-28T14:14:18'),
                action: 'Password reset email sent',
                sentBy: 'System Admin'
              },
              {
                id: '2',
                date: new Date('2025-06-15T10:30:00'),
                action: 'Password change notification',
                sentBy: 'HR Manager'
              }
            ]
          },
          accessManager: {
            systemAccess: true,
            welcomeMailHistory: [
              {
                id: '1',
                date: new Date('2024-01-15T09:00:00'),
                sentBy: 'HR Manager'
              },
              {
                id: '2',
                date: new Date('2024-01-20T14:30:00'),
                sentBy: 'IT Admin'
              }
            ]
          },
          roles: [
            {
              id: '1',
              application: 'Trak Learning',
              role: 'TL User',
              assignedDate: new Date('2024-01-15'),
              assignedBy: 'Admin'
            },
            {
              id: '2',
              application: 'Trak Coaching',
              role: 'TC User',
              assignedDate: new Date('2024-01-15'),
              assignedBy: 'Admin'
            },
            {
              id: '3',
              application: 'Delegate HR',
              role: '',
              assignedDate: new Date('2024-01-15'),
              assignedBy: 'Admin'
            }
          ]
        },
        
        // Updates & Activity
        updates: [
          {
            id: '1',
            type: 'status_change',
            title: 'Audrey Lim updated this employee\'s HR partner to David Hooper',
            description: 'HR partner assignment has been updated',
            author: 'Audrey Lim',
            date: new Date(),
            priority: 'medium'
          },
          {
            id: '2',
            type: 'milestone',
            title: 'Missi Cooper created this employee\'s profile',
            description: 'Initial employee profile setup completed',
            author: 'Missi Cooper',
            date: new Date(Date.now() - 59 * 60 * 1000), // 59 minutes ago
            priority: 'low'
          },
          {
            id: '3',
            type: 'system',
            title: 'Simon imported this employee\'s information',
            description: 'Employee data imported from external system',
            author: 'Simon',
            date: new Date('2025-09-02'),
            priority: 'low'
          }
        ],
        
        notes: 'Excellent employee with great potential for growth.',
        lastUpdated: new Date()
      };

      set({ 
        selectedEmployee: employeeDetails, 
        isSidebarOpen: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load employee details',
        isLoading: false 
      });
    }
  },

  // Close employee details
  closeEmployeeDetails: () => {
    set({ 
      isSidebarOpen: false, 
      selectedEmployee: null, 
      error: null 
    });
  },

  // Update employee
  updateEmployee: async (updates: Partial<EmployeeDetails>) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee) return;

    set({ isLoading: true, error: null });

    try {
      const updatedEmployee = { ...selectedEmployee, ...updates, lastUpdated: new Date() };
      
      // Convert EmployeeDetails to Employee for service update
      const serviceEmployee: Partial<ServiceEmployee> = {
        name: updatedEmployee.name,
        empId: updatedEmployee.empId,
        email: updatedEmployee.email,
        jobTitle: updatedEmployee.jobTitle,
        grade: updatedEmployee.grade,
        lastLogin: updatedEmployee.lastLogin,
        manager: updatedEmployee.manager,
        hrPartner: updatedEmployee.hrPartner,
        location: updatedEmployee.location,
        department: updatedEmployee.department,
        source: updatedEmployee.source,
        status: updatedEmployee.status,
        avatarColor: updatedEmployee.avatarColor,
        avatarInitial: updatedEmployee.avatarInitial
      };
      
      // Update in the service
      const result = employeeService.updateEmployee(selectedEmployee.id, serviceEmployee);
      
      if (result) {
        set({ 
          selectedEmployee: updatedEmployee, 
          isLoading: false 
        });
        
        // Trigger callback to refresh main employee list
        const { onEmployeeUpdated } = get();
        if (onEmployeeUpdated) {
          onEmployeeUpdated();
        }
      } else {
        throw new Error('Employee not found in service');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update employee',
        isLoading: false 
      });
    }
  },

  // Delete employee
  deleteEmployee: async (employeeId: string) => {
    set({ isLoading: true, error: null });

    try {
      const success = employeeService.deleteEmployee(employeeId);
      if (success) {
        set({ 
          isSidebarOpen: false, 
          selectedEmployee: null, 
          isLoading: false 
        });
        
        // Trigger callback to refresh main employee list
        const { onEmployeeUpdated } = get();
        if (onEmployeeUpdated) {
          onEmployeeUpdated();
        }
      } else {
        throw new Error('Employee not found');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete employee',
        isLoading: false 
      });
    }
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  // Set error
  setError: (error: string | null) => {
    set({ error });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Set callback for employee updates
  setOnEmployeeUpdated: (callback: () => void) => {
    set({ onEmployeeUpdated: callback });
  },

  // Set active section
  setActiveSection: (section: string) => {
    set({ activeSection: section });
  },

  // Profile CRUD Operations
  updatePersonalInfo: async (updates: Partial<EmployeeDetails>) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee) return;

    const updatedEmployee = { ...selectedEmployee, ...updates, lastUpdated: new Date() };
    set({ selectedEmployee: updatedEmployee });
    
    // Trigger callback to refresh main employee list
    const { onEmployeeUpdated } = get();
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  },

  updateEducation: async (educationId: string, updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.educations) return;

    const updatedEducations = selectedEmployee.educations.map(edu =>
      edu.id === educationId ? { ...edu, ...updates } : edu
    );
    
    await get().updatePersonalInfo({ educations: updatedEducations });
  },

  addEducation: async (education: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee) return;

    const newEducation = { ...education, id: Date.now().toString() };
    const updatedEducations = [...(selectedEmployee.educations || []), newEducation];
    
    await get().updatePersonalInfo({ educations: updatedEducations });
  },

  removeEducation: async (educationId: string) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.educations) return;

    const updatedEducations = selectedEmployee.educations.filter(edu => edu.id !== educationId);
    await get().updatePersonalInfo({ educations: updatedEducations });
  },

  updateExperience: async (experienceId: string, updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.experiences) return;

    const updatedExperiences = selectedEmployee.experiences.map(exp =>
      exp.id === experienceId ? { ...exp, ...updates } : exp
    );
    
    await get().updatePersonalInfo({ experiences: updatedExperiences });
  },

  addExperience: async (experience: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee) return;

    const newExperience = { ...experience, id: Date.now().toString() };
    const updatedExperiences = [...(selectedEmployee.experiences || []), newExperience];
    
    await get().updatePersonalInfo({ experiences: updatedExperiences });
  },

  removeExperience: async (experienceId: string) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.experiences) return;

    const updatedExperiences = selectedEmployee.experiences.filter(exp => exp.id !== experienceId);
    await get().updatePersonalInfo({ experiences: updatedExperiences });
  },

  // Performance CRUD Operations
  updatePerformance: async (updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee) return;

    const updatedPerformance = { ...selectedEmployee.performance, ...updates };
    await get().updatePersonalInfo({ performance: updatedPerformance as any });
  },

  addReview: async (review: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance) return;

    const newReview = { ...review, id: Date.now().toString() };
    const updatedReviews = [...selectedEmployee.performance.reviews, newReview];
    const updatedPerformance = { ...selectedEmployee.performance, reviews: updatedReviews };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  updateReview: async (reviewId: string, updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.reviews) return;

    const updatedReviews = selectedEmployee.performance.reviews.map(review =>
      review.id === reviewId ? { ...review, ...updates } : review
    );
    const updatedPerformance = { ...selectedEmployee.performance, reviews: updatedReviews };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  removeReview: async (reviewId: string) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.reviews) return;

    const updatedReviews = selectedEmployee.performance.reviews.filter(review => review.id !== reviewId);
    const updatedPerformance = { ...selectedEmployee.performance, reviews: updatedReviews };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  addCheckIn: async (checkIn: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance) return;

    const newCheckIn = { ...checkIn, id: Date.now().toString() };
    const updatedCheckIns = [...(selectedEmployee.performance.checkIns || []), newCheckIn];
    const updatedPerformance = { ...selectedEmployee.performance, checkIns: updatedCheckIns };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  updateCheckIn: async (checkInId: string, updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.checkIns) return;

    const updatedCheckIns = selectedEmployee.performance.checkIns.map(checkIn =>
      checkIn.id === checkInId ? { ...checkIn, ...updates } : checkIn
    );
    const updatedPerformance = { ...selectedEmployee.performance, checkIns: updatedCheckIns };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  removeCheckIn: async (checkInId: string) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.checkIns) return;

    const updatedCheckIns = selectedEmployee.performance.checkIns.filter(checkIn => checkIn.id !== checkInId);
    const updatedPerformance = { ...selectedEmployee.performance, checkIns: updatedCheckIns };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  addFeedback360: async (feedback: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance) return;

    const newFeedback = { ...feedback, id: Date.now().toString() };
    const updatedFeedback360 = [...(selectedEmployee.performance.feedback360 || []), newFeedback];
    const updatedPerformance = { ...selectedEmployee.performance, feedback360: updatedFeedback360 };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  updateFeedback360: async (feedbackId: string, updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.feedback360) return;

    const updatedFeedback360 = selectedEmployee.performance.feedback360.map(feedback =>
      feedback.id === feedbackId ? { ...feedback, ...updates } : feedback
    );
    const updatedPerformance = { ...selectedEmployee.performance, feedback360: updatedFeedback360 };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  removeFeedback360: async (feedbackId: string) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.feedback360) return;

    const updatedFeedback360 = selectedEmployee.performance.feedback360.filter(feedback => feedback.id !== feedbackId);
    const updatedPerformance = { ...selectedEmployee.performance, feedback360: updatedFeedback360 };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  addGoal: async (goal: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance) return;

    const newGoal = { ...goal, id: Date.now().toString() };
    const updatedGoals = [...selectedEmployee.performance.goals, newGoal];
    const updatedPerformance = { ...selectedEmployee.performance, goals: updatedGoals };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  updateGoal: async (goalId: string, updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.goals) return;

    const updatedGoals = selectedEmployee.performance.goals.map(goal =>
      goal.id === goalId ? { ...goal, ...updates } : goal
    );
    const updatedPerformance = { ...selectedEmployee.performance, goals: updatedGoals };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  removeGoal: async (goalId: string) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.performance?.goals) return;

    const updatedGoals = selectedEmployee.performance.goals.filter(goal => goal.id !== goalId);
    const updatedPerformance = { ...selectedEmployee.performance, goals: updatedGoals };
    
    await get().updatePersonalInfo({ performance: updatedPerformance });
  },

  // Documents CRUD Operations
  addDocument: async (document: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee) return;

    const newDocument = { ...document, id: Date.now().toString() };
    const updatedDocuments = [...(selectedEmployee.documents || []), newDocument];
    
    await get().updatePersonalInfo({ documents: updatedDocuments });
  },

  updateDocument: async (documentId: string, updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.documents) return;

    const updatedDocuments = selectedEmployee.documents.map(doc =>
      doc.id === documentId ? { ...doc, ...updates } : doc
    );
    
    await get().updatePersonalInfo({ documents: updatedDocuments });
  },

  removeDocument: async (documentId: string) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee?.documents) return;

    const updatedDocuments = selectedEmployee.documents.filter(doc => doc.id !== documentId);
    await get().updatePersonalInfo({ documents: updatedDocuments });
  },

  // Admin CRUD Operations
  updateAdminSettings: async (updates: any) => {
    const { selectedEmployee } = get();
    if (!selectedEmployee) return;

    const updatedAdminSettings = { ...selectedEmployee.adminSettings, ...updates };
    await get().updatePersonalInfo({ adminSettings: updatedAdminSettings as any });
  },

  updateAdminSettingsDirect: (adminSettings: any) => {
    const { selectedEmployee, onEmployeeUpdated } = get();
    if (!selectedEmployee) return;

    set({ selectedEmployee: { ...selectedEmployee, adminSettings } });
    
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  },

  addRole: (role: any) => {
    const { selectedEmployee, onEmployeeUpdated } = get();
    if (!selectedEmployee?.adminSettings) return;

    const newRole = { ...role, id: Date.now().toString() };
    const updatedRoles = [...selectedEmployee.adminSettings.roles, newRole];
    const updatedAdminSettings = { ...selectedEmployee.adminSettings, roles: updatedRoles };
    
    set({ selectedEmployee: { ...selectedEmployee, adminSettings: updatedAdminSettings } });
    
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  },

  updateRole: (roleId: string, updates: any) => {
    const { selectedEmployee, onEmployeeUpdated } = get();
    if (!selectedEmployee?.adminSettings?.roles) return;

    const updatedRoles = selectedEmployee.adminSettings.roles.map(role =>
      role.id === roleId ? { ...role, ...updates } : role
    );
    const updatedAdminSettings = { ...selectedEmployee.adminSettings, roles: updatedRoles };
    
    set({ selectedEmployee: { ...selectedEmployee, adminSettings: updatedAdminSettings } });
    
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  },

  removeRole: (roleId: string) => {
    const { selectedEmployee, onEmployeeUpdated } = get();
    if (!selectedEmployee?.adminSettings?.roles) return;

    const updatedRoles = selectedEmployee.adminSettings.roles.filter(role => role.id !== roleId);
    const updatedAdminSettings = { ...selectedEmployee.adminSettings, roles: updatedRoles };
    
    set({ selectedEmployee: { ...selectedEmployee, adminSettings: updatedAdminSettings } });
    
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  },

  // Updates CRUD Operations
  addUpdate: (update: any) => {
    const { selectedEmployee, onEmployeeUpdated } = get();
    if (!selectedEmployee) return;

    const newUpdate = { ...update, id: Date.now().toString() };
    const updatedUpdates = [newUpdate, ...(selectedEmployee.updates || [])];
    
    set({ selectedEmployee: { ...selectedEmployee, updates: updatedUpdates } });
    
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  },

  updateUpdate: (updateId: string, updates: any) => {
    const { selectedEmployee, onEmployeeUpdated } = get();
    if (!selectedEmployee?.updates) return;

    const updatedUpdates = selectedEmployee.updates.map(update =>
      update.id === updateId ? { ...update, ...updates } : update
    );
    
    set({ selectedEmployee: { ...selectedEmployee, updates: updatedUpdates } });
    
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  },

  removeUpdate: (updateId: string) => {
    const { selectedEmployee, onEmployeeUpdated } = get();
    if (!selectedEmployee?.updates) return;

    const updatedUpdates = selectedEmployee.updates.filter(update => update.id !== updateId);
    set({ selectedEmployee: { ...selectedEmployee, updates: updatedUpdates } });
    
    if (onEmployeeUpdated) {
      onEmployeeUpdated();
    }
  }
}));
