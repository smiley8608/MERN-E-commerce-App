import React from 'react'
import {logoNegative} from '../assets/logo-negative'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSideBarNav';
import { sygnet } from '../assets/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from './Navigator/Navigator'
import { useAppDispatch, useAppSelector } from '../redux/hook'
// import { sidebarToggle } from '../Redux/Slices/CommonSlice'

const CSidebarBrandCustom = CSidebarBrand as any
const AppSidebar = () => {
  // const dispatch = useAppDispatch()
  const unfoldable = useAppSelector((state) => state.Slidbar.sidebarUnfoldable)
  const sidebarShow = useAppSelector((state) => state.Slidbar.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        // dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrandCustom className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrandCustom>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          // dispatch(sidebarToggle())
          const elemmain = document.getElementById("shrinked-custom") as HTMLDivElement
          if (window.innerWidth >= 768) {
            elemmain.style.paddingLeft = "16em"
            if (sidebarShow) {
              elemmain.style.paddingLeft = "0em"
            }
          }
        }}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)