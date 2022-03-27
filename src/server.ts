import app from '@my-wallet/app'

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Running at port ${process.env.SERVER_PORT}`)
)
