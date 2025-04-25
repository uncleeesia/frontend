import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => onSearch(e.target.value);


  return (
    <div className={styles.SearchBar}>
      <input 
        type="text" 
        placeholder="Search cleaning services..." 
        onChange={handleInputChange} 
      />
    </div>
  );
};

export default SearchBar;
