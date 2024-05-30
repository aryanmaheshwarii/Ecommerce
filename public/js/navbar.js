function toggleMenu() {
    const bars = document.querySelector('.fa-bars');
    const mobile = document.querySelector('.for-mobile');
    const logoutBtn = document.querySelector('.logoutBtn');
    bars.classList.toggle('fa-xmark');
    if (bars.classList.contains('fa-xmark')) {
        mobile.style.display = 'block';
        mobile.classList.add('mobile-styles');
        logoutBtn.classList.add('loggedOut');
        console.log(mobile);
    }
    else {
        mobile.style.display = 'none';
    }
}
