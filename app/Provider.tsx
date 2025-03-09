"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from 'react';
import {NextUIProvider} from "@nextui-org/react"

function Provider({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
    <SessionProvider >
        {children}
    </SessionProvider>
    </NextUIProvider>

  )
}

export default Provider