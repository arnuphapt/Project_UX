import React, { useState } from 'react';
import PinItem from './PinItem';
import SearchBar from '../Searchbar';
import FilterBar from '../Filterbar';
import Sorting from '../Sorting';

function PinList({ listOfPins }) {
    const [selectedTech, setSelectedTech] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');

    const filteredPins = listOfPins.filter(pin => {
        const matchesTech = selectedTech.length === 0 || selectedTech.some(tech => pin.techList.includes(tech));
        const matchesSearchQuery = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (pin.userName && pin.userName.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTech && matchesSearchQuery;
    });

    const sortedPins = [...filteredPins].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return b.timestamp?.toDate() - a.timestamp?.toDate();
            case 'oldest':
                return a.timestamp?.toDate() - b.timestamp?.toDate();
            case 'likes':
                return (b.likes?.length || 0) - (a.likes?.length || 0);
            case 'views':
                return (b.viewCount || 0) - (a.viewCount || 0);
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            case 'userName':
                return a.userName.localeCompare(b.userName);
            default:
                return new Date(a.timestamp?.toDate()) - new Date(b.timestamp?.toDate());
        }
    });

    const headerText = selectedTech.length === 0
        ? 'All'
        : `Searching for: ${selectedTech.join(', ')}`;

    return (
        <div className="mt-7 px-5">
            <div className="flex justify-center items-center mb-10">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <FilterBar selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{headerText}</h1>
                <Sorting sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {sortedPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;
