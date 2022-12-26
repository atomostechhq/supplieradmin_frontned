import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Chip from "../components/Chips/Chip";
import Dropdown from "../components/Dropdown/Dropdown";
import Header from "../customComponents/header/Header";
import styles from "../styles/Allotment.module.css";
import { AiFillInfoCircle } from "react-icons/ai";
import Button from "../components/Button";
import { BiCaretDown } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import Modal from "../components/Modal/Modal";
import { ModalContent } from "../components/Modal/Modal.style";
import Select from "react-select";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { SALES_BASE_URL, SUPPLIER_BASE_URL } from "../config";
import { useHelperDataContext } from "../context/HelperDataContext";
import { data } from "autoprefixer";
import { AiFillCloseCircle } from "react-icons/ai";

const collapseData = [
  {
    countries: [
      {
        id: 111,
        supplierName: "Supplier Name",
        level: "Gold",
        countryName: "japan",
        allocation: 328,
        avgCpi: 13,
        totalBudget: 900,
        allocationStatus: "Approved",
        emailSent: "Sent",
        tg: [
          {
            level: "Silver",
            targetGroupName: "tg1",
          },
          {
            level: "Silver",
            targetGroupName: "tg2",
          },
        ],
      },
      {
        id: 222,
        level: "Gold",
        countryName: "usa",
        tg: [
          {
            level: "Silver",
            targetGroupName: "tg3",
          },
          {
            level: "Silver",
            targetGroupName: "tg1",
          },
        ],
      },
      {
        id: 333,
        level: "Gold",
        countryName: "india",
      },
    ],
  },
];

const addSupplierOptions = [
  { label: "Sachin Verma", value: "Sachin Verma" },
  { label: "Irfan Pathan", value: "Irfan Pathan" },
  { label: "Kalpana Chawla", value: "Kalpana Chawla" },
  { label: "Nikolas Tesla", value: "Nikolas Tesla" },
];

const supplierChips = ["Supplier1", "Supplier2", "Supplier3"];

