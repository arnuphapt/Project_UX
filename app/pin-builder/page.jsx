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
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const db = getFirestore(app)
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.email) {
      fetchStudentInfo()
    }
  }, [session])

  useEffect(() => {
    if (!loading) {
      if (!studentId || !section) {
        // Redirect if no studentId or section is found
        router.push(`/users/${session.user.email}?openModal=true`)
      }
    }
  }, [loading, studentId, section, router, session.user.email])

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
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='bg-[#e9e9e9] min-h-screen p-8 px-[10px] md:px-[160px]'>
        <div className="flex justify-center items-center h-full min-h-screen">
          <CircularProgress
            aria-label="Loading student information..."
            size="lg"
            color='primary'
            label="Loading student information..."
          />
        </div>
      </div>
    )
  }

  return (
    <div className='bg-[#e9e9e9] min-h-screen p-8 px-[10px] md:px-[160px]'>
      {studentId && section ? (
        <Form studentId={studentId} section={section} />
      ) : (
        <div className="flex justify-center items-center h-full min-h-screen">
          <p>No student information found. Redirecting...</p>
        </div>
      )}
    </div>
  )
}

export default PinBuilder
