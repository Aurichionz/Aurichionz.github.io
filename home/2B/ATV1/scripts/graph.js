function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Element', { role: 'style' }], // Nome da coluna e papel da próxima (estilo)
  ['Agentes', data_agents.length, 'blue'], // Nome do elemento, valor, cor
  ['Regionais', data_regionals.length, 'orange'],
  ['Temas', data_subjects.length, 'green'],
  ['Relatórios', data_reports.length, 'red'] // CSS-style declaration (cor)
  ]);
  
  var options = {
  legend: { position: 'none' } // Oculta a legenda
  };
  
  var chart = new google.visualization.ColumnChart(document.getElementById('chart1'));
  chart.draw(data, options);
  }