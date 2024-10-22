"use client"
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 z-10">
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard">
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link href="/user">
              <p>User</p>
            </Link>
          </li>
          <li>
            <Link href="/post">
              <p>Post</p>
            </Link>
          </li>
          <li>
            <Link href="/create-post">
              <p>Create Post</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
