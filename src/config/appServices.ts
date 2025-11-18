import { ListProductsDeps } from '../app/list-products';
import { UpsertProductDeps } from '../app/upsert-product';
import { ProductRepo } from '../domain/product-repo';
import type { Product } from '../domain/product';
import { FakeProductRepo } from '../infra/fake-product-repo';

let cachedProductRepo: ProductRepo | null = null;

export const getProductRepo = (): ProductRepo => {
  if (!cachedProductRepo) {
    const now = new Date();
    const initialProducts: Product[] = [
      {
        id: '007',
        name: 'CR7 Jersey',
        pricePence: 1299,
        description: 'Goat Jersey',
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: '008',
        name: 'Lionel Messi Jersey',
        pricePence: 2599,
        description: 'Another Goat Jersey.',
        updatedAt: now,
      },
    ];
    cachedProductRepo = new FakeProductRepo(initialProducts);
  }
  return cachedProductRepo;
};

export const makeListProductsDeps = (): ListProductsDeps => ({
  productRepo: getProductRepo(),
});

export const makeUpsertProductDeps = (): UpsertProductDeps => ({
  productRepo: getProductRepo(),
  now: () => new Date(),
});
