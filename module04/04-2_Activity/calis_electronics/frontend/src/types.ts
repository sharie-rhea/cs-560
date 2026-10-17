export type ProductType = 'CPU' | 'GPU' | 'Motherboard' | 'Case' | 'PowerSupply' | 'RAM';

export interface ProductSpecs {
  brand?: string;
  model?: string;
  cores?: number;
  threads?: number;
  baseClock?: string;
  boostClock?: string;
  socket?: string;
  vram?: string;
  memoryType?: string;
  formFactor?: string;
  chipset?: string;
  memorySlots?: number;
  capacity?: string;
  speed?: string;
  size?: string;
  wattage?: number;
  efficiency?: string;
  [key: string]: string | number | undefined;
}

export interface Product {
  id: number;
  name: string;
  type: ProductType;
  price: number;
  description: string;
  specs: ProductSpecs;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  type: ProductType | null;
  minPrice: number | null;
  maxPrice: number | null;
}
