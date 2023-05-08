// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const {uid} = req.body
    console.log("uid", uid)
    res.status(200).json({ name: 'John Doe' })

  }

  