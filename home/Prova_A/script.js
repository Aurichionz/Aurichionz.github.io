document.addEventListener('DOMContentLoaded', function() {
      const aviao = document.querySelector('.aviao');
      console.log('Elemento do avião:', aviao);
      
      // Verifica se a animação está aplicada
      const estilo = window.getComputedStyle(aviao);
      console.log('Estilo de animação:', estilo.animation);
      
      // Força repaint (às vezes ajuda)
      aviao.style.animation = 'none';
      void aviao.offsetWidth; // Trigger reflow
      aviao.style.animation = estilo.animation;
    });
