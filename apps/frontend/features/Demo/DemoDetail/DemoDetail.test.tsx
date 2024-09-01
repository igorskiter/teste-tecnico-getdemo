import { useFrames } from "@/hooks/useFrames.tsx";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import React from "react";
import Router from "react-router-dom";
import DemoDetail, { ENABLE_ADD_FRAME } from "./index.tsx";

jest.mock("@/hooks/useFrames.tsx");
jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe("Test DemoDetail", () => {
  const fakeId = Math.random();

  const mockState = jest.fn();

  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ demoId: `${fakeId}` });
    jest.spyOn(React, "useState").mockImplementation(() => [0, mockState]);
  });

  it("should show loadjest.fn()ing when get frames", () => {
    (useFrames as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      error: false,
      updateFrame: () => ({
        mutate: jest.fn(),
      }),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<DemoDetail />);
    expect(screen.getByTestId("spin")).toBeInTheDocument();
  });

  it("should show message error when have problem when get frames", () => {
    (useFrames as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: true,
      updateFrame: () => ({
        mutate: jest.fn(),
      }),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<DemoDetail />);
    expect(screen.getByTestId("error-frames")).toBeInTheDocument();
  });

  it("should show message when don't have frames", () => {
    (useFrames as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: false,
      updateFrame: () => ({
        mutate: jest.fn(),
      }),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    render(<DemoDetail />);
    expect(screen.getByTestId("no-frames")).toBeInTheDocument();
  });

  it("should show list of frames", () => {
    (useFrames as jest.Mock).mockReturnValue({
      isLoading: false,
      data: framesMock,
      error: false,
      updateFrame: () => ({
        mutate: jest.fn(),
      }),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: framesMock });

    render(<DemoDetail />);
    const card = screen.getByTestId("card-list-2");
    fireEvent.click(card);
    expect(mockState).toHaveBeenCalledWith(1);
  });

  it("should show button to add new frame", () => {
    (useFrames as jest.Mock).mockReturnValue({
      isLoading: false,
      data: framesMock,
      error: false,
      updateFrame: () => ({
        mutate: jest.fn(),
      }),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: framesMock });

    render(<DemoDetail />);
    
    if (ENABLE_ADD_FRAME)
      expect(screen.getByTestId("card-add-frame")).toBeInTheDocument();
  });

  it("should show frame selected in a iframe", () => {
    (useFrames as jest.Mock).mockReturnValue({
      isLoading: false,
      data: framesMock,
      error: false,
      updateFrame: () => ({
        mutate: jest.fn(),
      }),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: framesMock });

    render(<DemoDetail />);
    const iframe = screen.getByTestId("iframe");

    expect(iframe).toHaveAttribute("srcDoc", framesMock[0].html);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

const framesMock = [
  {
    id: 1,
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

    <p>Obrigado por visitar esta página simples.</p>
</body>
</html>`,
    order: 1,
  },
  {
    id: 2,
    html: `<!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Página Colorida</title>
      <style>
          body {
              font-family: 'Verdana', sans-serif;
              background-color: #f0f8ff;
              color: #333;
              margin: 20px;
          }
          h1 {
              color: #ff4500;
          }
          p {
              font-size: 18px;
              line-height: 1.6;
          }
          ul {
              list-style-type: square;
              margin-left: 20px;
              color: #008b8b;
          }
          li {
              margin-bottom: 10px;
          }
      </style>
  </head>
  <body>
      <h1>Explorando um Tema Colorido</h1>
      <p>Bem-vindo a uma página com um toque de cores vibrantes. Abaixo você verá uma lista de itens interessantes.</p>
      
      <h2>Itens Interessantes</h2>
      <ul>
          <li>Item A - Algo legal</li>
          <li>Item B - Outro ponto interessante</li>
          <li>Item C - Mais um item divertido</li>
          <li>Item D - Último, mas não menos importante</li>
      </ul>
  
      <p>Agradecemos por explorar esta página com um tema diferente!</p>
  </body>
  </html>`,
    order: 2,
  },
];
