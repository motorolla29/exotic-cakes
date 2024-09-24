import { useState } from 'react';
import ReactPlayer from 'react-player';

import LogoSpinner from '../../logo-spinner/logo-spinner';
import PlayIcon from '../../../icons/play.svg';
import PauseIcon from '../../../icons/pause.svg';

import './home-page.sass';

const HomePage = () => {
  const [videoPlaying, setVideoPlaying] = useState(true);

  return (
    <div className="home-page">
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="/video/main video bit2.mp4"
          width="100%"
          height="100%"
          playing={videoPlaying}
          loop={true}
          muted={true}
          fallback={<LogoSpinner />}
        />
        {videoPlaying ? (
          <PauseIcon
            onClick={() => setVideoPlaying(false)}
            className="play-icon"
          />
        ) : (
          <PlayIcon
            onClick={() => setVideoPlaying(true)}
            className="play-icon"
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
