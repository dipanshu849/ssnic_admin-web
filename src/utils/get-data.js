import { supabase } from "../supabaseClient";

const getImgs = (type, folder) => {
  const suffix = `editor__${type}`;
  const editor__List = document.querySelector(
    `.${suffix}-list.not-placeholder-list`
  );
  const editor__ListPlaceholder = document.querySelector(
    `.${suffix}-list.placeholder-list`
  );

  const imgNumberDisplayer = document.querySelector(`.${suffix}-img-counter`);

  const loader = document.querySelector(".loader");

  editor__ListPlaceholder.style.display = "flex";
  editor__List.style.display = "none";
  editor__List.replaceChildren(); // remove existing img

  let imgUrl = [];
  let imgCounter = 0;
  let setIntervalId;
  let isSetIntervalRunning = true;

  let removeBtn;

  const fetchImgs = async () => {
    const { data, error } = await supabase.storage
      .from("home")
      .list(`${folder}/`);
    return data;
  };

  // show img and display them
  fetchImgs()
    .then((Imgs) => {
      imgUrl = [];
      editor__List.replaceChildren(); // remove existing img

      Imgs.forEach((img, index) => {
        const { data } = supabase.storage
          .from("home")
          .getPublicUrl(`${folder}/` + img.name);
        console.log(img.name);
        if (img.name == ".emptyFolderPlaceholder") {
          return;
        }
        if (imgUrl.indexOf(data.publicUrl) == -1) {
          imgUrl.push(data.publicUrl);
          const listItem = document.createElement("div");
          listItem.className = `${suffix}-item`;
          listItem.innerHTML = `
             <img class="${suffix}-img" src="${data.publicUrl}" data-src="${
            img.name
          }" alt="${type} Image ${index + 1}" />
                <button class="${suffix}-btn-remove btn">Remove</button>
          `;
          editor__List.appendChild(listItem);
        }
      });

      const editor__ItemImg = document.querySelectorAll(`.${suffix}-img`);
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
          const message = document.querySelector(`.${suffix}-zero-img`);
          message.classList.add("check");
          editor__List.style.display = "flex";
          clearInterval(setIntervalId);
          isSetIntervalRunning = false;

          // ------------------------------- Below code to remove img

          removeBtn = document.querySelectorAll(`.${suffix}-btn-remove`);
          removeBtn.forEach((btn) => {
            if (!isSetIntervalRunning) {
              btn.addEventListener("click", async (e) => {
                loader.style.display = "block";
                document.body.style.overflow = "hidden";
                const img = e.target.previousElementSibling;

                const address = `${folder}/` + img.dataset.src;

                const { data, error } = await supabase.storage
                  .from("home")
                  .remove([`${address}`]);
                getImgs(type, folder);
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
