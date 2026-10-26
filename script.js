document.querySelectorAll('[data-copy-email]').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('tezcns@gmail.com');
      button.textContent = 'Email copied';
      setTimeout(() => { button.textContent = 'Copy email'; }, 2500);
    } catch {
      button.textContent = 'tezcns@gmail.com';
    }
  });
});

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  let sourceButton;
  const close = () => { lightbox.close(); };
  document.querySelectorAll('[data-zoom]').forEach(button => {
    button.addEventListener('click', () => {
      sourceButton = button;
      const source = button.querySelector('img');
      lightbox.querySelector('img').src = source.src;
      lightbox.querySelector('img').alt = source.alt;
      lightbox.querySelector('.lightbox-caption').textContent = button.dataset.caption || source.alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.addEventListener('click', event => {
    const rect = lightbox.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
  lightbox.addEventListener('close', () => sourceButton?.focus());
}

const faceInput = document.querySelector('[data-dice-face]');
if (faceInput) {
  const update = () => {
    const face = Number(faceInput.value);
    const hitThenFlip = face === 1 ? 0 : 8 - face;
    const waitThenFlip = 7 - face;
    document.querySelector('[data-hit-result]').textContent = face === 1 ? 'Cleared' : hitThenFlip;
    document.querySelector('[data-wait-result]').textContent = waitThenFlip;
    const note = face === 1
      ? 'A hit clears the die before the flip. The removal is permanent.'
      : `One hit now leaves ${hitThenFlip} hits after the flip; leaving this die untouched leaves ${waitThenFlip}. Waiting still spends a move elsewhere, so access and other goals matter.`;
    document.querySelector('[data-dice-result]').textContent = note;
  };
  faceInput.addEventListener('change', update);
  update();
}
