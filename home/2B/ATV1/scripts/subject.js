const subjects = [];

function addSubject() {
    const subjectDescription = document.querySelector('#floatingInputSubject').value;
    if (subjectDescription) {
        const subjectObject = { id: subjects.length + 1, name: subjectDescription };
        subjects.push(subjectObject);
        addTableSubject(subjectObject);
        updateSubjectSelect();
        document.querySelector('#floatingInputSubject').value = '';
        drawChart();
    } else {
        alert("Por favor, insira uma descrição para o assunto.");
    }
}

function addTableSubject(object) {
    const tableBody = document.getElementById('table_subject').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${object.id}</td>
        <td>${object.name}</td>
    `;
}
function updateSubjectSelect() {
    const subjectSelect = document.getElementById('select_subject');
    subjectSelect.innerHTML = '<option selected disabled>Assunto</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.id;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
    });
}