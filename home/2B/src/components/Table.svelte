<script>

</script>

<main>
    <h3>Tarefas Agendadas</h3>
    <table>
        <thead>
            <tr>
                <th>TAREFA</th>
                <th>PRAZO</th>
                <th>PRIORIDADE</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <button class="btn-check">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </button>

                    <button class="btn-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                        </svg>
                    </button>

                    <button class="btn-remove">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</main>

<style>
    
    table {
        width: 100%;
        border-collapse: collapse;
        border: 2px solid lightgray;
        box-shadow: 3px 3px 3px 2px darkgray;
    }

    th, td {
        padding: 10px;
        text-align: left;
    }

    tr:nth-child(even) { background-color: lightgray; }

    button {
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        border: none;
    }

    button:hover {
        opacity: 0.7;
        cursor:grab;
    }

    .btn-remove {
        background-color: red;
    }

    .btn-check {
        background-color: green;
    }

    .btn-info {
        background-color: blue;
    }

    h3 {
        font-size: 24px;
        color: whitesmoke;
        text-shadow: 2px 2px 4px #000000;
        margin-bottom: 10px;
    }

</style>