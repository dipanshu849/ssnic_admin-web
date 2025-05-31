import { supabase } from ".././supabaseClient";

const getMetaData = async () => {
  const fetchMetaData = async () => {
    const { data, error } = await supabase.from("meta-data").select("views");
    let views = data[0].views;
    return views;
  };

  const viewsHolder = document.querySelector(".hero__views span");

  const startSpinner = () => {
    viewsHolder.innerHTML = "fetching";
  };

  startSpinner();

  fetchMetaData()
    .then((views) => {
      viewsHolder.textContent = views || 0;
      console.log("Meta data fetched successfully.");
    })
    .catch((error) => {
      console.error("Error fetching meta data:", error);
      viewsHolder.textContent = "Error";
    });
};

export default getMetaData;
