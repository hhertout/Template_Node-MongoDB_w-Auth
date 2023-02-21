exports.config = (req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
}
