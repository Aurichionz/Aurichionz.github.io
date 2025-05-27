const agents = [];

function addAgent() {
    const agentName = document.querySelector('#floatingInputAgent').value;
    const regionalSelect = document.querySelector('#select_regional');
    const selectedRegional = regionalSelect.options[regionalSelect.selectedIndex].text;

    if (agentName && selectedRegional !== "Regional") {
        const agentObject = { id: agents.length + 1, name: agentName, regional: selectedRegional };
        agents.push(agentObject);
        addTableAgent(agentObject);
        updateAgentSelect();
        document.querySelector('#floatingInputAgent').value = '';
        drawChart();
    } else {
        alert("Por favor, preencha todos os campos do agente.");
    }
}

function addTableAgent(object) {
    const tableBody = document.getElementById('table_agent').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${object.id}</td>
        <td>${object.name}</td>
        <td>${object.regional}</td>
    `;
}

function updateAgentSelect() {
    const agentSelect = document.getElementById('select_agent');
    agentSelect.innerHTML = '<option selected disabled>Agente</option>';
    agents.forEach(agent => {
        const option = document.createElement('option');
        option.value = agent.id;
        option.textContent = agent.name;
        agentSelect.appendChild(option);
    });
}