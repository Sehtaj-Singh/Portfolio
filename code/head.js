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

    // ------------- ONE-LINE TYPEWRITER WITH STYLED "DEVELOPER" --------------
  const roles = [
    "Front-End Developer",
    "Back-End Developer",
  ];
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

    // 👇 smaller size only for "MERN Stack Developer"
    if (full.includes("MERN Stack")) {
      line.classList.add("is-long");
    } else {
      line.classList.remove("is-long");
    }

    if (devIndex === -1 || charIndex <= devIndex) {
      // we haven't reached "Developer" yet
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
        renderCurrentText(); // 👈 erase letter-by-letter, including Developer
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

});
