"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from 'react';
import {HeroUIProvider} from "@heroui/react"

function Provider({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>

    <SessionProvider >
        {children}
    </SessionProvider>
    </HeroUIProvider>

  )
}

export default Provider