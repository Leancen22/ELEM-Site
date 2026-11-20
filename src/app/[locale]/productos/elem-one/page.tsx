import type { Metadata } from 'next';
import { ProductPage } from '@/components/products/product-page';
import { products, productsCopy } from '@/content/products';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const p = products[locale].one;
  return buildMetadata({ title: p.metaTitle, description: p.metaDesc, locale, href: p.href });
}

export default async function ElemOnePage() {
  const locale = await getLocale();
  return <ProductPage product={products[locale].one} copy={productsCopy[locale]} />;
}
