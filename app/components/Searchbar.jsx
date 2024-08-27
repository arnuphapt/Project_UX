import React from 'react';
import { HiSearch } from "react-icons/hi";
import { Input } from "@nextui-org/react";

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className=" p-2 w-full md:w-2/5 flex items-center">
            <Input
                startContent={<HiSearch className='text-[25px]' />}
                size='lg'
                variant='bordered'
                type="text"
                value={searchQuery}
                placeholder='Search'
                radius='full'
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
