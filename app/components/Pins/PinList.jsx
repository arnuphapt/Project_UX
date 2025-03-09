import React, { useState, useMemo, useRef } from 'react';
import { Button, Skeleton } from "@heroui/react";
import { Upload, ArrowUpRight, ChevronDown, Award } from 'lucide-react';
import PinItem from './PinItem';
import { useRouter } from 'next/navigation';
import TopLike from '../TopLike';
import { useSession,signIn } from "next-auth/react";

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
    const { data: session } = useSession();

    const scrollToMostLiked = () => {
        mostLikedSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const onCreateClick = () => {
        if (session) {
          router.push('/post-builder');
        } else {
          signIn();
        }
      };
      
    // Sort all pins by likes count
    const sortedPinsByLikes = useMemo(() => {
        const allPins = [...listOfPins];
        return allPins.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    }, [listOfPins]);

    // Sort all pins by views count
    const sortedPinsByViews = useMemo(() => {
        const allPins = [...listOfPins];
        return allPins.sort((a, b) => (b.views || 0) - (a.views || 0));
    }, [listOfPins]);

    // Top 3 most liked pins for the top section
    const topThreePins = useMemo(() => {
        return sortedPinsByLikes.slice(0, 3);
    }, [sortedPinsByLikes]);


    // Get next set of most liked pins for trending section
    const nextMostLikedPins = useMemo(() => {
        const startIndex = (currentPage - 1) * pinsPerPage;
        return sortedPinsByLikes.slice(startIndex + 3, startIndex + pinsPerPage + 3);
    }, [sortedPinsByLikes, currentPage]);

    const sectionSkeletons = Array(6).fill(null);

    return (
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="pt-16 sm:pt-20 pb-24 sm:pb-32 lg:pb-40 mb-32 sm:mb-40 lg:mb-60 relative">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-block mb-4">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-100 text-blue-500 rounded-full">
                            Share Your Work
                        </span>
                    </div>
                    <h1 className="uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        User Expepience
                    </h1>
                    <h1 className="p-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tighter mb-4 sm:mb-6 bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        Community Share
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
                                onPress={onCreateClick}
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
                </div >
            </section>
            {/* Most Popular Members Section */}
            <div ref={mostLikedSectionRef}   className="flex flex-col items-center mt-32 ">
                <TopLike listOfPins={listOfPins} />
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
            </div>



            {/* Trending Posts Section */}
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




        </div>

        );
    };

    export default PinList;