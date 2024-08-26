import { Button } from "@/components/ui/button";
import { Demo } from "@/interfaces/Demo";
import { useEffect, useState } from "react";
function Demos() {
  const [demos, setDemos] = useState<Demo[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch("http://localhost:3001/demos", {
      //   method: "GET",
      // });
      // setDemos(await response.json());
      setDemos([]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-8 box-border">
      <h1 className="text-2xl">List demos</h1>
      {demos.length > 0 &&
        demos.map((demo) => (
          <div
            key={demo.id}
            className="p-4 rounded-lg border border-[#646cff] max-w-64 flex flex-col justify-center items-center"
          >
            <h2>{demo.name}</h2>
            <Button>Visualizar</Button>
          </div>
        ))}
    </div>
  );
}

export default Demos;
