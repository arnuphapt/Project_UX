
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h1 className="text-2xl font-bold mb-4">lecture3 UX Strategy : Value Proposition Canvas</h1>
      <img src="/VPC.png" alt="VPC" className=" h-auto w-full max-w-3xl mx-auto p-7 mt-10 mb-10  " />
     
      
      
      <p className="text-gray-700 mb-8">แบ่งเป็น 2 หัวข้อ ได้แก่ 1. Customer Journey Maps in User Experience  และ 2. Value Proposition Canvas </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
      
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Value_Proposition_Canvas/Customer_Journey_Maps_in_UX">
            <img src="/CJM.png" alt="Customer Journey Maps" className="w-full  mb-4 cursor-pointer" />
        </Link>
         <h3 className="text-lg font-semibold mb-2 mt-9">1. Customer Journey Maps in User Experience</h3>
        <p className="text-gray-600 mb-4">เครื่องมือที่ใช้แสดงให้เห็นถึงกระบวนการที่ผู้ใช้หรือลูกค้าต้องผ่านเมื่อมีปฏิสัมพันธ์กับผลิตภัณฑ์หรือบริการ</p>
        <Link href="Value_Proposition_Canvas/Customer_Journey_Maps_in_UX">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <Link href="Value_Proposition_Canvas/VPC">
            <img src="/VPC.png" alt="vpc" className="w-full h-auto mb-4 cursor-pointer" />
        </Link>
        <h3 className="text-lg font-semibold mt-9 mb-2">2. Value Proposition Canvas</h3>
        <p className="text-gray-600 mt-8 mb-9"> เป็นเครื่องมือที่ช่วยวิเคราะห์และพัฒนาความสัมพันธ์ระหว่างสินค้า/บริการของธุรกิจ  และความต้องการของลูกค้า </p>
        <Link href="Value_Proposition_Canvas/VPC">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
        </Link>
        </div>

      </div>
      
    </div>
    
  );
}

