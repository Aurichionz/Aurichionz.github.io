
function addStudent() {

    // Obtém referência do formulário
    const form = document.querySelector('#formStudent')
    // Obtém o valor dos campos de entrada
    const input_nome = form.querySelector('input[name="nome"]')
    const input_turma = form.querySelector('select[name="turma"]')

    // TABELA
    // Obtém referência da tabela
    const table = document.querySelector('#table_student');
    // Cria um elemento <tr>
    const line = document.createElement('tr')
    // Cria um elemento <td>
    const col_nome = document.createElement('td')
    // Insere o conteúdo que será exigido pelo <td>   
    col_nome.textContent = input_nome.value
    const col_turma = document.createElement('td') 
    // Insere o conteúdo que será exigido pelo <td>     
    col_turma.textContent = input_turma.value
    // Adiciona os elementos <td> ao elemento <tr>
    line.appendChild(col_nome);
    line.appendChild(col_turma);
    // Adiciona o elemento <tr> ao elemento <table>
    table.appendChild(line);

    // SELECT
    // Obtém referência do select
    const select = document.querySelector('#select_student');
    // Cria um elemento <option>
    const op = document.createElement("option");
    // Insere o conteúdo que será exigido pelo <option>     
    op.textContent = input_nome.value
    // Configura o valor que será retornado pelo <option> ao submeter o formuláro
    op.value = input_nome.value
    // Adiciona o elemento <option> ao elemento <select>
    select.appendChild(op)
    
    // RESET CAMPOS
    form .reset()
}