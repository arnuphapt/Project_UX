import React, { useState, useMemo, useRef } from 'react';
import { Button,Skeleton} from "@nextui-org/react";
import { Upload, ArrowUpRight, ChevronDown,Github  } from 'lucide-react';
import PinItem from './PinItem';
import { useRouter } from 'next/navigation';
import TopLike from '../TopLike';
const LoadingSkeleton = () => (
    <div className="rounded-xl">
        <Skeleton className="rounded-xl">
            <div className="h-48 sm:h-64 md:h-72 lg:h-80"></div>
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

    // Sort all pins by likes count
    const sortedPinsByLikes = useMemo(() => {
        const allPins = [...listOfPins];
        return allPins.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    }, [listOfPins]);

    // Top 3 most liked pins for the top section
    const topThreePins = useMemo(() => {
        return sortedPinsByLikes.slice(0, 3);
    }, [sortedPinsByLikes]);

    // Get most liked pins per section/category (if you have categories)
    // For now, we'll just get the next set of most liked pins
    const nextMostLikedPins = useMemo(() => {
        const startIndex = (currentPage - 1) * pinsPerPage;
        return sortedPinsByLikes.slice(startIndex + 3, startIndex + pinsPerPage + 3);
    }, [sortedPinsByLikes, currentPage]);

    const mostLikedSkeletons = Array(3).fill(null);
    const sectionSkeletons = Array(6).fill(null);

    return (
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="pt-16 sm:pt-20 pb-24 sm:pb-32 lg:pb-40 mb-32 sm:mb-40 lg:mb-60 relative">
                {/* ... Hero section content remains the same ... */}
                <div className="flex flex-col items-center text-center">
                    <div className="inline-block mb-4">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-100 text-blue-500 rounded-full">
                            Share Your Work
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold leading-none tracking-tighter mb-4 sm:mb-6 bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        UPLOAD
                    </h1>
                    <div className="max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8">
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                            Share your creative work with our community.
                            Get inspired and inspire others through your designs.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-6 sm:gap-8">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Button
                                onPress={() => router.push("/post-builder")}
                                color="primary"
                                variant="shadow"
                                size="lg"
                                endContent={<ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                                startContent={<Upload className="w-4 h-4 sm:w-5 sm:h-5" />}
                                className="w-full sm:w-auto font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
                            >
                                Start Upload
                            </Button>
                            <Button
                                onPress={() => router.push("/post")}
                                variant="bordered"
                                size="lg"
                                radius="full"
                                className="w-full sm:w-auto"
                            >
                                See More Work
                            </Button>
                        </div>
                        <button
                            onClick={scrollToMostLiked}
                            className="flex flex-col mt-8 sm:mt-10 items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-300 group animate-bounce"
                            disabled={isLoading}
                        >
                            <span className="text-xs sm:text-sm">Scroll to explore</span>
                            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:transform group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Most Liked Section */}
            <section ref={mostLikedSectionRef} className="mb-12 sm:mb-16 scroll-mt-8 -mt-16 sm:-mt-20">
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-2">
                        <span>Top Rated Posts</span>
                        <span className="px-2 py-1 bg-gray-200 rounded">Hall of Frame</span>
                        <span className="px-2 py-1 bg-gray-200 rounded">Most Popular</span>
                    </div>
                    <h2 className="flex items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight uppercase text-center">
                        Most Liked Posts
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ml-4 text-blue-500 animate-pulse"
                        >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 my-3 sm:my-4">
                        Our most loved creations
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {isLoading ? (
                        mostLikedSkeletons.map((_, index) => (
                            <LoadingSkeleton key={`skeleton-${index}`} />
                        ))
                    ) : (
                        topThreePins.map((pin) => (
                            <PinItem key={pin.id} pin={pin} />
                        ))
                    )}
                </div>

                <div className="p-4 flex justify-center items-center my-8 sm:my-10">
                    <div className="flex items-center gap-2 text-base sm:text-lg">
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

            {/* Trending Posts Section (Previously Latest Posts) */}
            <section>
                <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight my-6 sm:my-10 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => router.push("/post")}
                >
                    Trending Posts

                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {isLoading ? (
                        sectionSkeletons.map((_, index) => (
                            <LoadingSkeleton key={`skeleton-trending-${index}`} />
                        ))
                    ) : (
                        nextMostLikedPins.map((pin) => (
                            <PinItem key={pin.id} pin={pin} />
                        ))
                    )}
                </div>
            </section>

            <div className="flex flex-col items-center mt-20">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight uppercase text-center">
                Most Popular Members
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-3 mb-6 sm:mb-8 lg:mb-10">
                    Our most active community members
                </p>
                <TopLike listOfPins={listOfPins} />
            </div>

      
      </div>

    );
};

export default PinList;