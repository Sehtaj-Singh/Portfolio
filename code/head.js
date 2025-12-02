document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menuIcon = menuBtn.querySelector("i");
  const modal = document.getElementById("sideModal");
  const closeBtn = modal.querySelector(".modal-close");

  function openModal() {
    modal.classList.add("open");
    menuBtn.classList.add("open");
    document.body.classList.add("no-scroll");

    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  }

  function closeModal() {
    modal.classList.remove("open");
    menuBtn.classList.remove("open");
    document.body.classList.remove("no-scroll");

    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }

  menuBtn.addEventListener("click", () => {
    if (modal.classList.contains("open")) closeModal();
    else openModal();
  });

  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // CLOSE MAIN MODAL WHEN A LINK IS CLICKED
  const sideModalLinks = document.querySelectorAll("#sideModal a");

  sideModalLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // close the side modal
      modal.classList.remove("open");
      menuBtn.classList.remove("open");
      document.body.classList.remove("no-scroll");

      // switch icon back to bars
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    });
  });

  // ------------- ONE-LINE TYPEWRITER WITH STYLED "DEVELOPER" --------------
  const roles = ["Front-End Developer", "Back-End Developer"];
  const devWord = "Developer";

  const line = document.getElementById("type-line1");
  if (!line) return;

  let roleIndex = 0;
  let charIndex = 0;
  let phase = "typing"; // typing → hold → erasing

  const typeSpeed = 110;
  const eraseSpeed = 80;
  const holdTime = 5000;

  function renderCurrentText() {
    const full = roles[roleIndex];
    const devIndex = full.indexOf(devWord);
    const visible = full.slice(0, charIndex);

    // smaller size only for "MERN Stack Developer" (if added later)
    if (full.includes("MERN Stack")) {
      line.classList.add("is-long");
    } else {
      line.classList.remove("is-long");
    }

    if (devIndex === -1 || charIndex <= devIndex) {
      line.innerHTML = visible;
    } else {
      const beforeDev = visible.slice(0, devIndex);
      const devPart = visible.slice(devIndex);
      line.innerHTML = `${beforeDev}<span class="dev-word">${devPart}</span>`;
    }
  }

  function step() {
    const full = roles[roleIndex];

    if (phase === "typing") {
      if (charIndex < full.length) {
        charIndex++;
        renderCurrentText();
        return setTimeout(step, typeSpeed);
      } else {
        phase = "hold";
        return setTimeout(step, holdTime);
      }
    }

    if (phase === "hold") {
      phase = "erasing";
      return setTimeout(step, 200);
    }

    if (phase === "erasing") {
      if (charIndex > 0) {
        charIndex--;
        renderCurrentText();
        return setTimeout(step, eraseSpeed);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        phase = "typing";
        return setTimeout(step, 250);
      }
    }
  }

  charIndex = 0;
  renderCurrentText();
  step();

  // ------------- SKILL BAR ANIMATION ON SCROLL --------------
  const skillRows = document.querySelectorAll(".skill-row");

  if (skillRows.length) {
    const animateSkillRow = (row) => {
      const progressEl = row.querySelector(".skill-progress");
      const percentEl = row.querySelector(".skill-percent");
      const srText = row.querySelector(".sr-only");
      const target = parseInt(row.dataset.target || "0", 10);

      const duration = 1200;
      const start = performance.now();

      function frame(now) {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        const current = Math.round(target * eased);

        progressEl.style.setProperty("--val", current);
        progressEl.setAttribute("aria-valuenow", String(current));
        percentEl.textContent = current + "%";
        if (srText) srText.textContent = current + "% proficiency";

        if (t < 1) {
          requestAnimationFrame(frame);
        }
      }

      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const row = entry.target;
            if (row.dataset.animated === "true") return;

            row.dataset.animated = "true";
            animateSkillRow(row);
            obs.unobserve(row);
          }
        });
      },
      {
        threshold: 0.4, // ~40% of row visible
      }
    );

    skillRows.forEach((row) => observer.observe(row));
  }

  // ---------- PROJECT MODAL (PROJECT CARD CLICK) ----------
  const projectCard = document.getElementById("project-card");
  const projectModal = document.getElementById("projectModal");
  const projectCloseBtn = projectModal
    ? projectModal.querySelector(".modal-close")
    : null;

  function openProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  if (projectCard && projectModal) {
    projectCard.addEventListener("click", (e) => {
      e.preventDefault(); // prevent anchor default scroll
      openProjectModal();
    });
  }

  if (projectCloseBtn) {
    projectCloseBtn.addEventListener("click", closeProjectModal);
  }

  // ESC closes whichever modal is open – menu or project
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal.classList.contains("open")) {
        closeModal();
      }
      if (projectModal && projectModal.classList.contains("open")) {
        closeProjectModal();
      }
    }
  });

  // ------------------ PROJECT MODAL IMAGE SLIDER ------------------ //

  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide-img");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  let index = 0;

  // move slider correctly
  function updateSlider() {
    const slideWidth = sliderWrapper.clientWidth;
    track.style.transform = `translateX(${-index * slideWidth}px)`;
  }

  // Buttons
  document.querySelector(".left-btn").addEventListener("click", () => {
    index = index <= 0 ? slides.length - 1 : index - 1;
    updateSlider();
  });

  document.querySelector(".right-btn").addEventListener("click", () => {
    index = index >= slides.length - 1 ? 0 : index + 1;
    updateSlider();
  });

  // Touch swipe
  let startX = 0;
  let moveX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX - startX;
  });

  track.addEventListener("touchend", () => {
    if (Math.abs(moveX) > 50) {
      if (moveX < 0) index = index >= slides.length - 1 ? 0 : index + 1;
      else index = index <= 0 ? slides.length - 1 : index - 1;
    }
    updateSlider();
    moveX = 0;
  });

  // Recalculate on window resize
  window.addEventListener("resize", updateSlider);

  // Initial call
  updateSlider();
});
