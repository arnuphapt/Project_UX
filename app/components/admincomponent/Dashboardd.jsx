"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../Shared/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Card,
  CardBody,
  Chip,
  Skeleton
} from "@heroui/react";
import { Users, FileText, BookOpen, Filter, Mail } from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    guests: 0,
    totalPosts: 0,
    sectionStats: {},
    adminPosts: 0,
    totalFilters: 0,
    activeAdmins: 0,
    inactiveAdmins: 0,
    adminRoles: {
      admin: 0,
      ta: 0
    }
  });
  const extractSectionNumber = (section) => {
    const regex = /\d+/;
    const matches = regex.exec(section);
    return matches ? parseInt(matches[0]) : 0;
  };
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

      // 4. Fetch Filter Stats
      const filterSnapshot = await getDocs(collection(db, "filterdata"));

      // 5. Fetch Admin Email Stats
      const adminEmailsSnapshot = await getDocs(collection(db, "adminEmails"));
      const adminEmails = adminEmailsSnapshot.docs.map(doc => doc.data());
      
      const activeAdmins = adminEmails.filter(admin => admin.status === 'active').length;
      const inactiveAdmins = adminEmails.filter(admin => admin.status === 'inactive').length;
      const adminRoles = adminEmails.reduce((acc, admin) => {
        acc[admin.role] = (acc[admin.role] || 0) + 1;
        return acc;
      }, { admin: 0, ta: 0 });

      setStats({
        totalUsers,
        students,
        guests: totalUsers - students,
        totalPosts: posts.length,
        sectionStats: sectionCounts,
        adminPosts: adminPostsSnapshot.size,
        totalFilters: filterSnapshot.size,
        activeAdmins,
        inactiveAdmins,
        adminRoles
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const CardSkeleton = () => (
    <Card>
      <CardBody className="p-6">
        <div className="space-y-3">
          <Skeleton className="w-24 h-4 rounded-lg"/>
          <Skeleton className="w-32 h-8 rounded-lg"/>
          <div className="space-y-2">
            <Skeleton className="w-40 h-6 rounded-lg"/>
            <Skeleton className="w-40 h-6 rounded-lg"/>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  const sortSections = (sections) => {
    return Object.entries(sections).sort((a, b) => {
      const numA = extractSectionNumber(a[0]);
      const numB = extractSectionNumber(b[0]);
      return numA - numB;
    });
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        {isLoading ? <CardSkeleton /> : (
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
        )}

        {/* Posts Card */}
        {isLoading ? <CardSkeleton /> : (
          <Card className="bg-gray-800">
            <CardBody className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div>
                    <p className="text-white text-sm">Total Posts</p>
                    <h3 className="text-white text-3xl font-bold">{stats.totalPosts}</h3>
                  </div>
                  <div className="space-y-1">
                    {sortSections(stats.sectionStats).map(([section, count]) => (
                      <div key={section} className="flex items-center gap-2">
                        <Chip size="sm" className="bg-white/20 text-white">Section {section}</Chip>
                        <span className="text-white">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <FileText className="text-white w-8 h-8" />
              </div>
            </CardBody>
          </Card>
        )}

        {/* Admin Posts Card */}
        {isLoading ? <CardSkeleton /> : (
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
        )}

        {/* Filters Card */}
        {isLoading ? <CardSkeleton /> : (
          <Card className="bg-purple-500">
            <CardBody className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div>
                    <p className="text-white text-sm">Total Filters</p>
                    <h3 className="text-white text-3xl font-bold">{stats.totalFilters}</h3>
                  </div>
                  <p className="text-white/80 text-sm">
                    Active data filters
                  </p>
                </div>
                <Filter className="text-white w-8 h-8" />
              </div>
            </CardBody>
          </Card>
        )}

        {/* Admin Users Card */}
        {isLoading ? <CardSkeleton /> : (
          <Card className="bg-orange-500">
            <CardBody className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div>
                    <p className="text-white text-sm">Admin Users</p>
                    <h3 className="text-white text-3xl font-bold">
                      {stats.activeAdmins + stats.inactiveAdmins}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Chip size="sm" className="bg-white/20 text-white">Active</Chip>
                      <span className="text-white">{stats.activeAdmins}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" className="bg-white/20 text-white">Inactive</Chip>
                      <span className="text-white">{stats.inactiveAdmins}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Chip size="sm" className="bg-white/20 text-white">Admins</Chip>
                      <span className="text-white">{stats.adminRoles.admin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" className="bg-white/20 text-white">TAs</Chip>
                      <span className="text-white">{stats.adminRoles.ta}</span>
                    </div>
                  </div>
                </div>
                <Mail className="text-white w-8 h-8" />
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;