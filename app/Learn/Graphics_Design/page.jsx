
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h1 className="text-2xl font-bold mb-4">Lecture5. Principles of Graphics Design </h1>
      <img src="/PO_GRAPHIC.png" alt="Evaluation" className=" h-auto w-full max-w-3xl mx-auto p-7 mt-10 mb-10  " />
     
      
      
      <p className="text-gray-700 mb-8">แบ่งเป็น 3 หัวข้อ ได้แก่ 1. Layout And Composition  2. The Psychology Of Color In Marketing And Branding และ 3. Color Theory </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Graphics_Design/Layout_and_Composition">
            <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/2056/posts/34238/image/19-10-04%20ART%20The%20Principles%20of%20DesignArtboard%201%20copy.jpg" alt="ab test" className="w-full h-64 mb-4 cursor-pointer" />
        </Link>
         <h3 className="text-lg font-semibold mb-2 mt-9">1. Layout And Composition</h3>
        <p className="text-gray-600 mb-4">คือหลักการพื้นฐานในงานออกแบบ (Design) ที่เกี่ยวข้องกับการจัดองค์ประกอบต่างๆ ในงานให้มีความสมดุล น่าสนใจ และสื่อสารได้อย่างมีประสิทธิภาพ</p>
        <Link href="Graphics_Design/Layout_and_Composition">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Graphics_Design/Psychology_Of_Color">
            <img src="https://shamrockcompanies.net/wp-content/uploads/Psychology-of-Color.jpg" alt="ab test" className="w-full h-64 mb-4 cursor-pointer" />
        </Link>
         <h3 className="text-lg font-semibold mb-2 mt-9">2. The Psychology Of Color In Marketing And Branding</h3>
        <p className="text-gray-600 mb-4">การศึกษาและการใช้สีในงานการตลาดและการสร้างแบรนด์ โดยมีการอ้างอิงถึงผลกระทบของสีต่ออารมณ์ ความรู้สึก และการตัดสินใจของผู้บริโภค</p>
        <Link href="Graphics_Design/Psychology_Of_Color">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Graphics_Design/Color_Theory">
            <img src="https://lthscomputerart.weebly.com/uploads/9/8/2/3/9823286/7397783_orig.jpg" alt="Heuristic Evaluation" className="w-full h-auto mb-4 cursor-pointer" />
        </Link>
        <h3 className="text-lg font-semibold mb-2 mt-20">3. Color Theory</h3>
        <p className="text-gray-600 mb-9">การศึกษาวิธีการที่สีต่างๆ สามารถทำงานร่วมกันและส่งผลต่อความรู้สึก การรับรู้ และการรับข้อมูลในงานออกแบบ</p>
        <Link href="Graphics_Design/Color_Theory">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
        </div>

      </div>
      <ul className="list-disc p-5 mt-12"> <span className="font-semibold  text-black"> สามารถศึกษาเพิ่มเติมได้ที่  :</span> 
      <li className="mb-2 ml-6 text-blue-500 font-semibold  mt-4"> <a href=" https://www.canva.com/design/DAFl41uHJqU/xcxPvuXmTsbYi1PvmKXIJA/view?utm_content=DAFl41uHJqU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">สไลด์เนื้อหาเพิ่มเติม</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://www.youtube.com/playlist?list=PLj63OwXv6t5QBPvu2qqL2BzMFFQuJwxY1" target="_blank">VDO ประกอบการสอน ทฤษฏีกราฟิกส์เพื่อการออกแบบ</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://www.youtube.com/watch?v=_2LLXnUdUIc " target="_blank">การออกแบบกราฟิกเริ่มต้น " สี "</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://youtu.be/Qj1FK8n7WgY?si=qayYdkzFPvNIyMCF&t=480" target="_blank">ตัวอย่างของการใช้สี Understanding Color (นาทีที่ 8)</a></li>
          <li className="mb-2 ml-6 text-blue-500 font-semibold "> <a href="https://www.cssmania.com/colors/" target="_blank">Most common colors used in CSS Mania screenshots.</a></li>
          
      </ul>


      <div className="flex justify-center mt-10">
      <ul className="flex space-x-2">
    
      <li>
      <Link href="/Learn/WireFrame&Graphics" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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
      <Link href="/Learn/Graphics_Design" className="bg-blue-500 text-white px-3 py-1 rounded">
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
      <Link href="/Learn/7_Principles" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>
    </div>

    
    
  );
}

