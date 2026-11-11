import { useState } from 'react';
import './BoneGraftingVideo.css';

const reelUrl = 'https://www.facebook.com/reel/2817005775309255/';
const playerUrl = `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(reelUrl)}&show_text=false&width=267&t=0`;

export default function BoneGraftingVideo() {
  const [playerRequested, setPlayerRequested] = useState(false);

  return (
    <div className="bone-grafting-video">
      <div className="bone-grafting-video-frame">
        {playerRequested ? (
          <iframe
            src={playerUrl}
            title="Bone Grafting in Action video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            ref={frame => frame?.focus({ preventScroll: true })}
          />
        ) : (
          <button type="button" onClick={() => setPlayerRequested(true)}>
            <img src="/assets/treatments/bone-sinus-grafting.webp" alt="" loading="lazy" />
            <span className="bone-grafting-video-play">
              <span aria-hidden="true">▶</span> Load video
            </span>
          </button>
        )}
      </div>
      <a href={reelUrl} target="_blank" rel="noopener noreferrer">Watch on Facebook <span aria-hidden="true">↗</span></a>
    </div>
  );
}
