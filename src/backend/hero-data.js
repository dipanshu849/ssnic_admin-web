import { supabase } from ".././supabaseClient";

const getHeroImgs = () => {
  const editor__heroList = document.querySelector(
    ".editor__hero-list.not-placeholder-list"
  );
  const editor__heroListPlaceholder = document.querySelector(
    ".editor__hero-list.placeholder-list"
  );

  let imgUrl = [];
  let imgCounter = 0;
  let setIntervalId;
  let isSetIntervalRunning = true;

  const fetchHeroImgs = async () => {
    console.log("Fetching hero images...");
    const { data, error } = await supabase.storage
      .from("hero-img")
      .list("public");
    return data;
  };

  fetchHeroImgs()
    .then((heroImgs) => {
      console.log("Hero images fetched successfully:", heroImgs);
      heroImgs.forEach((img, index) => {
        const { data } = supabase.storage
          .from("hero-img")
          .getPublicUrl("public/" + img.name);
        imgUrl.push(data.publicUrl);
        if (index > 0) {
          const listItem = document.createElement("div");
          listItem.className = "editor__hero-item";
          listItem.innerHTML = `
           <img class="editor__hero-img" src="${
             data.publicUrl
           }" alt="Hero Image ${index + 1}" />
              <button class="editor__hero-btn-remove btn">Remove</button>
        `;
          editor__heroList.appendChild(listItem);
        }
      });

      const editor__heroItemImg =
        document.querySelectorAll(".editor__hero-img");
      console.log(editor__heroItemImg);

      editor__heroItemImg.forEach((img, index) => {
        img.src = imgUrl[index + 1];
        img.dataset.src = heroImgs[index + 1].name;
        img.alt = "Hero Image " + (index + 1);
        img.addEventListener("load", () => {
          console.log(`Image ${index + 1} loaded successfully.`);
          imgCounter++;
        });
      });
    })
    .catch((error) => {
      editor__heroList.innerHTML = `<p class="error">Error fetching hero images: ${error.message}</p>`;
    })
    .finally(() => {
      console.log("Hero image fetching process completed.");
      setIntervalId = setInterval(() => {
        if (imgCounter >= imgUrl.length - 1) {
          console.log("All images loaded successfully.");
          editor__heroListPlaceholder.style.display = "none";
          editor__heroList.style.display = "flex";
          clearInterval(setIntervalId);
          isSetIntervalRunning = false;
        }
      }, 500);
    });
};

export default getHeroImgs;
