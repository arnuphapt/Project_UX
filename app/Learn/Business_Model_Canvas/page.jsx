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
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white  "
            >
              1. บทนำ (Introduction)
            </Link>
          </li>
         
          <li>
            <Link
              href="/Learn/Business_Model_Canvas"
              className="block px-4 py-2 rounded-lg  bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
                  className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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
              className="block px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
             9. Universal Design -The Principles-
            </Link>
          </li>
            </ul>
          </div>
        )}
      </div>


      {/* Main Content */}
      <div className="flex-1 p-6 ml-18">
        <div className="max-w-7xl mx-auto  bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
          <h1 className="text-2xl font-bold mb-4 m-6">Lecture2. UX Strategy : Business Model Canvas</h1>
          
        <div className="flex justify-center">
        
        <img src="/BMC.png" alt="BMC" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />

        </div>
        <h3 className="text-2xl font-semibold mb-2 ml-6">1. Business Model Canvas คืออะไร ? </h3>
          <h3 className="text-l  mb-2 mt-6 ml-6">Business Model Canvas (BMC) คือเครื่องมือที่ใช้ในการวางแผนและวิเคราะห์โมเดลธุรกิจในรูปแบบที่เข้าใจง่ายและมีโครงสร้างชัดเจน ถูกพัฒนาโดย Alexander Osterwalder โดยแบ่งองค์ประกอบสำคัญออกเป็น 9 ส่วน เพื่อให้ครอบคลุมส่วนสำคัญ ๆ ต่อธุรกิจทุกประเภท
            การออกแบบ Business Model Canvas จำนวน 9 ส่วนนั้น เพื่อตอบคำถามสำคัญทางธุรกิจ คือ ทำอะไร(What) ทำเพื่อใคร(Who) ทำอย่างไร(How) ทำแล้วคุ้มค่าเพียงใด(Money) จากนั้นเขียนลงบนผืนผ้า Business Model Canvas (BMC) ขององค์กร  </h3>
            <img src="https://thewisdom.co/wp-content/uploads/2021/08/business-model-canvas-1024x714.jpg" alt="BMC" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />

         <h3 className="text-xl font-semibold ml-6 mb-2">9 องค์ประกอบของ Business Model Canvas</h3>
          
          
          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">1. กลุ่มลูกค้าเป้าหมาย ( Customer Segments ) :</span> 
          <li className=" text-gray-700 ml-10"> ใครคือกลุ่มเป้าหมายของธุรกิจ?</li>
          <li className="mb-2 text-gray-700 ml-10"> ธุรกิจให้คุณค่ากับกลุ่มลูกค้ากลุ่มไหน?</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">2. คุณค่าของสินค้าและบริการที่นำเสนอ ( Value Propositions ) :</span> 
          <li className=" text-gray-700 ml-10"> ธุรกิจเสนออะไรให้ลูกค้า?</li>
          <li className="mb-2 text-gray-700 ml-10"> สินค้าหรือบริการตอบสนองความต้องการของลูกค้าอย่างไร?</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">3. ช่องทางการเข้าถึงลูกค้า ( Channels ) :</span> 
          <li className=" text-gray-700 ml-10"> ธุรกิจจะเข้าถึงลูกค้าอย่างไร?</li>
          <li className="mb-2 text-gray-700 ml-10"> ช่องทางไหนที่ลูกค้าอยากให้ใช้?</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">4. ความสัมพันธ์กับลูกค้า ( Customer Relationships ) :</span> 
          <li className=" text-gray-700 ml-10"> ธุรกิจจะสร้างและรักษาความสัมพันธ์กับลูกค้าอย่างไร?</li>
          <li className="mb-2 text-gray-700 ml-10"> ลูกค้าคาดหวังการปฏิสัมพันธ์แบบไหน?</li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">5. รูปแบบของรายได้ ( Revenue Streams ) :</span> 
          <li className=" text-gray-700 ml-10"> ธุรกิจสร้างรายได้จากไหน? </li>
          <li className="mb-2 text-gray-700 ml-10"> รูปแบบการจ่ายเงินคืออะไร (เช่น ขายตรง, ค่าสมาชิก)? </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">6. ทรัพยากรสำคัญ ( Key Resources ) :</span> 
          <li className=" text-gray-700 ml-10"> ธุรกิจต้องการอะไรเพื่อดำเนินงาน? </li>
          <li className="mb-2 text-gray-700 ml-10"> เช่น ทรัพยากรทางกายภาพ, เงินทุน, บุคลากร </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">7. กิจกรรมหลัก ( Key Activities ) :</span> 
          <li className=" text-gray-700 ml-10"> ธุรกิจต้องทำอะไรเพื่อส่งมอบคุณค่า? </li>
          <li className="mb-2 text-gray-700 ml-10"> เช่น การผลิต, การตลาด, การจัดส่ง </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">8. พันธมิตรหลัก ( Key Partnerships ) :</span> 
          <li className=" text-gray-700 ml-10"> ธุรกิจต้องการร่วมมือกับใครบ้าง? </li>
          <li className="mb-2 text-gray-700 ml-10"> ใครช่วยสนับสนุนหรือช่วยลดความเสี่ยง? </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-gray-600 ml-6">9. โครงสร้างต้นทุน ( Cost Structure ) :</span> 
          <li className=" text-gray-700 ml-10"> อะไรคือค่าใช้จ่ายหลักของธุรกิจ? </li>
          <li className="mb-2 text-gray-700 ml-10"> ต้นทุนไหนที่มีผลกระทบมากที่สุด? </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2 ml-6">2. วิธีการวิเคราะห์ความสัมพันธ์ </h3>
          <h3 className="text-l  mb-2 mt-6 ml-4">เป็นการตรวจสอบว่าแต่ละองค์ประกอบเชื่อมโยงและส่งผลซึ่งกันและกันอย่างไร เพื่อให้ธุรกิจมีความสมดุลและสามารถดำเนินงานได้อย่างราบรื่น</h3>
          <h3 className="text-l  font-semibold mb-2 mt-10 ml-6">1. ขั้นตอนการระบุกลุ่มลูกค้าเป้าหมายและผลิตภัณฑ์</h3>
          <img src="/GoalsandProduct.png" alt="BMC" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-6 " />
          <h3 className="text-l  text-red-500 mb-2 mt-10 ml-10">ข้อควรระวัง</h3>
          <h3 className="text-l  mb-2 mt-3 ml-10">คุณจะต้องแยกข้อมูลที่เกิดจากการสังเคราะห์และวิเคราะห์ข้อมูลจากการศึกษาพฤติกรรมกลุ่มลูกค้าเป้าหมายผ่าน Google, Facebook, IG, Website Shopping Online ก็เป็นอีกหนึ่งแหล่งข้อมูลในการวิเคราะห์กลุ่มลูกค้าเป้าหมายได้</h3>
          <h3 className="text-l  text-red-500 mb-2 mt-10 ml-10">ข้อผิดพลาด:</h3>
          <h3 className="text-l  mb-2 mt-3 ml-10">ใช้ความรู้สึกในการเลือกลูกค้ามากกว่าข้อมูลการตลาด ก่อนที่คุณจะทำการคัดกรอง และเลือกกลุ่มลูกค้าเป้าหมายของคุณ</h3>
          <h3 className="text-l  mb-2 mt-3 ml-10">สำหรับผลิตภัณฑ์หรือบริการของคุณขอให้พิจารณาภาพความสัมพันธ์ของกล่องข้อมูลที่จะต้องบันทึกให้ดี และมีความเข้าใจตรงกันทั้งองค์กร เพราะการเลือกลูกค้าจะต้องสัมพันธ์กับ "คุณค่าเพิ่มสินค้า/บริการ ในลักษณะ Value Creation" ให้กับกลุ่มลูกค้าเป้าหมาย ซึ่งการสร้าง Value Creation คุณจำเป็นจะต้องมีข้อมูลเกี่ยวกับลูกค้า เช่น เพศ 
            (ปัจจุบันมีความหลากหลายด้านการระบุเพศอย่างมาก) อายุของกลุ่มเป้าหมาย ฯลฯ</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10">คุณจะต้องสร้างผลิตภัณฑ์หรือบริการที่สนับสนุน ให้การช่วยเหลือลูกค้าตามที่ลูกค้าคาดหวังก่อนที่จะขายสินค้า/บริการให้กับลูกค้า เมื่อคุณรู้จักนิสัยของลูกค้าของคุณแล้ว คุณจำเป็นจะต้องเลือกช่องทางการสื่อสารที่กลุ่มลูกค้าเป้าหมายของคุณใช้อยู่เป็นประจำเพื่อให้เกิดความสะดวกในการสื่อสาร</h3>
        
        
        <h3 className="text-l  font-semibold mb-2 mt-10 ml-10 ">2. ขั้นตอนการระบุความสัมพันธ์กับลูกค้า</h3>
            <img src="/CustomerRelationships.png" alt="BMC" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-6 " />
            <h3 className="text-l  text-red-500 mb-2 mt-10 ml-10">ข้อควรระวังการใส่ข้อมูลในตาราง</h3>
            <h3 className="text-l  mb-2 mt-3 ml-10">การนำระบบ Aftersales Services มาใช้ถือเป็นเรื่องดีที่จะทำให้ลูกค้ารู้สึกว่าเว็บไซต์ของคุณมีชีวิตและมีคนทำงานอยู่จริงๆ ไม่ได้เป็นแค่ระบบซื้อขายสินค้าเท่านั้น
            ธุรกิจ SMEs ใช้ Line@, Mobile App Free ก็ดี</h3>
            <h3 className="text-l  mb-2 mt-3 ml-10">เมื่อคุณสามารถวิเคราะห์กลุ่มลูกค้าเป้าหมายได้อย่างชัดเจน และรู้จักนิสัยพฤติกรรมของกลุ่มลูกค้าเป้าหมายแล้ว รวมถึงสามารถพัฒนาผลิตภัณฑ์ หรือ บริการที่ตอบสนองความต้องการของกลุ่มลูกค้าเป้าหมายได้แล้ว ขั้นตอนต่อไปก็จำเป็นจะต้องมีการสร้างความสัมพันธ์กับลูกค้าแบบเพื่อนสนิทที่รับฟังความเห็น และสนับสนุนลูกค้า ไม่ใช่พนักงานขายสินค้าที่นำสินค้ามาส่งให้ถึงมือลูกค้าแล้วเก็บเงินจากลูกค้า โดยไม่มีการสร้างความสัมพันธ์กับลูกค้าในอนาคต ไม่มีการวางแผนบริการหลังการขายให้กับลูกค้ามีมีระบบคัดกรองลูกค้าตามกฎ 80/20 ก็จะทําให้คุณวุ่นวายกับลูกค้าหลากหลายมากเกินไป จนไม่มีเวลาทําอย่างอื่นๆก็ผิดอีก

