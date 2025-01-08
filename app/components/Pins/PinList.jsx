import React, { useState, useMemo, useRef } from 'react';
import { Button, Skeleton } from "@nextui-org/react";
import { Upload, ArrowUpRight, ChevronDown } from 'lucide-react';
import PinItem from './PinItem';
import { useRouter } from 'next/navigation';
import Profilecard from '../Profile Card'
const LoadingSkeleton = () => (
    <div className="rounded-xl">
        <Skeleton className="rounded-xl">
            <div className="h-[300px]"></div>
        </Skeleton>
    </div>
);

const PinList = ({ listOfPins, isLoading = false }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pinsPerPage = 6;
    const router = useRouter();
    const mostLikedSectionRef = useRef(null);

    const scrollToMostLiked = () => {
        mostLikedSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sortedPins = useMemo(() => {
        const allPins = [...listOfPins];

        const latestPinsByUser = allPins.reduce((acc, pin) => {
            if (!acc[pin.userName] || pin.timestamp > acc[pin.userName].timestamp) {
                acc[pin.userName] = pin;
            }
            return acc;
        }, {});

        return Object.values(latestPinsByUser).sort((a, b) =>
            b.timestamp?.toDate() - a.timestamp?.toDate()
        );
    }, [listOfPins]);

    const mostLikedPins = useMemo(() => {
        return [...sortedPins]
            .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
            .slice(0, 3);
    }, [sortedPins]);

    const indexOfLastPin = currentPage * pinsPerPage;
    const indexOfFirstPin = indexOfLastPin - pinsPerPage;
    const currentPins = sortedPins.slice(indexOfFirstPin, indexOfLastPin);

    // Loading skeletons arrays
    const mostLikedSkeletons = Array(3).fill(null);
    const latestSkeletons = Array(6).fill(null);

    return (
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="pt-20 pb-40 mb-60 relative">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 text-sm bg-blue-100 text-blue-500 rounded-full">
                            Share Your Work
                        </span>
                    </div>
                    <h1 className="text-[80px] md:text-[120px] font-bold leading-none tracking-tighter mb-6 bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        UPLOAD
                    </h1>
                    <div className="max-w-2xl mx-auto mb-8">
                        <p className="text-xl text-gray-600">
                            Share your creative work with our community.
                            Get inspired and inspire others through your designs.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-4">
                            <Button
                                onPress={() => router.push("/post-builder")}
                                color="primary"
                                variant="shadow"
                                size="lg"
                                endContent={<ArrowUpRight className="w-5 h-5" />}
                                startContent={<Upload className="w-5 h-5" />}
                                className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
                            >
                                Start Upload
                            </Button>
                            <Button
                                onPress={() => router.push("/post")}
                                variant='bordered'
                                size="lg"
                                radius='full'
                            >
                                See More Work
                            </Button>
                        </div>
                        <button
                            onClick={scrollToMostLiked}
                            className="flex flex-col mt-10 items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-300 group animate-bounce"
                            disabled={isLoading}
                        >
                            <span className="text-sm">Scroll to explore</span>
                            <ChevronDown className="w-6 h-6 group-hover:transform group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Most Liked Section */}
            <section ref={mostLikedSectionRef} className="mb-16 scroll-mt-8 -mt-20">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-4 text-sm mb-2">
                        <span>Post of the Day</span>
                        <span className="px-2 py-1 bg-gray-200 rounded">Hall of frame</span>
                        <span className="px-2 py-1 bg-gray-200 rounded">UX</span>
                    </div>
                    <h2 className="text-[80px] font-bold leading-tight tracking-tight uppercase text-center">
                        Most Liked Posts
                    </h2>
                    <p className="text-xl text-gray-600 my-4">
                        Share your creative work
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        mostLikedSkeletons.map((_, index) => (
                            <LoadingSkeleton key={`skeleton-${index}`} />
                        ))
                    ) : (
                        mostLikedPins.map((pin) => (
                            <PinItem key={pin.id} pin={pin} />
                        ))
                    )}
                </div>

                <div className="p-4 flex justify-center items-center my-10">
                    <div className="flex items-center gap-2 text-lg">
                        <span className="text-gray-600">Check out all posts</span>
                        <span className="mx-2">→</span>
                        <button
                            onClick={() => router.push("/post")}
                            className="text-gray-900 font-medium border-b-2 border-gray-900 hover:opacity-80 transition-opacity"
                        >
                            View Posts
                        </button>
                    </div>
                </div>
            </section>

            {/* Latest Posts Section */}
            <section>
                <h2
                    className="text-[40px] font-bold leading-tight tracking-tight my-10 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => router.push("/post")}
                >
                    Latest Posts.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        latestSkeletons.map((_, index) => (
                            <LoadingSkeleton key={`skeleton-latest-${index}`} />
                        ))
                    ) : (
                        currentPins.map((pin) => (
                            <PinItem key={pin.id} pin={pin} />
                        ))
                    )}
                </div>
            </section>
            <div className="flex flex-col items-center my-20">
                <div className="flex flex-col items-center my-20">
                    <h2 className="text-[80px] font-bold leading-tight tracking-tight uppercase text-center">
                        Top Contributors
                    </h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Our most active community members
                    </p>
                    <Profilecard listOfPins={listOfPins} />
                </div>               
            </div>
        </div>
    );
};

export default PinList;