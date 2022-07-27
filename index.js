const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // return the created id of image in cloud
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

const createImageTag = (publicId, ...colors) => {
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};

(async () => {
  // Set the image to upload
  const imagePath = "https://source.unsplash.com/QDq3YliZg48";
  // Upload the image
  const publicId = await uploadImage(imagePath);
  // Get the colors in the image
  const colors = await getAssetInfo(publicId);
  // Create an image tag, using two of the colors in a transformation
  const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);
  // Log the image tag to the console
  console.log(imageTag);
})();
