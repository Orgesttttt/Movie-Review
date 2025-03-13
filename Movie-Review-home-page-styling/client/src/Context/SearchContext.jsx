import { createContext, useState, useContext } from 'react';

// Create a context for search functionality
const SearchContext = createContext();

// Custom hook to use the search context
export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Function to perform search
  const performSearch = (movies, term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const normalizedTerm = term.toLowerCase().trim();
    
    const results = movies.filter(movie => 
      movie.title.toLowerCase().includes(normalizedTerm) || 
      movie.genre.toLowerCase().includes(normalizedTerm) ||
      movie.description.toLowerCase().includes(normalizedTerm)
    );
    
    setSearchResults(results);
  };
  
  const value = {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    performSearch
  };
  
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};