import React from 'react';
import YouTube from 'react-youtube';

const YoutubeDemoPlayer = () => {
  // const [isPlaying, setPlaying] = useState(false);

  const videoId = 'BoeXRLfpYv4'; // Replace with your YouTube video ID

  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      autoplay: 0, // Set to 1 if you want the video to auto-play
    },
  };

  const onReady = (event) => {
    // Access to player in all event handlers via event.target
    console.log(event.target);
  };

  // const onPlayPauseClick = () => {
  //   setPlaying((prevPlaying) => !prevPlaying);
  // };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default YoutubeDemoPlayer;