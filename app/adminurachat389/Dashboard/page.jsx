"use client";
import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import UserList from "../../components/admin/UserList";
import Dashboardd from "../../components/admin/Dashboardd";
export default function App() {

    return (
        <div>
           <Sidebar/>
           <div className="flex w-full justify-center ">
           <Dashboardd/>
           </div>
        </div>
    );
}
