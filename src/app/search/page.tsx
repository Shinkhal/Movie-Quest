"use client";
import React, { useEffect, useState, ChangeEvent } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { FocusCards } from "@/components/ui/focus-cards";
import axios from 'axios';
import { useDebounce } from 'use-debounce';

interface Movie {
  original_title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

interface MovieResponse {
  results: Movie[];
}

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

export default function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emptySearchError, setEmptySearchError] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setEmptySearchError('');
    if (e.target.value) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  // Trigger search when button is clicked
  const handleSearch = () => {
    if (search.trim() === '') {
      setEmptySearchError('Please enter a search term.');
      return;
    }

    // Save the entire search term
    if (!recentSearches.includes(search.trim())) {
      const updatedSearches = [...recentSearches, search.trim()];
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      console.log('Saved search term:', search.trim());
    }

    setSearchTriggered(true);
    setEmptySearchError('');
    setDropdownVisible(false); // Hide dropdown after search
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<MovieResponse>(
          'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
        );
        setMovies(response.data.results);
      } catch (error) {
        setError('Error fetching movies. Please try again later.');
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    const getSearchedMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<MovieResponse>(`${SEARCHAPI}${debouncedSearch}`);
        setMovies(response.data.results);
      } catch (error) {
        setError('Error fetching movies. Please try again later.');
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTriggered) {
      getSearchedMovies();
      setSearchTriggered(false);
    } else if (debouncedSearch === '') {
      fetchMovies();
    }
  }, [debouncedSearch, searchTriggered]);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      console.log('Loaded recent searches from local storage:', JSON.parse(savedSearches));
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleRecentSearchClick = (searchTerm: string) => {
    setSearch(searchTerm);
    setDropdownVisible(false);
    setSearchTriggered(true);
    console.log('Selected recent search:', searchTerm);
  };

  const handleClearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
    console.log('Cleared recent searches from local storage.');
  };

  const cardData = movies.map((movie) => ({
    title: movie.original_title,
    src: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
    rating: movie.vote_average.toFixed(1),
    description: movie.overview,
  }));

  const words = [
    { text: "Search" },
    { text: "Your" },
    { text: "Favourite" },
    { text: "Movie" },
    { text: "with" },
    { text: "Movie-Quest.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <div className='isolate text-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className="flex flex-col items-center justify-center h-[15rem] mb-[5rem]">
        <TypewriterEffectSmooth words={words} />
        <div className="relative flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <input 
            type="search" 
            name="search" 
            id="search" 
            className="bg-gray-800 px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] z-50"
            placeholder="Search for movies..."
            onChange={handleChange}
            value={search} 
          />
          <button 
            onClick={handleSearch}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-150 z-50"
          >
            Search
          </button>
          {recentSearches.length > 0 && dropdownVisible && (
            <div className="absolute top-full left-0 mt-1 bg-gray-800 text-white border border-gray-700 rounded-lg w-[280px] z-50">
              <ul className="space-y-1">
                {recentSearches.map((term, index) => (
                  <li 
                    key={index} 
                    className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    <span className="flex-grow">{term}</span>
                    <button 
                      className="text-red-500 hover:text-red-300 ml-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the dropdown from closing when clicking the delete button
                        setRecentSearches(recentSearches.filter(t => t !== term));
                        localStorage.setItem('recentSearches', JSON.stringify(recentSearches.filter(t => t !== term)));
                      }}
                    >
                      X
                    </button>
                  </li>
                ))}
                <li 
                  className="px-4 py-2 text-red-500 hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                  onClick={handleClearSearches}
                >
                  <span>Clear Searches</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-3xl text-center mt-2">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center mt-2">{error}</div>
      ) : (
        <FocusCards cards={cardData} />
      )}
      
      <BackgroundBeams />
    </div>
  );
}
