(() => {
  'use strict';
  const en = document.documentElement.lang === 'en';
  const text = en ? {
    title: 'Project consultation brief', company: 'Company', person: 'Contact', email: 'Email', solution: 'Area of interest', message: 'Site challenges and project goals',
    send: 'Send inquiry ↗', sending: 'Sending…', sent: 'Request accepted',
    accepted: 'Your inquiry has been accepted by the email service for delivery to seo.youngwook@gmail.com.',
    activation: 'Email verification is still required for this form. Please use the email app link below to contact us.',
    error: 'We could not confirm that your inquiry was accepted. Your brief is still available to copy or save. You can also use the email app link below.',
    copied: 'Brief copied.', copyError: 'Copying is unavailable. Please save the brief as a file.', whitespace: 'Please enter a value.',
    pending: 'Please wait for the current send request to finish.'
  } : {
    title: '프로젝트 상담 요청서', company: '회사명', person: '담당자', email: '이메일', solution: '관심 분야', message: '현장 과제 및 도입 목표',
    send: '이메일로 문의 전송 ↗', sending: '전송 중…', sent: '전송 요청 접수 완료',
    accepted: '이메일 전송 서비스가 문의를 접수했습니다. seo.youngwook@gmail.com으로 전달됩니다.',
    activation: '문의 폼의 수신 이메일 인증이 아직 필요합니다. 아래 메일 앱 링크로 문의해 주세요.',
    error: '문의가 접수되었는지 확인하지 못했습니다. 작성한 내용은 복사·저장할 수 있으며, 아래 메일 앱 링크로도 보낼 수 있습니다.',
    copied: '요청서를 복사했습니다.', copyError: '복사가 지원되지 않습니다. 파일로 저장해 주세요.', whitespace: '내용을 입력해 주세요.',
    pending: '진행 중인 전송이 끝날 때까지 기다려 주세요.'
  };
  const modal = document.querySelector('#consult');
  const form = document.querySelector('#inquiry-form');
  const result = document.querySelector('#result');
  const send = document.querySelector('#send-request');
  const status = document.querySelector('#send-status');
  const edit = document.querySelector('#edit-request');
  let request = '', draft = null, busy = false, sent = false;
  function showStatus(message, error = false) {
    status.textContent = message;
    status.classList.toggle('error', error);
  }
  document.querySelectorAll('[data-consult]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault(); modal.showModal();
  }));
  document.querySelector('.close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const box = modal.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) modal.close();
  });
  for (const field of form.querySelectorAll('[required]')) {
    field.addEventListener('input', () => field.setCustomValidity(field.value.trim() ? '' : text.whitespace));
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (busy) { showStatus(text.pending); return; }
    const data = new FormData(form);
    draft = Object.fromEntries([...data].map(([key, value]) => [key, String(value).trim()]));
    request = `Autorize Automation | ${text.title}\n\n${text.company}: ${draft.company}\n${text.person}: ${draft.person}\n${text.email}: ${draft.email}\n${text.solution}: ${draft.solution}\n\n${text.message}\n${draft.message}`;
    document.querySelector('#request-preview').textContent = request;
    document.querySelector('#email-fallback').href = `mailto:seo.youngwook@gmail.com?subject=${encodeURIComponent('[Autorize Automation] ' + text.title + ' — ' + draft.company)}&body=${encodeURIComponent(request)}`;
    sent = false; send.disabled = false; send.textContent = text.send;
    showStatus(''); document.querySelector('#copy-status').textContent = '';
    form.hidden = true; result.style.display = 'block'; send.focus();
  });
  edit.addEventListener('click', () => {
    if (busy) return;
    form.hidden = false; result.style.display = 'none'; form.elements.company.focus();
  });
  send.addEventListener('click', async () => {
    if (!draft || busy || sent) return;
    if (draft._honey) return;
    busy = true; send.disabled = true; edit.disabled = true; send.textContent = text.sending;
    showStatus(text.sending);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/seo.youngwook@gmail.com', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: draft.person, email: draft.email, company: draft.company, solution: draft.solution, message: draft.message,
          _subject: `[Autorize Automation] ${en ? 'Project inquiry' : '프로젝트 문의'} — ${draft.company}`,
          _template: 'table', _honey: draft._honey, language: en ? 'English' : '한국어', source: location.origin + location.pathname
        })
      });
      const data = await response.json();
      const message = String(data.message || '').toLowerCase();
      if (/activat|verif|confirm.*email/.test(message)) { showStatus(text.activation, true); return; }
      if (!response.ok || !(data.success === true || data.success === 'true')) throw new Error('Submission not confirmed');
      sent = true; send.textContent = text.sent; showStatus(text.accepted);
    } catch { showStatus(text.error, true); }
    finally {
      clearTimeout(timeout); busy = false; edit.disabled = false;
      send.disabled = sent; if (!sent) send.textContent = text.send;
    }
  });
  document.querySelector('#copy-request').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(request); document.querySelector('#copy-status').textContent = text.copied; }
    catch { document.querySelector('#copy-status').textContent = text.copyError; }
  });
  document.querySelector('#download-request').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob(['\ufeff' + request], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'Autorize-project-inquiry.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
