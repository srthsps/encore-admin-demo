import React, { memo, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { editSvg, deleteSvg } from "../../components/custom/buttonSvg";
import { useSelector, useDispatch } from "react-redux";
import { fetchStaffList } from "../../store/usermanagement/staff/staffListSlice";
import { deleteStaff } from "../../store/usermanagement/staff/staffDeleteSlice";
import PaginationComponent from "../../components/custom/paginationComponent";
import NodataAnimation from "../../components/custom/NodataAnimation";
//Components
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const ProductList = memo(() => {
  const [filter, setFilter] = useState("staff");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const { active_tab } = useParams();

  const [toggleAddUser, setToggleAddUser] = useState(false);
  const [toggleEditUser, setToggleEditUser] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [search, setSearch] = useState("");

  const history = useHistory();

  const handleEdit = (e, item) => {
    e.preventDefault();
    setSelectedID(item.id);
    setToggleEditUser(true);
  };

  const dispatch = useDispatch();
  const { dsdSuccess } = useSelector((state) => state.staffDeleteSlice);

  useEffect(() => {
    dispatch(fetchStaffList({ limit, offset: currentPage ,search }));
  }, [toggleAddUser, toggleEditUser, dsdSuccess, limit, currentPage ,search]);

  const { staffList, staffCount } = useSelector(
    (state) => state.staffListSlice
  );

  const [userData, setUserData] = useState({
    columns: ["Name", "Email", "Mobile", "Actions"],
    rows: [],
  });

  useEffect(() => {
    if (staffList.length > 0) {
      let data = staffList.map((item, idx) => {
        return {
          ...item,
          sl: idx + 1,
          role: <span className="ps-4">{item.role}</span>,
          actionadd: editSvg,
        };
      });
      setUserData({ ...userData, rows: data });
    } else {
      setUserData({ ...userData, rows: [] });
    }
  }, [staffList]);

  const DeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      backdrop: `rgba(60,60,60,0.8)`,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
        dispatch(deleteStaff({ userID: id }));
        dispatch(fetchStaffList({ search, limit, offset: currentPage }));
        dispatch(clearDsdState());
      }
    });
  };
  const handleDelete = (e, item) => {
    e.preventDefault();
    DeleteItem(item.id);
  };

  return (
    <>
      <AddUser toggle={toggleAddUser} setToggle={setToggleAddUser} />
      <EditUser
        toggle={toggleEditUser}
        setToggle={setToggleEditUser}
        userID={selectedID}
      />
      <h5 className="mb-4">Staffs</h5>
      <div className="mt-5">
        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center col-12 my-3">
          <div className="col-12 col-md-4">
            <div className="input-group col-md-4" style={{ border: "none" }}>
              <span
                className="input-group-append py-2"
                style={{ border: "none" }}
              >
                <div className="btn btn-sm ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </span>
              <input
                className="form-control py-2"
                type="search"
                style={{ border: "none", color: "black",backgroundColor: "#eff8fb" }}
                placeholder="Search by  name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 col-md-4 text-end mt-3 mt-md-0">
            <Button
              onClick={() => {
                setToggleAddUser(true);
              }}
              className="me-4 col-12 col-md-4  hvr-sweep-to-bottom"
            >
              Add New
            </Button>
          </div>
        </div>
        <Card>
          <Card.Body>
            <div className="custom-table-effect table-responsive">
              <Table>
                <thead>
                  <tr
                    className="rounded"
                    style={{ backgroundColor: "#eff8fb", borderRadius: "15px" }}
                  >
                    {userData?.columns?.map((item, idx) => {
                      return (
                        <th className="text-black" id={idx}>
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="">
                  {userData?.rows?.map((item, idx) => {
                    return (
                      <tr className="py-4" id={idx + 1}>
                        <td className="text-black">{item.name}</td>
                        <td className="text-black">{item.email}</td>
                        <td className="text-black">{item.mobile}</td>

                        <td>
                          <Button
                            className="btn btn-primary btn-icon btn-sm rounded-pill"
                            style={{ background: "#eff8fb" }}
                            onClick={() => {
                              setSelectedID(item.id);
                              setToggleEditUser(true);
                            }}
                            role="button"
                          >
                            <span className="btn-inner text-primary">
                              {item.actionadd}
                            </span>
                          </Button>
                          <Button
                            className="btn btn-icon btn-sm rounded-pill ms-2"
                            style={{ background: "#eff8fb" }}
                            onClick={(e) => handleDelete(e, item)}
                            role="button"
                          >
                            <span className="btn-inner text-danger">
                              {deleteSvg}
                            </span>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {userData?.rows?.length === 0 && (
                <div className="d-flex justify-content-center">
                <NodataAnimation/>
                </div>
              )}
              <div className="mt-5 me-5 float-end">
                <PaginationComponent
                  itemsCount={staffCount}
                  itemsPerPage={limit}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
});

export default ProductList;
