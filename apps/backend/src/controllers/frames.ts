const { Frame } = require("../model");
export default async (req, res) => {
  const demos = await Frame.findAll({
    order: [["order", "ASC"]],
  });

  res.status(200).json(demos);
};
