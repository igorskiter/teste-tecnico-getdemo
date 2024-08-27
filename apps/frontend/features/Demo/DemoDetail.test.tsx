import { render, screen } from "@testing-library/react";
import Router from "react-router-dom";
import DemoDetail from "./DemoDetail.tsx";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("Test DemoDetail", () => {
  const fakeId = Math.random();

  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ demoId: `${fakeId}` });
  });

  it("renders heading", async () => {
    render(<DemoDetail />);
    expect(
      screen.getByRole("heading", { name: /demo detail/i })
    ).toBeInTheDocument();
  });

  it("renders paragraph", async () => {
    render(<DemoDetail />);
    expect(
      screen.getByText(new RegExp(`details for demo ID: ${fakeId}`, "i"))
    ).toBeInTheDocument();
  });
});
