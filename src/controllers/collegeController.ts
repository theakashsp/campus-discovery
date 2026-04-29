import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const colleges = await prisma.college.findMany({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const total = await prisma.college.count();

    res.json({
      data: colleges,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCollegeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      res.status(404).json({ error: 'College not found' });
      return;
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, location, course } = req.query;

    const whereClause: any = {};
    if (name) {
      whereClause.name = { contains: name as string, mode: 'insensitive' };
    }
    if (location) {
      whereClause.location = { contains: location as string, mode: 'insensitive' };
    }
    if (course) {
      whereClause.courses = { has: course as string };
    }

    const colleges = await prisma.college.findMany({
      where: whereClause,
    });

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
