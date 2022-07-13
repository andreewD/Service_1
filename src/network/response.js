const response = ({ error, message, res, status }) => {
    res.status(status).send({ error, message })
  }
  
  export { response }
  