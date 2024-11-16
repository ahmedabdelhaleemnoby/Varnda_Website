import React from 'react';
import ReactPlayer from 'react-player';
export default function VideoEmbed({ videoUrl }) {
  return (
    <div>
      <div>
        <ReactPlayer
          url={videoUrl}
          width='100%'
          height='360px'
          controls
        />
      </div>
    </div>
  );
}
