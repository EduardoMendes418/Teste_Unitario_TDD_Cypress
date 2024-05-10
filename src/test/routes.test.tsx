import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainRoutes from "../routes";

describe("Test the App component", () => {
  it("renders Login component for / path", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MainRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("renders SignUp component for /sign-up path", async () => {
    render(
      <MemoryRouter initialEntries={["/sign-up"]}>
        <MainRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it("renders page de 404",  async () => {
    render(
      <MemoryRouter initialEntries={["/qualquerRota"]}>
        <MainRoutes />
      </MemoryRouter>
    );

    const title = screen.getByText("404 Page Not Found");

    expect(title).toBeInTheDocument();
  });
});
