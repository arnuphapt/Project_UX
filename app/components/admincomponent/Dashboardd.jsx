"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../Shared/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Card,
  CardBody,
  Spinner,
  Chip
} from "@nextui-org/react";
import { Users, FileText, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    guests: 0,
    totalPosts: 0,
    sectionStats: {},
    adminPosts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // 1. Fetch User Stats
      const userSnapshot = await getDocs(collection(db, "user"));
      const studentSnapshot = await getDocs(collection(db, "student-info"));
      
      const totalUsers = userSnapshot.size;
      const students = studentSnapshot.size;

      // 2. Fetch Posts Stats
      const postsSnapshot = await getDocs(collection(db, "pinterest-post"));
      const posts = postsSnapshot.docs;

      // Calculate section stats
      const sectionCounts = {};
      posts.forEach(post => {
        const section = post.data().section;
        if (section) {
          sectionCounts[section] = (sectionCounts[section] || 0) + 1;
        }
      });

      // 3. Fetch Admin Posts
      const adminPostsSnapshot = await getDocs(collection(db, "admin-posts"));

      setStats({
        totalUsers,
        students,
        guests: totalUsers - students,
        totalPosts: posts.length,
        sectionStats: sectionCounts,
        adminPosts: adminPostsSnapshot.size
      });

    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            {/* Filter Cards Grid with Loading State */}
            {isLoading ? (
              <div className="min-h-[200px] flex justify-center items-center">
                <Spinner
                  size="lg"
                  color="primary"
                  label="Loading..."
                />
              </div>
            ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <Card className="bg-blue-500">
          <CardBody className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div>
                  <p className="text-white text-sm">Total Users</p>
                  <h3 className="text-white text-3xl font-bold">{stats.totalUsers}</h3>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Chip size="sm" className="bg-white/20 text-white">Students</Chip>
                    <span className="text-white">{stats.students}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip size="sm" className="bg-white/20 text-white">Guests</Chip>
                    <span className="text-white">{stats.guests}</span>
                  </div>
                </div>
              </div>
              <Users className="text-white w-8 h-8" />
            </div>
          </CardBody>
        </Card>

        {/* Posts Card */}
        <Card className="bg-gray-800">
          <CardBody className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div>
                  <p className="text-white text-sm">Total Posts</p>
                  <h3 className="text-white text-3xl font-bold">{stats.totalPosts}</h3>
                </div>
                <div className="space-y-1">
                  {Object.entries(stats.sectionStats)
                    .sort(([secA], [secB]) => {
                      const numA = parseInt(secA.match(/\d+/)[0]);
                      const numB = parseInt(secB.match(/\d+/)[0]);
                      return numA - numB;
                    })
                    .map(([section, count]) => (
                      <div key={section} className="flex items-center gap-2">
                        <Chip size="sm" className="bg-white/20 text-white">Section {section}</Chip>
                        <span className="text-white">{count}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
              <FileText className="text-white w-8 h-8" />
            </div>
          </CardBody>
        </Card>

        {/* Admin Posts Card */}
        <Card className="bg-green-500">
          <CardBody className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div>
                  <p className="text-white text-sm">Admin Posts</p>
                  <h3 className="text-white text-3xl font-bold">{stats.adminPosts}</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Official announcements and updates
                </p>
              </div>
              <BookOpen className="text-white w-8 h-8" />
            </div>
          </CardBody>
        </Card>
      </div>
            )}

    </div>
  );
};

export default Dashboard;