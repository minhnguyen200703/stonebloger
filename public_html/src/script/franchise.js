// franchise.js
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', function() {
        // Remove active class from all icons
        document.querySelectorAll('.icon').forEach(item => item.classList.remove('active'));

        // Add active class to the clicked icon
        icon.classList.add('active');

        // Hide all benefit contents
        document.querySelectorAll('.benefit-content').forEach(content => content.classList.remove('active'));

        // Show the selected benefit content
        const benefitId = icon.getAttribute('data-benefit');
        document.getElementById(benefitId).classList.add('active');
    });
});
