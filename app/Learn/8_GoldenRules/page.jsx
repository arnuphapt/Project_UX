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
              onClick={() => toggleSubmenu("ValuePropositionCanvas")}
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
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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

      <div className="flex-1 p-6 ml-18">
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h2 className="text-3xl font-bold mb-10 mt-10 ml-6">8 Golden Rules</h2>
        <h3 className="text-xl font-semibold mb-2 ml-6">Eight Golden Rules ของ Shneiderman’s จะช่วยทำให้การออกแบบอินเทอร์เฟซได้ดียิ่งขึ้น </h3>
        <img src="https://userpeek.com/wp-content/uploads/2023/02/Shneidermans-Eight-Golden-Rules-of-Interface-Design.png" alt="Design basics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
        <p className="text-gray-600 mb-4 ml-10" >ปฏิบัติตาม "กฎทอง 8 ประการในการออกแบบอินเทอร์เฟซ" ของ Ben Shneiderman หากคุณต้องการออกแบบอินเทอร์เฟซผู้ใช้ที่ยอดเยี่ยม มีประสิทธิภาพ และไม่สร้างความหงุดหงิด Apple, Google และ Microsoft เป็นเพียงบางส่วนของบริษัทที่ประสบความสำเร็จอย่างสูงซึ่งผลิตภัณฑ์ที่ได้รับการออกแบบอย่างดีของพวกเขาสะท้อนถึงกฎของ Shneiderman</p>
        <div className="flex justify-center">
        
        </div>

          <h3 className="text-2xl font-semibold mb-2 mt-6 ml-6">เอาละมาดูกันว่า<span className="text-yellow-500"> กฎทอง ทั้ง 8 ข้อ</span> มีเนื้อหาอะไรบ้าง ? </h3>
          
          <ul class="list-disc p-5 ml-6" > <span className="font-semibold  text-yellow-500 ">1. มุ่งมั่นเพื่อความสม่ำเสมอ (Strive for Consistency): </span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4">  ความสอดคล้อง (Consistency) เป็นสิ่งสำคัญมากในการออกแบบอินเตอร์เฟซ เพราะช่วยให้ผู้ใช้เรียนรู้และคาดเดาได้ ตัวอย่างเช่น เมนูการทำงานหรือปุ่มที่อยู่ในตำแหน่งเดียวกันเสมอจะช่วยให้ผู้ใช้ใช้งานได้ง่าย 
            การใช้ภาษา รูปแบบข้อความ,ใช้ไอคอน สี ลำดับชั้นของเมนู คำสั่งเรียกการกระทำ และขั้นตอนการใช้งานของผู้ใช้ที่คุ้นเคยเมื่อออกแบบสถานการณ์และลำดับการดำเนินการที่คล้ายคลึงกัน การกำหนดมาตรฐานวิธีการถ่ายทอดข้อมูลช่วยให้ผู้ใช้สามารถนำความรู้ไปใช้ตั้งแต่คลิกหนึ่งไปยังอีกคลิกหนึ่งได้ โดยไม่จำเป็นต้องเรียนรู้การแสดงใหม่สำหรับการดำเนินการเดียวกัน และรูปแบบการแสดงผลที่สอดคล้องกันก็ช่วยลดความสับสนได้</li>
            <img src="https://cdn.prod.website-files.com/6115e9a52c1947532801e49d/6119640a539ea10188d6e231_Provide%20consistent%20UI%20components.jpg" alt="Consistency" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
        
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-yellow-500">2. รองรับการควบคุมของผู้ใช้ (Enable Frequent Users to Use Shortcuts): </span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4">  สำหรับผู้ใช้ที่ใช้ระบบบ่อย การมีทางลัดจะช่วยเพิ่มประสิทธิภาพในการทำงานได้อย่างมาก เช่น การเพิ่มคีย์ลัด (Keyboard Shortcuts) เพื่อเข้าถึงฟังก์ชันได้รวดเร็ว หรือการใช้ Macro สำหรับทำงานที่ซับซ้อนหลายขั้นตอน ตัวอย่างที่เห็นได้ทั่วไปคือการใช้ Ctrl+C และ Ctrl+V เพื่อคัดลอกและวางข้อความ ซึ่งทำให้การทำงานสะดวกและรวดเร็วยิ่งขึ้น</li>
          <img src="/Shortcuts_Example.png" alt="Shortcuts_Example" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-yellow-500">3. แจ้งผลลัพธ์ที่ชัดเจนแก่ผู้ใช้ (Offer Informative Feedback): </span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4">  ทุกการกระทำที่ผู้ใช้ทำกับระบบ ควรมีการตอบกลับเสมอเพื่อให้ผู้ใช้ทราบว่าระบบได้รับข้อมูลแล้วและทำงานได้ถูกต้อง เช่น เมื่อผู้ใช้คลิกปุ่ม “บันทึก” 
            ระบบควรจะแจ้งเตือนว่าข้อมูลถูกบันทึกสำเร็จแล้ว หรือหากมีข้อผิดพลาดควรจะแจ้งให้ทราบทันที เพื่อไม่ให้ผู้ใช้เกิดความสับสนหรือกังวล</li>
            <img src="/feedback_Example.png" alt="feedback_Example" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-yellow-500">4. ออกแบบให้การทำงานเป็นไปทีละขั้นตอน (Design Dialogs to Yield Closure):</span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4"> เมื่อผู้ใช้ดำเนินกระบวนการต่าง ๆ ในระบบ เช่น หลังจากใช้งาน ระบบควรมีการจัดการให้เห็นได้ชัดเจนว่ามีกี่ขั้นตอนและเมื่อทำสำเร็จแล้ว ระบบควรแจ้งเตือนให้ทราบว่าขั้นตอนนั้นเสร็จสมบูรณ์แล้ว เช่น หลังจากสั่งอาหาร ระบบแสดงแต่ละขั้นตอนว่าถึงกระบวนการไหนแล้วจนยืนยันว่า “เสร็จสมบูรณ์”</li>
          <img src="/dialogs_example.png" alt="dialogs_Example" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-yellow-500">5. เสนอการจัดการข้อผิดพลาดอย่างง่าย (Offer simple error handling. ):</span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4"> การออกแบบอินเตอร์เฟซควรพยายามลดโอกาสในการทำผิดพลาดของผู้ใช้ เช่น การแสดงคำแนะนำที่ชัดเจน การใช้การป้อนข้อมูลแบบเลือกแทนการพิมพ์เอง (Dropdown หรือ Radio Buttons) หรือการใช้ระบบตรวจสอบข้อมูลแบบ Real-time (เช่น หากกรอกอีเมลผิดระบบจะเตือนทันที) ซึ่งจะช่วยลดความเสี่ยงในการเกิดข้อผิดพลาดของผู้ใช้</li>
          <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*kt9obOJTuLaBI5wdXYaggQ.png" alt="simple_error_Example" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>
        
          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-yellow-500">6. อนุญาตให้ผู้ใช้แก้ไขข้อผิดพลาดได้ง่าย (Permit Easy Reversal of Actions):</span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4"> การออกแบบอินเตอร์เฟซควรอนุญาตให้ผู้ใช้สามารถย้อนกลับการกระทำได้อย่างง่ายดาย เช่น หากผู้ใช้เผลอลบข้อมูลสำคัญควรมีตัวเลือก Undo หรือหากเผลอกดปุ่มส่งข้อมูลผิดควรมีปุ่มยกเลิกที่สามารถทำให้ผู้ใช้ย้อนกลับได้ ซึ่งจะทำให้ผู้ใช้รู้สึกปลอดภัยและไม่กังวลเมื่อทำผิดพลาด</li>
          <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*xclDPl1IRp-jVahHTQMcaA.png" alt="undo_Example" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-yellow-500">7. ควบคุมความสามารถของผู้ใช้ให้เหมาะสม (Support Internal Locus of Control):</span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4"> ผู้ใช้ควรรู้สึกว่าพวกเขาควบคุมระบบได้ ระบบควรตอบสนองต่อคำสั่งของผู้ใช้ตามความคาดหวังของพวกเขา ไม่ใช่ทำงานอัตโนมัติหรือให้ผู้ใช้รอโดยไม่เข้าใจสถานะของระบบ ตัวอย่างเช่น ระบบที่ให้ผู้ใช้สามารถเลือกขั้นตอนการทำงานเองได้แทนที่จะถูกบังคับไปตามเส้นทางที่กำหนด</li>
          <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*3GFZzfccYdPH03RtPoTOzw.png" alt="Support_Internal_Example" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5 ml-6"> <span className="font-semibold  text-yellow-500">ลดความจำของผู้ใช้ (Reduce Short-Term Memory Load):</span> 
          <li className="mb-2 text-gray-700 ml-6 mt-4"> ผู้ใช้ไม่ควรต้องจำข้อมูลจำนวนมากในระหว่างการใช้งานอินเตอร์เฟซ ดังนั้นการออกแบบควรมีการแสดงผลข้อมูลที่สำคัญอยู่บนหน้าจอเสมอ ตัวอย่างเช่น การใช้ search bar ในการค้นหาสิ่งที่ค้นหาบ่อย หรือ ค้นหาล่าสุด ก็ควรมีการแนะนำขึ้นมาเพื่อลดการพิมพ์ค้นหาใหม่ของผู้ใช้งาน</li>
          <img src="/MemoryLoad_examole.png" alt="MemoryLoad_examole" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>
         

          




          
