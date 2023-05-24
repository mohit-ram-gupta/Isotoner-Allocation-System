import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Header from "./Header";
import Sales from "./Sales";
import StockDashboard from "./StockDashboard";
import StoreAdministration from "./StoreAdministration";
import ProductAdministration from "./ProductAdministration";
import SalesImport from "./SalesImport";

function App() {
  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
        <Route path="/sales" element={<Protected Component={Sales} />} />
        <Route path="/stockdashboard" element={<Protected Component={StockDashboard} />} />
        <Route path="/storeadministration" element={<Protected Component={StoreAdministration} />} />
        <Route path="/productadministration" element={<Protected Component={ProductAdministration} />} />
        <Route path="/SalesImport" element={<Protected Component={SalesImport} />} />
        <Route path="/storeadministration" element={<Protected Component={StoreAdministration} />} />
        <Route path="/storeadministration" element={<Protected Component={StoreAdministration} />} />
        <Route path="/storeadministration" element={<Protected Component={StoreAdministration} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
