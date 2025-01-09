
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4">
    
      <h2 className="text-4xl font-semibold mb-4 mt-20"> Wireframe & Graphics</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h3 className="text-2xl font-semibold mb-2 mt-8">Wireframe คืออะไร ?</h3>
          
        <h3 className="text-xl  mb-2 mt-4 ml-10">Wireframe คือเครื่องมือหรือแบบร่างที่ใช้ในการวางโครงสร้างและการออกแบบสำหรับเว็บไซต์, แอปพลิเคชัน หรือระบบดิจิทัลต่างๆ ก่อนที่จะเริ่มการพัฒนาเต็มรูปแบบ โดยมักจะนำเสนอในรูปแบบภาพสองมิติที่เรียบง่าย ซึ่งแสดงให้เห็นถึงองค์ประกอบหลัก ๆ</h3>
        <img src="/Wireframe.jpg" alt="Wireframe" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10  " />
        <h3 className="text-2xl font-semibold mb-2 mt-4 ">WireFrame และ Prototypes ต่างกันอย่างไร ?</h3>
        <h3 className="text-xl  mb-2 mt-4 ml-10">WireFrame และ Prototypes เป็นส่วนหนึ่งของกระบวนการออกแบบผลิตภัณฑ์ดิจิทัล เช่น เว็บไซต์หรือแอปพลิเคชัน แต่ทั้งสองมีจุดประสงค์และความละเอียดที่แตกต่างกันชัดเจน ดังนี้:</h3>
        <img src="https://theproductmanager.com/wp-content/uploads/sites/4/2022/02/PRD-%E2%80%93-Keyword-%E2%80%93-prototyping-vs-wireframing-1200x630.png" alt="Wireframe" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10  " />
       
        <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5"> WireFrame</span> 
          <p className="mb-2 text-gray-600 ml-20 mt-4"> Wireframe เป็นแบบร่างที่แสดงโครงสร้างพื้นฐานของหน้าจอหรือหน้าเว็บ โดยเน้นการจัดวางองค์ประกอบต่าง ๆ เช่น ตำแหน่งของเมนู, ปุ่ม, ข้อความ หรือรูปภาพ</p>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">รายละเอียด :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">ใช้เส้น, กล่อง และข้อความเรียบง่าย</li>
          <li class="before:content-['-'] before:mr-2">ไม่มีสี, ฟอนต์จริง หรือรูปภาพที่สมจริง</li>
          <li class="before:content-['-'] before:mr-2">ไม่มีการโต้ตอบ (Interactive)</li>
          </ul>
          </li>

          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">จุดประสงค์ :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">ใช้ในการวางโครงร่างและแสดงโครงสร้างข้อมูล</li>
          <li class="before:content-['-'] before:mr-2">เป็นเครื่องมือในการวางแผนและสื่อสารระหว่างทีม</li>
          </ul>
          </li>

          
          
          </ul>


          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5"> Prototype</span> 
          <p className="mb-2 text-gray-600 ml-20 mt-4"> Prototype เป็นเวอร์ชันจำลองที่มีรายละเอียดมากขึ้น แสดงให้เห็นว่าเว็บไซต์หรือแอปจะทำงานอย่างไร โดยมักรวมถึงการโต้ตอบและแอนิเมชัน</p>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">รายละเอียด :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">มีสี, ฟอนต์จริง, รูปภาพ และองค์ประกอบที่สมจริง</li>
          <li class="before:content-['-'] before:mr-2">รองรับการโต้ตอบ เช่น การคลิกปุ่มหรือการสลับหน้าจอ</li>
          <li class="before:content-['-'] before:mr-2">อาจเป็น High-Fidelity (ใกล้เคียงของจริง)</li>
          </ul>
          </li>

          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">จุดประสงค์ :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">ทดสอบประสบการณ์ผู้ใช้ (UX)</li>
          <li class="before:content-['-'] before:mr-2">สร้างความเข้าใจเกี่ยวกับการทำงานของระบบ</li>
          <li class="before:content-['-'] before:mr-2">ป็นต้นแบบสำหรับการพัฒนา</li>
          </ul>
          </li>
          
          </ul>
          <img src="/wireframevsPrototype.png" alt="wireframevsPrototype" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10  " />



          <h3 className="text-2xl font-semibold mb-2 mt-4 ">Development with WireFrames :Types</h3>
        <h3 className="text-xl  mb-2 mt-4 ml-10">คือกระบวนการพัฒนาผลิตภัณฑ์ดิจิทัล เช่น เว็บไซต์หรือแอปพลิเคชัน โดยมีการใช้ Wireframe เป็นเครื่องมือสำคัญในขั้นตอนการออกแบบและการวางแผนโครงสร้าง ซึ่งช่วยให้ทีมพัฒนาและผู้มีส่วนได้ส่วนเสียสามารถเข้าใจแนวคิดหลักของโปรเจกต์ได้ตั้งแต่เริ่มต้น ก่อนที่จะเริ่มการออกแบบหรือเขียนโค้ดจริง โดยแบ่งเป็น2อย่าง ได้แก่</h3>
        <img src="https://tigosoftware.com/sites/default/files/2023-11/wireframe.jpg" alt="Wireframe" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6 mt-10  " />
       
        <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">1. Storyboard Wireframe</span> 
          <p className="mb-2 text-gray-600 ml-20 mt-4"> Storyboard Wireframe เป็นแบบร่างที่เน้นการเล่าเรื่อง (Storytelling) หรือแสดงลำดับการใช้งาน (User Flow) ผ่านหน้าจอหรือฟังก์ชันต่าง ๆ เพื่อให้เห็นภาพรวมว่าผู้ใช้งานจะโต้ตอบกับระบบอย่างไรตั้งแต่ต้นจนจบ</p>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">จุดเด่น :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">แสดง ลำดับเหตุการณ์ หรือขั้นตอนการทำงานในระบบ เช่น จากหน้าเข้าสู่ระบบไปยังหน้าหลัก และการทำงานของปุ่มต่าง ๆ</li>
          <li class="before:content-['-'] before:mr-2">เน้น การโฟกัสภาพรวม ว่าผู้ใช้จะเดินทางในระบบอย่างไร</li>
          <li class="before:content-['-'] before:mr-2">ใช้เพื่อสื่อสารกับทีมเกี่ยวกับประสบการณ์ผู้ใช้ (UX)</li>
          </ul>
          </li>

          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">การใช้งาน :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">เหมาะสำหรับขั้นตอนต้นของการพัฒนา</li>
          <li class="before:content-['-'] before:mr-2">ใช้ในการประชุมเพื่อสร้างความเข้าใจร่วมกันเกี่ยวกับโครงสร้างการเดินทางของผู้ใช้</li>
          </ul>
          </li>

          
          
          </ul>


          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2. Functional Wireframe</span> 
          <p className="mb-2 text-gray-600 ml-20 mt-4"> Functional Wireframe เป็นแบบร่างที่เน้นการแสดงรายละเอียดเชิงลึกเกี่ยวกับฟังก์ชันการทำงาน (Functionality) ของแต่ละองค์ประกอบ เช่น ปุ่ม, ฟอร์ม หรือเมนู โดยแสดงให้เห็นว่าแต่ละส่วนจะทำงานอย่างไร</p>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">จุดเด่น :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">แสดง รายละเอียดการทำงาน ของแต่ละองค์ประกอบ</li>
          <li class="before:content-['-'] before:mr-2">ระบุฟังก์ชันเฉพาะ เช่น "ปุ่มนี้เชื่อมไปหน้าไหน", "ฟอร์มนี้บันทึกข้อมูลลงฐานข้อมูลอย่างไร"</li>
          <li class="before:content-['-'] before:mr-2">เน้นความถูกต้องในแง่ การพัฒนาเชิงเทคนิค</li>
          </ul>
          </li>

          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">การใช้งาน :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">เหมาะสำหรับทีมพัฒนาและนักออกแบบ UI/UX</li>
          <li class="before:content-['-'] before:mr-2">ใช้สำหรับขั้นตอนกลางถึงปลายของการออกแบบ เพื่อเตรียมข้อมูลสำหรับการเขียนโค้ด</li>
          
          </ul>
          </li>
          
          </ul>
          <img src="/storyvsFuntional.png" alt="storyvsFuntional" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10  " />
          <h3 className="text-2xl font-semibold mb-2 mt-10 ">Step For WireFraming </h3>
          <img src="/Stepforwireframe.png" alt="storyvsFuntional" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10  " />
          
          
          <h3 className="text-2xl font-semibold mb-2 mt-10 ">Wireframe Tips </h3>
          
          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">1. Keep them Simple</span> 
          
          <li className="mb-2 text-gray-600 ml-20 mt-4"><span className="font-semibold  text-black ">อย่าทำให้ผู้ใช้ต้องคิดมาก :</span>  หมายถึงการออกแบบที่เข้าใจง่าย ไม่ซับซ้อน ผู้ใช้สามารถใช้งานได้ทันที</li>
          <li className="mb-2 text-gray-600 ml-20 mt-4"><span className="font-semibold  text-black ">ง่ายต่อการเปลี่ยนแปลง :</span>  การออกแบบที่เรียบง่ายจะทำให้การปรับเปลี่ยนหรือแก้ไขในอนาคตเป็นเรื่องง่าย</li>
          <li className="mb-2 text-gray-600 ml-20 mt-4"><span className="font-semibold  text-black ">เน้นเนื้อหา :</span>  การออกแบบควรเน้นที่การนำเสนอเนื้อหาสำคัญให้ชัดเจน ไม่รกตา</li>
          <li className="mb-2 text-gray-600 ml-20 mt-4"><span className="font-semibold  text-black ">ความทันสมัย :</span>  การออกแบบที่ดีควรมีความคลาสสิก ไม่ตกยุค</li>
          <li className="mb-2 text-gray-600 ml-20 mt-4"><span className="font-semibold  text-black ">สร้างแรงบันดาลใจ :</span>  การออกแบบควรกระตุ้นความรู้สึกและสร้างความประทับใจให้กับผู้ใช้งาน</li>
          
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2. Use a grid</span> 
          <li className="mb-2 text-gray-600 ml-20 mt-4"><span className="font-semibold  text-black ">Grid จะช่วยจัดระเบียบเนื้อหาของคุณ :</span>  หมายถึงการออกแบบที่เข้าใจง่าย ไม่ซับซ้อน ผู้ใช้สามารถใช้งานได้ทันที</li>
          </ul>
          <img src="/grid1.png" alt="grid" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10  " />
          <img src="/grid2.png" alt="grid" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10  " />
          
          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">3. Short sharp annotation </span>คำอธิบายจะไม่ยาวเกินไป แต่จะสั้นและตรงประเด็น </ul>
          <img src="/shortSharp.png" alt="shortSharp" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10  " />
         
         
          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">4. Encourage feedback </span> 
          <li className="mb-2 text-gray-600 ml-20 mt-4"><span className="font-semibold  text-black ">ทำให้ช่องให้ข้อเสนอแนะนั้นใช้งานง่ายที่สุดเท่าที่จะเป็นไปได้</span> มิฉะนั้น คุณจะพลาดข้อเสนอแนะที่ช่องนี้ถูกออกแบบมาเพื่อรวบรวม  </li>
          </ul>
          <img src="/feedback.png" alt="feedback" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6 mt-10  " />












          
<ul className="list-disc p-5 mt-20 mb-4"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://drive.google.com/drive/folders/1ycXvEYELJjxjI-YqKSlLWEfzQd_1EEpF" target="_blank">Video บันทึกการสอน</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://drive.google.com/file/d/1FAkiQ_kq61iBOS-5qoM5SAbG1AEv-CAc/view" target="_blank">Gestal's Theory</a></li>
          
          
</ul>






<div className="flex justify-center mt-10">
      <ul className="flex space-x-2">
    
      <li>
      <Link href="/Learn/Value_Proposition_Canvas" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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
      <Link href="/Learn/WireFrame&Graphics" className="bg-blue-500 text-white px-3 py-1 rounded">
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
      <Link href="/Learn/Graphics_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>

 
</div>
</div>
  );
}



