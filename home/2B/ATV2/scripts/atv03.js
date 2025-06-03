function ex03() {
    const form = document.querySelector('#form03');
    const input = form.querySelector('input[name="in_03"]').value;

    const arrayString = input.split(' ');
    const arrayNumero = arrayString.map(item => Number(item));
    const resultado = resolve03(...arrayNumero);

    let saida = '';
    for (let i = 0; i < resultado.length; i++) {
        saida += resultado[i];
        if (i < resultado.length - 1) {
            saida += '<br>';
        }
    }

    document.querySelector('#output').innerHTML = saida;
    form.reset();
}

let resolve03 = (...arrayNumero) => {
    return arrayNumero.map(item => {
        return `${isEven(item)}`;
    });
};

function isEven(val) {
    if (val % 2 === 0) {
        return "PAR";
    }
    return "ÍMPAR";
}
