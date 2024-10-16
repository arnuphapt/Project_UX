"use client";
import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import UserList from "../../components/admin/UserList";
export default function App() {

    return (
        <div>
           <Sidebar/>
           <div className="ml-60 ">
           <UserList/>
           </div>
        </div>
    );
}
