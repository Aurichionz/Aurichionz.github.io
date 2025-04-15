document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const flexContainer = document.getElementById('flexContainer');
    const flexItems = document.querySelectorAll('.flex-item');
    const formatoSelect = document.getElementById('formato');
    const tamanhoInput = document.getElementById('tamanho');
    const flexDirectionSelect = document.getElementById('flexDirection');
    const justifyContentSelect = document.getElementById('justifyContent');
    const alignItemsSelect = document.getElementById('alignItems');

    // Funções de atualização
    function atualizarFormato() {
        const formato = formatoSelect.value;
        flexItems.forEach(item => {
            item.style.borderRadius = formato === 'circulo' ? '50%' : '4px';
        });
    }

    function atualizarTamanho() {
        let tamanho = parseInt(tamanhoInput.value);
        
        // Validação do valor
        if (isNaN(tamanho)) {
            tamanho = 60; // Valor padrão se inválido
        } else {
            tamanho = Math.max(50, Math.min(120, tamanho)); // Limita entre 50 e 120
        }
        
        // Atualiza o valor no input (caso tenha sido corrigido)
        tamanhoInput.value = tamanho;
        
        // Aplica o tamanho aos itens
        const tamanhoCompleto = tamanho + 'px';
        flexItems.forEach(item => {
            item.style.width = tamanhoCompleto;
            item.style.height = tamanhoCompleto;
        });
    }

    function atualizarFlex() {
        flexContainer.style.flexDirection = flexDirectionSelect.value;
        flexContainer.style.justifyContent = justifyContentSelect.value;
        flexContainer.style.alignItems = alignItemsSelect.value;
    }

    // Event listeners
    formatoSelect.addEventListener('change', atualizarFormato);
    
    tamanhoInput.addEventListener('input', function(e) {
        // Permite apenas números e teclas de controle
        if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
        atualizarTamanho();
    });
    
    tamanhoInput.addEventListener('change', atualizarTamanho);
    tamanhoInput.addEventListener('blur', function() {
        if (tamanhoInput.value === '') {
            tamanhoInput.value = 60;
            atualizarTamanho();
        }
    });

    flexDirectionSelect.addEventListener('change', atualizarFlex);
    justifyContentSelect.addEventListener('change', atualizarFlex);
    alignItemsSelect.addEventListener('change', atualizarFlex);

    // Inicialização
    atualizarFormato();
    atualizarTamanho();
    atualizarFlex();
});