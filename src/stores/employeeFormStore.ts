import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface EmployeeFormData {
  // Personal Details
  name: string;
  email: string;
  employmentType: string;
  dob: Date | undefined;
  race: string;
  phone: string;
  
  // Job Details
  employeeId: string;
  employmentStatus: string;
  gender: string;
  location: string;
  phoneExt: string;
  
  // Position Information
  title: string;
  positionDescription: File | null;
  jobGrade: string;
  jobCode: string;
  eeocCategory: string;
  reportingToTitle: string;
  workRoles: string;
  standardHrPerWeek: string;
  traineryContact: string;
  
  // Organisation
  entity: string;
  division: string;
  branch: string;
  manager: string;
  secondaryManager: string;
  hrPartner: string;
  
  // Dates
  hireDate: Date | undefined;
  startDate: Date | undefined;
  
  // Profile Picture
  profilePicture: File | null;
  
  // Education
  educations: Array<{
    id: string;
    university: string;
    education: string;
    degree: string;
    year: string;
  }>;
  
  // Experience
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    description: string;
  }>;
  totalYearsOfExperience: string;
}

export interface EmployeeFormErrors {
  [key: string]: string;
}

interface EmployeeFormStore {
  formData: EmployeeFormData;
  errors: EmployeeFormErrors;
  isSubmitting: boolean;
  
  // Actions
  updateField: (field: keyof EmployeeFormData, value: string | Date | File | null | undefined) => void;
  updateFile: (field: 'profilePicture' | 'positionDescription', file: File | null) => void;
  setError: (field: keyof EmployeeFormData, error: string) => void;
  clearError: (field: keyof EmployeeFormData) => void;
  clearAllErrors: () => void;
  validateForm: () => boolean;
  validatePersonalDetails: () => boolean;
  validateJobDetails: () => boolean;
  validateEducation: () => boolean;
  validateExperience: () => boolean;
  resetForm: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  
  // Education actions
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, field: string, value: string) => void;
  
  // Experience actions
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, field: string, value: string | Date | undefined) => void;
  
  // Tab completion status
  isPersonalDetailsCompleted: () => boolean;
  isJobDetailsCompleted: () => boolean;
  isEducationCompleted: () => boolean;
  isExperienceCompleted: () => boolean;
}

const initialFormData: EmployeeFormData = {
  name: '',
  email: '',
  employmentType: 'Permanent',
  dob: undefined,
  race: '',
  phone: '',
  employeeId: '',
  employmentStatus: 'Active',
  gender: '',
  location: '',
  phoneExt: '',
  title: '',
  positionDescription: null,
  jobGrade: '',
  jobCode: 'Permanent',
  eeocCategory: 'Active',
  reportingToTitle: '',
  workRoles: '',
  standardHrPerWeek: '40',
  traineryContact: 'No',
  entity: 'Finance',
  division: 'Accounts Payable',
  branch: 'AP Manager',
  manager: '',
  secondaryManager: '',
  hrPartner: '',
  hireDate: undefined,
  startDate: undefined,
  profilePicture: null,
  
  // Education
  educations: [{
    id: '1',
    university: '',
    education: '',
    degree: '',
    year: ''
  }],
  
  // Experience
  experiences: [{
    id: '1',
    company: '',
    position: '',
    startDate: undefined,
    endDate: undefined,
    description: ''
  }],
  totalYearsOfExperience: ''
};

