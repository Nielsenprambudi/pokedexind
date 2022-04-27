import React from "react";
import { render, screen } from "./test-utils";
import Home from "../pages/index";
import Detail from "../pages/detail";
import Myownedlist from "../pages/myownedlist";

describe("Home", () => {
    it("should render the heading", () => {
      render(<Home />);
  
      const heading = screen.getByText(
        /Testing Next.js With Jest and React Testing Library/i
      );
  
      // we can only use toBeInTheDocument because it was imported
      // in the jest.setup.js and configured in jest.config.js
      expect(heading).toBeInTheDocument();
    });
  });

describe("Detail", () => {
    it("should render the heading", () => {
      render(<Detail />);
  
      const heading = screen.getByText(
        /Testing Next.js With Jest and React Testing Library/i
      );
  
      // we can only use toBeInTheDocument because it was imported
      // in the jest.setup.js and configured in jest.config.js
      expect(heading).toBeInTheDocument();
    });
  });

describe("Myownedlist", () => {
    it("should render the heading", () => {
      render(<Myownedlist />);
  
      const heading = screen.getByText(
        /Testing Next.js With Jest and React Testing Library/i
      );
  
      // we can only use toBeInTheDocument because it was imported
      // in the jest.setup.js and configured in jest.config.js
      expect(heading).toBeInTheDocument();
    });
  });