import React from 'react';
import { HiSearch } from "react-icons/hi";

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="bg-[#e9e9e9] p-3 rounded-full w-3/5  md:flex">
            <HiSearch className='text-[25px] text-gray-500' />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#e9e9e9] p-1 rounded-full w-full focus:outline-none"
            />
        </div>
    );
}

export default SearchBar;