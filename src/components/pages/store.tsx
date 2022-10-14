import React, { Suspense } from 'react'
import AppFooter from '../layouts/Footer'
import AppHeader from '../layouts/AppHeader'
import AppSidebar from '../layouts/AppSideBar'
import { CContainer, CSpinner } from '@coreui/react'
import { ProductList } from '../products/productLayout'
const Store = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper-custom d-flex flex-column min-vh-100 bg-light" id='shrinked-custom'>
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              <ProductList />
            </Suspense>
          </CContainer>
        </div>
        <AppFooter /> 
      </div>
    </div>
  )
}

export default Store