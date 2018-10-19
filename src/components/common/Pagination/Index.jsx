import React from 'react';
import ReactPaginate from 'react-paginate';
import { number } from 'prop-types';

const Pagination = ({ pageCount, page, handlePageChange }) => ( // eslint-disable-line
  <div style={{ textAlign: 'center' }}>
    <ReactPaginate
      breakLabel={<span>...</span>}
      breakClassName="break-me"
      pageCount={pageCount}
      initialPage={page - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
      disableInitialCallback
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  </div>
);

Pagination.propTypes = {
  pageCount: number.isRequired,
  page: number.isRequired
};

export default Pagination;
