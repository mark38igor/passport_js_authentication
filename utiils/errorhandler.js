let errorHandler = (error, req, res, next) => {
  let status = error.status != undefined ? error.status : 500;
  let errorObj = {
    status: status,
    message: error.message != undefined ? error.message : "Internal Error",
  };
  if (process.env.ENV == "development") errorObj.stack = error.stack;

  res.status(status).json(errorObj);
};

module.exports = errorHandler;
