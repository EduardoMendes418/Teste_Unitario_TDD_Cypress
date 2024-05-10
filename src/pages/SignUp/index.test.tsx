import { fireEvent, render, screen } from "@testing-library/react";
import SignUp from "./index";

const navigateMock = vi.fn();

describe("Testa o component SignUp", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate() {
      return navigateMock;
    },
    Link: vi.fn().mockImplementation((props) => props.children),
  }));

  it("Devem haver 3 inputs na minha tela", async () => {
    render(<SignUp />);

    const inputs = await screen.findAllByRole("textbox");

    expect(inputs).toHaveLength(3);
  });

  it("Devem haver inputs para name, email e senha", async () => {
    render(<SignUp />);

    const inputName = await screen.findByPlaceholderText("Insira seu nome");
    const inputEmail = await screen.findByPlaceholderText("Insira seu e-mail");
    const inputPassword = await screen.findByPlaceholderText(
      "Insira seu password"
    );

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it("Devem haver um butão na tela", async () => {
    render(<SignUp />);

    const button = await screen.findByRole("button");

    expect(button).toHaveTextContent("Sign Up");
  });

  it("Devem haver um titulo 'Cadastre-se'", async () => {
    render(<SignUp />);

    const title = await screen.findByRole("heading", {
      level: 1,
    });

    expect(title).toHaveTextContent("Cadastre-se");
  });

  it("Devem navegar para a pagina de dashboard", async () => {
    render(<SignUp />);

    const button = await screen.findByRole("button");
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  it("Devem haver um link pra pagina de login", async () => {
    render(<SignUp />);

    const link = await screen.findByText('Não tem cadastro? Clique aqui!');
    
    expect(link).toBeInTheDocument();

  });
});
