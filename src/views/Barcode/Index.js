import React, { useRef, memo, useState, useEffect, useCallback } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchBarcodeList } from "../../store/barcode/barcodeListSlice";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "../../components/custom/paginationComponent";
import AddBarcode from "./AddBarcode";
import QRCode from "react-qr-code";
import NodataAnimation from "../../components/custom/NodataAnimation";


const Barcode = () => {
  const dispatch = useDispatch();
  const [addBarcode, setAddBarcode] = useState(false);
  const [limit, setLimit] = useState(36);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { active_tab } = useParams();
  useEffect(() => {
    if (active_tab === "barcode-list") {
      dispatch(fetchBarcodeList({ limit, offset: currentPage }));
    }
  }, [active_tab, addBarcode, limit, currentPage]);

  const { barcodeList, barcodeCount } = useSelector(
    (state) => state.barcodeListSlice
  );

  const setAddToggle = useCallback(() => {
    setAddBarcode((v) => !v);
  }, []);

  const [data, setData] = useState({
    columns: ["SL No", "Name", "Point", "Barcode"],
    rows: [],
  });

  useEffect(() => {
    if (barcodeList.length > 0) {
      let barcodes = barcodeList.map((item, idx) => {
        return {
          ...item,
          sl: idx + 1,
        };
      });
      setData({ ...data, rows: barcodes });
    } else {
      setData({ ...data, rows: [] });
    }
  }, [barcodeList]);

  return (
    <>
      <AddBarcode toggle={addBarcode} setToggle={setAddToggle} />

      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center col-12 my-2">
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4 text-end mt-3 mt-md-0">
          <Button
            onClick={() => setAddBarcode(true)}
            className=" col-12 col-md-4  hvr-sweep-to-bottom"
          >
            Add New
          </Button>
        </div>
      </div>

      <div>
        <Row className="mt-5">
          {data?.rows.map((item, idx) => (
            <Col key={idx} lg={2}>
              <>
                <div
                  style={{ border: "1px solid Black", width: "170px" }}
                  className="rounded-1 p-2 my-2"
                >
                  <div className="d-flex justify-content-between">
                    <div className="mt-2 ">
                      <p
                        className="my-2"
                        style={{
                          fontSize: "8px",
                          color: `${item.is_claimed ? "green" : "red"}`,
                        }}
                      >
                        {item.is_claimed ? "Claimed" : "Not Claimed"}
                      </p>
                    </div>
                    <div>
                      <QRCode title="test" size={55} value={item.id} />
                    </div>
                  </div>
                </div>
              </>
            </Col>
          ))}
        </Row>
      </div>
      {barcodeList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <NodataAnimation />
        </div>
      )}  
      <Row className="ms-5">
        <Col>
        <div className="mt-5 me-5 d-flex justify-content-end">
        <PaginationComponent
          itemsCount={barcodeCount}
          itemsPerPage={limit}
          setCurrentPage={setCurrentPage}
        />
      </div>
        </Col>
      
      </Row>
      
    </>
  );
};

export default Barcode;
