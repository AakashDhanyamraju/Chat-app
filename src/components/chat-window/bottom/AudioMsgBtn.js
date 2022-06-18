import React, { useCallback, useState } from 'react'
import { Alert, Icon, InputGroup } from 'rsuite'
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import { storage } from '../../../misc/firebase';


const AudioMsgBtn = ({afterUpload}) => {
    const {chatId} = useParams()

    const [isRecording, setIsRecording] = useState(false)
    const[isUploading, setIsUplaoding] = useState(false)

    const onClick = useCallback(()=>{
        setIsRecording(p=>!p)
    })

    const onUpload = useCallback(async(data)=>{
        setIsUplaoding(true)
        try {
            const snap = await storage
            .ref(`/chat/${chatId}`).
            child(`audio_${Date.now()}`)
            .put(data.blob,{cacheControl: `public,m-age=${366*24*3}`})

            const file = {

                contentType: snap.metadata.contentType,
                name: snap.metadata.name,
                url: await snap.ref.getDownloadURL()
            }
            setIsUplaoding(false)
            afterUpload([file])
        } catch (err) {
            setIsUplaoding(false)
            Alert.error(err.message,4000)
        }

    },[])

  return (

        <InputGroup.Button onClick={onClick} disabled={isUploading} className={isRecording ? 'animate-blink' : ''} >
        <Icon icon='microphone' />
        <ReactMic
          record={isRecording}
          className="d-none"
          onStop={onUpload}
          mimeType= 'audio/mp3'

          />
        </InputGroup.Button>

  )
}

export default AudioMsgBtn