import React from 'react'
import { Button, Modal } from 'rsuite'
import { useModelState } from '../../../misc/custom-hooks'
import ProfileAvatar from '../../ProfileAvatar'


const ProfileInfoBtnModal = ({profile}) => {
    const {isOpen, close, open} = useModelState()
    const {name,avatar,createdAt}= profile
    const memberSince = new Date(createdAt).toLocaleDateString()

    const shortName = profile.name.split(' ')[0]

  return (
    <div>
        <Button className='ml-2' onClick={open} >
            {shortName}
        </Button>
        <Modal show = {isOpen} onHide={close} >
            <Modal.Header>
                <Modal.Title>
                    {shortName} profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center' >
                <ProfileAvatar src={avatar} name={name} className="width-200 height-200 font-huge img-fullsize" />
                <h4 className='mt-2' >{name}</h4>
                <p>Member since {memberSince}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button block onClick={close} >
                    Close
                </Button>
            </Modal.Footer>

        </Modal>
    </div>
  )
}

export default ProfileInfoBtnModal