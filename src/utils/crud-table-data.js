import { supabase } from "../supabaseClient";

// ##################################
const createNupdateData = (type) => {
  const closeTableDetailFormBtn = document.querySelector(
    ".editor__table-detail-form-close-btn"
  );
  const updateTableDetailFormBtn = document.querySelector(
    ".editor__table-detail-update-btn"
  );
  const tableDetailFormContainer = document.querySelector(
    ".editor__table-detail-form-container"
  );

  const dateOfEventInputElementLabel = document.querySelector(
    "label:has(+ #editor__table-detail-date)"
  );
  const dateOfEventInputElement = document.querySelector(
    "#editor__table-detail-date"
  );
  const startTimeInputElementParent = document.querySelector(
    "form:has(#editor__table-detail-start-time)"
  );
  const startTimeInputElement = document.querySelector(
    "#editor__table-detail-start-time"
  );
  const endTimeInputElementParent = document.querySelector(
    "form:has(#editor__table-detail-end-time)"
  );
  const endTimeInputElement = document.querySelector(
    "#editor__table-detail-end-time"
  );
  const venueTimeInputElementLabel = document.querySelector(
    "label:has(+ #editor__table-detail-form-venue)"
  );
  const venueInputElement = document.querySelector(
    "#editor__table-detail-form-venue"
  );
  const eventTimeInputElementLabel = document.querySelector(
    "label:has(+ #editor__table-detail-form-event)"
  );
  const eventInputElement = document.querySelector(
    "#editor__table-detail-form-event"
  );
  const resultInputElementParent = document.querySelector(
    "form:has(#editor__table-detail-form-result)"
  );
  const resultInputElement = document.querySelector(
    "#editor__table-detail-form-result"
  );
  const loader = document.querySelector(".loader");

  dateOfEventInputElement.value = "";
  startTimeInputElement.value = "";
  endTimeInputElement.value = "";
  venueInputElement.value = "";
  eventInputElement.value = "";
  resultInputElement.value = "";

  let dateOfEventInput;
  let startTimeInput = null;
  let endTimeInput = null;
  let venueInput = null;
  let eventInput = null;
  let resultInput = null;

  if (type == "circulars-table") {
    dateOfEventInputElementLabel.textContent = "Date of submission";
    venueTimeInputElementLabel.textContent = "Title";
    eventTimeInputElementLabel.textContent = "Link";
    venueInputElement.placeholder = "Eg. Fee structure 2025-26";
    eventInputElement.placeholder = "link to document...";
    startTimeInputElementParent.style.display = "none";
    endTimeInputElementParent.style.display = "none";
    resultInputElementParent.style.display = "none";
  } else {
    dateOfEventInputElementLabel.textContent = "Date of event";
    venueTimeInputElementLabel.textContent = "Venue";
    eventTimeInputElementLabel.textContent = "Event";
    venueInputElement.placeholder = "Eg. Staff office";
    eventInputElement.placeholder = "Eg. Staff meeting";
    startTimeInputElementParent.style.display = "flex";
    endTimeInputElementParent.style.display = "flex";
    resultInputElementParent.style.display = "flex";
  }

  // ------------------------------------------------------------------------------- FUNCTIONS
  function handleClickOnAddEventBtn() {
    tableDetailFormContainer.style.display = "flex";
    document.body.style.overflow = "hidden";

    closeTableDetailFormBtn.addEventListener(
      "click",
      handleClickOnCloseTableDetailFormBtn
    );
    dateOfEventInputElement.addEventListener(
      "input",
      handleInputOnDateOfEventElement
    );
    startTimeInputElement.addEventListener(
      "input",
      handleInputOnStartTimeElement
    );
    endTimeInputElement.addEventListener("input", handleInputOnEndTimeElement);
    venueInputElement.addEventListener("input", handleInputOnVenueElement);
    eventInputElement.addEventListener("input", handleInputOnEventElement);
    resultInputElement.addEventListener("input", handleInputOnResultElement);
    updateTableDetailFormBtn.addEventListener("click", handleClickOnUpdateBtn);
  }

  function handleClickOnCloseTableDetailFormBtn() {
    tableDetailFormContainer.style.display = "none";
    document.body.style.overflow = "auto";

    startTimeInputElement.value = "";
    endTimeInputElement.value = "";
    venueInputElement.value = "";
    eventInputElement.value = "";
    resultInputElement.value = "";

    dateOfEventInputElement.removeEventListener(
      "input",
      handleInputOnDateOfEventElement
    );
    startTimeInputElement.removeEventListener(
      "input",
      handleInputOnStartTimeElement
    );
    closeTableDetailFormBtn.removeEventListener(
      "click",
      handleClickOnCloseTableDetailFormBtn
    );
    endTimeInputElement.removeEventListener(
      "input",
      handleInputOnEndTimeElement
    );
    venueInputElement.removeEventListener("input", handleInputOnVenueElement);
    eventInputElement.removeEventListener("input", handleInputOnEventElement);
    resultInputElement.removeEventListener("input", handleInputOnResultElement);
    updateTableDetailFormBtn.removeEventListener(
      "click",
      handleClickOnUpdateBtn
    );
  }

  function handleInputOnDateOfEventElement(e) {
    dateOfEventInput = e.target.value;
    validateInputsNUnlockUpdateBtn();
  }

  function handleInputOnStartTimeElement(e) {
    startTimeInput = e.target.value;
    validateInputsNUnlockUpdateBtn();
  }

  function handleInputOnEndTimeElement(e) {
    endTimeInput = e.target.value;
    validateInputsNUnlockUpdateBtn();
  }

  function handleInputOnVenueElement(e) {
    venueInput = e.target.value;
    validateInputsNUnlockUpdateBtn();
  }

  function handleInputOnEventElement(e) {
    eventInput = e.target.value;
    validateInputsNUnlockUpdateBtn();
  }

  function handleInputOnResultElement(e) {
    resultInput = e.target.value;
    validateInputsNUnlockUpdateBtn();
  }

  function validateInputsNUnlockUpdateBtn() {
    if (type == "circulars-table") {
      if (dateOfEventInput && venueInput && eventInput) {
        updateTableDetailFormBtn.style.opacity = "1";
        updateTableDetailFormBtn.style.pointerEvents = "auto";
      } else {
        updateTableDetailFormBtn.style.opacity = "0.5";
        updateTableDetailFormBtn.style.pointerEvents = "none";
      }
    } else {
      if (
        dateOfEventInput &&
        startTimeInput &&
        endTimeInput &&
        venueInput &&
        eventInput
      ) {
        updateTableDetailFormBtn.style.opacity = "1";
        updateTableDetailFormBtn.style.pointerEvents = "auto";
      } else {
        updateTableDetailFormBtn.style.opacity = "0.5";
        updateTableDetailFormBtn.style.pointerEvents = "none";
      }
    }
  }

  async function insertDataInEventsTable(type) {
    return new Promise(async (resolve, reject) => {
      let err;
      if (type == "circulars-table") {
        err = await supabase.from(`${type}`).insert({
          date: `${dateOfEventInput}`,
          place: `${venueInput}`,
          event: `${eventInput}`,
        });
      } else {
        err = await supabase.from(`${type}`).insert({
          date: `${dateOfEventInput}`,
          start__time: `${startTimeInput}`,
          end__time: `${endTimeInput}`,
          place: `${venueInput}`,
          event: `${eventInput}`,
          result__of__event: `${resultInput}`,
        });
      }

      if (err) {
        console.log("ERR: ", err);
        reject;
      }
      resolve(err);
    });
  }

  function handleClickOnUpdateBtn() {
    loader.style.display = "block";
    document.body.overflow = "hidden";
    console.log("CLICKED");
    insertDataInEventsTable(type).then((err) => {
      closeTableDetailFormBtn.click();
      readNremoveData(type);
      loader.style.display = "none";
      document.body.overflow = "auto";
    });
  }

  handleClickOnAddEventBtn();
};

