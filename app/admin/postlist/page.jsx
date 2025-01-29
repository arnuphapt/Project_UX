"use client";
import React from "react";
import Sidebar from "../../components/admincomponent/Sidebar";
import PostList from "../../components/admincomponent/PostList";
export default function App() {

    return (
      <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 sm:pl-64"> {/* Sidebar width on desktop */}
        <main className="p-4 pt-16 sm:pt-4"> {/* Added top padding for mobile menu button */}
          <PostList />
        </main>
      </div>
    </div>
    );
}
