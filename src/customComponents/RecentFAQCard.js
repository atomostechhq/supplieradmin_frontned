import React from "react";
import Chip from "../components/Chips/Chip";

let TableRow = [
  {
    id: "1000700",
    Name: "Re: TO072022199829",
    Status: "Seen",
    Budget: "45667",
  },
  {
    id: "1000700",
    Name: "Re: TO072022199829",
    Status: "Seen",
    Budget: "45667",
  },
  {
    id: "1000700",
    Name: "Re: TO072022199829",
    Status: "Seen",
    Budget: "45667",
  },
  {
    id: "1000700",
    Name: "Re: TO072022199829",
    Status: "Seen",
    Budget: "45667",
  },
];

const RecentFAQCard = () => {
  return (
    <div className="recent-faq-table-container h-full w-full ">
      <div className="w-[70%]  flex gap-3 flex-col">
        <p className="text-[#1765DC] text-[16px]">Recent RFQs</p>
        <table className="recent-faq-table">
          <tr>
            <th> ID</th>
            <th> Name</th>
            <th> Status</th>
            <th> Budget</th>
          </tr>
          {TableRow.map((item, ind) => {
            return (
              <tr>
                <td> 1000700</td>
                <td> Re: TO072022199829</td>
                <td>
                  {" "}
                  <Chip variant="outlined" color="warning">
                    Seen
                  </Chip>
                </td>
                <td> $45667</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default RecentFAQCard;
