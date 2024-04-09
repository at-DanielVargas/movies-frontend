import { BackgroundImage, Box } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import { useEffect, useRef } from "react";

export interface BackgroundVideoProps {
  placeholderImage: string;
  videoId: string;
  children?: JSX.Element | JSX.Element[];
}

function BackgroundVideo({
  placeholderImage,
  videoId,
  children,
}: BackgroundVideoProps) {
  const { ref, inViewport } = useInViewport<HTMLIFrameElement>();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if(videoId === undefined) return;
    if (!inViewport) {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    }

    if (inViewport) {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    }
  }, [iframeRef, inViewport, videoId]);

  if (!videoId && placeholderImage) {
    return (
      <BackgroundImage
        src={placeholderImage}
        h={480}
        style={{ backgroundPosition: "top" }}
      >
        {children}
      </BackgroundImage>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: 480,
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 480,
          overflow: "hidden",
        }}
      >
        <iframe
          ref={iframeRef}
          title="background-video"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&enablejsapi=1&controls=0&playlist=${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200%",
            height: "200%",
          }}
        />
      </Box>

      {children}
    </div>
  );
}

export default BackgroundVideo;
