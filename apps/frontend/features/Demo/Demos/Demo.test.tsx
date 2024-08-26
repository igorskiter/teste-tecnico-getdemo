import { render, screen } from "@testing-library/react";
import Demos from "./index.tsx";

describe("Test Demos", () => {
  it("renders heading", async () => {
    render(<Demos />);
    expect(
      screen.getByRole("heading", { name: /list demos/i })
    ).toBeInTheDocument();
  });
});
