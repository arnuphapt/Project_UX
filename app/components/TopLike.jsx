import React, { useMemo, useState,useEffect } from 'react';
import { Card, CardBody, Avatar, Button } from "@heroui/react";
import { Crown, Trophy, Medal, Award, Eye, Heart, BarChart2, Sparkles, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { app } from '../Shared/firebaseConfig';

const LoadingSkeleton = () => (
  <div className="p-1 rounded-xl bg-gradient-to-tr from-gray-200 to-gray-100">
    <Card className="w-full h-full bg-white">
      <CardBody className="flex flex-col items-center p-6">
        <div className="animate-pulse">
          <div className="rounded-full bg-gray-200 w-20 h-20 mb-4" />
          <div className="h-6 w-32 bg-gray-200 rounded-lg mb-4" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between px-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
);

const TopLikers = ({ listOfPins, isLoading = false }) => {
  const router = useRouter();

  const badges = [
    { icon: Crown, color: "text-yellow-500" },
    { icon: Trophy, color: "text-gray-400" },
    { icon: Medal, color: "text-amber-600" },
    { icon: Award, color: "text-blue-400" },
    { icon: Award, color: "text-blue-400" },
    { icon: Award, color: "text-blue-400" },
    { icon: Award, color: "text-blue-400" },
    { icon: Award, color: "text-blue-400" },
    { icon: Award, color: "text-blue-400" },
    { icon: Award, color: "text-blue-400" },
  ];

  const getRankStyles = (index) => {
    if (index === 0) return {
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      bg: 'bg-yellow-50',
      ring: 'ring-yellow-400'
    };
    if (index === 1) return {
      border: 'border-gray-400',
      text: 'text-gray-400',
      bg: 'bg-gray-50',
      ring: 'ring-gray-400'
    };
    if (index === 2) return {
      border: 'border-amber-600',
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      ring: 'ring-amber-600'
    };
    return {
      border: 'border-blue-400',
      text: 'text-blue-400',
      bg: 'bg-blue-50',
      ring: 'ring-blue-400'
    };
  };

  const topUsers = useMemo(() => {
    // Calculate max values for normalization
    const maxLikes = Math.max(...listOfPins.map(pin => pin.likes?.length || 0));
    const maxViews = Math.max(...listOfPins.map(pin => pin.viewCount || 0));

    const userStats = listOfPins.reduce((acc, pin) => {
      if (!acc[pin.userName]) {
        // Initialize user stats
        const likes = pin.likes?.length || 0;
        const views = pin.viewCount || 0;

        // Calculate normalized scores (0-1 range)
        const normalizedLikes = maxLikes > 0 ? likes / maxLikes : 0;
        const normalizedViews = maxViews > 0 ? views / maxViews : 0;

        // Combined score (70% likes, 30% views)
        const score = (normalizedLikes * 0.8) + (normalizedViews * 0.2);

        acc[pin.userName] = {
          userName: pin.userName,
          email: pin.email,
          section: pin.section,
          likeCount: likes,
          viewCount: views,
          score: score,
          userImage: pin.userImage || '/api/placeholder/100/100',
          engagementRate: (likes / (views || 1)) * 100,
          postsInteracted: 1,
          averageLikesPerPost: likes
        };
      } else {
        // Update existing user stats
        const newLikes = acc[pin.userName].likeCount + (pin.likes?.length || 0);
        const newViews = acc[pin.userName].viewCount + (pin.viewCount || 0);
        acc[pin.userName].postsInteracted += 1;

        // Recalculate normalized scores
        const normalizedLikes = maxLikes > 0 ? newLikes / maxLikes : 0;
        const normalizedViews = maxViews > 0 ? newViews / maxViews : 0;

        // Update combined score
        const newScore = (normalizedLikes * 0.8) + (normalizedViews * 0.2);

        acc[pin.userName].likeCount = newLikes;
        acc[pin.userName].viewCount = newViews;
        acc[pin.userName].score = newScore;
        acc[pin.userName].engagementRate = (newLikes / (newViews || 1)) * 100;
        acc[pin.userName].averageLikesPerPost = newLikes / acc[pin.userName].postsInteracted;
      }
      return acc;
    }, {});

    return Object.values(userStats)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [listOfPins]);

  const renderStatistic = (icon, value, label, colorClass) => (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1">
        {icon}
        <p className={`font-semibold text-xl ${colorClass}`}>
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value.toLocaleString()}
        </p>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-16">
          <div className="h-16 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(10)].map((_, index) => (
            <LoadingSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }
  const [selectedCategory, setSelectedCategory] = useState('posts');

  const categories = [
    { id: 'posts', label: 'Best Posts', icon: Trophy },
    { id: 'members', label: 'Top Members', icon: Crown }
  ];
  const topPosts = useMemo(() => {
    return [...listOfPins]
      .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
      .slice(0, 3)
      .map(post => ({
        ...post,
        engagementRate: ((post.likes?.length || 0) / (post.viewCount || 1)) * 100
      }));
  }, [listOfPins]);
  const TopPost = ({ post, index }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState(post?.likes || []);
    const { data: session } = useSession();
    const db = getFirestore(app);
  
    useEffect(() => {
      const postRef = doc(db, 'pinterest-post', post.id);
      const unsubscribePost = onSnapshot(postRef, (doc) => {
        const data = doc.data();
        setLikes(data?.likes || []);
        setHasLiked(data?.likes?.includes(session?.user?.email) || false);
      });
  
      return () => {
        unsubscribePost();
      };
    }, [db, post.id, session?.user?.email]);
  
    const handleLikeToggle = async (e) => {
      e.stopPropagation();
      if (!session?.user?.email) return;
  
      const postRef = doc(db, 'pinterest-post', post.id);
      const newLikes = hasLiked
        ? likes.filter(email => email !== session?.user?.email)
        : [...likes, session?.user?.email];
  
      try {
        await updateDoc(postRef, { likes: newLikes });
      } catch (error) {
        console.error("Error updating likes: ", error);
      }
    };
  
    const handlePinClick = () => {
      router.push("/post/" + post.userName + "/" + post.id);
    };
  
    const handleProfileClick = (e) => {
      e.stopPropagation();
      router.push("/users/" + post.email);
    };
  
    return (
      <div className="flex flex-col">
      <div 
        onClick={handlePinClick}
        className="group relative w-full bg-white overflow-hidden rounded-lg cursor-pointer shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
         {index === 0 && (
          <div className="absolute top-4 right-4 z-30">
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-semibold">Best Post</span>
            </div>
          </div>
        )}
        <div className="relative aspect-[3/2] overflow-hidden">
          <div className={`absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          <img
            src={post.image || '/api/placeholder/800/600'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className={`absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <span className="text-xs uppercase text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                 Section {post.section}
                </span>
                <h3 className="text-white text-lg font-bold">{post.title}</h3>
                <div className="flex items-center space-x-4 text-white/90 text-sm">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.viewCount || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{likes.length}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
                <button
                  onClick={handleLikeToggle}
                  className={`p-2 rounded-full ${hasLiked ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm hover:bg-white/40'} transition-colors`}
                >
                  <Heart className={`w-6 h-6 text-white ${hasLiked ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-3 gap-2">
        <h1 className="font-bold text-large">Created</h1>
        <span className="text-gray-500 dark:text-gray-400">by</span>
        <div className="flex items-center">
          <img
            src={post.userImage || '/api/placeholder/24/24'}
            alt={post.userName}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span 
            onClick={handleProfileClick} 
            className="font-medium hover:text-gray-900 dark:text-gray-200 dark:hover:text-white cursor-pointer"
          >
            {post.userName}
          </span>
        </div>
      </div>
    </div>
    );
  };
  return (
    <div className=" max-w-[1920px]">
      <div className="text-center mb-16">
        <div className="relative inline-block">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-2">
            <span>Top Rated Posts</span>
            <span className="px-2 py-1 bg-gray-200 rounded">Hall of Frame</span>
            <span className="px-2 py-1 bg-gray-200 rounded">All Time Popular</span>
          </div>
          <span className="absolute top-4 -right-8">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent uppercase ">
            Hall of fame
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 my-3 sm:my-4">
                        Our most loved creations
                    </p>

        </div>
        <div className="flex justify-center gap-4 mb-14">
        {categories.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${selectedCategory === id
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            onPress={() => setSelectedCategory(id)}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Button>
        ))}
      </div>
      </div>

      <div className={`grid grid-cols-1 ${selectedCategory === 'members' ? 'md:grid-cols-5' : 'md:grid-cols-3'} gap-6`}>        {selectedCategory === 'members' ? (
          topUsers.map((user, index) => {
            const BadgeIcon = badges[index].icon;
            const rankStyles = getRankStyles(index);

            return (
              <div
                key={user.userName}
                onClick={() => router.push("/users/" + user.email)}
                className={`group transform transition-all duration-500 ${index === 0 ? 'md:-mt-8 scale-95' : ''}`}
              >
                <Card
                  className={`transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer
                    ${index === 0 ? 'bg-gradient-to-b from-yellow-50 to-white ring-2 ring-yellow-200' : ''}`}
                >
                  <CardBody className="p-6">
                    <div className="relative mb-4">
                      <div className={`absolute -top-2 -left-2 z-10 ${rankStyles.bg} rounded-full border-2 ${rankStyles.border} w-6 h-6 flex items-center justify-center shadow-sm`}>
                        <span className={`text-sm font-semibold ${rankStyles.text}`}>
                          {index + 1}
                        </span>
                      </div>

                      <div className={`relative ${index === 0 ? 'mt-4' : ''}`}>
                        <Avatar
                          src={user.userImage}
                          className={`w-24 h-24 mx-auto transition-all duration-300 ring-4 ${rankStyles.ring}`}
                        />
                        <div className={`absolute -bottom-2 right-20 z-10 bg-white rounded-full p-1 border-2 ${rankStyles.border}`}>
                          <BadgeIcon
                            className={`w-5 h-5 ${badges[index].color} group-hover:rotate-12 transition-transform duration-300`}
                          />
                        </div>

                        {/* Winner's glow effect for top user */}
                        {index === 0 && (
                          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className={`text-xl font-bold mb-1 ${index === 0 ? 'text-yellow-800' : ''}`}>
                      {index === 0 && (
                          <span className="block text-sm font-normal text-yellow-600 mt-1">
                            Top 1 Creator 
                          </span>
                        )} 
                        {user.userName}

                      </h3>
                        <p className='text-sm font-semibold mb-2'>Section {user.section}</p>
                      <div className="grid grid-cols-3 gap-4 my-4">
                        {renderStatistic(
                          <Heart className={`w-4 h-4 ${index === 0 ? 'text-red-500' : 'text-red-400'}`} />,
                          user.likeCount,
                          'Total Likes',
                          `${index === 0 ? 'text-red-600' : 'text-red-500'}`
                        )}
                        {renderStatistic( 
                          <Eye className={`w-4 h-4 ${index === 0 ? 'text-blue-500' : 'text-blue-400'}`} />,
                          user.viewCount,
                          'Total Views',
                          `${index === 0 ? 'text-blue-600' : 'text-blue-500'}`
                        )}
                                                {renderStatistic(
                          <BarChart2 className={`w-4 h-4 ${index === 0 ? 'text-amber-500' : 'text-slate-500	'}`} />,
                          user.postsInteracted ,
                          'Total Posts',
                          `${index === 0 ? 'text-amber-500' : 'text-slate-500	'}`
                        )}
                      </div>



                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })
        ) :  (topPosts.map((post, index) => (
          <TopPost key={post.id} post={post} index={index} />
        ))
        )}
      </div>
    </div>

  );
};

export default TopLikers;