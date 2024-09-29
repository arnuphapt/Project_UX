import React, { useState, useMemo, useEffect } from 'react';
import PinItem from './PinItem';
import SearchBar from '../Searchbar';
import FilterBar from '../Filter/Filterbar';
import Sorting from '../Filter/Sorting';
import FilterSection from '../Filter/FilterSection';
import FilterYears from '../Filter/FilterYears'; // นำเข้า FilterYears ที่แก้ไขแล้ว

import { Pagination } from "@nextui-org/react";

function PinList({ listOfPins }) {
    const [selectedTech, setSelectedTech] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [selectedSection, setSelectedSection] = useState(''); // ฟิลเตอร์ section เดิม
    const [selectedPeriod, setSelectedPeriod] = useState(''); // ฟิลเตอร์ช่วงเวลาใหม่
    const [currentPage, setCurrentPage] = useState(1);
    const pinsPerPage = 18;

    const sections = useMemo(() => [...new Set(listOfPins.map(pin => pin.section))], [listOfPins]);

    // Reset pagination to 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTech, searchQuery, selectedSection, selectedPeriod, sortBy]);

    const filteredAndSortedPins = useMemo(() => {
        // Step 1: Filter pins
        const filtered = listOfPins.filter(pin => {
            const matchesTech = selectedTech.length === 0 || selectedTech.some(tech => pin.techList.includes(tech));
            const matchesSearchQuery = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (pin.userName && pin.userName.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesSection = selectedSection === '' || pin.section === selectedSection;

            // ฟังก์ชันสำหรับการฟิลเตอร์ตามช่วงเดือน
            const matchesPeriod = (() => {
                if (selectedPeriod === '1/67') {
                    const month = pin.timestamp?.toDate().getMonth() + 1; // ดึงเดือนของโพสต์
                    return month >= 6 && month <= 10; // ช่วงเดือน 6 ถึง 10
                } else if (selectedPeriod === '2/67') {
                    const month = pin.timestamp?.toDate().getMonth() + 1;
                    return month >= 11 || month <= 4; // ช่วงเดือน 11 ถึงเดือน 4
                }
                return true; // แสดงทุกช่วงถ้าไม่ได้เลือก
            })();

            return matchesTech && matchesSearchQuery && matchesSection && matchesPeriod;
        });

        // Step 2: Group by user and get the latest post for each user
        const latestPinsByUser = filtered.reduce((acc, pin) => {
            if (!acc[pin.userName] || pin.timestamp > acc[pin.userName].timestamp) {
                acc[pin.userName] = pin;
            }
            return acc;
        }, {});

        // Step 3: Convert back to array and sort
        return Object.values(latestPinsByUser).sort((a, b) => {
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
                    return b.timestamp?.toDate() - a.timestamp?.toDate();
            }
        });
    }, [listOfPins, selectedTech, searchQuery, selectedSection, selectedPeriod, sortBy]);

    // Calculate the pins to display based on the current page
    const indexOfLastPin = currentPage * pinsPerPage;
    const indexOfFirstPin = indexOfLastPin - pinsPerPage;
    const currentPins = filteredAndSortedPins.slice(indexOfFirstPin, indexOfLastPin);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(filteredAndSortedPins.length / pinsPerPage);

    return (
        <div className="mt-7 px-5">

            <div className="flex justify-center items-center mb-10">

                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <FilterBar selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
            <div className="flex justify-between items-center mb-4">
                <FilterSection sections={sections} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                <FilterYears selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} /> {/* เพิ่มฟิลเตอร์ช่วงเวลา */}

                <Sorting sortBy={sortBy} setSortBy={setSortBy} />

            </div>

            <div className="scroll-ml-6 snap-start grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {currentPins.length > 0 ? (
                    currentPins.map((item) => (
                        <PinItem key={item.id} pin={item} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No post found
                    </div>
                )}
            </div>

            {filteredAndSortedPins.length > 0 && (
                <div className="flex justify-center mt-10">
                    <Pagination size='lg' showControls total={totalPages} initialPage={1} onChange={page => setCurrentPage(page)} />
                </div>
            )}
        </div>
    );
}

export default PinList;
