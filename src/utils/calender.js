import { Calendar } from "vanilla-calendar-pro";
import "vanilla-calendar-pro/styles/index.css";
import drapDrop from "./drap-drop";
import getImgs from "./get-data";

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
  console.log("Calendar: ", calendar);
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

const showDailyCalendar = () => {
  const calendarContainer = document.querySelector(
    ".editor__calender-container.daily"
  );
  const openBtn = document.querySelector(".editor__calendar-open-btn.news");
  const uploadOpenBtn = document.querySelector(".editor__btn-add.news");
  uploadOpenBtn.style.opacity = "0.5";
  const note = document.querySelector(".editor__note.news");

  const abortListener = new AbortController();

  let selectedLabel = null;
  let selectedDate = null;
  let subfolder = [];
  let controllerArr = [];

  openBtn.addEventListener("click", () => {
    calendarContainer.style.display = "flex";
    document.body.style.overflowY = "hidden";
  });

  const calendar = new Calendar("#calendar.daily", {
    type: "default",
    selectedTheme: "light",
    layouts: {
      default: `
        <div class="vc-label">
          <a href="#label">Labels</a>
          <ul class="vc-menu hidden">
            <li class="vc-menu-item"> <a href="#0"> Achievements </a> </li> 
            <li class="vc-menu-item"> <a href="#0"> Upcoming Events </a> </li> 
            <li class="vc-menu-item"> <a href="#0"> Competitions </a> </li> 
            <li class="vc-menu-item"> <a href="#0"> Special Visit </a> </li> 
            <li class="vc-menu-item"> <a href="#0"> Outdoor Activities </a> </li> 
            <li class="vc-menu-item"> <a href="#0"> Vacancies </a> </li> 
          </ul>
        </div>
        <div class="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
          <#ArrowPrev [month] />
          <div class="vc-header__content" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
          <#ArrowNext [month] />
        </div>
        <div class="vc-wrapper" data-vc="wrapper">
          <#WeekNumbers />
          <div class="vc-content" data-vc="content">
            <#Week />
            <#Dates />
            <#DateRangeTooltip />
          </div>
        </div>
        <#ControlTime />
      `,
    },

    onClickDate(self, loc) {
      console.log(self);
      const controller = new AbortController();
      controllerArr.push(controller);
      if (controllerArr.length - 2 >= 0) {
        controllerArr[controllerArr.length - 2].abort();
      }

      if (loc == "inside") {
      } else {
        selectedDate = self.context.selectedDates[0];
        localStorage.setItem("selectedDate", selectedDate);
        if (!selectedLabel) {
          selectedLabel = "Achievements";
          localStorage.setItem("selectedLabel", selectedLabel);
        }
      }

      note.textContent = `Selected Label: ${selectedLabel}, Date: ${selectedDate}`;

      calendarContainer.style.display = "none";
      document.body.style.overflowY = "auto";

      subfolder = [selectedLabel];
      drapDrop("news", "news", subfolder, "sub-home", controller);
      getImgs("news", "news", subfolder, "sub-home");
      uploadOpenBtn.style.opacity = "1";
    },
  });
  calendar.init();
  if (
    localStorage.getItem("selectedLabel") &&
    localStorage.getItem("selectedDate") &&
    localStorage.getItem("selectedDate") != "undefined"
  ) {
    selectedLabel = localStorage.getItem("selectedLabel");
    selectedDate = localStorage.getItem("selectedDate");
    calendar.onClickDate(calendar, "inside");
    note.textContent = `Selected label: ${selectedLabel}, date: ${selectedDate}`;
  }
  const labelBtn = document.querySelector(".vc-label > a");
  const labelMenu = document.querySelector(".vc-menu");
  const labelMenuItems = document.querySelectorAll(".vc-menu-item");

  labelBtn.addEventListener("click", () => {
    labelMenu.classList.toggle("hidden");
  });

  labelMenuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      labelMenuItems.forEach((item, index) => {
        item.classList.remove("selected");
      });
      selectedLabel = item.textContent.replaceAll(" ", "");
      localStorage.setItem("selectedLabel", selectedLabel);
      item.classList.add("selected");
    });
  });
};

export default { showMonthCalendar, showDailyCalendar };
