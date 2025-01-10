
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Learn() {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  return(
<div className="flex">
      {/* Sidebar */}
      <div className="  fixed w-64 bg-white h-full  p-4 mt-10  ">
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
              onClick={() => {
                toggleSubmenu("Graphics_Design");
                window.location.href = "/Learn/Graphics_Design/"; // เปลี่ยนเส้นทาง
              }}
              className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors w-full text-left"
            >
              5. Principles of Graphics Design
            </button>
            
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    href="/Learn/Graphics_Design/Layout_and_Composition"
                    className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
                    className="block px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-white transition-colors"
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
      <div className="flex-1 p-6 ml-18">
    <div className="max-w-7xl mx-auto p-4">
    
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h2 className="text-3xl font-semibold mb-4 mt-10 ml-6"> 1. Layout And Composition</h2>
      <p className="text-gray-600 mb-12 ml-10"> คือหลักการพื้นฐานในงานออกแบบ (Design) ที่เกี่ยวข้องกับการจัดองค์ประกอบต่างๆ ในงานให้มีความสมดุล น่าสนใจ และสื่อสารได้อย่างมีประสิทธิภาพ</p>
        <h3 className="text-xl font-semibold mb-2 ml-10">  สามารถแบ่งเป็น 3 หัวข้อได้แก่</h3>
          <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/2056/posts/34238/image/19-10-04%20ART%20The%20Principles%20of%20DesignArtboard%201%20copy.jpg" alt="Principles of Graphics Design" className=" h-auto w-full max-w-3xl mx-auto p-5 mb-6" />
          
          <h3 className="text-l font-semibold mb-2 ml-10">1. TYPOGRAPHY </h3>
          <h3 className="text-l  text-gray-500 font-semibold mb-2 ml-4 ">ศิลปะและเทคนิคของการจัดวางตัวอักษรให้สวยงามและอ่านง่ายในงานออกแบบและสิ่งพิมพ์ </h3>
          <h3 className="text-l font-semibold mb-2 ml-10">2. LAYOUT AND COMPOSITION </h3>
          <h3 className="text-l  text-gray-500 font-semibold mb-2 ml-4 ">การจัดวางองค์ประกอบต่างๆ ในงานออกแบบ </h3>
          <h3 className="text-l font-semibold mb-2 ml-10">3. COLOR </h3>
          <h3 className="text-l  text-gray-500 font-semibold mb-2 ml-4 ">การใช้สีในงานออกแบบเพื่อสร้างอารมณ์ ความรู้สึก และดึงดูดความสนใจ </h3>
          <h3 className="text-2xl font-semibold ml-10 mt-20">1.1 TYPOGRAPHY </h3>
          <img src="https://miro.medium.com/v2/resize:fit:4000/1*W_2gxhQsao1JR_Y08Z8dXw.png" alt="Design basics" className=" h-auto w-full max-w-3xl mx-auto p-7 mt-10 mb-10  " />
          <h3 className="text-xl font-semibold mb-2 ml-10">มาทำความรูจักกับ TYPOGRAPHY กัน </h3>
          <h3 className="text-l font-semibold mb-2 ml-10 mt-6">TYPOGRAPHY คืออะไร ? </h3>
          <p className="text-gray-600 mb-4 ml-10" >Typography เป็นหนึ่งในหลักการที่สำคัญของการออกแบบกราฟิก ซึ่งเกี่ยวข้องกับการจัดวางและเลือกใช้ตัวอักษรในงานออกแบบเพื่อสร้างความสวยงามและการสื่อสารที่มีประสิทธิภาพ  </p>
          <h3 className="text-xl font-semibold mb-2 ml-10 mt-10 ">Concrpts for professional การใช้ตัวอักษรอย่างมืออาชีพ</h3>
          <ul class="list-disc p-5">
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900 ">เลือกฟอนต์ (Font Selection): </span> การเลือกฟอนต์ที่เหมาะสมสามารถมีผลต่อความรู้สึกและอารมณ์ของงานออกแบบ ฟอนต์แต่ละประเภทมีลักษณะเฉพาะที่สื่อความหมายต่างกัน </li>
          <img src="https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/9108229/og_image/optimized/image_13__2_-83c5503bc85e35c3f05f0b596573e811.png" alt="Design basics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-6  " />
          
          <li className="mb-2  text-gray-700 ml-10"> <span className="font-semibold text-gray-900">ขนาดตัวอักษร (Font Size):</span> ขนาดตัวอักษรมีผลต่อความอ่านง่าย การเลือกขนาดที่เหมาะสมช่วยให้ข้อความชัดเจนและเข้าถึงได้ง่าย</li>
          <img src="https://lizzitremayne.com/wp-content/uploads/2017/11/typographic-scale.png" alt="Design basics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-6  " />
         
          <li className="mb-2  text-gray-700 ml-10"><span className="font-semibold text-gray-900">ระยะห่างระหว่างตัวอักษร (Kerning and Tracking): </span> และการจัดการระยะห่างระหว่างกลุ่มตัวอักษร (Tracking) เป็นสิ่งสำคัญในการสร้างความสมดุลในข้อความ ซึ่งช่วยให้การอ่านง่ายขึ้น</li>
          <li className="mb-2  text-gray-700 ml-10"><span className="font-semibold text-gray-900">Leading (หรือ line spacing): </span> คือการกำหนดระยะห่างระหว่างบรรทัดในข้อความ ซึ่งมีบทบาทสำคัญในการทำให้ข้อความอ่านง่ายและมีความน่าสนใจ โดยการเลือกใช้ leading ที่เหมาะสมสามารถส่งผลกระทบต่อประสบการณ์การอ่านและความชัดเจนของเนื้อหาได้</li>
          <img src="https://www.webucator.com/app/github-image/?path=courseware-adobe-photoshop/kerning-tracking-leading.png" alt="Design basics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-6  " />
          
          <li className="mb-2  text-gray-700 ml-10" ><span className="font-semibold text-gray-900">การจัดเรียงข้อความ (Text Alignment): </span> การจัดเรียงข้อความในรูปแบบต่างๆ เช่น ชิดซ้าย ชิดขวา หรือกึ่งกลาง จะมีผลต่อความรู้สึกและลำดับการอ่าน</li>
          <img src="https://cdn.prod.website-files.com/64fa82cbdeed167ebaefef84/64fa86b851d65e51f3ed6ace_5f6411bb6e5d511ff94f2328_FuWR-craDJ4uPxPnO0D10C18TzduYIvptF_V_uzbeawu8wdfimLhuESvQUiDzqIAulcx8O7-SJV7B70FxcIYrO9-Q7EsOytx45ABBb2HGTPedokZLvaXcUo6zWv_WkCSqGRj8-li.jpeg" alt="Design basics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-6  " />
          
          <li className="mb-2  text-gray-700 ml-10"><span className="font-semibold text-gray-900">การเน้น (Emphasis): </span> การใช้ตัวหนา ตัวเอียง หรือสีที่แตกต่างในการเน้นข้อความสำคัญ ช่วยให้ผู้ชมสามารถแยกแยะข้อมูลที่สำคัญได้ง่ายขึ้น</li>
          <img src="https://ncfel2graphics.weebly.com/uploads/3/1/0/4/31042883/7487775_orig.png" alt="Design basics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-6  " />
         
          <li className="mb-2  text-gray-700 ml-10"><span className="font-semibold text-gray-900">การสร้างลำดับชั้น (Hierarchy): </span> การใช้ขนาด ฟอนต์ และสีที่แตกต่างกันเพื่อสร้างลำดับชั้นของข้อมูล ทำให้ผู้ชมสามารถเข้าใจว่าข้อมูลไหนสำคัญกว่าหรือมีความสัมพันธ์กันอย่างไร</li>
          <img src="https://i2.wp.com/www.zekagraphic.com/wp-content/uploads/2021/03/Typographic-Hierarchy-Levels-in-Graphic-Design.jpg?fit=1600%2C800&ssl=1" alt="Design basics" className=" h-auto w-full max-w-xl mx-auto p-7  mb-6  " />
          
          <li className="mb-2  text-gray-700 ml-10"><span className="font-semibold text-gray-900">ความสอดคล้อง (Consistency): </span> การรักษาความสอดคล้องในการใช้ฟอนต์และการจัดวางจะช่วยให้การออกแบบดูเป็นมืออาชีพและสร้างแบรนด์ที่แข็งแกร่ง</li>
          <img src="https://www.ikagency.com/wp-content/uploads/2024/04/Typographu-consistency-checklist.jpg" alt="Design basics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6  " />
          
          </ul>

          <h3 className="text-2xl font-semibold ml-6 mt-20">1.2 LAYOUT AND COMPOSITION </h3>
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_7yNV1l6F0_GOTsif76Ia2geto4Dl7xTFT_azIrjSp9QYJvJfanoM7Gf2m0_d8LZ79qOhsF2yYlgDXTLoh3hr_FFggnQueqBexHcnAffoeDW5CgOGgCihwBKWUhON6C_C8spJ3XGn6Kk/s16000/layout+cover.jpg" alt="Design basics" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6  " />
          <p className="text-gray-600 mb-4 ml-10" >Layout and Composition ในหลักการออกแบบกราฟิกมีความสำคัญอย่างยิ่งต่อการสร้างงานที่น่าสนใจและมีประสิทธิภาพ เพราะการจัดเรียงและการจัดองค์ประกอบอย่างถูกต้องช่วยให้การสื่อสารข้อมูลเกิดขึ้นได้อย่างมีประสิทธิภาพ นอกจากนี้ยังช่วยสร้างความรู้สึกและประสบการณ์ที่ดีให้กับผู้ชม  </p>
          <h3 className="text-xl font-semibold mb-4 mt-10 ml-10">Think like a designer ( คิดเหมือนนักออกแบบ ) </h3>
          <img src="https://sophiegleasonviscom.wordpress.com/wp-content/uploads/2015/06/principles-of-design-grey-2880px_paperleaf.jpg" alt="Design basics" className=" h-auto w-full max-w-5xl mx-auto p-7  mb-6  " />

          <ul class="list-disc p-5">
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">ความใกล้ชิด (Proximity) : </span> การเลือกฟอนต์ที่เหมาะสมสามารถมีผลต่อความรู้สึกและอารมณ์ของงานออกแบบ ฟอนต์แต่ละประเภทมีลักษณะเฉพาะที่สื่อความหมายต่างกัน </li>
          
          
          <li className="mb-2  text-gray-700 ml-10"> <span className="font-semibold text-gray-900">พื้นที่ว่าง (White Space) : </span> ขนาดตัวอักษรมีผลต่อความอ่านง่าย การเลือกขนาดที่เหมาะสมช่วยให้ข้อความชัดเจนและเข้าถึงได้ง่าย</li>
          
         
          <li className="mb-2  text-gray-700 ml-10" ><span className="font-semibold text-gray-900">ความตัดกัน (Contrast) :</span> การจัดเรียงข้อความในรูปแบบต่างๆ เช่น ชิดซ้าย ชิดขวา หรือกึ่งกลาง จะมีผลต่อความรู้สึกและลำดับการอ่าน</li>
         
          
          <li className="mb-2  text-gray-700 ml-10"><span className="font-semibold text-gray-900">การทำซ้ำ (Repetition) :</span> การใช้ตัวหนา ตัวเอียง หรือสีที่แตกต่างในการเน้นข้อความสำคัญ ช่วยให้ผู้ชมสามารถแยกแยะข้อมูลที่สำคัญได้ง่ายขึ้น</li>
          
         
          <li className="mb-2  text-gray-700 ml-10"><span className="font-semibold text-gray-900">การจัดตำแหน่ง (Alignment) :</span> คือการจัดเรียงองค์ประกอบให้มีการเชื่อมโยงกันในแนวเดียวกัน ไม่ว่าจะเป็นในแนวตั้งหรือแนวนอน การจัดตำแหน่งที่ดีช่วยสร้างความเป็นระเบียบและทำให้ผลงานดูเป็นมืออาชีพ การจัดตำแหน่งยังช่วยให้ผู้ชมสามารถติดตามและเข้าใจเนื้อหาได้ง่ายขึ้น</li>
          
          
          </ul>

          <h3 className="text-2xl font-semibold ml-6 mt-20">1.3 COLOR </h3>
          <img src="https://klizos.com/wp-content/uploads/COLOR-PSYCHOLOGY-IN-WEB-DESIGN_d2-964x1024.jpg" alt="Design basics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
          <p className="text-gray-600 mb-4 ml-10" >การใช้จิตวิทยาของสีในการออกแบบเว็บไซต์สามารถเพิ่มประสิทธิภาพและประสบการณ์ของผู้ใช้ได้ โดยแต่ละสีมีความหมายและอารมณ์ที่แตกต่างกัน ซึ่งสามารถกระตุ้นความรู้สึกและพฤติกรรมของผู้เข้าชมได้</p>
          
          <ul class="list-disc p-5"> <span className="font-semibold text-red-600">สีแดง (Red) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> ตื่นเต้น, กระตุ้น </li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> สามารถใช้เพื่อดึงดูดความสนใจ เช่น ปุ่ม "ซื้อเดี๋ยวนี้" หรือส่วนที่สำคัญในหน้าเว็บ</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold text-blue-600">สีน้ำเงิน (Blue) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> สงบ, เชื่อถือได้ </li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> เหมาะสำหรับเว็บไซต์ที่ต้องการสร้างความเชื่อมั่น เช่น ธนาคารหรือบริการทางการเงิน</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold text-green-600">สีเขียว (Green) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> สดชื่น, เป็นธรรมชาติ</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> มักใช้ในเว็บไซต์ที่เกี่ยวกับสุขภาพและสิ่งแวดล้อม หรือเพื่อสื่อถึงความเจริญเติบโต</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold text-yellow-600">สีเหลือง (Yellow) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> ร่าเริง, กระตุ้น</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> ใช้เพื่อดึงดูดความสนใจและสร้างบรรยากาศที่เป็นบวก เช่น เว็บไซต์ที่เน้นความสนุกสนาน</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold text-orange-600">สีส้ม (Orange) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span> กระตุ้น, เป็นมิตร</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> เหมาะสำหรับการส่งเสริมการขายหรือกิจกรรมพิเศษ</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold text-purple-600">สีม่วง (Purple) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span>  หรูหรา, ลึกลับ</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> สามารถใช้ในเว็บไซต์ที่ต้องการสื่อถึงความหรูหราหรือความคิดสร้างสรรค์</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold text-black">สีดำ (Black) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span>  ทันสมัย, มีอำนาจ</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> เหมาะสำหรับเว็บไซต์ที่ต้องการสร้างภาพลักษณ์ที่หรูหรา เช่น แบรนด์สินค้าหรูหรา</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-500"> สีขาว (White) :</span> 
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">อารมณ์ : </span>  สะอาด, เรียบง่าย</li>
          <li className="mb-2 text-gray-700 ml-10"> <span className="font-semibold text-gray-900">การใช้งาน : </span> ใช้เพื่อสร้างความรู้สึกเรียบง่ายและให้ข้อมูลที่ชัดเจน</li>
          </ul>

          

          </div>  
          </div>
          </div>
          </div>
  );
}


