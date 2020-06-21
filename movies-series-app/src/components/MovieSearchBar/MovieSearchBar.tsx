import './MovieSearchBar.css';
import React, { ChangeEvent } from 'react';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import axios from 'axios';
import { Form, FormGroup, Input } from 'reactstrap';
import { Movie } from '../../interfaces/Movies';

interface MovieSearchBarProps {
  setSearchResults: (results: Movie[]) => void
}

interface State {
  onSearch$: Subject<string>
}

let onSearch$ = new Subject();
let subscription = new Subscription();

export default class MovieSearchBar extends React.Component<MovieSearchBarProps & any, State> {
  constructor(props: MovieSearchBarProps) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;

    onSearch$.next(searchTerm);
  }

  buildRequestUrl = (searchTerm: string) => {
    let url = 
      "https://api.themoviedb.org/3/search/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&include_adult=false&query="
      + searchTerm;

    return url;
  }

  componentDidMount() {
      subscription = onSearch$.pipe(
        debounceTime(100)
      )
      .subscribe((debouncedSearchTerm: any) => {
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
    if (subscription) {
      subscription.unsubscribe();
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
