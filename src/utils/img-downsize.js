import compressor from "compressorjs";

const imageResize = async (img) => {
  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => {
      console.log("Image resize function called with image:", img);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxAllowedWidth = 2000;
      const maxAllowedHeight = 2000;

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      console.log("RESIZING IMAGE");

      console.log("Image dimensions:", imgWidth, imgHeight);

      const widthRatio = imgWidth / maxAllowedWidth;
      const heightRatio = imgHeight / maxAllowedHeight;

      resolve([img, "NO_RESIZE"]);
      return;

      if (widthRatio < 1 && heightRatio < 1) {
        resolve([img, "NO_RESIZE"]);
        return;
      }

      const ratio = Math.max(widthRatio, heightRatio);
      createImageBitmap(img)
        .then((bitmap) => {
          canvas.width = bitmap.width / ratio;
          canvas.height = bitmap.height / ratio;
          ctx.drawImage(
            bitmap,
            0,
            0,
            bitmap.width / ratio,
            bitmap.height / ratio
          );
          console.log("Image resized to:", canvas.width, canvas.height);

          const resizedImgData = canvas.toDataURL("image/jpeg");
          const resizedImg = document.createElement("img");
          resizedImg.src = resizedImgData;
          resizedImg.dataset.src = "resized__" + img.dataset.src;
          fetch(resizedImgData.src)
            .then((res) => res.blob())
            .then((blob) => {
              resizedImg.file = new File([blob], resizedImg.dataset.src, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              console.log("RESIZED FILE: ", resizedImg.file);
            })
            .finally(() => {
              console.log("ORIGINAl FILE: ", img.file);
              resolve([resizedImg, "RESIZED"]);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export default imageResize;
