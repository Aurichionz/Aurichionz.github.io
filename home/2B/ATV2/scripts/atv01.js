function ex01() {
    const form = document.querySelector('#form01');
    const input = form.querySelector('input[name="in_01"]').value;

    let valores = [];
    let numero = '';

    for (let i = 0; i < input.length; i++) {
        let caractere = input[i];

        if ((caractere >= '0' && caractere <= '9') || caractere == '.') {
            numero += caractere;
        } else if (caractere == ' ') {
            if (numero != '') {
                valores.push(parseFloat(numero));
                numero = '';
            }
        }
    }

    if (numero != '') {
        valores.push(parseFloat(numero));
    }

    const resultado = resolve01.apply(null, valores);

    document.getElementById('output').innerText = "Média: " + resultado;

    form.reset();
}

function resolve01() {
    let soma = 0;
    let quantidade = arguments.length;

    for (let i in arguments) {
        soma += Number(arguments[i]);
    }

    if (quantidade === 0) {
        return 0;
    }

    return (soma / quantidade).toFixed(2);
}
