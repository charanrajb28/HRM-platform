export type Department = {
  id: number;
  name: string;
  roles?: { name: string; rate: number }[];
};

export type Shift = {
  id: number;
  name: string;
  shiftIn: string;
  shiftOut: string;
  lateRelaxationMins: number;
  overdueRelaxationMins: number;
  hoursPerDay: number;
  daysPerMonth: number;
};

export type ShiftWorkingDay = {
  shiftId: number;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  departmentId: number;
  authority: string;

  // Extra Employee Info
  gender?: string;
  machineCode?: string;
  dob?: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;

  // Contact Info
  homePhone1?: string;
  homePhone2?: string;
  workPhone?: string;
  emergencyContact?: string;

  // Employment Info
  hireDate?: string;
  joiningDate?: string;
  basicSalary?: number;
  status?: string;
  paymentMethod?: string;
  employmentType?: string;
  bankName?: string;
  branch?: string;
  accountTitle?: string;
  branchCode?: string;
  accountNo?: string;
  swiftCode?: string;

  // Employment Meta Fields
  location?: string;
  designation?: string;
  cnic?: string;
  employmentCode?: string;
  separationDate?: string;

  // Payroll Fields
  pfType?: string;
  pfEmployerContribution?: number;
  pfEmployeeContribution?: number;
  ssesType?: string;
  ssesEmployerContribution?: number;
  ssesEmployeeContribution?: number;
  eobiType?: string;
  eobiEmployerContribution?: number;
  eobiEmployeeContribution?: number;

  // Security Fields
  securityRole?: string;
  leaveEntryDays?: number;
  password?: string;
  recordAuthorities?: string[];
};

export type Attendance = {
  id: number;
  employeeId: string;
  date: string; // YYYY-MM-DD
  inTime: string | null;
  outTime: string | null;
  status: "Present" | "Late" | "Absent";
};

export type LeaveRequest = {
  id: number;
  employeeId: string;
  leaveType: "Paid Leave" | "Unpaid Leave" | "Sick Leave";
  leaveCategory: string;
  duration: "Full Day" | "First Half" | "Second Half";
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
  contactNumber?: string;
  approvedBy?: string;
};

export const departments: Department[] = [
  { id: 1, name: "Finance", roles: [{ name: "Analyst", rate: 30 }, { name: "Manager", rate: 50 }] },
  { id: 2, name: "Human Resource", roles: [{ name: "HR Manager", rate: 45 }, { name: "Recruiter", rate: 25 }] },
  { id: 3, name: "Information Technology", roles: [{ name: "Developer", rate: 40 }, { name: "Admin", rate: 35 }] },
  { id: 4, name: "Management", roles: [{ name: "Director", rate: 80 }, { name: "VP", rate: 100 }] },
  { id: 5, name: "Sales", roles: [{ name: "Sales Rep", rate: 20 }, { name: "Area Manager", rate: 40 }] },
];

export const shifts: Shift[] = [
  {
    id: 1,
    name: "Morning Shift",
    shiftIn: "08:00 AM",
    shiftOut: "04:00 PM",
    lateRelaxationMins: 10,
    overdueRelaxationMins: 15,
    hoursPerDay: 8,
    daysPerMonth: 22,
  },
  {
    id: 2,
    name: "Evening Shift",
    shiftIn: "04:00 PM",
    shiftOut: "12:00 AM",
    lateRelaxationMins: 5,
    overdueRelaxationMins: 20,
    hoursPerDay: 8,
    daysPerMonth: 22,
  },
  {
    id: 3,
    name: "Night Shift",
    shiftIn: "12:00 AM",
    shiftOut: "08:00 AM",
    lateRelaxationMins: 15,
    overdueRelaxationMins: 25,
    hoursPerDay: 8,
    daysPerMonth: 22,
  },
];

export const shiftWorkingDays: ShiftWorkingDay[] = [
  { shiftId: 1, day: "Mon" },
  { shiftId: 1, day: "Tue" },
  { shiftId: 1, day: "Wed" },
  { shiftId: 1, day: "Thu" },
  { shiftId: 1, day: "Fri" },
  { shiftId: 2, day: "Mon" },
  { shiftId: 2, day: "Tue" },
  { shiftId: 2, day: "Wed" },
  { shiftId: 2, day: "Thu" },
  { shiftId: 2, day: "Fri" },
  { shiftId: 3, day: "Mon" },
  { shiftId: 3, day: "Tue" },
  { shiftId: 3, day: "Wed" },
  { shiftId: 3, day: "Thu" },
  { shiftId: 3, day: "Fri" },
];

