import React from 'react'
import { Suspense } from 'react'
import ShipmentsPage from '../../src/features/shipments/shipmentsPage'
const page = () => {
  return (
      <div className='bg-gray-900'>
          <Suspense fallback={<div>Loading...</div>}>
              <ShipmentsPage/>
          </Suspense>
    </div>
  )
}

export default page
