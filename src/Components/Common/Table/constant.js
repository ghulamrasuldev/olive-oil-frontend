export const tableData = [
    {
      orderId: "1-29-2023-001",
      farmer: " Abu Huraira",
      phone: " 315-4970584",
      weight: " 233kg",
      city: " Abu Dhabi",
      town: " Jadha",
      line: " Line-01",
      status: "Processing",
    },
    {
      orderId: "1-29-2023-001",
      farmer: "Ali",
      phone: " 315-4970584",
      weight: " 121kg",
      city: " Dubai",
      town: " lahore",
      line: " Line-01",
      status: "Completed",
    },
    {
      orderId: "1-29-2023-001",
      farmer: " Abu Huraira",
      phone: " 321-4970584",
      weight: " 233kg",
      city: " Abu Dhabi",
      town: " Jadha",
      line: " Line-01",
      status: "Canceled",
    },
    {
      orderId: "1-29-2023-001",
      farmer: " Abu Huraira",
      phone: " 315-4970584",
      weight: " 233kg",
      city: " Abu Dhabi",
      town: " Jadha",
      line: " Line-01",
      status: "New",
    },
    {
      orderId: "1-29-2023-001",
      farmer: " Ali",
      phone: " 300-4970584",
      weight: " 233kg",
      city: " Abu Dhabi",
      town: " Jadha",
      line: " Line-01",
      status: "New",
    },
];
export const customerTableData = [
  {
    orderId: "1-29-2023-001",
    name: " Abu Huraira",
    phone: " 315-4970584",
    loyalty: "Silver",
    city: " Abu Dhabi",
    date: "21-08-2023",
    time: "1:16 pm",
    OilProcessed: "987654 kg",
  },
  {
    orderId: "1-29-2023-001",
    name: " Ali",
    phone: " 315-4970584",
    loyalty: "Platinum",
    city: "Jadha",
    date: "21-09-2023",
    time: "1:16 pm",
    OilProcessed: "987654 kg",
  },
  {
    orderId: "1-29-2023-001",
    name: " Usman",
    phone: " 315-4970584",
    loyalty: "N/A",
    city: " Abu Dhabi",
    date: "21-07-2023",
    time: "3:16 pm",
    OilProcessed: "912154 kg",
  },
  {
    orderId: "1-29-2023-001",
    name: " Abu Huraira",
    phone: " 315-4970584",
    loyalty: "Silver",
    city: " Abu Dhabi",
    date: "21-08-2023",
    time: "1:16 pm",
    OilProcessed: "`117654 kg",
  },
  {
    orderId: "1-29-2023-001",
    name: " Abu Huraira",
    phone: " 123-4970584",
    loyalty: "Gold",
    city: " Abu Dhabi",
    date: "21-08-2023",
    time: "1:16 pm",
    OilProcessed: "987654 kg",
  },
  
];
export const WarehouseOilTableData = [
  {
    transactionId: "1-29-2023-001",
    inOut: "In",
    amount: "200kg",
    authorized: "Owner",
    linkedOrder: " 1-29-2023-001",
    paymentMethod: "By Cash",
  },
  {
    transactionId: "1-29-2023-002",
    inOut: "Out",
    amount: "50kg",
    authorized: "Owner",
    linkedOrder: " 1-29-2023-003",
    paymentMethod: "By Cash",
  },
  {
    transactionId: "1-29-2023-001",
    inOut: "In",
    amount: "50kg",
    authorized: "Owner",
    linkedOrder: " 1-29-2023-001",
    paymentMethod: " By Cash",
  },
  {
    transactionId: "1-29-2023-001",
    inOut: "In",
    amount: "90kg",
    authorized: "Owner",
    linkedOrder: " 1-29-2023-001",
    paymentMethod: "By Cash",
  },
  {
    transactionId: "1-29-2023-001",
    inOut: "In",
    amount: "10kg",
    authorized: "Owner",
    linkedOrder: " 1-29-2023-001",
    paymentMethod: "By Cash",
  },
 
];
  
export const AttendanceTableData = [
  {
    name: 'Huraira',
    id: '34342',
    designation: 'Software Eng',
    workingHours:'9hr 10min',
    attendance:'present'
  },
  {
    name: 'Huraira',
    id: '34342',
    designation: 'Software Eng',
    workingHours:'9hr 10min',
    attendance:'absent'
  },
  {
    name: 'Huraira',
    id: '34342',
    designation: 'Software Eng',
    workingHours:'9hr 10min',
    attendance:'present'
  },
  {
    name: 'Huraira',
    id: '34342',
    designation: 'Software Eng',
    workingHours:'9hr 10min',
    attendance:'absent'
  },
  {
    name: 'Huraira',
    id: '34342',
    designation: 'Software Eng',
    workingHours:'9hr 10min',
    attendance:'present'
  },
]

export const PayTableData = [
  {
    name: 'Huraira',
    id: '34543',
    jobTitle: 'Software Eng',
    basePay: '$250',
    bonus: '$50',
    netPay: '$300',
  },
  {
    name: 'Huraira',
    id: '34543',
    jobTitle: 'Software Eng',
    basePay: '$250',
    bonus: '$50',
    netPay: '$300',
  },
  {
    name: 'Huraira',
    id: '34543',
    jobTitle: 'Software Eng',
    basePay: '$250',
    bonus: '$50',
    netPay: '$300',
  },
  {
    name: 'Huraira',
    id: '34543',
    jobTitle: 'Software Eng',
    basePay: '$250',
    bonus: '$50',
    netPay: '$300',
  },
  {
    name: 'Huraira',
    id: '34543',
    jobTitle: 'Software Eng',
    basePay: '$250',
    bonus: '$50',
    netPay: '$300',
  },
]

export const accountTableData = [
  {
    name: 'Cash',
    type: 'Assets',
    dType:'Cash on hand',
    amount: '3000',
    action:"Account History"
  },
  {
    name: 'Accounts receivable',
    type: 'Assets',
    dType:'Money Owned',
    amount: '5000',
    action:"Account History"
  },
  {
    name: 'Prepaid expenses',
    type: 'Assets',
    dType:'Paid in advance',
    amount: '3000',
    action:"Account History"
  },
  {
    name: 'Property,plant,equip...',
    type: 'Assets',
    dType:'Owned by business',
    amount: '1200',
    action:"Account History"
  },
  {
    name: 'Accounts Payable',
    type: 'Liabilities',
    dType:'Services Purchased',
    amount: '2000',
    action:"Account History"
  },
  {
    name: 'Accrued expenses',
    type: 'Liabilities',
    dType:'Incurred but not yet paid',
    amount: '3000',
    action:"Account History"
  },
  {
    name: 'Unearned revenue',
    type: 'Liabilities',
    dType:'Money received',
    amount: '8000',
    action:"Account History"
  },
  {
    name: 'Long term liabilities',
    type: 'Liabilities',
    dType:"Debts that won't be paid..",
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Owner’s capital',
    type: 'Equity',
    dType:"Owner's investment",
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Retained earnings',
    type: 'Equity',
    dType:'Accumulated profits or lo..',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Service revenue',
    type: 'Revenue',
    dType:'Tracks income earned',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Cost of goods sold',
    type: 'Expenses',
    dType:'Expenses',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Rent',
    type: 'Expenses',
    dType:'Cost of renting office spa..',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Salaries and wages',
    type: 'Expenses',
    dType:'Compensation paid to.....',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Advertising and market..',
    type: 'Expenses',
    dType:'Cost of office supplies',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Advertising and market..',
    type: 'Expenses',
    dType:'Cost of office supplies',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Utilities',
    type: 'Expenses',
    dType:'Cost of electricity, gas,',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Insurance',
    type: 'Expenses',
    dType:'Insuring the business',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Depreciation and amor..',
    type: 'Expenses',
    dType:'The decrease in value of..',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Professional fees',
    type: 'Expenses',
    dType:'Fees paid to lawyers',
    amount: '3000',
    action:"Run Report"
  },
  {
    name: 'Taxes',
    type: 'Expenses',
    dType:"Business's tax liabilities",
    amount: '3000',
    action:"Run Report"
  },
]

export const ledgerTableData = [
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  {
    date: '04/09/2023',
    description: 'Olive Oil System',
    debit: '$10,000',
    credit: '$10,000',
    totalDebit: '$20,000',
    totalCredit:'$20,000'
  },
  
]

export const accessControlData = [
  {
    roleId: '321',
    roleName: 'Gammer',
    accessControl: 'Full Access',
    status: 'active',
   
  },
  {
    roleId: '3221',
    roleName: 'Batman',
    accessControl: 'Full Access',
    status: 'active',
   
  },
  {
    roleId: '31221',
    roleName: 'Monster',
    accessControl: 'Full Access',
    status: 'active',
   
  }
  ,{
    roleId: '1323',
    roleName: 'Drug Dealer',
    accessControl: 'Full Access',
    status: 'active',
   
  },
  {
    roleId: '12432',
    roleName: 'Spy',
    accessControl: 'Full Access',
    status: 'active',
   
  },
  {
    roleId: '3112',
    roleName: 'Commando',
    accessControl: 'Full Access',
    status: 'active',
   
  }

]

export const employRolesData = [
{
  employId:'1122',
  employName:'yasir',
  role:'ceo',
  status:'active'
},
{
  employId:'12',
  employName:'ubaid',
  role:'employee',
  status:'active'
},
{
  employId:'4554',
  employName:'client',
  role:'coding',
  status:'active'
},
{
  employId:'543',
  employName:'Dr',
  role:'love',
  status:'active'
},
{
  employId:'765',
  employName:'Tester',
  role:'testing',
  status:'active'
}


]