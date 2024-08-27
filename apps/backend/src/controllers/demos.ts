const { Demo } = require("../model");
export default async (req, res) => {
  const demos = await Demo.findAll();

  res.status(200).json(demos);
};
