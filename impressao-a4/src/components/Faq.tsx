import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FaqItem } from '../types';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'Preciso ter o arquivo pronto para fazer o pedido?',
      answer: 'Não necessariamente! Você pode entrar em contato conosco mesmo sem o arquivo. Se você tiver o arquivo pronto (PDF, Imagem, Word, etc.), o processo é ainda mais rápido. Se precisar de apoio com layouts ou ajustes simples, conte com a gente.'
    },
    {
      question: 'Qual é o prazo de entrega?',
      answer: 'O prazo de entrega para impressões A4 normais é de até 24 horas úteis após a confirmação do pagamento. Para cartões de visita e panfletos personalizados, a produção varia entre 4 a 7 dias úteis devido aos processos de acabamento.'
    },
    {
      question: 'Como funciona a forma de pagamento?',
      answer: 'Trabalhamos de forma segura e ágil via Pix. O pagamento é realizado logo após definirmos todos os detalhes do seu orçamento no WhatsApp e antes de darmos início à impressão do material.'
    },
    {
      question: 'Vocês entregam em qualquer bairro de Guarujá?',
      answer: 'Sim! Entregamos na imensa maioria dos bairros de Guarujá com frete totalmente gratuito para a comodidade do seu lar ou comércio. Basta nos enviar sua localização no WhatsApp para confirmarmos a rota do dia. 🚚'
    },
    {
      question: 'Como faço para enviar meus arquivos de impressão?',
      answer: 'É extremamente simples: tudo é feito diretamente pelo próprio WhatsApp! Você pode arrastar seu arquivo PDF, imagem JPG/PNG de alta resolução ou link de design para a nossa conversa. Nós revisamos e enviamos um feedback rápido.'
    },
    {
      question: 'Frente e verso conta como duas impressões?',
      answer: 'Sim, na Impressão A4 comum, o cálculo é feito com base no número total de páginas impressas (unidades de impressão). Logo, uma única folha de papel impressa na frente e no verso equivale a duas impressões.'
    },
    {
      question: 'Posso solicitar uma amostra antes de pedir grandes volumes?',
      answer: 'Com certeza! Nos orgulhamos da nossa transparência. Para volumes de impressão A4 ou papéis fotográficos especiais, você pode solicitar poucas unidades para atestar a qualidade e as cores antes de fechar pedidos maiores.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-12 border-t border-slate-200" id="faq-section">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column heading block */}
        <div className="space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-blue-600 uppercase">Dúvidas Frequentes</span>
          <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight font-display">
            Perguntas sobre as <span className="text-blue-600">impressões</span>
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Resolvemos as dúvidas mais recorrentes dos nossos clientes de Guarujá. Se precisar de algo customizado, nossa equipe está pronta para conversar.
          </p>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center space-y-3">
            <p className="text-xs font-semibold text-blue-800">Ainda tem alguma pergunta específica?</p>
            <a
              href="https://wa.me/5513997674140?text=Olá! Tenho uma dúvida sobre as impressões A4."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
              Perguntar no WhatsApp
            </a>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="lg:col-span-2 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-lg transition duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-blue-200 bg-blue-50/10' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between text-left p-4 md:p-5 font-bold text-slate-800 focus:outline-none transition gap-4 text-sm md:text-base font-display"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 shrink-0 transition duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
