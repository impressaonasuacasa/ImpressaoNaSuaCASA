import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, MessageSquare, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const getWhatsAppMessage = () => {
    let text = `Olá! Gostaria de solicitar um orçamento para os seguintes itens:\n\n`;
    cart.forEach((item, index) => {
      text += `📦 *${index + 1}. ${item.name}*\n`;
      text += `   • Quantidade: ${item.quantity} folhas/unidades\n`;
      text += `   • Detalhes: ${item.description}\n`;
      text += `   • Valor: R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n`;
    });
    text += `💰 *Valor Estimado Total: R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*\n\n`;
    text += `Os arquivos estão prontos para envio. Podem confirmar prazo e entrega para Guarujá?`;
    return `https://wa.me/5513997674140?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100] cursor-pointer"
            id="cart-backdrop"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
            id="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Seu Orçamento"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-950 text-base font-display">Seu Orçamento</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-black px-2 py-0.5 rounded">
                  {cart.length} {cart.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"
                aria-label="Fechar orçamento"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
                  <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center text-slate-350 border border-slate-200">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-600 font-display text-sm">Nenhum item adicionado</p>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      Configure a quantidade no simulador e clique em "Adicionar ao carrinho" para planejar seu pedido de uma só vez.
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block border border-blue-100">
                          {item.printType}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm font-display">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-xs text-slate-500">
                            R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/un · {item.quantity} un.
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between self-stretch">
                        <span className="text-sm font-black text-slate-950">
                          R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 transition"
                          aria-label={`Remover ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Area with Pricing Total & CTA */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Total Estimado</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black normal-case text-[9px] border border-emerald-200">
                      Frete grátis incluído
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-slate-950">
                    <span className="text-xs font-bold text-slate-500">Valor do orçamento:</span>
                    <span className="text-xl font-black font-display">
                      R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Frete grátis para Guarujá. Nós checamos a qualidade das artes antes de colocar em produção!
                  </span>
                </div>

                <div className="space-y-2">
                  <motion.a
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    href={getWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition duration-150 text-center text-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-emerald-500" />
                    Enviar Orçamento para o WhatsApp
                  </motion.a>

                  <button
                    onClick={onClearCart}
                    className="w-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 font-bold py-2 px-4 rounded-lg text-xs border border-slate-200 transition"
                  >
                    Limpar todos os itens
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
