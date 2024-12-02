"use client";
import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Createpost from "../../components/admin/Createpost";
export default function App() {

    return (
        <div>
           <Sidebar/>
           <div className="flex w-full justify-center ">
           <Createpost/>
           </div>
        </div>
    );
}
