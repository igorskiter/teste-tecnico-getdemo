import { useFrames } from "@/hooks/useFrames";
import { Frame } from "@/interfaces/Frame";
import debounce from "lodash.debounce";
import { Check, Loader } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const FrameEditor = ({
  frame,
  demoId,
}: {
  frame: Partial<Frame>;
  demoId: string;
}) => {
  const { html, id, order } = frame;
  const { updateFrame } = useFrames({ demoId });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null
  );
  const [editText, setEditText] = useState<string>("");
  const [inputPosition, setInputPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const mutationFrame = updateFrame(
    selectedElement,
    setIsSaving,
    setIsSaved,
    setSelectedElement,
    setInputPosition
  );

  const handleDoubleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setSelectedElement(target);
    setEditText(target.innerText);
    setInputPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const onLoadIframe = () => {
    const iframeDoc = iframeRef.current?.contentDocument;
    if (iframeDoc) {
      iframeDoc.body.addEventListener("dblclick", handleDoubleClick);
    }
  };

  const debouncedMutation = debounce(({ id, order, html }: Frame) => {
    mutationFrame.mutate({ id, order, html });
  }, 1000);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    console.log(newText, "newText");
    setEditText(newText);

    if (selectedElement) {
      selectedElement.innerText = newText;
      console.log(
        id,
        demoId,
        order,
        typeof iframeRef.current?.srcdoc === "string",
        "iframeRef.current"
      );
      if (id && typeof order === 'number' && iframeRef.current?.srcdoc) {
        debouncedMutation({ id, order, html: iframeRef.current?.srcdoc });
      }
    }
  };

  useEffect(() => {
    if (selectedElement) {
      selectedElement.style.outline = "2px solid #1d4ed8";
    }
  }, [selectedElement]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <iframe
        data-testid='iframe'
        ref={iframeRef}
        srcDoc={html}
        className="w-full h-full"
        onLoad={onLoadIframe}
      />
      {selectedElement && inputPosition && (
        <div
          style={{
            top: inputPosition.top,
            left: inputPosition.left,
            position: "absolute",
          }}
          className="p-2 bg-white rounded-md shadow-md border border-gray-300 flex items-center"
        >
          <input
            type="text"
            value={editText}
            onChange={handleTextChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
          {isSaving ? (
            <Loader className="ml-2 animate-spin" size={20} />
          ) : isSaved ? (
            <Check className="ml-2 text-green-500" size={20} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FrameEditor;