<ul class="list-disc p-5 mt-20 mb-4 ml-6"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://www.canva.com/design/DAFl4wwgCmw/fJg-1V4BfJiZ3BRJKSUDIw/view?utm_content=DAFl4wwgCmw&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.interaction-design.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces?srsltid=AfmBOoqh0IcgUw6Ww_coHttyyo1OYYYWX03mTa5qRTqGtKW0UzRWQVVA" target="_blank">ที่มา Shneiderman’s Eight Golden Rules Will Help You Design Better Interfaces </a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.youtube.com/playlist?list=PLj63OwXv6t5QCIFodwCV1MgdJEbLoRKd6" target="_blank">วิดิโอ สำหรับการศึกษาเพิ่มเติม</a></li>
          
          
</ul>

<div className="flex justify-center mt-10">
      <ul className="flex space-x-2">
    
      <li>
      <Link href="/Learn/7_Principles" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ก่อนหน้า 
      </Link>
    </li>
    <li>
      <Link href="/Learn/Introduction_to_course" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        1 
      </Link>
    </li>
    <li>
      <Link href="/Learn/Business_Model_Canvas" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        2
      </Link>
    </li>
    <li>
      <Link href="/Learn/Value_Proposition_Canvas" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        3
      </Link> 
    </li>
    <li>
      <Link href="/Learn/WireFrame&Graphics" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        4
      </Link>
    </li>
    <li>
      <Link href="/Learn/Graphics_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        5
      </Link>
    </li>
    <li>
      <Link href="/Learn/7_Principles" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        6
      </Link>
    </li>
    <li>
      <Link href="/Learn/8_GoldenRules" className="bg-blue-500 text-white px-3 py-1 rounded">
        7
      </Link>
    </li>
    <li>
      <Link href="/Learn/Evaluation" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        8
      </Link>
    </li>
    <li>
      <Link href="/Learn/Universal_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        9
      </Link>
    </li>

    <li>
      <Link href="/Learn/Evaluation" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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



