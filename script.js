// Hamburger menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close menu when a nav link is clicked
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id], div[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkItems.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Last updated date from GitHub API
fetch('https://api.github.com/repos/mkyadav2021/portfolio-website/commits/main')
  .then(r => {
    if (!r.ok) throw new Error();
    return r.json();
  })
  .then(data => {
    const dateStr = data?.commit?.author?.date || data?.commit?.committer?.date;
    if (!dateStr) throw new Error();
    const formatted = new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('last-updated').textContent = 'Updated ' + formatted;
  })
  .catch(() => {
    // fallback: use browser's last-modified header
    const mod = document.lastModified;
    if (mod) {
      const formatted = new Date(mod).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      document.getElementById('last-updated').textContent = 'Updated ' + formatted;
    }
  });

// Inject active link style dynamically
const style = document.createElement('style');
style.textContent = '.nav-links a.active { color: var(--text); background: var(--surface); }';
document.head.appendChild(style);
