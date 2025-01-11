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
              className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              8. Evaluation <span className="ml-2">▼</span>
            </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Evaluation/A_B_testing"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
              className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              8. Evaluation <span className="ml-2">▼</span>
            </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Evaluation/A_B_testing"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
    <div className="max-w-7xl mx-auto p-4 ">
    
    
      <div className="max-w-7xl mx-auto  bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h2 className="text-2xl font-bold mb-4 m-6">1. A/B Testing.</h2>
      <p className="text-gray-700 mb-10 ml-10">ใน A/B Testing นักออกแบบจะแบ่งกลุ่มผู้ใช้เป็นสองกลุ่ม โดยกลุ่มหนึ่งจะเห็นการออกแบบ A และอีกกลุ่มจะเห็นการออกแบบ B จากนั้นจะเก็บข้อมูลว่าผู้ใช้มีปฏิกิริยาอย่างไร เช่น คลิกปุ่มมากขึ้น มีส่วนร่วมกับเนื้อหามากขึ้น หรือทำตามเป้าหมายของเว็บไซต์หรือแอปได้ดีกว่าหรือไม่</p>
        <h3 className="text-xl font-semibold mb-2 ml-10">แบ่งเป็น 2 หัวข้อได้แก่</h3>
        <img src="/A_B_Testing.png" alt="A_B_Testing" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />

          <h3 className="text-xl font-semibold mb-2 mt-6 ml-10">1.องค์ประกอบของการทำ A/B Testing. </h3>
          
          <h3 className="text-xl  mb-2 mt-6 ml-10">การทำ A/B Testing. มีองค์ประกอบอยู่ 3 อย่างที่ต้องใช้ คือ : </h3>
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*VhPfZIYkcnV-vWZYaAvgjg.jpeg" alt="A_B_Testing" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6 mt-10 " />
        
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">1. เป้าหมายของการทดสอบ (Goals) :</span> 
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ความสำคัญ :</span> การกำหนดเป้าหมายชัดเจนจะทำให้ทราบว่าผลลัพธ์ที่คาดหวังคืออะไร ตัวอย่างเช่น เป้าหมายอาจเป็นการเพิ่มจำนวนคลิกปุ่มลงทะเบียน, เพิ่มอัตราการซื้อสินค้าจากหน้าเพจ, หรือปรับปรุงอัตราการมีส่วนร่วมกับเนื้อหา</li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ตัวอย่างเป้าหมาย :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">เพิ่ม Conversion Rate บนหน้าเว็บขายสินค้า</li>
          <li class="before:content-['-'] before:mr-2">ลดอัตราการละทิ้งรถเข็นในหน้า checkout</li>
          <li class="before:content-['-'] before:mr-2">เพิ่มการสมัครใช้งาน newsletter</li>

          </ul>
          </li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">2. ตัวแปรที่ใช้ในการทดสอบ (Variables) :</span> 
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ความสำคัญ :</span> การเลือกตัวแปรที่จะทดสอบควรเป็นองค์ประกอบที่สามารถส่งผลกระทบต่อเป้าหมาย ตัวแปรที่ใช้ทดสอบใน A/B Testing อาจเป็นได้ทั้ง UI, UX, และข้อความที่ใช้ในหน้าเว็บ</li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ตัวอย่างตัวแปร :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">สีหรือขนาดของปุ่ม CTA (Call to Action)</li>
          <li class="before:content-['-'] before:mr-2">การเปลี่ยนแปลงข้อความโฆษณาหรือ heading</li>
          <li class="before:content-['-'] before:mr-2">การจัดวางเนื้อหาหรือองค์ประกอบบนหน้าเพจ</li>
          <li class="before:content-['-'] before:mr-2">รูปแบบการนำเสนอสินค้าหรือข้อเสนอ</li>
          <li class="before:content-['-'] before:mr-2">จำนวนขั้นตอนในกระบวนการซื้อหรือสมัครใช้งาน</li>
          </ul>
          
          </li>
          
          </ul>
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">3. กลุ่มตัวอย่างที่ใช้ในการทดสอบ (Sample Groups) :</span> 
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ความสำคัญ :</span> การแบ่งกลุ่มตัวอย่างมีความสำคัญในการทำให้การทดสอบนั้นน่าเชื่อถือ โดยกลุ่มผู้ใช้จะถูกแบ่งออกเป็นสองกลุ่ม (หรือมากกว่า) เพื่อให้ได้รับประสบการณ์ที่แตกต่างกันตามแต่ละเวอร์ชันของการออกแบบ</li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">การเลือกกลุ่มตัวอย่าง :</span> ควรคำนึงถึงความหลากหลายและความสมดุล เพื่อให้ผลลัพธ์ที่ได้ไม่ลำเอียง กลุ่มตัวอย่างที่เลือกควรจะมีลักษณะเหมือนกันหรือมีพฤติกรรมการใช้งานใกล้เคียงกัน เช่น อายุ เพศ ตำแหน่งทางภูมิศาสตร์ หรือพฤติกรรมการใช้งานที่ผ่านมากับผลิตภัณฑ์</li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ขนาดกลุ่มตัวอย่าง :</span>  การเลือกจำนวนคนที่มากพอจะทำให้ผลการทดสอบมีความน่าเชื่อถือมากขึ้น การมีขนาดกลุ่มตัวอย่างที่ใหญ่พอจะช่วยลดความคลาดเคลื่อนทางสถิติและทำให้ผลลัพธ์สามารถแปลความได้อย่างมั่นใจ</li>
          </ul>
          <img src="/cta.png" alt="A_B_Testing" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />

          <h3 className="text-xl font-semibold mb-2 mt-6 ml-10">2. Landing Page คืออะไร? </h3>
          <p className="text-gray-700 mb-12 ml-10">คำว่า Landing Page ถ้าแปลตรงตัวจะมีความหมายว่าหน้าเว็บไซต์ที่คนเข้ามาเป็นหน้าแรกถูกทำขึ้นมาเพื่อจุดประสงค์อย่างใดอย่างหนึ่ง เช่น การเก็บข้อมูล</p>
          <img src="https://www.searchenginejournal.com/wp-content/uploads/2023/08/best-landing-page-examples-64e6080f990bb-sej.png" alt="Landing page" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">2.1 จุดประสงค์ให้ชัดเจน :</span> 
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ความสำคัญ :</span>กฏข้อแรกที่สำคัญที่สุดคือ "การโฟกัส" ไปที่จุดประสงค์เพียงแค่อย่างใดอย่างหนึ่ง คุณต้องตอบตัวเองให้ได้ก่อนว่า คุณต้องการจะใช้
          Landing Page ทำอะไร จะเก็บ E-mail List จะขายของ หรือ อยากจะให้คนลงทะเบียนเข้างานสัมมนา เป็นต้น</li>
        
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">2.2 ขอข้อมูลเฉพาะที่จำเป็น :</span> 
          <img src="/landing_page.png" alt="Landing page" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">2.3 ปุ่ม call to action ต้องชัด :</span> 
          <img src="/cta2.png" alt="cta" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">2.4 สั้นๆ ได้ใจความ :</span> 
          <img src="/short_Page.png" alt="short_Page" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">2.5 ถ้าจะยาว ต้องยาวแบบมีศิลปะ </span> 
          <li className="mb-2 text-gray-600 ml-10"> วิธีการสร้าง Landing Page แบบยาวที่ดีนั้นจะต้องลงรายละเอียด, ต้องบิวท์ และ ต้องใส่ Call to action เป็นระยะ </li>
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-black ml-5">2.6 ทดลอง </span> 
          <li className="mb-2 text-gray-600 ml-10"> เทสต์อย่างน้อยที่สุด คือ 14 วัน </li>
          </ul>
          
        
          




          
<ul class="list-disc p-5 mt-20 mb-4 ml-6"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://www.canva.com/design/DAFl44FLfQ8/aK_sCqMkjG5Fhl_Lc9Z9zg/view?utm_content=DAFl44FLfQ8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.everydaymarketing.co/media/website/5-case-a-b-testing-for-website/" target="_blank">บทความเกี่ยวกับ A/B Testing</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.adwordsrobot.com/en/tools/a-b-split-test-mvt-test-calculator" target="_blank">A/B, Split Test and MVT Test Calculator Tools</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.cotactic.com/blog/what-is-bounce-rate/" target="_blank">What is Bounce-Rate?</a></li>
          
</ul>
 {/* Pagination Section */}
 <div className="relative mt-10">
  <ul className="flex justify-between items-center relative">
  <li className="absolute left-0 bottom-0">
      <Link href="/Learn/Evaluation" className="bg-gray-300 hover:bg-blue-500 hover:text-white px-3 py-1 rounded ">
        ก่อนหน้า
      </Link>
    </li>
    <li className="absolute right-0 bottom-0">
      <Link href="/Learn/Evaluation/Heuristic_Evaluation" className="bg-gray-300 hover:bg-blue-500 hover:text-white px-3 py-1 rounded ">
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



