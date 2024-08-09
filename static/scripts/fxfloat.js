document.addEventListener('DOMContentLoaded', function() {
    // Wait until the button is available in the DOM
    const checkButtonInterval = setInterval(function() {
        const button = document.querySelector('.iubenda-tp-btn');

        if (button) {
            // Change the value of the 'data-tp-float' attribute
            button.setAttribute('data-tp-float', 'bottom-left');
            clearInterval(checkButtonInterval); // Stop the interval once the button is found and updated
        }
    }, 100); // Check every 100ms
});
