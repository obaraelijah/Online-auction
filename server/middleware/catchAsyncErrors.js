//Error handling middleware that wraps the provided function inside a promise and catches any errors.
export default (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };