import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './styles.scss';

export default function Player(props) {
  const { url } = props;
  return (<div className="songbird-audioplayer">
    <AudioPlayer
      autoPlay={false}
      src={url}
      layout='horizontal-reverse'
      customAdditionalControls={[]}
      showJumpControls={false}
    />
  </div>);
}
