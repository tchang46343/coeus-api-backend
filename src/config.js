module.exports = {
  PORT: process.env.PORT || 8000,

  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://coeus-system-inc.herokuapp.com/inventory"
  //NODE_ENV: process.env.NODE_ENV || "development"
};
