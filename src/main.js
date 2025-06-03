import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/login.css";
import "../styles/components/hero.css";
import "../styles/components/editor-hero.css";
import "../styles/utils.css";

import handleLogin from "./components/login.js";
import drapDrop from "./components/drap-drop.js";
handleLogin();
drapDrop();

// supabase
import handleData from "./backend/handleData.js";
handleData();
