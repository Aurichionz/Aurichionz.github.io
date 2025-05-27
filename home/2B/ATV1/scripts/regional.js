const regionals = []; // Array para armazenar as regionais

function addRegional() {
    const regionalSigla = document.querySelector('#floatingInputRegionalSigla').value;
    const regionalCity = document.querySelector('#floatingInputRegionalCidade').value;
    if (regionalSigla && regionalCity) {
        const regionalObject = { id: regionals.length + 1, sigla: regionalSigla, cidade: regionalCity };
        regionals.push(regionalObject);
        addTableRegional(regionalObject);
        updateRegionalSelect();
        document.querySelector('#floatingInputRegionalSigla').value = '';
        document.querySelector('#floatingInputRegionalCidade').value = '';
        drawChart();
    } else {
        alert("Por favor, preencha todos os campos da regional.");
    }
}

function addTableRegional(object) {
    const tableBody = document.getElementById('table_regional').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${object.id}</td>
        <td>${object.sigla}</td>
        <td>${object.cidade}</td>
    `;
}

function updateRegionalSelect() {
    const regionalSelect = document.getElementById('select_regional');
    regionalSelect.innerHTML = '<option selected disabled>Regional</option>';
    regionals.forEach(regional => {
        const option = document.createElement('option');
        option.value = regional.sigla;
        option.textContent = regional.sigla;
        regionalSelect.appendChild(option);
    });
}