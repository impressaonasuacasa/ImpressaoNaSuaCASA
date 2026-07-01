import { Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800" id="site-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About section */}
        <div className="space-y-3">
          <h4 className="text-white font-extrabold font-display text-lg">Impressão na Sua Casa</h4>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            O primeiro e-commerce gráfico offline-first de Guarujá, focado em levar máxima comodidade, preços imbatíveis e impressões de altíssima fidelidade direto até a sua porta.
          </p>
        </div>

        {/* Quick Contacts */}
        <div className="space-y-3">
          <h4 className="text-white font-extrabold font-display text-sm uppercase tracking-wider">Canais de Contato</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <a href="https://wa.me/5513997674140" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                (13) 99767-4140
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <a href="mailto:impressaonasuacasa@gmail.com" className="hover:text-white transition">
                impressaonasuacasa@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Atendimento em Guarujá - SP</span>
            </li>
          </ul>
        </div>

        {/* Security / Badges */}
        <div className="space-y-3">
          <h4 className="text-white font-extrabold font-display text-sm uppercase tracking-wider">Compra Garantida</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-400 leading-normal">
                <strong>Análise prévia:</strong> Conferimos as margens, resolução e cores do seu arquivo antes de imprimir para garantir o melhor resultado.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {currentYear} Impressão na Sua Casa. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1">
          Feito com <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> para a comunidade de Guarujá SP.
        </p>
      </div>
    </footer>
  );
}
