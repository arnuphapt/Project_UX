import React from 'react';
import { HiSearch } from "react-icons/hi";

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="border-b-2 p-2 w-full md:w-2/5 flex items-center">
            <HiSearch className="text-[25px] text-gray-500 mr-2" />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-1 w-full focus:outline-none"
            />
        </div>
    );
}

export default SearchBar;
