import React from 'react'
import { Button,Drawer,Icon } from 'rsuite'
import Dashboard from '.'
import { useMediaQuery, useModelState } from '../../misc/custom-hooks'

const DashboardToggle = () => {

    const {open,isOpen,close} = useModelState()
    const isMobile=useMediaQuery('(max-width:992px)')



    
  return (
    <>
        <Button block color="blue" onClick={open}>
            <Icon icon="dashboard" />Dashboard
        </Button>
        <Drawer full={isMobile} show={isOpen} onHide={close} placement='left' >
            <Dashboard />
        </Drawer>
    </>
  )
}

export default DashboardToggle