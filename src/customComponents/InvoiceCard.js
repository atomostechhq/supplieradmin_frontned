import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton/LinkButton";

const InvoiceCard = () => {
  return (
    <div className="invoice-card p-5 flex flex-col gap-3  hover:border border hover:border-blue-400 cursor-pointer">
      <div className="flex justify-between items-center border-b  border-b-black pb-3">
        <div>
          <p className="text-[16px] text-[#333333] ">Robas RFQ</p>
          <p className="text-[#000000] text-[14px] font-[900]">1000789</p>
        </div>

        <div>
          <p className="text-[#333333] text-[12px]">Invoice ID</p>
          <p className="text-[#1765DC]"> 9898CKKL</p>
        </div>
      </div>
      <div>
        <p>Date Generated</p>
        <p className="text-[#1765DC] text-[16px]">23/05/22</p>
      </div>
      <div className="flex ">
        <div className="w-[50%] border-r border-r-black">
          <p className="text-[12px]">Total Amount</p>
          <p className="text-[#1765DC]"> $123324</p>
        </div>
        <div className="w-[50%] pl-5">
          <p className="text-[12px]">Countries</p>
          <p className="text-[#1765DC] text-[14]"> $4</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Button
          className="sagar"
          onClick={(e) => console.log("its working", e)}
          variant="filled"
        >
          View PDF
        </Button>
        <LinkButton
          className="linkBtn"
          href="https://scalablecss.com/styled-components-global-styles/"
        >
          <AiOutlineDownload />
        </LinkButton>
      </div>
    </div>
  );
};

export default InvoiceCard;
