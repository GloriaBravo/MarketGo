const ThemeToggle = () => {
  const handleThemeChange = () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);  // Guarda el tema en localStorage
  };

  return (
    <button onClick={handleThemeChange}>
      Cambiar a modo {document.documentElement.getAttribute("data-theme") === "dark" ? "claro" : "oscuro"}
    </button>
  );
};
export default ThemeToggle;