import React, {createContext, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext()

// const socket = io('http://localhost:5000');

const ContextProvider = ({children}) => {
  const [stream, setStream] = useState()
  const [socket, setSocket] = useState()
  const [me, setMe] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [call, setCall] = useState({})
  const [usersList, setUsersList] = useState([])
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  const login = (name) => {
    // const s = io('http://localhost:5000', {query: {name}});
    const s = io('/', {query: {name}});
    setSocket(s)
    setLoggedIn(true)
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((currentStream) => {
        setStream(currentStream)
        myVideo.current.srcObject = currentStream
      })
    s.on('me', (id) => {
      setMe(id)
    })

    s.on('call-user', ({from, name: callerName, signal}) => {
      setCall({isReceivedCall: true, from, name: callerName, signal})
    })
    s.on('users-list', list => {
      setUsersList(list.users.filter(user => user !== name))
    })
  }

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({initiator: false, trickle: false, stream})
    peer.on('signal', (data) => {
      socket.emit('answer-call', {signal: data, to: call.from})
    })
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })
    peer.signal(call.signal)
    connectionRef.current = peer
  }
  const callUser = (id) => {
    const peer = new Peer({initiator: true, trickle: false, stream})
    peer.on('signal', (data) => {
      socket.emit('call-user', {userToCall: id, signalData: data, from: me, name})
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
    setCallEnded(true)

    connectionRef.current.destroy()
    window.location.reload()
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
      login,
      callUser,
      leaveCall,
      answerCall
    }}>
      {children}
    </SocketContext.Provider>
  )
}
export {ContextProvider, SocketContext}
