import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';

export default function App() {
  const router = useRouter();
  const pathname = usePathname();

  // Split the pathname into an array of path segments
  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <Breadcrumbs variant="light" size="lg" className="mb-3">
      <BreadcrumbItem onClick={() => router.push('/')}>Home</BreadcrumbItem>
      {pathSegments.length > 0 && (
        <BreadcrumbItem>
          {pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1).replace(/-/g, ' ')}
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
}
