// services.js
document.querySelectorAll('.services-menu li').forEach(menuItem => {
    menuItem.addEventListener('click', function() {
        // Remove active class from all menu items
        document.querySelectorAll('.services-menu li').forEach(item => item.classList.remove('active'));
        // Add active class to clicked menu item
        menuItem.classList.add('active');

        // Hide all service contents
        document.querySelectorAll('.service-content').forEach(content => content.classList.remove('active'));
        // Show the selected service content
        const serviceId = menuItem.getAttribute('data-service');
        document.getElementById(serviceId).classList.add('active');
    });
});
