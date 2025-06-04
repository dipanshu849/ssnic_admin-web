import { Calendar } from "vanilla-calendar-pro";
import "vanilla-calendar-pro/styles/index.css";
import drapDrop from "./drap-drop";
import getImgs from "./get-data";

const showMonthCalendar = () => {
  const calendarContainer = document.querySelector(
    ".editor__montly-calender-container"
  );

  const openBtn = document.querySelector(".editor__calendar-open-btn.gallery");

  const uploadOpenBtn = document.querySelector(".editor__btn-add.gallery");
  uploadOpenBtn.style.opacity = "0.5";

  let month = null;
  let year = null;
  let subfolder = [year, month];

  const note = document.querySelector(".editor__note.gallery");

  openBtn.addEventListener("click", () => {
    calendarContainer.style.display = "flex";
    document.body.style.overflowY = "hidden";
  });

  const calendar = new Calendar("#calendar__monthly", {
    type: "month",
    selectedTheme: "light",

    onClickMonth(self, e, selectedMonth = null, selectedYear = null) {
      month = selectedMonth ? selectedMonth : self.context.selectedMonth + 1;
      year = selectedYear ? selectedYear : self.context.selectedYear;
      note.textContent = `Selected Month: ${month}, Year: ${year}`;
      localStorage.setItem("selectedMonth", month);
      localStorage.setItem("selectedYear", year);

      calendarContainer.style.display = "none";
      document.body.style.overflowY = "auto";

      subfolder = [year, month];
      drapDrop("gallery", "gallery", subfolder, "sub-home");
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

export default showMonthCalendar;
