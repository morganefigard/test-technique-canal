import './PaginationBar.css';
import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class PaginationBar extends Component {

  addPaginationItem = (i) => {
    if (i === this.props.currentPage) {
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
          <PaginationLink tag={Link} to={"/movies/" + i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }

  createPagination = () => {
    let paginationItems = [];

    if (this.props.currentPage === 1 || this.props.currentPage === 2) {
      for (let i=1; i<6; i++) {
        paginationItems.push(this.addPaginationItem(i));
      }
    }
    else if (this.props.currentPage === this.props.totalPages || this.props.currentPage === this.props.totalPages - 1) {
      for (let i=this.props.totalPages - 4; i<this.props.totalPages + 1; i++) {
        paginationItems.push(this.addPaginationItem(i));
      }
    } else {
      for (let i=this.props.currentPage - 2; i<this.props.currentPage + 3; i++) {
        paginationItems.push(this.addPaginationItem(i));
      }
    }

    return paginationItems;
  }

  render() {
    let prevPage = this.props.currentPage !== 1 ? this.props.currentPage - 1 : 1; 
    let nextPage = this.props.currentPage !== this.props.totalPages ? this.props.currentPage + 1 : this.props.totalPages; 

    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink first tag={Link} to="/movies/1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous tag={Link} to={"/movies/" + prevPage} />
        </PaginationItem>
        {this.createPagination()}
        <PaginationItem>
          <PaginationLink next tag={Link} to={"/movies/" + nextPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last tag={Link} to={"/movies/" + this.props.totalPages} />
        </PaginationItem>
      </Pagination>
    )
  }
}
