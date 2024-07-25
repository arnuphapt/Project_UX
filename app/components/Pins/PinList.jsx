import React, { useState } from 'react';
import PinItem from './PinItem';
import SearchBar from '../Searchbar';
import FilterBar from '../Filterbar';

function PinList({ listOfPins }) {
    const [selectedTech, setSelectedTech] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPins = listOfPins.filter(pin =>
        (selectedTech === 'All' || pin.techList.includes(selectedTech)) &&
        (pin.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return (
        <div className="mt-7 px-5">
            <div className="flex justify-center items-center mb-7">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            
            <FilterBar selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
            <h1 className="text-2xl font-bold mb-4">ผลงาน</h1>

            <div className="grid grid-cols-6 gap-4 mx-auto">
                {filteredPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;
