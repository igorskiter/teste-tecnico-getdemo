const { Frame } = require("../model");
export const get = async (req, res) => {
  const demos = await Frame.findAll({
    order: [["order", "ASC"]],
  });

  res.status(200).json(demos);
};

export const put = async (req, res) => {
  const { id } = req.params;
  const { html, order } = req.body;

  try {
    const frameUpdate = await Frame.update(
      { html, order },
      {
        where: {
          id,
        },
      }
    );

    if (frameUpdate[0] > 0) {
      res.status(200).json({ success: true });
      return;
    }

    res.status(400).json({ error: "Nenhum dado foi atualizado!" });
  } catch (error: any) {
    console.log(error);
    res.status(error.status || 500).json({
      status: "error",
      error: {
        message:
          error.message ||
          "Error desconhecido, por favor entre em contato com suporte!",
      },
    });
  }
};