คุณจะต้องวางแผนสร้างความสัมพันธ์ผ่านช่องทางการเข้าถึงลูกค้า ให้ลูกค้ารู้สึกเข้าถึงคุณได้ง่าย และสะดวกไม่ต้องวุ่นวาย และต้องตอบกลับทุกความเห็นหรือข้อซักถาม ที่เกิดขึ้นภายใน 24 ชั่วโมง นับจากที่ได้รับข้อความจากลูกค้า

สมัยนี้มีระบบ Mobile Application, Chat Bot ที่ราคาถูกลง และมีความสะดวกในการใช้งานหลากหลายมากขึ้น</h3>

        <h3 className="text-l  font-semibold mb-2 mt-10 ml-10">3. ขั้นตอนการระบุความสัมพันธ์โครงสร้างต้นทุน</h3>
        <img src="/CostStructure.png" alt="BMC" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-6 " />
        <h3 className="text-l  text-red-500 mb-2 mt-10 ml-10">ข้อควรระวังการใส่ข้อมูลในตาราง</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10">พิจารณาความคุ้มค่าก่อนตัดสินใจลงทุนในทรัพยากรต่างๆ ไม่ว่าจะเป็นเงิน อุปกรณ์-เครื่องมือ หรือ การฝึกอบรมพนักงาน ควรวิเคราะห์ให้รอบคอบว่าคุ้มค่าที่จะลงทุนไปหรือไม่

