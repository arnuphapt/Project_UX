import React from 'react';
import { HiSearch } from "react-icons/hi";

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="border-b-2 p-2  w-3/5  md:flex">
            <HiSearch className='text-[25px] text-gray-500' />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-1 border-black w-full focus:outline-none"
            />
        </div>
    );
}

export default SearchBar;