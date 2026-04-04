// event page js
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const btnClose = document.getElementById("lb-close");
  const btnPrev = document.getElementById("lb-prev");
  const btnNext = document.getElementById("lb-next");
  const lbContent = document.getElementById("lb-content");

  let currentIndex = 0;

  if (galleryItems.length === 0) return; // Failsafe

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      updateLightboxContent();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  btnClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lbContent) closeLightbox();
  });

  const updateLightboxContent = () => {
    const imgElement = galleryItems[currentIndex].querySelector("img");
    lbImg.src = imgElement.src;
  };

  btnNext.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex =
      currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    updateLightboxContent();
  });

  btnPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex =
      currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    updateLightboxContent();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") btnNext.click();
    if (e.key === "ArrowLeft") btnPrev.click();
  });
});
