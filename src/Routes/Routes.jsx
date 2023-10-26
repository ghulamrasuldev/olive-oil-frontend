import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import LeaveForm from "../Pages/HumanResources/Employees/Leave";
import SignUp from "../Pages/SignUp/signUp";
import Login from "../Pages/Login/Login";
import Forget from "../Pages/Login/Forget/Forget";
import Verification from "../Pages/Login/Forget/CodeVerification/Verification";
import ResetPassword from "../Pages/Login/Forget/CodeVerification/ResetPassword/ResetPassword";
import Congratulations from "../Pages/Login/Forget/CodeVerification/ResetPassword/passwordChanged/Congratulations";
import NotFound from "../Pages/NotFound/index";
import { IsAuth } from "./IsAuth";
import {
  authenticateUser,
  notAuthenticateUser,
} from "../Redux/slice/authSlice";
import { useDispatch } from "react-redux";
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
const CanBottleComponent = lazy(() =>
  import("../Pages/warehouseManagement/CanAndBottle/index")
);
const SparePartsComponent = lazy(() =>
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
const AccessControl = lazy(() => import("../Pages/AccessControl/index"));
const AddUser = lazy(() => import("../Pages/AccessControl/AddUser/index"));
const EditUser = lazy(() => import("../Pages/AccessControl/EditUser/index"));
const LabService = lazy(() => import("../Pages/LabService/index"));
const AddOrder = lazy(() => import("../Pages/LabService/AddOrder"));
const SystemMaintenance = lazy(() =>
  import("../Pages/SystemMaintenance/index")
);
const NewService = lazy(() =>
  import("../Pages/SystemMaintenance/AddService/index")
);
const Communication = lazy(() => import("../Pages/communication/index"));
const AddStock = lazy(() =>
  import("../Pages/warehouseManagement/addStock/index")
);
const EditStock = lazy(() =>
  import("../Pages/warehouseManagement/EditStock/index")
);
const Adjustment = lazy(() =>
  import("../Pages/warehouseManagement/Adjustment/index")
);
const AddParts = lazy(() =>
  import("../Pages/warehouseManagement/SpareParts/AddParts")
);

const Setting = lazy(() => import("../Pages/Setting/index"));
const PartsForm = lazy(() => import("../Pages/Setting/addparts"));
const OutParts = lazy(() =>
  import("../Pages/warehouseManagement/SpareParts/OutParts")
);

const AllRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const Token = localStorage.getItem("authToken");
    if (Token) {
      dispatch(authenticateUser());
    } else {
      dispatch(notAuthenticateUser());
    }
  }, []);
  return (
    <Routes>
      <Route element={<IsAuth />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/getting-things-don"
            element={<GettingThingDone />}
          >
            <Route path="add-customer" element={<CustomerForm />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="leave-request" element={<LeaveForm />} />
            <Route path="add-test" element={<AddOrder />} />
            <Route path="new-entry" element={<AccountForm />} />
          </Route>
          <Route path="/order-management" element={<OrderManagement />}>
            <Route path="new-order" element={<Form />} />
          </Route>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/customer-management" element={<CustomerManagement />}>
            <Route path="create-customer" element={<CustomerForm />} />
          </Route>
          <Route path="/warehouse-management" element={<WareHouse />}>
            {/* <Route index element={<CanBottleComponent />} /> */}
            <Route index element={<Navigate to="can-and-bottles" />} />
            <Route path="can-and-bottles" element={<CanBottleComponent />}>
              <Route path="adjust-stock" element={<Adjustment />} />
              <Route path="add-stock" element={<AddStock />} />
              <Route path="edit-stock" element={<EditStock />} />
            </Route>
            <Route path="spare-parts" element={<SparePartsComponent />}>
              <Route path="add-parts" element={<AddParts />} />
              <Route path="out-parts" element={<OutParts />} />
            </Route>
          </Route>
          <Route path="/oil-storage" element={<OilStorage />}>
            <Route path="edit-stock" element={<EditStock />} />
          </Route>
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
          <Route path="/access-control" element={<AccessControl />}>
            <Route path="new-user" element={<AddUser />} />
            <Route path="edit-user" element={<EditUser />} />
          </Route>
          <Route path="/lab-service" element={<LabService />}>
            <Route path="new-order" element={<AddOrder />} />
          </Route>
          <Route path="/system-maintenance" element={<SystemMaintenance />}>
            <Route path="new-service" element={<NewService />} />
          </Route>
          <Route path="communication" element={<Communication />} />
          <Route path="setting" element={<Setting />}>
            <Route path="add-spare-parts" element={<PartsForm />} />
          </Route>
        </Route>
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/code-verification" element={<Verification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/congratulations" element={<Congratulations />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AllRoutes;
