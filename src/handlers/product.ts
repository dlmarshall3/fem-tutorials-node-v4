import prisma from "../db";

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

export const getProductById = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const updateProduct = async (
  req: {
    user: any;
    params: { id: any };
    body: { name: any };
  },
  res: {
    json: (arg0: {
      data: { id: string; createdAt: Date; name: string; belongsToId: string };
    }) => void;
  }
) => {
  const product = await prisma.product.update({
    where: {
      id: req.params.id,
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: product });
};

export const deleteProduct = async (req, res) => {
  const product = await prisma.product.delete({
    where: {
      id: req.params.id,
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: product });
};