// ################################################

const readNremoveData = (type, e = null) => {
  const selectedDateInputElement = document.querySelector(
    `.${type}.editor__table-date`
  );
  const tableBodyElement = document.querySelector(
    `.${type}.editor__table-body`
  );
  const currentDate = new Date();
  const loader = document.querySelector(".loader");
  const tableDataCounter = document.querySelector(
    `.editor__table-event-counter.${type}`
  );
  let removeTableBodyItemBtn;
  let rowId;
  let selectedDateInput;
  if (!e) {
    selectedDateInputElement.value =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() > 8
        ? currentDate.getMonth() + 1
        : "0" + (currentDate.getMonth() + 1)) +
      "-" +
      (currentDate.getDate() > 9
        ? currentDate.getDate()
        : "0" + currentDate.getDate());

    selectedDateInput =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() > 8
        ? currentDate.getMonth() + 1
        : "0" + (currentDate.getMonth() + 1)) +
      "-" +
      (currentDate.getDate() > 9
        ? currentDate.getDate()
        : "0" + currentDate.getDate());
  }

  // -------------------------------------------------------------------------- functions
  async function removeTableData(rowId) {
    return new Promise(async (resolve, reject) => {
      const response = await supabase.from(`${type}`).delete().eq("id", rowId);

      resolve(response);
    });
  }

  function handleClickOnDeleteBtn(e) {
    rowId = e.target.dataset.id;
    loader.style.display = "block";
    document.body.overflow = "hidden";
    removeTableData(rowId).then(() => {
      readNremoveData(type);
      loader.style.display = "none";
      document.body.overflow = "auto";
    });
  }

  async function fetchTableData(type) {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase
        .from(`${type}`)
        .select("*")
        .eq("date", `${selectedDateInput}`);

      if (error) {
        console.log("Error in fetching table data: ", error);
        reject;
      }
      resolve(data);
    });
  }

  function displayTableRows() {
    fetchTableData(type).then((data) => {
      if (type == "circulars-table") {
        tableBodyElement.replaceChildren();
        const tableHeaderItem = document.createElement("div");
        tableHeaderItem.classList.add(
          "editor__table-body-item",
          "editor__table-body-item-header",
          `${type}`
        );
        tableHeaderItem.innerHTML = `
        <div
          class="editor__table-body-item-time delete-event-btn ${type}"
        ></div>
        <div class="editor__table-body-item-place ${type} ">Title</div>
        <div class="editor__table-body-item-event ${type} ">Link</div>
      `;
        tableBodyElement.appendChild(tableHeaderItem);
        data.forEach((row, index) => {
          const tableBodyItem = document.createElement("div");
          tableBodyItem.classList.add("editor__table-body-item", `${type}`);
          tableBodyItem.innerHTML = `
        <div class="editor__table-body-item-time delete-event-btn ${type}" >
          <button class="editor__table-body-item-remove-btn btn ${type}" data-id=${row.id}  >
            Delete
          </button>
        </div>
        <div class="editor__table-body-item-place ${type}">
          ${row.place}
        </div>
        <div class="editor__table-body-item-event ${type}">${row.event}</div>`;
          tableBodyElement.appendChild(tableBodyItem);
          tableDataCounter.textContent = index + 1;
        });
        removeTableBodyItemBtn = document.querySelectorAll(
          `.editor__table-body-item-time.${type}.delete-event-btn`
        );
        removeTableBodyItemBtn.forEach((div) => {
          div.addEventListener("click", (event) => {
            handleClickOnDeleteBtn(event);
          });
        });
      } else {
        tableBodyElement.replaceChildren();
        const tableHeaderItem = document.createElement("div");
        tableHeaderItem.classList.add(
          "editor__table-body-item",
          "editor__table-body-item-header",
          `${type}`
        );
        tableHeaderItem.innerHTML = `
        <div
          class="editor__table-body-item-time delete-event-btn ${type}"
        ></div>
        <div class="editor__table-body-item-time start-time ${type} ">
          Start Time
        </div>
        <div class="editor__table-body-item-time end-time ${type} ">
          End Time
        </div>
        <div class="editor__table-body-item-place ${type} ">Venue</div>
        <div class="editor__table-body-item-event ${type} ">Event</div>
        <div class="editor__table-body-item-result ${type} ">Result</div>
      `;
        tableBodyElement.appendChild(tableHeaderItem);
        data.forEach((row, index) => {
          const tableBodyItem = document.createElement("div");
          tableBodyItem.classList.add("editor__table-body-item", `${type}`);
          tableBodyItem.innerHTML = `
        <div class="editor__table-body-item-time delete-event-btn ${type}" >
          <button class="editor__table-body-item-remove-btn btn ${type}" data-id=${
            row.id
          }  >
            Delete
          </button>
        </div>
        <div class="editor__table-body-item-time start-time ${type}">
          ${row.start__time}
        </div>
        <div class="editor__table-body-item-time end-time ${type}">
          ${row.end__time}
        </div>
        <div class="editor__table-body-item-place ${type}">
          ${row.place}
        </div>
        <div class="editor__table-body-item-event ${type}">${row.event}</div>
        <div class="editor__table-body-item-result ${type}">
          ${
            row.result__of__event != "null"
              ? row.result__of__event
              : "No Result Given..."
          }
        </div>`;
          tableBodyElement.appendChild(tableBodyItem);
          tableDataCounter.textContent = index + 1;
        });
        removeTableBodyItemBtn = document.querySelectorAll(
          `.editor__table-body-item-time.${type}.delete-event-btn`
        );
        removeTableBodyItemBtn.forEach((div) => {
          div.addEventListener("click", (event) => {
            handleClickOnDeleteBtn(event);
          });
        });
      }
    });
  }

  function handleInputInSelectDateInputElement(e) {
    selectedDateInput = e.target.value;
    selectedDateInputElement.value = e.target.value;
  }

  if (e) {
    handleInputInSelectDateInputElement(e);
  }
  displayTableRows(type);
};

const crudTableData = (type) => {
  const addEventBtn = document.querySelector(
    `.editor__table-add-event-btn.${type}`
  );
  const selectedDateInputElement = document.querySelector(
    `.${type}.editor__table-date`
  );

  // create and update table data
  addEventBtn.addEventListener("click", () => {
    createNupdateData(type);
  });

  // read and remove table data
  selectedDateInputElement.addEventListener("input", (e) => {
    readNremoveData(type, e);
  });
  readNremoveData(type);
};

export default crudTableData;
