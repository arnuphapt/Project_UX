import React, { useState } from 'react';
import PinItem from './PinItem';
import SearchBar from '../Searchbar';
import FilterBar from '../Filterbar';

function PinList({ listOfPins }) {
    const [selectedTech, setSelectedTech] = useState([]); // Initialize as an empty array
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPins = listOfPins.filter(pin => {
        // Check if selectedTech is empty or if the pin's techList includes any of the selectedTech
        const matchesTech = selectedTech.length === 0 || selectedTech.some(tech => pin.techList.includes(tech));
        const matchesSearchQuery = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTech && matchesSearchQuery;
    });

    const headerText = selectedTech.length === 0
        ? 'All' // Default text when no specific technology is selected
        : `Searching for: ${selectedTech.join(', ')}`; // Text showing selected technologies

    return (
        <div className="mt-7 px-5">
            <div className="flex justify-center items-center mb-7">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            
            <FilterBar selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
            <h1 className="text-2xl font-bold mb-4">{headerText}</h1>

            <div className="grid grid-cols-6 gap-4 mx-auto">
                {filteredPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;
