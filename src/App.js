import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <SearchBar onSubmit={setSearchQuery} />

      <ImageGallery searchQuery={searchQuery} />

      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
}

export default App;
