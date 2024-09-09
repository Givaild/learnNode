import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

// app.get("/users", async (req, res) => {
//   const allUser = await prisma.user.findMany();
//   res.status(200).json(allUser);
// });

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuário deletado com Sucesso" });
});

//req params ou filtros
app.get("/users", async (req, res) => {
  let usersFiltered = [];

  if (req.query) {
    usersFiltered = await prisma.user.findMany({
      where: {
        age: parseInt(req.query.age),
      },
    });
  } else {
    const allUser = await prisma.user.findMany();
  }
  res.status(200).json(usersFiltered);
});

app.listen(3000);
