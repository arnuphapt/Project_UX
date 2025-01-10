import React, { useMemo } from 'react';
import { Card, CardBody, Avatar, Button, Tooltip, Skeleton } from "@nextui-org/react";
import { Crown, Trophy, Medal, Plus, Eye, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoadingSkeleton = () => (
  <div className="p-1 rounded-xl bg-gradient-to-tr from-gray-200 to-gray-100">
    <Card className="w-full h-full bg-white">
      <CardBody className="flex flex-col items-center p-6">
        <Skeleton className="rounded-full w-20 h-20 mb-4" />
        <Skeleton className="h-6 w-32 rounded-lg mb-4" />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between px-2">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>
          <div className="flex items-center justify-between px-2">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>
        </div>
      </CardBody>
    </Card>
  </div>  
);

const TopLikers = ({ listOfPins, isLoading = false }) => {
  const router = useRouter();

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
        const score = (normalizedLikes * 0.7) + (normalizedViews * 0.3);

        acc[pin.userName] = {
          userName: pin.userName,
          email: pin.email,
          likeCount: likes,
          viewCount: views,
          score: score,
          userImage: pin.userImage || '/api/placeholder/40/40'
        };
      } else {
        // Update existing user stats
        const newLikes = acc[pin.userName].likeCount + (pin.likes?.length || 0);
        const newViews = acc[pin.userName].viewCount + (pin.viewCount || 0);
        
        // Recalculate normalized scores
        const normalizedLikes = maxLikes > 0 ? newLikes / maxLikes : 0;
        const normalizedViews = maxViews > 0 ? newViews / maxViews : 0;
        
        // Update combined score
        const newScore = (normalizedLikes * 0.7) + (normalizedViews * 0.3);

        acc[pin.userName].likeCount = newLikes;
        acc[pin.userName].viewCount = newViews;
        acc[pin.userName].score = newScore;
      }
      return acc;
    }, {});

    // Sort by combined score instead of just likes
    return Object.values(userStats)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [listOfPins]);

  const getRankStyles = (index) => {
    if (index === 0) return {
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      bg: 'bg-yellow-50'
    };
    if (index === 1) return {
      border: 'border-gray-400',
      text: 'text-gray-400',
      bg: 'bg-gray-50'
    };
    if (index === 2) return {
      border: 'border-amber-600',
      text: 'text-amber-600',
      bg: 'bg-amber-50'
    };
    return {
      border: 'border-blue-400',
      text: 'text-blue-400',
      bg: 'bg-blue-50'
    };
  };

  const badges = [
    { icon: Crown, color: "text-yellow-500" },
    { icon: Trophy, color: "text-gray-400" },
    { icon: Trophy, color: "text-amber-600" },
    { icon: Medal, color: "text-yellow-400" },
    { icon: Medal, color: "text-yellow-400" },
    { icon: Medal, color: "text-yellow-400" },
    { icon: Medal, color: "text-yellow-400" },
    { icon: Medal, color: "text-yellow-400" },
    { icon: Medal, color: "text-yellow-400" },
    { icon: Medal, color: "text-yellow-400" },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-9xl mx-auto mb-20">
          {[...Array(10)].map((_, index) => (
            <LoadingSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-9xl mx-auto mb-20 cursor-pointer">
        {topUsers.map((user, index) => {
          const BadgeIcon = badges[index].icon;
          const rankStyles = getRankStyles(index);
          
          return (
            <div 
              key={user.userName}
              onClick={() => router.push("/users/" + user.email)} 
              className="group relative p-1 rounded-xl bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 transition-all duration-500 animate-gradient-xy"
            >
              <Card className="w-full h-full bg-white">
                <CardBody className="flex flex-col items-center p-6">
                  <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className={`absolute -top-2 -left-2 z-10 ${rankStyles.bg} rounded-full border-2 ${rankStyles.border} w-6 h-6 flex items-center justify-center shadow-sm`}>
                      <span className={`text-sm font-semibold ${rankStyles.text}`}>
                        {index + 1}
                      </span>
                    </div>
                    <Avatar
                      src={user.userImage}
                      className="w-20 h-20"
                      alt={user.userName}
                    />
                    <div className={`absolute -bottom-2 -right-2 z-10 bg-white rounded-full p-1 border-2`}>
                      <BadgeIcon
                        className={`w-5 h-5 ${badges[index].color} group-hover:rotate-12 transition-transform duration-300`}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors duration-300 truncate max-w-full px-2">
                    {user.userName}
                  </h3>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">Likes</span>
                      </div>
                      <span className="font-bold text-blue-600">
                        {user.likeCount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Views</span>
                      </div>
                      <span className="font-bold text-gray-700">
                        {user.viewCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopLikers;