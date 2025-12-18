// ハンバーガーメニューの開閉機能
const menuBtn = document.querySelector('.menu-btn');
const menuPanel = document.querySelector('.menu-panel');

if (menuBtn && menuPanel) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menuPanel.classList.toggle('active');
  });
}
