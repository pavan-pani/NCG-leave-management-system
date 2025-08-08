export const mockUsers = [
  { 
    id: '1', 
    name: 'Pavan Kumar', 
    email: 'pavan.kumar@ncg.com', 
    role: 'employee', 
    department: 'Engineering' 
  },
  { 
    id: '2', 
    name: 'Usha', 
    email: 'usha@ncg.com', 
    role: 'employee', 
    department: 'HR' 
  },
  { 
    id: '3', 
    name: 'Kapil Pandey', 
    email: 'kapil.pandey@ncg.com', 
    role: 'employee', 
    department: 'Sales' 
  },
  { 
    id: '4', 
    name: 'Chiranjivi', 
    email: 'Chiranjivi@ncg.com', 
    role: 'employee', 
    department: 'HR' 
  },
  { 
    id: 'manager', 
    name: 'Durai Pandian', 
    email: 'durai.pandian@ncg.com', 
    role: 'manager', 
    department: 'Operations' 
  }
];

export const mockLeaves = [
  { 
    id: '1', 
    employeeId: '1', 
    employeeName: 'Pavan Kumar', 
    leaveType: 'Sick Leave', 
    startDate: '2025-08-10', 
    endDate: '2025-08-12', 
    reason: 'Fever and cold', 
    status: 'pending', 
    appliedDate: '2025-08-08', 
    comments: '',
    createdAt: '2025-08-08T10:30:00Z',
    updatedAt: '2025-08-08T10:30:00Z'
  },
  { 
    id: '2', 
    employeeId: '2', 
    employeeName: 'Usha', 
    leaveType: 'Annual Leave', 
    startDate: '2025-08-15', 
    endDate: '2025-08-20', 
    reason: 'Family vacation', 
    status: 'approved', 
    appliedDate: '2025-08-07', 
    comments: 'Approved for vacation',
    createdAt: '2025-08-07T09:15:00Z',
    updatedAt: '2025-08-07T14:22:00Z'
  },
  { 
    id: '3', 
    employeeId: '3', 
    employeeName: 'Kapil Pandey', 
    leaveType: 'Personal Leave', 
    startDate: '2025-08-14', 
    endDate: '2025-08-14', 
    reason: 'Personal work', 
    status: 'rejected', 
    appliedDate: '2025-08-06', 
    comments: 'Too many leaves this month',
    createdAt: '2025-08-06T11:45:00Z',
    updatedAt: '2025-08-06T16:30:00Z'
  },
];
