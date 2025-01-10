"use client";

import React, { useState } from 'react';
import HallOfFame from '../../components/hallofframe';

const HallPage = () => {
  // Sample data structure matching the HallOfFame component requirements
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <HallOfFame  />
      </div>
    </div>
  );
};

export default HallPage;