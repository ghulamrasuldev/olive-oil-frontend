import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LeaveForm from "../Pages/HumanResources/Employees/Leave";

const Dashboard = lazy(() => import("../Pages/Dashboard/dashboard"));
const GettingThingDone = lazy(() =>
  import("../Pages/Dashboard/GettingThingsDone")
);
const OrderManagement = lazy(() =>
  import("../Pages/orderManagement/orderManagement")
);
const Form = lazy(() => import("../Pages/orderManagement/orderForm/Form"));
const Analytics = lazy(() => import("../Pages/Analytics/Analytics"));
const CustomerManagement = lazy(() =>
  import("../Pages/customerManagement/index")
);
const CustomerForm = lazy(() =>
  import("../Pages/customerManagement/CustomerForm/index")
);
const WareHouse = lazy(() => import("../Pages/warehouseManagement/index"));
const OilStorage = lazy(() => import("../Pages/OilStorage/index"));
const CanBottleForm = lazy(() =>
  import("../Pages/warehouseManagement/CanAndBottle/index")
);
const SparePartsForm = lazy(() =>
  import("../Pages/warehouseManagement/SpareParts/index")
);
const HumanResource = lazy(() => import("../Pages/HumanResources/index"));
const Employees = lazy(() => import("../Pages/HumanResources/Employees/index"));
const Overview = lazy(() => import("../Pages/HumanResources/Overview"));
const AddEmployee = lazy(() =>
  import("../Pages/HumanResources/Employees/AddEmployee")
);
const Attendance = lazy(() =>
  import("../Pages/HumanResources/Attendance/index")
);
const Payroll = lazy(() => import("../Pages/HumanResources/PayRoll/index"));
const PayDetail = lazy(() =>
  import("../Pages/HumanResources/PayRoll/PayDetail/index")
);
const FinalBill = lazy(() =>
  import("../Pages/HumanResources/PayRoll/FinalBill/index")
);

const Profile = lazy(() => import("../Pages/HumanResources/Employees/Profile"));
const Finance = lazy(() => import("../Pages/Finance/index"));
const Account = lazy(() => import("../Pages/Finance/Account/index"));
const Ledger = lazy(() => import("../Pages/Finance/Ledger/index"));
const FinanceOverview = lazy(() => import("../Pages/Finance/Overview/index"));
const AccountForm = lazy(() =>
  import("../Pages/Finance/Account/AccountForm/index")
);
const Settings = lazy(() => import("../Pages/Settings/index"));

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/getting-things-don"
          element={<GettingThingDone />}
        />
        <Route path="/order-management" element={<OrderManagement />}>
          <Route path="new-order" element={<Form />} />
        </Route>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/customer-management" element={<CustomerManagement />}>
          <Route path="create-customer" element={<CustomerForm />} />
        </Route>
        <Route path="/warehouse-management" element={<WareHouse />}>
          <Route path="can-bottle" element={<CanBottleForm />} />
          <Route path="spare-parts" element={<SparePartsForm />} />
        </Route>
        <Route path="/oil-storage" element={<OilStorage />} />
        <Route path="/human-resources" element={<HumanResource />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="employees" element={<Employees />}>
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="leave-request" element={<LeaveForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="attendance" element={<Attendance />} />
          <Route path="payroll" element={<Payroll />}>
            <Route path="pay-detail" element={<PayDetail />}>
              <Route path="final-bill" element={<FinalBill />} />
            </Route>
          </Route>
        </Route>
        <Route path="/finance" element={<Finance />}>
          <Route index element={<FinanceOverview />} />
          <Route path="overview" element={<FinanceOverview />} />
          <Route path="chart-accounts" element={<Account />}>
            <Route path="new-entry" element={<AccountForm />} />
          </Route>
          <Route path="ledger" element={<Ledger />} />
        </Route>
        <Route path="setting" element= {<Settings />} />
      </Route>
     
      {/* <Route path='/signup' element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path='/forget' element={<Forget/>}/>
    <Route path='/code-verification' element={<Verification/>}/>
    <Route path='/reset-password' element={<ResetPassword/>}/>
  <Route path='/congratulations' element={<Congratulations/>}/> */}
    </Routes>
  );
};
export default AllRoutes;
