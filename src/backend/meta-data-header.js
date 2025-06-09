import { supabase } from "../supabaseClient";

const getMetaDataHeader = () => {
  const updateBtn = document.querySelector(".meta-data-header-update-btn");
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

  let prevFeeStructure;
  let prevAdmissionCriteria;
  let prevAdmissionProcess;
  let prevSchoolDress;
  let prevCurriculum;
  let prevExamSchedule;
  let prevListSports;
  let prevSportsFacilities;
  let prevSchoolFacilities;

  feeStructureInputElement.value = "";
  admissionCriteriaInputElement.value = "";
  admissionProcessInputElement.value = "";
  schoolDressInputElement.value = "";
  curriculumInputElement.value = "";
  examScheduleInputElement.value = "";
  listSportsInputElement.value = "";
  sportsFacilitiesInputElement.value = "";
  schoolFacilitiesInputElement.value = "";

  // ------------------------------------------------------ Functions
  async function fetchMetaData() {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase
        .from("meta-data-header-links")
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
        feeStructureInputElement.value = row.fee__structure;
        admissionCriteriaInputElement.value = row.admission__criteria;
        admissionProcessInputElement.value = row.admission__process;
        schoolDressInputElement.value = row.school__dress;
        curriculumInputElement.value = row.curriculum;
        examScheduleInputElement.value = row.exam__schedule;
        listSportsInputElement.value = row.list__of__sports;
        sportsFacilitiesInputElement.value = row.sports__facilities;
        schoolFacilitiesInputElement.value = row.school__facilities;

        prevFeeStructure = row.fee__structure;
        prevAdmissionCriteria = row.admission__criteria;
        prevAdmissionProcess = row.admission__process;
        prevSchoolDress = row.school__dress;
        prevCurriculum = row.curriculum;
        prevExamSchedule = row.exam__schedule;
        prevListSports = row.list__of__sports;
        prevSportsFacilities = row.sports__facilities;
        prevSchoolFacilities = row.school__facilities;

        feeStructure = prevFeeStructure;
        admissionCriteria = prevAdmissionCriteria;
        admissionProcess = prevAdmissionProcess;
        schoolDress = prevSchoolDress;
        curriculum = prevCurriculum;
        examSchedule = prevExamSchedule;
        listSports = prevListSports;
        sportsFacilities = prevSportsFacilities;
        schoolFacilities = prevSchoolFacilities;
      });
    });
  }

  function handleInputOnFeeStructureInputElement(e) {
    feeStructure = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnAdmissionCriteriaInputElement(e) {
    admissionCriteria = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnAdmissionProcessInputElement(e) {
    admissionProcess = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnSchoolDressInputElement(e) {
    schoolDress = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnCurriculumInputElement(e) {
    curriculum = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnExamScheduleInputElement(e) {
    examSchedule = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnListSportsInputElement(e) {
    listSports = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnSportsFacilitiesInputElement(e) {
    sportsFacilities = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnSchoolFacilitiesInputElement(e) {
    schoolFacilities = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function validateNUnlockUpdateBtn() {
    if (
      feeStructure &&
      admissionCriteria &&
      admissionProcess &&
      schoolDress &&
      curriculum &&
      examSchedule &&
      listSports &&
      sportsFacilities &&
      schoolFacilities &&
      !(
        feeStructure == prevFeeStructure &&
        admissionCriteria == prevAdmissionCriteria &&
        admissionProcess == prevAdmissionProcess &&
        schoolDress == prevSchoolDress &&
        curriculum == prevCurriculum &&
        examSchedule == prevExamSchedule &&
        listSports == prevListSports &&
        sportsFacilities == prevSportsFacilities &&
        schoolFacilities == prevSchoolFacilities
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
        .from("meta-data-header-links")
        .update({
          fee__structure: `${feeStructure}`,
          admission__criteria: `${admissionCriteria}`,
          admission__process: `${admissionProcess}`,
          school__dress: `${schoolDress}`,
          curriculum: `${curriculum}`,
          exam__schedule: `${examSchedule}`,
          list__of__sports: `${listSports}`,
          sports__facilities: `${sportsFacilities}`,
          school__facilities: `${schoolFacilities}`,
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
  feeStructureInputElement.addEventListener("input", (e) => {
    handleInputOnFeeStructureInputElement(e);
  });
  admissionCriteriaInputElement.addEventListener("input", (e) => {
    handleInputOnAdmissionCriteriaInputElement(e);
  });
  admissionProcessInputElement.addEventListener("input", (e) => {
    handleInputOnAdmissionProcessInputElement(e);
  });
  schoolDressInputElement.addEventListener("input", (e) => {
    handleInputOnSchoolDressInputElement(e);
  });
  curriculumInputElement.addEventListener("input", (e) => {
    handleInputOnCurriculumInputElement(e);
  });
  examScheduleInputElement.addEventListener("input", (e) => {
    handleInputOnExamScheduleInputElement(e);
  });
  listSportsInputElement.addEventListener("input", (e) => {
    handleInputOnListSportsInputElement(e);
  });
  sportsFacilitiesInputElement.addEventListener("input", (e) => {
    handleInputOnSportsFacilitiesInputElement(e);
  });
  schoolFacilitiesInputElement.addEventListener("input", (e) => {
    handleInputOnSchoolFacilitiesInputElement(e);
  });
  updateBtn.addEventListener("click", handleClickOnUpdateBtn);
};

export default getMetaDataHeader;
