const errorMiddleware = (error, request, response, next) => {
  console.error(error.stack);

  response.status(500).send('Something went wrong. Try again later');
}

export default errorMiddleware;