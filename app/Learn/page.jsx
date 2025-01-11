
'use client';
import { useState } from "react";
import React from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
export default function Learn() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className=" bg-gradient-to-tr from-cyan-500 to-blue-500 text-white py-16 px-8 text-center relative">
        <div className="max-w-4xl mx-auto">
        <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'User Experience Design',
    
  ]}
 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: '1.2' }}
        className="font-bold text-center break-words"
  
/>
          <p className="text-2xl font-semibold mb-6 mt-5">
            มาทำความรู้จักเนื้อหาในรายวิชา
          </p>
          <p className="text-xl mb-6">
          CP352002 : User Experience Design
          </p>
          <button 
            className="bg-black hover:bg-white text-white hover:text-black font-semibold py-2 px-4 rounded-lg shadow-md mt-6"
            onClick={() => document.getElementById("goals-section").scrollIntoView({ behavior: 'smooth' })}
          >เริ่มต้นการเรียนรู้
          </button>
        </div>
       
      </div>

      {/* About Section */}
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">About User Experience Design</h2>
            <p className="text-gray-700 mb-4">
            User Experience Design (UX Design) คือกระบวนการออกแบบที่มุ่งเน้นการสร้างประสบการณ์ที่ดีให้กับผู้ใช้งาน โดยคำนึงถึงความสะดวกสบาย, ความพึงพอใจ, และประสิทธิภาพในการใช้งานของผู้ใช้ ทั้งในแง่ของการใช้งานเว็บไซต์ แอปพลิเคชัน หรือผลิตภัณฑ์ดิจิทัลอื่นๆ UX Design ไม่ได้เน้นแค่ความสวยงาม 
            แต่ยังให้ความสำคัญกับฟังก์ชันการใช้งานที่เข้าใจง่ายและมีความสมูธในการใช้งาน ช่วยให้ผู้ใช้ได้รับประสบการณ์ที่ดีและไม่รู้สึกสับสนขณะใช้งานผลิตภัณฑ์ต่างๆ
            </p>
            
          </div>
          <div className="relative">
            <img
              src="/what_is_ux.jpg"
              alt="User Experience Design"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div id="goals-section" className="bg-gray-100 py-16 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">เนื้อหาภายในรายวิชา</h2>
        <p className="text-gray-700 mb-12">
          เนื้อหาที่นำมาจัดทำในเว็บไซต์นี้ เป็นเนื้อหาที่อยู่ใน E-learning KKU ในรายวิชา CP352002 : User Experience Design โดยได้รับการอนุญาตจากทางอาจารย์
          อุรฉัตร โคแก้ว อีกทั้งทางผู้พัฒนาได้นำเนื้อหามาปรับปรุงและสอดแทรกเนื้อหาใหม่เพิ่มเติม
          เพื่อเพิ่มคุณค่าและความสมบูรณ์ให้กับการเรียนรู้ โดยคำนึงถึงการนำเสนอที่มีความเข้าใจง่ายและเหมาะสมกับผู้เรียนในปัจจุบัน
          ทำให้สามารถเรียนรู้และนำความรู้ไปประยุกต์ใช้ในการออกแบบประสบการณ์ผู้ใช้ได้อย่างมีประสิทธิภาพและทันสมัย.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
  <h3 className="text-xl font-semibold text-blue-600 mb-2">Lecture1.  Introduction to course</h3>
  <Link href="Learn/Introduction_to_course">
    <img
      src="/banner_intro.png"
      alt="intro"
      className="w-full h-auto mb-4 cursor-pointer"
    />
  </Link>
  <p className="text-gray-700 mb-4">การแนะนำหลักสูตร</p>
  <ul className="list-disc list-inside text-gray-600 mb-4">
    <li>People in User experience (UX)</li>
    <li>How to Create UX Personas</li>
  </ul>
  <div className="mt-auto">
    <Link href="Learn/Introduction_to_course">
      <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
    </Link>
  </div>
