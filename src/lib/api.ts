import { unstable_rethrow } from "next/navigation";
import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request<T>(path: string): Promise<T | null> {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (res.status === 404) return null;
      if (res.ok) return (await res.json()) as T;
    } catch (error) {
      unstable_rethrow(error);
    }
  }
  throw new Error("Could not load data from the BazarDor API");
}

export async function getProducts(): Promise<Product[]> {
  return (await request<Product[]>("/products")) ?? [];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return (await request<Product[]>(`/products?category=${encodeURIComponent(slug)}`)) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return (await request<Category[]>("/categories")) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}
