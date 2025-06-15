const logout = () => {
  const logoutBtn = document.querySelector(".hero__logout-btn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authenticated");
    location.reload();
  });
};

export default logout;
