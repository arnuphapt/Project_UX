
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h1 className="text-2xl font-bold mb-4">Lecture8 Evaluation </h1>
      <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20211214172455/7-Best-Tips-For-Evaluating-UX-UI-Designers.jpg" alt="Evaluation" className=" h-auto w-full max-w-3xl mx-auto p-7 mt-10 mb-10  " />
     
      
      
      <p className="text-gray-700 mb-8">แบ่งเป็น 2 หัวข้อ ได้แก่ A/B Testing และ Heuristic Evaluation. </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Evaluation/A_B_testing">
            <img src="https://user.oc-static.com/upload/2018/07/17/15318170671735_ABcycle_AdobeStock_94041229.jpg" alt="ab test" className="w-full h-64 mb-4 cursor-pointer" />
        </Link>
         <h3 className="text-lg font-semibold mb-2 mt-9">1. A/B Testing</h3>
        <p className="text-gray-600 mb-4">เรียนรู้หลักการพื้นฐานการทดสอบสองตัวเลือก ของ User Interface หรือ User Experience เพื่อดูว่าตัวเลือกไหนให้ผลลัพธ์ที่ดีกว่า</p>
        <Link href="Evaluation/A_B_testing">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Evaluation/Heuristic_Evaluation">
            <img src="https://www.datocms-assets.com/48294/1660120496-usability-heuristics-5-most-used-usability-heuristics-wikimedia-commons.jpeg?auto=format" alt="Heuristic Evaluation" className="w-full h-auto mb-4 cursor-pointer" />
        </Link>
        <h3 className="text-lg font-semibold mb-2">2. Heuristic Evaluation</h3>
        <p className="text-gray-600 mb-9">เนื้อหาในหัวข้อ A/B Testing และ Heuristic Evaluation.</p>
        <Link href="Evaluation/Heuristic_Evaluation">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
        </div>


       
      </div>
      <div className="flex justify-center mt-10">
      <ul className="flex space-x-2">
    
      <li>
      <Link href="/Learn/8_GoldenRules" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
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
      <Link href="/Learn/8_GoldenRules" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        7
      </Link>
    </li>
    <li>
      <Link href="/Learn/Evaluation" className="bg-blue-500 text-white px-3 py-1 rounded">
        8
      </Link>
    </li>
    <li>
      <Link href="/Learn/Universal_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        9
      </Link>
    </li>

    <li>
      <Link href="/Learn/Universal_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>
    </div>
    
  );
}

