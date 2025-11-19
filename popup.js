// Navigation between popup.html and option.html

// Check if back button exists (on option.html) and navigate to popup.html
const backBtn = document.getElementById('backBtn');
if (backBtn) {
    backBtn.addEventListener('click', function () {
        window.location.href = 'popup.html';
    });
}

// Add listener for buttons that navigate to option.html
const openOptionsButtons = document.querySelectorAll('.open-options');
openOptionsButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        window.location.href = 'option.html';
    });
});
