
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4">
    
      <h2 className="text-4xl font-semibold mb-4 mt-20">A/B Testing.</h2>
      <p className="text-gray-700 mb-12">ใน A/B Testing นักออกแบบจะแบ่งกลุ่มผู้ใช้เป็นสองกลุ่ม โดยกลุ่มหนึ่งจะเห็นการออกแบบ A และอีกกลุ่มจะเห็นการออกแบบ B จากนั้นจะเก็บข้อมูลว่าผู้ใช้มีปฏิกิริยาอย่างไร เช่น คลิกปุ่มมากขึ้น มีส่วนร่วมกับเนื้อหามากขึ้น หรือทำตามเป้าหมายของเว็บไซต์หรือแอปได้ดีกว่าหรือไม่</p>
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <h3 className="text-3xl font-semibold mb-2">แบ่งเป็น 2 หัวข้อได้แก่</h3>
        <img src="/A_B_Testing.png" alt="A_B_Testing" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />

          <h3 className="text-2xl font-semibold mb-2 mt-6">1.องค์ประกอบของการทำ A/B Testing. </h3>
          
          <h3 className="text-xl font-semibold mb-2 mt-6 ml-10">การทำ A/B Testing. มีองค์ประกอบอยู่ 3 อย่างที่ต้องใช้ คือ : </h3>
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*VhPfZIYkcnV-vWZYaAvgjg.jpeg" alt="A_B_Testing" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6 mt-10 " />
        
          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">1. เป้าหมายของการทดสอบ (Goals) :</span> 
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">ความสำคัญ :</span> การกำหนดเป้าหมายชัดเจนจะทำให้ทราบว่าผลลัพธ์ที่คาดหวังคืออะไร ตัวอย่างเช่น เป้าหมายอาจเป็นการเพิ่มจำนวนคลิกปุ่มลงทะเบียน, เพิ่มอัตราการซื้อสินค้าจากหน้าเพจ, หรือปรับปรุงอัตราการมีส่วนร่วมกับเนื้อหา</li>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">ตัวอย่างเป้าหมาย :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">เพิ่ม Conversion Rate บนหน้าเว็บขายสินค้า</li>
          <li class="before:content-['-'] before:mr-2">ลดอัตราการละทิ้งรถเข็นในหน้า checkout</li>
          <li class="before:content-['-'] before:mr-2">เพิ่มการสมัครใช้งาน newsletter</li>

          </ul>
          </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2. ตัวแปรที่ใช้ในการทดสอบ (Variables) :</span> 
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">ความสำคัญ :</span> การเลือกตัวแปรที่จะทดสอบควรเป็นองค์ประกอบที่สามารถส่งผลกระทบต่อเป้าหมาย ตัวแปรที่ใช้ทดสอบใน A/B Testing อาจเป็นได้ทั้ง UI, UX, และข้อความที่ใช้ในหน้าเว็บ</li>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">ตัวอย่างตัวแปร :</span> 
          <ul class="list-none">
          <li class="before:content-['-'] before:mr-2">สีหรือขนาดของปุ่ม CTA (Call to Action)</li>
          <li class="before:content-['-'] before:mr-2">การเปลี่ยนแปลงข้อความโฆษณาหรือ heading</li>
          <li class="before:content-['-'] before:mr-2">การจัดวางเนื้อหาหรือองค์ประกอบบนหน้าเพจ</li>
          <li class="before:content-['-'] before:mr-2">รูปแบบการนำเสนอสินค้าหรือข้อเสนอ</li>
          <li class="before:content-['-'] before:mr-2">จำนวนขั้นตอนในกระบวนการซื้อหรือสมัครใช้งาน</li>
          </ul>
          
          </li>
          
          </ul>
          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">3. กลุ่มตัวอย่างที่ใช้ในการทดสอบ (Sample Groups) :</span> 
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">ความสำคัญ :</span> การแบ่งกลุ่มตัวอย่างมีความสำคัญในการทำให้การทดสอบนั้นน่าเชื่อถือ โดยกลุ่มผู้ใช้จะถูกแบ่งออกเป็นสองกลุ่ม (หรือมากกว่า) เพื่อให้ได้รับประสบการณ์ที่แตกต่างกันตามแต่ละเวอร์ชันของการออกแบบ</li>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">การเลือกกลุ่มตัวอย่าง :</span> ควรคำนึงถึงความหลากหลายและความสมดุล เพื่อให้ผลลัพธ์ที่ได้ไม่ลำเอียง กลุ่มตัวอย่างที่เลือกควรจะมีลักษณะเหมือนกันหรือมีพฤติกรรมการใช้งานใกล้เคียงกัน เช่น อายุ เพศ ตำแหน่งทางภูมิศาสตร์ หรือพฤติกรรมการใช้งานที่ผ่านมากับผลิตภัณฑ์</li>
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">ขนาดกลุ่มตัวอย่าง :</span>  การเลือกจำนวนคนที่มากพอจะทำให้ผลการทดสอบมีความน่าเชื่อถือมากขึ้น การมีขนาดกลุ่มตัวอย่างที่ใหญ่พอจะช่วยลดความคลาดเคลื่อนทางสถิติและทำให้ผลลัพธ์สามารถแปลความได้อย่างมั่นใจ</li>
          </ul>
          <img src="/cta.png" alt="A_B_Testing" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />

          <h3 className="text-2xl font-semibold mb-2 mt-6">2. Landing Page คืออะไร? </h3>
          <p className="text-gray-700 mb-12">คำว่า Landing Page ถ้าแปลตรงตัวจะมีความหมายว่าหน้าเว็บไซต์ที่คนเข้ามาเป็นหน้าแรกถูกทำขึ้นมาเพื่อจุดประสงค์อย่างใดอย่างหนึ่ง เช่น การเก็บข้อมูล</p>
          <img src="https://www.searchenginejournal.com/wp-content/uploads/2023/08/best-landing-page-examples-64e6080f990bb-sej.png" alt="Landing page" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2.1 จุดประสงค์ให้ชัดเจน :</span> 
          <li className="mb-2 text-gray-600 ml-20"><span className="font-semibold  text-black ">ความสำคัญ :</span>กฏข้อแรกที่สำคัญที่สุดคือ "การโฟกัส" ไปที่จุดประสงค์เพียงแค่อย่างใดอย่างหนึ่ง คุณต้องตอบตัวเองให้ได้ก่อนว่า คุณต้องการจะใช้
          Landing Page ทำอะไร จะเก็บ E-mail List จะขายของ หรือ อยากจะให้คนลงทะเบียนเข้างานสัมมนา เป็นต้น</li>
        
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2.2 ขอข้อมูลเฉพาะที่จำเป็น :</span> 
          <img src="/landing_page.png" alt="Landing page" className=" h-auto w-full max-w-4xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2.3 ปุ่ม call to action ต้องชัด :</span> 
          <img src="/cta2.png" alt="cta" className=" h-auto w-full max-w-3xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2.4 สั้นๆ ได้ใจความ :</span> 
          <img src="/short_Page.png" alt="short_Page" className=" h-auto w-full max-w-2xl mx-auto p-7  mb-6 mt-10 " />
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2.5 ถ้าจะยาว ต้องยาวแบบมีศิลปะ </span> 
          <li className="mb-2 text-gray-600 ml-20"> วิธีการสร้าง Landing Page แบบยาวที่ดีนั้นจะต้องลงรายละเอียด, ต้องบิวท์ และ ต้องใส่ Call to action เป็นระยะ </li>
          </ul>

          <ul class="list-disc p-5"> <span className="font-semibold  text-black ml-5">2.6 ทดลอง </span> 
          <li className="mb-2 text-gray-600 ml-20"> เทสต์อย่างน้อยที่สุด คือ 14 วัน </li>
          </ul>
          
        
          




          
<ul class="list-disc p-5 mt-20 mb-4"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
<li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold"> <a href=" https://www.canva.com/design/DAFl44FLfQ8/aK_sCqMkjG5Fhl_Lc9Z9zg/view?utm_content=DAFl44FLfQ8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.everydaymarketing.co/media/website/5-case-a-b-testing-for-website/" target="_blank">บทความเกี่ยวกับ A/B Testing</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.adwordsrobot.com/en/tools/a-b-split-test-mvt-test-calculator" target="_blank">A/B, Split Test and MVT Test Calculator Tools</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold"> <a href="https://www.cotactic.com/blog/what-is-bounce-rate/" target="_blank">What is Bounce-Rate?</a></li>
          
</ul>






 
</div>
</div>
  );
}



