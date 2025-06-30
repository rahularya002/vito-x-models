import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch, onFilter }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full bg-stone-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <button 
        className="flex items-center gap-2 bg-stone-900 border border-white/10 rounded-lg py-2 px-4 text-white hover:bg-stone-800 transition-colors"
        onClick={onFilter}
      >
        <Filter className="h-4 w-4" />
        Filter
      </button>
    </div>
  );
}; 