let baseUrl = "";
if (window.location.host === "tilt-entreprise.com") {
  baseUrl = "https://api.tilt-entreprise.com";
} else if (window.location.host === "tilt-demo.web.app") {
  baseUrl = "https://tilt.falconit.com.pk";
} else {
  baseUrl = "http://localhost:5001";
}
module.exports = { baseUrl };
