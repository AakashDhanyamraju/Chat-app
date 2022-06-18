import React from 'react'
import { Button, Icon, InputGroup, Modal } from 'rsuite'
import { useModelState } from '../../../misc/custom-hooks'

const AttachmentBtnModal = () => {
    const {isOpen ,close,open}= useModelState()
  return (
    <div>
        <InputGroup.Button onClick={open} >
        <Icon icon='attachment' />
        </InputGroup.Button>
        <Modal show={isOpen} onHide={close} >
            <Modal.Header>
                <Modal.Title>Uplaod files</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <Button block >
                    Upload
                </Button>
                <div className='text-right mt-2' >
                    <small>* only files less than 5mb are allowed</small>
                </div>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AttachmentBtnModal