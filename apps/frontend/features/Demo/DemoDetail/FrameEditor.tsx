import { useFrames } from "@/hooks/useFrames";
import { Frame } from "@/interfaces/Frame";
import debounce from "lodash.debounce";
import { Check, Loader } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const FrameEditor = ({
  frame,
  demoId,
}: {
  frame: Partial<Frame>;
  demoId: string;
}) => {
  const { html, id, order } = frame;
  const [htmlContent, setHtmlContent] = useState<string>(html as string);

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
    console.log("handleDoubleClick");
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    // Remove outline from the previously selected element
    console.log(selectedElement, target, selectedElement !== target);
    if (selectedElement && selectedElement !== target) {
      selectedElement.style.outline = "none";
    }

    setSelectedElement(target);
    setEditText(target.innerText);
    setInputPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const debouncedMutation = useCallback(
    debounce(
      ({
        id,
        order,
        selectedElement,
      }: { id: string; order: number } & { selectedElement: HTMLElement }) => {
        selectedElement.style.outline = "none";
        const htmlContent = `<!DOCTYPE html> ${
          iframeRef.current?.contentDocument?.documentElement
            .outerHTML as string
        }`;
        mutationFrame.mutate({
          id,
          order,
          html: htmlContent,
        });
        setHtmlContent(htmlContent);
      },
      1000
    ),
    []
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;

    setEditText(newText);

    if (selectedElement) {
      selectedElement.innerText = newText;

      if (id && typeof order === "number") {
        debouncedMutation({
          id,
          order,
          selectedElement,
        });
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const iframeDoc = iframeRef.current?.contentDocument;
    const inputContainer = document.querySelector(".input-container");

    // Verifica se o clique ocorreu fora do iframe ou do input
    if (
      selectedElement &&
      iframeDoc &&
      !iframeDoc.body.contains(event.target as Node) &&
      !inputContainer?.contains(event.target as Node)
    ) {
      selectedElement.style.outline = "none";
      setSelectedElement(null);
      setInputPosition(null);
    }
  };

  useEffect(() => {
    const iframeDoc = iframeRef.current?.contentDocument;

    if (iframeDoc) {
      iframeDoc.body.addEventListener("dblclick", handleDoubleClick);
    }

    return () => {
      if (iframeDoc) {
        iframeDoc.body.removeEventListener("dblclick", handleDoubleClick);
      }
    };
  }, [selectedElement, iframeRef]);

  useEffect(() => {
    if (selectedElement) {
      selectedElement.style.outline = "2px solid #1d4ed8";
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedElement]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <iframe
        data-testid="iframe"
        ref={iframeRef}
        srcDoc={htmlContent}
        className="w-full h-full"
        onLoad={(e) => {
          setSelectedElement(e.currentTarget);
        }}
      />
      {selectedElement && inputPosition && (
        <div
          style={{
            top: inputPosition.top,
            left: inputPosition.left,
            position: "absolute",
          }}
          className="p-2 bg-white rounded-md shadow-md border border-gray-300 flex items-center  input-container"
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
