<script>
  export let valor;
</script>

<div class="display" role="textbox" aria-readonly="true" aria-label="Visor da calculadora">
  {valor}
</div>

<style>
  .display {
    background: #add8e6;
    color: #191970;
    font-size: 3rem;
    font-weight: 700;
    text-align: right;
    padding: 1.5rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
    margin-bottom: 2rem;
    user-select: none;
    min-height: 5rem;
    overflow-x: auto;
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
  }
</style>