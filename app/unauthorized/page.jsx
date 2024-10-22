"use client"
import React from 'react';
import { Button } from "@nextui-org/react";
import { CiCircleRemove } from "react-icons/ci";
import { useRouter } from 'next/navigation';

const UnauthorizedError = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <CiCircleRemove className="h-16 w-16 text-red-500 mb-4" />
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Unauthorized Access
          </h1>
          
          <p className="text-gray-600 mb-6">
            Sorry, you don't have permission to access this page. This area is restricted to administrators only.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => router.push('/')}
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Return Home
            </Button>
            
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="border-gray-300 hover:bg-gray-100"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedError;