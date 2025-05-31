const handleLogin = () => {
  let authenticated = true;
  const loginPage = document.querySelector(".login");
  const loginForm = document.querySelector(".login__form");
  const loginButton = document.querySelector(".login__btn");

  document.body.style.overflow = "hidden";

  if (!authenticated) {
    loginButton.addEventListener("click", async (event) => {
      event.preventDefault();
      if (loginForm.username.value === "" || loginForm.password.value === "") {
        alert("Please enter both username and password.");
        return;
      } else {
        alert("SUCCESS! You are now logged in.");
        authenticated = true;
      }
    });
  } else {
    console.log("Already authenticated, redirecting to dashboard...");
    loginPage.style.display = "none";
    document.body.style.overflow = "auto";
    document.querySelector(".dashboard").style.display = "block";
  }
};

export default handleLogin;
