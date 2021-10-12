import { Component } from 'react';
import { toast } from 'react-toastify';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    // console.log(e.currentTarget.value);
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    // console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.error('Введите Ваш Запрос');
    }

    // console.log(this.state);
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    const { handleSubmit, handleChange } = this;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
