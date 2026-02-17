const departments=[
  {
    "id": "d1",
    "name": "Engineering",
    "code": "ENG",
    "createdAt": "2023-01-01",
    "updatedAt": "2023-01-01"
  },
  {
    "id": "d2",
    "name": "Human Resources",
    "code": "HRD",
    "createdAt": "2023-01-01",
    "updatedAt": "2023-01-01"
  }
]

const designation= [
  { "id": "des1", "name": "CEO", "level": 1, "departmentId": "d1" },
  { "id": "des2", "name": "Head of Engineering", "level": 2, "departmentId": "d1" },
  { "id": "des3", "name": "Senior Developer", "level": 3, "departmentId": "d1" },
  { "id": "des4", "name": "HR Manager", "level": 2, "departmentId": "d2" }
]


export const employees=[
  {
    "id": "e1",
    "employeeCode": "EMP001",
    "firstName": "Kruthi",
    "lastName": "Anu",
    "gender": "Female",
    "dateOfBirth": "1999-08-15",
    "email": "kruthi@company.com",
    "phone": "9876543210",
    "hireDate": "2021-05-01",
    "joiningDate": "2021-06-01",
    "employmentStatus": "ACTIVE",
    "departmentId": "d1",
    "designationId": "des3",
    "reportingManagerId": "e2",
    "role": "EMPLOYEE",
    "passwordHash": "hashed_password_1",
    "createdAt": "2021-06-01",
    "updatedAt": "2023-10-01"
  },
  {
    "id": "e2",
    "employeeCode": "EMP002",
    "firstName": "Rahul",
    "lastName": "Sharma",
    "gender": "Male",
    "dateOfBirth": "1992-03-10",
    "email": "rahul@company.com",
    "phone": "9123456789",
    "hireDate": "2019-02-01",
    "joiningDate": "2019-03-01",
    "employmentStatus": "ACTIVE",
    "departmentId": "d1",
    "designationId": "des2",
    "reportingManagerId": "e3",
    "role": "HOD",
    "passwordHash": "hashed_password_2",
    "createdAt": "2019-03-01",
    "updatedAt": "2023-10-01"
  },
  {
    "id": "e3",
    "employeeCode": "EMP003",
    "firstName": "Meera",
    "lastName": "Iyer",
    "gender": "Female",
    "dateOfBirth": "1988-11-20",
    "email": "meera@company.com",
    "phone": "9000000000",
    "hireDate": "2015-01-01",
    "joiningDate": "2015-02-01",
    "employmentStatus": "ACTIVE",
    "departmentId": "d1",
    "designationId": "des1",
    "reportingManagerId": null,
    "role": "CEO",
    "passwordHash": "hashed_password_3",
    "createdAt": "2015-02-01",
    "updatedAt": "2023-10-01"
  }
]

const shiftDef=[
  {
    "id": "s1",
    "name": "Morning Shift",
    "startTime": "09:00",
    "endTime": "18:00",
    "gracePeriodMinutes": 15,
    "lateDeductionRuleId": "ldr1",
    "isNightShift": false
  }
]

const LateDeductionRule=[
  {
    "id": "ldr1",
    "ruleType": "PER_MINUTE",
    "value": 10,
    "formulaExpression": null
  }
]

const shiftAssignment=[
  {
    "id": "sa1",
    "employeeId": "e1",
    "departmentId": null,
    "shiftId": "s1",
    "effectiveFrom": "2023-01-01",
    "effectiveTo": null
  }
]

const attendancePunch=[
  {
    "id": "p1",
    "employeeId": "e1",
    "punchTime": "2023-10-01T09:10:00",
    "punchType": "IN",
    "source": "BIOMETRIC",
    "deviceId": "BIO-01",
    "latitude": null,
    "longitude": null
  },
  {
    "id": "p2",
    "employeeId": "e1",
    "punchTime": "2023-10-01T18:05:00",
    "punchType": "OUT",
    "source": "BIOMETRIC",
    "deviceId": "BIO-01",
    "latitude": null,
    "longitude": null
  }
]

const attendanceDailySummary=[
  {
    "id": "ad1",
    "employeeId": "e1",
    "date": "2023-10-01",
    "shiftId": "s1",
    "firstIn": "09:10",
    "lastOut": "18:05",
    "totalWorkingMinutes": 535,
    "lateMinutes": 10,
    "overtimeMinutes": 5,
    "attendanceStatus": "PRESENT",
    "isAdjusted": false
  }
]

const leaveTypes=[
  {
    "id": "lt1",
    "name": "Casual Leave",
    "annualEntitlement": 12,
    "carryForwardAllowed": true,
    "maxCarryForwardDays": 5
  }
]

const leaveApplication=[
  {
    "id": "la1",
    "employeeId": "e1",
    "leaveTypeId": "lt1",
    "startDate": "2023-10-15",
    "endDate": "2023-10-16",
    "totalDays": 2,
    "reason": "Personal Work",
    "status": "PENDING",
    "currentApprovalLevel": 1
  }
]

const salaryComponent=[
  { "id": "sc1", "name": "Basic Salary", "type": "ALLOWANCE", "calculationType": "FIXED", "value": 60000 },
  { "id": "sc2", "name": "Transport Allowance", "type": "ALLOWANCE", "calculationType": "FIXED", "value": 3000 },
  { "id": "sc3", "name": "PF", "type": "DEDUCTION", "calculationType": "PERCENTAGE", "value": 3 }
]

const paySlip=[
  {
    "id": "ps1",
    "payrollRunId": "pr1",
    "employeeId": "e1",
    "basicSalarySnapshot": 60000,
    "allowanceTotalSnapshot": 3000,
    "deductionTotalSnapshot": 2000,
    "taxSnapshot": 1500,
    "lateDeductionSnapshot": 100,
    "netSalary": 59400,
    "totalWorkingDays": 26,
    "absentDays": 1,
    "payableDays": 25
  }
]



