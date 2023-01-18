import { useState, memo, Fragment } from "react";

//React-bootstrap
import { Image, Dropdown, Modal, Card } from "react-bootstrap";

//Router
import { Link } from "react-router-dom";
//Sweet alert
import Swal from "sweetalert2";

const Document = memo((props) => {
  function Sweetalert() {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You want to restore this item",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Restore!", "Your item has been restore.", "success");
      }
    });
  }
  function Sweetalert1() {
    Swal.fire({
      icon: "error",
      title: "Are you sure?",
      text: "You want to delete this item",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Card className=" iq-file-manager">
        <Card.Body style={{ border: "1px solid #b3c3f3", borderRadius: "5px" }}>
          <div className="p-3 d-flex justify-content-center align-items-center iq-document rounded bg-body">
            <Image
              src={props.imgChange}
              className="img-fluid"
              alt=""
              onClick={handleShow}
            />
          </div>
          <div className="mt-2">
            <div className="d-flex justify-content-between">
              <p className="small mb-2">Created on {props.imageDate}</p>
              <Link to="#">{props.imgMb}</Link>
            </div>
            <div className="d-flex align-items-center mb-2 text-primary gap-2">
              <svg
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z"
                  fill="currentColor"
                ></path>
              </svg>
              <h6 className="text-dark mb-0">{props.imgName}</h6>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <small>
                You opened <Link to="#">{props.imgLink}</Link>
              </small>
              {props.trash === "true" && (
                <Dropdown className="mt-2" style={{ cursor: "pointer" }}>
                  <Dropdown.Toggle
                    as="svg"
                    height="20"
                    viewBox="0 0 5 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="2.5"
                      cy="3"
                      r="2.5"
                      fill="currentcolor"
                    ></circle>
                    <circle
                      cx="2.5"
                      cy="10"
                      r="2.5"
                      fill="currentcolor"
                    ></circle>
                    <circle
                      cx="2.5"
                      cy="17"
                      r="2.5"
                      fill="currentcolor"
                    ></circle>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <li>
                      <Dropdown.Item
                        className="dropdown-item delete-btn"
                        onClick={Sweetalert1}
                      >
                        Delete
                      </Dropdown.Item>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          {props.media === "pdf" && (
            <iframe
              src="https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/doc-files/demo.pdf"
              title="iq-doc"
              loading="lazy"
              style={{ width: "69rem", height: "34rem" }}
            ></iframe>
          )}
          {props.media === "xlxs" && (
            <iframe
              src="https://view.officeapps.live.com/op/view.aspx?src=https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/doc-files/demo.xlsx"
              title="iq-doc"
              loading="lazy"
              style={{ width: "69rem", height: "34rem" }}
            ></iframe>
          )}
          {props.media === "word" && (
            <iframe
              src="https://view.officeapps.live.com/op/view.aspx?src=https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/doc-files/demo.docx"
              title="iq-doc"
              loading="lazy"
              style={{ width: "69rem", height: "34rem" }}
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
});

Document.displayName = "Document";
export default Document;
