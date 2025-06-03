function ex05() {
    const form = document.querySelector('#form05');
    const input = form.querySelector('input[name="in_05"]').value;
    const array = JSON.parse(input);
    const dados = new construtora(array);

    const resultado = resolve05(dados);

    document.getElementById('output').innerHTML = resultado;

    form.reset();
}

function resolve05(obj) {
   let resultado = ' ';
   resultado += `Id: ${obj.id}<br>`;
   resultado += `Nome: ${obj.nome}<br>`;
   resultado += `Média: ${obj.media}<br>`;

   return resultado
}

function construtora(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.media = data.media;
}