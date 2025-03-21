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
                    className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. The Psychology Of Color In Marketing And Branding
                  </Link>
                </li>
		<li>
                  <Link
                    href="/Learn/Graphics_Design/Color_Theory"
                    className="block px-4 py-2 rounded-lg  bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
                    className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <span className="ml-2">►</span> 2. The Psychology Of Color In Marketing And Branding
                  </Link>
                </li>
		<li>
                  <Link
                    href="/Learn/Graphics_Design/Color_Theory"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
    
      
      <div className="max-w-7xl mx-auto  bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h2 className="text-2xl font-bold mb-4 m-6 text-center text-blue-600">3. COLOR THEORY</h2>
      

<img src="https://lthscomputerart.weebly.com/uploads/9/8/2/3/9823286/7397783_orig.jpg" alt="Principles of Graphics Design" className=" h-auto w-full max-w-xl mx-auto p-7  mb-20 mt-10 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300" />
<p className="text-gray-700 mb-4 ml-10">หรือทฤษฎีสี คือการศึกษาวิธีการที่สีต่างๆ สามารถทำงานร่วมกันและส่งผลต่อความรู้สึก การรับรู้ และการรับข้อมูลในงานออกแบบ โดยการใช้สีในทางที่ถูกต้องสามารถสร้างความสมดุลและความสวยงาม</p>
<p className="text-gray-600 mb-4 ml-10" >สีเป็นองค์ประกอบที่สำคัญในงานออกแบบและศิลปะ เพราะมีผลกระทบต่อความรู้สึกและอารมณ์ของผู้รับชม ในทฤษฎีสี (Color Theory) มีหลายแนวทางในการจัดกลุ่มสีเพื่อนำมาใช้ในงานออกแบบ</p>






<div className="max-w-7xl mx-auto  bg-gray-100 shadow-md rounded-lg p-6   mt-10">
<h2 className="text-xl text-blue-500 mb-4 ml-10 mt-10" >สามารถอธิบายประเภทของการใช้สีในทฤษฎีสีได้ดังนี้ : </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Monochromatic */}
  <ul className="list-disc p-5 ml-6">
    <span className="font-semibold text-black">Monochromatic (โมโนโครม) :</span>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">คำอธิบาย: </span>การใช้สีเพียงสีเดียว แต่มีความแตกต่างในค่า (value) หรือความอิ่มตัว (saturation) ของสี เช่น สีฟ้าสามารถใช้เฉดสีฟ้าเข้ม สีฟ้าอ่อน หรือสีฟ้าเทา
    </li>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">ผลกระทบ: </span>สร้างความรู้สึกสงบและกลมกลืน ช่วยเน้นอารมณ์ที่เฉพาะเจาะจง
    </li>
  </ul>

  {/* Analogous */}
  <ul className="list-disc p-5 ml-6">
    <span className="font-semibold text-black">Analogous (อะนาล็อกัส) :</span>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">คำอธิบาย: </span>การใช้สีที่อยู่ติดกันบนวงล้อสี เช่น สีเขียว, เขียวเหลือง, และเหลือง
    </li>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">ผลกระทบ: </span>สร้างความรู้สึกของความเป็นหนึ่งเดียวกัน และช่วยให้เกิดความกลมกลืน สื่อถึงความสงบและเป็นธรรมชาติ
    </li>
  </ul>

  {/* Complementary */}
  <ul className="list-disc p-5 ml-6">
    <span className="font-semibold text-black">Complementary (คอมเพล็มเมนทารี) :</span>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">คำอธิบาย: </span>การใช้สีที่ตรงข้ามกันบนวงล้อสี เช่น สีแดงและสีเขียว
    </li>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">ผลกระทบ: </span>สร้างความตัดกันที่เด่นชัด สื่อถึงความเข้มข้นและพลัง
    </li>
  </ul>

  {/* Split Complementary */}
  <ul className="list-disc p-5 ml-6">
    <span className="font-semibold text-black">Split Complementary (สปลิต คอมเพล็มเมนทารี) :</span>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">คำอธิบาย: </span>ประกอบด้วยสีหนึ่งและสีที่อยู่ข้างเคียงกับสีที่ตรงข้าม เช่น สีฟ้าและสีเหลือง-ส้ม, สีแดง-ส้ม
    </li>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">ผลกระทบ: </span>สร้างความตัดกันที่ไม่เข้มข้นเกินไป ทำให้ดูน่าสนใจและมีความหลากหลาย
    </li>
  </ul>

  {/* Triadic */}
  <ul className="list-disc p-5 ml-6">
    <span className="font-semibold text-black">Triadic (ไตรดิแอด) :</span>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">คำอธิบาย: </span>การใช้สีสามสีที่อยู่ห่างกันเท่าๆ กันบนวงล้อสี เช่น สีแดง, สีน้ำเงิน, และสีเหลือง
    </li>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">ผลกระทบ: </span>สร้างความสนุกสนานและความมีชีวิตชีวา ช่วยให้เกิดความหลากหลายและสมดุลในงานออกแบบ
    </li>
  </ul>

  {/* Tetradic */}
  <ul className="list-disc p-5 ml-6">
    <span className="font-semibold text-black">Tetradic (เทตระดิก) :</span>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">คำอธิบาย: </span>การใช้สีสี่สี โดยแบ่งเป็นคู่ complementary สองคู่ เช่น สีฟ้า, สีส้ม, สีเหลือง, และสีม่วง
    </li>
    <li className="mb-2 text-gray-700 ml-10">
      <span className="font-semibold text-gray-900">ผลกระทบ: </span>สร้างความหลากหลายและความลึกซึ้งในสี สามารถสร้างความตัดกันที่เด่นชัดหรือความกลมกลืนได้ ขึ้นอยู่กับการจัดสัดส่วนของสี
    </li>
  </ul>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 p-5 mt-20 ml-20">
  {/* Image 1 */}
  <img
    src="https://images.squarespace-cdn.com/content/v1/5bfc8dbab40b9d7dd9054f41/1547527084665-6CYDUIF4MHDDCQODVVO4/color-guide.png"
    alt="Principles of Graphics Design"
    className="h-auto w-full max-w-xl mx-auto rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
  />

  {/* Image 2 */}
  <img
    src="https://i.ytimg.com/vi/cuF3-MgMa44/maxresdefault.jpg"
    alt="Principles of Graphics Design"
    className="h-auto w-full max-w-xl mx-auto rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
  />

  {/* Image 3 */}
  <img
    src="https://buildingtheblog.com/wp-content/uploads/2020/05/women-men-favorite-colors.jpg"
    alt="Principles of Graphics Design"
    className="h-auto w-full max-w-xl mx-auto rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
  />

  {/* Image 4 */}
  <img
    src="https://buildingtheblog.com/wp-content/uploads/2020/05/least-favorite-colors-by-gender-1.jpg"
    alt="Principles of Graphics Design"
    className="h-auto w-full max-w-xl mx-auto rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
  />
</div>


{/* Pagination Section */}
<div className="relative mt-10">
  <ul className="flex justify-between items-center relative">

    <li className="absolute left-0 bottom-0">
      <Link href="/Learn/Graphics_Design/Psychology_Of_Color" className="bg-gray-300 hover:bg-blue-500 hover:text-white px-3 py-1 rounded ">
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


