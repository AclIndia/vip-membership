'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const customLabels: Record<string, string> = {
  admin: 'Home',
}

const excludedSegments = ['app']

const DynamicBreadcrumb: React.FC = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '' && !excludedSegments.includes(segment))

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const label = customLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === pathSegments.length - 1

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <Link href={href} passHref legacyBehavior>
              <BreadcrumbLink>{label}</BreadcrumbLink>
            </Link>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    )
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/" passHref legacyBehavior>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        {pathSegments.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default DynamicBreadcrumb