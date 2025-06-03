function ex02() {
    const form = document.querySelector('#form02');
    const input = form.querySelector('input[name="in_02"]').value;

    let valores = [];
    let numero = '';

    for (let i = 0; i < input.length; i++) {
        let caractere = input[i];

        if ((caractere >= '0' && caractere <= '9') || caractere === '.') {
            numero += caractere;
        } else if (caractere === ' ') {
            if (numero !== '') {
                valores.push(parseFloat(numero));
                numero = '';
            }
        }
    }

    if (numero !== '') {
        valores.push(parseFloat(numero));
    }

    const resultado = resolve02(...valores);

    document.getElementById('output').innerText = "Média: " + resultado;

    form.reset();
}

const resolve02 = (...array) => {
    let soma = 0;
    let quantidade = array.length;

    array.forEach ((numero) => soma += Number(numero));

    return (soma / quantidade).toFixed(2);
};
