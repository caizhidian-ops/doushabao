const toast = document.querySelector('.toast');
let toastTimer;
function notify(message) {
  const feedback = document.querySelector('dialog[open] .copy-feedback');
  if (feedback) { feedback.textContent = message; return; }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}
document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialog);
    const feedback = dialog.querySelector('.copy-feedback');
    if (feedback) feedback.textContent = '';
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom;
    if (event.target === dialog && outside) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
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
