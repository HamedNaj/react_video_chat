import React, {useContext} from 'react'
import {Button} from "@material-ui/core";
import {PhoneDisabled} from "@material-ui/icons";
import {SocketContext} from "../SocketContext";

const Notifications = () => {
  const {answerCall, calling, call, callAccepted, leaveCall, callEnded, otherName,cancelCall} = useContext(SocketContext)
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <h1>"{call.name}" is calling: </h1>
          <Button variant='contained' color='primary' onClick={answerCall}>
            Answer
          </Button>
          <Button variant='contained' color='secondary' onClick={cancelCall}>
            Reject
          </Button>
        </div>
      )}
      {calling && !callAccepted && (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <h1>calling "{otherName}" </h1>
          <Button variant='contained' color='secondary' onClick={cancelCall}>
            Cancel
          </Button>
        </div>
      )}

      {callAccepted && !callEnded &&
      <Button variant='contained' color='secondary' startIcon={<PhoneDisabled fontSize='large'/>} fullWidth
              onClick={leaveCall}
              style={{marginTop: '20px'}}
      >
        Hang Up
      </Button>}
    </>
  )
}

export default Notifications
