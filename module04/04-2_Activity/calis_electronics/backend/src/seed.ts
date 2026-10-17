import db, { initializeDatabase, ProductType, ProductSpecs } from './db';

interface SeedProduct {
  name: string;
  type: ProductType;
  price: number;
  description: string;
  specs: ProductSpecs;
}

const products: SeedProduct[] = [
  // CPUs
  {
    name: 'AMD Ryzen 9 7950X',
    type: 'CPU',
    price: 549.99,
    description: '16-core, 32-thread desktop processor with 5.7GHz max boost clock',
    specs: {
      brand: 'AMD',
      cores: 16,
      threads: 32,
      baseClock: '4.5 GHz',
      boostClock: '5.7 GHz',
      socket: 'AM5',
    },
  },
  {
    name: 'Intel Core i9-14900K',
    type: 'CPU',
    price: 589.99,
    description: '24-core (8P+16E) desktop processor with up to 6.0GHz turbo',
    specs: {
      brand: 'Intel',
      cores: 24,
      threads: 32,
      baseClock: '3.2 GHz',
      boostClock: '6.0 GHz',
      socket: 'LGA1700',
    },
  },
  {
    name: 'AMD Ryzen 5 7600X',
    type: 'CPU',
    price: 229.99,
    description: '6-core, 12-thread processor, excellent for gaming',
    specs: {
      brand: 'AMD',
      cores: 6,
      threads: 12,
      baseClock: '4.7 GHz',
      boostClock: '5.3 GHz',
      socket: 'AM5',
    },
  },

  // GPUs
  {
    name: 'NVIDIA GeForce RTX 4090',
    type: 'GPU',
    price: 1599.99,
    description: 'Ultimate gaming GPU with 24GB GDDR6X memory and DLSS 3',
    specs: {
      brand: 'NVIDIA',
      vram: '24GB',
      memoryType: 'GDDR6X',
    },
  },
  {
    name: 'AMD Radeon RX 7900 XTX',
    type: 'GPU',
    price: 949.99,
    description: 'High-performance GPU with 24GB GDDR6 for 4K gaming',
    specs: {
      brand: 'AMD',
      vram: '24GB',
      memoryType: 'GDDR6',
    },
  },
  {
    name: 'NVIDIA GeForce RTX 4070',
    type: 'GPU',
    price: 549.99,
    description: 'Excellent 1440p gaming performance with 12GB VRAM',
    specs: {
      brand: 'NVIDIA',
      vram: '12GB',
      memoryType: 'GDDR6X',
    },
  },

  // Motherboards
  {
    name: 'ASUS ROG Maximus Z790 Hero',
    type: 'Motherboard',
    price: 629.99,
    description: 'Premium Intel Z790 motherboard for enthusiasts',
    specs: {
      brand: 'ASUS',
      formFactor: 'ATX',
      chipset: 'Z790',
      socket: 'LGA1700',
      memorySlots: 4,
    },
  },
  {
    name: 'MSI MAG X670E TOMAHAWK',
    type: 'Motherboard',
    price: 299.99,
    description: 'Feature-rich AM5 motherboard with DDR5 support',
    specs: {
      brand: 'MSI',
      formFactor: 'ATX',
      chipset: 'X670E',
      socket: 'AM5',
      memorySlots: 4,
    },
  },
  {
    name: 'Gigabyte B650 AORUS Elite AX',
    type: 'Motherboard',
    price: 229.99,
    description: 'Mid-range AM5 board with WiFi 6E and PCIe 5.0',
    specs: {
      brand: 'Gigabyte',
      formFactor: 'ATX',
      chipset: 'B650',
      socket: 'AM5',
      memorySlots: 4,
    },
  },

  // Cases
  {
    name: 'Corsair 5000D Airflow',
    type: 'Case',
    price: 174.99,
    description: 'Mid-tower case with excellent airflow and cable management',
    specs: {
      brand: 'Corsair',
      formFactor: 'Mid Tower',
      size: 'ATX',
    },
  },
  {
    name: 'NZXT H7 Flow',
    type: 'Case',
    price: 129.99,
    description: 'Clean aesthetics with high airflow mesh front panel',
    specs: {
      brand: 'NZXT',
      formFactor: 'Mid Tower',
      size: 'ATX',
    },
  },
  {
    name: 'Lian Li O11 Dynamic EVO',
    type: 'Case',
    price: 169.99,
    description: 'Versatile dual-chamber case for custom loops',
    specs: {
      brand: 'Lian Li',
      formFactor: 'Mid Tower',
      size: 'ATX',
    },
  },

  // Power Supplies
  {
    name: 'Corsair RM1000x',
    type: 'PowerSupply',
    price: 189.99,
    description: '1000W fully modular power supply with 80+ Gold',
    specs: {
      brand: 'Corsair',
      wattage: 1000,
      efficiency: '80+ Gold',
    },
  },
  {
    name: 'EVGA SuperNOVA 850 G7',
    type: 'PowerSupply',
    price: 149.99,
    description: '850W fully modular PSU with 80+ Gold certification',
    specs: {
      brand: 'EVGA',
      wattage: 850,
      efficiency: '80+ Gold',
    },
  },
  {
    name: 'Seasonic PRIME TX-1000',
    type: 'PowerSupply',
    price: 289.99,
    description: '1000W Titanium-rated PSU with 12-year warranty',
    specs: {
      brand: 'Seasonic',
      wattage: 1000,
      efficiency: '80+ Titanium',
    },
  },

  // RAM
  {
    name: 'G.Skill Trident Z5 RGB 32GB',
    type: 'RAM',
    price: 159.99,
    description: 'DDR5-6000 CL30 dual channel memory kit with RGB',
    specs: {
      brand: 'G.Skill',
      capacity: '32GB (2x16GB)',
      speed: 'DDR5-6000',
      memoryType: 'DDR5',
    },
  },
  {
    name: 'Corsair Vengeance DDR5 64GB',
    type: 'RAM',
    price: 229.99,
    description: 'DDR5-5600 64GB kit for content creators',
    specs: {
      brand: 'Corsair',
      capacity: '64GB (2x32GB)',
      speed: 'DDR5-5600',
      memoryType: 'DDR5',
    },
  },
  {
    name: 'Kingston Fury Beast 16GB',
    type: 'RAM',
    price: 59.99,
    description: 'DDR5-5200 budget-friendly kit for everyday builds',
    specs: {
      brand: 'Kingston',
      capacity: '16GB (2x8GB)',
      speed: 'DDR5-5200',
      memoryType: 'DDR5',
    },
  },
];

async function seed(): Promise<void> {
  console.log('Initializing database...');
  await initializeDatabase();

  // Check if products already exist
  const existingProducts = await db.selectFrom('products').selectAll().execute();
  if (existingProducts.length > 0) {
    console.log(`Database already has ${existingProducts.length} products. Skipping seed.`);
    return;
  }

  console.log('Seeding database...');

  for (const product of products) {
    await db
      .insertInto('products')
      .values({
        name: product.name,
        type: product.type,
        price: product.price,
        description: product.description,
        specs: JSON.stringify(product.specs),
      })
      .execute();
  }

  console.log(`Seeded ${products.length} products successfully!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
