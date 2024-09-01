import { Card, CardContent } from "@/components/ui/card";
import Thumbnail from "@/components/ui/thumbnail";
import { useFrames } from "@/hooks/useFrames";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FrameEditor from "./FrameEditor";

export const ENABLE_ADD_FRAME = false;

const DemoDetail: React.FC = () => {
  const { demoId } = useParams<{ demoId: string }>();
  const [selectedFrame, setSelectedFrame] = useState(0);

  if (typeof demoId === "undefined") {
    return (
      <div
        data-testid="error-frames"
        className="flex items-center justify-center h-screen"
      >
        <h1 className="text-2xl">Erro, informe id da demo!</h1>
      </div>
    );
  }

  const { data, error, isLoading } = useFrames({ demoId });

  if (isLoading) {
    return (
      <div
        data-testid="spin"
        className="flex items-center justify-center h-screen"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="error-frames"
        className="flex items-center justify-center h-screen"
      >
        <h1 className="text-2xl">Error loading frames!</h1>
      </div>
    );
  }

  const frames = data || [];

  return (
    <>
      <main className="w-full h-fit max-w-full flex-1 overflow-auto">
        {frames.length === 0 && (
          <div
            data-testid="no-frames"
            className="flex items-center justify-center w-full h-full"
          >
            <h3 className="text-sm w-full">Nenhum frame cadastrado!</h3>
          </div>
        )}
        {frames.length > 0 && (
          <FrameEditor demoId={demoId} frame={frames[selectedFrame]} />
        )}
      </main>
      <footer className="flex flex-row gap-4 border-t dark:border-zinc-700 p-4 h-44 hover:h-64 transition-[height]">
        <div className="flex flex-row gap-4 border-t dark:border-zinc-700 overflow-x-auto">
          {frames.length > 0 &&
            frames.map((frame, index) => {
              const selectedCard =
                demoId === frame.id ? " border-blue-700 bg-blue-300" : "";

              return (
                <Card
                  data-testid={`card-list-${frame.id}`}
                  key={frame.id}
                  className={`rounded-lg border flex flex-col justify-center items-center cursor-pointer ${selectedCard}`}
                  onClick={() => {
                    setSelectedFrame(index);
                    // navigate(`/frames/detail/${frame.id}`);
                  }}
                >
                  <CardContent className="relative w-full h-full overflow-hidden p-0 giphy-embed pointer-events-none zoom-in-50">
                    <Thumbnail html={frame.html} />
                  </CardContent>
                </Card>
              );
            })}
        </div>
        {ENABLE_ADD_FRAME && (
          <Card
            data-testid="card-add-frame"
            className={`p-4 rounded-lg border max-w-64 flex flex-col justify-center items-center cursor-pointer `}
          >
            <CardContent className="p-0">
              <PlusIcon className="w-12 h-12" />
            </CardContent>
          </Card>
        )}
      </footer>
    </>
  );
};

export default DemoDetail;
