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
        
        <ul className="space-y-2">
        <Link href="/Learn">
        <h2 className="font-bold text-lg block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white">บทเรียน</h2>
        </Link>
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
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
            <Link href="/Learn">
        <h2 className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white">บทเรียน</h2>
	          </Link>
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
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
      <div className="max-w-7xl mx-auto  bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h2 className="text-2xl font-bold mb-4 m-6">Lecture9. Universal Design</h2>
        <h3 className="text-xl   mb-2 ml-10">Universal Design คือ "การออกแบบและจัดวางสิ่งแวดล้อมเพื่อให้ทุกคนสามารถเข้าถึง เข้าใจ และใช้งานได้ในระดับสูงสุดเท่าที่จะเป็นไปได้ โดยไม่คำนึงถึงอายุ ขนาด หรือความพิการ " อ้างอิงจากพระราชบัญญัติความพิการของไอร์แลนด์ ปี 2005  </h3>
        <img src="/Universal_banner.png" alt="Universal_banner" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />

          <h3 className="text-xl  mb-4 mt-6 ml-10">Universal Design -The Principles- มีทั้งหมด 7หัวข้อ ได้แก่ </h3>
          <img src="/Principles_universal.png" alt="Principles_universal" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
        
          <ul class="list-disc p-5 ml-10  "> <span className="font-semibold  text-black ml-5 "> 1. Equitable Use (การใช้งานอย่างเสมอภาค) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> การออกแบบที่ไม่กีดกันผู้ใช้ใดๆ และทำให้ทุกคนสามารถเข้าถึงได้อย่างเท่าเทียม โดยไม่จำเป็นต้องปรับเปลี่ยนการใช้งานเป็นพิเศษสำหรับกลุ่มใดกลุ่มหนึ่ง</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> เว็บไซต์ที่มีฟังก์ชันให้ผู้ใช้สามารถเลือกเปลี่ยนภาษาเป็นภาษาที่ตนเองถนัด จะทำให้ผู้ใช้จากหลากหลายประเทศสามารถใช้งานได้สะดวกและได้รับประสบการณ์การใช้งานที่ไม่ต่างกัน</li>
          <img src="/Uquitable.png" alt="10 Usability Heuristics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-4 mt-4" />
          </ul>
         
          
          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5"> 2. Flexibility in Use (ความยืดหยุ่นในการใช้งาน) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> การออกแบบที่รองรับความต้องการและความชอบที่หลากหลายของผู้ใช้ สามารถปรับเปลี่ยนได้ตามความสะดวกของแต่ละบุคคล</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> หากต้องการสมัครแพ็คเกจบนเว็บไซต์ควร มี แพ็คเกจให้ผู้ใช้เลือกได้เหมาะกับการใช้งานของผู้ใช้</li>
          <img src="/Flexibility_inuse.png" alt="Flexibility_inuse" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-3 mt-4" />
          </ul>
         
          
          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5"> 3. Simple and Intuitive Use (ใช้งานง่าย ไม่ซับซ้อน) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> การออกแบบที่ผู้ใช้ทุกคนสามารถเข้าใจและใช้งานได้ง่ายโดยไม่จำเป็นต้องมีการเรียนรู้หรือมีประสบการณ์มาก่อน การใช้งานควรเป็นธรรมชาติและไม่ต้องใช้ความคิดมากเกินไป</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> การออกแบบระบบนำทางที่ชัดเจนและเข้าใจได้ง่าย เช่น เมนูที่เรียบง่าย ปุ่มที่มีการระบุฟังก์ชันชัดเจน</li>
          <img src="/Simple_and_Intuitive.png" alt="Simple_and_Intuitive" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-4 mt-4" />
          </ul>
         
          
          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5"> 4. Perceptible Information (ข้อมูลเข้าใจง่าย แม้สำหรับผู้มีข้อจำกัดในการรับรู้) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> การออกแบบที่สามารถสื่อสารข้อมูลสำคัญไปยังผู้ใช้ทุกคน ไม่ว่าจะมีความบกพร่องทางการมองเห็น การได้ยิน หรือการรับรู้ในรูปแบบอื่นๆ ข้อมูลควรถูกนำเสนอผ่านหลายช่องทาง เพื่อให้มั่นใจว่าผู้ใช้สามารถเข้าใจได้</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> การใช้ข้อความ แถบสี เสียงแจ้งเตือน หรือการสั่นเตือน เพื่อสื่อสารเหตุการณ์สำคัญต่างๆ บนแอปพลิเคชัน</li>
          <img src="https://media.licdn.com/dms/image/v2/D4E12AQFCkvDtdfdylA/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1674021851137?e=2147483647&v=beta&t=YR8Jk81u02bgzdpWtghjsc_Ujz6fWRj5lQJGwqQYg5Q" alt="Perceptible Information" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5"> 5. Low Physical Effort (ใช้แรงกายในการใช้งานน้อย) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> การออกแบบที่ลดความเหนื่อยล้าทางร่างกายและจิตใจในการใช้งานผลิตภัณฑ์หรือบริการ ผู้ใช้ควรจะสามารถดำเนินการต่างๆ ได้อย่างสะดวกสบายและไม่ต้องออกแรงมากเกินไป</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> Microsoft Word หรือโปรแกรมอื่นๆ ก็มี shortcuts เช่น กด "Ctrl + S" เพื่อบันทึกไฟล์ ซึ่งช่วยลดการเสียเวลาของผู้ใช้ในการบันทึกงานด้วยการคลิกที่เมนู</li>
          <img src="https://i.ytimg.com/vi/TEikdLuKG5c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCD338UoXHu-cBi4kptIPFcvfpeNQ" alt="Low Physical Effort" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-4 mt-4" />
          </ul>


          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5"> 6. Tolerance for Error (ออกแบบที่ยอมรับความผิดพลาด ลดโอกาสเกิดความผิดพลาดร้ายแรง) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> การออกแบบที่ลดความเสี่ยงของการเกิดความผิดพลาด หรือเมื่อเกิดความผิดพลาดแล้วควรมีวิธีการกู้คืนหรือแก้ไขได้ง่าย</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> มีฟังก์ชัน "ยกเลิก" หรือ "ย้อนกลับ" (undo/redo) ในการกรอกข้อมูลที่ผิดพลาด หรือการแจ้งเตือนก่อนการดำเนินการที่อาจจะมีผลกระทบรุนแรง</li>
          <img src="https://alliescomputing.com/cms-admin/resources/etd-tweet-imgage.jpg" alt="Tolerance for Error" className=" h-auto w-full max-w-xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
          
          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5"> 7. Size and Space for Approach and Use (ขนาดและพื้นที่ที่เหมาะสมสำหรับการใช้งานโดยกลุ่มคนต่างๆ) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> การจัดวางขนาดและพื้นที่ให้สามารถใช้งานได้ง่ายโดยไม่ว่าจะมีข้อจำกัดทางกายภาพ เช่น ความสูง น้ำหนัก หรือการเคลื่อนไหว ผู้ใช้ทุกคนควรสามารถเข้าถึงได้ไม่ว่าจะอยู่ในตำแหน่งใดหรือใช้ร่างกายส่วนไหน</li>
          <li className="mb-2 text-gray-600 ml-10" ><span className="font-semibold  text-black ">ตัวอย่าง</span> เช่น Slack ถูกออกแบบให้สามารถใช้งานได้ง่ายทั้งบนเดสก์ท็อปและมือถือ โดยมีพื้นที่เพียงพอสำหรับการเข้าถึงส่วนต่างๆ เช่น ปุ่มและเมนูที่วางอย่างเหมาะสมสำหรับทั้งผู้ใช้เมาส์และผู้ใช้หน้าจอสัมผัส</li>
          <img src="https://community.maryville.edu/servlet/rtaImage?eid=ka08X000000ORBJ&feoid=00N3600000RpYD2&refid=0EM8X000003pTp6" alt="Size and Space for Approach and Use" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-4 mt-4" />
          </ul>
          
          <h3 className="text-xl font-semibold mb-2 mt-6 ml-6">"User-Centred Design" (การออกแบบที่ยึดผู้ใช้เป็นศูนย์กลาง) </h3>
          <h3 className="text-xl font-semibold mb-2 ml-10">เน้นไปที่แนวคิดต่าง ๆ ในการออกแบบเพื่อให้ครอบคลุมและเข้าถึงกลุ่มคนหลากหลายลักษณะ ซึ่งรวมถึง: </h3>
         
         
          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">1. Inclusive Design (การออกแบบที่ครอบคลุม) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-4" ><span className="font-semibold  text-black ">คำอธิบาย</span> ออกแบบผลิตภัณฑ์และบริการเพื่อให้ทุกคนสามารถเข้าถึงและใช้งานได้ ไม่ว่าจะมีความสามารถหรือลักษณะทางกายภาพที่แตกต่างกัน</li>
          </ul>


          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">2. Design for All (การออกแบบเพื่อทุกคน) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> เน้นการสร้างสิ่งที่ทุกคนสามารถใช้ได้ ไม่ว่าผู้ใช้จะมีความแตกต่างทางร่างกาย วัย หรือความต้องการพิเศษอื่น ๆ</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">3. User Needs Design (การออกแบบตามความต้องการของผู้ใช้) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> มุ่งเน้นการสร้างสิ่งที่ตอบสนองต่อความต้องการเฉพาะของกลุ่มผู้ใช้ที่เป็นเป้าหมายอย่างแท้จริง</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">4. User-Centred Design (การออกแบบที่ยึดผู้ใช้เป็นศูนย์กลาง) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> กระบวนการออกแบบที่ให้ความสำคัญกับการศึกษาและเข้าใจพฤติกรรม ความต้องการ และความคาดหวังของผู้ใช้ก่อนการออกแบบผลิตภัณฑ์หรือบริการ</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">5. Human-Centred Design (การออกแบบที่ยึดมนุษย์เป็นศูนย์กลาง) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> เการออกแบบที่คำนึงถึงประสบการณ์และความเป็นอยู่ที่ดีของมนุษย์ในทุก ๆ ด้าน ไม่เพียงแค่การใช้งาน แต่รวมถึงความสบายและความสุขของผู้ใช้</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">6. Barrier-Free Design (การออกแบบที่ไม่มีสิ่งกีดขวาง) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> มุ่งเน้นการออกแบบที่ลดหรือขจัดอุปสรรคที่ขัดขวางการเข้าถึงของผู้ใช้ เช่น การออกแบบสิ่งแวดล้อมที่เหมาะกับผู้ใช้รถเข็นหรือผู้สูงอายุ</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">7. Accessible Design (การออกแบบที่เข้าถึงได้) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> สร้างสรรค์ผลิตภัณฑ์หรือบริการที่ผู้ใช้ทุกกลุ่มสามารถเข้าถึงได้ง่าย รวมถึงผู้ที่มีความบกพร่องทางกายภาพหรือทางประสาทสัมผัส</li>
          </ul>

          <ul class="list-disc p-5 ml-10 "> <span className="font-semibold  text-black ml-5 ">8. Adaptable Design (การออกแบบที่ปรับเปลี่ยนได้) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> การออกแบบที่สามารถปรับแต่งให้เข้ากับความต้องการที่หลากหลายของผู้ใช้ หรือปรับเปลี่ยนตามสภาพแวดล้อมที่เปลี่ยนไป</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">9. Transgenerational Design (การออกแบบสำหรับหลายช่วงวัย) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> ออกแบบผลิตภัณฑ์และบริการที่สามารถใช้งานได้โดยผู้คนทุกช่วงวัย ตั้งแต่เด็กไปจนถึงผู้สูงอายุ</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-black ml-5 ">10. Design for a Broader Average (การออกแบบที่เหมาะสมกับคนส่วนใหญ่) :</span> 
          <li className="mb-2 text-gray-600 ml-10 mt-2" ><span className="font-semibold  text-black ">คำอธิบาย</span> มุ่งเน้นการออกแบบที่ไม่เจาะจงไปที่กลุ่มใดกลุ่มหนึ่ง แต่สามารถตอบสนองความต้องการของกลุ่มคนทั่วไปในสังคม </li>
          </ul>
          
        
          




          
<ul class="list-disc p-5 mt-20 mb-4 ml-6"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://www.canva.com/design/DAFl4y4lvDc/u3kAjwtMk4H_pD95aLc5mA/view?utm_content=DAFl4y4lvDc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
<li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://pubhtml5.com/ccmq/brlm/%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%84%E0%B8%99_Universal_Design-_UD/" target="_blank">Universal Design(หนังสือ)</a></li>
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://medium.com/@yay.bouu/wcag-2-2-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3-%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%99%E0%B8%97%E0%B8%B3-ux-ui-%E0%B8%84%E0%B8%A7%E0%B8%A3%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B9%E0%B9%89-35b70dbc9b3f" target="_blank">Web Content Accessibility (WCAG) คืออะไร</a></li>     
</ul>

<div className="relative mt-10">
  <ul className="flex justify-between items-center relative">
    <li className="absolute left-0 bottom-0">
      <Link href="/Learn/Evaluation" className="bg-gray-300 hover:bg-blue-500 hover:text-white px-3 py-1 rounded ">
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



