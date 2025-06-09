import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/login.css";
import "../styles/components/hero.css";
import "../styles/components/editor-section.css";
import "../styles/components/editor-table.css";
import "../styles/components/editor-general-info.css";
import "../styles/components/editor-header-links.css";
import "../styles/components/editor-footer-links.css";
import "../styles/utils.css";
import "../styles/calendar.css";

import handleLogin from "./components/login.js";
handleLogin();

// supabase
import handleData from "./backend/handleData.js";
handleData();

// handling a styling bug START
const mediaQuery = window.matchMedia("(min-width: 1024px)");
const editorContainer = document.querySelector(".editor__container");
const aboutEditor = document.querySelector(".editor__about");
const msgEditor = document.querySelector(".editor__msg");

const classListArr = ["container", "section"];

if (mediaQuery.matches) {
  editorContainer.classList.add(...classListArr);
  aboutEditor.classList.remove(...classListArr);
  msgEditor.classList.remove(...classListArr);
}

mediaQuery.addEventListener("change", (event) => {
  if (event.matches) {
    editorContainer.classList.add(...classListArr);
    aboutEditor.classList.remove(...classListArr);
    msgEditor.classList.remove(...classListArr);
  } else {
    editorContainer.classList.remove(...classListArr);
    aboutEditor.classList.add(...classListArr);
    msgEditor.classList.add(...classListArr);
  }
});
// handling a styling bug END
