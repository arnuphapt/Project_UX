"use client";

import React, { useState } from "react";
import Link from "next/link";


export default function Learn() {
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (

<div className="flex">

      {/* Normal Sidebar */}
      <div className=" hidden 2xl:block fixed w-64 bg-white h-full  p-4 mt-10  ">
        
        <ul className="space-y-2">

        <Link href="/Learn">
        <h2 className="font-bold text-lg block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white">บทเรียน</h2>
        </Link>
          <li>
            <Link
              href="/Learn/Introduction_to_course"
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white  "
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
          onClick={() => {
           toggleSubmenu("ValuePropositionCanvas");
            window.location.href = "/Learn/Value_Proposition_Canvas"; // เปลี่ยนเส้นทาง
            }}
            className=" block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left  "
          >
    3. Value Proposition Canvas  <span className="ml-2">▼</span>
    
  </button>
            {activeMenu === "ValuePropositionCanvas" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 1. Customer Journey Maps in User Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/VPC"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. Value Proposition Canvas
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
              onClick={() =>{
                 toggleSubmenu("Graphics_Design");
              window.location.href = "/Learn/Graphics_Design";
              }}
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              5. Principles of Graphics Design <span className="ml-2">▼</span>
            </button>
            {activeMenu === "Graphics_Design" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Layout_and_Composition"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 1. Layout And Composition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Psychology_Of_Color"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. The Psychology Of Color In Marketing And Branding
                  </Link>
                </li>
		<li>
                  <Link
                    href="/Learn/Graphics_Design/Color_Theory"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 3. Color Theory
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
              onClick={() =>{

               toggleSubmenu("Evaluation");
               window.location.href = "/Learn/Evaluation";
              }}
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              8. Evaluation <span className="ml-2">▼</span>
            </button>
            {activeMenu === "Evaluation" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Evaluation/A_B_testing"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   <span className="ml-2">►</span> 1. A/B Testing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Evaluation/Heuristic_Evaluation"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   <span className="ml-2">►</span> 2. Heuristic Evaluation
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

        {/* Hamburger Dropdown for mobile */}
        <div className="2xl:hidden fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-md"
          onClick={toggleMobileMenu}
        >
         <img
          src="/study_icon.png" // เปลี่ยน path ให้ตรงกับตำแหน่งไฟล์ของคุณ
          alt="Menu"
          className="w-6 h-6" // ปรับขนาดของไอคอนตามที่ต้องการ
          />
        </button>
        {isMobileMenuOpen && (
          <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-screen bg-white shadow-md rounded-lg p-4">
            <ul className="space-y-4">
            <Link href="/Learn">
        <h2 className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white">บทเรียน</h2>
        </Link>
              <li>
                <Link
                  href="/Learn/Introduction_to_course"
                  className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white"
                  onClick={toggleMobileMenu}
                >
                  1. บทนำ (Introduction)
                </Link>
              </li>
              <li>
                <Link
                  href="/Learn/Business_Model_Canvas"
                  className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  onClick={toggleMobileMenu}
                >
                  2. Business Model Canvas
                </Link>
              </li>
              <li>
                <button
                 onClick={() =>{
                  toggleSubmenu("Value_Proposition_Canvas");
               window.location.href = "/Learn/Value_Proposition_Canvas";
               }}
                  className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
                >
                  3. Value Proposition Canvas <span className="ml-2">▼</span>
                </button>
                {activeMenu === "ValuePropositionCanvas" && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <span className="ml-2">►</span> 1. Customer Journey Maps in User Experience
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Learn/Value_Proposition_Canvas/VPC"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        <span className="ml-2">►</span> 2. Value Proposition Canvas
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
              onClick={() =>{
                 toggleSubmenu("Graphics_Design");
              window.location.href = "/Learn/Graphics_Design";
              }}
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              5. Principles of Graphics Design <span className="ml-2">▼</span>
            </button>
            {activeMenu === "Graphics_Design" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Layout_and_Composition"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 1. Layout And Composition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Psychology_Of_Color"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. The Psychology Of Color In Marketing And Branding
                  </Link>
                </li>
		<li>
                  <Link
                    href="/Learn/Graphics_Design/Color_Theory"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 3. Color Theory
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
              onClick={() =>{

               toggleSubmenu("Evaluation");
               window.location.href = "/Learn/Evaluation";
              }}
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              8. Evaluation <span className="ml-2">▼</span>
            </button>
            {activeMenu === "Evaluation" && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Evaluation/A_B_testing"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   <span className="ml-2">►</span> 1. A/B Testing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Evaluation/Heuristic_Evaluation"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   <span className="ml-2">►</span> 2. Heuristic Evaluation
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
        )}
      </div>




      
      {/* Main Content */}
      <div className="flex-1 p-6 ml-18">
        <div className="max-w-7xl mx-auto  bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
          <h1 className="text-2xl font-bold mb-4 m-6">Lecture1. Introduction to course</h1>
          <img
        src="/introlec1.png"
        alt="Introduction to course"
        className="h-auto w-full max-w-4xl mx-auto p-7 mt-10 mb-10"
      />

      <h2 className="ml-6 mb-8 mt-20 ">
        อย่างแรกเรามาทำความเข้าใจเบื้องต้นเกี่ยวกับบทนำ โดยการรับชมวิดิโอ User experience (Ux) Intro Course กันก่อนดีกว่า
      </h2>
      <iframe
        className="w-full max-w-2xl h-96 mt-10 mb-10 m-auto"
        src="https://www.youtube.com/embed/2QQQtiFwXjU"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h2 className="ml-6 mb-8 mt-20">
        หากอยากรู้จักอาชีพที่เกี่ยวกับ User experience (Ux) /User Interface (UI) สามารถเข้ารับชมเพิ่มเติมได้ที่
      </h2>
      <iframe
        className="w-full max-w-2xl h-96 mt-10 mb-10 m-auto"
        src="https://www.youtube.com/embed/AysUmUEbvsQ"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h2 className="text-xl font-bold mb-4 mt-20 ml-6">User Experience (Ux) คืออะไร ?</h2>
      <h2 className="text-l font-bold mb-4 ml-6">ประสบการณ์ผู้ใช้งาน</h2>
      <h2 className="text-l mb-4 ml-6">
        เนื่องจากมนุษย์ทุกคนต่างมีความรู้สึกที่ตอบสนองต่อการใช้งานบางอย่าง ไม่ว่าจะเป็นผลิตภัณฑ์หรือแพลตฟอร์มเว็บไซต์ต่าง ๆ ตัวอย่างเช่น โกรธ, สนุกสนาน, มีความสุข, เครียด,
        พึงพอใจ เป็นต้น ซึ่งความรู้สึกเหล่านี้มักเกิดขึ้นหลังจากการใช้งานบางอย่างเสมอ
      </h2>
      <h2 className="ml-6 mb-8 font-bold mt-20">
        ใน Lecture บทที่ 1 บทนำนี้ จะแบ่งออกเป็น 2 เรื่อง ได้แก่ 1. People in User experience (UX) และ 2. How to Create UX Personas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-8">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <Link
            href="https://www.canva.com/design/DAFBNodGkLQ/UxibHwguGv5ehVWgXv87MQ/view?utm_content=DAFBNodGkLQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <img
              src="https://i.ytimg.com/vi/9BdtGjoIN4E/maxresdefault.jpg"
              alt="People in ux"
              className="w-full h-auto mb-4 cursor-pointer"
            />
          </Link>
          <h3 className="text-lg font-semibold mb-2 mt-14">1. People in User experience (UX)</h3>
          <p className="text-gray-600 mb-4">
            ความเป็นมาของบุคคลที่ให้แนวคิดต่าง ๆ ในด้าน ประสบการณ์ผู้ใช้งาน
          </p>
          <Link
            href="https://www.canva.com/design/DAFBNodGkLQ/UxibHwguGv5ehVWgXv87MQ/view?utm_content=DAFBNodGkLQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <Link
            href="https://www.canva.com/design/DAFBNtufQJU/V8KHDO4imBfu8ntrVI2ZIg/view?utm_content=DAFBNtufQJU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <img
              src="https://cms.boardmix.com/images/articles/user-personas-02.png"
              alt="UX Personas"
              className="w-full h-auto mb-4 cursor-pointer"
            />
          </Link>
          <h3 className="text-lg font-semibold mb-2">2. How to Create UX Personas</h3>
          <p className="text-gray-600 mb-9">
            วิธีสร้างบุคลิกผู้ใช้งาน เพื่อช่วยให้ทีมออกแบบเข้าใจผู้ใช้งานมากขึ้นและสามารถพัฒนาโซลูชันที่ตอบโจทย์ผู้ใช้ได้ดีขึ้น
          </p>
          <Link
            href="https://www.canva.com/design/DAFBNtufQJU/V8KHDO4imBfu8ntrVI2ZIg/view?utm_content=DAFBNtufQJU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
      </div>

      <ul className="list-disc p-5 mt-20 mb-4">
        <span className="font-semibold text-black">สามารถศึกษาเพิ่มเติมได้ที่ :</span>
        <li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold">
          <a
            href="https://www.youtube.com/playlist?list=PLiwVA5qjDkicrRkWfrKcDiktwiizwTG7c"
            target="_blank"
          >
            People in UX (VDO Playlist - รวม 20 นาที)
          </a>
        </li>
        <li className="mb-2 ml-6 text-blue-500 font-semibold">
          <a
            href="https://www.youtube.com/playlist?list=PLiwVA5qjDkiddFIFN5chvhtFcLYAKsMlg"
            target="_blank"
          >
            Persona (Clip VDO - 2 clips รวม 12 นาที)
          </a>
        </li>
      </ul>
{/* Pagination Section */}
<div className="relative mt-10">
  <ul className="flex justify-between items-center relative">
    
    <li className="absolute right-0 bottom-0">
      <Link href="/Learn/Business_Model_Canvas" className="bg-gray-300 hover:bg-blue-500 hover:text-white px-3 py-1 rounded ">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>
        </div>
      </div>
    </div>
    
  );
}
