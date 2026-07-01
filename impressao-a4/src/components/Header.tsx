import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, MessageSquare, Phone, Clock, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export default function Header({ cart, onOpenCart }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTimeText, setCurrentTimeText] = useState('Verificando horário...');

  const getSPTime = () => {
    try {
      const dateStr = new Date().toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short',
      });
      const parts = dateStr.split(', ');
      const day = parts[0].toLowerCase(); // e.g. "mon", "tue"
      const timeParts = parts[1].split(':');
      const h = parseInt(timeParts[0], 10);
      const m = parseInt(timeParts[1], 10);
      return { day, h, m };
    } catch (e) {
      // Fallback
      const d = new Date();
      const brt = new Date(d.getTime() - 180 * 60000); // UTC-3
      const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      return {
        day: days[brt.getUTCDay()],
        h: brt.getUTCHours(),
        m: brt.getUTCMinutes(),
      };
    }
  };

  const checkOnlineStatus = () => {
    const { day, h, m } = getSPTime();
    const timeFloat = h + m / 60;
    const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri'];

    if (weekdays.includes(day)) {
      if (timeFloat >= 9 && timeFloat < 17) {
        return { isOnline: true, text: '● Online agora · Respondemos rápido!' };
      }
      return {
        isOnline: false,
        text: '⚫ Offline · Retornamos amanhã às 9h',
      };
    } else if (day === 'sat') {
      if (timeFloat >= 10 && timeFloat < 16) {
        return { isOnline: true, text: '● Online agora · Respondemos rápido!' };
      }
      return {
        isOnline: false,
        text: '⚫ Offline · Retornamos segunda às 9h',
      };
    } else {
      return {
        isOnline: false,
        text: '⚫ Offline · Retornamos segunda às 9h',
      };
    }
  };

  useEffect(() => {
    const update = () => {
      const status = checkOnlineStatus();
      setCurrentTimeText(status.text);
      setIsOpen(status.isOnline);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full" id="site-header">
      {/* Top Info Banner / Ribbon */}
      <div 
        onClick={() => window.open('https://wa.me/5513997674140?text=Olá! Gostaria de fazer um orçamento.', '_blank')}
        className="w-full bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 flex items-center justify-center gap-4 cursor-pointer hover:bg-slate-850 transition duration-150"
      >
        <div className="flex items-center gap-1.5 font-medium">
          <span className={`inline-block w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
          <span className={isOpen ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>{currentTimeText}</span>
        </div>
        <span className="hidden md:inline text-slate-600">|</span>
        <div className="hidden md:flex items-center gap-1.5 text-blue-500 font-semibold">
          <Truck className="w-3.5 h-3.5" />
          <span>Frete grátis em todo Guarujá</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-white border-b border-slate-200 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Back */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-1" aria-label="Página Inicial">
              <span className="text-2xl font-black font-display text-blue-700 tracking-tighter">
                IMPRESSÃO<span className="text-orange-500">NASUACASA</span>
              </span>
            </a>
            <div className="hidden sm:block h-6 w-px bg-slate-200" />
            <a 
              href="/" 
              className="hidden sm:flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-medium text-sm transition"
              aria-label="Voltar para a página inicial"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao site</span>
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Nav Back Mobile Icon */}
            <a 
              href="/" 
              className="sm:hidden p-2 text-slate-500 hover:text-slate-800 transition"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>

            {/* Shopping Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className={`relative flex items-center gap-2 py-2 px-4 rounded-lg border text-sm font-bold transition ${
                cart.length > 0 
                  ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              aria-label={`Ver carrinho, ${cart.length} produtos`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Orçamento</span>
              {cart.length > 0 && (
                <span className="bg-blue-600 text-white text-xs font-black min-w-5 h-5 rounded-full flex items-center justify-center px-1">
                  {cart.length}
                </span>
              )}
            </motion.button>

            {/* Main CTA: Quick WhatsApp */}
            <a
              href="https://wa.me/5513997674140?text=Olá! Vim pelo site e gostaria de solicitar um orçamento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition duration-200"
              aria-label="Falar conosco no WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-500" />
              <span className="hidden md:inline">Falar no WhatsApp</span>
              <span className="md:hidden">WhatsApp</span>
            </a>
          </div>

        </div>
      </nav>
    </header>
  );
}
