import { useEffect, useState } from "react";
import Button from "../components/Button";
import Chip from "../components/Chips/Chip";
import Dropdown from "../components/Dropdown/Dropdown";
import Search from "../components/Search/Search";
import axios from "axios";
import { SUPPLIER_BASE_URL } from "../config";
import Table, {
  TableActionPopUp,
  TableBody,
  TableHead,
  TableRow,
  TableWithPagination,
  Td,
  Th,
} from "../components/Table/Table";
import TablePagination from "../components/Table/TablePagination";
import TabContext, {
  Tab,
  TabList,
  TabPanel,
} from "../components/Tab/TabContext";
import Navlink from "../components/Navlink/Navlink";
import Link from "../components/Link/Link";
import Header from "../customComponents/header/Header";
import { useSalesOrderContext } from "./SalesOrderContext";
import _ from "lodash";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineSortDescending } from "react-icons/ai";
import { AiOutlineSortAscending } from "react-icons/ai";

const SupplierStatus = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "APPROVED",
    value: "approved",
  },
  {
    label: "PENDING",
    value: "pending",
  },
  {
    label: "REJECTED",
    value: "rejected",
  },
  // {
  //   label: "ARCHIEVED",
  //   value: "archieved",
  // },
  // {
  //   label: "INCOMPLETE",
  //   value: "incomplete",
  // },
];

