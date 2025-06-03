import { supabase } from "../supabaseClient";
import getImgs from "./get-data";
import Compressor from "compressorjs";

const drapDrop = (type, folder) => {
  const suffix = `editor__${type}`;
  const openBtn = document.querySelector(`.${suffix}-btn-add`);
  const closeBtn = document.querySelector(`.${suffix}-dragHolder__close-btn`);
  const dragHolder = document.querySelector(`.${suffix}-dragHolder-wrapper`);
  const dragHolderContent = document.querySelector(
    `.${suffix}-dragHolder-content`
  );
  const imgCounter = document.querySelector(`.${suffix}-dragHolder-img-count`);
  const imgFinalAddBtn = document.querySelector(
    `.${suffix}-dragHolder__add-btn`
  );

  const listOfResizedImgs = [];

  const loader = document.querySelector(".loader");

  openBtn.addEventListener("click", () => {
    dragHolder.style.display = "block";
    document.body.style.overflowY = "hidden";
    imgCounter.textContent = 0;
  });

  closeBtn.addEventListener("click", () => {
    dragHolder.style.display = "none";
    document.body.style.overflowY = "auto";
    imgCounter.textContent = 0;
    removeAllDisplayedImages();
  });

  const removeAllDisplayedImages = () => {
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
  };

  const dropHandler = (e) => {
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
            resizedDivItem.className = `${suffix}-dragHolder__img-item`;

            resizedDivItem.innerHTML = `<img class="${suffix}-dragHolder__img" src="${newImg.src}" alt="${newImg.alt}" />
             <div class="${suffix}-dragHolder__resize-required"></div>`;
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
              `.${suffix}-dragHolder__img-item:last-child .${suffix}-dragHolder__resize-required`
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
              `.${suffix}-dragHolder__img-item:last-child .${suffix}-dragHolder__resize-required`
            );
            resizeText.replaceChildren();
            resizeText.innerHTML = "<span>&#10060;</span> Not resized";
          });
        },
      });
    });
  };

  const dragOverHandler = (e) => {
    e.preventDefault(); // prevent from opening file
  };
  dragHolderContent.addEventListener("drop", dropHandler);
  dragHolderContent.addEventListener("dragover", dragOverHandler);

  // ------------------------------------------------- BELOW CODE HANDLE INPUT TYPE FILE
  const inputFileBtn = document.querySelector(
    `.${suffix}-dragHolder-content-input-btn`
  );

  inputFileBtn.addEventListener("change", () => {
    const selectedFiles = inputFileBtn.files;
    console.log("Selected files: ", selectedFiles);

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
            resizedDivItem.className = `${suffix}-dragHolder__img-item`;

            resizedDivItem.innerHTML = `<img class="${suffix}-dragHolder__img" src="${newImg.src}" alt="${newImg.alt}" />
             <div class="${suffix}-dragHolder__resize-required"></div>`;
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
              `.${suffix}-dragHolder__img-item:last-child .${suffix}-dragHolder__resize-required`
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
              `.${suffix}-dragHolder__img-item:last-child .${suffix}-dragHolder__resize-required`
            );
            resizeText.replaceChildren();
            resizeText.innerHTML = "<span>&#10060;</span> Not resized";
          });
        },
      });
    });
  });

  // -------------------------------------- BELOW CODE IS AFTER RECEIVING RESIZED IMAGE

  const uploadImages = async (listOfResizedImgs) => {
    let counter = 1;
    for (const resizedImg of listOfResizedImgs) {
      const { data, error } = await supabase.storage
        .from("home")
        .upload(`${folder}/` + resizedImg[0], resizedImg[1], {
          cacheControl: "3600",
          upsert: true,
        });
      counter++;
    }
  };

  imgFinalAddBtn.addEventListener("click", async () => {
    loader.style.display = "block";
    document.body.style.overflow = "hidden";

    uploadImages(listOfResizedImgs).then(() => {
      getImgs(type, folder);
      loader.style.display = "none";
      document.body.style.overflow = "auto";
    });
    closeBtn.click();
  });
};

export default drapDrop;
