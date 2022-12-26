import { NavLink, useParams } from "react-router-dom";
import Button from "../components/Button";
// import Navlink from "../components/Navlink/Navlink";
import Header from "../customComponents/header/Header";
import styles from "./Overciew.module.css";
import targetAudience from "../assets/targetAudience.png";
import device from "../assets/device.png";
import CheckBox from "../components/CheckBox/CheckBox";
import Link from "../components/Link/Link";
import description from "../assets/description.png";
import React, { useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import Chip from "../components/Chips/Chip";
import Dropdown from "../components/Dropdown/Dropdown";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsDot, BsPlus } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import Modal from "../components/Modal/Modal";
import { ModalContent } from "../components/Modal/Modal.style";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import { Label } from "../components/TextField/TextField.style";
import AutoComplete from "../components/AutoComplete/AutoComplete";
import axios from "axios";
import { useHelperDataContext } from "../context/HelperDataContext";
import CollapseTable from "../components/CollapseTable/CollapseTable";
import { v4 as uuid } from "uuid";
import { SALES_BASE_URL } from "../config";

const Overview = () => {
  const { id } = useParams();
  const [open, setOpen] = useState([]);
  const { helperData } = useHelperDataContext();
  const [showModal, setShowModal] = useState({
    approveModal: false,
    transferModal: false,
  });
  let devicesChecked = [];
  const [salesData, setSalesData] = useState({});

  const [addBidPerson, setAddBidPerson] = useState(false);
  const [bidPersonModalInputData, setBidPersonModalInputData] = useState({});
  const [bidpersonCard, setBidpersonCard] = useState(false);

  const openAddBidPerson = () => {
    setAddBidPerson((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`)
      .then((res) => {
        setSalesData(res?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(salesData);

  const handleModal = (modalName, value) => {
    setShowModal((prev) => {
      return { ...prev, [modalName]: value };
    });
  };

  const handleBidpersonchange = (e, name, value) => {
    setBidPersonModalInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const getData = (e) => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`)
      .then((res) => {
        setSalesData(res?.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${SALES_BASE_URL}/sales/update/salesorders/${id}`,
        bidPersonModalInputData
      )
      .then((res) => {
        getData();
      });

    setAddBidPerson(false);
    setBidpersonCard(true);

    setBidPersonModalInputData({
      BidPerson: salesData?.BidPerson,
      BidAmount: salesData?.BidAmount,
      BiddingDate: salesData?.BiddingDate,
    });
  };
  let countrieskey = salesData?.countries
    ? Object.keys(salesData?.countries)[0]?.split("-")[1]
    : ["GRP-default"];

  console.log(bidPersonModalInputData);

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
              <h1>{salesData?.projectName}</h1>
              {helperData?.clients?.map((data) => {
                if (salesData?.clientId == data?.value) {
                  return <span>{data?.label}</span>;
                }
              })}
            </div>
            {/* <div>
              <button className={styles.edit}>Edit</button>
            </div> */}
            <div className={styles.projNum}>
              <p>[#{salesData?.salesorder_id}]</p>
            </div>
          </section>
          <section className={styles.right_project_container}>
            {salesData?.salesorder_id == id && salesData?.topUp == true ? (
              <div className={styles.topupOrder}>
                <AiFillInfoCircle color="#1765dc" />
                <Chip variant="filled" color="primary">
                  Top Up Order
                </Chip>
              </div>
            ) : null}

            <Link to={`/quotation/${id}`}>
              <Button variant="filled">View Quotation</Button>
            </Link>
          </section>
        </div>

        {/* survey details */}
        <div className={styles.survey_details_container}>
          <section className={styles.left_survey_details}>
            <div className={styles.details_body}>
              <span>Survey Type</span>

              <h2>{salesData?.Methodology?.methodology}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Industry</span>

              <h2>{salesData?.Industry?.industry_name}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Stage</span>

              <h2>{salesData?.status}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Study Type</span>

              <h2>{salesData?.StudyType?.studyTypeName}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Start Date</span>

              <h2>
                {new Date(salesData?.startDate)?.toLocaleDateString("en-CA")}
              </h2>
            </div>

            <div className={styles.details_body}>
              <span>Client Name</span>

              {helperData?.clients?.map((data) => {
                if (salesData?.clientId === data?.value) {
                  return <h2>{data?.label}</h2>;
                }
              })}
            </div>

            <div className={styles.details_body}>
              <span>Currency Type</span>
              <div className={styles.cuurency_wrapper}>
                {salesData?.countries?.UNGRP?.filter((country, i) => {
                  return (
                    salesData?.countries?.UNGRP?.map(
                      (val) =>
                        val?.currency?.currencyName &&
                        val?.currency?.currencySymbol
                    ).indexOf(
                      country?.currency?.currencyName &&
                        country?.currency?.currencySymbol
                    ) == i
                  );
                })?.map((myData) => (
                  <>
                    <h2 className={styles.currency_container}>
                      {myData?.currency?.currencyName +
                        "(" +
                        myData?.currency?.currencySymbol +
                        ")"}
                    </h2>
                  </>
                ))}
                {salesData?.countries?.[`GRP-${countrieskey}`]
                  ?.filter((country, i) => {
                    return (
                      salesData?.countries?.[`GRP-${countrieskey}`]
                        ?.map(
                          (val) =>
                            val?.currency?.currencyName &&
                            val?.currency?.currencySymbol
                        )
                        .indexOf(
                          country?.currency?.currencyName &&
                            country?.currency?.currencySymbol
                        ) == i
                    );
                  })
                  ?.map((myData) => (
                    <>
                      <h2 className={styles.currency_container}>
                        {myData?.currency?.currencyName +
                          "(" +
                          myData?.currency?.currencySymbol +
                          ")"}
                      </h2>
                    </>
                  ))}
              </div>
            </div>

            <div className={styles.details_body}>
              <span>End Date</span>

              <h2>
                {new Date(salesData?.endDate)?.toLocaleDateString("en-ca")}
              </h2>
            </div>

            {salesData?.BiddingDate && (
              <div className={styles.details_body}>
                <span>Bidding Date</span>
                <h2>
                  {new Date(salesData?.BiddingDate)?.toLocaleDateString(
                    "en-ca"
                  )}
                </h2>
              </div>
            )}

            <div className={styles.details_body}>
              <span>Total Budget</span>

              <h2>${salesData?.totalBudgetSum}</h2>
            </div>
            {salesData?.BidAmount && (
              <div className={styles.details_body}>
                <span>Bid Amount</span>
                <h2>${salesData?.BidAmount}</h2>
              </div>
            )}
          </section>
          <section className={styles.right_survey_details}>
            <div className={styles.overview_codes}>
              <div className={styles.target_audience}>
                <section className={styles.img_text}>
                  <img src={targetAudience} alt="" />
                  <span>Overview</span>
                </section>
                <p>
                  <span>{salesData?.Overview}</span>
                </p>
              </div>
              <div className={styles.screener_files}>
                <span>Files</span>
                <div className={styles.uploadFile}>
                  <div>
                    <p className={styles.uploaded_file}>
                      ZipcodeFilesFinalUpdated.Txt
                    </p>
                    <Link to="https://www.google.co.in/" target="_blank">
                      <Button className={styles.view} variant="outlined">
                        View
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <p className={styles.uploaded_file}>
                      ScreenerFilesFinalUpdated.Pdfjdhjsdhsjdh
                    </p>
                    <Link to="https://www.google.co.in/">
                      <Button className={styles.view} variant="outlined">
                        View
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <p className={styles.uploaded_file}>
                      ScreenerFilesFinalUpdated.Pdfjdhjsdhsjdh
                    </p>
                    <Link to="https://www.google.co.in/">
                      <Button className={styles.view} variant="outlined">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.deviceCompatibility}>
              <section className={styles.img_text}>
                <img src={device} alt="" />
                <span>Device Compatibility</span>
              </section>
              {salesData?.SalesOrderDevices?.map((data) => {
                devicesChecked.push(data?.deviceId);
              })}
              <section className={styles.checkbox_wrapper}>
                <p className={styles.checkbox_container}>
                  {/* {devicesChecked.includes(2) == true ? (
                    <CheckBox checked />
                  ) : (
                    <CheckBox />
                  )} */}
                  <input type="checkbox" checked={devicesChecked.includes(2)} />
                  <label>Desktop/Laptop</label>
                </p>
                <p className={styles.checkbox_container}>
                  {/* {devicesChecked.includes(3) == true ? (
                    <CheckBox checked />
                  ) : (
                    <CheckBox />
                  )} */}
                  <input type="checkbox" checked={devicesChecked.includes(3)} />
                  <label>Tablet</label>
                </p>
                <p className={styles.checkbox_container}>
                  {/* {devicesChecked.includes(1) == true ? (
                    <CheckBox checked />
                  ) : (
                    <CheckBox />
                  )} */}
                  <input type="checkbox" checked={devicesChecked.includes(1)} />
                  <label>Smart Phone</label>
                </p>
                <p className={styles.checkbox_container}>
                  {/* <CheckBox checked={devicesChecked.includes(4)} /> */}
                  <input type="checkbox" checked={devicesChecked.includes(4)} />
                  <label>Smart Tv</label>
                </p>
                <p className={styles.checkbox_container}>
                  {/* <CheckBox disabled /> */}
                  <input type="checkbox" disabled />
                  <label>Requires Webcam</label>
                </p>
              </section>
            </div>
          </section>
        </div>

        {/* table */}

        <div className={styles.collapse_table}>
          <table>
            <thead>
              <tr>
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
              {Object?.keys(
                salesData?.countries ? salesData?.countries : {}
              )?.map((key) => {
                let countries = salesData?.countries[key];
                let countryGrpId = key;

                return (
                  <React.Fragment key={uuid()}>
                    <tr>
                      <td
                        onClick={() => {
                          if (!open.includes(countryGrpId)) {
                            setOpen((prevArr) => [...prevArr, countryGrpId]);
                          } else {
                            setOpen((prevArr) => {
                              return prevArr.filter(
                                (id) => id !== countryGrpId
                              );
                            });
                          }
                        }}
                      >
                        <div className={styles.flex}>
                          <span className={styles.icon}>
                            <BiCaretDown />
                          </span>
                          <span>
                            {" "}
                            {/* {salesData?.countries?.map((res) => {
                            return res?.countryName;
                          })}{" "} */}
                            {countryGrpId}
                          </span>
                        </div>
                      </td>
                      <td>
                        {/* {countries?.reduce((avg, currVal, index) => {
                          return (avg =
                            (avg * index + currVal?.avgIr) / (index + 1));
                        }, 0)} */}
                      </td>
                      <td>
                        {/* {countries?.reduce((preVal, currVal) => {
                          return (preVal += currVal?.feasibilitySum);
                        }, 0)} */}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Chip variant="filled" color="warning">
                          Pending
                        </Chip>
                      </td>
                    </tr>
                    {open.includes(countryGrpId) &&
                      countries?.map((country) => {
                        return (
                          <React.Fragment key={uuid()}>
                            <tr>
                              <td
                                style={{ paddingLeft: "2em" }}
                                onClick={() => {
                                  if (open.includes(country?.countryId)) {
                                    setOpen((prev) =>
                                      prev?.filter(
                                        (x) => x !== country?.countryId
                                      )
                                    );
                                  } else {
                                    setOpen((prev) => [
                                      ...prev,
                                      country?.countryId,
                                    ]);
                                  }
                                }}
                              >
                                <div className={styles.flex}>
                                  <span className={styles.icon}>
                                    <BiCaretDown />
                                  </span>
                                  <span>{country?.countryName}</span>
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
                            {open.includes(country?.countryId) &&
                              country?.tgs?.map((tg) => {
                                return (
                                  <tr key={uuid()}>
                                    <td style={{ paddingLeft: "4em" }}>
                                      <ul>
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
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* description */}
        <div className={styles.details_container}>
          <div className={styles.description}>
            <section className={styles.img_text}>
              <img src={description} alt="" />
              <span>Description</span>
            </section>
            {salesData?.description ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: salesData?.description,
                }}
              ></p>
            ) : (
              <p>No Description</p>
            )}
          </div>

          {/* sales manager details container */}
          <div className={styles.manager_details_container}>
            <section className={styles.sales_manager_details}>
              <p className={styles.intro_text}>Sales Manager</p>
              <section className={styles.details}>
                <div className={styles.details_wrapper}>
                  <img src={device} alt="" />
                  <p>
                    {helperData?.salesManagers?.map((res) => {
                      if (res?.value == salesData?.salesManagerId) {
                        return res?.label;
                      }
                    })}
                  </p>
                </div>
                <div className={styles.details_wrapper}>
                  <span className={styles.email}>Email</span>
                  {helperData?.salesManagers?.map((res) => {
                    if (salesData?.salesManagerId == res?.value) {
                      return <p className={styles.fullemail}>{res?.email}</p>;
                    }
                  })}
                </div>
                <div className={styles.details_wrapper}>
                  <span className={styles.createdDate}>Created Date</span>
                  <p className={styles.date}>
                    {new Date(salesData?.createdAt)?.toLocaleDateString(
                      "en-ca"
                    )}
                  </p>
                </div>
                <div className={styles.details_wrapper}>
                  <span className={styles.totBudget}>Total Budget</span>
                  <p className={styles.total}>${salesData?.totalBudgetSum}</p>
                </div>
              </section>
            </section>

            {/* bid person details */}
            {salesData?.BidPerson && (
              <section className={styles.sales_manager_details}>
                <p className={styles.intro_text}>Bid Person</p>
                <section className={styles.details}>
                  <div className={styles.details_wrapper}>
                    <img src={device} alt="" />

                    {helperData?.salesManagers?.map((res) => {
                      if (res?.value == salesData?.BidPerson) {
                        return <p>{res?.label}</p>;
                      }
                    })}
                  </div>
                  <div className={styles.details_wrapper}>
                    <span className={styles.email}>Email</span>
                    {helperData?.salesManagers?.map((res) => {
                      if (res?.value == salesData?.BidPerson) {
                        return <p className={styles.fullemail}>{res?.email}</p>;
                      }
                    })}
                  </div>
                  <div className={styles.details_wrapper}>
                    <span className={styles.createdDate}>Bidding Date</span>
                    <p className={styles.date}>
                      {new Date(salesData?.BiddingDate)?.toLocaleDateString(
                        "en-ca"
                      )}
                    </p>
                  </div>
                  <div className={styles.details_wrapper}>
                    <span className={styles.totBudget}>Bid Amount</span>
                    <p className={styles.total}>${salesData?.BidAmount}</p>
                  </div>
                </section>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
