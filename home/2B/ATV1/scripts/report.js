const data_reports = [];

function addReport() {
  const form = document.querySelector('#formReport');
  const data = form.querySelector('input[name="data"]');
  const assuntoSelect = form.querySelector('select[name="assunto"]');
  const agenteSelect = form.querySelector('select[name="agente"]');

  const newReport = {
    id: data_reports.length + 1,
    data: data.value,
    assunto: assuntoSelect.value,
    agente: agenteSelect.value
  };

  data_reports.push(newReport);
  addTableReport(newReport);
  drawChart()
  form.reset();
}

function addTableReport(report) {
  const table = document.querySelector('#table_report');
  const line = document.createElement('tr');

  const colId = document.createElement('td');
  colId.textContent = report.id;
  const colData = document.createElement('td');
  colData.textContent = report.data;
  const colAssunto = document.createElement('td');
  colAssunto.textContent = report.assunto;
  const colAgente = document.createElement('td');
  colAgente.textContent = report.agente;

  line.appendChild(colId);
  line.appendChild(colData);
  line.appendChild(colAssunto);
  line.appendChild(colAgente);
  table.appendChild(line);
}
