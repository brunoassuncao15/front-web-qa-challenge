export const urls = {
  base: 'https://playwrightlab.github.io/',
  login: 'https://playwrightlab.github.io/login.html',
};

export const credentials = {
  valid: { email: 'test@playlab.com', password: 'Password123' },
  invalid: { email: 'invalid@playlab.com', password: 'InvalidPassword123' },
};

export const formData = {
  valid: {
    name: 'Bruno Teste',
    email: 'bruno.teste@example.com',
    password: 'Senha123',
    subscribe: true,
  },
};

export const users = {
  searchNames: {
    nora: 'Nora Jones',
    alice: 'Alice Johnson',
    oscar: 'Oscar Wilde',
    bob: 'Bob Smith',
  },
  newUser: {
    name: 'Bruno Teste',
    email: 'bruno.teste@example.com',
    role: 'viewer',
  },
};

export default {
  urls,
  credentials,
  formData,
  users,
};
