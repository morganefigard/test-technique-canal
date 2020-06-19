import './PaginationBar.css';
import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
    currentPage: state.app.currentPage,
    totalPages: state.app.totalPages,
    basePath: state.app.basePath
  };
}

const ConnectPaginationBar = ({ currentPage, basePath, totalPages }) => {
  const addPaginationItem = (i) => {
    if (i === currentPage) {
      return (
        <PaginationItem active key={i}>
          <PaginationLink>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem key={i}>
          <PaginationLink tag={Link} to={basePath + i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }

  const createPagination = () => {
    let paginationItems = [];

    if (currentPage === 1 || currentPage === 2) {
      for (let i=1; i<6; i++) {
        paginationItems.push(addPaginationItem(i));
      }
    }
    else if (currentPage === totalPages || currentPage === totalPages - 1) {
      for (let i=totalPages - 4; i<totalPages + 1; i++) {
        paginationItems.push(addPaginationItem(i));
      }
    } else {
      for (let i=currentPage - 2; i<currentPage + 3; i++) {
        paginationItems.push(addPaginationItem(i));
      }
    }

    return paginationItems;
  }

  const prevPage = currentPage !== 1 ? currentPage - 1 : 1; 
  const nextPage = currentPage !== totalPages ? currentPage + 1 : totalPages; 

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink first tag={Link} to={basePath + "1"} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous tag={Link} to={basePath + prevPage} />
      </PaginationItem>
      {createPagination()}
      <PaginationItem>
        <PaginationLink next tag={Link} to={basePath + nextPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last tag={Link} to={basePath + totalPages} />
      </PaginationItem>
    </Pagination>
  )
}

const PaginationBar = connect(mapStateToProps)(ConnectPaginationBar);

export default PaginationBar;
