

import React, { Suspense } from 'react'
import AppFooter from '../layouts/Footer'
import AppHeader from '../layouts/AppHeader'
import AppSidebar from '../layouts/AppSideBar'
import { CContainer, CSpinner } from '@coreui/react'
const Cart = () => {
  return (

    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              Cart Welcomes you
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>

  )
}

export default Cart