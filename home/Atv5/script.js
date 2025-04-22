document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const flexContainer = document.getElementById('flexContainer');
    const flexItems = document.querySelectorAll('.flex-item');
    const cores = document.querySelectorAll('.cor');
    const formatos = document.querySelectorAll('.formato');
    const tamanhoInput = document.getElementById('tamanho');
    const flexDirectionSelect = document.getElementById('flexDirection');
    const justifyContentSelect = document.getElementById('justifyContent');
    const alignItemsSelect = document.getElementById('alignItems');

    // Funções de atualização
    function atualizarFormato() {
        const formato = document.querySelector('.formato.selecionado').dataset.formato;
        flexItems.forEach(item => {
            item.style.borderRadius = formato === 'circulo' ? '50%' : '0';
        });
    }

    function atualizarTamanho() {
        let tamanho = parseInt(tamanhoInput.value);
        
        if (isNaN(tamanho)) {
            tamanho = 60; // Valor padrão
        } else {
            tamanho = Math.max(30, Math.min(120, tamanho)); // Limite entre 30 e 120
        }
        
        tamanhoInput.value = tamanho;
        
        const tamanhoCompleto = tamanho + 'px';
        flexItems.forEach(item => {
            item.style.width = tamanhoCompleto;
            item.style.height = tamanhoCompleto;
        });
    }

    function atualizarCor(cor) {
        flexItems.forEach(item => {
            item.style.backgroundColor = cor;
        });
    }

    function atualizarFlex() {
        flexContainer.style.flexDirection = flexDirectionSelect.value;
        flexContainer.style.justifyContent = justifyContentSelect.value;
        flexContainer.style.alignItems = alignItemsSelect.value;
    }

    // Event listeners para formato e cor
    formatos.forEach(item => {
        item.addEventListener('click', function() {
            // Remover a classe 'selecionado' de todos os itens
            formatos.forEach(el => el.classList.remove('selecionado'));
            // Adicionar a classe 'selecionado' no item clicado
            item.classList.add('selecionado');
            atualizarFormato();
        });
    });

    cores.forEach(cor => {
        cor.addEventListener('click', function() {
            const corSelecionada = cor.style.backgroundColor;
            atualizarCor(corSelecionada);

            // Remover a classe 'selecionado' de todas as cores
            cores.forEach(c => c.classList.remove('selecionado'));
            // Adicionar a classe 'selecionado' na cor clicada
            cor.classList.add('selecionado');
        });
    });

    // Event listeners de tamanho
    tamanhoInput.addEventListener('input', function() {
        atualizarTamanho();
    });

    tamanhoInput.addEventListener('blur', function() {
        if (!tamanhoInput.value) {
            tamanhoInput.value = 60;
            atualizarTamanho();
        }
    });

    // Event listeners de flexbox
    flexDirectionSelect.addEventListener('change', atualizarFlex);
    justifyContentSelect.addEventListener('change', atualizarFlex);
    alignItemsSelect.addEventListener('change', atualizarFlex);

    // Inicialização
    atualizarFormato();
    atualizarTamanho();
    atualizarFlex();
});
