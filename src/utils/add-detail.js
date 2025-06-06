import { supabase } from "../supabaseClient";

const handleDetailToImg = (type) => {
  const detailFormContainer = document.querySelector(
    ".editor__detail-form-container"
  );
  const detailCloseBtn = document.querySelector(
    ".editor__detail-form-close-btn"
  );
  const detailUpdateBtn = document.querySelector(".editor__detail-update-btn");
  const detailBtn = document.querySelectorAll(
    `.editor__btn-add-details.${type}`
  );
  const detailTitleElementContainer = document.querySelector(
    ".editor__detail-form-header"
  );
  const detailTitleElement = document.querySelector(
    "#editor__detail-form-title"
  );
  const detailDescriptionElement = document.querySelector(
    "#editor__detail-form-description"
  );
  const detailDateElementContainer = document.querySelector(
    ".editor__detail-input-date"
  );
  const detailDateElement = document.querySelector("#editor__detail-input");
  const loader = document.querySelector(".loader");

  let prevSibling;
  let prevTitle;
  let prevDescription;
  let prevDate;
  let titleValue;
  let descriptionValue;
  let dateValue;
  let imgUniqueId;

  const galleryDetailBtn = document.querySelectorAll(
    ".editor__btn-add-details.gallery"
  );
  galleryDetailBtn.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = 0.5;
    btn.style.pointerEvents = "none";
  });

  //------------------------------------------------------------------------- FUNCTIONS
  function handleInputOnTitleElement(e) {
    titleValue = e.target.value.trim();
    if (titleValue && titleValue != prevTitle && dateValue) {
      detailUpdateBtn.style.pointerEvents = "all";
      detailUpdateBtn.style.opacity = "1";
    } else {
      detailUpdateBtn.style.pointerEvents = "none";
      detailUpdateBtn.style.opacity = "0.5";
    }
  }

  function handleInputOnDescriptionElement(e) {
    descriptionValue = e.target.value.trim();
    if (type == "news" || type == "gallery") {
      if (descriptionValue != prevDescription && titleValue && dateValue) {
        detailUpdateBtn.style.pointerEvents = "all";
        detailUpdateBtn.style.opacity = "1";
      }
      if (titleValue == prevTitle && descriptionValue == prevDescription) {
        detailUpdateBtn.style.pointerEvents = "none";
        detailUpdateBtn.style.opacity = "0.5";
      }
    }
    if (type == "hero" || type == "about" || type == "msg") {
      if (descriptionValue != prevDescription) {
        detailUpdateBtn.style.pointerEvents = "all";
        detailUpdateBtn.style.opacity = "1";
      }
      if (descriptionValue == prevDescription) {
        detailUpdateBtn.style.pointerEvents = "none";
        detailUpdateBtn.style.opacity = "0.5";
      }
    }
  }

  function handleInputOnCalendar(e) {
    dateValue = e.target.value;
    if (dateValue != prevDate && titleValue) {
      detailUpdateBtn.style.pointerEvents = "all";
      detailUpdateBtn.style.opacity = "1";
    }
  }

  async function handleClickOnUpdateBtn(e) {
    loader.style.display = "block";
    document.body.style.overflow = "hidden";
    updateDataFromMetaDataImg(
      detailTitleElement.value.trim(),
      detailDescriptionElement.value.trim(),
      detailDateElement.value
    ).then((data) => {
      detailCloseBtn.click();
    });
  }

  function updateDataFromMetaDataImg(newTitle, newDescription, newDate) {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase
        .from("meta-data-img")
        .upsert(
          {
            path: imgUniqueId,
            title: `${newTitle}`,
            description: `${newDescription}`,
            date: newDate,
          },
          { onConflict: "path" }
        )
        .select();

      if (error) {
        console.log("ERROR: ", error);
        reject;
      }
      resolve(data);
    });
  }

  async function handleClickOnAddDetailBtn(e) {
    loader.style.display = "block";
    document.body.style.overflow = "hidden";
    detailFormContainer.style.display = "flex";
    document.body.style.overflow = "hidden";

    prevSibling = e.target.previousElementSibling;
    while (prevSibling.nodeName != "IMG") {
      prevSibling = prevSibling.previousElementSibling;
    }

    imgUniqueId = prevSibling.getAttribute("data-path");

    if (
      prevSibling.classList.contains("hero") ||
      prevSibling.classList.contains("about") ||
      prevSibling.classList.contains("msg")
    ) {
      detailTitleElementContainer.style.opacity = 0.5;
      detailTitleElementContainer.style.pointerEvents = "none";
      detailDateElementContainer.style.opacity = 0.5;
      detailDateElementContainer.style.pointerEvents = "none";
    } else {
      detailTitleElementContainer.style.opacity = 1;
      detailTitleElementContainer.style.pointerEvents = "auto";
      detailDateElementContainer.style.opacity = 1;
      detailDateElementContainer.style.pointerEvents = "auto";
    }

    fecthDataFromMetaDataImg().then((data) => {
      data.forEach((row) => {
        if (row.path == imgUniqueId) {
          prevTitle = row.title;
          prevDescription = row.description;
          prevDate = row.date;
          return;
        }
      });
      if (
        prevSibling.classList.contains("news") ||
        prevSibling.classList.contains("gallery")
      ) {
        detailDateElement.value = prevDate;
        detailTitleElement.value = prevTitle;
      } else {
        if (prevSibling.classList.contains("hero")) {
          detailTitleElement.value = "Quote";
        }
        if (prevSibling.classList.contains("about")) {
          detailTitleElement.value = "About Us";
        }
        if (prevSibling.classList.contains("msg")) {
          detailTitleElement.value = "From The  Principal's Desk";
        }
      }
      detailDescriptionElement.value = prevDescription;

      loader.style.display = "none";
      document.body.style.overflow = "auto";

      titleValue = prevTitle;
      descriptionValue = prevDescription;
      dateValue = prevDate;

      detailTitleElement.addEventListener("input", handleInputOnTitleElement);
      detailDescriptionElement.addEventListener(
        "input",
        handleInputOnDescriptionElement
      );
      detailUpdateBtn.addEventListener("click", handleClickOnUpdateBtn);
      detailDateElement.addEventListener("input", handleInputOnCalendar);
    });
  }

  async function fecthDataFromMetaDataImg() {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase.from("meta-data-img").select("*");

      if (data) {
        resolve(data);
      }
      if (error) {
        console.log("ERROR: ", error);
        reject;
      }
    });
  }

  function handleClickOnCloseDetailFormBtn(e) {
    detailTitleElement.removeEventListener("input", handleInputOnTitleElement);
    detailDescriptionElement.removeEventListener(
      "input",
      handleInputOnDescriptionElement
    );
    detailUpdateBtn.removeEventListener("click", handleClickOnUpdateBtn);

    detailUpdateBtn.style.pointerEvents = "none";
    detailUpdateBtn.style.opacity = "0.5";

    loader.style.display = "none";
    document.body.style.overflow = "auto";

    detailFormContainer.style.display = "none";
    document.body.style.overflow = "auto";
  }

  //----------------------------------------------------------------------- EVENTS

  detailBtn.forEach((btn) => {
    btn.addEventListener("click", handleClickOnAddDetailBtn);
  });
  detailCloseBtn.addEventListener("click", handleClickOnCloseDetailFormBtn);
};

export default handleDetailToImg;
