const errorHandler = (err, req, res, next) => { 
    // console.log('Error:', err.message); 
    const statusCode = err.statusCode || 500; 
    let errorMessage;
    if (process.env.NODE_ENV === 'development') { 
      errorMessage = err.message;
    } else { 
      errorMessage = 'Something went wrong. Please try again later.';
    }
    res.status(statusCode).json({
      error: errorMessage
    });
  };
  
  module.exports = errorHandler;