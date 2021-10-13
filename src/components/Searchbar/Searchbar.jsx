import { useState } from 'react';
import { toast } from 'react-toastify';

function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');
  // state = {
  //   searchQuery: '',
  // };

  const handleChange = e => {
    // console.log(e.currentTarget.value);
    setSearchQuery(e.currentTarget.value.toLowerCase());
    // console.log(this.state);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.error('Введите Ваш Запрос');
    }

    // console.log(this.state);
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  // const { handleSubmit, handleChange } = this;

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

export default SearchBar;
