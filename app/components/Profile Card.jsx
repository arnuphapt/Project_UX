import React, { useMemo } from 'react';
import { Card, CardBody, Avatar, Button, Tooltip } from "@nextui-org/react";
import { Crown, Medal, Trophy, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TopPosters = ({ listOfPins }) => {
  const router = useRouter();

  const topUsers = useMemo(() => {
    // Count posts per user
    const userPostCounts = listOfPins.reduce((acc, pin) => {
      if (!acc[pin.userName]) {
        acc[pin.userName] = {
          userName: pin.userName,
          email: pin.email,
          postCount: 1,
          userImage: pin.userImage || '/api/placeholder/40/40'
        };
      } else {
        acc[pin.userName].postCount += 1;
      }
      return acc;
    }, {});

    // Convert to array and sort by post count
    return Object.values(userPostCounts)
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 10); // Get top 12 users for the circle
  }, [listOfPins]);

  const generateCirclePosition = (index, total, radius = 120) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const badges = [
    { icon: Crown, color: "text-yellow-500" },
    { icon: Trophy, color: "text-gray-400" },
    { icon: Medal, color: "text-amber-600" }
  ];

  // Display top 3 users in cards
  const topThreeSection = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
      {topUsers.slice(0, 3).map((user, index) => {
        const BadgeIcon = badges[index].icon;
        return (
          <Card 
            key={user.userName}
            className="border border-gray-200 hover:border-blue-500 transition-colors duration-300"
          >
            <CardBody className="flex flex-col items-center p-6">
              <div className="relative mb-4">
                <Avatar
                  src={user.userImage}
                  className="w-20 h-20"
                  alt={user.userName}
                />
                <BadgeIcon 
                  className={`absolute -top-2 -right-2 w-8 h-8 ${badges[index].color}`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{user.userName}</h3>
              <p className="text-gray-600">
                <span className="font-bold text-2xl text-blue-600">{user.postCount}</span>
                <span className="ml-2">posts</span>
              </p>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );

  // Circular menu section
  const circularMenuSection = (
    <div className="relative flex items-center justify-center mt-10">
      <div className="relative items-center justify-center w-80 h-80">
        {/* Center plus button */}
        <Button
          isIconOnly
          radius="full"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-500"
          onPress={() =>  router.push("/post-builder")}
          >
          <Plus size={50} className="text-white" />
        </Button>

        {/* Circle items */}
        {topUsers.map((user, index) => {
          const position = generateCirclePosition(index, topUsers.length);
          return (
            <div
              key={user.userName}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
              }}
              onClick={() => router.push("/users/" + user.email)}

            >
              <Tooltip 
                content={`${user.userName}: ${user.postCount} posts`}
                placement="bottom"
                delay={0}
                closeDelay={0}
              >
                <Avatar
                  isBordered
                  size="md"
                  src={user.userImage}
                  name={user.userName}
                  className="w-12 h-12 text-white border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform duration-200"
                  
                />
              </Tooltip>
            </div>
          );
        })}
      </div>

    </div>
    
  );

  return (
    <div className="flex flex-col items-center">
      {topThreeSection}
      {circularMenuSection}

    </div>

  );
};

export default TopPosters;