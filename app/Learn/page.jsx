
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">เนื้อหาเพิ่มเติม</h1>
      <p className="text-gray-700 mb-8">ค้นพบแนวทางปฏิบัติที่ดีที่สุดและเนื้อหาวิธีใช้เพื่อเป็นแนวทางการพัฒนางานของคุณ</p>

      <h2 className="text-xl font-semibold mb-4">Figma Design</h2>
      <p className="text-gray-700 mb-8">เจาะลึกหัวข้อการออกแบบและวิธีนำไปใช้กับแหล่งข้อมูลหลักนี้จาก Figma</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/80e3e2472a0120ed87663cf758f1cbfe9be2be47-2400x1256.png?w=720&q=75&fit=max&auto=format" alt="Design basics" className="w-full h-64 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Design basics</h3>
          <p className="text-gray-600 mb-4">เริ่มต้นการออกแบบโดยการเรียนรู้พื้นฐา</p>
          <Link href="Learn/design">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/3be051c77cbd4295b2e18809a521d0e66887ca16-720x721.png?rect=0,73,720,576&w=540&h=432&q=75&fit=max&auto=format" alt="UI design" className="w-full h64 mb-4" />
          <h3 className="text-lg font-semibold mb-2">UI design</h3>
          <p className="text-gray-600 mb-4">เรียนรู้วิธีการออกแบบส่วนต่อประสานสำหรับผู้ใช้</p>
          <a href="#" className="text-blue-500 font-semibold">ดูรายละเอียดเพิ่มเติม</a>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/29e39a5d558657d76d75489bb26f0a2ffe0e97f5-720x721.png?rect=0,1,720,720&w=360&h=360&q=75&fit=max&auto=format" alt="UX design" className="w-full h64 mb-4" />
          <h3 className="text-lg font-semibold mb-2">UX design</h3>
          <p className="text-gray-600 mb-4">ค้นพบวิธีการออกแบบประสบการณ์การใช้งานที่ดี</p>
          <a href="#" className="text-blue-500 font-semibold">ดูรายละเอียดเพิ่มเติม</a>
        </div>
      </div>
    </div>
  );
}


