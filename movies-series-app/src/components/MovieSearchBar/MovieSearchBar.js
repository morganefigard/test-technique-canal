import './MovieSearchBar.css';
import React, { Component } from 'react';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import axios from 'axios';
import { Form, FormGroup, Input } from 'reactstrap';

export default class MovieSearchBar extends Component {
  constructor() {
    super();

    this.onSearch$ = new Subject();
    this.subscription = new Subscription();
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch = (e) => {
    let searchTerm = e.target.value;

    this.onSearch$.next(searchTerm);
  }

  buildRequestUrl = (searchTerm) => {
    let url = 
      "https://api.themoviedb.org/3/search/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&include_adult=false&query="
      + searchTerm;

    return url;
  }

  componentDidMount() {
      this.subscription = this.onSearch$.pipe(
        debounceTime(100)
      )
      .subscribe(debouncedSearchTerm => {
        if(debouncedSearchTerm) {
          axios.get(this.buildRequestUrl(debouncedSearchTerm))
            .then(({ data }) => {
              this.props.setSearchResults(data.results);
            })
            .catch((error) => console.log(error));
        }
        else {
          this.props.setSearchResults([]);
        }
      });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Input 
            type="text"
            name="search"
            placeholder="Search for a movie..."
            onChange={this.onSearch}  
          />
        </FormGroup>
      </Form>
    )
  }
}
