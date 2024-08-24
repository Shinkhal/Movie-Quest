"use client";
import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleSearch = () => {
    if (query.trim() === '') return;
    // Save the query to localStorage
    const updatedSearches = [query, ...recentSearches.filter(search => search !== query)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
    // Perform search operation here
    console.log('Searching for:', query);
    setQuery('');
  };

  const handleClearSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <div className="text-black">
      <div className="relative text-center">
        <div className="InputContainer">
          <input 
            placeholder="Search.." 
            id="input" 
            className="input border border-gray-400 rounded-md px-4 py-2" 
            name="text" 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        {recentSearches.length > 0 && (
          <div className="mt-2 bg-gray-800 text-white rounded-md p-4">
            <h3 className="text-lg font-semibold">Recent Searches</h3>
            <ul>
              {recentSearches.map((search, index) => (
                <li key={index} className="py-1">{search}</li>
              ))}
            </ul>
            <button
              onClick={handleClearSearches}
              className="mt-2 bg-red-600 px-4 py-2 rounded-md"
            >
              Clear Searches
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
