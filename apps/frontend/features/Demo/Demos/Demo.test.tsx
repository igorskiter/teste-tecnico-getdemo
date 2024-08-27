import { useDemos } from "@/hooks/useDemos.tsx";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Demos from "./index.tsx";

jest.mock("@/hooks/useDemos.tsx");
jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(),
}));

describe("Test Demos", () => {
  it("renders heading", async () => {
    (useDemos as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: false,
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<Demos />);
    expect(screen.getByRole("heading", { name: /demos/i })).toBeInTheDocument();
  });

  it("should show skeleton loading when get demos", () => {
    (useDemos as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      error: false,
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<Demos />);
    expect(screen.getByTestId("spin")).toBeInTheDocument();
  });

  it("should show message when don't have demos and show button to add new demo", () => {
    (useDemos as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: false,
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<Demos />);
    expect(screen.getByTestId("no-demos")).toBeInTheDocument();
  });

  it("should show message error when have problem when get demos", ()=>{
    (useDemos as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: true,
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<Demos />);
    expect(screen.getByTestId("error-demos")).toBeInTheDocument();
  })

  it("should show list of demos", () => {
    const demosMock = [
      { id: 1, name: "ChatGPT" },
      { id: 2, name: "Amazon" },
    ];
    (useDemos as jest.Mock).mockReturnValue({
      isLoading: false,
      data: demosMock,
      error: false,
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: demosMock });

    render(<Demos />);
    const items = screen.getAllByRole("heading");

    const demosNames = items.map((item) => item.textContent);
    expect(demosNames).toMatchInlineSnapshot(`
        [
          "Demos",
          "ChatGPT",
          "Amazon",
        ]
      `);
  });
});
