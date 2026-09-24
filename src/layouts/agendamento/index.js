/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */


function MyButton() {
  return (
    <button>
      Eu sou um botão
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Bem-vindo ao meu aplicativo</h1>
      <MyButton />
    </div>
  );
}