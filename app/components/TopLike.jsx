import React, { useMemo } from 'react';
import { Card, CardBody, Avatar, Button, Tooltip } from "@nextui-org/react";
import { Crown, Trophy, Medal, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TopLikers = ({ listOfPins }) => {
  const router = useRouter();

  const topUsers = useMemo(() => {
    const userLikeCounts = listOfPins.reduce((acc, pin) => {
      if (!acc[pin.userName]) {
        acc[pin.userName] = {
          userName: pin.userName,
          email: pin.email,
          likeCount: pin.likes?.length || 0,  // Sum of likes for first post
          userImage: pin.userImage || '/api/placeholder/40/40'
        };
      } else {
        // Add likes from each post
        acc[pin.userName].likeCount += (pin.likes?.length || 0);
      }
      return acc;
    }, {});

    return Object.values(userLikeCounts)
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 10);
  }, [listOfPins]);



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
    { icon: Medal, color: "text-yellow-400" },

  ];

  

  return (
    <div className="flex flex-col items-center">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-9xl mx-auto mb-20 cursor-pointer">
      {topUsers.slice(0, 10).map((user, index) => {
        const BadgeIcon = badges[index].icon;
        return (
          <div key={user.userName}   onClick={() => router.push("/users/" + user.email)} className="group relative p-1 rounded-xl bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 transition-all duration-500 animate-gradient-xy">
            <Card className="w-full h-full bg-white">
              <CardBody className="flex flex-col items-center p-6">
                <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Avatar
                    src={user.userImage}
                    className="w-20 h-20"
                    alt={user.userName}
                  />
                  <BadgeIcon 
                    className={`absolute -top-2 -right-2 w-8 h-8 ${badges[index].color} group-hover:rotate-12 transition-transform duration-300`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 truncate max-w-full px-2">
                    {user.userName}
                  </h3>
                <p className="text-gray-600">
                  <span className="font-bold text-2xl text-blue-600 group-hover:scale-110 inline-block transition-transform duration-300">
                    {user.likeCount}
                  </span>
                  <span className="ml-2">likes</span>
                </p>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>    </div>
  );
};

export default TopLikers;