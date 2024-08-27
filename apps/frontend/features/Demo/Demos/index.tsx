import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDemos } from "@/hooks/useDemos";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const ENABLE_ADD_DEMO = false;

function Demos() {
  const navigate = useNavigate();

  const { demoId } = useParams<{ demoId: string }>();
  const { data, error, isLoading } = useDemos();

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
        data-testid="error-demos"
        className="flex items-center justify-center h-screen"
      >
        <h1 className="text-2xl">Error loading demos!</h1>
      </div>
    );
  }

  const demos = data || [];

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
              <div
                data-testid="no-demos"
                className="flex items-center justify-center w-full h-full"
              >
                <h3 className="text-sm w-full">Nenhum demo encotrado!</h3>
              </div>
            )}
            {demos.length > 0 &&
              demos.map((demo) => {
                const selectedCard =
                  demoId === demo.id ? " border-blue-700 bg-blue-300" : "";

                return (
                  <Card
                    data-testid={`card-list-${demo.id}`}
                    key={demo.id}
                    className={`p-4 rounded-lg border max-w-64 flex flex-col justify-center items-center ${selectedCard}`}
                    onClick={() => {
                      navigate(`/demos/detail/${demo.id}`);
                    }}
                  >
                    <CardContent>
                      <h2>{demo.name}</h2>
                    </CardContent>
                  </Card>
                );
              })}
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
