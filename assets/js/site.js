/* Alexander Amadeo-Ranch | Portfolio interactions */

function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  const closeNav = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const nextState = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(nextState));
    nav.classList.toggle("is-open", nextState);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeNav();
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

function initReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!revealItems.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-project-card]");
  const emptyState = document.querySelector("[data-empty-state]");

  if (!filterButtons.length || !projectCards.length) return;

  const applyFilter = (filter) => {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !visible);
      if (visible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  // Honor URL hash if it points to a project entry inside a category
  applyFilter("all");
}

function initSmoothAnchorOffset() {
  // When a hash links to an in-page project, account for sticky header height.
  const adjustForHash = () => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;
    requestAnimationFrame(() => {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  window.addEventListener("hashchange", adjustForHash);
  if (window.location.hash) {
    setTimeout(adjustForHash, 60);
  }
}

function initHomeChargerBackground() {
  const bg = document.querySelector(".page-bg-charger");
  if (!bg) return;

  const hero = document.querySelector(".home-hero");
  if (!hero) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const maxOpacity = 0.55;
  const maxShift = reducedMotion ? 0 : 32; // px of subtle drift
  const maxScale = reducedMotion ? 1 : 1.08;

  let ticking = false;

  const update = () => {
    const heroHeight = hero.offsetHeight;
    const heroTop = hero.offsetTop;
    const heroBottom = heroTop + heroHeight;

    const scroll = window.scrollY;
    const viewport = window.innerHeight;
    const docMax = Math.max(1, document.documentElement.scrollHeight - viewport);

    // Fade in begins when the hero has scrolled half out, completes shortly after the hero exits.
    const fadeStart = heroTop + heroHeight * 0.35;
    const fadeEnd = heroBottom + viewport * 0.15;
    const t = Math.max(0, Math.min(1, (scroll - fadeStart) / Math.max(1, fadeEnd - fadeStart)));

    // Deep-scroll progress for the subtle parallax / breathing.
    const deep = Math.max(0, Math.min(1, scroll / docMax));

    bg.style.opacity = String(t * maxOpacity);
    bg.style.transform = `scale(${1 + deep * (maxScale - 1)}) translate3d(0, ${-deep * maxShift}px, 0)`;

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  });

  update();
}

function initVideoLazyHover() {
  // Pause off-screen videos to keep things calm.
  const videos = document.querySelectorAll("video");
  if (!videos.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    },
    { threshold: 0.1 }
  );

  videos.forEach((video) => observer.observe(video));
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHeaderScroll();
  initReveal();
  initProjectFilters();
  initSmoothAnchorOffset();
  initVideoLazyHover();
  initHomeChargerBackground();
});
