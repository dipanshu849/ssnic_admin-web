import { supabase } from "../supabaseClient";

const getMetaDataHeader = () => {
  const feeStructureInputElement = document.querySelector(
    "#meta-data-header-fee-structure-link"
  );
  const admissionCriteriaInputElement = document.querySelector(
    "#meta-data-header-admission-criteria-link"
  );
  const admissionProcessInputElement = document.querySelector(
    "#meta-data-header-admission-process-link"
  );
  const schoolDressInputElement = document.querySelector(
    "#meta-data-header-school-dress-link"
  );
  const curriculumInputElement = document.querySelector(
    "#meta-data-header-curriculum-link"
  );
  const examScheduleInputElement = document.querySelector(
    "#meta-data-header-exam-schedule-link"
  );
  const listSportsInputElement = document.querySelector(
    "#meta-data-header-list-sports-link"
  );
  const sportsFacilitiesInputElement = document.querySelector(
    "#meta-data-header-sports-facilities-link"
  );
  const schoolFacilitiesInputElement = document.querySelector(
    "#meta-data-header-school-facilities-link"
  );

  const loader = document.querySelector(".loader");

  let feeStructure;
  let admissionCriteria;
  let admissionProcess;
  let schoolDress;
  let curriculum;
  let examSchedule;
  let listSports;
  let sportsFacilities;
  let schoolFacilities;

  // ------------------------------------------------------ Functions
  async function uploadPdfFileToDatabase(type, file, span, e) {
    return new Promise(async (resolve, reject) => {
      span.classList.remove("uploaded");
      span.classList.add("uploading");
      e.currentTarget.style.opacity = "0.5";
      e.currentTarget.disabled = true;
      const { data, error } = await supabase.storage
        .from("pdfs")
        .upload(`${type}.pdf`, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: "application/pdf",
        });

      if (error) {
        console.log(error);
        reject(error, e);
      }
      resolve(data, e);
    });
  }

  async function getData() {
    console.log("HERE");
    return new Promise(async (resolve, reject) => {
      let { data, error } = await supabase.storage.from("pdfs").list();

      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(data);
    });
  }

  getData().then((data) => {
    data.forEach((file) => {
      if (file.name.includes("feeStructure")) {
        feeStructureInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("admissionCriteria")) {
        admissionCriteriaInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("admissionProcess")) {
        admissionProcessInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("schoolDress")) {
        schoolDressInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("curriculum")) {
        curriculumInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("examSchedule")) {
        examScheduleInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("listSports")) {
        listSportsInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("sportsFacilities")) {
        sportsFacilitiesInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      } else if (file.name.includes("schoolFacilities")) {
        schoolFacilitiesInputElement.nextElementSibling.textContent =
          file.updated_at.slice(0, 10);
      }
    });
  });

  function handleInputOnFeeStructureInputElement(e) {
    feeStructure = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("feeStructure", feeStructure, span, e).then(
      (data) => {
        span.classList.remove("uploading");
        span.classList.add("uploaded");
        feeStructureInputElement.style.opacity = "1";
        feeStructureInputElement.disabled = false;
      }
    );
  }

  function handleInputOnAdmissionCriteriaInputElement(e) {
    admissionCriteria = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase(
      "admissionCriteria",
      admissionCriteria,
      span,
      e
    ).then((data) => {
      span.classList.remove("uploading");
      span.classList.add("uploaded");
      admissionCriteriaInputElement.style.opacity = "1";
      admissionCriteriaInputElement.disabled = false;
    });
  }

  function handleInputOnAdmissionProcessInputElement(e) {
    admissionProcess = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("admissionProcess", admissionProcess, span, e).then(
      (data) => {
        span.classList.remove("uploading");
        span.classList.add("uploaded");
        admissionProcessInputElement.style.opacity = "1";
        admissionProcessInputElement.disabled = false;
      }
    );
  }

  function handleInputOnSchoolDressInputElement(e) {
    schoolDress = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("schoolDress", schoolDress, span, e).then(
      (data) => {
        span.classList.remove("uploading");
        span.classList.add("uploaded");
        schoolDressInputElement.style.opacity = "1";
        schoolDressInputElement.disabled = false;
      }
    );
  }

  function handleInputOnCurriculumInputElement(e) {
    curriculum = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("curriculum", curriculum, span, e).then((data) => {
      span.classList.remove("uploading");
      span.classList.add("uploaded");
      curriculumInputElement.style.opacity = "1";
      curriculumInputElement.disabled = false;
    });
  }

  function handleInputOnExamScheduleInputElement(e) {
    examSchedule = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("examSchedule", examSchedule, span, e).then(
      (data) => {
        span.classList.remove("uploading");
        span.classList.add("uploaded");
        examScheduleInputElement.style.opacity = "1";
        examScheduleInputElement.disabled = false;
      }
    );
  }

  function handleInputOnListSportsInputElement(e) {
    listSports = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("listSports", listSports, span, e).then((data) => {
      span.classList.remove("uploading");
      span.classList.add("uploaded");
      listSportsInputElement.style.opacity = "1";
      listSportsInputElement.disabled = false;
    });
  }

  function handleInputOnSportsFacilitiesInputElement(e) {
    sportsFacilities = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("sportsFacilities", sportsFacilities, span, e).then(
      (data) => {
        span.classList.remove("uploading");
        span.classList.add("uploaded");
        sportsFacilitiesInputElement.style.opacity = "1";
        sportsFacilitiesInputElement.disabled = false;
      }
    );
  }

  function handleInputOnSchoolFacilitiesInputElement(e) {
    schoolFacilities = e.currentTarget.files[0];
    const span = e.currentTarget.nextElementSibling;
    span.innerHTML = "";

    uploadPdfFileToDatabase("schoolFacilities", schoolFacilities, span, e).then(
      (data) => {
        span.classList.remove("uploading");
        span.classList.add("uploaded");
        schoolFacilitiesInputElement.style.opacity = "1";
        schoolFacilitiesInputElement.disabled = false;
      }
    );
  }
  // ----------------------------------------------------- Events
  feeStructureInputElement.addEventListener("change", (e) => {
    handleInputOnFeeStructureInputElement(e);
  });
  admissionCriteriaInputElement.addEventListener("change", (e) => {
    handleInputOnAdmissionCriteriaInputElement(e);
  });
  admissionProcessInputElement.addEventListener("change", (e) => {
    handleInputOnAdmissionProcessInputElement(e);
  });
  schoolDressInputElement.addEventListener("change", (e) => {
    handleInputOnSchoolDressInputElement(e);
  });
  curriculumInputElement.addEventListener("change", (e) => {
    handleInputOnCurriculumInputElement(e);
  });
  examScheduleInputElement.addEventListener("change", (e) => {
    handleInputOnExamScheduleInputElement(e);
  });
  listSportsInputElement.addEventListener("change", (e) => {
    handleInputOnListSportsInputElement(e);
  });
  sportsFacilitiesInputElement.addEventListener("change", (e) => {
    handleInputOnSportsFacilitiesInputElement(e);
  });
  schoolFacilitiesInputElement.addEventListener("change", (e) => {
    handleInputOnSchoolFacilitiesInputElement(e);
  });
};

export default getMetaDataHeader;
