(() => {
    const authenticationButtons = document.querySelectorAll('.authentication-button');

    authenticationButtons.forEach((button) => {
        button.addEventListener('click', () => {
            window.location = button.getAttribute('data-href');
        });
    })
})();