const Allotment = () => {
  const { id } = useParams();
  const [open, setOpen] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allotData, setAllotData] = useState();
  const { helperData } = useHelperDataContext();
  const [allSupplierData, setAllSupplierData] = useState([]);
  const [tempSupplierData, setTempSupplierData] = useState([]);
  const [tableModal, setTableShowModal] = useState(false);
  const [countryModal, setCountryModal] = useState([]);
  const [supplierCpiAllocation, setSupplierCpiAllocation] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [cpiAndAllocation, setCpiAndAllocation] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const openCpiAllocationModal = () => {
    setCpiAndAllocation((prev) => !prev);
  };

  const handlesupplierTablecheckbox = (e) => {
    setCheckbox(!checkbox);
  };
  console.log(checkbox);

  const openTableModal = () => {
    setTableShowModal((prev) => !prev);
  };

  const getData = (e) => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`)
      .then((res) => {
        setAllotData(res?.data);
      })
      .catch((err) => console.log(err));
  };

  const getsuppliersdetails = (e) => {
    let supplierData = [];
    axios
      .get(`${SUPPLIER_BASE_URL}/supplieradmin/get-suppliers-details`)
      .then((res) => {
        res?.data?.forEach((supplier) => {
          supplierData.push({
            label: supplier?.bid_contact_name,
            value: supplier?.supplier_id,
            supplierStatus: supplier?.supplierStatus,
          });
          setAllSupplierData(supplierData);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mangesupplierData = (key, value) => {
    let newArr = [...allSupplierData];
    if (value === "all") {
      return setTempSupplierData(newArr);
    } else if (value === "delete") {
      return setTempSupplierData(key);
    } else {
      // if (!status?.[value]) {
      //   setStatus((prev) => ({
      //     ...prev,
      //     [value]: true,
      //   }));
      setTempSupplierData(
        newArr?.filter((fData) => fData?.[key]?.toLowerCase() == value)
      );
      // } else {
      //   let myArr = newArr?.filter(
      //     (data) => data?.[key]?.toLowerCase() == value
      //   );
      //   return setTempSupplierData((prev) => [...prev, ...myArr]);
      // }
    }
  };

  const deleteSupplier = (i) => {
    // console.log(i);
    let newArr = [...tempSupplierData];
    setTempSupplierData(newArr?.filter((index) => index.value !== i));
    return newArr;
  };

  useEffect(() => {
    getData();
    getsuppliersdetails();
  }, []);

  // country checkbox

  const [countryCheck, setCountryCheck] = useState({});
  const handleCountryGrpcheckBox = (e, i, count) => {
    setCountryCheck((prev) => ({
      ...prev,
      [count?.countryName]: countryCheck[count?.countryName]
        ? setCountryCheck({})
        : count,
    }));
  };

  const handleCountryTgcheckBox = (e, countryname, j, tg) => {
    setCountryCheck((prev) => ({
      ...prev,
      [tg?.tgTargetAudience]: countryCheck[tg?.tgTargetAudience]
        ? setCountryCheck({})
        : tg,
    }));
  };

  const handleSaveSupplier = () => {
    setShowModal((prev) => !prev);
    setTableShowModal((prev) => !prev);
    setSupplierCpiAllocation([
      { supplier: tempSupplierData, countryORTg: countryCheck },
    ]);
  };

  console.log(countryCheck);
  console.log(supplierCpiAllocation);
  // console.log(allSupplierData);
  console.log(allotData);
  console.log(tempSupplierData);
  // console.log(countryModal);

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
              {helperData?.clients?.map((data) => {
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
          <section className={styles.right_project_container}>
            <Button variant="filled" onClick={openModal}>
              Add Supplier
            </Button>
          </section>
        </div>
        {/* add supplier modal */}
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ModalContent>
            <div className={styles.addSupplierContainer}>
              <h2>Add Supplier</h2>
              <p className={styles.projName}>{allotData?.projectName}</p>
              <p className={styles.projId}>ID {allotData?.salesorder_id}</p>
              <Select
                options={allSupplierData}
                name="suppliers"
                value={tempSupplierData}
                isMulti
                onChange={(e) => mangesupplierData(e, "delete")}
              />
              <div className="mt-8">
                <section className="flex gap-3">
                  <Button
                    variant="filled"
                    onClick={() => mangesupplierData("supplierStatus", "all")}
                  >
                    Add All
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      mangesupplierData("supplierStatus", "primary")
                    }
                  >
                    Add Primary
                  </Button>
                  <Button
                    variant="alternate"
                    onClick={() =>
                      mangesupplierData("supplierStatus", "secondary")
                    }
                  >
                    Add Secondary
                  </Button>
                </section>
                <section className="mt-7">
                  <Button
                    style={{ width: "100%" }}
                    variant="filled"
                    onClick={() => {
                      openTableModal();
                      setCountryModal(() => {
                        let countryData = [];
                        Object.keys(allotData?.countries)?.forEach(
                          (key, value) => {
                            countryData.push(...allotData?.countries[key]);
                          }
                        );
                        return countryData;
                      });
                    }}
                    disabled={
                      !allSupplierData == tempSupplierData ? true : false
                    }
                  >
                    Next
                  </Button>
                </section>
              </div>
            </div>
          </ModalContent>
        </Modal>

        {/* supplier country table modal */}
        <Modal showModal={tableModal} setShowModal={setTableShowModal}>
          <ModalContent>
            <div className={styles.supplierChips}>
              <h2>Allocate Supplier</h2>
              <span>{allotData?.projectName}</span>
              <p>{allotData?.salesorder_id}</p>
              <section>
                {tempSupplierData.map((data, i) => (
                  <p>
                    <span>{data?.label}</span>
                    <AiFillCloseCircle
                      size={18}
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteSupplier(data?.value)}
                    />
                  </p>
                ))}
              </section>
            </div>
            <div className={styles.approve_supplier_container}>
              <div className={styles.approveSupplier_collapse_table}>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Country {">"} Target audience</th>
                      <th>IR</th>
                      <th>Feasibility</th>
                      <th>Timeline</th>
                      <th>CPI</th>
                      <th>Total Budget</th>
                      <th>Allocation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryModal?.map((country, i) => {
                      return (
                        <React.Fragment key={uuid()}>
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                style={{ cursor: "pointer" }}
                                onChange={(e) =>
                                  handleCountryGrpcheckBox(e, i, country)
                                }
                                checked={countryCheck[country?.countryName]}
                              />
                            </td>
                            <td
                              onClick={() => {
                                if (!countryModal[i]?.open) {
                                  let x = countryModal;
                                  x[i].open = true;
                                  setCountryModal([...x]);
                                } else {
                                  let x = countryModal;
                                  x[i].open = false;
                                  setCountryModal([...x]);
                                }
                              }}
                            >
                              <div className={styles.flex}>
                                <span className={styles.icon}>
                                  <BiCaretDown />
                                </span>
                                <span> {country?.countryName}</span>
                              </div>
                            </td>
                            <td>{country?.avgIr}</td>
                            <td>{country?.feasibilitySum}</td>
                            <td>{country?.maxTimelinePerTg}</td>
                            <td>{country?.avgCpi}</td>
                            <td>{country?.totalBudgetSum}</td>
                            <td>
                              <Chip variant="filled" color="warning">
                                Pending
                              </Chip>
                            </td>
                          </tr>
                          {country?.open &&
                            country?.tgs?.map((tg, j) => {
                              return (
                                <tr key={tg?.id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      style={{ cursor: "pointer" }}
                                      onChange={(e) =>
                                        handleCountryTgcheckBox(
                                          e,
                                          country?.countryName,
                                          j,
                                          tg
                                        )
                                      }
                                      checked={
                                        countryCheck[country?.countryName]
                                          ? countryCheck[country?.countryName]
                                          : countryCheck?.[tg?.tgTargetAudience]
                                      }
                                    />
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "4em",
                                    }}
                                  >
                                    <ul className={styles.ul}>
                                      <li>
                                        {tg?.tgTargetAudience} (ID #{tg?.id})
                                      </li>
                                    </ul>
                                  </td>
                                  <td>{tg?.ir}</td>
                                  <td>{tg?.feasibility}</td>
                                  <td>{tg?.timeline}</td>
                                  <td>{tg?.cpi}</td>
                                  <td>{tg?.totalBudget}</td>
                                  <td>
                                    <Chip variant="filled" color="warning">
                                      Pending
                                    </Chip>
                                  </td>
                                </tr>
                              );
                            })}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <section className={styles.saveBtn}>
              <Button
                onClick={handleSaveSupplier}
                variant="filled"
                disabled={Object.keys(countryCheck).length === 0 ? true : false}
              >
                Save
              </Button>
            </section>
          </ModalContent>
        </Modal>

        {/* supplier allocation table with countrydata */}
        {supplierCpiAllocation && (
          <div className={styles.table_filters_container}>
            {supplierCpiAllocation?.map((data) => {
              return (
                <>
                  {checkbox && (
                    <section className={styles.table_actions}>
                      <Button variant="outlined">Send Email</Button>
                      <Button variant="outlined">Delete</Button>
                      <Button
                        variant="outlined"
                        onClick={openCpiAllocationModal}
                      >
                        Set CPI & Allocation{" "}
                      </Button>
                    </section>
                  )}

                  <div className={styles.collapse_table}>
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={handlesupplierTablecheckbox}
                            />
                          </th>
                          <th>
                            Supplier {">"} Country {">"} Target Audience
                          </th>
                          <th>Allocation</th>
                          <th>Avg cpi</th>
                          <th>Total Budget</th>
                          <th>IR</th>
                          <th>Feasibility</th>
                          <th>Timeline</th>
                          <th>CPI</th>
                          <th>Allocation Status</th>
                          <th>Email Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Object.keys(data?.supplier ? data?.supplier : {})?.map(
                          (key) => {
                            let supplier = data?.supplier[key];
                            let salesId = key;
                            return (
                              <>
                                <tr>
                                  <td>
                                    <input
                                      type="checkbox"
                                      onChange={handlesupplierTablecheckbox}
                                    />
                                  </td>
                                  <td
                                    onClick={() => {
                                      if (!open.includes(salesId)) {
                                        setOpen((prevArr) => [
                                          ...prevArr,
                                          salesId,
                                        ]);
                                      } else {
                                        setOpen((prevArr) => {
                                          return prevArr.filter(
                                            (id) => id !== salesId
                                          );
                                        });
                                      }
                                    }}
                                  >
                                    <div className="flex">
                                      <span className="icon">
                                        <BiCaretDown />
                                      </span>
                                      <span>
                                        {" "}
                                        {supplier?.label} (ID #{supplier?.value}
                                        )
                                      </span>
                                    </div>
                                  </td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>
                                    <Chip variant="filled" color="warning">
                                      Pending
                                    </Chip>
                                  </td>
                                  <td>
                                    <Chip variant="outlined" color="success">
                                      Sent
                                    </Chip>
                                  </td>
                                </tr>

                                {open.includes(salesId) &&
                                  Object.keys(data?.countryORTg)?.map(
                                    (key, value) => {
                                      let country = data?.countryORTg[key];
                                      let countryId = country?.countryId;

                                      if (
                                        country?.countryId &&
                                        country !== null
                                      ) {
                                        if (!open.includes(countryId)) {
                                          return (
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  onChange={
                                                    handlesupplierTablecheckbox
                                                  }
                                                />
                                              </td>
                                              <td
                                                style={{ paddingLeft: "2em" }}
                                                onClick={() =>
                                                  setOpen((prevArr) => [
                                                    ...prevArr,
                                                    countryId,
                                                  ])
                                                }
                                              >
                                                <div className="flex">
                                                  <span className="icon">
                                                    <BiCaretDown />
                                                  </span>
                                                  <span>
                                                    {country?.countryName}(ID #
                                                    {country?.countryId})
                                                  </span>
                                                </div>
                                              </td>
                                              <td>0</td>
                                              <td>0</td>
                                              <td>0</td>
                                              <td>{country?.avgIr}</td>
                                              <td>{country?.feasibilitySum}</td>
                                              <td>
                                                {country?.maxTimelinePerTg}
                                              </td>
                                              <td>{country?.avgCpi}</td>
                                              <td>
                                                <Chip
                                                  variant="filled"
                                                  color="warning"
                                                >
                                                  Pending
                                                </Chip>
                                              </td>
                                              <td>
                                                <Chip
                                                  variant="outlined"
                                                  color="success"
                                                >
                                                  Sent
                                                </Chip>
                                              </td>
                                            </tr>
                                          );
                                        } else {
                                          return (
                                            <>
                                              <tr>
                                                <td>
                                                  <input
                                                    type="checkbox"
                                                    onChange={
                                                      handlesupplierTablecheckbox
                                                    }
                                                  />
                                                </td>
                                                <td
                                                  style={{ paddingLeft: "2em" }}
                                                  onClick={() =>
                                                    setOpen((prevArr) => {
                                                      return prevArr.filter(
                                                        (id) => id != countryId
                                                      );
                                                    })
                                                  }
                                                >
                                                  <div className="flex">
                                                    <span className="icon">
                                                      <BiCaretDown />
                                                    </span>
                                                    <span>
                                                      {country?.countryName}(ID
                                                      #{country?.countryId})
                                                    </span>
                                                  </div>
                                                </td>
                                                <td>0</td>
                                                <td>0</td>
                                                <td>0</td>
                                                <td>{country?.avgIr}</td>
                                                <td>
                                                  {country?.feasibilitySum}
                                                </td>
                                                <td>
                                                  {country?.maxTimelinePerTg}
                                                </td>
                                                <td>{country?.avgCpi}</td>
                                                <td>
                                                  <Chip
                                                    variant="filled"
                                                    color="warning"
                                                  >
                                                    Pending
                                                  </Chip>
                                                </td>
                                                <td>
                                                  <Chip
                                                    variant="outlined"
                                                    color="success"
                                                  >
                                                    Sent
                                                  </Chip>
                                                </td>
                                              </tr>
                                              {country?.tgs?.map((target) => {
                                                console.log(target);
                                                return (
                                                  <tr>
                                                    <td>
                                                      <input
                                                        type="checkbox"
                                                        onChange={
                                                          handlesupplierTablecheckbox
                                                        }
                                                      />
                                                    </td>
                                                    <td
                                                      style={{
                                                        paddingLeft: "3.5em",
                                                      }}
                                                    >
                                                      <ul className={styles.ul}>
                                                        <li>
                                                          {
                                                            target?.tgTargetAudience
                                                          }
                                                          (ID #{target?.id})
                                                        </li>
                                                      </ul>
                                                    </td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>{target?.ir}</td>
                                                    <td>
                                                      {target?.feasibility}
                                                    </td>
                                                    <td>{target?.timeline}</td>
                                                    <td>{target?.cpi}</td>
                                                    <td>
                                                      <Chip
                                                        variant="filled"
                                                        color="warning"
                                                      >
                                                        Pending
                                                      </Chip>
                                                    </td>
                                                    <td>
                                                      <Chip
                                                        variant="outlined"
                                                        color="success"
                                                      >
                                                        Sent
                                                      </Chip>
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                            </>
                                          );
                                        }
                                      } else {
                                        return (
                                          <>
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  onChange={
                                                    handlesupplierTablecheckbox
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <div className="flex">
                                                  <span className="icon">
                                                    <BiCaretDown />
                                                  </span>
                                                  <span>
                                                    {console.log(
                                                      data?.countryORTg[key]
                                                    )}
                                                    {country?.countryName}(ID #
                                                    {country?.countryId})
                                                  </span>
                                                </div>
                                              </td>
                                              <td>0</td>
                                              <td>0</td>
                                              <td>0</td>
                                              <td>{country?.avgIr}</td>
                                              <td>{country?.feasibilitySum}</td>
                                              <td>
                                                {country?.maxTimelinePerTg}
                                              </td>
                                              <td>{country?.avgCpi}</td>
                                              <td>
                                                <Chip
                                                  variant="filled"
                                                  color="warning"
                                                >
                                                  Pending
                                                </Chip>
                                              </td>
                                              <td>
                                                <Chip
                                                  variant="outlined"
                                                  color="success"
                                                >
                                                  Sent
                                                </Chip>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  onChange={
                                                    handlesupplierTablecheckbox
                                                  }
                                                />
                                              </td>
                                              <td
                                                style={{
                                                  paddingLeft: "3.5em",
                                                }}
                                              >
                                                <ul className={styles.ul}>
                                                  <li>
                                                    {country?.tgTargetAudience}{" "}
                                                    (ID #{country?.id})
                                                  </li>
                                                </ul>
                                              </td>
                                              <td>0</td>
                                              <td>0</td>
                                              <td>0</td>
                                              <td>{country?.ir}</td>
                                              <td>{country?.feasibility}</td>
                                              <td>{country?.timeline}</td>
                                              <td>{country?.cpi}</td>
                                              <td>
                                                <Chip
                                                  variant="filled"
                                                  color="warning"
                                                >
                                                  Pending
                                                </Chip>
                                              </td>
                                              <td>
                                                <Chip
                                                  variant="outlined"
                                                  color="success"
                                                >
                                                  Sent
                                                </Chip>
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      }
                                    }
                                  )}
                              </>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })}
          </div>
        )}

        {/* cpi allocation modal */}
        <Modal showModal={cpiAndAllocation} setShowModal={setCpiAndAllocation}>
          <ModalContent>
            <div className={styles.cpiallocation_wrapper}>
              <h1>Set CPI & Allocation</h1>

              <div className={styles.allocationInput}>
                <span>Allocation</span>
                <div className={styles.allocation}>
                  <input type="text" /> OR
                  <span className={styles.number}>#</span>
                  <input type="text" />
                  <span className={styles.percentage}>%</span>
                </div>
              </div>

              <div className={styles.cpiAndStatusInput}>
                <div className={styles.cpi}>
                  <span>CPI</span>
                  <input type="text" />
                </div>
              </div>

              <div className={styles.BtnWrapper}>
                <Button variant="outlined" onClick={openCpiAllocationModal}>
                  Cancel
                </Button>

                <Button variant="filled">Save</Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
      {/* dssdsdsdsdsds gggdgdgdgdgdfgfdgdgdfgfdggfd*/}
    </>
  );
};

export default Allotment;
