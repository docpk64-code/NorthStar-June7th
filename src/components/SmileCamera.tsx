import { useEffect, useRef, useState } from 'react';

export default function SmileCamera({ onCapture, onClose }: { onCapture: (file: File) => void; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const alive = useRef(true);
  const generation = useRef(0);
  const [status, setStatus] = useState<'starting' | 'ready' | 'error'>('starting');
  const [message, setMessage] = useState('Allow camera access in your browser to see your smile.');
  const [capturing, setCapturing] = useState(false);
  const stop = () => { generation.current++; stream.current?.getTracks().forEach(track => track.stop()); stream.current = null; if (video.current) video.current.srcObject = null; };
  const start = async () => {
    stop(); const request = generation.current; setStatus('starting');
    if (!navigator.mediaDevices?.getUserMedia) { setStatus('error'); setMessage('This browser cannot open the camera. Use Choose a photo instead, or open this page in Safari, Chrome, or Edge.'); return; }
    try {
      const next = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { ideal: 'user' }, width: { ideal: 1280 }, height: { ideal: 1280 } } });
      if (!alive.current || generation.current !== request) { next.getTracks().forEach(track => track.stop()); return; }
      stream.current = next;
      if (video.current) { video.current.srcObject = next; await video.current.play(); }
      if (alive.current && generation.current === request) { setStatus('ready'); setMessage('Look at the camera and smile with your teeth visible.'); }
    } catch (error) {
      if (!alive.current || generation.current !== request) return;
      stop(); setStatus('error');
      const name = error instanceof Error ? error.name : '';
      setMessage(name === 'NotAllowedError' || name === 'SecurityError' ? 'Camera access was not allowed. Enable camera access for this site in your browser settings, then try again, or choose a photo.' : name === 'NotFoundError' ? 'No camera was found. Connect a webcam or choose a photo.' : name === 'NotReadableError' ? 'The camera may be in use by another app. Close that app and try again, or choose a photo.' : 'The camera could not be started. Try again or choose a photo.');
    }
  };
  useEffect(() => {
    alive.current = true; void start();
    const leave = () => { stop(); if (alive.current) { setStatus('error'); setMessage('The camera was paused for privacy. Select Try camera again to continue.'); } };
    const visibility = () => { if (document.hidden) leave(); };
    document.addEventListener('visibilitychange', visibility); window.addEventListener('pagehide', leave);
    return () => { alive.current = false; stop(); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pagehide', leave); };
  }, []);
  const capture = () => {
    const source = video.current;
    if (!source || !source.videoWidth || !source.videoHeight) { setMessage('The camera is still getting ready. Please try again.'); return; }
    setCapturing(true);
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1600 / Math.max(source.videoWidth, source.videoHeight));
    canvas.width = Math.round(source.videoWidth * scale); canvas.height = Math.round(source.videoHeight * scale);
    const context = canvas.getContext('2d');
    if (!context) { setCapturing(false); setMessage('Photo capture is unavailable. Please choose a photo instead.'); return; }
    context.drawImage(source, 0, 0, canvas.width, canvas.height);
    const request = generation.current;
    canvas.toBlob(blob => {
      if (!alive.current || generation.current !== request) return;
      setCapturing(false);
      if (!blob) { setMessage('The photo could not be captured. Please try again.'); return; }
      stop(); onCapture(new File([blob], 'my-smile.jpg', { type: 'image/jpeg' })); onClose();
    }, 'image/jpeg', 0.9);
  };
  return <section className="smile-live-camera" aria-label="Smile camera" onKeyDown={event => { if (event.key === 'Escape') { stop(); onClose(); } }}>
    <div className="smile-camera-view"><video ref={video} autoPlay muted playsInline aria-label="Live front-facing camera preview" /><span>Camera preview · only you can see this</span></div>
    <p role="status">{message}</p>
    <div className="smile-camera-actions">{status === 'error' ? <button className="smile-button" onClick={() => { setCapturing(false); void start(); }}>Try camera again</button> : <button className="smile-button" onClick={capture} disabled={status !== 'ready' || capturing}>{capturing ? 'Capturing…' : status === 'starting' ? 'Starting camera…' : 'Capture my smile'}</button>}<button className="smile-camera-button" onClick={() => { stop(); onClose(); }}>Close camera</button></div>
  </section>;
}
