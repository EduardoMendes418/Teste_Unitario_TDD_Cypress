import { render, screen } from "@testing-library/react";
import App from "./App";


describe("Test the App component", () => {
  it("There must be two titles on the page", async () => {
    render(<App />);

    const title = await screen.findAllByRole("heading");

    expect(title).toHaveLength(2);
  });

  it("There must be a title written Hello World", async () => {
    render(<App />);

    const title = await screen.findByRole("heading", {
      name: "Hello World",
    });

    expect(title);
  });

  it("There must be a title saying Welcome", async () => {
    render(<App />);

    const title = await screen.findByRole("heading", {
      name: "Welcome",
    });

    expect(title);
  });

});
