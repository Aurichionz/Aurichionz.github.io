document.querySelectorAll('.option').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.1)';
        item.style.opacity = '0.7';
    });
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
        item.style.opacity = '1';
    });
});
