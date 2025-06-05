import { supabase } from "../supabaseClient";
import getImgs from "./crud-data";
import Compressor from "compressorjs";

const drapDrop = (
  type,
  folder,
  subfolder = null,
  bucket = "home",
  controller = null
) => {
  // ------------------------------- VARIABLES
  console.log("HERE");
  const path = subfolder
    ? subfolder[1]
      ? `${folder}/${subfolder[0]}/${subfolder[1]}`
      : `${folder}/${subfolder[0]}`
    : folder;

  const openBtn = document.querySelector(`.editor__btn-add.${type}`);
  const closeBtn = document.querySelector(
    `.editor__dragHolder__close-btn.${type}`
  );
  const dragHolder = document.querySelector(
    `.editor__dragHolder-wrapper.${type}`
  );
  const dragHolderContent = document.querySelector(
    `.editor__dragHolder-content.${type}`
  );
  const imgCounter = document.querySelector(
    `.editor__dragHolder-img-count.${type}`
  );
  const imgFinalAddBtn = document.querySelector(
    `.editor__dragHolder__add-btn.${type}`
  );
  const inputFileBtn = document.querySelector(
    `.editor__dragHolder-content-input-btn.${type}`
  );
  const listOfResizedImgs = [];
  const loader = document.querySelector(".loader");
  // ------------------------------------------------- END OF VARIABLES

  // ------------------------------ FUNCTIONS
  function handleClickOpenBtn() {
    dragHolder.style.display = "block";
    document.body.style.overflowY = "hidden";
    imgCounter.textContent = 0;
  }

  function handleClickCloseBtn() {
    dragHolder.style.display = "none";
    document.body.style.overflowY = "auto";
    imgCounter.textContent = 0;
    removeAllDisplayedImages();
  }

  function removeAllDisplayedImages() {
    dragHolderContent.replaceChildren();
    dragHolderContent.innerHTML = `
    <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="drag__svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill-rule="nonzero"
                    d="M14 6h2v2h5a1 1 0 0 1 1 1v7.5L16 13l.036 8.062 2.223-2.15L20.041 22H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zm8 11.338V21a1 1 0 0 1-.048.307l-1.96-3.394L22 17.338zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z"
                  />
                </g>
              </svg>`;
  }

  function dropHandler(e) {
    e.preventDefault();

    const imgType = /image.*/;
    [...e.dataTransfer.files].forEach((file, index) => {
      if (!file.type.match(imgType)) {
        return;
      }
      const newImg = document.createElement("img");
      newImg.file = file;

      imgCounter.textContent++;

      const reader = new FileReader();

      const readTheFile = async (file) => {
        reader.readAsDataURL(file);
        await new Promise((resolve, reject) => {
          reader.onload = (event) => {
            newImg.src = event.target.result;
            newImg.dataset.src = file.name; // store the file name for later use
            newImg.alt = `${type} Image ` + (index + 1);
            const resizedDivItem = document.createElement("div");
            resizedDivItem.className = `editor__dragHolder__img-item ${type}`;

            resizedDivItem.innerHTML = `<img class="editor__dragHolder__img ${type}" src="${newImg.src}" alt="${newImg.alt}" />
             <div class="editor__dragHolder__resize-required ${type}"></div>`;
            dragHolderContent.appendChild(resizedDivItem);

            imgFinalAddBtn.style.pointerEvents = "auto";
            imgFinalAddBtn.style.opacity = "1";
            resolve();
          };
          reader.onerror = (err) => {
            reject;
          };
        });
      };

      new Compressor(file, {
        quality: 0.9,
        maxWidth: 1000,

        success(compressedFile) {
          listOfResizedImgs.push([file.name, compressedFile]);

          readTheFile(compressedFile).then(() => {
            const resizeText = document.querySelector(
              `.editor__dragHolder__img-item.${type}:last-child .editor__dragHolder__resize-required.${type}`
            );
            if (compressedFile.size === file.size) {
              resizeText.replaceChildren();
              resizeText.innerHTML = "<span>&#10060;</span> No resizing needed";
            } else {
              resizeText.replaceChildren();
              resizeText.innerHTML = "<span>&#9989;</span> Image resized";
            }
          });
        },
        error(err) {
          console.log("File not compressed", err);
          listOfResizedImgs.push([file.name, file]);
          readTheFile(file).then(() => {
            const resizeText = document.querySelector(
              `.editor__dragHolder__img-item.${type}:last-child .editor__dragHolder__resize-required.${type}`
            );
            resizeText.replaceChildren();
            resizeText.innerHTML = "<span>&#10060;</span> Not resized";
          });
        },
      });
    });
  }

  function dragOverHandler(e) {
    e.preventDefault(); // prevent from opening file
  }

  function handleInputFileBtnClick() {
    const selectedFiles = inputFileBtn.files;

    [...selectedFiles].forEach((file, index) => {
      const newImg = document.createElement("img");
      newImg.file = file;

      imgCounter.textContent++;

      const reader = new FileReader();

      const readTheFile = async (file) => {
        reader.readAsDataURL(file);
        await new Promise((resolve, reject) => {
          reader.onload = (event) => {
            newImg.src = event.target.result;
            newImg.dataset.src = file.name; // store the file name for later use
            newImg.alt = `${type} Image ` + (index + 1);
            const resizedDivItem = document.createElement("div");
            resizedDivItem.className = `editor__dragHolder__img-item.${type}`;

            resizedDivItem.innerHTML = `<img class="editor__dragHolder__img.${type}" src="${newImg.src}" alt="${newImg.alt}" />
             <div class="editor__dragHolder__resize-required.${type}"></div>`;
            dragHolderContent.appendChild(resizedDivItem);

            imgFinalAddBtn.style.pointerEvents = "auto";
            imgFinalAddBtn.style.opacity = "1";
            resolve();
          };
          reader.onerror = (err) => {
            reject;
          };
        });
      };

      new Compressor(file, {
        quality: 0.9,
        maxWidth: 1000,

        success(compressedFile) {
          listOfResizedImgs.push([file.name, compressedFile]);

          readTheFile(compressedFile).then(() => {
            const resizeText = document.querySelector(
              `.editor__dragHolder__img-item.${type}:last-child .editor__dragHolder__resize-required.${type}`
            );
            if (compressedFile.size === file.size) {
              resizeText.replaceChildren();
              resizeText.innerHTML = "<span>&#10060;</span> No resizing needed";
            } else {
              resizeText.replaceChildren();
              resizeText.innerHTML = "<span>&#9989;</span> Image resized";
            }
          });
        },
        error(err) {
          console.log("File not compressed", err);
          listOfResizedImgs.push([file.name, file]);
          readTheFile(file).then(() => {
            const resizeText = document.querySelector(
              `.editor__dragHolder__img-item.${type}:last-child .editor__dragHolder__resize-required.${type}`
            );
            resizeText.replaceChildren();
            resizeText.innerHTML = "<span>&#10060;</span> Not resized";
          });
        },
      });
    });
  }

  async function uploadImages(listOfResizedImgs) {
    let counter = 1;
    for (const resizedImg of listOfResizedImgs) {
      const { data, error } = await supabase.storage
        .from(`${bucket}`)
        .upload(`${path}/` + resizedImg[0], resizedImg[1], {
          cacheControl: "3600",
          upsert: true,
        });
      counter++;
    }
  }

  async function handleClickUploadBtn() {
    loader.style.display = "block";
    loader.style.pointerEvents = "all";
    document.body.style.overflow = "hidden";

    uploadImages(listOfResizedImgs).then(() => {
      getImgs(
        type,
        folder,
        subfolder ? subfolder : null,
        bucket ? bucket : "home"
      );
      loader.style.display = "none";
      loader.style.pointerEvents = "none";
      document.body.style.overflow = "auto";
    });
    closeBtn.click();
  }

  // ------------------------------------------------ END OF FUNCTIONS

  openBtn.addEventListener("click", handleClickOpenBtn, {
    signal: controller.signal,
  });
  closeBtn.addEventListener("click", handleClickCloseBtn, {
    signal: controller.signal,
  });
  dragHolderContent.addEventListener("drop", dropHandler, {
    signal: controller.signal,
  });
  dragHolderContent.addEventListener("dragover", dragOverHandler, {
    signal: controller.signal,
  });
  inputFileBtn.addEventListener("change", handleInputFileBtnClick, {
    signal: controller.signal,
  });
  imgFinalAddBtn.addEventListener("click", handleClickUploadBtn, {
    signal: controller.signal,
  });
};

export default drapDrop;
