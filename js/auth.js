function initAuthEvents() {
    const loginModal = document.getElementById('loginModal');
    const openAuthBtn = document.getElementById('open-auth');
    const closeModalBtn = document.getElementById('closeModal');
    const loginTab = document.getElementById('btn-login-tab');
    const regTab = document.getElementById('btn-reg-tab');
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const authTitle = document.getElementById('auth-title');

    if (openAuthBtn) openAuthBtn.onclick = () => loginModal.style.display = 'flex';
    if (closeModalBtn) closeModalBtn.onclick = () => loginModal.style.display = 'none';

    if (loginTab && regTab) {
        loginTab.onclick = () => {
            loginTab.classList.add('active');
            regTab.classList.remove('active');
            loginForm.style.display = 'flex';
            regForm.style.display = 'none';
            authTitle.innerText = 'Увійдіть в акаунт';
        };

        regTab.onclick = () => {
            regTab.classList.add('active');
            loginTab.classList.remove('active');
            regForm.style.display = 'flex';
            loginForm.style.display = 'none';
            authTitle.innerText = 'Реєстрація';
        };
    }
}