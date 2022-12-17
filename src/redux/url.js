const baseUrl =
  process.env.NODE_ENV == "development"
    ? "https://coursera-production.up.railway.app"
    : "https://coursera-production.up.railway.app";
export default baseUrl;

// const baseUrl =
//   process.env.NODE_ENV == "development"
//     ? "https://life-staking-bridge.herokuapp.com"
//     : "https://life-staking-bridge.herokuapp.com";
// export default baseUrl;

// const baseUrl =
//   process.env.NODE_ENV == "development"
//     ? "http://localhost:8080"
//     : "http://localhost:8080";
// export default baseUrl;
