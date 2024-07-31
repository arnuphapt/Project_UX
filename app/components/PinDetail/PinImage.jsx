import React, { useState, useEffect } from 'react';
import { Skeleton } from '@nextui-org/react';

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
      {loading ? (
        <Skeleton className="w-full h-[500px] rounded-2xl" />
      ) : (
        <img
          src={pinDetail.image ? pinDetail.image : PLACEHOLDER}
          alt={pinDetail.title}
          width={500}
          height={500}
          className='rounded-2xl'
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />
      )}
    </div>
  );
}

export default PinImage;
