import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PostItem from './PostItem';
import SearchBar from '../Searchbar';
import FilterBar from '../Filter/Filterbar';
import Adminpost from '../Admincarousel';
import { Pagination, Skeleton } from "@heroui/react";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../Shared/firebaseConfig';
import Breadcrumbs from '../Breadcrumbs';
import FilterModal from '../filter'
const PostSkeleton = () => (
    <div className="w-full space-y-3">
        <Skeleton className="w-full rounded-lg">
            <div className="h-40"></div>
        </Skeleton>
        <div className="space-y-3">
            <Skeleton className="w-3/4 rounded-lg">
                <div className="h-3"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3"></div>
            </Skeleton>
            <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-24 rounded-lg">
                    <div className="h-3"></div>
                </Skeleton>
            </div>
        </div>
    </div>
);

const AdminPostSkeleton = () => (
    <div className="w-full max-w-4xl">
        <Skeleton className="rounded-lg">
            <div className="h-72"></div>
        </Skeleton>
    </div>
);

function PinList({ listOfPins, isLoading = false }) {
    const [selectedTech, setSelectedTech] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState([]);
    const pinsPerPage = 12;

    // Fetch filters from Firebase
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const q = query(collection(db, 'filterdata'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const filtersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFilters(filtersData);
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };
        fetchFilters();
    }, []);

    const sections = useMemo(() => [...new Set(listOfPins.map(pin => pin.section))], [listOfPins]);

    const resetPage = useCallback(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        resetPage();
    }, [selectedTech, searchQuery, selectedSection, selectedPeriod, sortBy, resetPage]);

    const filteredAndSortedPins = useMemo(() => {
        const filtered = listOfPins.filter(pin => {
            const matchesTech = selectedTech.length === 0 || selectedTech.some(tech => pin.techList.includes(tech));
            const matchesSearchQuery = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (pin.userName && pin.userName.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesSection = selectedSection === '' || pin.section === selectedSection;

            const matchesPeriod = (() => {
                if (!selectedPeriod || selectedPeriod === '') return true;
                const selectedFilter = filters.find(f => f.id === selectedPeriod);
                if (!selectedFilter) return true;
                const postDate = pin.timestamp?.toDate();
                const filterStartDate = new Date(selectedFilter.startDate);
                const filterEndDate = new Date(selectedFilter.endDate);
                return postDate >= filterStartDate && postDate <= filterEndDate;
            })();

            return matchesTech && matchesSearchQuery && matchesSection && matchesPeriod;
        });

        return filtered.sort((a, b) => {
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
    }, [listOfPins, selectedTech, searchQuery, selectedSection, selectedPeriod, sortBy, filters]);

    const indexOfLastPin = currentPage * pinsPerPage;
    const indexOfFirstPin = indexOfLastPin - pinsPerPage;
    const currentPins = filteredAndSortedPins.slice(indexOfFirstPin, indexOfLastPin);

    const totalPages = Math.ceil(filteredAndSortedPins.length / pinsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="mt-7 px-5">
            <Breadcrumbs />
            {/* Admin Post Section */}
            <div className="flex justify-center items-center mb-10 cursor-pointer">
                {isLoading ? (
                    <AdminPostSkeleton />
                ) : currentPins.length > 0 ? (
                    <Adminpost />
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No post found
                    </div>
                )}
            </div>

            {/* Search and Filter Section */}
            <div className="flex justify-center items-center mb-10">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} listOfPins={listOfPins} />
            </div>
            <FilterBar selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
            <div className="flex justify-between items-center mb-4">
                <FilterModal
                    sections={sections}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    selectedPeriod={selectedPeriod}
                    setSelectedPeriod={setSelectedPeriod}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </div>

            {/* Posts Grid */}
            <div className="scroll-ml-6 snap-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {isLoading ? (
                    Array(pinsPerPage).fill(null).map((_, index) => (
                        <PostSkeleton key={`skeleton-${index}`} />
                    ))
                ) : currentPins.length > 0 ? (
                    currentPins.map((item) => (
                        <PostItem key={item.id} pin={item} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No post found
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredAndSortedPins.length > 0 && !isLoading && (
                <div className="flex justify-center mt-10">
                    <Pagination
                        size='lg'
                        showControls
                        total={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant='light'
                    />
                </div>
            )}
        </div>
    );
}

export default PinList;