import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardBody, Avatar, Button } from "@nextui-org/react";
import { Crown, Trophy, Star, Sparkles, Medal, TrendingUp, Eye, Heart, BarChart2 } from 'lucide-react';
import { getFirestore, collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { app } from '../Shared/firebaseConfig';

const HallOfFame = () => {
  const [selectedCategory, setSelectedCategory] = useState('members');
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    // Create a query to fetch posts ordered by timestamp
    const postsRef = collection(db, 'pinterest-post');
    const postsQuery = query(postsRef, orderBy('timestamp', 'desc'));

    // Set up real-time listener
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const fetchedPins = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPins(fetchedPins);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching pins:", error);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [db]);

  const topCreators = useMemo(() => {
    const creatorStats = pins.reduce((acc, pin) => {
      if (!acc[pin.userName]) {
        acc[pin.userName] = {
          userName: pin.userName,
          email: pin.email,
          totalLikes: pin.likes?.length || 0,
          totalViews: pin.viewCount || 0,
          totalPosts: 1,
          averageLikesPerPost: pin.likes?.length || 0,
          averageViewsPerPost: pin.viewCount || 0,
          engagementRate: ((pin.likes?.length || 0) / (pin.viewCount || 1)) * 100,
          userImage: pin.userImage || '/api/placeholder/100/100',
          topPost: {
            imageLink: pin.image,
            title: pin.title,
            likes: pin.likes?.length || 0,
            views: pin.viewCount || 0
          },
          topViewedPost: {
            imageLink: pin.image,
            title: pin.title,
            views: pin.viewCount || 0,
            likes: pin.likes?.length || 0
          }
        };
      } else {
        acc[pin.userName].totalLikes += (pin.likes?.length || 0);
        acc[pin.userName].totalViews += (pin.viewCount || 0);
        acc[pin.userName].totalPosts += 1;
        
        // Update averages
        acc[pin.userName].averageLikesPerPost = acc[pin.userName].totalLikes / acc[pin.userName].totalPosts;
        acc[pin.userName].averageViewsPerPost = acc[pin.userName].totalViews / acc[pin.userName].totalPosts;
        acc[pin.userName].engagementRate = (acc[pin.userName].totalLikes / acc[pin.userName].totalViews) * 100;
        
        // Update top viewed post
        if ((pin.viewCount || 0) > acc[pin.userName].topViewedPost.views) {
          acc[pin.userName].topViewedPost = {
            imageLink: pin.image,
            title: pin.title,
            views: pin.viewCount || 0,
            likes: pin.likes?.length || 0
          };
        }
        
        // Update top liked post
        if ((pin.likes?.length || 0) > acc[pin.userName].topPost.likes) {
          acc[pin.userName].topPost = {
            imageLink: pin.image,
            title: pin.title,
            likes: pin.likes?.length || 0,
            views: pin.viewCount || 0
          };
        }
      }
      return acc;
    }, {});

    return Object.values(creatorStats)
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, 3);
  }, [pins]);

  const topPosts = useMemo(() => {
    return [...pins]
      .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
      .slice(0, 6)
      .map(post => ({
        ...post,
        engagementRate: ((post.likes?.length || 0) / (post.viewCount || 1)) * 100
      }));
  }, [pins]);

  const categories = [
    { id: 'members', label: 'Top Members', icon: Crown },
    { id: 'posts', label: 'Best Posts', icon: Trophy }
  ];

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardBody>
                <div className="space-y-4">
                  <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse mx-auto"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Hall of Fame
        </h2>
        <div className="flex justify-center gap-4 mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                selectedCategory === id 
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {selectedCategory === 'members' ? (
          topCreators.map((creator, index) => (
            <div key={creator.email} className="group">
              <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
                <CardBody className="p-6">
                  <div className="relative mb-6">
                    <Avatar
                      src={creator.userImage}
                      className="w-24 h-24 mx-auto ring-4 ring-blue-500 group-hover:ring-cyan-500 transition-all duration-300"
                    />
                    {index === 0 && (
                      <Crown className="absolute -top-3 -right-3 w-10 h-10 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">{creator.userName}</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {renderStatistic(
                        <Heart className="w-4 h-4 text-red-400" />,
                        creator.totalLikes,
                        'Total Likes',
                        'text-red-500'
                      )}
                      {renderStatistic(
                        <Eye className="w-4 h-4 text-blue-400" />,
                        creator.totalViews,
                        'Total Views',
                        'text-blue-500'
                      )}
                      {renderStatistic(
                        <Medal className="w-4 h-4 text-purple-400" />,
                        creator.totalPosts,
                        'Posts',
                        'text-purple-500'
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {renderStatistic(
                        <BarChart2 className="w-4 h-4 text-green-400" />,
                        creator.averageLikesPerPost,
                        'Avg Likes/Post',
                        'text-green-500'
                      )}
                      {renderStatistic(
                        <Sparkles className="w-4 h-4 text-amber-400" />,
                        creator.engagementRate,
                        'Engagement %',
                        'text-amber-500'
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Most Viewed Post</p>
                          <div className="flex items-center justify-center gap-2">
                            <img 
                              src={creator.topViewedPost?.imageLink || '/api/placeholder/48/48'} 
                              alt="Top viewed post" 
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex flex-col items-start">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3 text-blue-400" />
                                <span className="text-sm font-medium">{creator.topViewedPost?.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3 text-red-400" />
                                <span className="text-sm font-medium">{creator.topViewedPost?.likes.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          topPosts.map((post, index) => (
            <div key={post.id} className="group">
              <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl overflow-hidden">
                <CardBody className="p-0">
                  <div className="relative">
                    <img
                      src={post.image || '/api/placeholder/400/300'}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-bold">{post.title}</p>
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={post.userImage || '/api/placeholder/32/32'}
                            className="w-6 h-6"
                          />
                          <span className="text-sm">{post.userName}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-black/40 rounded-full px-3 py-1 text-white">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span>{(post.likes?.length || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/40 rounded-full px-3 py-1 text-white">
                          <Eye className="w-4 h-4 text-blue-400" />
                          <span>{(post.viewCount || 0).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/40 rounded-full px-3 py-1 text-white">
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>{post.engagementRate.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HallOfFame;