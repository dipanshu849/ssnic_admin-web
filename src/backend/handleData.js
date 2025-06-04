import { supabase } from ".././supabaseClient";
import getMetaData from "./meta-data";
import getImgs from "../utils/get-data.js";
import drapDrop from "../utils/drap-drop.js";
import showMonthCalendar from "../utils/calender.js";

const handleData = async () => {
  // getMetaData();

  const typeArr = ["hero", "about", "msg"];
  const folderArr = ["hero", "about", "msg"];
  typeArr.forEach((type, index) => {
    getImgs(type, folderArr[index]);
    drapDrop(type, folderArr[index]);
  });

  // getImgs and draDrop for gallery called from
  showMonthCalendar();
};

export default handleData;
