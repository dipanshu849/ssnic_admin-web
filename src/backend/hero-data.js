import { supabase } from ".././supabaseClient";

const getHeroImgs = () => {
  const editor__heroList = document.querySelector(
    ".editor__hero-list.not-placeholder-list"
  );
  const editor__heroListPlaceholder = document.querySelector(
    ".editor__hero-list.placeholder-list"
  );

  const imgNumberDisplayer = document.querySelector(
    ".editor__hero-img-counter"
  );

  const loader = document.querySelector(".loader");

  editor__heroListPlaceholder.style.display = "flex";
  editor__heroList.style.display = "none";
  editor__heroList.replaceChildren(); // remove existing img

  let imgUrl = [];
  let imgCounter = 0;
  let setIntervalId;
  let isSetIntervalRunning = true;

  let removeBtn;

  const fetchHeroImgs = async () => {
    console.log("Fetching hero images...");
    const { data, error } = await supabase.storage
      .from("hero-img")
      .list("public");
    return data;
  };

  // show hero img and display them
  fetchHeroImgs()
    .then((heroImgs) => {
      imgUrl = [];
      console.log("Hero images fetched successfully:", heroImgs);
      heroImgs.forEach((img, index) => {
        const { data } = supabase.storage
          .from("hero-img")
          .getPublicUrl("public/" + img.name);
        console.log("NAME:", img.name);
        if (img.name === ".emptyFolderPlaceholder") {
          return;
        }
        if (imgUrl.indexOf(data.publicUrl) === -1) {
          imgUrl.push(data.publicUrl);
          const listItem = document.createElement("div");
          listItem.className = "editor__hero-item";
          listItem.innerHTML = `
             <img class="editor__hero-img" src="${
               data.publicUrl
             }" alt="Hero Image ${index + 1}" />
                <button class="editor__hero-btn-remove btn">Remove</button>
          `;
          editor__heroList.appendChild(listItem);
          imgNumberDisplayer.textContent = index + 1;
        }
      });

      const editor__heroItemImg =
        document.querySelectorAll(".editor__hero-img");
      console.log(editor__heroItemImg);

      editor__heroItemImg.forEach((img, index) => {
        img.src = imgUrl[index];
        img.dataset.src = heroImgs[index].name; // use this in deleting the img
        img.alt = "Hero Image " + (index + 1);
        img.addEventListener("load", () => {
          imgCounter++;
        });
      });
    })
    .catch((error) => {
      editor__heroList.innerHTML = `<p class="error">Error fetching hero images: ${error.message}</p>`;
    })
    .finally(() => {
      setIntervalId = setInterval(() => {
        if (imgCounter == imgUrl.length) {
          editor__heroListPlaceholder.style.display = "none";
          const message = document.querySelector(".editor__hero-zero-img");
          message.classList.add("check");
          editor__heroList.style.display = "flex";
          clearInterval(setIntervalId);
          isSetIntervalRunning = false;

          // ------------------------------- Below code to remove hero img

          removeBtn = document.querySelectorAll(".editor__hero-btn-remove");
          removeBtn.forEach((btn) => {
            if (!isSetIntervalRunning) {
              btn.addEventListener("click", async (e) => {
                loader.style.display = "block";
                document.body.style.overflow = "hidden";
                console.log("Remove button clicked");
                const img = e.target.previousElementSibling;
                console.log("Img to be deleted: ", img);

                const address = "public/" + img.dataset.src;
                console.log("Address to be deleted: ", address);

                const { data, error } = await supabase.storage
                  .from("hero-img")
                  .remove([`${address}`]);

                console.log("Data: ", data);
                console.log("Error: ", error);
                getHeroImgs();
                loader.style.display = "none";
                document.body.style.overflow = "auto";
              });
            }
          });
        }
      }, 500);
    });
};

export default getHeroImgs;
