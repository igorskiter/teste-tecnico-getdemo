import { useRef } from "react";
import "./thumbnail.css";

export default function Thumbnail({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="thumbnail-container">
      <div className="thumbnail">
        <iframe
          ref={iframeRef}
          srcDoc={html}
          frameBorder="0"
          onLoad={() => {
            if (iframeRef.current) iframeRef.current.style.opacity = "1";
          }}
        ></iframe>
      </div>
    </div>
  );
}
