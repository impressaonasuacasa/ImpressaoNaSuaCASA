import { useState, useEffect } from 'react';
import { Shield, Sparkles, Award, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import SimulatorA4 from './components/SimulatorA4';
import RelatedProducts from './components/RelatedProducts';
import Faq from './components/Faq';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartItem } from './types';

// Import our beautiful generated e-commerce product image
import sulfiteImg from './assets/images/sulfite_1782918112293.jpg';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string>(sulfiteImg);
  const [comingSoonProduct, setComingSoonProduct] = useState<string | null>(null);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart_impressao_a4');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Falha ao carregar o carrinho do localStorage', e);
    }
  }, []);

  // Save cart to LocalStorage whenever it changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('cart_impressao_a4', JSON.stringify(updatedCart));
    } catch (e) {
      console.error('Falha ao salvar o carrinho no localStorage', e);
    }
  };

  const handleAddToCart = (item: Omit<CartItem, 'id' | 'timestamp'>) => {
    const newItem: CartItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };
    const updated = [...cart, newItem];
    saveCartToStorage(updated);
    setIsCartOpen(true); // Open the cart immediately on add for high e-commerce conversion feedback
  };

  const handleRemoveItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const handleSelectComingSoon = (productName: string) => {
    setComingSoonProduct(productName);
    setTimeout(() => setComingSoonProduct(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 antialiased flex flex-col justify-between pt-24">
      {/* Navigation Header */}
      <Header cart={cart} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex-1 space-y-8">
        
        {/* Core Product Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm">
          
          {/* LEFT COLUMN: E-commerce Gallery & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Large Product Image container */}
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shadow-inner relative group">
              <img
                src={activePhoto}
                alt="Impressão A4 Sulfite 75g - Premium"
                className="object-cover w-full h-full group-hover:scale-102 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-white" />
                Entrega em Domicílio
              </span>
            </div>

            {/* Thumbnail Gallery & Interactive Micro-states */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setActivePhoto(sulfiteImg)}
                className={`aspect-square rounded-lg overflow-hidden border-2 bg-slate-50 transition ${
                  activePhoto === sulfiteImg ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img src={sulfiteImg} alt="Thumbnail 1" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
              </button>
              
              {/* Dummy styled thumbnails to make the e-commerce design feel rich & professional */}
              <div className="aspect-square rounded-lg border border-slate-250 bg-slate-50 flex flex-col items-center justify-center text-center p-1 text-slate-400 select-none">
                <span className="text-xs font-black text-slate-500">A4</span>
                <span className="text-[8px] uppercase tracking-wider font-bold">210x297mm</span>
              </div>
              <div className="aspect-square rounded-lg border border-slate-250 bg-slate-50 flex flex-col items-center justify-center text-center p-1 text-slate-400 select-none">
                <span className="text-xs font-black text-slate-500">75g</span>
                <span className="text-[8px] uppercase tracking-wider font-bold">Sulfite</span>
              </div>
              <div className="aspect-square rounded-lg border border-slate-250 bg-slate-50 flex flex-col items-center justify-center text-center p-1 text-slate-400 select-none">
                <span className="text-xs font-black text-slate-500">HD</span>
                <span className="text-[8px] uppercase tracking-wider font-bold">Resolução</span>
              </div>
            </div>

            {/* Quality Seal / Conversion Badges */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-extrabold tracking-widest text-slate-400 uppercase block">Garantia e Segurança</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <Award className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Papel Ultra-Branco</span>
                    <span className="text-slate-500">Brancura perfeita para contraste ideal de texto.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Análise Técnica Prévia</span>
                    <span className="text-slate-500">Analisamos seu arquivo antes de imprimir.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 col-span-1 md:col-span-2 border-t border-slate-200 pt-3">
                  <RotateCcw className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Embalagem Protetora Anti-Umidade</span>
                    <span className="text-slate-500 text-[11px] leading-relaxed">
                      Todas as folhas são entregues acondicionadas em embalagem especial selada, protegendo as impressões contra poeira, rasgos ou umidade durante o transporte em Guarujá.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: E-commerce Checkout, Description & Price Simulator */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Breadcrumb / Category */}
            <nav className="text-xs text-slate-400 font-semibold space-x-1" aria-label="Navegação de categorias">
              <span className="hover:text-slate-600 cursor-pointer">Impressão</span>
              <span>/</span>
              <span className="hover:text-slate-600 cursor-pointer">Guarujá</span>
              <span>/</span>
              <span className="text-slate-800 font-bold">Impressão A4</span>
            </nav>

            {/* Product Title & Ratings */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">Papelaria &amp; Documentos</div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight font-display">
                Impressão A4 — Sulfite Premium 75g
              </h1>
              
              {/* Star reviews */}
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="flex items-center text-amber-400 font-black">
                  {'★'.repeat(5)}
                </div>
                <span className="font-bold text-slate-800">4.9</span>
                <span>(142 avaliações de clientes em Guarujá)</span>
              </div>
            </div>

            {/* Rich Description */}
            <div className="space-y-4">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Nosso serviço de impressão A4 em papel sulfite de alta alvura (75g) garante documentos nítidos e legíveis. Perfeito para apostilas, e-books, boletos, relatórios de trabalho, contratos, receitas e tarefas escolares.
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Papel de Reflorestamento Sustentável
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Cores Vivas e Preto Ultra-Nítido
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Pronto para Encadernação ou Fichários
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Frete Grátis incluso em Guarujá
                </li>
              </ul>
            </div>

            {/* Price Simulator Integrated Card */}
            <SimulatorA4 onAddToCart={handleAddToCart} />

          </div>

        </div>

        {/* You also might like related products section */}
        <RelatedProducts onSelectComingSoon={handleSelectComingSoon} />

        {/* FAQ Section */}
        <Faq />

      </main>

      {/* Slide-over shopping cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Bottom Footer */}
      <Footer />

      {/* Floating coming soon notification toast */}
      <AnimatePresence>
        {comingSoonProduct && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] bg-slate-900 border border-slate-800 text-white py-3 px-6 rounded-2xl shadow-2xl flex items-center gap-3"
            role="status"
            aria-live="polite"
          >
            <AlertTriangle className="w-5 h-5 text-sky-400 shrink-0" />
            <span className="text-xs font-bold">
              A página do produto <strong>{comingSoonProduct}</strong> será lançada em breve! Estamos configurando seus detalhes.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
