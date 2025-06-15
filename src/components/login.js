import handleData from "../backend/handleData";

const handleLogin = () => {
  const loginPage = document.querySelector(".login");
  const loginForm = document.querySelector(".login__form");
  const loginButton = document.querySelector(".login__btn");
  const dashboard = document.querySelector(".dashboard");

  const clonedDashBoard = dashboard.cloneNode(true);
  dashboard.remove();

  // decode
  let requiredVal = "false";

  if (localStorage.getItem("authenticated")) {
    let dec = new TextDecoder();
    let unitArrConversion = Uint8Array.from(
      atob(localStorage.getItem("authenticated"))
        .split(",")
        .map((letter) => letter)
    );
    let decoded = dec.decode(unitArrConversion);
    requiredVal = decoded.slice(0, 12);
  }
  // decode END

  if (requiredVal == "dipanshu849d") {
    document.body.appendChild(clonedDashBoard);
    handleData();
    loginPage.style.display = "none";
  } else {
    loginForm.username.value = "";
    loginForm.password.value = "";

    loginForm.username.focus();
    loginButton.addEventListener("click", async (event) => {
      event.preventDefault();
      if (loginForm.username.value === "" || loginForm.password.value === "") {
        alert("Please enter both username and password.");
        location.reload();
        return;
      } else {
        if (
          loginForm.username.value === "admin" &&
          loginForm.password.value === "admin@859#sdf@e4dfsap"
        ) {
          alert("SUCCESS! You are now logged in.");
          document.body.appendChild(clonedDashBoard);
          handleData();
          loginPage.style.display = "none";
          // encode
          let date = new Date();
          let textToEncode = "dipanshu849d" + date.getTime();
          let enc = new TextEncoder();
          let encoded = enc.encode(textToEncode);
          localStorage.setItem("authenticated", btoa(encoded));
        } else {
          alert("Invalid username or password. Please try again.");
          location.reload();
        }
      }
    });
  }
};

export default handleLogin;
