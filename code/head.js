document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menuIcon = menuBtn.querySelector("i");
  const modal = document.getElementById("sideModal");
  const closeBtn = modal.querySelector(".modal-close");

  function openModal() {
    modal.classList.add("open");
    menuBtn.classList.add("open");
    document.body.classList.add("no-scroll");

    // swap icon to X
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-xmark");
  }

  function closeModal() {
    modal.classList.remove("open");
    menuBtn.classList.remove("open");
    document.body.classList.remove("no-scroll");

    // swap back to bars
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
  }

  menuBtn.addEventListener("click", () => {
    if (modal.classList.contains("open")) closeModal();
    else openModal();
  });

  closeBtn.addEventListener("click", closeModal);

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
  
});
