let baseUrl = "";
let stripePK = "";
if (window.location.host === "tilt-entreprise.com") {
  baseUrl = "https://api.tilt-entreprise.com";
  stripePK =
    "pk_live_51HP8kaHGSbISa9fGK59s7FNHtZnN9Qyu2jMRnstn2CctiEHA068taLUVPOYdBqRwsX3QXnc5dPgLBze1EDewv48400NTFqq9zo";
} else if (window.location.host === "tilt-demo.web.app") {
  baseUrl = "https://tilt.falconit.com.pk";
   stripePK =
    "pk_test_51HP8kaHGSbISa9fG1l5tEVjuq2XDBuRsbMuL69zACdjXtVoPcAW7rh0kDeXTlSNvtqR7mr9SVRys0a8EXk5SeB3O00NtxxQYAV";
} else {
  baseUrl = "http://localhost:5001";
   stripePK =
    "pk_test_51HP8kaHGSbISa9fG1l5tEVjuq2XDBuRsbMuL69zACdjXtVoPcAW7rh0kDeXTlSNvtqR7mr9SVRys0a8EXk5SeB3O00NtxxQYAV";
}

module.exports = { baseUrl, stripePK };
