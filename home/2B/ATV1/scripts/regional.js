const data_regionals = [];

function addRegional() {
  const form = document.querySelector('#formRegional');
  const sigla = form.querySelector('input[name="sigla"]');
  const cidade = form.querySelector('input[name="cidade"]');

  const newRegional = {
    id: data_regionals.length + 1,
    sigla: sigla.value,
    cidade: cidade.value
  };

  data_regionals.push(newRegional);
  addTableRegional(newRegional);
  addSelectRegional(newRegional);
  drawChart()
  form.reset();
}

function addTableRegional(regional) {
  const table = document.querySelector('#table_regional');
  const line = document.createElement('tr');

  const colId = document.createElement('td');
  colId.textContent = regional.id;
  const colSigla = document.createElement('td');
  colSigla.textContent = regional.sigla;
  const colCidade = document.createElement('td');
  colCidade.textContent = regional.cidade;

  line.appendChild(colId);
  line.appendChild(colSigla);
  line.appendChild(colCidade);
  table.appendChild(line);
}

function addSelectRegional(regional) {
  const select = document.querySelector('#select_regional');
  const option = document.createElement('option');
  option.textContent = regional.sigla;
  option.value = regional.sigla;
  select.appendChild(option);
}
