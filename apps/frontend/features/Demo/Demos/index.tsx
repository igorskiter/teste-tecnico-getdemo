import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Demo } from "@/interfaces/Demo";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const ENABLE_ADD_DEMO = false;

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
    <div key="1" className="flex h-screen bg-white dark:bg-zinc-800">
      <aside className="w-80 border-r dark:border-zinc-700">
        <div className="p-4 space-y-4 h-full">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Demos
            </h1>
            {ENABLE_ADD_DEMO && (
              <Button size="icon" variant="ghost">
                <PlusIcon className="text-black dark:text-white w-6 h-6" />
              </Button>
            )}
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <Input
              className="pl-8"
              placeholder="Search demos..."
              type="search"
            />
          </div>
          <div className="space-y-2 h-full">
            {demos.length === 0 && (
              <div className="flex items-center justify-center w-full h-full">
                <h3 className="text-sm w-full">Nenhum demo encotrado!</h3>
              </div>
            )}
            {demos.length > 0 &&
              demos.map((demo) => (
                <Card
                  key={demo.id}
                  className="p-4 rounded-lg border border-[#646cff] max-w-64 flex flex-col justify-center items-center"
                >
                  <CardContent>
                    <h2>{demo.name}</h2>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </aside>
      <section className="flex flex-col w-full">
        <Outlet />
      </section>
    </div>
  );
}

export default Demos;
