import Test from "./pages/Test";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import SupplierAdminApp from "./pages/SupplierAdminApp";
import Allocations from "./pages/Allocations";
import SupplierAdminAppOverview from "./pages/SupplierAdminAppOverview";
import Header from "./customComponents/header/Header";
import Overview from "./pages/Overview";
import Allotment from "./pages/Allotment";
import Stats from "./pages/Stats";
import SalesOrderContextProvider from "./pages/SalesOrderContext";
import HelperDataContextProvider from "./context/HelperDataContext";
import Quotation from "./pages/Quotation";
function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Test />} />
          <Route
            path="/application"
            element={
              <SalesOrderContextProvider>
                <SupplierAdminApp />
              </SalesOrderContextProvider>
            }
          />
          <Route
            path="/allocation"
            element={
              <HelperDataContextProvider>
                <SalesOrderContextProvider>
                  <Allocations />
                </SalesOrderContextProvider>
              </HelperDataContextProvider>
            }
          />
          <Route
            path="/supplier-overview/:supplierId"
            element={<SupplierAdminAppOverview />}
          />
          <Route
            path="/allocation/overview/:id"
            element={
              <HelperDataContextProvider>
                <Overview />
              </HelperDataContextProvider>
            }
          />
          <Route
            path="/allocation/allotment/:id"
            element={
              <HelperDataContextProvider>
                <Allotment />
              </HelperDataContextProvider>
            }
          />
          <Route
            path="/allocation/stats/:id"
            element={
              <SalesOrderContextProvider>
                <Stats />
              </SalesOrderContextProvider>
            }
          />
          <Route path="/quotation/:id" element={<Quotation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
