import React, {createContext, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import Peer from 'simple-peer'

import {useAudio} from './Audio'

const SocketContext = createContext()

// const socket = io('http://localhost:5000');

const ContextProvider = ({children}) => {
  const [stream, setStream] = useState()
  const [socket, setSocket] = useState()
  const [me, setMe] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [otherName, setOtherName] = useState('')
  const [call, setCall] = useState({})
  const [calling, setCalling] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [setPlayingAudio] = useAudio()
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  const logout = () => {
    sessionStorage.removeItem('HPINGER_ZOOM_USERNAME')
    cancelCall()
    socket.disconnect()
    setSocket(null)
    setName('')
    setLoggedIn(false)
    setUsersList([])
  }

  const login = (name) => {
    const s = io('/', {query: {name}});
    setSocket(s)
    sessionStorage.setItem('HPINGER_ZOOM_USERNAME', name)
    setName(name)
    setLoggedIn(true)
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((currentStream) => {
        setStream(currentStream)
        myVideo.current.srcObject = currentStream
      }).catch(e => {
      console.log('error in getting permissions: ')
    })
    s.on('me', (id) => {
      setMe(id)
    })

    s.on('call-user', ({from, name: callerName, signal}) => {
      setCall({isReceivedCall: true, from, name: callerName, signal})
      setOtherName(callerName)
      setPlayingAudio(true, 'call')
    })
    s.on('users-list', list => {
      setUsersList(list.users.filter(user => user !== name))
    })
    s.on('call-reject', () => {
      setCall({})
      setPlayingAudio(false)
    })
    s.on('call-ended', () => {
      window.location.reload()
    })
    s.on('call-canceled', () => {
      setCall({})
      setCalling(false)
      setPlayingAudio(false)
      setOtherName('')
    })
    s.on('new-user', () => {
      setPlayingAudio(true, 'sms')
    })
  }

  const answerCall = () => {
    setCallAccepted(true)
    setPlayingAudio(false)
    const peer = new Peer({initiator: false, trickle: false, stream})
    peer.on('signal', (data) => {
      socket.emit('answer-call', {signal: data, to: call.from})

      setOtherName(call.name)
    })
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })
    peer.signal(call.signal)
    connectionRef.current = peer
  }
  const callUser = (id) => {
    setCallEnded(false)
    setCalling(true)
    const peer = new Peer({initiator: true, trickle: false, stream})
    peer.on('signal', (data) => {
      socket.emit('call-user', {userToCall: id, signalData: data, from: me, name})
      setOtherName(id)
    })
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })
    socket.on('call-accepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    connectionRef.current = peer
  }
  const leaveCall = () => {
    socket.emit('call-ended', otherName)
    window.location.reload()
  }
  const cancelCall = () => {
    setCalling(false)
    setCall({})
    setPlayingAudio(false)
    socket.emit('call-canceled', otherName)
  }

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      usersList,
      loggedIn,
      otherName,
      calling,
      login,
      callUser,
      leaveCall,
      answerCall,
      cancelCall,
      logout
    }}>
      {children}
    </SocketContext.Provider>
  )
}
export {ContextProvider, SocketContext}
