import React from 'react'
import { Link } from 'react-router-dom'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  // CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CNavbarText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

// import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './Header/index';
import { logo } from '../assets/logo'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { sidebarToggle } from '../redux/headerSlice'

const CHeaderBrandCustom = CHeaderBrand as any

const AppHeader = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.User.Auth)
  const sidebarShow = useAppSelector((state) => state.Slidbar.sidebarShow)
  console.log(auth + 'header');
  

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => {
            dispatch(sidebarToggle())
            const elemmain = document.getElementById("shrinked-custom") as HTMLDivElement
            if(window.innerWidth >= 768){
              elemmain.style.paddingLeft = "16em"
              if(sidebarShow){
                elemmain.style.paddingLeft = "0em"
              }
            }
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrandCustom className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} />
        </CHeaderBrandCustom>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/"}><CNavbarText>Store</CNavbarText></Link>
          </CNavItem>
          <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/cart"}><CNavbarText>Cart</CNavbarText></Link>
          </CNavItem>
          {auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/u/orders"}><CNavbarText>Orders</CNavbarText></Link>
          </CNavItem>}
          {auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/u/profile"}><CNavbarText>Account</CNavbarText></Link>
          </CNavItem>}
          {auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/u/signout"}><CNavbarText>SignOut</CNavbarText></Link>
          </CNavItem>}
          {auth && <CNavItem> 
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/u/connectwallet"}><CNavbarText>ConnectWallet</CNavbarText></Link>
          </CNavItem>}
          {!auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/signin"}><CNavbarText>Sign In</CNavbarText></Link>
          </CNavItem>}
          {!auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/signup"}><CNavbarText>Sign Up</CNavbarText></Link>
          </CNavItem>}
          
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader