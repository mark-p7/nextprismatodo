import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the id from the URL
  const { id } = req.query;

  // Parse the route id
  const rid: number | undefined = parseInt(req.body.id) || parseInt(id as string);

  // Create a new project
  if (req.method === "POST") {
    const { name } = req.body;

    const results = await prisma.projects.create({
      data: {
        name,
      },
    });
    res.status(200).json(results);
  }

  // Check if the id is valid
  if (!rid) return res.status(400).json({ error: "Invalid id" });

  // Update a project
  if (req.method === "PUT") {
    const { name } = req.body;

    const results = await prisma.projects.update({
      where: {
        id: rid,
      },
      data: {
        name,
      },
    });
    res.status(200).json(results);
  }

  // Get a project
  if (req.method === "GET") {
    const results = await prisma.projects.findUnique({
      where: {
        id: rid,
      },
    });
    res.status(200).json(results);
  }

  // Delete a project
  if (req.method === "DELETE") {
    const results = await prisma.projects.delete({
      where: {
        id: rid,
      },
    });
    res.status(200).json(results);
  }
}
