/**
 * BLOGIFY — Client-side Interactive Utilities
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar scroll elevation effect
  const navbar = document.querySelector(".editorial-navbar");
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Password visibility toggle
  const togglePasswordBtns = document.querySelectorAll(".btn-toggle-password");
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      const icon = btn.querySelector("i");
      if (input) {
        if (input.type === "password") {
          input.type = "text";
          if (icon) {
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");
          }
        } else {
          input.type = "password";
          if (icon) {
            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");
          }
        }
      }
    });
  });

  // 3. Dropzone & File Preview for Cover Image in Add Blog
  const dropzone = document.getElementById("coverImageDropzone");
  const fileInput = document.getElementById("coverImage");
  const previewContainer = document.getElementById("coverImagePreviewContainer");
  const previewImg = document.getElementById("coverImagePreview");
  const dropzonePrompt = document.getElementById("dropzonePrompt");
  const removeBtn = document.getElementById("removeCoverImage");

  if (dropzone && fileInput) {
    const showPreview = (file) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (previewImg && previewContainer && dropzonePrompt) {
            previewImg.src = e.target.result;
            previewContainer.style.display = "block";
            dropzonePrompt.style.display = "none";
          }
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        showPreview(e.target.files[0]);
      }
    });

    // Drag and drop events
    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("drag-over");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("drag-over");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0];
        fileInput.files = e.dataTransfer.files;
        showPreview(droppedFile);
      }
    });

    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = "";
        if (previewImg && previewContainer && dropzonePrompt) {
          previewImg.src = "";
          previewContainer.style.display = "none";
          dropzonePrompt.style.display = "block";
        }
      });
    }
  }

  // 4. Auto-growing textareas for comment and writing studio
  const textareas = document.querySelectorAll(".auto-resize-textarea");
  textareas.forEach((textarea) => {
    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.max(textarea.scrollHeight, 100) + "px";
    };
    textarea.addEventListener("input", adjustHeight);
  });

  // 5. Reading time estimator for article page and blog cards
  const articleBody = document.querySelector(".article-body");
  const readingTimeEl = document.getElementById("articleReadingTime");
  if (articleBody && readingTimeEl) {
    const text = articleBody.innerText || "";
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    readingTimeEl.innerText = `${minutes} min read`;
  }

  // Word & character counter for studio
  const studioBody = document.getElementById("studioBody");
  const wordCountDisplay = document.getElementById("studioWordCount");
  if (studioBody && wordCountDisplay) {
    studioBody.addEventListener("input", () => {
      const text = studioBody.value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      wordCountDisplay.innerText = `${words} words`;
    });
  }
});
