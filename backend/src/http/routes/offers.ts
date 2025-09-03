import { Router, Request, Response } from 'express';
import { OfferQueryService } from '../../services/queryOffers.js';
import { QueryFilters } from '../../domain/offer.js';

const router = Router();
const offerService = new OfferQueryService();

function parseArrayParam(param: any): string[] | undefined {
  if (!param) return undefined;
  if (Array.isArray(param)) return param;
  if (typeof param === 'string') return param.split(',');
  return [String(param)];
}

function parseNumberParam(param: any): number | undefined {
  if (!param) return undefined;
  const num = Number(param);
  return isNaN(num) ? undefined : num;
}

router.get('/', (req: Request, res: Response) => {
  try {
    const filters: QueryFilters = {
      level: parseArrayParam(req.query.level) as QueryFilters['level'],
      kind: parseArrayParam(req.query.kind) as QueryFilters['kind'],
      minPrice: parseNumberParam(req.query.minPrice),
      maxPrice: parseNumberParam(req.query.maxPrice),
      search: req.query.search as string,
      sortBy: req.query.sortBy as QueryFilters['sortBy'],
      sortOrder: req.query.sortOrder as QueryFilters['sortOrder'],
      page: parseNumberParam(req.query.page) || 1,
      limit: parseNumberParam(req.query.limit) || 10,
      fields: parseArrayParam(req.query.fields) as QueryFilters['fields']
    };

    const result = offerService.queryOffers(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
