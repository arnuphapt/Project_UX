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
            className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >3. Value Proposition Canvas
            </button>
            {/* แสดง Submenu ตลอดเวลา */}
          <ul className="pl-8 mt-2 space-y-2">
          <li>
            <Link
            href="/Learn/Value_Proposition_Canvas/Customer_Journey_Maps_in_UX"
            className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white"
            >1. Customer Journey Maps in User Experience
            </Link>
          </li>  
          <li>
            <Link
            href="/Learn/Value_Proposition_Canvas/VPC"
            className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
           >2. Value Proposition Canvas
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


    <div className="flex-1 p-6">
    <div className="max-w-7xl mx-auto p-4">
    
      <h2 className="text-4xl font-semibold mb-4 mt-20">Customer Journey for Enhancing UX</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        
        <img src="/CXUX.png" alt="CXUX" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6 mt-10 border-solid border-2 border-black rounded-lg " />

          <h3 className="text-2xl font-semibold mb-2 mt-12">Customer Journey for Enhancing UX</h3>
          
          <h3 className="text-xl  mb-2 mt-6 ml-10">Customer Journey คือการเดินทางของกลุ่มเป้าหมายตั้งแต่พบ
สินค้าหรือบริการค้นหาสินค้าหรือบริการไปจนถึงการซื้อสินค้าหรือบริการของเรา รายละเอียดนั้น สามารถดูได้ที่ภาพประกอบ</h3>
          <img src="/CTJ.png" alt="CTJ" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
        
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold ">1. การรับรู้ :</span> คือ การที่กลุ่มเป้าหมายของเราพบเห็นสินค้าของเราหรือโฆษณาสินค้าหรือบริการของเรา</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold ">2. การค้นหาข้อมูล :</span> คือ การที่กลุ่มเป้าหมายเริ่มสนใจสินค้าหรือบริการของเราแล้วค้นหาสินค้าหรือบริการนั้นจากเว็บของเรา, Fanpageของเราหรือจาก SearchEngine เพื่ออยากรู้รายละเอียดเพิ่มเติมและนำไปสู่การปิดการขาย</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold ">3. ตัดสินใจซื้อ :</span> การที่กลุ่มเป้าหมายอยากที่จะซื้อสินค้าหรือบริการของเราแล้ว โดยอาจจะซื้อจากทางเว็บไซต์ หรือหน้าร้าน หรือทางที่ลูกค้าสะดวก</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold ">4. ซื้อซ้ำ :</span> คือการที่ที่ลูกค้ากลุ่มเป้าหมาย ประทับใจในสินค้าหรือบริการของเรา แล้วยินดีที่จะซื้อสินค้าหรือบริการของเราอีก</h3>

        <h3 className="text-2xl font-semibold mb-2 mt-12">Customer Journey Maps</h3>
        <img src="/CJM.png" alt="Customer Journey Maps" className="h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10" />
        <iframe 
    className="w-full max-w-2xl h-96 mt-10 mb-10 m-auto" 
    src="https://www.youtube.com/embed/gfVq-DBa17s" 
    title="YouTube video" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
        </iframe>
        <ul className="list-disc  ml-10  mb-4"> <span className="font-semibold  text-black"> สำคัญอย่างไร</span> 
        <li className="mb-2 ml-6 " >ผู้บริโภคของเราเขาได้มาสัมผัสกับสินค้าบริการ หรือ การตลาดที่เราได้นำเสนอออกไปอย่างไรบ้าง อะไรคือจุดที่เขารู้ สึกประทับใจ อะไรคือจุดที่เขารู้สึกไม่พอใจกับบริการของเรา</li>
        <li className="mb-2 ml-6 " >Harvard Business Review ในปี 2010 (“Using CustomerMaps to Improve Customer Experience” by Adam
Richardson) ได้ให้คำนิยาม Customer Journey Map ว่าเป็น idea ง่ายๆ อย่างเช่น diagram ที่แสดงให้เห็นว่าผู้บริโภคได้เข้ามาสัมผัสองค์กรของคุณอย่างไรบ้าง ไม่ว่าจะเป็น สินค้า บริการ การเข้าไปสัมผัสในโลกของOnline การใช้บริการในร้านค้า ซึ่งทั้งหมดนี้ จะเรียกว่า Touch Points ที่ลูกค้ามาสัมผัสกับเรา ยิ่งถ้าเราออกแบบ Touch Points ยิ่งมากเท่าไหร่ การเข้าใจ Customer Journey Map ก็จะมีความซับซ้อนมากยิ่งขึ้น</li>
</ul>
<img src="/24.png" alt="Customer Journey Maps" className="h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10" />
<img src="/25.png" alt="Customer Journey Maps" className="h-auto w-full max-w-5xl mx-auto p-7  mb-6 mt-10" />
          
<ul className="list-disc p-5 mt-20 mb-4"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://drive.google.com/file/d/1DoA0a41RPTgTWFHsGUbQD_LqE7t5Zln_/view" target="_blank">Customer Journey Maps (slide)</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.booksfree.org/wp-content/uploads/2022/03/UX-Strategy_-How-to-Devise-Innovative-Digital-Products-that-People-Want_booksfree.org_.pdf?fbclid=IwAR2Kj0oiLC6TxJOM3xEjb8X8JeEFxVzJf5caiAdORwbDQSrwKzwqsUQiI4o" target="_blank">ตำรา Customer Journey Maps หน้า 244(PDF 258)</a></li>
          
          
</ul>





</div>
</div>
</div>
</div>
  );
}



