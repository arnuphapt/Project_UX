import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';

export default function App() {
  const router = useRouter();
  const pathname = usePathname();

  // Split the pathname into an array of path segments
  const pathSegments = pathname.split('/').filter(segment => segment);

  // Build a path for each breadcrumb item
  const buildPath = (index) => {
    return '/' + pathSegments.slice(0, index + 1).join('/');
  };

  // Function to decode URL components and hide IDs or unnecessary paths
  const formatSegment = (segment) => {
    // Decode URL encoding
    const decodedSegment = decodeURIComponent(segment);

    // Hide segments that are likely IDs (e.g., long numeric values)
    if (/^\d+$/.test(decodedSegment)) {
      return null; // Hide if it's a numeric ID
    }

    // Replace dashes with spaces and capitalize the first letter
    return decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1).replace(/-/g, ' ');
  };

  return (
    <Breadcrumbs variant="light" size="lg" className="mb-3">
      <BreadcrumbItem onClick={() => router.push('/')}>Home</BreadcrumbItem>
      {pathSegments.map((segment, index) => {
        const formattedSegment = formatSegment(segment);
        if (!formattedSegment) return null; // Skip rendering hidden segments (like IDs)
        return (
          <BreadcrumbItem 
            key={index} 
            onClick={() => router.push(buildPath(index))}
            isCurrent={index === pathSegments.length - 1} // Mark the last item as current
          >
            {formattedSegment}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
