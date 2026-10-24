import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { asset } from "../../utils/assets";
import { prefersSavedData, useHeroScroll, useMediaQuery, useReducedMotion } from "../../utils/motion";
import type { SceneLayout } from "./Scene";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

const Scene = lazy(() => import("./Scene").then((m) => ({ default: m.Scene })));

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch {
    return false;
  }
}

/**
 * Fixed Earth footage and CubeSat model behind the home-page hero. Decorative
 * only (aria-hidden); the page reads the same without it. Layers, back to front:
 * still poster, video, WebGL model, legibility shade.
 */
export function SceneBackground() {
  const reducedMotion = useReducedMotion();
  // Phones and portrait tablets share the "satellite above, text below" layout.
  const compact = useMediaQuery("(max-width: 720px), (orientation: portrait)");
  const smallVideo = useMediaQuery("(max-width: 720px)");
  const medium = useMediaQuery("(max-width: 1100px)");
  const layout: SceneLayout = compact ? "compact" : medium ? "medium" : "wide";
  const { progressRef, visible } = useHeroScroll();
  const [saveData] = useState(prefersSavedData);
  const [webgl] = useState(detectWebGL);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Let the text paint first; start the video and the 3D model afterwards.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 250);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && !reducedMotion) void video.play().catch(() => {});
    else video.pause();
  }, [visible, reducedMotion, ready, smallVideo]);

  const videoSize = smallVideo ? "-480" : "";
  return (
    <div className={`scene${visible ? "" : " is-offscreen"}`} aria-hidden="true">
      <img className="scene__layer scene__poster" src={asset("assets/media/earth-orbit-poster.jpg")} alt="" />
      {ready && !saveData && (
        <video
          key={videoSize}
          ref={videoRef}
          className="scene__layer scene__video"
          muted
          loop
          playsInline
          autoPlay={!reducedMotion}
          preload={reducedMotion ? "metadata" : "auto"}
          poster={asset("assets/media/earth-orbit-poster.jpg")}
        >
          <source src={asset(`assets/media/earth-orbit${videoSize}.webm`)} type="video/webm" />
          <source src={asset(`assets/media/earth-orbit${videoSize}.mp4`)} type="video/mp4" />
        </video>
      )}
      {ready && webgl && !saveData && (
        <div className="scene__layer scene__model">
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <Scene progressRef={progressRef} active={visible} reducedMotion={reducedMotion} layout={layout} />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}
      <div className="scene__layer scene__shade" />
    </div>
  );
}
