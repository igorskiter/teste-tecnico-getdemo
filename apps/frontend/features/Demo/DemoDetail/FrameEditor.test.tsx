import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { useFrames } from "@/hooks/useFrames";
import FrameEditor from "./FrameEditor";

const mockUpdateFrame = jest.fn();

jest.mock("@/hooks/useFrames.tsx");

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  put: jest.fn(),
}));

describe("Test FrameEditor", () => {
  const mockSelectedElement = jest.fn();
  const mockEditText = jest.fn();
  const mockInputPosition = jest.fn();
  const mockIsSaving = jest.fn();
  const mockIsSaved = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [0, mockSelectedElement]);
    jest.spyOn(React, "useState").mockImplementation(() => [0, mockEditText]);
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [0, mockInputPosition]);
    jest.spyOn(React, "useState").mockImplementation(() => [0, mockIsSaving]);
    jest.spyOn(React, "useState").mockImplementation(() => [0, mockIsSaved]);

    (useFrames as jest.Mock).mockReturnValue({
      updateFrame: () => ({
        mutate: mockUpdateFrame,
      }),
    });
  });

  it("should open input when handle double click", () => {
    render(<FrameEditor demoId={"1"} frame={frame} />);
    const iframe = document.querySelector("iframe"); //--> get the iframe element
    expect(iframe).toBeTruthy();

    onLoad();

    function onLoad() {
      if (iframe === null) {
        setTimeout(() => onLoad(), 100);
        return;
      }
      const iframeContent =
        iframe.contentDocument ||
        (iframe.contentWindow && iframe.contentWindow.document);
      if (iframeContent && iframeContent.readyState == "complete") {

        const paragraph = iframeContent.querySelector("p") as HTMLElement;

        const doubleClickEvent = new MouseEvent("dblclick", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        paragraph.dispatchEvent(doubleClickEvent);

        expect(mockSelectedElement).toHaveBeenCalledWith(1);
        expect(screen.getByTestId("input-edit")).toBeInTheDocument();
      } else {
        setTimeout(() => onLoad(), 100); //--> call again if iframe content is not loaded
      }
    }
  });

  it("should change and save text after double click", () => {
    render(<FrameEditor demoId={"1"} frame={frame} />);
    const iframe = document.querySelector("iframe"); //--> get the iframe element
    expect(iframe).toBeTruthy();

    onLoad();

    function onLoad() {
      if (iframe === null) {
        setTimeout(() => onLoad(), 100);
        return;
      }
      const iframeContent =
        iframe.contentDocument ||
        (iframe.contentWindow && iframe.contentWindow.document);
      if (iframeContent && iframeContent.readyState == "complete") {
        const paragraph = iframeContent.querySelector("p") as HTMLElement;

        const doubleClickEvent = new MouseEvent("dblclick", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        paragraph.dispatchEvent(doubleClickEvent);

        const input = screen.getByTestId("input-edit");
        expect(input).toBeInTheDocument();
    
        fireEvent.change(input, { target: { value: "New Text" } });
    
        expect(paragraph.innerText).toBe("New Text");
      } else {
        setTimeout(() => onLoad(), 100); //--> call again if iframe content is not loaded
      }
    } 
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

const frame = {
  id: "1",
  html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página Simples</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 20px;
      }
      h1 {
          color: #333;
      }
      p {
          font-size: 16px;
          line-height: 1.5;
      }
      ul {
          list-style-type: disc;
          margin-left: 20px;
      }
  </style>
</head>
<body>
  <h1>Bem-vindo à Página Simples</h1>
  <p>Esta é uma página de exemplo criada com HTML. Abaixo, você encontrará uma lista com alguns itens.</p>
  
  <h2>Lista de Itens</h2>
  <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
  </ul>

  <p data-testid='iframe-p'>Obrigado por visitar esta página simples.</p>
</body>
</html>`,
  order: 1,
};
