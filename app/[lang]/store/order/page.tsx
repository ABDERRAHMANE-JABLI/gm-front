import type { Metadata } from 'next';
import StoreLayout from '@/components/layout/StoreLayout';
import OrderPage from '@/page-components/Store/OrderPage';
import { CartProvider } from '@/lib/context/CartContext';

export const metadata: Metadata = {
  title: "Commande | Gault&Millau Maroc",
  robots: { index: false, follow: false },
};

export default async function OrderPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang === 'en' ? 'en' : 'fr';

  return (
    <CartProvider>
      <StoreLayout lang={lang}>
        <OrderPage lang={lang} />
      </StoreLayout>
    </CartProvider>
  );
}
