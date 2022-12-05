import configFile from "../config.json";
const fileService = {
  uploadFile: async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ksjzo3yu");
    try {
      let res = await fetch(configFile.cloudinary, {
        method: "post",
        body: data,
      });
      const urlData = await res.json();
      return urlData.url;
    } catch (error) {
      console.log(error);
    }
  },
};

export default fileService;
