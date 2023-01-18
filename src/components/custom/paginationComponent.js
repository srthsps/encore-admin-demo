import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { scrollToTop } from "./scroll";

const PaginationComponent = ({
  itemsCount,
  itemsPerPage,
  setCurrentPage,
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected * (itemsPerPage));
    scrollToTop();
  };

  return (
    <>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pagesCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default PaginationComponent;
