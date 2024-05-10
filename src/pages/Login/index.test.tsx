import { fireEvent, render, screen } from "@testing-library/react";
import Login from ".";
import userEvent from "@testing-library/user-event";

const navigateMock = vi.fn();

describe("Testa o compoent de login", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate() {
      return navigateMock;
    },
    Link: vi.fn().mockImplementation((props) => props.children),
  }));

  it("Deve haver um titulo escrito 'Sing In", async () => {
    render(<Login />);

    const title = await screen.findByRole("heading", {
      name: "Sign In",
    });
    expect(title).toBeInTheDocument();
  });

  it("Deve haver dois inputs na minha tela", async () => {
    render(<Login />);

    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(2);
  });

  it("Deve haver um button na minha tela", async () => {
    render(<Login />);

    const button = await screen.findByRole("button");
    expect(button.textContent).toBe("Login");
  });

  it("Deve haver alterações de entrada do usuário", async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("Insira seu email");
    const passwordInput = screen.getByPlaceholderText("Insira sua senha");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("Renderiza formulário de login", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("Deve ser clicado uma vez", async () => {
    render(<Login />);

    const button = await screen.findByRole("button");
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  it("Devem haver um link pra pagina de login", async () => {
    render(<Login />);

    const link = await screen.findByText('Não tem cadastro? Clique aqui!');
    
    expect(link).toBeInTheDocument();

  });
});
