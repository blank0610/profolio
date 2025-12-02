// Set year
document.getElementById("year").textContent = new Date().getFullYear();

// Make each flip card height match its content (front/back)
function sizeFlipCards() {
  document.querySelectorAll('.card-flip').forEach(card => {
    const inner = card.querySelector('.card-inner');
    const front = card.querySelector('.card-front');
    const back  = card.querySelector('.card-back');
    if (!inner || !front || !back) return;

    // Reset any previous height
    card.style.height = 'auto';
    inner.style.height = 'auto';

    // Temporarily let them be in normal flow to measure
    const originalFrontPos = front.style.position;
    const originalBackPos  = back.style.position;

    front.style.position = 'relative';
    back.style.position  = 'relative';

    const frontHeight = front.scrollHeight;
    const backHeight  = back.scrollHeight;
    const maxHeight   = Math.max(frontHeight, backHeight);

    // Apply heights
    card.style.height  = maxHeight + 'px';
    inner.style.height = maxHeight + 'px';

    // Restore flip positioning
    front.style.position = originalFrontPos || 'absolute';
    back.style.position  = originalBackPos  || 'absolute';
  });
}

// Run once on load
sizeFlipCards();

// Flip-card click logic
document.querySelectorAll('.card-flip').forEach(card => {
  const showBtn = card.querySelector('.card-btn[data-flip="show"]');
  const hideBtn = card.querySelector('.card-btn[data-flip="hide"]');

  if (showBtn) {
    showBtn.addEventListener('click', () => {
      card.classList.add('flipped');
    });
  }
  if (hideBtn) {
    hideBtn.addEventListener('click', () => {
      card.classList.remove('flipped');
    });
  }
});

// (Optional) re-size on window resize
window.addEventListener('resize', () => {
  sizeFlipCards();
});

// FULLSCREEN IMAGE PREVIEW
const imageModal = document.getElementById('image-modal');
const imageModalImg = document.getElementById('image-modal-img');

// When clicking any back-of-card image, open it fullscreen
document.querySelectorAll('.card-back-image-wrapper img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    imageModalImg.src = img.src;
    imageModal.classList.add('active');
  });
});

// Click outside image to close
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) {
    imageModal.classList.remove('active');
  }
});

// Close on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    imageModal.classList.remove('active');
  }
});
