module.exports = {
  PORT: process.env.PORT || 8000,

  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://coeus-systems-sand-sigma.now.sh/"
  //NODE_ENV: process.env.NODE_ENV || "development"
};
