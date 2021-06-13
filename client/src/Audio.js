import {useEffect, useState} from "react";
import notification from './notification.mp3'
import ringtone from './ringtone.mp3'

const useAudio = () => {
  const [audio, setAudio] = useState();
  const [playing, setPlaying] = useState(false);

  const setPlayingAudio = (play, type) => {
    if (type === 'call')
      setAudio(new Audio(ringtone))
    if (type === 'sms')
      setAudio(new Audio(notification))

    setPlaying(play)
  }

  useEffect(() => {
      if (!audio) return
      playing ? audio.play() : audio.pause()
    },
    [playing, audio]
  );

  useEffect(() => {
    if (!audio) return
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [setPlayingAudio];
};
export {useAudio}
