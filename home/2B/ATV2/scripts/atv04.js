function ex04() {
    const form = document.querySelector('#form04');
    const input = form.querySelector('input[name="in_04"]').value;

    const array = input.split(' ');
    const resultado = resolve04(...array);

    document.getElementById('output').innerText = resultado.join(' ');

    form.reset();
}

function resolve04(...array) {
    let resultado = [];

    for (let i = 0; i < array.length; i++) {
        let val = Number(array[i]);
        if (filter_perfeito(val)) {
            resultado.push(val);
        }
    }

    return resultado;
}

const filter_perfeito = (val) => {
    if (val <= 1) return false;

    let soma = 0;
    for (let i = 1; i <= val / 2; i++) {
        if (val % i === 0) soma += i;
    }

    return soma === val;
};
