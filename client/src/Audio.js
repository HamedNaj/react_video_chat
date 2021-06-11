import {useEffect, useState} from "react";

const useAudio = (url) => {
  const [audio] = useState(new Audio( 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'));
  const [playing, setPlaying] = useState(false);

  const setPlayingAudio = (play) => {
    setPlaying(play)
  }

  useEffect(() => {
      playing ? audio.play() : audio.pause()
    },
    [playing,audio]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [setPlayingAudio];
};
export {useAudio}
