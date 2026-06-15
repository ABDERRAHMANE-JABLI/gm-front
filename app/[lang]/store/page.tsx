import StoreLayout from '@/components/layout/StoreLayout';
import StorePage from '@/page-components/Store/StorePage';
import { CartProvider } from '@/lib/context/CartContext';

export default async function StorePageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang === 'en' ? 'en' : 'fr';

  return (
    <CartProvider>
      <StoreLayout lang={lang}>
        <StorePage />
      </StoreLayout>
    </CartProvider>
  );
}
