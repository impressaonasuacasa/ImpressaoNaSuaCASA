import { motion } from 'motion/react';
import { Sparkles, Star, ChevronRight } from 'lucide-react';
import { RelatedProduct } from '../types';

// Let's import or resolve the generated asset paths
import cartaoImg from '../assets/images/cartao_1782918147665.jpg';
import panfletoImg from '../assets/images/panfleto_1782918159448.jpg';
import especialImg from '../assets/images/especial_1782918173980.jpg';

interface RelatedProductsProps {
  onSelectComingSoon: (productName: string) => void;
}

export default function RelatedProducts({ onSelectComingSoon }: RelatedProductsProps) {
  const products: RelatedProduct[] = [
    {
      id: 'cartao',
      name: 'Cartões de Visita',
      slug: 'pagina-cartao',
      description: 'Impressione seus clientes com cartões sofisticados. Opções em Couchê Fosco 300g, Brilho 250g, com ou sem laminação protetora.',
      image: cartaoImg,
      badge: 'Mais Vendido',
      priceEstimate: 'A partir de R$ 89,90'
    },
    {
      id: 'panfleto',
      name: 'Panfletos de Divulgação',
      slug: 'pagina-panfletos',
      description: 'Divulgue seus serviços em massa. Papel Couchê premium de 90g ou 150g com cores brilhantes e impressão frente e verso em alta definição.',
      image: panfletoImg,
      badge: 'Promoção',
      priceEstimate: 'A partir de R$ 199,90'
    },
    {
      id: 'especial',
      name: 'Impressões Especiais',
      slug: 'pagina-especiais',
      description: 'Papéis fotográficos brilhantes de alta gramatura, papel matte fanzine e adesivos personalizados de alta fixação resistentes à água.',
      image: especialImg,
      badge: 'Novidade',
      priceEstimate: 'A partir de R$ 5,90/folha'
    }
  ];

  return (
    <section className="space-y-6 py-12 border-t border-slate-200" id="related-products-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            🚀 Você também pode gostar
          </h2>
          <p className="text-sm text-slate-500">Conheça nossos outros serviços gráficos com frete grátis para Guarujá.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -6 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col group cursor-pointer"
            onClick={() => onSelectComingSoon(product.name)}
          >
            {/* Image Wrap */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
              <span className="absolute bottom-3 right-3 bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm border border-slate-200">
                {product.priceEstimate}
              </span>
            </div>

            {/* Content Wrap */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-900 font-display group-hover:text-blue-600 transition duration-150">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span className="flex items-center gap-1 text-slate-600">
                  <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                  4.9 (Guarujá SP)
                </span>
                <span className="inline-flex items-center gap-0.5">
                  Simular Preço
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition duration-150" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
