const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Something went wrong';
    
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorHandler;