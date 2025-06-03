import { supabase } from ".././supabaseClient";
import getMetaData from "./meta-data";
import getHeroImgs from "../utils/get-data.js";
import drapDrop from "../utils/drap-drop.js";

const handleData = async () => {
  // getMetaData();

  const typeArr = ["hero", "about", "msg"];
  const folderArr = ["hero", "about", "msg"];
  typeArr.forEach((type, index) => {
    getHeroImgs(type, folderArr[index]);
    drapDrop(type, folderArr[index]);
  });
};

export default handleData;
