



// const export uploadToCloudnary = async (file: any) => {
//     const cloud_name = "dey2bny4v"; // Replace with your Cloudinary cloud name
//     const upload_preset = "Swastik"; // Replace with your Cloudinary upload preset
//     const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", upload_preset);
//     data.append("cloud_name", cloud_name);

//     const response = await fetch(url, {
//         method: "POST",
//         body: data
//     });
//     const fileData = await response.json();
//     console.log("image url", fileData.url);
//     return fileData.url;
// };



export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);

  const response = await fetch(url, {
    method: "POST",
    body: data,
  });

  const fileData = await response.json();
  return fileData.secure_url; // ✅ always use secure_url
};
