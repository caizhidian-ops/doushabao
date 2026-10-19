const toast = document.querySelector('.toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}
document.querySelectorAll('[data-panel]').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.panel);
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    panel.hidden = isOpen;
  });
});
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      notify('已复制，在微信中搜索「塔塔记」');
    } catch {
      notify('请在微信中搜索「塔塔记」');
    }
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
