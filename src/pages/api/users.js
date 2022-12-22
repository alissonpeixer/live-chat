import socket from "./socket"

const dataBaseUsers = []

const users = async (req, res) => {

  if (req.method === 'POST') {
    if (!req.body) return res.status(404).json({ message: 'Req body data notfound' })
    dataBaseUsers.push(JSON.parse(req.body))
  }


  res.status(200).json(dataBaseUsers)

  res.end();
}




export default users
