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
      <div className=" hidden lg:block fixed w-64 bg-white h-full  p-4 mt-10  ">
        <h2 className="text-xl font-bold mb-6 ml-3">บทเรียน</h2>
        <ul className="space-y-4">
          
          <li>
            <Link
              href="/Learn/Introduction_to_course"
              className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white  "
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
            className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
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
              
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              5. Principles of Graphics Design
            </button>
            
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

{/* Hamburger Dropdown for mobile */}
<div className="lg:hidden fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
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
              <li>
                <Link
                  href="/Learn/Introduction_to_course"
                  className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white"
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
                  3. Value Proposition Canvas
                </button>
                {activeMenu === "ValuePropositionCanvas" && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        1. Customer Journey Maps in User Experience
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Learn/Value_Proposition_Canvas/VPC"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={toggleMobileMenu}
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
    
    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
  >
    5. Principles of Graphics Design
  </button>
  
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
        )}
      </div>


      <div className="flex-1 p-6 ml-18">
    <div className="max-w-7xl mx-auto  bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h1 className="text-2xl font-bold mb-4">Lecture5. Principles of Graphics Design </h1>
      <img src="/PO_GRAPHIC.png" alt="Evaluation" className=" h-auto w-full max-w-3xl mx-auto p-7 mt-10 mb-10  " />
     
      
      
      <p className="text-gray-700 mb-8">แบ่งเป็น 3 หัวข้อ ได้แก่ 1. Layout And Composition  2. The Psychology Of Color In Marketing And Branding และ 3. Color Theory </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Graphics_Design/Layout_and_Composition">
            <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/2056/posts/34238/image/19-10-04%20ART%20The%20Principles%20of%20DesignArtboard%201%20copy.jpg" alt="ab test" className="w-full h-64 mb-4 cursor-pointer" />
        </Link>
         <h3 className="text-lg font-semibold mb-2 mt-9">1. Layout And Composition</h3>
        <p className="text-gray-600 mb-4">คือหลักการพื้นฐานในงานออกแบบ (Design) ที่เกี่ยวข้องกับการจัดองค์ประกอบต่างๆ ในงานให้มีความสมดุล น่าสนใจ และสื่อสารได้อย่างมีประสิทธิภาพ</p>
        <Link href="Graphics_Design/Layout_and_Composition">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Graphics_Design/Psychology_Of_Color">
            <img src="https://shamrockcompanies.net/wp-content/uploads/Psychology-of-Color.jpg" alt="ab test" className="w-full h-64 mb-4 cursor-pointer" />
        </Link>
         <h3 className="text-lg font-semibold mb-2 mt-9">2. The Psychology Of Color In Marketing And Branding</h3>
        <p className="text-gray-600 mb-4">การศึกษาและการใช้สีในงานการตลาดและการสร้างแบรนด์ โดยมีการอ้างอิงถึงผลกระทบของสีต่ออารมณ์ ความรู้สึก และการตัดสินใจของผู้บริโภค</p>
        <Link href="Graphics_Design/Psychology_Of_Color">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Graphics_Design/Color_Theory">
            <img src="https://lthscomputerart.weebly.com/uploads/9/8/2/3/9823286/7397783_orig.jpg" alt="Heuristic Evaluation" className="w-full h-auto mb-4 cursor-pointer" />
        </Link>
        <h3 className="text-lg font-semibold mb-2 mt-20">3. Color Theory</h3>
        <p className="text-gray-600 mb-9">การศึกษาวิธีการที่สีต่างๆ สามารถทำงานร่วมกันและส่งผลต่อความรู้สึก การรับรู้ และการรับข้อมูลในงานออกแบบ</p>
        <Link href="Graphics_Design/Color_Theory">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
        </div>

      </div>
      <ul className="list-disc p-5 mt-12 ml-10"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
      <li className="mb-2 ml-6 text-blue-500 font-semibold  mt-4"> <a href=" https://www.canva.com/design/DAFl41uHJqU/xcxPvuXmTsbYi1PvmKXIJA/view?utm_content=DAFl41uHJqU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://www.youtube.com/playlist?list=PLj63OwXv6t5QBPvu2qqL2BzMFFQuJwxY1" target="_blank">VDO ประกอบการสอน ทฤษฏีกราฟิกส์เพื่อการออกแบบ</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://www.youtube.com/watch?v=_2LLXnUdUIc " target="_blank">การออกแบบกราฟิกเริ่มต้น " สี "</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://youtu.be/Qj1FK8n7WgY?si=qayYdkzFPvNIyMCF&t=480" target="_blank">ตัวอย่างของการใช้สี Understanding Color (นาทีที่ 8)</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://www.cssmania.com/colors/" target="_blank">Most common colors used in CSS Mania screenshots.</a></li>
          
      </ul>


      <div className="flex justify-center mt-10">
      <ul className="flex space-x-2">
    
      <li>
      <Link href="/Learn/WireFrame&Graphics" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ก่อนหน้า 
      </Link>
    </li>
    
    <li>
      <Link href="/Learn/Graphics_Design" className="bg-blue-500 text-white px-3 py-1 rounded">
        5
      </Link>
    </li>
    

    <li>
      <Link href="/Learn/7_Principles" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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

