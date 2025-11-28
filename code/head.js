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

  // ------------------- Type writer (ONE LINE, NO CURSOR) ------------
  const roles = [
    "Front End Developer",
    "Backend Developer",
    "MERN Stack Developer",
  ];

  const line = document.getElementById("type-line1"); // use top-line only

  if (!line) return;

  let roleIndex = 0;
  let charIndex = 0;
  let phase = "typing"; // typing → holding → erasing

  const typeSpeed = 120;
  const eraseSpeed = 70;
  const holdTime = 5000;

  line.textContent = "";

  function step() {
    const currentRole = roles[roleIndex];

    if (phase === "typing") {
      if (charIndex < currentRole.length) {
        line.textContent += currentRole.charAt(charIndex);
        charIndex++;
        return setTimeout(step, typeSpeed);
      } else {
        phase = "holding";
        return setTimeout(step, holdTime);
      }
    }

    if (phase === "holding") {
      phase = "erasing";
      return setTimeout(step, 300);
    }

    if (phase === "erasing") {
      if (charIndex > 0) {
        line.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        return setTimeout(step, eraseSpeed);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        phase = "typing";
        return setTimeout(step, 300);
      }
    }
  }

  step();
});
