<script>
  import Display from './Display.svelte';
  import Keyboard from './Keyboard.svelte';

  let tela = '0';

  function adicionar(valor) {
    if (tela === '0') {
      tela = valor.toString();
    } else {
      tela += valor.toString();
    }
  }

  function limpar() {
    tela = '0';
  }

  function calcular() {
    try {
      tela = eval(tela).toString();
    } catch {
      tela = 'Algo deu errado!';
    }
  }

  function teclado(key) {
    if (key === '=') {
      calcular();
    } else if (key === 'C') {
      limpar();
    } else {
      adicionar(key);
    }
  }
</script>

<main>
  <h1>Calculadora Azul</h1>
  <section class="calculadora" role="region" aria-label="Calculadora">
    <Display valor={tela} />
    <Keyboard on:buttonClick={e => teclado(e.detail)} />
  </section>
</main>

<style>
  h1 {
    font-weight: 700;
    font-size: 3rem;
    color: #111827;
    margin-bottom: 3rem;
    user-select: none;
    font-family: 'Inter', sans-serif;
  }

  main {
    background: #ffffff;
    min-height: 100vh;
    padding: 5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

	.calculadora {
    background: #e5e7eb;
    width: 360px;
    border-radius: 0.75rem;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
    padding: 2rem 1.5rem;
    border: 1.5px solid
  }
</style>