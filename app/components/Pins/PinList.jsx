import React, { useState } from 'react';
import PinItem from './PinItem';
import SearchBar from '../SearchBar';
import FilterBar from '../FilterBar';

function PinList({ listOfPins }) {
    const [selectedTech, setSelectedTech] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter pins based on the selected tech and search query
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

            <div className="grid grid-cols-5 gap-4 mx-auto">
                {filteredPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;
