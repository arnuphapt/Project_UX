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
              className="block px-4 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-white transition-colors"
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


      <div className="flex-1 p-6 ml-18">
    <div className="max-w-7xl mx-auto p-4">
    
     
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h2 className="text-3xl font-bold mb-4 mt-10 ml-6">7 principles</h2>
      <p className="text-2xl font-semibold  mt-10 ml-10">เรียนรู้หลักการทั้งเจ็ดที่ช่วยทำให้เว็บไซต์ของคุณมีความน่าสนใจมากขึ้นโดย ดร. ซูซาน ไวน์เชงค์:</p>
        <h3 className=" font-semibold  text-gray-700 ml-10 mt-10">เริ่มจาก ดูวิดิโอ 7 principles that make your website more engaging และทำความเข้าใจ </h3>
        <div className="flex justify-center">
        
        <iframe 
    className="w-full max-w-2xl h-96 mt-10 mb-10" 
    src="https://www.youtube.com/embed/3J85SUZFXNM" 
    title="YouTube video" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
        </iframe>

        </div>

          <h3 className="text-xl font-semibold mb-2 mt-10 ml-10">เอาละ มาดูกันดีกว่าว่าสิ่งที่ได้ชมไปนั้น มีเนื้อหาอะไรบ้าง ? </h3>
          
          <h3 className="text-xl font-semibold mt-10 ml-10">7 หลักการทำให้เว็บไซต์ของคุณน่าสนใจยิ่งขึ้น: </h3>
          <img src="https://onextrapixel.com/wp-content/uploads/2012/04/PETvideoposter.jpg" alt="Design basics" className=" h-auto w-full max-w-6xl mx-auto p-7  mb-6 mt-10 " />
          <p className="text-gray-600 mb-4 ml-4" >วันนี้เราจะใช้ 7 หลักการทำให้เว็บไซต์ของคุณน่าสนใจยิ่งขึ้น ตามที่อธิบายโดย Dr Susan Weinschenck จาก Human Factors International</p>
          
          
          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-gray-600">ทางเลือกมากเกินไป? (Too Many Choices?) :</span> 
          <li className="mb-2 text-gray-700 ml-6">  เว็บไซต์ของคุณอาจจะเต็มไปด้วยตัวเลือกที่มากเกินไปจนทำให้ผู้เข้าชมสับสนได้หรือไม่? แทนที่จะพยายามบอกทุกอย่างที่เราทำ ลองกลั่นกรองดูว่าสิ่งไหนที่เป็นหัวใจหลักของธุรกิจเรา แล้วทำให้มันเด่นขึ้นมา ส่วนสิ่งที่ไม่จำเป็นก็อาจจะตัดทิ้งไปบ้าง</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-gray-600">การยืนยันทางสังคม? (Social Validation?) :</span> 
          <li className="mb-2 text-gray-700 ml-6">  คำชม คำวิจารณ์ และกรณีศึกษาจากลูกค้าจริงช่วยสร้างความเชื่อมั่นได้มาก คำรับรองเหล่านี้ควรจะกระจายอยู่ทั่วทั้งเว็บไซต์ ไม่ใช่แค่ซ่อนอยู่ในหน้าเดียว ลองใส่เนื้อหาที่ทำให้ผู้เข้าชมรู้สึกเชื่อมโยงได้ เช่น รูปภาพหรือวิดีโอของลูกค้าที่พวกเขาอาจเห็นตัวเองเป็นแบบนั้น</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-gray-600">สร้างความรู้สึกเร่งด่วน? (Scarcity?) :</span> 
          <li className="mb-2 text-gray-700 ml-6">  การเพิ่มความรู้สึกว่าของจะหมดหรือเวลาจำกัด อาจจะช่วยกระตุ้นให้คนตัดสินใจเร็วขึ้นได้ ลองคิดดูว่าคุณจะทำให้ข้อเสนอหรือบริการของคุณดูมีค่าและหายากขึ้นได้อย่างไร โดยไม่ทำให้ผู้เข้าชมรู้สึกว่ากำลังโดนบังคับหรือหลอกลวง</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-gray-600">อาหาร, เซ็กส์ หรืออันตราย? (Food, Sex or Danger?) :</span> 
          <li className="mb-2 text-gray-700 ml-6"> ในธุรกิจ นี่หมายถึงความเสี่ยงและผลกระทบที่ลูกค้าของเราจะต้องเผชิญหากไม่ใช้ผลิตภัณฑ์และบริการของเรา? เราจำเป็นต้องชัดเจนและให้ข้อมูลเกี่ยวกับอันตรายที่ลูกค้าจะต้องเผชิญหากพวกเขาไม่ทำอะไรหรือไม่? เราควรทำให้หมวดหมู่ชัดเจนยิ่งขึ้น เช่น หมวดหมู่ของสินค้าที่แสดงนั้นได้แบ่ง เพศอย่างชัดเจนหรือไม่ เรากำลังแก้ปัญหาอะไร? เรากำลังให้แนวทางแก้ไขอะไรบ้าง?</li>
          
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-gray-600">สิ่งนำสายตา (Power of Faces?) :</span> 
          <li className="mb-2 text-gray-700 ml-6">  Fusiform Facial Area(FFA)</li>
          <li className="mb-2 text-gray-700 ml-6">  Always Focus On The Eyes</li>
          <ul className="mb-2 text-gray-700 ml-6">  
            <li className="mb-2 text-black ml-6">ทำไมการศึกษาการเคลื่อนไหวของดวงตาจึงน่าสนใจ? (Eyes Tracking)</li>
          <li>การศึกษาการเคลื่อนไหวของดวงตาเป็นเครื่องมือที่มีประโยชน์อย่างมากในการทำความเข้าใจพฤติกรรมของผู้ใช้และปรับปรุงผลิตภัณฑ์หรือบริการให้ตรงกับความต้องการของผู้ใช้มากขึ้น ซึ่งจะนำไปสู่ความสำเร็จในการดำเนินธุรกิจในยุคดิจิทัล</li>
            </ul> 
            <img src="/eyes_tracking.png" alt="Design basics" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
          </ul>
         

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-gray-600">เล่าเรื่องที่ดึงดูดใจ? (Story?) :</span> 
          <li className="mb-2 text-gray-700 ml-6">  เว็บไซต์ของเรามีข้อมูลเพียงพอเกี่ยวกับการนำทางของลูกค้าหรือไม่? เราอาจจะมุ่งเน้นไปที่การบอกว่าทำอะไรได้บ้าง โดยไม่มีข้อมูลเกี่ยวกับวิธีการและประโยชน์หรือเปล่า? เราควรแนะนำกรณีศึกษาหรือแบบอย่างเพิ่มเติมที่ผู้เข้าชมสามารถเกี่ยวข้องได้หรือไม่? เช่น แนะนำสามช่วง 'ก่อน-ระหว่าง-หลัง' ได้ถูกอธิบายอย่างชัดเจนในเว็บไซต์ของเราหรือไม่?</li>
          </ul>

          <ul class="list-disc p-5 ml-10"> <span className="font-semibold  text-gray-600">ความมุ่งมั่น? (Commitment?) :</span> 
          <li className="mb-2 text-gray-700 ml-6">  เมื่อมีคนใหม่เข้ามาในเว็บไซต์ อย่าขออะไรที่ใหญ่โตจากพวกเขาในทันที ลองเสนอการกระทำเล็ก ๆ ที่ง่าย ๆ แต่มีคุณค่า เช่น การกรอกฟอร์มเล็ก ๆ หรือดาวน์โหลดเนื้อหาฟรี ซึ่งจะช่วยสร้างความมั่นใจให้กับพวกเขาก่อน</li>
          </ul>




          
