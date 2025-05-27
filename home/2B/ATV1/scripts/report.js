const reports = [];

function addReport() {
    const reportDate = document.querySelector('#floatingInputReportDate').value;
    const subjectSelect = document.querySelector('#select_subject');
    const selectedSubject = subjectSelect.options[subjectSelect.selectedIndex].text;
    const agentSelect = document.querySelector('#select_agent');
    const selectedAgent = agentSelect.options[agentSelect.selectedIndex].text;

    if (reportDate && selectedSubject !== "Assunto" && selectedAgent !== "Agente") {
        const reportObject = { id: reports.length + 1, date: reportDate, subject: selectedSubject, agent: selectedAgent };
        reports.push(reportObject);
        addTableReport(reportObject);
        document.querySelector('#floatingInputReportDate').value = '';
        drawChart();
    } else {
        alert("Por favor, preencha todos os campos do relatório.");
    }
}

function addTableReport(object) {
    const tableBody = document.getElementById('table_report').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${object.id}</td>
        <td>${object.date}</td>
        <td>${object.subject}</td>
        <td>${object.agent}</td>
    `;
}