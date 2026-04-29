import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import prisma from '../prismaClient';

export const getFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const favorites = await prisma.favorite.findMany({
      where: { user_id: userId },
      include: {
        college: true,
      },
    });

    res.json(favorites.map(f => f.college));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { collegeId } = req.body;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const favorite = await prisma.favorite.create({
      data: {
        user_id: userId,
        college_id: parseInt(collegeId),
      },
    });

    res.status(201).json(favorite);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Already added to favorites' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const collegeId = parseInt(req.params.id);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    await prisma.favorite.deleteMany({
      where: {
        user_id: userId,
        college_id: collegeId,
      },
    });

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
