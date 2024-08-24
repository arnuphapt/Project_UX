"use client"

import React, { useState, useEffect } from 'react'
import Form from './../components/Form'
import { useSession } from "next-auth/react"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import app from '../Shared/firebaseConfig'
import { useRouter } from 'next/navigation'
import { CircularProgress } from "@nextui-org/react"

function PinBuilder() {
  const [studentId, setStudentId] = useState('')
  const [section, setSection] = useState('')
  const { data: session } = useSession()
  const db = getFirestore(app)
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.email) {
      fetchStudentInfo()
    }
  }, [session])

  const fetchStudentInfo = async () => {
    try {
      const docRef = doc(db, 'student-info', session.user.email)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setStudentId(data.studentId)
        setSection(data.section)
      } else {
        // If student info doesn't exist, redirect to profile page
        router.push(`/users/${session.user.email}?openModal=true`)
      }
    } catch (error) {
      console.error("Error fetching student info: ", error)
      // Handle error (e.g., show error message to user)
    }
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          color="warning"
        />
      </div>
    )
  }

  return (
    <div className='bg-[#e9e9e9] min-h-screen p-8 px-[10px] md:px-[160px]'>
      {studentId && section ? (
        <Form studentId={studentId} section={section} />
      ) : (
        <div className="flex justify-center items-center h-full min-h-screen">
          <CircularProgress
            aria-label="Loading student information..."
            size="lg"
            color="warning"
          />
        </div>
      )}
    </div>
  )
}

export default PinBuilder