const SupplierAdminApp = () => {
  const statusColors = {
    unseen: "error",
    seen: "primary",
    approved: "success",
  };

  let {
    supplierData,
    handleSupplierFilterChange,
    suppliersParams,
    fetchSuppliers,
  } = useSalesOrderContext();
  const [allsupplierData, setAllSupplierData] = useState([]);
  const [countrySelect, setCountrySelect] = useState({});
  const [sortcountryData, setSortcountryData] = useState(true);
  const [sortDateFilter, setSortDateFilter] = useState(true);
  const [ascendingicon, setAscendingicon] = useState(false);
  const [dateAscendingicon, setDateAscendingicon] = useState(false);

  let countryDropdownData = [];

  useEffect(() => {
    supplierData.forEach((res) => {
      return res?.SupplierCompanyDetails?.forEach((data) => {
        return data?.SupplyCountries?.forEach((count) => {
          countryDropdownData.push({
            label: count?.country_label,
            value: count?.supplier_country_id,
          });
        });
      });
    });
  }, [countryDropdownData, supplierData]);

  const handlesortCountry = () => {
    setAllSupplierData(
      supplierData.sort((a, b) => {
        if (
          a?.SupplierCompanyDetails[0]?.SupplyCountries[0]?.country_label >
          b?.SupplierCompanyDetails[0]?.SupplyCountries[0]?.country_label
        ) {
          return 1;
        }
        if (
          a?.SupplierCompanyDetails[0]?.SupplyCountries[0]?.country_label <
          b?.SupplierCompanyDetails[0]?.SupplyCountries[0]?.country_label
        ) {
          return -1;
        }
        return 0;
      })
    );
  };

  const toggleSort = () => {
    setSortcountryData(!sortcountryData);
    setAscendingicon(!ascendingicon);
    sortcountryData ? handlesortCountry() : fetchSuppliers();
  };

  const handleSortDate = () => {
    supplierData?.sort(
      (a, b) =>
        new Date(...a.date_applied.split("/").reverse()) -
        new Date(...b.date_applied.split("/").reverse())
    );
  };

  const dateSorting = () => {
    setSortDateFilter(!sortDateFilter);
    setDateAscendingicon(!dateAscendingicon);
    sortDateFilter ? handleSortDate() : fetchSuppliers();
  };

  console.log(supplierData);
  // console.log(allsupplierData);
  // console.log(countrySelect);
  console.log(sortDateFilter);
  console.log(suppliersParams);

  const icons = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "120px",
  };

  return (
    <>
      <Header />
      <div className=" custom-px w-full flex flex-col gap-12">
        <div className="flex justify-between w-full ">
          <div className=" w-[100%] test ">
            <p className="text-[32px] font-[400] text-[#1765DC] mb-5">
              Supplier Applications
            </p>
            <div className="flex  justify-between ">
              <div className="w-[100%]  ">
                <div className="">
                  <TabContext
                    onChange={(value) =>
                      handleSupplierFilterChange("view", value)
                    }
                    value={suppliersParams?.view}
                    position="horizontal"
                  >
                    <TabList>
                      {SupplierStatus?.map((status) => {
                        return <Tab value={status?.value}>{status?.label}</Tab>;
                      })}
                    </TabList>
                    <TabPanel value={suppliersParams?.view}>
                      <div className="flex py-5">
                        <div className=" w-[80%] flex items-center flex-row gap-5">
                          <div>
                            <Dropdown
                              dropdownText="Country Name"
                              options={countryDropdownData}
                              onChange={(e) => {
                                setCountrySelect({
                                  ...countrySelect,
                                  country: e?.value,
                                });
                              }}
                            />
                          </div>
                          <div>
                            <Button
                              variant="alternate"
                              onClick={toggleSort}
                              style={icons}
                            >
                              Country
                              {/* <FiChevronDown
                                className={ascendingicon ? "rotate-180" : null}
                              /> */}
                              {ascendingicon ? (
                                <AiOutlineSortAscending
                                  style={{ fontSize: "22px" }}
                                />
                              ) : (
                                <AiOutlineSortDescending
                                  style={{ fontSize: "22px" }}
                                />
                              )}
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="alternate"
                              onClick={dateSorting}
                              style={icons}
                            >
                              Date
                              {dateAscendingicon ? (
                                <AiOutlineSortAscending
                                  style={{ fontSize: "22px" }}
                                />
                              ) : (
                                <AiOutlineSortDescending
                                  style={{ fontSize: "22px" }}
                                />
                              )}
                            </Button>
                          </div>
                          <div className="pt-4 text-[16px]">
                            <span
                              color="#1765DC"
                              border="underline"
                              onClick={() =>
                                setCountrySelect({
                                  country: "",
                                })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Clear Filter
                            </span>
                          </div>
                        </div>
                        <div className=" w-[20%] flex justify-end items-start">
                          <div>
                            <Search
                              placeholder="Search by CompanyName"
                              value={suppliersParams?.q}
                              onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                  console.log(e);
                                  handleSupplierFilterChange(
                                    "q",
                                    e.target.value
                                  );
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Table */}
                      <div className="project_order_table">
                        <TableWithPagination>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <Th>Name</Th>
                                <Th>Website</Th>
                                <Th>Country</Th>
                                <Th>Status</Th>
                                <Th>Employees</Th>
                                <Th> Experience</Th>
                                <Th>Date Applied</Th>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {supplierData
                                ?.filter((data) => {
                                  let newData = data;
                                  let supplierCompanyDetails =
                                    data?.SupplierCompanyDetails[0]?.SupplyCountries?.filter(
                                      (res) => {
                                        return !countrySelect?.country
                                          ? res
                                          : res?.supplier_country_id ==
                                              countrySelect?.country;
                                      }
                                    );
                                  if (supplierCompanyDetails?.length)
                                    return {
                                      ...newData,
                                      SupplierCompanyDetails:
                                        supplierCompanyDetails,
                                    };
                                })
                                .map((d, i) => {
                                  return (
                                    <TableRow key={i}>
                                      <Td>
                                        <Link
                                          border="underline"
                                          to={`/supplier-overview/${d?.supplier_id}`}
                                        >
                                          {/* {d?.SupplierCompanyDetails?.map(
                                            (res) => {
                                              return res?.company_name;
                                            }
                                          )} */}
                                          {d?.company_name}
                                        </Link>
                                      </Td>
                                      <Td>
                                        <a target="_blank">
                                          {d?.SupplierCompanyDetails?.map(
                                            (res) => {
                                              return res?.official_website
                                                ? res?.official_website
                                                : "NA";
                                            }
                                          )}
                                        </a>
                                      </Td>
                                      <Td>
                                        {d?.SupplierCompanyDetails?.map(
                                          (details) => {
                                            return details?.SupplyCountries?.map(
                                              (country) => {
                                                return country?.country_label
                                                  ? country?.country_label
                                                  : "NA";
                                              }
                                            );
                                          }
                                        )}
                                      </Td>
                                      <Td>
                                        <Chip variant="filled" color="primary">
                                          {d?.status ? d?.status : "NA"}
                                        </Chip>
                                      </Td>

                                      <Td>
                                        {" "}
                                        {d?.SupplierCompanyDetails?.map(
                                          (res) => {
                                            return res?.no_of_employees
                                              ? res?.no_of_employees
                                              : "NA";
                                          }
                                        )}
                                      </Td>
                                      <Td>
                                        {d.SupplierCompanyDetails?.map(
                                          (res) => {
                                            return res?.years_in_business;
                                          }
                                        )}
                                      </Td>
                                      <Td>
                                        {d.date_applied ? d.date_applied : "NA"}
                                      </Td>
                                    </TableRow>
                                  );
                                })
                                .reverse()}
                            </TableBody>
                          </Table>
                          <TablePagination
                            totalDataCnt={
                              supplierData.count ? supplierData?.count : 0
                            }
                            itemsPerPageArray={[10, 15, 20]}
                          />
                        </TableWithPagination>
                      </div>
                    </TabPanel>
                  </TabContext>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
};

export default SupplierAdminApp;
