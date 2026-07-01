export interface CartItem {
  id: string;
  productKey: string; // 'a4' | 'cartao' | 'panfleto' | 'especial'
  name: string;
  quantity: number;
  price: number;
  unitPrice: number;
  printType: 'Colorida' | 'Preto e Branco';
  description: string;
  timestamp: number;
}

export interface A4Tier {
  min: number;
  max: number;
  price: number;
}

export interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
  priceEstimate: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