นอกจากนี้ ควรวิเคราะห์ต้นทุนของผลิตภัณฑ์หรือบริการจาก 2 ด้าน คือ ต้นทุนของสินค้า หรือ ประสิทธิภาพของสินค้าเทียบกับคู่แข่ง และต้นทุนของการบริการหลังการขาย หรือ การบริการลูกค้าที่เป็นตัวเงินโดยตรง เช่น 2, 7, 8 ซึ่งเป็นปัจจัยหลักที่ช่วยบ่งบอกถึงต้นทุนในการดำเนินงานโดยรวม

ดังนั้นเมื่อประกอบการตัดสินใจ ควรไปวิเคราะห์รายละเอียดการลงทุนแต่ละรายการให้ละเอียด และดูงบประมาณโดยรวมของโครงการ เพราะตัวเลขทางบัญชีที่ปรากฏในงบดุลและงบกำไรขาดทุน อาจไม่เหมือนกับตัวเลขที่เกี่ยวข้องกับตัวเลข 2, 7, 8</h3>

        <h3 className="text-l  font-semibold mb-2 mt-10 ml-10">4. ขั้นตอนการระบุความสัมพันธ์ลูกค้ากับรายได้</h3>
        <img src="/Money.png" alt="BMC" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-6 " />
        <h3 className="text-l  text-red-500 mb-2 mt-10 ml-10">ข้อควรระวังการใส่ข้อมูลในตาราง</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10">(ปริมาณสินค้าที่ขายได้ x ราคาต่อหน่วย) – (ต้นทุนขาย + ค่าใช้จ่ายในการขาย) = กำไรก่อนภาษี