export const employees: Employee[] = [
  {
    id: "EMP001", name: "Kruthi", email: "kruthianu66@gmail.com", departmentId: 3, authority: "Admin",
    gender: "Female", machineCode: "MC-001", dob: "1995-05-15", streetAddress: "123 Main St", city: "Bangalore", postalCode: "560001", country: "India",
    homePhone1: "9876543210", homePhone2: "9876543211", workPhone: "080-1234567", emergencyContact: "9988776655",
    hireDate: "2021-06-01", joiningDate: "2021-06-15", basicSalary: 85000, status: "Active", paymentMethod: "Bank Transfer", employmentType: "Full-Time",
    bankName: "HDFC Bank", branch: "MG Road", accountTitle: "Kruthi A", branchCode: "HDFC00123", accountNo: "12345678901234", swiftCode: "HDFCxxx",
    location: "Bangalore Office", designation: "Software Engineer", cnic: "12345-6789012-3", employmentCode: "EMP-001", separationDate: "",
    pfType: "Percentage", pfEmployerContribution: 12, pfEmployeeContribution: 12,
    ssesType: "Fixed", ssesEmployerContribution: 500, ssesEmployeeContribution: 500,
    eobiType: "Percentage", eobiEmployerContribution: 5, eobiEmployeeContribution: 5,
    securityRole: "Admin", leaveEntryDays: 14, password: "hashed_password", recordAuthorities: ["HR", "HOD"]
  },
  {
    id: "EMP002", name: "Alice", email: "alice.sales@company.com", departmentId: 5, authority: "Manager",
    gender: "Female", machineCode: "MC-002", dob: "1990-08-22", streetAddress: "456 Oak St", city: "Mumbai", postalCode: "400001", country: "India",
    homePhone1: "9123456780", homePhone2: "", workPhone: "022-7654321", emergencyContact: "9123456789",
    hireDate: "2018-03-10", joiningDate: "2018-04-01", basicSalary: 120000, status: "Active", paymentMethod: "Bank Transfer", employmentType: "Full-Time",
    bankName: "ICICI Bank", branch: "Andheri", accountTitle: "Alice M", branchCode: "ICIC00045", accountNo: "9876543210987", swiftCode: "ICICxxx",
    location: "Mumbai Office", designation: "Regional Manager", cnic: "54321-0987654-2", employmentCode: "EMP-002", separationDate: "",
    pfType: "Percentage", pfEmployerContribution: 12, pfEmployeeContribution: 12,
    ssesType: "Fixed", ssesEmployerContribution: 500, ssesEmployeeContribution: 500,
    eobiType: "Percentage", eobiEmployerContribution: 5, eobiEmployeeContribution: 5,
    securityRole: "Manager", leaveEntryDays: 20, password: "hashed_password", recordAuthorities: ["HOD"]
  },
  { id: "EMP003", name: "Bob", email: "bob.sales@company.com", departmentId: 5, authority: "Executive" },
  { id: "EMP004", name: "Charlie", email: "charlie.dev@company.com", departmentId: 3, authority: "Developer" },
  { id: "EMP005", name: "David", email: "david.dev@company.com", departmentId: 3, authority: "Senior Developer" },
  { id: "EMP006", name: "Anita", email: "anita.hr@company.com", departmentId: 2, authority: "HR Manager" },
];

export const attendance: Attendance[] = [
  { id: 1, employeeId: "EMP001", date: "2023-01-02", inTime: "08:03", outTime: "16:01", status: "Present" },
  { id: 2, employeeId: "EMP001", date: "2023-01-03", inTime: "08:10", outTime: "16:00", status: "Late" },
  { id: 3, employeeId: "EMP002", date: "2023-01-02", inTime: "09:00", outTime: "17:00", status: "Present" },
  { id: 4, employeeId: "EMP003", date: "2023-01-02", inTime: null, outTime: null, status: "Absent" },
  { id: 5, employeeId: "EMP004", date: "2023-01-02", inTime: "08:00", outTime: "16:00", status: "Present" },
  { id: 6, employeeId: "EMP005", date: "2023-01-02", inTime: "08:20", outTime: "16:05", status: "Late" },
  { id: 7, employeeId: "EMP006", date: "2023-01-02", inTime: "09:05", outTime: "17:10", status: "Present" },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 1, employeeId: "EMP001", leaveType: "Paid Leave", leaveCategory: "Casual Leave", duration: "Full Day", startDate: "2023-01-10", endDate: "2023-01-12", status: "Approved", reason: "Family trip" },
  { id: 2, employeeId: "EMP002", leaveType: "Sick Leave", leaveCategory: "Medical Leave", duration: "Full Day", startDate: "2023-01-15", endDate: "2023-01-16", status: "Pending", reason: "Fever" },
  { id: 3, employeeId: "EMP003", leaveType: "Unpaid Leave", leaveCategory: "Other", duration: "First Half", startDate: "2023-01-20", endDate: "2023-01-20", status: "Rejected", reason: "Personal work" },
];