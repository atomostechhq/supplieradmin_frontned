import { useEffect, useState } from "react";
import React from "react";
import Button from "../components/Button";
import Chip from "../components/Chips/Chip";
import styles from "../styles/SupplierAdminOverview.module.css";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import Accordion from "../components/Accordion/Accordion";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header from "../customComponents/header/Header";
import { SUPPLIER_BASE_URL } from "../config";

const panelRegQuestions = [
  {
    questionTitle:
      "How many attributes are required for a user to become an active user eligible for survey ?",
    questionResponse: "Supplier’s Answer",
  },
  {
    questionTitle:
      "How many attributes are required for a user to become an active user eligible for survey ?",
    questionResponse: "Supplier’s Answer",
  },
  {
    questionTitle:
      "How many attributes are required for a user to become an active user eligible for survey ?",
    questionResponse: "Supplier’s Answer",
  },
];

const businesModelQuestions = [
  {
    questionTitle:
      "Does the partner need unique survey opportunities? Is there mystery shopping, digital tracking, test products, online services, websites ratings, etc.?",
    questionResponse: "Supplier’s Answer",
  },
  {
    questionTitle:
      "What is the partner's value proposition to attract consumers i.e. Is the partner a panel company, student site for discount or community?",
    questionResponse: "Supplier’s Answer",
  },
  {
    questionTitle: "How does the partner generate revenue?",
    questionResponse: "Supplier’s Answer",
  },
];

const panelTypeQuestions = [
  {
    questionTitle:
      "Is the partner's panel proprietary (managed by the partner) or is the partner using other partner panels in aggregate?",
    questionResponse: "Supplier’s Answer",
  },
];

const qualityCheckQuestions = [
  {
    questionTitle:
      "Do you have a check in place that validates user information- specifically address, first name, last name, and birth date in US and CA. Please describe.",
    questionResponse: "Supplier’s Answer",
  },
  {
    questionTitle:
      "Do you have a check in place that validates user information- specifically address, first name, last name, and birth date in US and CA. Please describe.",
    questionResponse: "Supplier’s Answer",
  },
  {
    questionTitle:
      "Please outline the details around the fraud/quality check you conducts during a users lifetime.",
    questionResponse: "Supplier’s Answer",
  },
];

