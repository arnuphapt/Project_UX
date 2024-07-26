import React, { useState } from 'react';
import PinItem from './PinItem';
import SearchBar from '../Searchbar';
import FilterBar from '../Filterbar';
import Sorting from '../Sorting';

function PinList({ posts }) {
    const [selectedTech, setSelectedTech] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default'); // State for sorting criteria

    const filteredPins = posts.filter(pin => {
        const matchesTech = selectedTech.length === 0 || selectedTech.some(tech => pin.techList.includes(tech));
        const matchesSearchQuery = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTech && matchesSearchQuery;
    });

    // Sort filteredPins based on the selected sort option
    const sortedPins = [...filteredPins].sort((a, b) => {
        switch (sortBy) {
            case 'likes':
                return (b.likes?.length || 0) - (a.likes?.length || 0);
            case 'views':
                return (b.viewCount || 0) - (a.viewCount || 0);
            case 'title':
                return a.title.localeCompare(b.title);
            case 'userName':
                return a.userName.localeCompare(b.userName);
            default:
                return 0; // Default sorting
        }
    });

    const headerText = selectedTech.length === 0
        ? 'All'
        : `Searching for: ${selectedTech.join(', ')}`;

    return (
        <div className="mt-7 px-5">
            <div className="flex justify-center items-center mb-7">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            
            <FilterBar selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
            
            {/* Use the Sorting component */}
            <Sorting sortBy={sortBy} setSortBy={setSortBy} />

            <h1 className="text-2xl font-bold mb-4">{headerText}</h1>

            <div className="grid grid-cols-6 gap-6 mx-auto">
                {sortedPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;
