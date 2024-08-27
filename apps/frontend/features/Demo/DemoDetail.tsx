import React from "react";
import { useParams } from "react-router-dom";

const DemoDetail: React.FC = () => {
  const { demoId } = useParams<{ demoId: string }>();

  return (
    <>
      <main className="w-full h-full flex-1 overflow-auto p-4">
        <div>
          <h2>Demo Detail</h2>
          <p>Details for Demo ID: {demoId}</p>
        </div>
      </main>
      <footer className="border-t dark:border-zinc-700 p-4"></footer>
    </>
  );
};

export default DemoDetail;
