const Stuff = require("../models/stuff")

exports.create = (req: any, res: any, next: any): void => {
  const stuff = new Stuff({
    ...req.body,
  })
  stuff.save().then((stuff: any) => res.status(201).json(stuff))
}

exports.findOne = (req: any, res: any, next: any) => {
  const id = req.params.id
  Stuff.findOne({ _id: id })
    .then((stuff: any) => res.status(200).json(stuff))
    .catch((err: Error) => res.status(400).json({ error: err }))
}

exports.findAll = (req: any, res: any, next: any) => {
  Stuff.find()
    .then((stuff: any) => res.status(200).json(stuff))
    .catch((err: Error) => res.status(400).json({ error: err }))
}

exports.edit = (req: any, res: any, next: any) => {
  const id = req.params.id

  Stuff.updateOne(
    { _id: id },
    {
      ...req.body,
      _id: id,
    }
  )
    .then((stuff: any) =>
      res.status(201).json({
        stuff: stuff,
        status: "ok",
        message: "stuff updated",
      })
    )
    .catch((err: Error) => res.status(400).json({ error: err }))
}

exports.delete = (req: any, res: any, next: any) => {
  const id = req.params.id

  Stuff.deleteOne({ _id: id })
    .then(() =>
      res.status(201).json({
        status: "ok",
        message: "stuff deleted",
      })
    )
    .catch((err: Error) => res.status(400).json({ error: err }))
}
