function errorHandle(req, res) {
  res.status(404).json({
    status: 404,
    message: "This page doesn't exist",
  });
}
export default errorHandle