ตัวเลขที่ได้มาวิเคราะห์เป็นรายได้มีความน่าเชื่อถือเพียงพอหรือไม่ หรือเป็นการหลอกตัวเอง</h3>
        <ul className="list-disc text-l  mb-2 mt-3 ml-10">รายได้จะคาดการณ์อย่างไร เป็นสิ่งที่หลายคนที่ทำ Business Model Canvas จะมีความกังวลมาก ซึ่งหลักการพิจารณา มีดังนี้
            <li className="mb-2 ml-6">
            กลุ่มลูกค้า Mass Products แสดงว่าคุณจะต้องขายราคาถูก เน้นปริมาณ ให้มีการซื้อซ้ำบ่อยๆ ไม่เน้นการโฆษณา แต่คู่แข่งเยอะมาก (ไหวไหม?)
            </li>
            <li className="mb-2 ml-6">
            กลุ่มลูกค้า Niche Marketing แสดงว่ามั่นใจในคุณภาพสินค้า มั่นใจในแบรนด์ของสินค้าอย่างมาก ตั้งราคาสูงๆ ได้ คู่แข่งน้อย มีให้เลือกหลักๆ ประมาณ 2 แบบแต่จะแตกย่อยๆ ลงรายละเอียดในครั้งถัดไป
            </li>
        </ul>


        <h3 className="text-2xl font-semibold mb-2 mt-10 ml-6">3. วิธีการกรอกข้อมูล </h3>

        <h3 className="text-l  font-semibold mb-2 mt-10 ml-10">1. ทำอะไร (What)</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Value Propositions (VP):</span> หมายถึงคุณค่าและประโยชน์ที่มอบให้กับลูกค้าเป้าหมาย ทำให้เกิดการตัดสินใจเลือกใช้สินค้าหรือบริการของคุณ อาจเป็นนวัตกรรมใหม่ การแก้ไขปัญหาเดิมๆ หรือการเพิ่มคุณสมบัติพิเศษที่ทำให้เกิดความพึงพอใจ มักนำไปสู่การตัดสินใจเลือกสินค้าและบริการของคุณมากกว่าคู่แข่งรายอื่น</h3>
        <h3 className="text-l  text-red-500 mb-2  ml-10">"อะไรคือจุดเด่นของสินค้า/บริการของเรา?"</h3>

        <h3 className="text-l  font-semibold mb-2 mt-10 ml-10">2. ทำเพื่อใคร (Who)</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Customer Segments (CS):</span> เราจะสร้างคุณค่าให้ใคร? ใครคือกลุ่มลูกค้าเป้าหมายหลักของเรา หรือแบ่งกลุ่มลูกค้าเป้าหมายออกเป็นกลุ่มย่อยๆ เพื่อให้การสื่อสารและนำเสนอผลิตภัณฑ์หรือบริการต่างๆ ตรงกับความต้องการของแต่ละกลุ่มได้อย่างชัดเจน</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Channels (CH):</span> เราจะนำเสนอคุณค่าของเราอย่างไร? ใช้ช่องทางอะไรบ้างในการเข้าถึงลูกค้า ควรเป็นช่องทางที่ลูกค้าเข้าถึงได้ง่ายและสะดวก ทั้งช่องทางออนไลน์และช่องทางออฟไลน์</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Customer Relationships (CR)::</span>  เราใช้วิธีการใดในการสร้างสายสัมพันธ์กับลูกค้า อย่างความผูกพันกับลูกค้า ที่ไม่ใช่แค่การซื้อขาย (เช่น การสร้างเครือข่ายชุมชน) และในระยะยาว ออนไลน์ เช่น การสร้างชุมชน (Community) เพื่อให้เกิดการพูดคุยแลกเปลี่ยน หรือใช้ช่องทาง social media ในการสื่อสารกับลูกค้าแบบสองทาง</h3>
        <h3 className="text-l  text-red-500 mb-2  ml-10">"การให้ความช่วยเหลือ การตอบปัญหาต่างๆ รวดเร็ว"</h3>

        <h3 className="text-l  font-semibold mb-2 mt-10 ml-10">3. ทำอย่างไร (How)</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Key Resources (KR):</span> ทรัพยากรหลักขององค์กรที่ต้องลงทุน สินทรัพย์ทุกประเภท ทั้ง สิ่งอำนวยความสะดวก เครื่องจักร อุปกรณ์ ทรัพยากรการเงิน ทรัพย์สินทางปัญญา รวมทั้งทรัพยากรมนุษย์</h3>
        <h3 className="text-l  text-red-500 mb-2  ml-10">"ทรัพยากรที่ต้องใช้จะหามาจากอะไร/ที่ไหน"</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Key Activities (KA):</span> กิจกรรมหลักขององค์กร ทั้งการผลิต การบริการ เทคโนโลยีที่ใช้ในการ ดำเนินงาน การแก้ไขปัญหาให้ลูกค้า สร้างเครือข่ายการตลาด และการประชาสัมพันธ์</h3>
        <h3 className="text-l  text-red-500 mb-2  ml-10">"List รายการที่จะต้องทำเพื่อให้ธุรกิจเป็นจริงได้"</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Key Partnerships (KP):</span>  พันธมิตรหลัก ได้แก่ ผู้ส่งมอบ (Suppliers) ผู้ร่วมประสานงานทางการ (Partners) คู่ความร่วมมือที่ไม่เป็นทางการ (Collaborators) หุ้นส่วนทางธุรกิจทั้งที่เป็นคู่แข่งและไม่ใช่คู่แข่ง</h3>
        <h3 className="text-l  text-red-500 mb-2  ml-10">"ผู้ค้าหรือพันธมิตรร่วมค้า ที่จะปรึกษาในการทำธุรกิจ"</h3>


        <h3 className="text-l  font-semibold mb-2 mt-10 ml-10">4. ทำแล้วคุ้มค่าเพียงใด (Money)</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Cost Structure (CS):</span> โครงสร้างต้นทุน เป็นตัวบ่งบอกถึงค่าใช้จ่ายในการดำเนินกิจการ ทั้งต้นทุนคงที่ (Fix Cost) และต้นทุนผันแปร (Variable Cost)</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Revenue Streams (RS):</span> กำไร ได้มาจากรายรับ เงินสดที่ได้รับหลังหักค่าใช้จ่ายแล้ว กำไรมาจากหลายช่องทาง เช่น รายได้จากการขาย ค่าบริการ ค่าสมาชิก ค่าเช่า ค่าธรรมเนียม ฯลฯ</h3>
        <h3 className="text-l  text-red-500 mb-2  ml-10">"รายได้หลักของเรามาจากอะไร"</h3>

       
       
        <h3 className="text-2xl font-semibold mb-2 mt-10 ml-6">4. ข้อแตกต่างระหว่าง Business Plan VS Business Model Canvas</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Business Plan (แผนธุรกิจ): </span> หมายถึงการออกแบบวิธีการทำงานด้านธุรกิจอย่างละเอียดล่วงหน้า ประมาณ 3-5 ปี โดยผู้บริหารมีหน้าที่กำหนดรูปแบบการทำงาน วิธีการบริหารจัดการ และการพยากรณ์รายได้ที่คาดว่าจะเพิ่มขึ้นในอนาคต</h3>
        <h3 className="text-l  mb-2 mt-3 ml-10"><span className="text-l  font-semibold">Business Model Canvas :</span> หมายถึง การกำหนดรูปแบบธุรกิจและความเชื่อมโยงของ กระบวนการคิดหรือทำธุรกิจของเจ้าของกิจการทั้ง 9 องค์ประกอบให้จบภายในเอกสารแผ่นเดียว เพื่อนำข้อมูลที่ได้มีการวิเคราะห์แล้วจาก Business Model Canvas ไปสู่ Business Plan ต่อไป</h3>













<ul class="list-disc p-5 mt-20 mb-4 ml-6"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://www.canva.com/design/DAFl46G9uf8/vjRHsxQ71HHE_SadIUWmmA/view?utm_content=DAFl46G9uf8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://vcharkarn.com/article/business-model-canvas-%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%A7%E0%B8%B4%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%B0%E0%B8%AB%E0%B9%8C%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88-%E0%B8%9E/" target="_blank">ตัวอย่าง BMC</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.youtube.com/watch?v=e0RoOmhxhj4" target="_blank">บันทึกการบรรยาย BMC (VDO clip)</a></li>
          
          
</ul>

<div className="relative mt-10">
  <ul className="flex justify-between items-center relative">
    <li className="absolute left-0 bottom-0">
      <Link href="/Learn/Introduction_to_course" className="bg-gray-300 hover:bg-blue-500 hover:text-white px-3 py-1 rounded ">
        ก่อนหน้า
      </Link>
    </li>
    <li className="absolute right-0 bottom-0">
      <Link href="/Learn/Value_Proposition_Canvas" className="bg-gray-300 hover:bg-blue-500 hover:text-white px-3 py-1 rounded ">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>
        </div>
      </div>
    </div>
  );
}
