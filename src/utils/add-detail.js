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
  const detailTitleElement = document.querySelector(
    "#editor__detail-form-title"
  );
  const detailDescriptionElement = document.querySelector(
    "#editor__detail-form-description"
  );
  const loader = document.querySelector(".loader");

  let prevSibling;
  let prevTitle;
  let prevDescription;
  let titleValue;
  let descriptionValue;

  //------------------------------------------------------------------------- FUNCTIONS
  function handleInputOnTitleElement(e) {
    titleValue = e.target.value.trim();
    if (titleValue && titleValue != prevTitle) {
      detailUpdateBtn.style.pointerEvents = "all";
      detailUpdateBtn.style.opacity = "1";
    } else {
      detailUpdateBtn.style.pointerEvents = "none";
      detailUpdateBtn.style.opacity = "0.5";
    }
  }

  function handleInputOnDescriptionElement(e) {
    descriptionValue = e.target.value.trim();
    if (descriptionValue != prevDescription && titleValue) {
      detailUpdateBtn.style.pointerEvents = "all";
      detailUpdateBtn.style.opacity = "1";
    }
    if (titleValue == prevTitle && descriptionValue == prevDescription) {
      detailUpdateBtn.style.pointerEvents = "none";
      detailUpdateBtn.style.opacity = "0.5";
    }
  }

  async function handleClickOnUpdateBtn(e) {
    loader.style.display = "block";
    document.body.style.overflow = "hidden";
    prevSibling.setAttribute("data-title", detailTitleElement.value.trim());
    prevSibling.setAttribute(
      "data-description",
      detailDescriptionElement.value.trim()
    );

    function imgToFile(img) {
      return new Promise(async (resolve, reject) => {
        const response = await fetch(img.src);
        const blob = await response.blob();
        const imgFile = new File([blob], prevSibling.dataset.src, {
          type: blob.type,
        });
        console.log("FILE: ", imgFile);
        imgFile.dataset__title = detailTitleElement.value.trim();
        console.log("UPDATED FILE: ", imgFile);
        resolve(imgFile);
      });
    }
    imgToFile(prevSibling).then(async (file) => {
      const { data, error } = await supabase.storage
        .from(`${prevSibling.dataset.bucket}`)
        .update(`${prevSibling.dataset.path}`, file, {
          cacheControl: "3600",
          upsert: true,
        });
      if (data) {
        console.log("SUCCESS");
      }
      detailCloseBtn.click();
    });
  }

  async function handleClickOnAddDetailBtn(e) {
    detailFormContainer.style.display = "flex";
    document.body.style.overflow = "hidden";

    prevSibling = e.target.previousElementSibling;
    while (prevSibling.nodeName != "IMG") {
      prevSibling = prevSibling.previousElementSibling;
    }

    prevTitle = prevSibling.getAttribute("data-title");
    prevDescription = prevSibling.getAttribute("data-description");

    detailTitleElement.value = prevTitle;
    detailDescriptionElement.value = prevDescription;

    titleValue = prevTitle;
    descriptionValue = prevDescription;

    detailTitleElement.addEventListener("input", handleInputOnTitleElement);
    detailDescriptionElement.addEventListener(
      "input",
      handleInputOnDescriptionElement
    );
    detailUpdateBtn.addEventListener("click", handleClickOnUpdateBtn);
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
