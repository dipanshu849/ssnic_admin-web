import getImgs from "../utils/crud-section-data.js";
import drapDrop from "../utils/drap-drop.js";
import showCalendar from "../utils/calender.js";
import crudTableData from "../utils/crud-table-data.js";
import getMetaDataGeneral from "./meta-data-general.js";
import getMetaDataHeader from "./meta-data-header.js";
import getMetaDataFooter from "./meta-data-footer.js";
import logout from "../components/logout.js";

const handleData = async () => {
  getMetaDataGeneral();
  getMetaDataHeader();
  getMetaDataFooter();

  logout();

  const typeArr = ["hero", "about", "msg"];
  const folderArr = ["hero", "about", "msg"];
  typeArr.forEach((type, index) => {
    getImgs(type, folderArr[index]);
    drapDrop(type, folderArr[index]);
  });

  // getImgs and draDrop for gallery called from
  showCalendar.showMonthCalendar();

  // getImgs and draDrop for news called from
  showCalendar.showNewsLabel();

  // // events table
  crudTableData("events-table");

  // // athletics table
  crudTableData("athletics-table");

  // // circulars table
  crudTableData("circulars-table");

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
};

export default handleData;
