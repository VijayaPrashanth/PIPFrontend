import React from "react";
import Footer from "./Footer";
import { render, screen, waitFor } from "@testing-library/react";
import { when } from "jest-when";
import footerService from "./services/footerService";

jest.mock("./services/footerService.js", () => ({
  getVersion: jest.fn(() =>
    Promise.resolve({ "CurrentVersion": "v1" }
    )
  ),
}));
describe("Footer Component Basic Rendering", () => {
  
  it("should return current version", async () => {

    when(footerService.getVersion).calledWith().mockReturnValue({CurrentVersion: "v1"});
    render(<Footer />);

    await waitFor(()=>{
      const version = screen.getByTestId("version");
      expect(version.textContent).toBe("Version : v1");
    })
  });

});
