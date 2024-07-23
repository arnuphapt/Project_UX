
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4">
    
      <h2 className="text-xl font-semibold mb-4">Design basics</h2>
      <p className="text-gray-700 mb-8">เริ่มต้นการออกแบบโดยการเรียนรู้พื้นฐาน</p>

      <div className="max-w-8xl mx-auto">
          <div className="bg-green-200 p-6 rounded-lg shadow-lg mb-6">
            <div className="flex items-center">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2">Basic Design</h3>
                <p className="mb-4">
                  การเริ่มต้นในการออกแบบ หากคุณเคยต้องการที่จะประกอบอาชีพด้านการออกแบบ เรียนรู้
                  กระบวนการออกแบบอย่างละเอียด หรือต้องการปรับปรุงความสวยงามในชีวิตประจำวันของคุณกับ
                  นักออกแบบ คุณมาถูกที่แล้ว
                </p>
                <Link href="design/basicdesign">
                <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
                </Link>
              </div>
              <div className="w-1/2 ">
                <img src="https://cdn.sanity.io/images/599r6htc/localized/80e3e2472a0120ed87663cf758f1cbfe9be2be47-2400x1256.png?w=720&q=75&fit=max&auto=format" alt="Basic Design" className="w-full"/>
              </div>
            </div>
          </div>
        
        
       
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2  ">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/7f3f72076e890e360beb6592c3459ed2cd24e772-721x720.png?rect=1,0,720,720&w=360&h=360&q=75&fit=max&auto=format" alt="Design basics" className="w-50 h-50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">การออกแบบผลิตภัณฑ์คืออะไร</h3>
          <p className="text-gray-600 mb-4">เรียนรู้ว่านักออกแบบผลิตภัณฑ์ช่วยกำหนดเป้าหมายที่สำคัญได้อย่างไร จากทั้งมุมมองของผู้ใช้และธุรกิจ</p>
          <Link href="design/basicdesign">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/1f7ef3c1760121cb0faa881ce18b2e79abaeab7e-1440x1440.png?w=360&h=360&q=75&fit=max&auto=format" alt="Design basics" className="w-50 h-50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">ไวร์เฟรมคืออะไร?</h3>
          <p className="text-gray-600 mb-4">เรียนรู้วิธีเริ่มสร้างแอปหรือเว็บไซต์ที่ยอดเยี่ยมต่อไปของคุณ</p>
          <Link href="design/basicdesign">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/455495f6ad7b7041dac51e9f15807a7612c3116c-721x721.png?w=360&h=360&q=75&fit=max&auto=format" alt="Design basics" className="w-50 h-50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">การคิดเชิงออกแบบคืออะไร</h3>
          <p className="text-gray-600 mb-4">ค้นพบวิธีการออกแบบประสบการณ์ที่น่าพึงพอใจและมีความหมายสำหรับผู้ใช้</p>
          <Link href="design/basicdesign">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/adb1bd7459f8829d2596694a4bce80debc471ee2-721x721.png?w=360&h=360&q=75&fit=max&auto=format" alt="Design basics" className="w-50 h-50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Wireframes กับ mockups: อะไรคือความแตกต่าง??</h3>
          <p className="text-gray-600 mb-4">เรียนรู้พื้นฐานของการสร้างหน้าเว็บที่ดึงดูดสายตาและเน้นผู้ใช้เป็นหลัก</p>
          <Link href="design/basicdesign">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/9f30eada30a60a56dfdf4d0557d9befae842ad16-721x721.png?w=360&h=360&q=75&fit=max&auto=format" alt="Design basics" className="w-50 h-50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">What is human computer interaction?</h3>
          <p className="text-gray-600 mb-4">เรียนรู้การใช้ HCI กับกระบวนการออกแบบของคุณด้วย Figma</p>
          <Link href="design/basicdesign">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <img src="https://cdn.sanity.io/images/599r6htc/localized/5d9c1e00bef637aa128399b76afffc35753dbe8d-720x720.png?w=360&h=360&q=75&fit=max&auto=format" alt="Design basics" className="w-50 h-50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">การออกแบบเว็บคืออะไร?</h3>
          <p className="text-gray-600 mb-4">เรียนรู้พื้นฐานของการสร้างหน้าเว็บที่ดึงดูดสายตาและเน้นผู้ใช้เป็นหลัก</p>
          <Link href="design/basicdesign">
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
        
        
       
      </div>
    </div>
  );
}



