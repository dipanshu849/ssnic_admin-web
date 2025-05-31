import { supabase } from ".././supabaseClient";
import getMetaData from "./meta-data";
import getHeroImgs from "./hero-data";

const handleData = async () => {
  // console.log("getting meta data...");
  // getMetaData();
  getHeroImgs();
};

export default handleData;
