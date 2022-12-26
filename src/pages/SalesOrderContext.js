import { createContext, useContext, useEffect, useState } from "react";
import { SUPPLIER_BASE_URL, SALES_BASE_URL } from "../config";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { parse } from "uuid";

const SalesOrderContext = createContext();

export const useSalesOrderContext = () => {
  return useContext(SalesOrderContext);
};

const SalesOrderContextProvider = ({ children }) => {
  const [supplierData, setSupplierData] = useState([]);

  const [salesOrderData, setSalesorderData] = useState({});
  const urlSearchParams = new URLSearchParams(window.location.search);
  const SupplierUrlSearchParams = new URLSearchParams(window.location.search);
  let params = Object.fromEntries(urlSearchParams.entries());
  let suppliersParams = Object.fromEntries(SupplierUrlSearchParams.entries());
  const [searchParams, setSearchParams] = useSearchParams(params);
  const [searchSupplierParams, setSearchSupplierparams] =
    useSearchParams(suppliersParams);

  const fetchSuppliers = () => {
    axios
      .get(
        `${SUPPLIER_BASE_URL}/supplieradmin/get-suppliers-details${window.location.search}`
      )
      .then((res) => {
        console.log(res.data);
        // setSalesorderDataCopy(res.data);
        setSupplierData(res.data);
      })
      .then((err) => console.log(err));
  };

  const fetchSalesOrders = () => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorder${window.location.search}`)
      .then((res) => {
        console.log(res.data);
        // setSalesorderDataCopy(res.data);
        setSalesorderData(res.data);
        // filterSalesOrder(res.data.salesOrders);
      })
      .then((err) => console.log(err));
  };

  useMemo(() => {
    fetchSuppliers();
    fetchSalesOrders();
  }, [searchParams, searchSupplierParams]);

  console.log(searchParams);

  const handleFilterChange = (key, value) => {
    if (value && value !== undefined && value !== null)
      setSearchParams((prev) => ({ ...params, [key]: value, page: 1 }));
    else {
      delete params[key];
      setSearchParams(() => ({ ...params, page: 1 }));
    }
  };

  const handleSupplierFilterChange = (key, value) => {
    if (value && value !== undefined && value !== null)
      setSearchSupplierparams((prev) => ({
        ...suppliersParams,
        [key]: value,
        page: 1,
      }));
    else {
      delete suppliersParams[key];
      setSearchSupplierparams(() => ({ ...suppliersParams, page: 1 }));
    }
  };
  const value = {
    salesOrderData,
    supplierData,
    handleFilterChange,
    handleSupplierFilterChange,
    params,
    suppliersParams,
    fetchSuppliers,
    fetchSalesOrders,
  };

  return (
    <SalesOrderContext.Provider value={value}>
      {children}
    </SalesOrderContext.Provider>
  );
};

export default SalesOrderContextProvider;
