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
            className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
          >
    3. Value Proposition Canvas <span className="ml-2">▼</span>
  </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX"
                    className="block px-4 py-2 rounded-lg   hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 1. Customer Journey Maps in User Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/VPC"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. Value Proposition Canvas
                  </Link>
                </li>
              </ul>
            
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
         onClick={() => {
          toggleSubmenu("ValuePropositionCanvas");
          window.location.href = "/Learn/Value_Proposition_Canvas"; // เปลี่ยนเส้นทาง
        }}
            className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
          >
    3. Value Proposition Canvas <span className="ml-2">▼</span>
  </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX"
                    className="block px-4 py-2 rounded-lg   hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 1. Customer Journey Maps in User Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Learn/Value_Proposition_Canvas/VPC"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. Value Proposition Canvas
                  </Link>
                </li>
              </ul>
            
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

      <div className="flex-1 p-6 ml-18">
    <div className="max-w-7xl mx-auto p-4">
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h3 className="text-2xl font-semibold mb-2 mt-8 ml-6">2. Value Proposition Canvas</h3>
          
        <h3 className="text-xl  mb-2 mt-4 ml-10">ช่วยให้การตลาดเจาะลึกกลุ่มเป้าหมาย กลุ่มใหม่ กลุ่มใหม่ในกลุ่มใหม่ และลูกค้าที่มีหลายระดับได้อย่างแม่นยำ (CUSTOMER SEGMENT) เห็นคุณค่าทางธุรกิจได้ชัดเจน</h3>
        <img src="/VPC.png" alt="VPC" className=" h-auto w-full max-w-6xl mx-auto p-7  mb-6 mt-10  " />
        <h3 className="text-xl  mb-2 mt-4 ml-10">สร้างคุณค่า ที่ตอบสนองความต้องการ และ เหนือความคาดหมาย</h3>
       
        <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">1. ลูกค้าคือใคร เช่น ประกอบอาชีพอะไร :</span> 
          <li className="mb-2 text-gray-600 ml-10"> การระบุว่าลูกค้าคือใครสำคัญมาก เพราะจะช่วยให้คุณเข้าใจพฤติกรรม ความต้องการ และลักษณะเฉพาะของพวกเขา</li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ตัวอย่าง :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">ลูกค้าอาจเป็นคนทำงานออฟฟิศ วัย 25-40 ปี</li>
          <li class="before:content-['-'] before:mr-2">เป็นนักเดินทางที่ต้องการที่พักราคาประหยัด</li>
          <li class="before:content-['-'] before:mr-2">หรือเป็นเจ้าของธุรกิจขนาดเล็กที่มองหาโซลูชันด้านการตลาด</li>

          </ul>
          </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2. ลูกค้าที่คุณพูดถึง เดือดร้อนเรื่องอะไรอยู่ :</span> 
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">คุณต้องเข้าใจ Pain Points หรือปัญหาที่ลูกค้ากำลังเผชิญ เช่น</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">ใช้เวลาในการจองที่พักมากเกินไป</li>
          <li class="before:content-['-'] before:mr-2">ไม่มีช่องทางที่ง่ายในการสั่งซื้อสินค้าราคาประหยัด</li>
          <li class="before:content-['-'] before:mr-2">หรือรู้สึกว่าเครื่องมือที่ใช้งานปัจจุบันซับซ้อนเกินไป</li>
          </ul>
          </li>
          <li className="mb-2 text-black-600 ml-10 font-semibold"> ยิ่งเข้าใจปัญหาของลูกค้าอย่างชัดเจน คุณจะสามารถออกแบบสินค้า/บริการเพื่อช่วยพวกเขาได้ดียิ่งขึ้น</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">3. ลูกค้าอยากได้อะไรเพิ่มเติมในชีวิตบ้าง :</span> 
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ส่วนนี้คือการระบุ Gains หรือสิ่งที่ลูกค้าต้องการเพิ่มเติม เช่น</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">ความสะดวกสบาย</li>
          <li class="before:content-['-'] before:mr-2">ราคาที่เหมาะสม</li>
          <li class="before:content-['-'] before:mr-2">การใช้งานที่ง่ายขึ้น</li>
          <li class="before:content-['-'] before:mr-2">หรือประสบการณ์ที่ดีขึ้น</li>
          
          </ul>
          </li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ตัวอย่าง :</span> </li>
          <li class="ml-20 ">ลูกค้าอาจอยากได้แอปพลิเคชันที่ช่วยจองโรงแรมได้ในไม่กี่คลิก</li>
          <li class="ml-20 ">หรือต้องการสินค้าที่ช่วยประหยัดเวลาในการทำงาน</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">4. สินค้า/บริการที่คุณจะนำเสนอ มันมีลักษณะอย่างไร :</span> 
          <li className="mb-2 text-gray-600 ml-10"> ต้องกำหนดว่า Value Proposition หรือคุณค่าที่สินค้าของคุณนำเสนอคืออะไร</li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ตัวอย่าง :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">"บริการของเราช่วยให้จองโรงแรมได้ใน 3 คลิก"</li>
          <li class="before:content-['-'] before:mr-2">"เรานำเสนอสินค้าคุณภาพดีในราคาที่ทุกคนเอื้อมถึง"</li>
          <li class="before:content-['-'] before:mr-2">"ระบบของเราช่วยลดความยุ่งยากในการจัดการข้อมูลลูกค้า"</li>

          </ul>
          </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">5. สินค้าหรือบริการนั้นไปช่วยลดปัญหาอะไร :</span> 
          <li className="mb-2 text-gray-600 ml-10"> สินค้าหรือบริการของคุณต้องตอบโจทย์ Pain Points ที่ลูกค้ามี</li>
          <li className="mb-2 text-gray-600 ml-10"><span className="font-semibold  text-black ">ตัวอย่าง :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">"ลดขั้นตอนที่ยุ่งยาก"</li>
          <li class="before:content-['-'] before:mr-2">"ช่วยประหยัดเวลาและเงิน"</li>
          <li class="before:content-['-'] before:mr-2">"เพิ่มความมั่นใจหรือความสะดวกสบายให้ลูกค้า"</li>

          </ul>
          </li>
          </ul>
         
          <img src="/VPC_forUber.png" alt="VPC_forUber" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10  " />
          <img src="/VPC_Taxi.png" alt="VPC_forTaxi" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10  " />
       
        
          
<ul className="list-disc p-5 mt-20 mb-4 ml-6"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://drive.google.com/file/d/1TDhO7ExRsfZHxMSzotQOEkAMr07dH7lq/view?t=1s" target="_blank">VPC(VDO)</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://martechmafia.net/strategy/from-business-model-canvas-to-value-proposition-design/" target="_blank">ตัวอย่าง VPC</a></li>
          
          
</ul>
{/* Pagination Section */}
<div className="flex justify-center mt-10 mb-10">
  <ul className="flex space-x-2">
  <li>
      <Link href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX" className="bg-gray-300 px-3 py-1 rounded hover:bg-blue-500 hover:text-white">
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



