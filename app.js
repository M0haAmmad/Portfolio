/**
 * Mohammad Baniyounis - Portfolio Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initTypewriter();
  initCopyEmail();
  initScrollReveal();
  initFloatingSymbols();
});

/**
 * 1. Navbar shrink effect on scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * 2. Mobile navigation toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      // Toggle a class to slide-in menu or show links
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(8, 11, 17, 0.95)';
        navLinks.style.padding = '2rem';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
        navLinks.style.gap = '1.5rem';
        navLinks.style.textAlign = 'center';
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      }
    });

    // Close menu when clicking nav link
    const navLinkItems = document.querySelectorAll('.nav-link-item, .nav-btn');
    navLinkItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      });
    });

    // Handle screen resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.borderBottom = 'none';
        navLinks.style.gap = '2.5rem';
      } else {
        navLinks.style.display = 'none';
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }
}

/**
 * 3. HTML-safe Typewriter Effect for Terminal Card
 */
function initTypewriter() {
  const element = document.getElementById('typed-code');
  if (!element) return;

  const codeString =
`<span class="code-comment">// Full-Stack Web Developer</span>
<span class="code-keyword">const</span> <span class="code-property">developer</span> = {
  name: <span class="code-string">'Mohammad Baniyounis'</span>,
  role: <span class="code-string">'Full-Stack Developer'</span>,
  degree: <span class="code-string">'Bachelor of CIS @ UJ'</span>,
  gpa: <span class="code-number">3.4</span>,
  skills: [
    <span class="code-string">'React'</span>, <span class="code-string">'JavaScript'</span>, <span class="code-string">'PHP'</span>,
    <span class="code-string">'SQL'</span>, <span class="code-string">'VB.Net'</span>
  ],
  openToWork: <span class="code-boolean">true</span>
};` ;

  let index = 0;
  let currentHTML = "";
  const speed = 12; // speed of typing

  function type() {
    if (index < codeString.length) {
      if (codeString[index] === '<') {
        let tagEnd = codeString.indexOf('>', index);
        if (tagEnd !== -1) {
          currentHTML += codeString.substring(index, tagEnd + 1);
          index = tagEnd + 1;
          type(); // Skip tag rendering delay
          return;
        }
      }
      currentHTML += codeString[index];
      element.innerHTML = currentHTML;
      index++;
      setTimeout(type, speed);
    }
  }

  // Delay typing slightly to allow page transition
  setTimeout(type, 800);
}

/**
 * 4. Clipboard copying helper for email
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-address');
  const tooltip = document.getElementById('copy-tooltip');

  if (copyBtn && emailTextEl && tooltip) {
    copyBtn.addEventListener('click', () => {
      const emailText = emailTextEl.textContent.trim();

      // Modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText)
          .then(() => showTooltip())
          .catch(err => fallbackCopy(emailText));
      } else {
        fallbackCopy(emailText);
      }
    });
  }

  function showTooltip() {
    tooltip.classList.add('show');
    copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--color-accent);"></i>';
    setTimeout(() => {
      tooltip.classList.remove('show');
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    }, 2000);
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showTooltip();
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }
}

/**
 * 5. IntersectionObserver for Reveal Animations & Nav active highlighting
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  // 5.1 Reveal elements on scroll
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5.2 Active navigation highlighting based on section scroll offset
  const sections = document.querySelectorAll('section');
  const navLinkItems = document.querySelectorAll('.nav-link-item');

  window.addEventListener('scroll', () => {
    let currentSectionId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 6. Dynamic Floating Background Technical Code Symbols
 */
function initFloatingSymbols() {
  const container = document.createElement('div');
  container.className = 'floating-symbols-container';
  document.body.appendChild(container);

  const symbols = ['{ }', '</>', '=>', '++', '[]', 'const', 'function', 'SELECT', '&&', '||', '===', 'async/await', 'npm run', 'git commit', 'db_connection'];
  const symbolCount = 16;

  for (let i = 0; i < symbolCount; i++) {
    const el = document.createElement('div');
    el.className = 'floating-symbol';
    
    // Assign random color theme class
    const colorClasses = ['color-primary', 'color-secondary', 'color-accent', 'color-muted'];
    el.classList.add(colorClasses[Math.floor(Math.random() * colorClasses.length)]);
    
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    // Randomize layout details
    el.style.left = `${Math.random() * 95}vw`;
    el.style.top = `${Math.random() * 90 + 5}vh`;
    el.style.fontSize = `${Math.random() * 0.9 + 0.8}rem`;

    // Stagger animation timing and speed
    el.style.animationDelay = `${Math.random() * -22}s`;
    el.style.animationDuration = `${Math.random() * 10 + 15}s`;

    container.appendChild(el);
  }
}

