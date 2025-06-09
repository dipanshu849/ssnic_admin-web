import { supabase } from "../supabaseClient";

const getMetaData = async () => {
  const updateBtn = document.querySelector(".meta-data-update-btn");
  const principalNameInputElement = document.querySelector(
    "#meta-data-principal__name"
  );
  const facultiesNumInputElement = document.querySelector(
    "#meta-data-faculty-number"
  );
  const classroomNumInputElement = document.querySelector(
    "#meta-data-classroom-number"
  );
  const studentsNumInputElement = document.querySelector(
    "#meta-data-student-number"
  );
  const avgClassSizeInputElement = document.querySelector(
    "#meta-data-avg-class-size"
  );
  const campusAreaInputElement = document.querySelector(
    "#meta-data-area-campus"
  );
  const loader = document.querySelector(".loader");

  let principalName;
  let facultyNum;
  let classroomNum;
  let studentNum;
  let avgClassSize;
  let campusArea;

  let prevPrincipalName;
  let prevFacultyNum;
  let prevClassroomNum;
  let prevStudentNum;
  let prevAvgClassSize;
  let prevCampusArea;

  principalNameInputElement.value = "";
  facultiesNumInputElement.value = "";
  classroomNumInputElement.value = "";
  studentsNumInputElement.value = "";
  avgClassSizeInputElement.value = "";
  campusAreaInputElement.value = "";

  // ------------------------------------------------------ Functions
  async function fetchMetaData() {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase.from("meta-data").select("*");

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
        principalNameInputElement.value = row.principal__name;
        facultiesNumInputElement.value = row.faculty__number;
        studentsNumInputElement.value = row.student__number;
        classroomNumInputElement.value = row.classroom__number;
        campusAreaInputElement.value = row.acre__campus;
        avgClassSizeInputElement.value = row.avg__class__size;

        prevPrincipalName = row.principal__name;
        prevFacultyNum = row.faculty__number;
        prevStudentNum = row.student__number;
        prevClassroomNum = row.classroom__number;
        prevCampusArea = row.acre__campus;
        prevAvgClassSize = row.avg__class__size;

        principalName = prevPrincipalName;
        facultyNum = prevFacultyNum;
        studentNum = prevStudentNum;
        classroomNum = prevClassroomNum;
        campusArea = prevCampusArea;
        avgClassSize = prevAvgClassSize;
      });
    });
  }

  function handleInputOnPrincipalNameInputElement(e) {
    principalName = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnFacultyNumInputElement(e) {
    facultyNum = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnClassroomNumInputElement(e) {
    classroomNum = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnStudentNumInputElement(e) {
    studentNum = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnAvgClassSizeInputElement(e) {
    avgClassSize = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function handleInputOnCampusAreaInputElement(e) {
    campusArea = e.currentTarget.value;
    validateNUnlockUpdateBtn();
  }

  function validateNUnlockUpdateBtn() {
    if (
      principalName &&
      facultyNum &&
      classroomNum &&
      studentNum &&
      avgClassSize &&
      campusArea &&
      !(
        principalName == prevPrincipalName &&
        campusArea == prevCampusArea &&
        classroomNum == prevClassroomNum &&
        facultyNum == prevFacultyNum &&
        studentNum == prevStudentNum &&
        avgClassSize == prevAvgClassSize
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
        .from("meta-data")
        .update({
          acre__campus: `${campusArea}`,
          avg__class__size: `${avgClassSize}`,
          classroom__number: `${classroomNum}`,
          faculty__number: `${facultyNum}`,
          principal__name: `${principalName}`,
          student__number: `${studentNum}`,
        })
        .eq("id", 1);

      if (error) {
        console.log("Error in updating meta data general: ", error);
        reject;
      }

      resolve(null);
    });
  }

  function handleClickOnUpdateBtn() {
    loader.style.display = "block";
    document.body.overflow = "hidden";
    updateMetaData().then(() => {
      handleFetchMetaData();
      updateBtn.style.opacity = "0.5";
      updateBtn.style.pointerEvents = "none";
      loader.style.display = "none";
      document.body.overflow = "auto";
    });
  }

  handleFetchMetaData();
  // ----------------------------------------------------- Events
  principalNameInputElement.addEventListener("input", (e) => {
    handleInputOnPrincipalNameInputElement(e);
  });
  facultiesNumInputElement.addEventListener("input", (e) => {
    handleInputOnFacultyNumInputElement(e);
  });
  classroomNumInputElement.addEventListener("input", (e) => {
    handleInputOnClassroomNumInputElement(e);
  });
  studentsNumInputElement.addEventListener("input", (e) => {
    handleInputOnStudentNumInputElement(e);
  });
  avgClassSizeInputElement.addEventListener("input", (e) => {
    handleInputOnAvgClassSizeInputElement(e);
  });
  campusAreaInputElement.addEventListener("input", (e) => {
    handleInputOnCampusAreaInputElement(e);
  });
  updateBtn.addEventListener("click", handleClickOnUpdateBtn);
};

export default getMetaData;
