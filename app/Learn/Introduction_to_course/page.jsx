import React from 'react';
import Link from 'next/link';

export default function Learn() {
    
  return (

    <div className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-10">
      <h1 className="text-2xl font-bold mb-4">Lecture 1 Introduction to course</h1>
      <img
        src="/introlec1.png"
        alt="Introduction to course"
        className="h-auto w-full max-w-4xl mx-auto p-7 mt-10 mb-10"
      />

      <h2 className="ml-4 mb-8 mt-20">
        อย่างแรกเรามาทำความเข้าใจเบื้องต้นเกี่ยวกับบทนำ โดยการรับชมวิดิโอ User experience (Ux) Intro Course กันก่อนดีกว่า
      </h2>
      <iframe
        className="w-full max-w-2xl h-96 mt-10 mb-10 m-auto"
        src="https://www.youtube.com/embed/2QQQtiFwXjU"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h2 className="ml-4 mb-8 mt-20">
        หากอยากรู้จักอาชีพที่เกี่ยวกับ User experience (Ux) /User Interface (UI) สามารถเข้ารับชมเพิ่มเติมได้ที่
      </h2>
      <iframe
        className="w-full max-w-2xl h-96 mt-10 mb-10 m-auto"
        src="https://www.youtube.com/embed/AysUmUEbvsQ"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h2 className="text-xl font-bold mb-4 mt-20">User Experience (Ux) คืออะไร ?</h2>
      <h2 className="text-l font-bold mb-4 ml-5">ประสบการณ์ผู้ใช้งาน</h2>
      <h2 className="text-l mb-4 ml-5">
        เนื่องจากมนุษย์ทุกคนต่างมีความรู้สึกที่ตอบสนองต่อการใช้งานบางอย่าง ไม่ว่าจะเป็นผลิตภัณฑ์หรือแพลตฟอร์มเว็บไซต์ต่าง ๆ ตัวอย่างเช่น โกรธ, สนุกสนาน, มีความสุข, เครียด,
        พึงพอใจ เป็นต้น ซึ่งความรู้สึกเหล่านี้มักเกิดขึ้นหลังจากการใช้งานบางอย่างเสมอ
      </h2>
      <h2 className="ml-4 mb-8 font-bold mt-20">
        ใน Lecture บทที่ 1 บทนำนี้ จะแบ่งออกเป็น 2 เรื่อง ได้แก่ 1. People in User experience (UX) และ 2. How to Create UX Personas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <Link
            href="https://www.canva.com/design/DAFBNodGkLQ/UxibHwguGv5ehVWgXv87MQ/view?utm_content=DAFBNodGkLQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <img
              src="https://i.ytimg.com/vi/9BdtGjoIN4E/maxresdefault.jpg"
              alt="People in ux"
              className="w-full h-auto mb-4 cursor-pointer"
            />
          </Link>
          <h3 className="text-lg font-semibold mb-2 mt-14">1. People in User experience (UX)</h3>
          <p className="text-gray-600 mb-4">
            ความเป็นมาของบุคคลที่ให้แนวคิดต่าง ๆ ในด้าน ประสบการณ์ผู้ใช้งาน
          </p>
          <Link
            href="https://www.canva.com/design/DAFBNodGkLQ/UxibHwguGv5ehVWgXv87MQ/view?utm_content=DAFBNodGkLQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <Link
            href="https://www.canva.com/design/DAFBNtufQJU/V8KHDO4imBfu8ntrVI2ZIg/view?utm_content=DAFBNtufQJU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <img
              src="https://cms.boardmix.com/images/articles/user-personas-02.png"
              alt="UX Personas"
              className="w-full h-auto mb-4 cursor-pointer"
            />
          </Link>
          <h3 className="text-lg font-semibold mb-2">2. How to Create UX Personas</h3>
          <p className="text-gray-600 mb-9">
            วิธีสร้างบุคลิกผู้ใช้งาน เพื่อช่วยให้ทีมออกแบบเข้าใจผู้ใช้งานมากขึ้นและสามารถพัฒนาโซลูชันที่ตอบโจทย์ผู้ใช้ได้ดีขึ้น
          </p>
          <Link
            href="https://www.canva.com/design/DAFBNtufQJU/V8KHDO4imBfu8ntrVI2ZIg/view?utm_content=DAFBNtufQJU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
            target="_blank"
          >
            <span className="text-blue-500 font-semibold cursor-pointer">ดูรายละเอียดเพิ่มเติม</span>
          </Link>
        </div>
      </div>

      <ul className="list-disc p-5 mt-20 mb-4">
        <span className="font-semibold text-black">สามารถศึกษาเพิ่มเติมได้ที่ :</span>
        <li className="mb-2 ml-6 mt-4 text-blue-500 font-semibold">
          <a
            href="https://www.youtube.com/playlist?list=PLiwVA5qjDkicrRkWfrKcDiktwiizwTG7c"
            target="_blank"
          >
            People in UX (VDO Playlist - รวม 20 นาที)
          </a>
        </li>
        <li className="mb-2 ml-6 text-blue-500 font-semibold">
          <a
            href="https://www.youtube.com/playlist?list=PLiwVA5qjDkiddFIFN5chvhtFcLYAKsMlg"
            target="_blank"
          >
            Persona (Clip VDO - 2 clips รวม 12 นาที)
          </a>
        </li>
      </ul>
{/* Pagination Section */}
  <div className="flex justify-center mt-10">
  <ul className="flex space-x-2">
    <li>
      <Link href="/Learn/Introduction_to_course" className="bg-blue-500 text-white px-3 py-1 rounded">
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
      <Link href="/Learn/Learn/WireFrame&Graphics" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        3
      </Link>
    </li>
    <li>
      <Link href="/Learn/Graphics_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        3
      </Link>
    </li>
    <li>
      <Link href="/Learn/7_Principles" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        3
      </Link>
    </li>
    <li>
      <Link href="/Learn/8_GoldenRules" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        3
      </Link>
    </li>
    <li>
      <Link href="/Learn/Evaluation" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        3
      </Link>
    </li>
    <li>
      <Link href="/Learn/Universal_Design" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        3
      </Link>
    </li>

    <li>
      <Link href="/Learn/Business_Model_Canvas" className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
        ถัดไป
      </Link>
    </li>
  </ul>
</div>

      
    </div>
  );
}
