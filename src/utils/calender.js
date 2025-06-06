import { Calendar } from "vanilla-calendar-pro";
import "vanilla-calendar-pro/styles/index.css";
import drapDrop from "./drap-drop";
import getImgs from "./crud-data";

const showMonthCalendar = () => {
  const calendarContainer = document.querySelector(
    ".editor__calender-container.monthly"
  );

  const openBtn = document.querySelector(".editor__calendar-open-btn.gallery");
  const uploadOpenBtn = document.querySelector(".editor__btn-add.gallery");
  uploadOpenBtn.style.opacity = "0.5";

  let month = null;
  let year = null;
  let subfolder = [year, month];
  let controllerArr = [];

  const note = document.querySelector(".editor__note.gallery");

  openBtn.addEventListener("click", () => {
    calendarContainer.style.display = "flex";
    document.body.style.overflowY = "hidden";
  });

  const calendar = new Calendar("#calendar.monthly", {
    type: "month",
    selectedTheme: "light",

    onClickMonth(self, e, selectedMonth = null, selectedYear = null) {
      const controller = new AbortController();
      controllerArr.push(controller);
      if (controllerArr.length - 2 >= 0) {
        controllerArr[controllerArr.length - 2].abort();
      }
      month = selectedMonth ? selectedMonth : self.context.selectedMonth + 1;
      year = selectedYear ? selectedYear : self.context.selectedYear;
      note.textContent = `Selected Month: ${month}, Year: ${year}`;
      localStorage.setItem("selectedMonth", month);
      localStorage.setItem("selectedYear", year);

      calendarContainer.style.display = "none";
      document.body.style.overflowY = "auto";

      subfolder = [year, month];
      drapDrop("gallery", "gallery", subfolder, "sub-home", controller);
      getImgs("gallery", "gallery", subfolder, "sub-home");
      uploadOpenBtn.style.opacity = "1";
    },
  });
  calendar.init();
  if (
    localStorage.getItem("selectedMonth") &&
    localStorage.getItem("selectedYear")
  ) {
    month = parseInt(localStorage.getItem("selectedMonth"));
    year = parseInt(localStorage.getItem("selectedYear"));
    calendar.onClickMonth(calendar, MouseEvent, month, year);
    note.textContent = `Selected Month: ${month}, Year: ${year}`;
  }
};

// ----------------------------------------------------------------------- NEWS

const showNewsLabel = () => {
  const uploadOpenBtn = document.querySelector(".editor__btn-add.news");
  uploadOpenBtn.style.opacity = "0.5";
  const labelBtn = document.querySelector(".vc-label > a");
  const labelMenu = document.querySelector(".vc-menu");
  const labelMenuItems = document.querySelectorAll(".vc-menu-item");

  let selectedLabel = "Achievements";
  let subfolder = [];
  let controllerArr = [];

  if (
    localStorage.getItem("selectedLabel") &&
    localStorage.getItem("selectedLabel") != "undefined"
  ) {
    selectedLabel = localStorage.getItem("selectedLabel");
  }

  // ------------------------------------------------------------------- FUNCTIONS

  function handleClickOnLabelItem(e) {
    labelMenuItems.forEach((item, index) => {
      item.classList.remove("selected");
    });
    let selectedItem = e.target;
    selectedLabel = selectedItem.textContent.replaceAll(" ", "");
    localStorage.setItem("selectedLabel", selectedLabel);
    selectedItem.classList.add("selected");

    const controller = new AbortController();
    controllerArr.push(controller);
    if (controllerArr.length - 2 >= 0) {
      controllerArr[controllerArr.length - 2].abort();
    }

    subfolder = [selectedLabel];
    drapDrop("news", "news", subfolder, "sub-home", controller);
    getImgs("news", "news", subfolder, "sub-home");
    labelBtn.click();
    uploadOpenBtn.style.opacity = "1";
  }

  // ------------------------------------------------------------------- EVENTS

  labelBtn.addEventListener("click", () => {
    labelMenu.classList.toggle("hidden");
  });

  labelMenuItems.forEach((item, index) => {
    item.addEventListener("click", handleClickOnLabelItem);
  });

  labelMenuItems.forEach((item, index) => {
    if (item.textContent.replaceAll(" ", "") == selectedLabel) {
      item.click();
    }
  });
};

export default { showMonthCalendar, showNewsLabel };