</div>


          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Lecture2. UX Strategy : Business Model Canvas</h3>
            <Link href="Learn/Business_Model_Canvas">
              <img src="https://thewisdom.co/wp-content/uploads/2021/08/business-model-canvas-1024x714.jpg" alt="Business_Model_Canvas" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">เครื่องมือที่ช่วยวางแผนและออกแบบกลยุทธ์ทางธุรกิจ โดยเน้นการสร้างประสบการณ์ที่ตอบโจทย์ผู้ใช้งาน</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Business Model Canvas คืออะไร ?</li>
              <li>วิธีการวิเคราะห์ความสัมพันธ์</li>
            </ul>
            <div className="mt-auto">
              <Link href="Learn/Business_Model_Canvas">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Lecture3 UX Strategy : Value Proposition Canvas</h3>
            <Link href="Learn/Value_Proposition_Canvas">
              <img src="/VPC.png" alt="VPC" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">เครื่องมือที่ช่วยวิเคราะห์และพัฒนาความสัมพันธ์ระหว่างสินค้า/บริการของธุรกิจ (Value Proposition) และความต้องการของลูกค้า (Customer Segment)</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Customer Journey Maps in User Experience </li>
              <li>Value Proposition Canvas</li>
            </ul>
          <div className="mt-auto">
              <Link href="Learn/Value_Proposition_Canvas">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>
          {/* Card 4, 5, 6 */}
          {showMore && (
            <>
            <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Lecture4 UX Designer : Wireframe & Graphics</h3>
            <Link href="Learn/WireFrame&Graphics">
              <img src="https://cdn.careerfoundry.com/en/wp-content/uploads/old-blog-uploads/mid-fidelity-wireframe-for-a-mobile-app-1.jpg" alt="wireframe" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">คือเครื่องมือหรือแบบร่างที่ใช้ในการวางโครงสร้างและการออกแบบสำหรับเว็บไซต์, แอปพลิเคชัน หรือระบบดิจิทัลต่างๆ ก่อนที่จะเริ่มการพัฒนาเต็มรูปแบบ</p>
           
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>WireFrame และ Prototypes ต่างกันอย่างไร</li>
              <li>Step For WireFraming</li>
            </ul>
            <div className="mt-auto">
              <Link href="Learn/WireFrame&Graphics">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">Lecture5. Principles of Graphics Design</h3>
            <Link href="Learn/Graphics_Design">
              <img src="https://www.flottmanco.com/wp-content/uploads/2016/01/designprinciples.jpg" alt="Principles of Graphics Design" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">เรียนรู้หลักการพื้นฐานที่ใช้ในการสร้างงานออกแบบกราฟิก</p>
           
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Layout And Composition </li>
              <li>The Psychology Of Color In Marketing And Branding</li>
              <li>Color Theory</li>
            </ul>
            <div className="mt-auto">
              <Link href="Learn/Graphics_Design">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>
          

          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-red-600 mb-2">Lecture6. Seven Principles</h3>
            <Link href="Learn/7_Principles">
              <img src="https://media.licdn.com/dms/image/C4D12AQGgET1oMhCJUA/article-cover_image-shrink_600_2000/0/1520179633562?e=2147483647&v=beta&t=d3Ip2NRdiXGEUO2LXRm3EIjuXITNCZV1_S5HIicIuPo" alt="Seven Principles" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">เรียนรู้หลักการทั้งเจ็ดที่ช่วยทำให้เว็บไซต์ของคุณมีความน่าสนใจมากขึ้นโดย ดร. ซูซาน ไวน์เชงค์:</p>
           
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>7 หลักการทำให้เว็บไซต์ของคุณน่าสนใจยิ่งขึ้น: </li>
            
            </ul>
            <div className="mt-auto">
              <Link href="Learn/7_Principles">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>
          

          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Lecture7. Eight Golden Rules</h3>
            <Link href="Learn/8_GoldenRules">
              <img src="https://media.licdn.com/dms/image/D5612AQFCRV_XF5lPcA/article-cover_image-shrink_600_2000/0/1704279783390?e=2147483647&v=beta&t=PjNrFwDQOjt0_flf3dJ3Wc-PqULprgspV2wbINzDAQI" alt="Eight Golden Rules" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">ปฏิบัติตาม "กฎทอง 8 ประการในการออกแบบอินเทอร์เฟซ" ของ Ben Shneiderman หากคุณต้องการออกแบบอินเทอร์เฟซผู้ใช้ที่ยอดเยี่ยม</p>
           
            <ul className="list-disc list-inside text-gray-600 mb-4">
             
            
            </ul>
            <div className="mt-auto">
              <Link href="Learn/8_GoldenRules">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-lime-600 mb-2">Lecture8. Evaluation</h3>
            <Link href="Learn/Evaluation">
              <img src="https://splitmetrics.com/wp-content/uploads/2016/07/v5.png" alt="Evaluation" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">ขั้นตอนในการตรวจสอบและวัดผลการออกแบบหรือฟังก์ชันการทำงานของระบบเพื่อให้แน่ใจว่าเหมาะสมกับผู้ใช้และบรรลุเป้าหมายที่ตั้งไว้ </p>
           
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>A/B Testing. </li>
              <li>Heuristic Evaluation. </li>
            </ul>
            <div className="mt-auto">
              <Link href="Learn/Evaluation">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-left flex flex-col h-full">
            <h3 className="text-xl font-semibold text-cyan-600 mb-2">Lecture9. Universal Design</h3>
            <Link href="Learn/Universal_Design">
              <img src="/Universal_banner.png" alt="Universal_banner" className="w-full h-auto mb-4 cursor-pointer" />
            </Link>
            <p className="text-gray-700 mb-4">Universal Design คือ "การออกแบบและจัดวางสิ่งแวดล้อมเพื่อให้ทุกคนสามารถเข้าถึง เข้าใจ และใช้งานได้ในระดับสูงสุดเท่าที่จะเป็นไปได้ โดยไม่คำนึงถึงอายุ ขนาด หรือความพิการ " อ้างอิงจากพระราชบัญญัติความพิการของไอร์แลนด์ ปี 2005
            </p>
           
            <ul className="list-disc list-inside text-gray-600 mb-4">
             
            </ul>
            <div className="mt-auto">
              <Link href="Learn/Universal_Design">
              <span className="text-blue-500 font-semibold cursor-pointer">more content →</span>
              </Link>
            </div>
          </div>
            </>
          )}
        </div>
        {/* ปุ่มเพื่อแสดงการ์ดที่เหลือ */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
      
    </div>
  );
}
