import axios from "axios";

const actionHandler = (payload) => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Cache-Control"] = "no-cache";

  const token = localStorage.getItem("admin-token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  return new Promise((resolve, reject) => {
    //Development
    payload.baseURL = "https://dev.enfono.com/api_encore_backend/api";

    axios(payload)
      .then((response) => {
        let resp = response.data;
        if (response.status >= 200 && response.status < 300) {
          resolve(response);
        } else {
          console.log("failure", response);
          reject(response);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const getActionErrorMessage = (err) => {
  console.log(err);
  if (err.response?.data?.message) {
    return "Error: " + err.response.data.message;
  } else {
    return err;
  }
};

axios.interceptors.response.use(undefined, function (err) {
  var statusCode = err.status;
  if (statusCode == undefined) {
    // Server needs to specify CORS headers in the response
    // Basically `ACCESS-CONTROL-ALLOW-ORIGIN: *`
    // Otherwise, these kinda issues happen

    var lineSplit = err.toString().split("\n")[0].split(" ");
    statusCode = lineSplit[lineSplit.length - 1];
  }

  console.log("intercepter statuscode: ", statusCode);
  // const history = useHistory();
  return new Promise(() => {
    if (statusCode == 401 && err.config && !err.config.__isRetryRequest) {
      // Got an unauthorized, logout the staff
      localStorage.removeItem("admin-token");
      window.location.pathname = "/auth/sign-in";
    }
    throw err;  
  });
});

export default {
  /* auth URLs */
  loginURL: "/auth/login/", // [POST]
  logoutURL: "auth/logout/", // [POST]
  profileURL: "auth/profile/", // [GET, PUT]

  actionHandler,
};
