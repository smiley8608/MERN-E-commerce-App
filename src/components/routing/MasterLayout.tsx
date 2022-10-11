
import React from 'react'
import AppFooter from '../layouts/Footer'
import AppHeader from '../layouts/AppHeader'
import AppSidebar from '../layouts/AppSideBar'
import MainRoute from "./mainrouting"

const MasterLayout = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <MainRoute />
                </div>
                <AppFooter />
            </div>
        </div>
    )
}

export default MasterLayout