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
    3. Value Proposition Canvas <span className="ml-2">▼</span>
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
              onClick={() => {
                toggleSubmenu("Graphics_Design");
                window.location.href = "/Learn/Graphics_Design/"; // เปลี่ยนเส้นทาง
              }}
              className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              5. Principles of Graphics Design <span className="ml-2">▼</span>
            </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Layout_and_Composition"
                    className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 1. Layout And Composition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Psychology_Of_Color"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. The Psychology Of Color In Marketing And Branding
                  </Link>
                </li>
		<li>
                  <Link
                    href="/Learn/Graphics_Design/Color_Theory"
                    className="block px-4 py-2 rounded-lg   hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 3. Color Theory
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
              onClick={() => {
                toggleSubmenu("Graphics_Design");
                window.location.href = "/Learn/Graphics_Design/"; // เปลี่ยนเส้นทาง
              }}
              className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              5. Principles of Graphics Design <span className="ml-2">▼</span>
            </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Layout_and_Composition"
                    className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 1. Layout And Composition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Psychology_Of_Color"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. The Psychology Of Color In Marketing And Branding
                  </Link>
                </li>
		<li>
                  <Link
                    href="/Learn/Graphics_Design/Color_Theory"
                    className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 3. Color Theory
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

     
      <div className="flex-1 p-6 ml-18">
    <div className="max-w-7xl mx-auto p-4">
    
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        
            
          <h3 className="text-2xl font-semibold mb-2 mt-6 ml-6">2.THE PSYCHOLOGY OF COLOR IN MARKETING AND BRANDING </h3>
          <img src="/gregory_ciotti.png" alt="Principles of Graphics Design" className=" h-auto w-full max-w-5xl mx-auto p-5 " />
          <p className="text-gray-600 ml-10 mb-4 mt-6"><span className="font-semibold text-black">คำอธิบาย :</span> การศึกษาเรื่องนี้โดยละเอียดนั้นมาจากงานวิจัยของ Joe Hallock เรื่อง "การกำหนดสี"
ข้อมูลของ Hallock แสดงให้เห็นถึงความชอบในสีบางสีที่แตกต่างกันไปตามเพศ(โดยส่วนใหญ่ผู้ตอบแบบสอบถามมาจากสังคมตะวันตก)สิ่งสำคัญที่ต้องทราบคือ สภาพแวดล้อมของแต่ละบุคคล — และโดยเฉพาะอย่างยิ่งความรับรู้ทางวัฒนธรรม— มีบทบาทสำคัญในการกำหนดว่าสีใดเหมาะสมกับเพศใด</p>
<p className="text-gray-600 mb-4 ml-10" >นี่คือผลการวิจัยของ Hallock: </p>
<p className="text-gray-600 ml-10 mb-4 mt-6"><span className="font-semibold text-black">คำอธิบายเพิ่มเติม :</span> ข้อความนี้กล่าวถึงงานวิจัยของ Joe Hallock ที่ศึกษาเกี่ยวกับความเชื่อมโยงระหว่างสีและเพศ โดยเน้นย้ำว่าความชอบในสีนั้นไม่ได้เป็นเรื่องสากล แต่ยังได้รับอิทธิพลจากวัฒนธรรมและสภาพแวดล้อมของแต่ละบุคคลอีกด้วย

หากมีข้อมูลเพิ่มเติมเกี่ยวกับผลการวิจัยของ Hallock เช่น สีที่ผู้ชายและผู้หญิงชอบ สีที่เป็นกลางทางเพศ หรือความแตกต่างของผลการวิจัยระหว่างวัฒนธรรมตะวันตกและตะวันออก สามารถนำมาวิเคราะห์และอธิบายเพิ่มเติมได้</p>
 

