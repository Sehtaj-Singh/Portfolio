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

  // ------------------- Type writer ------------
   const roles = ["Front End", "Backend", "MERN Stack"];
  const roleColors = ["#3d7cff"]; 
  const devText = "Developer";

  const line1 = document.getElementById("type-line1");
  const line2 = document.getElementById("type-line2");
  const cursor1 = document.getElementById("cursor1");
  const cursor2 = document.getElementById("cursor2");

  if (!line1 || !line2 || !cursor1 || !cursor2) return;

  let roleIndex = 0;
  let charIndex = 0;
  let phase = "typingRole"; // typingRole → typingDev → erasingDev → erasingRole

  const typeSpeed = 130;
  const eraseSpeed = 90;
  const holdTime = 5000;

  line1.textContent = "";
  line2.textContent = "";
  cursor1.style.visibility = "visible";
  cursor2.style.visibility = "hidden";

  function step() {
    const currentRole = roles[roleIndex];
    line1.style.color = roleColors[roleIndex] || "#000";

    if (phase === "typingRole") {
      cursor1.style.visibility = "visible";
      cursor2.style.visibility = "hidden";

      if (charIndex < currentRole.length) {
        line1.textContent += currentRole.charAt(charIndex);
        charIndex++;
        return setTimeout(step, typeSpeed);
      } else {
        charIndex = 0;
        phase = "typingDev";
        return setTimeout(step, 400);
      }
    }

    if (phase === "typingDev") {
      cursor1.style.visibility = "hidden";
      cursor2.style.visibility = "visible";

      if (charIndex < devText.length) {
        line2.textContent += devText.charAt(charIndex);
        charIndex++;
        return setTimeout(step, typeSpeed);
      } else {
        charIndex = devText.length;
        phase = "erasingDev";
        return setTimeout(step, holdTime);
      }
    }

    if (phase === "erasingDev") {
      cursor1.style.visibility = "hidden";
      cursor2.style.visibility = "visible";

      if (charIndex > 0) {
        line2.textContent = devText.substring(0, charIndex - 1);
        charIndex--;
        return setTimeout(step, eraseSpeed);
      } else {
        phase = "erasingRole";
        charIndex = currentRole.length;
        cursor1.style.visibility = "visible";
        cursor2.style.visibility = "hidden";
        return setTimeout(step, 200);
      }
    }

    if (phase === "erasingRole") {
      if (charIndex > 0) {
        line1.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        return setTimeout(step, eraseSpeed);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        phase = "typingRole";
        return setTimeout(step, 400);
      }
    }
  }

  step();
});
