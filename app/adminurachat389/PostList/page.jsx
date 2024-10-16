"use client";
import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import PostList from "../../components/admin/PostList";
export default function App() {

    return (
        <div>
           <Sidebar/>
           <div className="ml-60 ">
           <PostList/>
           </div>
        </div>
    );
}
