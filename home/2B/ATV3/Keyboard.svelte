<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const botoes = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    'C', '0', '=', '+',
  ];

  function handleClick(key) {
    dispatch('buttonClick', key);
  }
</script>

<div class="keyboard" role="group" aria-label="Teclado da calculadora">
  {#each botoes as key}
    <button on:click={() => handleClick(key)} aria-label={"Botão " + key}>
      {key}
    </button>
  {/each}
</div>

<style>
  .keyboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  button {
    background: #add8e6;
    color: #191970;
    font-size: 3rem;
    font-weight: 700;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.25s ease;
    font-family: 'Inter', sans-serif;
  }

  button:hover,
  button:focus {
    background: #1e40af;
    outline: none;
  }
</style>