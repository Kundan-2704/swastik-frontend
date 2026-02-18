const optimizeImage = (url: string, width?: number) => {
  if (!url || !url.includes("/upload/")) return url;

  const parts = url.split("/upload/");

  const transformations = width
    ? `f_auto,q_auto,w_${width}`
    : `f_auto,q_auto`;

  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};

export default optimizeImage;
