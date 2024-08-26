import React from "react";
import { useParams } from "react-router-dom";

const DemoDetail: React.FC = () => {
  const { demoId } = useParams<{ demoId: string }>();

  return (
    <div>
      <h2>Demo Detail</h2>
      <p>Details for Demo ID: {demoId}</p>
    </div>
  );
};

export default DemoDetail;
