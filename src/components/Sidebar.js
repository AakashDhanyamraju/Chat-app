import React, { useRef, useState,useEffect } from 'react'
import { Divider } from 'rsuite'
import CreateRoomBtnModel from './CreateRoomBtnModel'
import DashboardToggle from './dashboard/DashboardToggle'
import ChatRoomList from './rooms/ChatRoomList'


export const Sidebar = () => {
  const topSidebarRef=useRef()
  const [height,seHeight]=useState(0)

  useEffect(() => {
    if(topSidebarRef.current){
      seHeight(topSidebarRef.current.scrollHeight)
    }
  }, [topSidebarRef])

  return (
    <div className='h-100 pt-2'>
        <div>
            <DashboardToggle />
            <CreateRoomBtnModel />
            <Divider>Join Conversation</Divider>
        </div>

        <ChatRoomList aboveElHeight={height} />
    </div>
  )
}

export default Sidebar
