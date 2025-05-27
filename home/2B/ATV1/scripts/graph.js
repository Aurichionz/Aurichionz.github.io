function drawChart() {
    const data = google.visualization.arrayToDataTable([
        ['Tipo', 'Quantidade', { role: 'style' }],
        ['Assuntos', subjects.length, '#a8c7f7'],
        ['Regionais', regionals.length, '#fdf1a5'],
        ['Agentes', agents.length, '#a8f7c7'],
        ['Relatórios', reports.length, '#f7a8a8']
    ]);

    const options = {
        title: 'Quantidade de Dados Cadastrados',
        legend: { position: "none" },
        chartArea: { width: '70%', height: '70%' },
        vAxis: {
            minValue: 0,
            format: '0',
            gridlines: { count: 6 }
        },
        hAxis: {
        },
        animation: {
            duration: 500,
            easing: 'out',
            startup: true
        }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chart'));
    chart.draw(data, options);
}

