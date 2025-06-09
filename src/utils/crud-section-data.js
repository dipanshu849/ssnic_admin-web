import { supabase } from "../supabaseClient";
import handleDetailToImg from "./add-detail";

const getImgs = (type, folder, subfolder = null, bucket = "home") => {
  const path = subfolder
    ? subfolder[1]
      ? `${folder}/${subfolder[0]}/${subfolder[1]}`
      : `${folder}/${subfolder[0]}`
    : folder;
  const editor__List = document.querySelector(
    `.editor__list.not-placeholder-list.${type}`
  );
  const editor__ListPlaceholder = document.querySelector(
    `.editor__list.placeholder-list.${type}`
  );

  const imgNumberDisplayer = document.querySelector(
    `.editor__img-counter.${type}`
  );

  const loader = document.querySelector(".loader");

  editor__ListPlaceholder.style.display = "flex";
  editor__List.style.display = "none";
  editor__List.replaceChildren(); // remove existing img

  let imgUrl = [];
  let imgCounter = 0;
  let setIntervalId;
  let isSetIntervalRunning = true;

  let removeBtn, detailBtn;

  const fetchImgs = async () => {
    const { data, error } = await supabase.storage
      .from(`${bucket}`)
      .list(`${path}/`);
    return data;
  };

  // show img and display them
  fetchImgs()
    .then((Imgs) => {
      imgUrl = [];
      editor__List.replaceChildren(); // remove existing img

      Imgs.forEach((img, index) => {
        const { data } = supabase.storage
          .from(`${bucket}`)
          .getPublicUrl(`${path}/` + img.name);
        if (img.name == ".emptyFolderPlaceholder") {
          return;
        }
        if (imgUrl.indexOf(data.publicUrl) == -1) {
          imgUrl.push(data.publicUrl);
          const listItem = document.createElement("div");
          listItem.className = `editor__item ${type}`;
          listItem.innerHTML = `
          <img 
          class="editor__img ${type}"
           src="${data.publicUrl}" 
           data-src="${img.name}" 
           data-path="${path}/${img.name}" 
           data-bucket="${bucket}" 
           alt="${type} Image ${index + 1}" />

          <button class="editor__btn-remove ${type} btn">Remove</button>
          <button class="${type} editor__btn-add-details btn">Add Details</button>
          `;
          editor__List.appendChild(listItem);
        }
      });
      // data-title="${img.dataset.title}"
      // data-description="${img.dataset.description}"/>

      const editor__ItemImg = document.querySelectorAll(`.editor__img.${type}`);
      imgNumberDisplayer.textContent = imgUrl.length;

      editor__ItemImg.forEach((img, index) => {
        img.addEventListener("load", () => {
          imgCounter++;
        });
      });
    })
    .catch((error) => {
      editor__List.innerHTML = `<p class="error">Error fetching ${type} images: ${error.message}</p>`;
    })
    .finally(() => {
      setIntervalId = setInterval(() => {
        if (imgCounter == imgUrl.length) {
          editor__ListPlaceholder.style.display = "none";
          const message = document.querySelector(`.editor__zero-img.${type}`);
          message.classList.add("check");
          editor__List.style.display = "flex";
          clearInterval(setIntervalId);
          isSetIntervalRunning = false;

          // ------------------------------- Below code to add detail btn

          if (!isSetIntervalRunning) {
            handleDetailToImg(type);
          }

          // ------------------------------- Below code to remove img

          removeBtn = document.querySelectorAll(`.editor__btn-remove.${type}`);
          removeBtn.forEach((btn) => {
            if (!isSetIntervalRunning) {
              btn.addEventListener("click", async (e) => {
                loader.style.display = "block";
                document.body.style.overflow = "hidden";
                const img = e.target.previousElementSibling;

                const address = `${path}/` + img.dataset.src;

                const { data, error } = await supabase.storage
                  .from(`${bucket}`)
                  .remove([`${address}`]);
                getImgs(
                  type,
                  folder,
                  subfolder ? subfolder : null,
                  bucket ? bucket : "home"
                );
                loader.style.display = "none";
                document.body.style.overflow = "auto";
              });
            }
          });
        }
      }, 500);
    });
};

export default getImgs;
