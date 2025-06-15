import { supabase } from "../supabaseClient";

const getMetaDataFooter = () => {
  const updateBtn = document.querySelector(".meta-data-links-update-btn");
  const ytLinkInputElement = document.querySelector("#meta-data-yt-link");
  const fbLinkInputElement = document.querySelector("#meta-data-fb-link");
  const instaLinkInputElement = document.querySelector("#meta-data-insta-link");
  const familyResourcesLinkInputElement = document.querySelector(
    "#meta-data-family-resources-link"
  );
  const addressMapLinkInputElement = document.querySelector(
    "#meta-data-address-map-link"
  );
  const phoneNosInputElement = document.querySelector("#meta-data-phoneNos");

  const loader = document.querySelector(".loader");

  let ytLink;
  let fbLink;
  let instaLink;
  let familyResourcesLink;
  let addressMapLink;
  let phoneNos;

  let prevYtLink;
  let prevFbLink;
  let prevInstaLink;
  let prevFamilyResourcesLink;
  let prevAddressMapLink;
  let prevPhoneNos;

  ytLinkInputElement.value = "";
  fbLinkInputElement.value = "";
  instaLinkInputElement.value = "";
  familyResourcesLinkInputElement.value = "";
  addressMapLinkInputElement.value = "";
  phoneNosInputElement.value = "";

  // ------------------------------------------------------ Functions
  async function fetchMetaData() {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase
        .from("meta-data-links")
        .select("*");

      if (error) {
        console.log("Error in fetching meta-data: ", error);
        reject;
      }
      resolve(data);
    });
  }

  function handleFetchMetaData() {
    fetchMetaData().then((data) => {
      data.forEach((row, index) => {
        ytLinkInputElement.value = row.yt__link;
        fbLinkInputElement.value = row.fb__link;
        instaLinkInputElement.value = row.insta__link;
        familyResourcesLinkInputElement.value = row.family__resources__link;
        addressMapLinkInputElement.value = row.address__map__link;
        phoneNosInputElement.value = row.phoneNos;

        prevYtLink = row.yt__link;
        prevFbLink = row.fb__link;
        prevInstaLink = row.insta__link;
        prevFamilyResourcesLink = row.family__resources__link;
        prevAddressMapLink = row.address__map__link;
        prevPhoneNos = row.phoneNos;

        ytLink = prevYtLink;
        fbLink = prevFbLink;
        instaLink = prevInstaLink;
        familyResourcesLink = prevFamilyResourcesLink;
        addressMapLink = prevAddressMapLink;
        phoneNos = prevPhoneNos;
      });
    });
  }

  function handleInputOnYtLinkInputElement(e) {
    ytLink = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnFbLinkInputElement(e) {
    fbLink = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnInstaLinkInputElement(e) {
    instaLink = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnFamilyResourcesLinkInputElement(e) {
    familyResourcesLink = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnAddressMapLinkInputElement(e) {
    addressMapLink = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnPhoneNosInputElement(e) {
    phoneNos = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function validateNUnlockUpdateBtn() {
    if (
      ytLink &&
      fbLink &&
      instaLink &&
      familyResourcesLink &&
      addressMapLink &&
      phoneNos &&
      !(
        ytLink == prevYtLink &&
        fbLink == prevFbLink &&
        instaLink == prevInstaLink &&
        familyResourcesLink == prevFamilyResourcesLink &&
        addressMapLink == prevAddressMapLink &&
        phoneNos == prevPhoneNos
      )
    ) {
      updateBtn.style.opacity = "1";
      updateBtn.style.pointerEvents = "auto";
    } else {
      updateBtn.style.opacity = "0.5";
      updateBtn.style.pointerEvents = "none";
    }
  }

  async function updateMetaData() {
    return new Promise(async (resolve, reject) => {
      const { error } = await supabase
        .from("meta-data-links")
        .update({
          fb__link: `${fbLink}`,
          insta__link: `${instaLink}`,
          yt__link: `${ytLink}`,
          family__resources__link: `${familyResourcesLink}`,
          address__map__link: `${addressMapLink}`,
          phoneNos: `${phoneNos}`,
        })
        .eq("id", 1);

      if (error) {
        console.log("Error in updating meta data general: ", error);
        reject;
      }

      resolve(error);
    });
  }

  function handleClickOnUpdateBtn() {
    loader.style.display = "block";
    document.body.overflow = "hidden";
    updateMetaData().then((error) => {
      handleFetchMetaData();
      updateBtn.style.opacity = "0.5";
      updateBtn.style.pointerEvents = "none";
      loader.style.display = "none";
      document.body.overflow = "auto";
    });
  }

  handleFetchMetaData();
  // ----------------------------------------------------- Events
  ytLinkInputElement.addEventListener("input", (e) => {
    handleInputOnYtLinkInputElement(e);
  });
  fbLinkInputElement.addEventListener("input", (e) => {
    handleInputOnFbLinkInputElement(e);
  });
  instaLinkInputElement.addEventListener("input", (e) => {
    handleInputOnInstaLinkInputElement(e);
  });
  familyResourcesLinkInputElement.addEventListener("input", (e) => {
    handleInputOnFamilyResourcesLinkInputElement(e);
  });
  addressMapLinkInputElement.addEventListener("input", (e) => {
    handleInputOnAddressMapLinkInputElement(e);
  });
  phoneNosInputElement.addEventListener("input", (e) => {
    handleInputOnPhoneNosInputElement(e);
  });
  updateBtn.addEventListener("click", handleClickOnUpdateBtn);
};

export default getMetaDataFooter;
