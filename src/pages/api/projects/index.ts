import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;

  const results = await prisma.projects.create({
    data: {
      name,
    },
  });
  res.status(200).json(results);
}
