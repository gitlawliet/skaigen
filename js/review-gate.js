(() => {
  const key = 'skaigen-review-2027';
  const digest = 'd31d309913178d35e40c43f9e1e4a8f7d6bc355ed1e8940dc162d436ae1ebbee';
  try {
    if (sessionStorage.getItem(key) === digest) {
      document.documentElement.classList.remove('review-locked');
      return;
    }
  } catch (_) {}

  document.addEventListener('DOMContentLoaded', () => {
    const gate = document.createElement('main');
    gate.id = 'review-gate';
    gate.innerHTML = '<form><h1>SK AIGEN</h1><p>사이트를 확인하려면 비밀번호를 입력해주세요.</p><label for="review-password">비밀번호</label><input id="review-password" type="password" autocomplete="current-password" required aria-describedby="review-error"><p id="review-error" role="alert"></p><button type="submit">확인</button></form>';
    document.body.appendChild(gate);
    const input = gate.querySelector('input');
    const error = gate.querySelector('#review-error');
    input.focus();
    gate.querySelector('form').addEventListener('submit', async event => {
      event.preventDefault();
      const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.value));
      const actual = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
      if (actual !== digest) {
        error.textContent = '비밀번호가 올바르지 않습니다.';
        input.setAttribute('aria-invalid', 'true');
        input.select();
        return;
      }
      try {
        sessionStorage.setItem(key, digest);
        location.reload();
      } catch (_) {
        document.documentElement.classList.remove('review-locked');
        gate.remove();
        window.dispatchEvent(new Event('resize'));
      }
    });
  });
})();