<h3 className="text-2xl font-semibold ml-6 mt-20">การใช้สีในการตลาดและแบรนด์ </h3>
          <img src="/color_branding.jpg" alt="Design basics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
          <p className="text-gray-600 mb-4 ml-10" >การใช้จิตวิทยาของสีในการออกแบบเว็บไซต์สามารถเพิ่มประสิทธิภาพและประสบการณ์ของผู้ใช้ได้ โดยแต่ละสีมีความหมายและอารมณ์ที่แตกต่างกัน ซึ่งสามารถกระตุ้นความรู้สึกและพฤติกรรมของผู้เข้าชมได้</p>
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold text-red-600">สีแดง (Red) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> ตื่นเต้น, กระตุ้น </li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> สามารถใช้เพื่อดึงดูดความสนใจ เช่น ปุ่ม "ซื้อเดี๋ยวนี้" หรือส่วนที่สำคัญในหน้าเว็บ</li>
          </ul>
 
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold text-blue-600">สีน้ำเงิน (Blue) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> สงบ, เชื่อถือได้ </li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> เหมาะสำหรับเว็บไซต์ที่ต้องการสร้างความเชื่อมั่น เช่น ธนาคารหรือบริการทางการเงิน</li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold text-green-600">สีเขียว (Green) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> สดชื่น, เป็นธรรมชาติ</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> มักใช้ในเว็บไซต์ที่เกี่ยวกับสุขภาพและสิ่งแวดล้อม หรือเพื่อสื่อถึงความเจริญเติบโต</li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold text-yellow-600">สีเหลือง (Yellow) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> ร่าเริง, กระตุ้น</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> ใช้เพื่อดึงดูดความสนใจและสร้างบรรยากาศที่เป็นบวก เช่น เว็บไซต์ที่เน้นความสนุกสนาน</li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold text-orange-600">สีส้ม (Orange) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> กระตุ้น, เป็นมิตร</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> เหมาะสำหรับการส่งเสริมการขายหรือกิจกรรมพิเศษ</li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold text-purple-600">สีม่วง (Purple) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span>  หรูหรา, ลึกลับ</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> สามารถใช้ในเว็บไซต์ที่ต้องการสื่อถึงความหรูหราหรือความคิดสร้างสรรค์</li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold text-black">สีดำ (Black) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span>  ทันสมัย, มีอำนาจ</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> เหมาะสำหรับเว็บไซต์ที่ต้องการสร้างภาพลักษณ์ที่หรูหรา เช่น แบรนด์สินค้าหรูหรา</li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-gray-500"> สีขาว (White) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span>  สะอาด, เรียบง่าย</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> ใช้เพื่อสร้างความรู้สึกเรียบง่ายและให้ข้อมูลที่ชัดเจน</li>
          </ul>
         


          <ul class="list-disc p-2 pt-20 ml-6"> <span className="font-semibold text-black">การสร้างความแตกต่าง :</span> 
          <li className="mb-2 text-gray-700 ml-10">   สีสามารถช่วยแบรนด์แยกแยะตัวเองจากคู่แข่งได้ ตัวอย่างเช่น สีแดงที่ใช้ในแบรนด์ต่างๆ มักจะสื่อถึงความกระตือรือร้นและพลัง</li>
          </ul>

          <ul class="list-disc p-2 ml-6"> <span className="font-semibold text-black">สร้างการรับรู้ของแบรนด์ :</span> 
          <li className="mb-2 text-gray-700 ml-10">   การใช้สีที่เหมาะสมช่วยให้ผู้บริโภคจดจำแบรนด์ได้ง่ายขึ้น ตัวอย่างเช่น สีเขียวที่ใช้ในแบรนด์ Whole Foods ช่วยให้ผู้บริโภคคิดถึงสินค้าสุขภาพและธรรมชาติ</li>
          </ul>

          <ul class="list-disc p-2 ml-6"> <span className="font-semibold text-black">กระตุ้นการตัดสินใจ :</span> 
          <li className="mb-2 text-gray-700 ml-10">   สีบางสีสามารถกระตุ้นให้ผู้บริโภคตัดสินใจซื้อเร็วขึ้น เช่น การใช้สีแดงในโปรโมชั่นลดราคา เพราะมันสื่อถึงความเร่งด่วน</li>
          </ul>

          <ul class="list-disc p-2 ml-6"> <span className="font-semibold text-black">การสร้างอารมณ์และความรู้สึก :</span> 
          <li className="mb-2 text-gray-700 ml-10">   การเลือกสีสามารถสร้างอารมณ์และความรู้สึกที่ผู้บริโภคมีต่อแบรนด์ได้ เช่น การใช้สีฟ้าสามารถทำให้รู้สึกเชื่อถือได้</li>
          </ul>

          <ul class="list-disc p-2 ml-6"> <span className="font-semibold text-black">การสร้างความแตกต่าง :</span> 
          <li className="mb-2 text-gray-700 ml-10">   สีสามารถช่วยแบรนด์แยกแยะตัวเองจากคู่แข่งได้ ตัวอย่างเช่น สีแดงที่ใช้ในแบรนด์ต่างๆ มักจะสื่อถึงความกระตือรือร้นและพลัง</li>
          </ul>

          <ul class="list-disc p-2 ml-6"> <span className="font-semibold text-black">สร้างการรับรู้ของแบรนด์ :</span> 
          <li className="mb-2 text-gray-700 ml-10">   การใช้สีที่เหมาะสมช่วยให้ผู้บริโภคจดจำแบรนด์ได้ง่ายขึ้น ตัวอย่างเช่น สีเขียวที่ใช้ในแบรนด์ Whole Foods ช่วยให้ผู้บริโภคคิดถึงสินค้าสุขภาพและธรรมชาติ</li>
          </ul>

          <ul class="list-disc p-2 ml-6"> <span className="font-semibold text-black">กระตุ้นการตัดสินใจ :</span> 
          <li className="mb-2 text-gray-700 ml-10">   สีบางสีสามารถกระตุ้นให้ผู้บริโภคตัดสินใจซื้อเร็วขึ้น เช่น การใช้สีแดงในโปรโมชั่นลดราคา เพราะมันสื่อถึงความเร่งด่วน</li>
          </ul>

          <ul class="list-disc p-2 ml-6"> <span className="font-semibold text-black">การสร้างอารมณ์และความรู้สึก :</span> 
          <li className="mb-2 text-gray-700 ml-10">   การเลือกสีสามารถสร้างอารมณ์และความรู้สึกที่ผู้บริโภคมีต่อแบรนด์ได้ เช่น การใช้สีฟ้าสามารถทำให้รู้สึกเชื่อถือได้</li>
          </ul>
          {/* Pagination Section */}
<div className="flex justify-center mt-10 mb-10">
  <ul className="flex space-x-2">
  <li>
      <Link href="/Learn/Graphics_Design/Layout_and_Composition" className="bg-gray-300 px-3 py-1 rounded hover:bg-blue-500 hover:text-white">
        ก่อนหน้า
      </Link>
    </li>
    

    <li>
      <Link href="/Learn/Graphics_Design/Color_Theory" className="bg-gray-300 px-3 py-1 rounded hover:bg-blue-500 hover:text-white">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>






          </div>
          </div>
          </div>
          </div>
  );
}


