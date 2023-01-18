import React, { useState, useEffect } from "react";
import { Button, Table, Card, Row } from "react-bootstrap";
//css
import "../../assets/custom/css/custom-table.css";

import { useSelector } from "react-redux";


function CustomTable({ tableData, data, }) {

  return (
    <div>
    
      <div className={`custom-table-effect table-responsive pe-3 text-black`}>
        <Table className="w-100">
          <thead className="w-100">
            <tr
              className="rounded w-100"
              style={{ backgroundColor: "#eff8fb", borderRadius: "15px" }}
            >
              {tableData?.columns?.map((item, idx) => {
                return (
                  <th className="py-4 text-black" id={idx}>
                    <strong>{item}</strong>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="">
            {data?.map((item, idx) => {
              return (
                <tr
                  className="py-4"
                  id={idx + 1}
                >
                  <td  className="text-wrap">
                    {idx + 1}
                  </td>
                  {tableData?.rows?.map((row, i) => {
                    return (
                      <td
                       
                        key={i}
                        className="text-black py-4"
                      >
                        {item[row]}
                      </td>
                    );
                  })}
                  <td>{item["actions"]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {data?.length === 0 && (
          <div className="d-flex justify-content-center">
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_yuisinzc.json"
              background="transparent"
              speed="1"
              style={{ width: "500px", height: "500px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomTable;
