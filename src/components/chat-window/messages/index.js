import React, { useState, useEffect, useCallback } from 'react'
import { Alert } from 'rsuite'
import { useParams } from 'react-router-dom'
import { transformToArrWithId } from '../../../misc/helpers'
import MessageItem from './MessageItem'
import { auth, database, storage } from '../../../misc/firebase'

const Messages = () => {

  const {chatId} = useParams()
  const [messages,setMessages]=useState(null)
  const isChatEmpty = messages && messages.length === 0
  const canShowMessages = messages && messages.length > 0

  useEffect(() => {
    const messagesRef = database.ref('/messages')

    messagesRef.orderByChild('roomId').equalTo(chatId).on('value', snap=>{
      const data = transformToArrWithId(snap.val())
      setMessages(data)
    })
    return ()=>{
      messagesRef.off('value')
    }


  }, [chatId])


  const handleAdmin = useCallback(
    async(uid) => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`)
      let alertMsg
      await adminsRef.transaction(admins=>{
        if(admins){
          if(admins[uid]){
            admins[uid]=null
            alertMsg='Admin permission removed'
          }
          else{
            admins[uid]=true
            alertMsg='Admin permission granted'
          }
        }
        return admins


      })
      if(alertMsg==='Admin permission removed'){
        Alert.error(alertMsg,4000)
      }else{

        Alert.success(alertMsg,4000)
      }


    },
    [chatId],
  )
  const handleLike =useCallback(async(msgId)=>{
      const messageRef = database.ref(`/messages/${msgId}`)

      let alertMsg

      const {uid} = auth.currentUser
      await messageRef.transaction(msg=>{
        if(msg){
          if(msg.likes && msg.likes[uid]){
            msg.likeCount -=1
            msg.likes[uid]  = null
            
          }
          else{
            msg.likeCount +=1
            if(!msg.likes){
              msg.likes={}
            }
            msg.likes[uid]=true
            
          }
        }
        return msg


      })
      
  },[])

  const handleDelete= useCallback(
    async(msgId,file) => {
      if(!window.confirm('Delete this message ?')){
        return
      }
      const isLast = messages[messages.length - 1].id === msgId
      const updates = {}
      updates[`/messages/${msgId}`] = null

      if(isLast && messages.length > 1 ){
        updates[`/rooms/${chatId}/lastMessage`]={
          ...messages[messages.length - 2],
          msgId :messages[messages.length - 2].id
        }

      }
      if(isLast && messages.length === 1){
        updates[`/rooms/${chatId}/lastMessage`]=null
      }
      try{
        await database.ref().update(updates)
        Alert.info("Message deleted")
      }
      catch(err){
        // eslint-disable-next-line consistent-return
        return Alert.err(err.message,4000)
      }
      if(file){

        try {
          const fileRef = await storage.refFromURL(file.url)
          await fileRef.delete()
        } catch (error) {
          Alert.error(error.message)
        }
      }
    },
    [chatId,messages],
  )
  


  return (
    <ul className='msg-list custom-scroll' >
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && messages.map(msg=> <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} handleLike={handleLike} handleDelete={handleDelete} />)}
    </ul>
  )
}

export default Messages
