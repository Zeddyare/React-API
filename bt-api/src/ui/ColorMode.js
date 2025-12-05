(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("themeToggle");
    const logo = document.getElementById("logoImage");
    const htmlElement = document.documentElement;

    if (!toggleButton || !htmlElement) return;

    toggleButton.addEventListener("click", () => {
      const theme = htmlElement.getAttribute("data-bs-theme");
      htmlElement.setAttribute("data-bs-theme", theme === "dark" ? "light" : "dark");
      
      const source = logo.getAttribute("src");
      logo.setAttribute("src", source == "./src/ui/Logo.png" ? "./src/ui/LogoDark.png" : "./src/ui/Logo.png");
    });
  })();
})();