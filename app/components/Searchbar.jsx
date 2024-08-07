import React from 'react';
import { HiSearch } from "react-icons/hi";
import { Input } from "@nextui-org/react";

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className=" p-2 w-full md:w-2/5 flex items-center">
            <Input
            endContent={<HiSearch className='text-[25px]'/>}
            size='md'
                variant='underlined'
                type="text"
                label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
