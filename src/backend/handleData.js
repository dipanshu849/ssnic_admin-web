import { supabase } from ".././supabaseClient";
import getMetaData from "./meta-data";
import getImgs from "../utils/crud-data.js";
import drapDrop from "../utils/drap-drop.js";
import showCalendar from "../utils/calender.js";

const handleData = async () => {
  // getMetaData();

  const typeArr = ["hero", "about", "msg"];
  const folderArr = ["hero", "about", "msg"];
  typeArr.forEach((type, index) => {
    getImgs(type, folderArr[index]);
    drapDrop(type, folderArr[index]);
  });

  // getImgs and draDrop for gallery called from
  showCalendar.showMonthCalendar();

  // getImgs and draDrop for news called from
  showCalendar.showNewsLabel();
};

export default handleData;
