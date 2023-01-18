import React, { useRef, memo, useState, useEffect, useCallback } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchRecentBarcodeList } from "../../store/barcode/recentBarcodeListSlice";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "../../components/custom/paginationComponent";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import NodataAnimation from "../../components/custom/NodataAnimation";


const LatestBarcode = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(24);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { active_tab } = useParams();

  useEffect(() => {
    if (active_tab === "latest-barcode") {
      dispatch(fetchRecentBarcodeList());
    }
  }, [active_tab]);

  const { recentBarcodeList, recentBarcodeCount } = useSelector(
    (state) => state.recentBarcodeListSlice
  );

  const setAddToggle = useCallback(() => {
    setAddBarcode((v) => !v);
  }, []);

  const [data, setData] = useState({
    columns: ["SL No", "Name", "Point", "Barcode"],
    rows: [],
  });

  useEffect(() => {
    if (recentBarcodeList.length > 0) {
      let barcodes = recentBarcodeList.map((item, idx) => {
        return {
          ...item,
          sl: idx + 1,
        };
      });
      setData({ ...data, rows: barcodes });
    } else {
      setData({ ...data, rows: [] });
    }
  }, [recentBarcodeList]);

  const marginTop = "40px";
  const marginRight = "15px";
  const marginBottom = "30px";
  const marginLeft = "15px";

  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center col-12 my-2">
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4 text-end mt-3 mt-md-0">
          <Button
            onClick={handlePrint}
            className=" col-12 col-md-4 ms-3   hvr-sweep-to-bottom"
          >
            Print
          </Button>
        </div>
      </div>

      <div>
        <Row className="mt-3">
          {data?.rows.map((item, idx) => (
            <Col key={idx} lg={2}>
              <div
                style={{ border: "1px solid Black", width: "170px" }}
                className="rounded-1 p-2 my-2"
              >
                <div className="d-flex justify-content-between">
                  <div className="mt-2  ">
                    <p
                      className="mt-2"
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                    >
                      Point : {item.point}
                    </p>
                  </div>
                  <div>
                    <QRCode title="test" size={55} value={item.id} />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ display: "none" }}>
        <style>{getPageMargins()}</style>
        <div ref={printRef} className="p-3">
          <Row>
            {data?.rows.map((item, idx) => (
              <Col key={idx}>
                <div
                  style={{ border: "1px solid Black", width: "150px" }}
                  className="rounded-1 p-2 my-2"
                >
                  <div className="d-flex justify-content-between">
                    <div className="mt-2  ">
                      <img src={image} width={70} alt="" />
                      <p
                        className="mt-2"
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                      >
                        Point : {item.point}
                      </p>
                    </div>
                    <div>
                      <QRCode title="test" size={55} value={item.id} />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {recentBarcodeList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <NodataAnimation />
        </div>
      )}
    </>
  );
};

export default LatestBarcode;