const SupplierAdminAppOverview = () => {
  const { supplierId } = useParams();

  console.log(supplierId);

  const [supplierData, setSupplierData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  //GET ALL Suppliers Details DATA:
  const getsuppliersdetails = async (e) => {
    axios
      .get(`${SUPPLIER_BASE_URL}/supplieradmin/get-supplier/${supplierId}`)
      .then((res) => {
        // console.log(res?.data);
        setSupplierData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(supplierData);

  useEffect(() => {
    getsuppliersdetails();
  }, [supplierId]);

  let compDetailCardData = [
    {
      heading: "Company Information",
      titel1: "No of customers",
      valueOfTitel1: supplierData?.SupplierCompanyDetails?.map((res) => {
        return res?.no_of_customers_or_clients;
      }),
      titel2: "Company Offices",
      valueOfTitel2: supplierData?.SupplierCompanyDetails?.map((res) => {
        return res?.organisation;
      }),
      titel3: "Annual Revenue",
      valueOfTitel3: supplierData?.SupplierCompanyDetails?.map((res) => {
        return res?.total_annual_revenue_USD;
      }),
      titel4: "Tax ID Number",
      valueOfTitel4: supplierData?.SupplierCompanyDetails?.map((res) => {
        return res?.company_tax_id;
      }),
    },
    {
      heading: "Business Information",
      titel1: "Official Name",
      valueOfTitel1: supplierData?.SupplierCompanyDetails?.map((res) => {
        return res?.company_name;
      }),
      titel2: "Employee Size",
      valueOfTitel2: supplierData?.SupplierCompanyDetails?.map((res) => {
        return res?.no_of_employees;
      }),
      titel3: "Registration No.",
      valueOfTitel3: supplierData?.SupplierCompanyDetails?.map((res) => {
        return res?.company_registeration_number;
      }),
      titel4: "Company Start Date",
      valueOfTitel4: supplierData?.SupplierCompanyDetails?.map((res) => {
        return new Date(res?.company_start_date)?.toLocaleDateString("en-ca");
      }),
    },
  ];
  let panelInfoData = {
    heading: "Panel Information",
    titel1: "Panel Count",
    valueOfTitel1: supplierData?.SupplyPanels?.map((res) => {
      return res?.panel_count;
    }),
    titel2: "Panel Registration URL",
    valueOfTitel2: supplierData?.SupplyPanels?.map((res) => {
      return res?.panel_registration_url;
    }),
    titel3: "Panel Book URL",
    valueOfTitel3: supplierData?.SupplyPanels?.map((res) => {
      return res?.panel_book_url;
    }),
    titel4: "Panel Base",
    valueOfTitel4: supplierData?.SupplyPanels?.map((res) => {
      return res?.panel_base;
    }),
  };

  let headquaterCardData = {
    heading: "Headquarters Address",
    titel1: "Address Line 1",
    valueOfTitel1: supplierData?.SupplierCompanyDetails?.map((res) => {
      return res?.address_line_1;
    }),
    titel2: "Address Line 2",
    valueOfTitel2: supplierData?.SupplierCompanyDetails?.map((res) => {
      return res?.address_line_2;
    }),
    titel3: "City",
    valueOfTitel3: supplierData?.SupplierCompanyDetails?.map((res) => {
      return res?.city;
    }),
    titel4: "Country",
    valueOfTitel4: supplierData?.SupplierCompanyDetails?.map((res) => {
      return res?.country;
    }),
    titel5: "Zipcode",
    valueOfTitel5: supplierData?.SupplierCompanyDetails?.map((res) => {
      return res?.zipcode;
    }),
  };

  return (
    <>
      <Header />
      <div className="bg-[#eee] custom-px w-full flex flex-col gap-10">
        <div className="flex justify-between">
          <div>
            <p className="text-[32px] mb-[10px]">
              {supplierData?.company_name}
            </p>
            <div className="flex gap-[30px]">
              <p className="text-[24px]">ID #{supplierData?.supplier_id}</p>
              <select
                className="border border-[#1765dc] rounded-lg bg-transparent"
                name="changeStatus"
                id="changeStatus"
              >
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 items-end ">
            <Button variant="alternate" customWidth="200px">
              Edit Application
            </Button>
            <Button variant="outlined" customWidth="200px">
              Reject Application
            </Button>
            <Button variant="filled">Approve Application</Button>
          </div>
        </div>
        <div className=" flex justify-between ">
          <div className="h-[260px] w-[390px] border border-[#989898] rounded-[8px] p-3 flex flex-col gap-2 relative bg-white">
            <div className="flex gap-2 justify-between">
              <section className="flex gap-3">
                <p>Company Description</p>{" "}
                <Chip variant="filled" color="primary">
                  Pending
                </Chip>
              </section>
              <section className="flex gap-2">
                <span className={styles.check}>
                  <RiCheckboxCircleFill size={25} color="#1765DC" />
                </span>
                <span>
                  <RiCloseCircleFill size={25} color="#DA1E28" />
                </span>
              </section>
            </div>
            <div className="w-[70%]">
              {" "}
              <p className="text-[14px]">{supplierData?.company_description}</p>
            </div>
          </div>
          {/*  */}
          {compDetailCardData?.map((data) => {
            return <DetailsCard data={data} />;
          })}
        </div>

        <div className=" flex justify-between ">
          <DetailsCard data={panelInfoData} />
          <DetailsCardLarge data={headquaterCardData} />
        </div>

        <div className={styles.accordion_container}>
          <div className={styles.left_accordion}>
            <Accordion>
              <section className={styles.panel_registration}>
                <Accordion.Item>
                  <Accordion.Header>
                    <div className={styles.acc_title}>
                      <Accordion.Title>Panel Registration</Accordion.Title>
                      <Chip variant="filled" color="success">
                        Approved
                      </Chip>
                    </div>
                    <Accordion.Icon>
                      <IoIosArrowDown />
                    </Accordion.Icon>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion.Content>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Registration Attributes</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelRegQuestions} />
                        </section>
                      </div>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Registration Identities</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelRegQuestions} />
                        </section>
                      </div>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Registration Requirements</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelRegQuestions} />
                        </section>
                      </div>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Registration Validation</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelRegQuestions} />
                        </section>
                      </div>
                    </Accordion.Content>
                  </Accordion.Body>
                </Accordion.Item>
              </section>

              <section className={styles.business_model}>
                <Accordion.Item>
                  <Accordion.Header>
                    <div className={styles.acc_title}>
                      <Accordion.Title>Business Model</Accordion.Title>
                      <Chip variant="filled" color="success">
                        Approved
                      </Chip>
                    </div>
                    <Accordion.Icon>
                      <IoIosArrowDown />
                    </Accordion.Icon>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion.Content>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Business Model</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={businesModelQuestions} />
                        </section>
                      </div>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Panel Type</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelTypeQuestions} />
                        </section>
                      </div>
                    </Accordion.Content>
                  </Accordion.Body>
                </Accordion.Item>
              </section>
              <section className={styles.miscellaneous}>
                <Accordion.Item>
                  <Accordion.Header>
                    <div className={styles.acc_title}>
                      <Accordion.Title>Miscellaneous</Accordion.Title>
                      <Chip variant="filled" color="success">
                        Approved
                      </Chip>
                    </div>
                    <Accordion.Icon>
                      <IoIosArrowDown />
                    </Accordion.Icon>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion.Content>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Business Model</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={businesModelQuestions} />
                        </section>
                      </div>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Panel Type</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelTypeQuestions} />
                        </section>
                      </div>
                    </Accordion.Content>
                  </Accordion.Body>
                </Accordion.Item>
              </section>
            </Accordion>
          </div>
          <div className={styles.right_accordion}>
            <Accordion>
              <section className={styles.panel_registration}>
                <Accordion.Item>
                  <Accordion.Header>
                    <div className={styles.acc_title}>
                      <Accordion.Title>Panel Registration</Accordion.Title>
                      <Chip variant="filled" color="success">
                        Approved
                      </Chip>
                    </div>
                    <Accordion.Icon>
                      <IoIosArrowDown />
                    </Accordion.Icon>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion.Content>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Quality Checks</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={qualityCheckQuestions} />
                        </section>
                      </div>
                    </Accordion.Content>
                  </Accordion.Body>
                </Accordion.Item>
              </section>

              <section className={styles.business_model}>
                <Accordion.Item>
                  <Accordion.Header>
                    <div className={styles.acc_title}>
                      <Accordion.Title>Recruitment Method</Accordion.Title>
                      <Chip variant="filled" color="success">
                        Approved
                      </Chip>
                    </div>
                    <Accordion.Icon>
                      <IoIosArrowDown />
                    </Accordion.Icon>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion.Content>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Recruitment Method</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={businesModelQuestions} />
                        </section>
                      </div>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Panel Type</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelTypeQuestions} />
                        </section>
                      </div>
                    </Accordion.Content>
                  </Accordion.Body>
                </Accordion.Item>
              </section>

              <section className={styles.business_model}>
                <Accordion.Item>
                  <Accordion.Header>
                    <div className={styles.acc_title}>
                      <Accordion.Title>Traffic Sources</Accordion.Title>
                      <Chip variant="filled" color="success">
                        Approved
                      </Chip>
                    </div>
                    <Accordion.Icon>
                      <IoIosArrowDown />
                    </Accordion.Icon>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Accordion.Content>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Business Model</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={businesModelQuestions} />
                        </section>
                      </div>
                      <div className={styles.content_wrapper}>
                        <div className={styles.content_title}>
                          <section className={styles.question_status}>
                            <span>Panel Type</span>
                            <Chip variant="filled" color="success">
                              Approved
                            </Chip>
                          </section>
                          <section className={styles.status_actions}>
                            <span className={styles.check}>
                              {" "}
                              <RiCheckboxCircleFill size={25} color="#1765DC" />
                            </span>
                            <span>
                              <RiCloseCircleFill size={25} color="#DA1E28" />
                            </span>
                          </section>
                        </div>
                        <section>
                          <PanelQuestions questions={panelTypeQuestions} />
                        </section>
                      </div>
                    </Accordion.Content>
                  </Accordion.Body>
                </Accordion.Item>
              </section>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierAdminAppOverview;

