module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://tchang@localhost/coeus_system",
  REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL || "http://localhost:3000"
};

// "https://coeus-system-inc.herokuapp.com/inventory"
