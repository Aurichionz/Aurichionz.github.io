const data_agents = [];

function addAgent() {
  const form = document.querySelector('#formAgent');
  const nome = form.querySelector('input[name="nome"]');
  const regionalSelect = form.querySelector('select[name="regional"]');

  const newAgent = {
    id: data_agents.length + 1,
    nome: nome.value,
    regional: regionalSelect.value
  };

  data_agents.push(newAgent);
  addTableAgent(newAgent);
  addSelectAgent(newAgent);
  drawChart();
  form. reset();
}

function addTableAgent(agent) {
  const table = document.querySelector('#table_agent');
  const line = document.createElement('tr');

  const colId = document.createElement('td');
  colId.textContent = agent.id;
  const colNome = document.createElement('td');
  colNome.textContent = agent.nome;
  const colRegional = document.createElement('td');
  colRegional.textContent = agent.regional;

  line.appendChild(colId);
  line.appendChild(colNome);
  line.appendChild(colRegional);
  table.appendChild(line);
}

function addSelectAgent(agent) {
  const select = document.querySelector('#select_agent');
  const option = document.createElement('option');
  option.textContent = agent.nome;
  option.value = agent.nome;
  select.appendChild(option);
}
