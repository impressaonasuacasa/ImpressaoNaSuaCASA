import React, { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart, MessageCircle, AlertCircle, Sparkles, TrendingDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { A4Tier, CartItem } from '../types';

const A4_TIERS: A4Tier[] = [
  { min: 20, max: 30, price: 1.90 },
  { min: 31, max: 50, price: 1.75 },
  { min: 51, max: 80, price: 1.45 },
  { min: 81, max: 100, price: 1.25 },
  { min: 101, max: 200, price: 1.00 },
  { min: 201, max: 500, price: 0.80 },
  { min: 501, max: 9999, price: 0.65 }
];

interface SimulatorA4Props {
  onAddToCart: (item: Omit<CartItem, 'id' | 'timestamp'>) => void;
}

export default function SimulatorA4({ onAddToCart }: SimulatorA4Props) {
  const [printType, setPrintType] = useState<'Colorida' | 'Preto e Branco'>('Colorida');
  const [quantity, setQuantity] = useState<number>(20);

  // Helper to determine the price for a given quantity
  const getUnitPrice = (qty: number): number => {
    const tier = A4_TIERS.find(t => qty >= t.min && qty <= t.max);
    return tier ? tier.price : 0.65;
  };

  const unitPrice = getUnitPrice(quantity);
  const totalPrice = quantity * unitPrice;
  
  // Calculate potential savings based on the starting rate of R$ 1.90
  const baseUnitPrice = A4_TIERS[0].price; // R$ 1.90
  const savings = (baseUnitPrice * quantity) - totalPrice;

  // Determine current tier index and calculate dynamic progress bar values
  const currentTierIndex = A4_TIERS.findIndex(t => quantity >= t.min && quantity <= t.max);
  const nextTier = currentTierIndex < A4_TIERS.length - 1 ? A4_TIERS[currentTierIndex + 1] : null;
  const quantityToNextTier = nextTier ? nextTier.min - quantity : 0;
  
  // Calculate progress percent
  const calculateProgressPercent = () => {
    if (quantity <= 20) return 5;
    if (quantity >= 501) return 100;
    
    // Proportional progress bar through the tiers
    const currentTier = A4_TIERS[currentTierIndex];
    const tierRange = currentTier.max - currentTier.min;
    const progressInTier = quantity - currentTier.min;
    const percentageInTier = tierRange > 0 ? (progressInTier / tierRange) : 1;
    
    const sliceWidth = 100 / A4_TIERS.length;
    const totalPercent = (currentTierIndex * sliceWidth) + (percentageInTier * sliceWidth);
    return Math.min(Math.round(totalPercent), 100);
  };

  const progressPercent = calculateProgressPercent();

  // Create WhatsApp pre-filled message
  const getWhatsAppMessage = () => {
    const text = `📄 Olá! Quero solicitar um orçamento para Impressão A4:\n\n` +
      `• Tipo: ${printType}\n` +
      `• Quantidade: ${quantity} impressões\n` +
      `• Valor estimado: R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
      `• Papel: Sulfite 75g\n\n` +
      `Já tenho o arquivo pronto para enviar pelo WhatsApp!`;
    return `https://wa.me/5513997674140?text=${encodeURIComponent(text)}`;
  };

  const handleStepperChange = (val: number) => {
    setQuantity(prev => {
      const next = prev + val;
      return next < 20 ? 20 : (next > 9999 ? 9999 : next);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setQuantity(val > 9999 ? 9999 : val);
    } else {
      setQuantity(0); // Allow clearing to type, handled on blur
    }
  };

  const handleInputBlur = () => {
    if (quantity < 20 || isNaN(quantity)) {
      setQuantity(20);
    }
  };

  const handleAdd = () => {
    onAddToCart({
      productKey: 'a4',
      name: `Impressão A4 (${printType})`,
      quantity,
      price: totalPrice,
      unitPrice,
      printType,
      description: `${printType} · Sulfite 75g · ${quantity} folhas`
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" id="simulator-card-container">
      {/* Visual Accent Top Bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />
      
      <div className="p-5 md:p-6 space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Simulador de Preço Inteligente
          </h3>
          <p className="text-xs text-slate-500">Configure suas opções e veja o desconto progressivo ser aplicado em tempo real.</p>
        </div>

        {/* Print Type selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block">Tipo de Impressão</label>
          <div className="grid grid-cols-2 gap-3 p-1 bg-slate-50 rounded-lg border border-slate-200">
            <button
              onClick={() => setPrintType('Colorida')}
              className={`py-2 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-2 ${
                printType === 'Colorida'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span aria-hidden="true">🎨</span>
              Colorida
            </button>
            <button
              onClick={() => setPrintType('Preto e Branco')}
              className={`py-2 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-2 ${
                printType === 'Preto e Branco'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span aria-hidden="true">⚫</span>
              P&B (Tons de Cinza)
            </button>
          </div>
          <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            Frente e Verso = 2 unidades (1 folha impressa de ambos os lados conta como 2)
          </span>
        </div>

        {/* Quantity selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block" htmlFor="quantity-input">
            Quantidade de Páginas/Impressões
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleStepperChange(-1)}
              disabled={quantity <= 20}
              className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-slate-600 transition"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              id="quantity-input"
              type="number"
              value={quantity || ''}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-20 text-center py-2 px-2 border border-slate-200 focus:border-blue-500 rounded-lg text-sm font-bold text-slate-800 focus:outline-none transition"
              min={20}
              max={9999}
            />
            <button
              onClick={() => handleStepperChange(1)}
              className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Pedido mínimo: 20 folhas/impressões</p>
        </div>

        {/* Quick Quantity Chips */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Atalhos rápidos:</span>
          <div className="flex flex-wrap gap-2">
            {[20, 50, 100, 200, 500, 1000].map(qty => (
              <button
                key={qty}
                onClick={() => setQuantity(qty)}
                className={`py-1 px-3.5 rounded border text-xs font-bold transition ${
                  quantity === qty
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {qty.toLocaleString('pt-BR')}
              </button>
            ))}
          </div>
        </div>

        {/* Gamified Saving Progress Bar */}
        <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Desconto Progressivo</span>
            <span className="font-bold text-blue-600 text-[11px]">
              {quantityToNextTier > 0 
                ? `Próxima faixa a -${quantityToNextTier} un.` 
                : 'Você está no melhor preço! 🏆'}
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden relative border border-slate-100">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Savings Milestone Indicators */}
          <div className="grid grid-cols-4 text-center text-[9px] text-slate-400 font-bold">
            <div className="text-left">
              <span className={quantity >= 20 ? 'text-blue-600' : ''}>20 un.</span>
              <span className="block font-normal text-[8px] text-slate-400">R$ 1,90</span>
            </div>
            <div>
              <span className={quantity >= 51 ? 'text-blue-600' : ''}>51 un.</span>
              <span className="block font-normal text-[8px] text-slate-400">R$ 1,45</span>
            </div>
            <div>
              <span className={quantity >= 101 ? 'text-blue-600' : ''}>101 un.</span>
              <span className="block font-normal text-[8px] text-slate-400">R$ 1,00</span>
            </div>
            <div className="text-right">
              <span className={quantity >= 501 ? 'text-blue-600 font-black' : ''}>501+ un.</span>
              <span className="block font-normal text-[8px] text-slate-400">R$ 0,65</span>
            </div>
          </div>

          {quantityToNextTier > 0 && nextTier && (
            <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[11px] text-blue-700 font-medium">
              <TrendingDown className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>
                Adicione mais <strong>{quantityToNextTier}</strong> un. para pagar apenas <strong>R$ {nextTier.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> cada!
              </span>
            </div>
          )}
        </div>

        {/* Calculations / Summary Display */}
        <div className="bg-blue-600 rounded-lg p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-blue-100">
          <div className="space-y-0.5">
            <span className="text-[10px] opacity-80 uppercase font-bold tracking-widest block">Total Estimado</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">R$</span>
              <motion.span 
                key={totalPrice}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-2xl font-black tracking-tight font-display"
              >
                {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.span>
            </div>
            <p className="text-[11px] opacity-85">
              {quantity} impressões · <strong>R$ {unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada</strong>
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1 shrink-0">
            {savings > 0 && (
              <div className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full inline-block font-bold">
                Você economiza R$ {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            )}
            <div className="text-[10px] font-medium opacity-80">Frete Grátis incluso</div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleAdd}
            className="flex-1 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold py-3.5 px-5 rounded-lg flex items-center justify-center gap-2 transition duration-150 cursor-pointer text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar ao carrinho
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={getWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3.5 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition duration-150 text-center text-sm"
          >
            <MessageCircle className="w-4.5 h-4.5 fill-white text-green-500" />
            Pedir este agora
          </motion.a>
        </div>
      </div>
    </div>
  );
}
