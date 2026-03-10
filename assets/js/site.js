const spotlightItems = {
  atlas: {
    title: "Atlas Control Center",
    copy:
      "A unified reliability workspace that brought incidents, deploy health, and service ownership into a single view. I designed the dashboard system, shipped the UI architecture, and partnered with platform teams to make fast decisions feel obvious.",
    metrics: [
      { value: "42%", label: "faster incident triage" },
      { value: "5", label: "dashboards merged into one workflow" },
      { value: "99.95%", label: "service uptime after rollout" }
    ],
    tags: ["React", "TypeScript", "Node", "Observability"],
    image: "assets/images/project-atlas.svg"
  },
  pulse: {
    title: "Pulse Forecast Engine",
    copy:
      "A demand-planning tool that turned noisy sales and support signals into weekly inventory recommendations. I owned the user-facing flows, the data storytelling, and the internal tooling that helped operators trust the model output.",
    metrics: [
      { value: "28%", label: "drop in stockouts during pilot" },
      { value: "11", label: "regional teams onboarded" },
      { value: "3x", label: "faster reporting cycle" }
    ],
    tags: ["Python", "Forecasting", "Data UX", "APIs"],
    image: "assets/images/project-pulse.svg"
  },
  orbit: {
    title: "Orbit Commerce Studio",
    copy:
      "A merchandiser toolkit for launching landing pages, bundles, and campaigns without waiting on engineering. I led the component system, the experiment surfaces, and the performance work that kept the editor snappy under heavy usage.",
    metrics: [
      { value: "65%", label: "faster campaign launches" },
      { value: "18%", label: "higher conversion on refreshed pages" },
      { value: "4", label: "product teams sharing one design system" }
    ],
    tags: ["Frontend", "Design Systems", "Experimentation", "Performance"],
    image: "assets/images/project-orbit.svg"
  }
};

function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const nextState = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(nextState));
    nav.classList.toggle("is-open", nextState);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

function initReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!revealItems.length) {
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
      threshold: 0.18
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-target]");

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const decimals = Number(counter.dataset.decimals || 0);
    const prefix = counter.dataset.prefix || "";
    const suffix = counter.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      counter.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initSpotlight() {
  const title = document.querySelector("[data-spotlight-title]");
  const copy = document.querySelector("[data-spotlight-copy]");
  const image = document.querySelector("[data-spotlight-image]");
  const tags = document.querySelector("[data-spotlight-tags]");
  const metrics = document.querySelector("[data-spotlight-metrics]");
  const buttons = document.querySelectorAll("[data-spotlight-button]");

  if (!title || !copy || !image || !tags || !metrics || !buttons.length) {
    return;
  }

  const renderSpotlight = (key) => {
    const item = spotlightItems[key];

    if (!item) {
      return;
    }

    title.textContent = item.title;
    copy.textContent = item.copy;
    image.src = item.image;
    image.alt = `${item.title} placeholder project image`;

    tags.innerHTML = item.tags
      .map((tag) => `<span class="chip">${tag}</span>`)
      .join("");

    metrics.innerHTML = item.metrics
      .map(
        (metric) => `
          <div class="metric-box">
            <strong>${metric.value}</strong>
            <span>${metric.label}</span>
          </div>
        `
      )
      .join("");

    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.key === key);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => renderSpotlight(button.dataset.key));
  });

  renderSpotlight("atlas");
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-project-card]");
  const emptyState = document.querySelector("[data-empty-state]");

  if (!filterButtons.length || !projectCards.length) {
    return;
  }

  const applyFilter = (filter) => {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !visible);
      if (visible) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    filterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === filter);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  applyFilter("all");
}

function initQuotes() {
  const quotes = [...document.querySelectorAll("[data-quote-card]")];
  const dots = [...document.querySelectorAll("[data-quote-dot]")];

  if (!quotes.length || quotes.length !== dots.length) {
    return;
  }

  let activeIndex = 0;

  const showQuote = (index) => {
    activeIndex = index;
    quotes.forEach((quote, quoteIndex) => {
      quote.classList.toggle("is-active", quoteIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showQuote(index));
  });

  showQuote(0);
  window.setInterval(() => {
    showQuote((activeIndex + 1) % quotes.length);
  }, 4800);
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const message = document.querySelector("[data-form-message]");

  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") || "there";
    message.textContent = `Thanks, ${name}. This demo form is front-end only, but the portfolio is ready for a real form endpoint whenever you are.`;
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initReveal();
  initCounters();
  initSpotlight();
  initProjectFilters();
  initQuotes();
  initContactForm();
});
