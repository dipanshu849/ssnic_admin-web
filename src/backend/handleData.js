import { supabase } from ".././supabaseClient";
import getImgs from "../utils/crud-section-data.js";
import drapDrop from "../utils/drap-drop.js";
import showCalendar from "../utils/calender.js";
import crudTableData from "../utils/crud-table-data.js";
import getMetaDataGeneral from "./meta-data-general.js";
import getMetaDataHeader from "./meta-data-header.js";
import getMetaDataFooter from "./meta-data-footer.js";

const handleData = async () => {
  getMetaDataGeneral();
  getMetaDataHeader();
  getMetaDataFooter();

  // const typeArr = ["hero", "about", "msg"];
  // const folderArr = ["hero", "about", "msg"];
  // typeArr.forEach((type, index) => {
  //   getImgs(type, folderArr[index]);
  //   drapDrop(type, folderArr[index]);
  // });

  // getImgs and draDrop for gallery called from
  // showCalendar.showMonthCalendar();

  // getImgs and draDrop for news called from
  // showCalendar.showNewsLabel();

  // // events table
  // crudTableData("events-table");

  // // athletics table
  // crudTableData("athletics-table");

  // // circulars table
  // crudTableData("circulars-table");
};

export default handleData;
