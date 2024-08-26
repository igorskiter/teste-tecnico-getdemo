import { render, screen } from "@testing-library/react";
import App from "./App.tsx";

describe("Test App", () => {
  it("renders heading", async () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /list demos/i })
    ).toBeInTheDocument();
  });
});
