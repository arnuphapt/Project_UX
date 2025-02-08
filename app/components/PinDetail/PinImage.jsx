import React, { useState, useEffect } from 'react';
import { Skeleton } from "@heroui/react";

const PLACEHOLDER = '/Images/placeholder.jpg';

function PinImage({ pinDetail }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>

        <img
          src={pinDetail.image ? pinDetail.image : PLACEHOLDER}
          alt={pinDetail.title}
          width={600}
          height={600}
          className='rounded-2xl'
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />

    </div>
  );
}

export default PinImage;
