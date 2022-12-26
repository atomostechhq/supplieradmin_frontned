import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Link from "../components/Link/Link";
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableWithPagination,
  Td,
  Th,
} from "../components/Table/Table";
import TablePagination from "../components/Table/TablePagination";
import Header from "../customComponents/header/Header";
import styles from "../styles/Stats.module.css";
import { useSalesOrderContext } from "./SalesOrderContext";

const Stats = () => {
  const { id } = useParams();
  const [open, setOpen] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { helperData, localstorageData, setLocalstorageData } =
    useSalesOrderContext();
  const [allotData, setAllotData] = useState();

  const getData = (e) => {
    axios
      // .get(`http://192.168.1.34:7000/api/v1/get-salesorder/`)
      .get(`http://192.168.1.36:7000/api/v1/sales/get-salesorders/${id}`)
      .then((res) => {
        setAllotData(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(allotData);
  console.log(localstorageData);

  return (
    <>
      <Header />
      <div className={styles.overview_container}>
        <section className={styles.project_order_nav}>
          <nav>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.projOrderLink
              }
              to={`/allocation/overview/${id}`}
            >
              Overview
            </NavLink>
            <NavLink
              to={`/allocation/allotment/${id}`}
              className={({ isActive }) =>
                isActive ? styles.active : styles.projOrderLink
              }
            >
              Allotment
            </NavLink>
            <NavLink
              to={`/allocation/stats/${id}`}
              className={({ isActive }) =>
                isActive ? styles.active : styles.projOrderLink
              }
            >
              Stats
            </NavLink>
          </nav>
        </section>
        <div className={styles.project_container}>
          <section className={styles.left_project_container}>
            <div>
              <h1>{allotData?.projectName}</h1>
              {localstorageData?.clients?.map((data) => {
                if (allotData?.clientId == data?.value) {
                  return <span>{data?.label}</span>;
                }
              })}
            </div>
            <div>
              <button className={styles.edit}>Edit</button>
            </div>
            <div className={styles.projNum}>
              [PN #{allotData?.salesorder_id}]
            </div>
          </section>
        </div>
        {/* Table */}
        <div className={styles.statsTable}>
          <TableWithPagination>
            <Table>
              <TableHead>
                <TableRow>
                  <Th>Supplier ID</Th>
                  <Th>Completes</Th>
                  <Th>Terminates</Th>
                  <Th>IR</Th>
                  <Th>Avg CPI</Th>
                  <Th>Quota Fulls</Th>
                  <Th>Drops</Th>
                  <Th>Quality Terminates</Th>
                </TableRow>
              </TableHead>
              {/* <TableBody>
                {data
                  ?.slice(
                    pageNumber * rowsPerPage - rowsPerPage,
                    pageNumber * rowsPerPage
                  )
                  .map((d, i) => {
                    return (
                      <TableRow key={i}>
                        <Td>
                          <Link border="underline" to="/supplier-overview">
                            {d.id}
                          </Link>
                        </Td>
                        <Td>{d.completes}</Td>
                        <Td>{d.terminates}</Td>
                        <Td>{d.ir}</Td>
                        <Td>{d.avgCpi}</Td>
                        <Td>{d.quotaFull}</Td>
                        <Td>{d.drops}</Td>
                        <Td>{d.qualityTerminates}</Td>
                      </TableRow>
                    );
                  })}
              </TableBody> */}
            </Table>
            {/* <TablePagination
                            totalDataCnt={data.length ? data.length : 0}
                            itemsPerPageArray={[20,50,100]}
                          /> */}
          </TableWithPagination>
        </div>
      </div>
    </>
  );
};

export default Stats;