export const useEmployeeFormStore = create<EmployeeFormStore>()(
  devtools(
    (set, get) => ({
      formData: initialFormData,
      errors: {},
      isSubmitting: false,

      updateField: (field, value) => {
        set((state) => ({
          formData: { ...state.formData, [field]: value as any },
          errors: { ...state.errors, [field]: '' } // Clear error when updating
        }));
      },

      updateFile: (field, file) => {
        set((state) => ({
          formData: { ...state.formData, [field]: file }
        }));
      },

      setError: (field, error) => {
        set((state) => ({
          errors: { ...state.errors, [field]: error }
        }));
      },

      clearError: (field) => {
        set((state) => {
          const newErrors = { ...state.errors };
          delete newErrors[field];
          return { errors: newErrors };
        });
      },

      clearAllErrors: () => {
        set({ errors: {} });
      },

      validateForm: () => {
        const { formData } = get();
        const newErrors: EmployeeFormErrors = {};

        // Required fields validation
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.jobGrade.trim()) newErrors.jobGrade = 'Job Grade is required';
        if (!formData.standardHrPerWeek.trim()) newErrors.standardHrPerWeek = 'Standard hours per week is required';

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }

        // Phone format validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        }

        // Numeric validation for standard hours
        if (formData.standardHrPerWeek && isNaN(Number(formData.standardHrPerWeek))) {
          newErrors.standardHrPerWeek = 'Please enter a valid number';
        }

        set({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      validatePersonalDetails: () => {
        const { formData } = get();
        const newErrors: EmployeeFormErrors = {};

        // Personal Details required fields
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }

        // Phone format validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        }

        set({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      validateJobDetails: () => {
        const { formData } = get();
        const newErrors: EmployeeFormErrors = {};

        // Job Details required fields
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.jobGrade.trim()) newErrors.jobGrade = 'Job Grade is required';
        if (!formData.standardHrPerWeek.trim()) newErrors.standardHrPerWeek = 'Standard hours per week is required';

        // Numeric validation for standard hours
        if (formData.standardHrPerWeek && isNaN(Number(formData.standardHrPerWeek))) {
          newErrors.standardHrPerWeek = 'Please enter a valid number';
        }

        set({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      validateEducation: () => {
        const { formData } = get();
        const newErrors: EmployeeFormErrors = {};

        // Validate each education entry
        formData.educations.forEach((edu, index) => {
          const prefix = `education_${index}_`;
          
          if (!edu.university.trim()) newErrors[`${prefix}university`] = 'University is required';
          if (!edu.education.trim()) newErrors[`${prefix}education`] = 'Education is required';
          if (!edu.degree.trim()) newErrors[`${prefix}degree`] = 'Degree is required';
          if (!edu.year.trim()) newErrors[`${prefix}year`] = 'Year is required';

          // Year validation - should be 4 digits
          if (edu.year && !/^\d{4}$/.test(edu.year)) {
            newErrors[`${prefix}year`] = 'Please enter a valid year (YYYY)';
          }
        });

        set({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      validateExperience: () => {
        const { formData } = get();
        const newErrors: EmployeeFormErrors = {};

        // Validate each experience entry
        formData.experiences.forEach((exp, index) => {
          const prefix = `experience_${index}_`;
          
          if (!exp.company.trim()) newErrors[`${prefix}company`] = 'Company is required';
          if (!exp.position.trim()) newErrors[`${prefix}position`] = 'Position is required';
          if (!exp.startDate) newErrors[`${prefix}startDate`] = 'Start date is required';
          if (!exp.endDate) newErrors[`${prefix}endDate`] = 'End date is required';
          
          if (exp.startDate && exp.endDate && exp.startDate > exp.endDate) {
            newErrors[`${prefix}endDate`] = 'End date must be after start date';
          }
        });

        // Validate total years of experience
        if (!formData.totalYearsOfExperience.trim()) {
          newErrors.totalYearsOfExperience = 'Total years of experience is required';
        } else if (isNaN(Number(formData.totalYearsOfExperience)) || Number(formData.totalYearsOfExperience) < 0) {
          newErrors.totalYearsOfExperience = 'Please enter a valid number';
        }

        set({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
      },

      resetForm: () => {
        set({
          formData: initialFormData,
          errors: {},
          isSubmitting: false
        });
      },

      setSubmitting: (isSubmitting) => {
        set({ isSubmitting });
      },

      // Education management functions
      addEducation: () => {
        set((state) => ({
          formData: {
            ...state.formData,
            educations: [
              ...state.formData.educations,
              {
                id: Date.now().toString(),
                university: '',
                education: '',
                degree: '',
                year: ''
              }
            ]
          }
        }));
      },

      removeEducation: (id) => {
        set((state) => ({
          formData: {
            ...state.formData,
            educations: state.formData.educations.filter(edu => edu.id !== id)
          }
        }));
      },

      updateEducation: (id, field, value) => {
        set((state) => ({
          formData: {
            ...state.formData,
            educations: state.formData.educations.map(edu =>
              edu.id === id ? { ...edu, [field]: value } : edu
            )
          }
        }));
      },

      // Experience management functions
      addExperience: () => {
        set((state) => ({
          formData: {
            ...state.formData,
            experiences: [
              ...state.formData.experiences,
              {
                id: Date.now().toString(),
                company: '',
                position: '',
                startDate: undefined,
                endDate: undefined,
                description: ''
              }
            ]
          }
        }));
      },

      removeExperience: (id) => {
        set((state) => ({
          formData: {
            ...state.formData,
            experiences: state.formData.experiences.filter(exp => exp.id !== id)
          }
        }));
      },

      updateExperience: (id, field, value) => {
        set((state) => ({
          formData: {
            ...state.formData,
            experiences: state.formData.experiences.map(exp =>
              exp.id === id ? { ...exp, [field]: value } : exp
            )
          }
        }));
      },

      // Tab completion status functions
      isPersonalDetailsCompleted: () => {
        const { formData } = get();
        return !!(
          formData.name.trim() &&
          formData.email.trim() &&
          formData.employeeId.trim() &&
          formData.phone.trim()
        );
      },

      isJobDetailsCompleted: () => {
        const { formData } = get();
        return !!(
          formData.title.trim() &&
          formData.jobGrade.trim() &&
          formData.standardHrPerWeek.trim()
        );
      },

      isEducationCompleted: () => {
        const { formData } = get();
        return formData.educations.every(edu => 
          edu.university.trim() &&
          edu.education.trim() &&
          edu.degree.trim() &&
          edu.year.trim() &&
          /^\d{4}$/.test(edu.year)
        );
      },

      isExperienceCompleted: () => {
        const { formData } = get();
        return formData.experiences.every(exp => 
          exp.company.trim() &&
          exp.position.trim() &&
          exp.startDate &&
          exp.endDate &&
          exp.startDate <= exp.endDate
        ) && formData.totalYearsOfExperience.trim() !== '';
      }
    }),
    {
      name: 'employee-form-store'
    }
  )
);
