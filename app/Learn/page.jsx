
import React from 'react';
import Link from 'next/link';
export default function learn() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 mt-10">เนื้อหาในรายวิชา</h1>
      

      <h2 className="text-xl font-semibold mb-4 ml-6">User Experience Design</h2>
      <p className="text-gray-700 mb-8 ml-6">CP352002 :: User Experience Design </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
  <Link href="Learn/Introduction_to_course">
    <img src="/banner_intro.png" alt="Seven Principles" className="w-full h-auto mb-4 cursor-pointer" />
  </Link>
  <h3 className="text-lg font-semibold mb-2 mt-20">Lecture1.  Introduction to course</h3>
  <p className="text-gray-600 mb-4">การแนะนำหลักสูตร</p>
  <Link href="Learn/Introduction_to_course">
    <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
  </Link>
</div>
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
  <Link href="Learn/Graphics_Design">
    <img src="https://www.flottmanco.com/wp-content/uploads/2016/01/designprinciples.jpg" alt="Principles of Graphics Design" className="w-full h-64 mb-4 cursor-pointer" />
  </Link>
  <h3 className="text-lg font-semibold mb-2 mt-9">Lecture5. Principles of Graphics Design</h3>
  <p className="text-gray-600 mb-4">เรียนรู้หลักการพื้นฐานที่ใช้ในการสร้างงานออกแบบกราฟิก</p>
  <Link href="Learn/Graphics_Design">
    <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
  </Link>
</div>

<div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
  <Link href="Learn/7_Principles">
    <img src="https://media.licdn.com/dms/image/C4D12AQGgET1oMhCJUA/article-cover_image-shrink_600_2000/0/1520179633562?e=2147483647&v=beta&t=d3Ip2NRdiXGEUO2LXRm3EIjuXITNCZV1_S5HIicIuPo" alt="Seven Principles" className="w-full h-64 mb-4 cursor-pointer" />
  </Link>
  <h3 className="text-lg font-semibold mb-2 mt-9">Lecture6. Seven Principles</h3>
  <p className="text-gray-600 mb-4">เรียนรู้หลักการทั้งเจ็ดที่ช่วยทำให้เว็บไซต์ของคุณมีความน่าสนใจมากขึ้นโดย ดร. ซูซาน ไวน์เชงค์:</p>
  <Link href="Learn/7_Principles">
    <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
  </Link>
</div>

<div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
  <Link href="Learn/8_GoldenRules">
    <img src="https://media.licdn.com/dms/image/D5612AQFCRV_XF5lPcA/article-cover_image-shrink_600_2000/0/1704279783390?e=2147483647&v=beta&t=PjNrFwDQOjt0_flf3dJ3Wc-PqULprgspV2wbINzDAQI" alt="Eight Golden Rules" className="w-full h-64 mb-4 cursor-pointer" />
  </Link>
  <h3 className="text-lg font-semibold mb-2">Lecture7. Eight Golden Rules</h3>
  <p className="text-gray-600 mb-4">ปฏิบัติตาม "กฎทอง 8 ประการในการออกแบบอินเทอร์เฟซ" ของ Ben Shneiderman หากคุณต้องการออกแบบอินเทอร์เฟซผู้ใช้ที่ยอดเยี่ยม</p>
  <Link href="Learn/8_GoldenRules">
    <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
  </Link>
</div>

<div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
  <Link href="Learn/Evaluation">
    <img src="https://splitmetrics.com/wp-content/uploads/2016/07/v5.png" alt="Evaluation" className="w-full h-64 mb-4 cursor-pointer" />
  </Link>
  <h3 className="text-lg font-semibold mb-4">Lecture8. Evaluation</h3>
  <p className="text-gray-600 mb-4">เนื้อหาในหัวข้อ A/B Testing และ Heuristic Evaluation.</p>
  <Link href="Learn/Evaluation">
    <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
  </Link>
</div>

<div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
  <Link href="Learn/Universal_Design">
    <img src="/Universal_banner.png" alt="Universal_banner" className="w-full h-64 mb-4 cursor-pointer" />
  </Link>
  <h3 className="text-lg font-semibold mb-2 mt-12">Lecture9. Universal Design</h3>
  <p className="text-gray-600 mb-4">แนวคิดในการออกแบบประสบการณ์และอินเทอร์เฟซผู้ใช้งานที่สามารถเข้าถึงและใช้งานได้โดยคนทุกกลุ่ม</p>
  <Link href="Learn/Universal_Design">
    <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
  </Link>
</div>


      </div>
    </div>
  );
}

