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
              onClick={() =>{
                 toggleSubmenu("Graphics_Design");
              window.location.href = "/Learn/Graphics_Design";
              }}
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
             onClick={() =>{
              toggleSubmenu("Evaluation");
           window.location.href = "/Learn/Evaluation";
           }}
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              8. Evaluation
            </button>
            
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
              onClick={() =>{
                 toggleSubmenu("Graphics_Design");
              window.location.href = "/Learn/Graphics_Design";
              }}
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
              onClick={() =>{
                toggleSubmenu("Evaluation");
             window.location.href = "/Learn/Evaluation";
             }}
              className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              8. Evaluation
            </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Evaluation/A_B_testing"
                    className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   1. A/B Testing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Evaluation/Heuristic_Evaluation"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
                  >
                   2. Heuristic Evaluation
                  </Link>
                </li>
              </ul>
            
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
      <h2 className="text-3xl font-bold mb-4 mt-10 ml-6">2. Heuristic Evaluation.</h2>
      <p className="text-gray-700 mb-12 ml-10">Heuristic Evaluation คือ วิธีการทดสอบความสามารถในการใช้งาน (Usability) ของผลิตภัณฑ์หรือระบบ เช่น เว็บไซต์หรือแอปพลิเคชัน โดยใช้หลักการหรือเกณฑ์ที่เรียกว่า 
        "Heuristics" ซึ่งเป็นหลักการที่ช่วยให้ผู้ประเมินสามารถตรวจสอบและระบุปัญหาที่อาจเกิดขึ้นในการออกแบบได้อย่างรวดเร็ว</p>
        <h3 className="text-xl font-semibold mb-2 ml-6">กระบวนการ Heuristic Evaluation ประกอบด้วยขั้นตอนหลัก ๆ ดังนี้: </h3>
        <img src="/Heuristic.png" alt="Heuristic" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />

          <h3 className="text-xl font-semibold mb-2 mt-6 ml-6">เรามาทำความเข้าใจทั้ง 10 ข้อ ของการเลือก Heuristic Evaluation กันดีกว่า  </h3>
          
          <h3 className="text-xl font-semibold mb-2 mt-6 ml-10">" 10 Usability Heuristics "  </h3>
          <img src="https://uxbooth.com/wp-content/uploads/2022/01/2-Usability-Heuristics.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
        
          <ul class="list-disc p-5 ml-6 "> <span className="font-semibold  text-black ml-5 "> 1. Visibility of System Status (การแสดงสถานะของระบบ) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>ระบบควรให้ข้อมูลเกี่ยวกับสิ่งที่กำลังเกิดขึ้นในขณะนั้นอย่างชัดเจน เช่น สถานะการโหลดข้อมูลหรือการประมวลผล ซึ่งช่วยให้ผู้ใช้ไม่รู้สึกไม่แน่ใจหรือลังเล</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>เมื่อดาวน์โหลดไฟล์ ผู้ใช้ควรเห็นแถบสถานะแสดงว่าเหลือเวลาเท่าไหร่ในการดาวน์โหลดหรือมีเปอร์เซ็นต์การดาวน์โหลดอยู่ที่เท่าไร</li>
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*9GoBnizSi9xm639q6u7dyA.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-4 mt-4" />
          </ul>
         
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 2. Match Between System and the Real World (ความสอดคล้องระหว่างระบบกับโลกจริง) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>การใช้ภาษาที่เข้าใจง่าย และการสื่อสารที่เป็นมิตรกับผู้ใช้ ควรใช้คำศัพท์ที่ผู้ใช้คุ้นเคยและมีความหมายที่ชัดเจน</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>แทนที่จะใช้คำว่า "Execute," ใช้ "Run" หรือ "Start" ซึ่งจะเป็นคำที่คุ้นเคยมากกว่าสำหรับผู้ใช้ทั่วไป</li>
          <img src="https://miro.medium.com/v2/resize:fit:2000/1*2pDIt7Zzy3aC7JKniO-L7w.jpeg" alt="10 Usability Heuristics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-3 mt-4" />
          </ul>
         
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 3. User Control and Freedom (การควบคุมและเสรีภาพของผู้ใช้) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>ผู้ใช้ควรมีความสามารถในการยกเลิกหรือย้อนกลับการกระทำที่ไม่ต้องการได้อย่างง่ายดาย โดยไม่มีการทำให้ผู้ใช้รู้สึกอึดอัด</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>ในการส่งข้อความ ระบบควรมีปุ่ม "Undo" สำหรับการส่งข้อความล่าสุดที่สามารถกดได้ภายในเวลาไม่กี่วินาทีหลังจากส่ง</li>
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*8GAA-397nmGfHAbRaZCNbQ.jpeg" alt="10 Usability Heuristics" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-4 mt-4" />
          </ul>
         
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 4. Consistency and Standards (ความสอดคล้องและมาตรฐาน) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>การออกแบบควรมีความสอดคล้องกันในทุกๆ ฟังก์ชันและองค์ประกอบ เพื่อไม่ให้ผู้ใช้สับสน</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>หากปุ่ม "บันทึก" อยู่ที่มุมขวาบนของหน้าแรก ควรอยู่ที่มุมเดียวกันในทุกหน้าของระบบ</li>
          <img src="https://forum.sublimetext.com/uploads/default/original/3X/c/1/c18bf142469bdaad18a2b1a96a6dff71888b346d.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 5. Error Prevention (การป้องกันข้อผิดพลาด) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>ระบบควรช่วยป้องกันข้อผิดพลาดที่อาจเกิดขึ้น เช่น การแสดงข้อความเตือนก่อนที่จะดำเนินการลบข้อมูลที่สำคัญ</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>ระบบลงทะเบียนออนไลน์ควรตรวจสอบว่าผู้ใช้กรอกข้อมูลที่จำเป็นครบถ้วนก่อนที่จะอนุญาตให้ดำเนินการต่อ</li>
          <img src="/error.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-md mx-auto p-7  mb-4 mt-4" />
          </ul>
          
         
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 6. Recognition Rather Than Recall (การจดจำแทนการจำ) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>ระบบควรให้ผู้ใช้เห็นตัวเลือกหรือข้อมูลที่พวกเขาต้องการใช้ได้อย่างชัดเจน โดยไม่ต้องจำรายละเอียดทั้งหมด</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>ใช้เมนูแบบดรอปดาวน์ที่แสดงตัวเลือกให้เห็นแทนที่จะให้ผู้ใช้พิมพ์คำค้นหา</li>
          <img src="https://blog.logrocket.com/wp-content/uploads/2023/08/search-results-example.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 7. Flexibility and Efficiency of Use (ความยืดหยุ่นและประสิทธิภาพในการใช้งาน) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>ระบบควรตอบสนองต่อความต้องการที่แตกต่างกันของผู้ใช้ เช่น ผู้ใช้ที่มีประสบการณ์สามารถใช้ทางลัดได้</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>แอปพลิเคชันการจัดการไฟล์ควรอนุญาตให้ผู้ใช้ที่มีประสบการณ์ใช้คีย์บอร์ดเพื่อทำการค้นหาหรือเรียกดูไฟล์ได้เร็วขึ้น</li>
          <img src="/flexibility.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 8. Aesthetic and Minimalist Design (การออกแบบที่สวยงามและเรียบง่าย) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>การออกแบบควรมีความเรียบง่าย ไม่ควรมีข้อมูลหรือฟังก์ชันที่ไม่จำเป็นเพื่อไม่ให้ผู้ใช้รู้สึกยุ่งเหยิง</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>เว็บไซต์ควรมีดีไซน์ที่เรียบง่าย มีพื้นที่ว่างและใช้สีที่ไม่ทำให้ตาลาย</li>
          <img src="https://media.nngroup.com/media/editor/2020/12/23/screenshot-www16personalitiescom-20201124-18_53_57.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
          
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 9. Help Users Recognize, Diagnose, and Recover from Errors (ช่วยให้ผู้ใช้รู้จัก วินิจฉัย และฟื้นฟูจากข้อผิดพลาด) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>เมื่อเกิดข้อผิดพลาด ควรมีข้อความที่ชัดเจนและแนะนำวิธีแก้ไขที่สามารถทำได้</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span>หากผู้ใช้กรอกข้อมูลไม่ถูกต้อง ระบบควรบอกว่าต้องแก้ไขอะไรบ้าง เช่น "กรุณากรอกอีเมลให้ถูกต้อง"</li>
          <img src="https://webkul.design//wp-content/uploads/2021/12/help-users-recognize-diagnose-recover-from-errors-2-1024x656.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-4 mt-4" />
          </ul>
         
         
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5"> 10. Help and Documentation (การช่วยเหลือและเอกสาร) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span>แม้ว่าระบบควรใช้งานได้โดยไม่ต้องมีเอกสาร แต่การมีเอกสารที่สามารถเข้าถึงได้ง่าย เช่น คำแนะนำหรือ FAQ จะช่วยให้ผู้ใช้มีข้อมูลเพิ่มเติมเมื่อมีปัญหา</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> เว็บไซต์ควรมีส่วน "ช่วยเหลือ" หรือ "FAQ" ที่ตอบคำถามทั่วไป และสามารถเข้าถึงได้ง่ายจากทุกหน้า</li>
          <img src="https://media.nngroup.com/media/editor/2020/11/12/oreilly.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
        
          




          
<ul class="list-disc p-5 mt-20 mb-4 ml-6"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://docs.google.com/presentation/d/1kd2VrADeO2lo-F6RgXFBEl9LzQ1wXO7n/edit#slide=id.p1" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://drive.google.com/file/d/0B3vZXgaQ6559Zl8wOHhPWXdHU0U/view?resourcekey=0-UnTBolLA9wQW6WBzZRSyIQ" target="_blank">Heuristic Evaluation Report</a></li>
          
</ul>
{/* Pagination Section */}
<div className="flex justify-center mt-10 mb-10">
  <ul className="flex space-x-2">
  <li>
      <Link href="/Learn/Evaluation/A_B_testing" className="bg-gray-300 px-3 py-1 rounded hover:bg-blue-500 hover:text-white">
        ก่อนหน้า
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



