const data_subjects = [];

function addSubject() {
  const form = document.querySelector('#formSubject');
  const descricao = form.querySelector('input[name="descricao"]');

  const newSubject = {
    id: data_subjects.length + 1,
    descricao: descricao.value
  };

  data_subjects.push(newSubject);
  addTableSubject(newSubject);
  addSelectSubject(newSubject);
  drawChart()
  form.reset();
}

function addTableSubject(subject) {
  const table = document.querySelector('#table_subject');
  const line = document.createElement('tr');

  const colId = document.createElement('td');
  colId.textContent = subject.id;
  const colDescricao = document.createElement('td');
  colDescricao.textContent = subject.descricao;

  line.appendChild(colId);
  line.appendChild(colDescricao);
  table.appendChild(line);
}

function addSelectSubject(subject) {
  const select = document.querySelector('#select_subject');
  const option = document.createElement('option');
  option.textContent = subject.descricao;
  option.value = subject.descricao;
  select.appendChild(option);
}
