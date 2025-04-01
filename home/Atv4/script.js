function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Close menu if mobile
    const menu = document.querySelector('.menu');
    if (window.innerWidth <= 768 && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    // Show personal section by default
    showSection('pessoal');
});