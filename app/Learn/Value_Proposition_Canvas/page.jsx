"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Learn() {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  return (
<div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 h-auto p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-6 ml-3">บทเรียน</h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/Learn/Introduction_to_course"
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
              1. บทนำ (Introduction)
            </Link>
          </li>
         
          <li>
            <Link
              href="/Learn/Business_Model_Canvas"
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
              2. Business Model Canvas
            </Link>
          </li>
          <li>
            <button
              onClick={() => toggleSubmenu("ValuePropositionCanvas")}
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              3. Value Proposition Canvas
            </button>
            {activeMenu === "ValuePropositionCanvas" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    1. Customer Journey Maps in User Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/VPC"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    2. Value Proposition Canvas
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/Learn/WireFrame&Graphics"
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
              4. Wireframe & Graphics
            </Link>
          </li>
          <button
              onClick={() => toggleSubmenu("Graphics_Design")}
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              5. Principles of Graphics Design
            </button>
            {activeMenu === "Graphics_Design" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Layout_and_Composition"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    1. Layout And Composition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Psychology_Of_Color"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    2. The Psychology Of Color In Marketing And Branding
                  </Link>
                </li>
		<li>
                  <Link
                    href="/Learn/Graphics_Design/Color_Theory"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    3. Color Theory
                  </Link>
                </li>

              </ul>
            )}
         
          {/* Other main menu items */}
          <li>
            <Link
              href="/Learn/7_Principles"
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
             6. Seven Principles
            </Link>
          </li>
          
          <li>
            <Link
              href="/Learn/8_GoldenRules"
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
             7. Eight Golden Rules
            </Link>
          </li>

          <li>
            <button
              onClick={() => toggleSubmenu("Evaluation")}
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              8. Evaluation
            </button>
            {activeMenu === "Evaluation" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Evaluation/A_B_testing"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   1. A/B Testing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Evaluation/Heuristic_Evaluation"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   2. Heuristic Evaluation
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              href="/Learn/Universal_Design"
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
             9. Universal Design -The Principles-
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-18">
        <div className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
          <h1 className="text-2xl font-bold mb-4">
            Lecture 3 UX Strategy : Value Proposition Canvas
          </h1>
          <img
            src="/VPC.png"
            alt="VPC"
            className="h-auto w-full max-w-3xl mx-auto p-7 mt-10 mb-10"
          />
          <p className="text-gray-700 mb-8">
            แบ่งเป็น 2 หัวข้อ ได้แก่ 1. Customer Journey Maps in User
            Experience และ 2. Value Proposition Canvas{" "}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Value_Proposition_Canvas/Customer_Journey_Maps_in_UX">
            <img src="/CJM.png" alt="Customer Journey Maps" className="w-full  mb-4 cursor-pointer" />
        </Link>
         <h3 className="text-lg font-semibold mb-2 mt-9">1. Customer Journey Maps in User Experience</h3>
        <p className="text-gray-600 mb-4">เครื่องมือที่ใช้แสดงให้เห็นถึงกระบวนการที่ผู้ใช้หรือลูกค้าต้องผ่านเมื่อมีปฏิสัมพันธ์กับผลิตภัณฑ์หรือบริการ</p>
        <Link href="Value_Proposition_Canvas/Customer_Journey_Maps_in_UX">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Value_Proposition_Canvas/VPC">
            <img src="/VPC.png" alt="vpc" className="w-full h-auto mb-4 cursor-pointer" />
        </Link>
        <h3 className="text-lg font-semibold mt-9 mb-2">2. Value Proposition Canvas</h3>
        <p className="text-gray-600 mt-8 mb-9"> เป็นเครื่องมือที่ช่วยวิเคราะห์และพัฒนาความสัมพันธ์ระหว่างสินค้า/บริการของธุรกิจ  และความต้องการของลูกค้า </p>
        <Link href="Value_Proposition_Canvas/VPC">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
        </div>

      </div>
      </div>
      <div className="flex justify-center mt-10">
      <ul className="flex space-x-2">
    
      <li>
      <Link href="/Learn/Business_Model_Canvas" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ก่อนหน้า 
      </Link>
    </li>
    <li>
      <Link href="/Learn/Introduction_to_course" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        1 
      </Link>
    </li>
    <li>
      <Link href="/Learn/Business_Model_Canvas" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        2
      </Link>
    </li>
    <li>
      <Link href="/Learn/Value_Proposition_Canvas" className="bg-blue-500 text-white px-3 py-1 rounded">
        3
      </Link>
    </li>
    <li>
      <Link href="/Learn/WireFrame&Graphics" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        4
      </Link>
    </li>
    <li>
      <Link href="/Learn/Graphics_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        5
      </Link>
    </li>
    <li>
      <Link href="/Learn/7_Principles" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        6
      </Link>
    </li>
    <li>
      <Link href="/Learn/8_GoldenRules" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        7
      </Link>
    </li>
    <li>
      <Link href="/Learn/Evaluation" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        8
      </Link>
    </li>
    <li>
      <Link href="/Learn/Universal_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        9
      </Link>
    </li>

    <li>
      <Link href="/Learn/WireFrame&Graphics" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>
</div>
      
    </div>
    
  );
}
