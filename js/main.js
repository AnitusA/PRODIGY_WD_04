document.addEventListener("DOMContentLoaded", function () {
  var navButton = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  var yearNode = document.getElementById("year");
  var revealNodes = document.querySelectorAll(".reveal");
  var mobileWidth = 720;

  function closeNav() {
    if (!nav || !navButton) return;
    nav.classList.remove("is-open");
    navButton.setAttribute("aria-expanded", "false");
  }

  if (navButton && nav) {
    navButton.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navButton.contains(event.target)) return;
      closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > mobileWidth) {
        closeNav();
      }
    });
  }

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      var target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({ top: top, behavior: "smooth" });
      closeNav();
    });
  });

  if ("IntersectionObserver" in window && revealNodes.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealNodes.forEach(function (node, index) {
      node.style.transitionDelay = String(index * 70) + "ms";
      revealObserver.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  }
});
