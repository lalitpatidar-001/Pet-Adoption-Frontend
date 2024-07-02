import React from 'react'
import {Outlet} from "react-router-dom"
import SideBar from '../components/SideBar'
export const MainLayout = () => {
  return (<>
    <div className="flex gap-[2px] bg-[#dddddd]">
    <SideBar/>
    <Outlet/>
    </div>
  </>
  )
}