<ul class="list-disc p-5 mt-20 mb-4 ml-10"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://www.canva.com/design/DAFl446JtCc/OOex2FRMsn-e5Y4jx9EC4Q/view?utm_content=DAFl446JtCc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.nbsl.org.uk/business-bullets/marketing/115-7-principles-to-get-more-enquiries-from-your-website" target="_blank">7 Principles To Get More Enquiries From Your Website</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.canva.com/help/using-canva-to-create-products-for-sale/#:~:text=Trademarks%20and%20logos,%2C%20basic%20shapes%20and%20lines)." target="_blank">ใช้ Canva ออกแบบผลิตภัณฑ์ดิจิทัลและผลิตภัณฑ์จริงสำหรับขาย</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://storage.kku.ac.th/share.cgi?ssid=51ea144f51a24acb8975b0fbca950caa" target="_blank">Ux_Design (E-book)</a></li>
          
</ul>

<div className="flex justify-center mt-10">
      <ul className="flex space-x-2">
    
      <li>
      <Link href="/Learn/Graphics_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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
      <Link href="/Learn/7_Principles" className="bg-blue-500 text-white px-3 py-1 rounded">
        6
      </Link>
    </li>
    <li>
      <Link href="/Learn/8_GoldenRules" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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
      <Link href="/Learn/8_GoldenRules" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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



