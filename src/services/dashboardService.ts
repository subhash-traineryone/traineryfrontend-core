// Dashboard data service
// This service provides data for the workforce overview dashboard

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  period: string;
}

export interface GenderData {
  name: string;
  y: number;
  color: string;
}

export interface AgeData {
  name: string;
  data: Array<{ y: number; color: string }>;
}

export interface TypeData {
  name: string;
  data: Array<{ y: number; color: string }>;
}

export interface LocationData {
  name: string;
  count: number;
  color: string;
}

// Statistics Cards Data
export const statsData: StatCardData[] = [
  {
    title: "Active Employees",
    value: "40",
    change: "(5%)",
    changeType: "up",
    period: "Since last 30 days"
  },
  {
    title: "New Employees",
    value: "6",
    change: "(5%)",
    changeType: "up",
    period: "Since last 30 days"
  },
  {
    title: "Imports",
    value: "8",
    change: "(2%)",
    changeType: "down",
    period: "Since last 30 days"
  },
  {
    title: "Manual",
    value: "32",
    change: "(5%)",
    changeType: "up",
    period: "Since last 30 days"
  }
];

// Gender Chart Data
export const genderData: GenderData[] = [
  { name: 'Male', y: 21, color: '#95A4FC' },
  { name: 'Female', y: 9, color: '#FFE999' },
  { name: 'Not Identified', y: 10, color: '#B1E3FF' }
];

// Age Chart Data
export const ageData: AgeData = {
  name: 'Employees by Age',
  data: [
    { y: 8, color: '#95a4fc' },
    { y: 20, color: '#baedbd' },
    { y: 15, color: '#1c1c1c' },
    { y: 5, color: '#b1e3ff' },
    { y: 2, color: '#a8c5da' },
  ]
};

// Type Chart Data
export const typeData: TypeData = {
  name: 'Employees by Type',
  data: [
    { y: 25, color: '#1c1c1c' },
    { y: 10, color: '#a1e3cb' },
    { y: 3, color: '#95a4fc' },
    { y: 2, color: '#b1e3ff' },
  ]
};

// Location Data
export const locationData: LocationData[] = [
  { name: 'New York', count: 13, color: '#a8c5da' },
  { name: 'San Francisco', count: 17, color: '#a8c5da' },
  { name: 'Sydney', count: 10, color: '#a8c5da' }
];

// Chart Configuration Data
export const chartConfig = {
  gender: {
    title: "Employees by Gender",
    width: 256,
    height: 317
  },
  age: {
    title: "Employees by Age",
    width: 379,
    height: 317,
    categories: ['18-24', '25-34', '35-44', '45-54', '55+']
  },
  type: {
    title: "Employees by Type",
    width: 335,
    height: 317,
    categories: ['Permanent', 'Consultant', 'Intern', 'Others']
  },
  location: {
    title: "Employees by Location",
    width: 225,
    height: 292
  }
};
