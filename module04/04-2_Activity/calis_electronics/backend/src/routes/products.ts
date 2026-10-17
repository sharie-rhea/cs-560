import { Router, Request, Response } from 'express';
import db, { ProductType, Product, ProductSpecs } from '../db';

const router = Router();

const VALID_TYPES: ProductType[] = ['CPU', 'GPU', 'Motherboard', 'Case', 'PowerSupply', 'RAM'];

// GET /api/products - List all products with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { type, minPrice, maxPrice } = req.query;

    let query = db.selectFrom('products').selectAll();

    // Filter by product type
    if (type && typeof type === 'string') {
      if (VALID_TYPES.includes(type as ProductType)) {
        query = query.where('type', '=', type as ProductType);
      }
    }

    // Filter by minimum price
    if (minPrice && !isNaN(Number(minPrice))) {
      query = query.where('price', '>=', Number(minPrice));
    }

    // Filter by maximum price
    if (maxPrice && !isNaN(Number(maxPrice))) {
      query = query.where('price', '<=', Number(maxPrice));
    }

    // Order by type, then by price
    query = query.orderBy('type').orderBy('price');

    const results = await query.execute();

    // Parse specs JSON for each product
    const products: Product[] = results.map((row) => ({
      id: row.id,
      name: row.name,
      type: row.type,
      price: row.price,
      description: row.description,
      specs: JSON.parse(row.specs) as ProductSpecs,
    }));

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/types - Get list of available product types
router.get('/types', (_req: Request, res: Response) => {
  res.json(VALID_TYPES);
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db
      .selectFrom('products')
      .selectAll()
      .where('id', '=', Number(id))
      .executeTakeFirst();

    if (!result) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const product: Product = {
      id: result.id,
      name: result.name,
      type: result.type,
      price: result.price,
      description: result.description,
      specs: JSON.parse(result.specs) as ProductSpecs,
    };

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
