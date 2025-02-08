import React, { useMemo } from 'react';
import { Avatar, Button, Tooltip, Card, CardHeader,CardBody } from "@heroui/react";
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TopLikers = ({ listOfPins }) => {
  const router = useRouter();

  const topUsers = useMemo(() => {
    const userLikeCounts = listOfPins.reduce((acc, pin) => {
      if (!acc[pin.userName]) {
        acc[pin.userName] = {
          userName: pin.userName,
          email: pin.email,
          likeCount: pin.likes?.length || 0,
          userImage: pin.userImage || '/api/placeholder/40/40'
        };
      } else {
        acc[pin.userName].likeCount += (pin.likes?.length || 0);
      }
      return acc;
    }, {});

    return Object.values(userLikeCounts)
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 10);
  }, [listOfPins]);

  const generateCirclePosition = (index, total, radius = 120) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="flex items-start justify-center  w-full gap-8 p-4">
      {/* Left side with circle animation */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center mt-10">        
          <div className="relative items-center justify-center w-80 h-80">
            {/* Breathing animation circles */}
            <style>{`
              @keyframes breathe {
                0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
                100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
              }
              .breathing-circle {
                animation: breathe 4s ease-in-out infinite;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background: rgba(59, 130, 246, 0.2);
              }
            `}</style>

            {/* Center plus button with breathing circles */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="breathing-circle w-36 h-36" style={{ animationDelay: '0s' }} />
              <div className="breathing-circle w-80 h-80" style={{ animationDelay: '1.3s' }} />
              <div className="breathing-circle w-96 h-96" style={{ animationDelay: '2.6s' }} />
              
              <Button
                isIconOnly
                radius="full"
                className="relative w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-500 z-10"
                onPress={() => router.push("/post-builder")}
              >
                <Plus size={40} className="text-white" />
              </Button>
            </div>

            {/* User avatars */}
            {topUsers.map((user, index) => {
              const position = generateCirclePosition(index, topUsers.length);
              return (
                <div
                  key={user.userName}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20"
                  style={{
                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  }}
                  onClick={() => router.push("/users/" + user.email)}
                >
                  <Tooltip
                    content={`${user.userName}: ${user.likeCount} likes`}
                    placement="bottom"
                    delay={0}
                    closeDelay={0}
                  >
                    <Avatar
                      isBordered
                      size="md"
                      src={user.userImage}
                      name={user.userName}
                      className="w-14 h-14 text-white border-2 border-blue-300/20 cursor-pointer hover:scale-110 transition-transform duration-200"
                    />
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      </div>
  );
};

export default TopLikers;