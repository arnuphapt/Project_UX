import React, { useState } from 'react';
import PinItem from './PinItem';
import SearchBar from '../Searchbar';
import FilterBar from '../Filterbar';
import Sorting from '../Sorting';
import FilterSection from '../FilterSection'; // Import the new FilterSection component
import { Button } from "@nextui-org/react"; // เพิ่มการ import Button

function PinList({ listOfPins, getMorePins, loading }) {
    const [selectedTech, setSelectedTech] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [selectedSection, setSelectedSection] = useState('');
    const sections = [...new Set(listOfPins.map(pin => pin.section))];
    const filteredPins = listOfPins.filter(pin => {
        const matchesTech = selectedTech.length === 0 || selectedTech.some(tech => pin.techList.includes(tech));
        const matchesSearchQuery = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (pin.userName && pin.userName.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesSection = selectedSection === '' || pin.section === selectedSection;

        return matchesTech && matchesSearchQuery && matchesSection;
    });

    const sortedPins = [...filteredPins].sort((a, b) => {
        switch (sortBy) {
            case 'default':
                return b.timestamp?.toDate() - a.timestamp?.toDate();
            case 'Oldest posts':
                return a.timestamp?.toDate() - b.timestamp?.toDate();
            case 'Most Liked':
                return (b.likes?.length || 0) - (a.likes?.length || 0);
            case 'Most Viewed':
                return (b.viewCount || 0) - (a.viewCount || 0);
            case 'Name A-Z':
                return a.title.localeCompare(b.title);
            case 'Name Z-A':
                return b.title.localeCompare(a.title);
            case 'userName':
                return a.userName.localeCompare(b.userName);
            default:
                return new Date(a.timestamp?.toDate()) - new Date(b.timestamp?.toDate());
        }
    });
    const handleSeeMore = () => {
        getMorePins();
    };
    return (
        <div className="mt-7 px-5">
            <div className="flex justify-center items-center mb-10">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <FilterBar selectedTech={selectedTech} setSelectedTech={setSelectedTech} />

            <div className="flex justify-between items-center mb-4">
                <FilterSection sections={sections} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                <Sorting sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div className="scroll-ml-6 snap-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {sortedPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
            {listOfPins.length >= 30 && (
                <div className="flex justify-center mt-6" >
                    <Button
                        color="primary"
                        onClick={handleSeeMore}
                        disabled={loading}
                        aria-label={loading ? 'Loading more pins' : 'Load more pins'}
                    >
                        {loading ? 'Loading...' : 'See More'}
                    </Button>

                </div>
            )}
        </div>
    );
}

export default PinList;
