import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ReportsCard = ({ openModal }) => {
  return (
    <div className="border cursor-pointer hover:border-blue-400 w-[610px] justify-between  h-[69px] flex  items-center p-5 rounded-[8px] ">
      <p className="font-[700] text-[16px] text-[#333333]">Robas RFQ </p>
      <div className="flex gap-10 items-center">
        <p>1000789</p>
        <Link
          color="#5C96EE"
          border="underline"
          href="https://scalablecss.com/styled-components-global-styles/"
        >
          <p className="text-[#1765DC] ">View All </p>
        </Link>

        <Button
          onClick={((e) => console.log("its working", e), openModal)}
          variant="outlined"
          customWidth="200px"
        >
          Outlined Button
        </Button>
      </div>
    </div>
  );
};

export default ReportsCard;
