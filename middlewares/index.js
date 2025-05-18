import axios from "axios";

// Base metadata URL
const METADATA_URL = "http://169.254.169.254/latest";
const TOKEN_URL = `${METADATA_URL}/api/token`;

async function getMetadataToken() {
  try {
    const response = await axios.put(TOKEN_URL, null, {
      headers: {
        "X-aws-ec2-metadata-token-ttl-seconds": "21600",
      },
      timeout: 1000,
    });
    return response.data;
  } catch (err) {
    console.error("Failed to retrieve metadata token:", err.message);
    return null;
  }
}

async function getMetadata(path, token) {
  try {
    const response = await axios.get(`${METADATA_URL}/meta-data/${path}`, {
      headers: {
        "X-aws-ec2-metadata-token": token,
      },
      timeout: 1000,
    });
    return response.data;
  } catch (err) {
    console.error(`Error fetching metadata [${path}]:`, err.message);
    return null;
  }
}

const getAllMetaData = async (req, _, next) => {
  const token = await getMetadataToken();
  if (!token) {
    req.metadata = null;
    next();
    return;
  }

  const availabilityZone = await getMetadata(
    "placement/availability-zone",
    token
  );
  const instanceId = await getMetadata("instance-id", token);
  req.metadata = {
    availabilityZone,
    instanceId,
  };

  next();
};

export { getAllMetaData };