const DetailsCard = (props) => {
  // console.log(props);
  return (
    <div className="h-[260px] w-[390px] border border-[#989898] rounded-[8px] p-3 flex flex-col gap-2 relative bg-white">
      {/* <div className="flex gap-3">
      <p>{props.data.heading}</p>{" "}
    </div> */}
      <div className="flex gap-2 justify-between">
        <section className="flex gap-3">
          <p>{props.data.heading}</p>{" "}
          <Chip variant="filled" color="primary">
            Pending
          </Chip>
        </section>
        <section className="flex gap-2">
          <span className={styles.check}>
            <RiCheckboxCircleFill size={25} color="#1765DC" />
          </span>
          <span>
            <RiCloseCircleFill size={25} color="#DA1E28" />
          </span>
        </section>
      </div>
      <div className="w-full  text-[12px]">
        <table className="" id="companyDecCardTable">
          <tr>
            <td>{props.data.titel1}</td>
            <td className="text-[#1765DC] font-[600]">
              {" "}
              {props.data.valueOfTitel1}
            </td>
          </tr>
          <tr>
            <td>{props.data.titel2}</td>
            <td className="text-[#1765DC] font-[600]">
              {" "}
              {props.data.valueOfTitel2}
            </td>
          </tr>
          <tr>
            <td>{props.data.titel3}</td>
            <td className="text-[#1765DC] font-[600]">
              {" "}
              {props.data.valueOfTitel3}
            </td>
          </tr>
          <tr>
            <td>{props.data.titel4}</td>
            <td className="text-[#1765DC] font-[600]">
              {" "}
              {props.data.valueOfTitel4}
            </td>
          </tr>
          <tr>
            <td>{props.data.titel5}</td>
            <td className="text-[#1765DC] font-[600]">
              {" "}
              {props.data.valueOfTitel5}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

const DetailsCardLarge = ({ data }) => {
  return (
    <div className="h-[260px] w-[66%] border border-[#989898] rounded-[8px] p-3 flex flex-col gap-2 relative bg-white">
      {/* <div className="flex gap-3">
        <p>{props.data.heading}</p>{" "}
      </div> */}
      <div className="flex gap-2 justify-between">
        <section className="flex gap-3">
          <p>{data?.heading}</p>
          <Chip variant="filled" color="primary">
            Pending
          </Chip>
        </section>
        <section className="flex gap-2">
          <span className={styles.check}>
            <RiCheckboxCircleFill size={25} color="#1765DC" />
          </span>
          <span>
            <RiCloseCircleFill size={25} color="#DA1E28" />
          </span>
        </section>
      </div>
      <div className="w-full flex text-[12px]">
        <div className="flex w-full flex-col gap-2">
          <div className="custome-row-container">
            <p className="w-[15%]">{data?.titel1}</p>
            <p className="w-[85%]">{data?.valueOfTitel1}</p>
          </div>
          <div className="custome-row-container">
            <p className="w-[15%]">{data?.titel2}</p>
            <p className="w-[85%]">{data?.valueOfTitel2}</p>
          </div>
          <div className="custome-row-container">
            <p className="w-[15%]">{data?.titel3}</p>
            <p className="w-[85%]">{data?.valueOfTitel3}</p>
          </div>
          <div className="custome-row-container">
            <p className="w-[15%]">{data?.titel4}</p>
            <p className="w-[85%]">{data?.valueOfTitel4}</p>
          </div>
          <div className="custome-row-container">
            <p className="w-[15%]">{data?.titel5}</p>
            <p className="w-[85%]">{data?.valueOfTitel5}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PanelQuestions = ({ questions }) => {
  return (
    <>
      <div className={styles.panelQuestionsContainer}>
        {questions.map((data) => {
          return (
            <section className={styles.panelQuestions}>
              <h3>{data.questionTitle}</h3>
              <p>{data.questionResponse}</p>
            </section>
          );
        })}
      </div>
    </>
  );
};
