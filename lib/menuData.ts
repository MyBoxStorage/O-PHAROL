export type MenuItem = {
  num: string
  name: string
  nameEn?: string
  desc?: string
  price: string
}

export type MenuSection = {
  title: string
  subtitle?: string
  note?: string
  items: MenuItem[]
}

export type MenuTab = {
  id: string
  label: string
  warning?: string
  note?: string
  sections: MenuSection[]
  banners?: Array<{ title: string; info: string; price: string; bgColor?: string }>
}

export const menuTabs: MenuTab[] = [
  {
    id: 'sugestoes',
    label: 'Sugestões da Casa',
    banners: [
      {
        title: 'Aos Sábados!',
        info: 'Buffet de Feijoada Completa · Exceto feriados e datas comemorativas · +10% taxa de serviço',
        price: 'R$ 169,90 · por pessoa',
      },
      {
        title: 'Aos Domingos!',
        info: 'Buffet Frutos do Mar c/ Carnes Nobres · Exceto feriados · +10% taxa de serviço',
        price: 'R$ 169,90 · por pessoa',
        bgColor: 'var(--navy-light)',
      },
      {
        title: 'Diariamente, servido na mesa!',
        info: 'Exceto feriados e datas comemorativas',
        price: 'Rodízio Frutos do Mar — R$ 179,90 · por pessoa',
        bgColor: 'var(--red-dark)',
      },
      {
        title: 'Rodízio c/ Lagosta',
        info: 'Exceto feriados e datas comemorativas',
        price: 'R$ 199,00 · por pessoa',
        bgColor: 'var(--red-dark)',
      },
    ],
    sections: [
      {
        title: 'Sugestão de Entrada',
        items: [
          { num: '', name: 'Casquinha de Siri (2 und)', price: 'R$ 31,90' },
          { num: '', name: 'Pastel de Siri (und)', price: 'R$ 19,90' },
          { num: '', name: 'Pastel de Camarão (und)', price: 'R$ 19,90' },
          { num: '', name: '6 Ostras Grandes ao Natural ou Gratinadas', price: 'R$ 49,00' },
          { num: '', name: 'Camarão alho e óleo (porção)', price: 'R$ 129,90' },
          { num: '', name: 'Salada Mista', price: 'R$ 69,00' },
        ],
      },
      {
        title: 'Sugestão — 1 Pessoa',
        items: [
          { num: '', name: 'Camarão a Milanesa completo', price: 'R$ 139,00' },
          { num: '', name: 'Nhoque Artesanal com Camarão', price: 'R$ 139,00' },
          { num: '', name: 'Lagosta Grelhada', price: 'R$ 185,00' },
          { num: '', name: 'Mignon à Parmegiana', price: 'R$ 135,00' },
          { num: '', name: 'Peixe Grelhado', price: 'R$ 135,00' },
        ],
      },
      {
        title: 'Sugestões — 2 Pessoas',
        items: [
          { num: '', name: 'Robalo Grelhado c/ Legumes', price: 'R$ 299,00' },
          { num: '', name: 'Lagosta Grelhada', price: 'R$ 399,00' },
          { num: '', name: 'Lagosta à Thermidor', price: 'R$ 399,00' },
          { num: '', name: 'Camarão à Milanesa Completo', price: 'R$ 229,00' },
          { num: '', name: 'Camarão G Tropical no Abacaxi', price: 'R$ 299,00' },
          { num: '', name: 'Polvo e Camarões Grelhados', price: 'R$ 289,00' },
        ],
      },
      {
        title: 'Super Combo',
        items: [
          {
            num: '',
            name: 'Entrada: 4 Bolinhos de Bacalhau + Principal: Bacalhau à Portuguesa',
            desc: 'Escolha seus acompanhamentos: Arroz ou spaguetti, Feijão, batata frita ou batata soutê',
            price: 'R$ 359,00',
          },
        ],
      },
      {
        title: 'Destaque',
        items: [
          {
            num: '',
            name: 'King Krab: Caranguejo King Krab Inteiro (kg)',
            desc: 'Molhos: nozes, alcaparras e vinagrete',
            price: 'R$ 749,00',
          },
        ],
      },
    ],
  },
  {
    id: 'entradas',
    label: 'Entradas & Petiscos',
    note: 'Acompanhamentos: Arroz ou Spaguetti; Feijão, Fritas ou Soutê. Os pratos podem levar de 35 a 40 minutos.',
    sections: [
      {
        title: 'Petiscos',
        subtitle: 'Tidbits',
        items: [
          { num: '23', name: 'Pastel de Camarão 7 barba "unid." Médio', nameEn: 'Shrimp Cake 7 Beard unit. Medium', price: 'R$ 19,90' },
          { num: '9', name: 'Combinado do Mar', desc: 'Marisco vinagrete, lula, camarão, cubos de linguado todos milanesa, fritas', price: 'R$ 199,00' },
          { num: '10', name: 'Camarão Frito c/casca (porção)', nameEn: 'Fried Shrimp shelled (portion)', price: 'R$ 139,00' },
          { num: '11', name: 'Camarão ao Bafo c/casca (porção)', nameEn: 'Steamed Shrimp shelled (portion)', price: 'R$ 139,00' },
          { num: '12', name: 'Camarão à Milanesa (soltinho) — Crispy Shrimp', price: 'R$ 139,00' },
          { num: '13', name: 'Camarão Grande (unidade)', nameEn: 'Big Shrimp', price: 'R$ 59,90' },
          { num: '15', name: 'Camarão à Romana', nameEn: 'The Shrimp Romana', price: 'R$ 149,90' },
          { num: '16', name: 'Casquinha de Siri (unidade)', nameEn: 'Casquina Crab (unit)', price: 'R$ 38,90' },
          { num: '17', name: 'Peixe Xadrez com Linguado', nameEn: 'Plaid Fish with Flounder', price: 'R$ 89,00' },
          { num: '18', name: 'Marisco à Vinagrete', nameEn: 'Vinaigrette Shellfish', price: 'R$ 79,00' },
          { num: '19', name: 'Marisco na Casca (dúzia)', nameEn: 'Shelled Shellfish (dozen)', price: 'R$ 69,00' },
          { num: '20', name: 'Ostra Natural (dúzia)', nameEn: 'Raw Oyster (dozen)', price: 'R$ 89,00' },
          { num: '21', name: 'Ostra Gratinada (dúzia)', nameEn: 'Grilled Oyster (dozen)', price: 'R$ 99,00' },
          { num: '22', name: 'Lula à Milanesa', nameEn: 'Breaded Calamari', price: 'R$ 89,00' },
          { num: '24', name: 'Lula à Romana', nameEn: 'The Calamari Romana', price: 'R$ 95,00' },
          { num: '25', name: 'Queijo de Coalho Grelhado (espeto unidade)', nameEn: 'Grilled Curd Cheese (skewer unit)', price: 'R$ 18,90' },
          { num: '26', name: 'Batata Frita', nameEn: 'French Fries', price: 'R$ 39,90' },
          { num: '27', name: 'Mignon cubos à Romana c/ Fritas "250gr"', price: 'R$ 99,00' },
          { num: '28', name: 'Mignon cubos Grelhado c/ Cebola e Fritas "350gr"', price: 'R$ 139,00' },
          { num: '29', name: 'Picanha Grelhada cubos c/ Cebola e Fritas "350gr"', price: 'R$ 149,00' },
          { num: '14', name: 'Polvo Grelhado com Alho Poró e Ervas Finas', nameEn: 'Grilled Octopus with Leek and Fine Herbs', price: 'R$ 270,00' },
          { num: '205', name: 'Bolinho de Bacalhau (10 unidades)', nameEn: 'Cod Fish Scone (10 units)', price: 'R$ 99,90' },
          { num: '210', name: 'Frango a Passarinho c/ Fritas', nameEn: 'Fried Chicken with Fries', price: 'R$ 99,00' },
        ],
      },
      {
        title: 'Pratos para 1 Pessoa',
        items: [
          { num: '27243', name: 'Camarão Rosa a Milanesa', price: 'R$ 169,00' },
          { num: '68871', name: 'Camarão Rosa Grelhado', price: 'R$ 169,00' },
          { num: '92647', name: 'Filet Mignon Grelhado', price: 'R$ 135,00' },
          { num: '85120', name: 'Filet Peito de Frango Grelhado', price: 'R$ 99,00' },
          { num: '78740', name: 'Filet Peixe Grelhado (Salmão, Linguado, Congrio)', price: 'R$ 149,00' },
          { num: '37280', name: 'Frango à Parmegiana', price: 'R$ 99,00' },
          { num: '92326', name: 'Lagosta Grelhada', price: 'R$ 199,00' },
          { num: '62015', name: 'Mignon ao Molho Madeira', price: 'R$ 145,00' },
          { num: '62114', name: 'Mignon à Parmegiana', price: 'R$ 145,00' },
          { num: '54706', name: 'Penne ou Spaguette e Mignon ao Molho Madeira', price: 'R$ 145,00' },
          { num: '34166', name: 'Picanha Grelhada', price: 'R$ 149,00' },
        ],
      },
    ],
  },
  {
    id: 'frutos',
    label: 'Frutos do Mar',
    warning: 'NÃO FAZEMOS MEIO PRATO · Pratos para 2 Pessoas',
    note: 'Cobramos taxa de serviço de 10% · Sábados Feijoada Completa · Não aceitamos cheques · Couvert artístico R$ 19,90 p/pessoa',
    sections: [
      {
        title: 'Sábados',
        items: [{ num: '62', name: 'Buffet de Frutos do Mar e Carnes Nobres', price: 'R$ 169,90' }],
      },
      {
        title: 'Frutos do Mar',
        items: [
          { num: '63', name: 'Caldeirada de Frutos do Mar p/ 2 pessoas', desc: 'Lula, peixe, congrio, marisco, polvo, camarão, cebola, tomate, pimentão, azeite de dendê, leite de coco · Arroz branco e pirão', price: 'R$ 330,00' },
          { num: '64', name: 'Lula à Provençal (Refogada na manteiga) p/ 2 pessoas', desc: 'Arroz branco, arroz com salmão e pirão', price: 'R$ 239,00' },
          { num: '65', name: 'Lagosta Grelhada p/ 2 pessoas', desc: 'Com maionese de Camarão · Arroz branco ou à grega, batata soutê e maionese de camarão', price: 'R$ 399,00' },
          { num: '66', name: 'Lagosta Thermidor', desc: 'Com molho branco, champignon e mostarda', price: 'R$ 399,00' },
          { num: '68', name: 'Risoto de Frutos do Mar p/ 2 pessoas', desc: 'Arroz arbóreo com lula, camarão, congrio, polvo e marisco', price: 'R$ 330,00' },
          { num: '69', name: 'Rodízio de Frutos do Mar (Por pessoa)', desc: 'Sopa, maionese de camarão, camarão ao bafo/frito, marisco à vinagrete, lula, peixe, camarão à milanesa, pirão e arroz', price: 'R$ 179,90' },
        ],
      },
    ],
  },
  {
    id: 'peixes',
    label: 'Peixes',
    warning: 'NÃO FAZEMOS MEIO PRATO · Pratos para 2 Pessoas',
    sections: [
      {
        title: 'Ao Molho de Camarão',
        items: [
          { num: '41', name: 'Congrio chileno', nameEn: 'Conger eel (chilean)', price: 'R$ 330,00' },
          { num: '52', name: 'Linguado', nameEn: 'Flounder', price: 'R$ 299,00' },
          { num: '42', name: 'Pescada Camboriú (à Milanesa ou grelhado)', price: 'R$ 199,00' },
        ],
      },
      {
        title: 'À Belle Meunière',
        items: [
          { num: '54', name: 'Congrio chileno', price: 'R$ 330,00' },
          { num: '53', name: 'Linguado', price: 'R$ 299,00' },
          { num: '55', name: 'Salmão', price: 'R$ 299,00' },
        ],
      },
      {
        title: 'À Pharol',
        items: [
          { num: '58', name: 'Congrio chileno', price: 'R$ 330,00' },
          { num: '57', name: 'Linguado', price: 'R$ 289,00' },
          { num: '59', name: 'Salmão', price: 'R$ 289,00' },
        ],
      },
      {
        title: 'À Camboriú',
        items: [
          { num: '42', name: 'Pescada', price: 'R$ 199,00' },
          { num: '56', name: 'Linguado', price: 'R$ 239,00' },
        ],
      },
      { title: 'À Romana', items: [{ num: '60', name: 'Linguado', price: 'R$ 259,00' }] },
      {
        title: 'Moquecas',
        items: [
          { num: '43', name: 'Moqueca de Salmão', price: 'R$ 299,00' },
          { num: '44', name: 'Moqueca de Garoupa', price: 'R$ 325,00' },
          { num: '67', name: 'Moqueca de Lagosta', price: 'R$ 399,00' },
          { num: '1250', name: 'Moqueca de Garoupa e Camarões Rosa', price: 'R$ 379,00' },
        ],
      },
      {
        title: 'Especiais',
        items: [
          { num: '49', name: 'Peixe à Lua de Mel', desc: '2 filés peixe, 2 casquinhas siri, porção camarão soltinho, 2 camarões ao bafo, 1 porção camarão ao molho, fritas, pirão e 3 tipos de arroz', price: 'R$ 299,00' },
          { num: '50', name: 'Bacalhau à Portuguesa Gadus Morhua', desc: 'Ao forno com azeite de oliva e legumes. Acompanha arroz branco e pirão.', price: 'R$ 369,00' },
        ],
      },
    ],
  },
  {
    id: 'camarao',
    label: 'Camarão',
    warning: 'NÃO FAZEMOS MEIO PRATO',
    note: 'Acompanhamentos: Arroz à grega, batata soutê ou fritas · Pratos para 2 pessoas',
    sections: [
      {
        title: 'Camarão',
        items: [
          { num: '71', name: 'À Grega', desc: 'Espeto com 7 camarões grandes e queijo', price: 'R$ 324,00' },
          { num: '72', name: 'Imperial', desc: 'Linguado ou Salmão grelhado, 7 camarões grandes e frutas à milanesa', price: 'R$ 345,00' },
          { num: '73', name: 'Grelhado', desc: '7 camarões grandes', price: 'R$ 324,00' },
          { num: '74', name: 'Tropical', desc: '400grs de camarões médios no coco ou abacaxi com molho rosado', price: 'R$ 324,00' },
          { num: '75', name: 'À Romana', desc: '7 camarões grandes à doré com queijo', price: 'R$ 324,00' },
          { num: '45', name: 'Risoto de Camarão c/ Manga', price: 'R$ 324,00' },
          { num: '76', name: 'Camarão a Marta Rocha', desc: 'Camarões rosa com molho rosé e claras em neve gratinada', price: 'R$ 324,00' },
        ],
      },
    ],
  },
  {
    id: 'bovinos',
    label: 'Bovinos',
    warning: 'NÃO FAZEMOS MEIO PRATO · Pratos para 2 Pessoas',
    note: 'Acompanhamentos: Arroz branco, arroz à piamontese, fritas e farofa',
    sections: [
      {
        title: 'Filet Mignon',
        items: [
          { num: '83', name: 'Grelhado', price: 'R$ 239,00' },
          { num: '84', name: 'Poivre', desc: 'Ao molho madeira com pimentas verdes frescas', price: 'R$ 269,00' },
          { num: '85', name: 'Cavalo', desc: 'Dois ovos fritos', price: 'R$ 269,00' },
          { num: '86', name: 'Parmegiana', desc: 'À milanesa, molho sugo, presunto, queijo, ervilhas', price: 'R$ 269,00' },
          { num: '89', name: 'Chateaubriand', desc: 'Molho Madeira, champignon', price: 'R$ 269,00' },
          { num: '90', name: 'Pharol', desc: 'Gratinado com molho branco e ervilhas', price: 'R$ 269,00' },
          { num: '91', name: 'Picanha Grelhada', price: 'R$ 279,00' },
        ],
      },
    ],
  },
  {
    id: 'aves',
    label: 'Aves',
    warning: 'NÃO FAZEMOS MEIO PRATO · Pratos para 2 Pessoas',
    note: 'Acompanhamentos: Arroz branco, arroz à piamontese, fritas e farofa',
    sections: [
      {
        title: 'Aves',
        items: [
          { num: '78', name: 'Frango à Passarinho Completo', desc: 'Pedaços frango frito', price: 'R$ 135,00' },
          { num: '79', name: 'Frango à Romana', desc: 'À doré com queijo, peito ou sobrecoxa s/ osso', price: 'R$ 165,00' },
          { num: '80', name: 'Frango à Brasileira', desc: 'Peito ou sobrecoxa sem osso grelhado', price: 'R$ 165,00' },
          { num: '81', name: 'Frango à Parmegiana', desc: 'Peito ou sobrecoxa s/ osso à milanesa, presunto, queijo, ervilha', price: 'R$ 170,00' },
          { num: '82', name: 'Frango à Pharol', desc: 'Gratinado com molho branco, ervilha', price: 'R$ 170,00' },
        ],
      },
      {
        title: 'Pratos Kids',
        items: [
          { num: '206', name: 'Baby Beef', desc: '1 medalhão mignon grelhado, fritas, arroz, feijão, salada de tomate', price: 'R$ 89,00' },
          { num: '207', name: 'Baby Chicken', desc: '1 filet peito de frango, fritas, arroz, feijão, salada de tomate', price: 'R$ 44,00' },
          { num: '208', name: 'Cheese Burger', desc: 'Pão, carne, queijo e fritas', price: 'R$ 36,90' },
          { num: '209', name: 'Pharol Burger', desc: 'Hamburguer recheado c/ queijo "180gr", pão salgado, tomate, alface e fritas', price: 'R$ 57,00' },
        ],
      },
    ],
  },
  {
    id: 'massas',
    label: 'Massas',
    warning: 'NÃO FAZEMOS MEIO PRATO · Pratos para 2 Pessoas',
    note: 'Massas Barilla Grano Duro',
    sections: [
      {
        title: 'Massas',
        items: [
          { num: '92', name: 'Spaguetti Barilla com Cubos de Mignon aos 4 queijos', price: 'R$ 269,00' },
          { num: '94', name: 'Spaguetti com Frutos do Mar', price: 'R$ 299,00' },
          { num: '96', name: 'Spaguetti à Bolonhesa', price: 'R$ 199,00' },
          { num: '97', name: 'Spaguetti ao Sugo', price: 'R$ 135,00' },
        ],
      },
    ],
  },
  {
    id: 'saladas',
    label: 'Saladas & Pizzas',
    sections: [
      {
        title: 'Saladas',
        items: [
          { num: '30', name: 'Salada de Bacalhau c/ Folhas verdes e Torradas', price: 'R$ 139,00' },
          { num: '31', name: 'Salada Mista', price: 'R$ 69,00' },
          { num: '32', name: 'Maionese de Camarão', price: 'R$ 69,00' },
          { num: '33', name: 'Salada de Palmito', price: 'R$ 65,00' },
          { num: '34', name: 'Maionese Simples', price: 'R$ 37,00' },
          { num: '35', name: 'Salada de Tomate', price: 'R$ 23,90' },
          { num: '2', name: 'Salada do Mediterrâneo ★', desc: 'Variedade de folhas verdes, polvo, salmão, lula, camarão grelhado, mussarela de búfala, manga e tomate cereja', price: 'R$ 139,00' },
        ],
      },
      {
        title: 'Pizzas',
        items: [
          { num: '36', name: 'Camarão', price: 'R$ 129,00' },
          { num: '38', name: 'Portuguesa', price: 'R$ 129,00' },
          { num: '39', name: 'Calabresa', price: 'R$ 129,00' },
          { num: '40', name: 'Muzzarela', price: 'R$ 129,00' },
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
    note: 'Couvert artístico R$ 19,90 por pessoa · Taxa de serviço 10% · Não aceitamos cheques',
    sections: [
      {
        title: "Whisky's Importados",
        items: [
          { num: '98', name: 'Johnnie Walker Red — 8 anos', price: 'R$ 35,90' },
          { num: '100', name: 'Chivas — 12 anos', price: 'R$ 44,00' },
          { num: '102', name: 'Johnnie Walker Black', price: 'R$ 44,00' },
          { num: '103', name: 'Johnnie Walker Blue', price: 'R$ 199,00' },
          { num: '106', name: 'Old Parr — 12 anos', price: 'R$ 44,00' },
          { num: '107', name: "Buchanan's — 12 anos", price: 'R$ 44,00' },
          { num: '108', name: 'Jack Daniels', price: 'R$ 39,00' },
          { num: '109', name: 'Royal Salute', price: 'R$ 159,00' },
        ],
      },
      {
        title: 'Litros',
        items: [
          { num: '104', name: 'Litro Johnnie Walker Red', price: 'R$ 490,00' },
          { num: '105', name: 'Litro Johnnie Walker Black', price: 'R$ 690,00' },
          { num: '401', name: 'Litro Smirnoff', price: 'R$ 290,00' },
          { num: '500', name: 'Litro Absolut', price: 'R$ 490,00' },
        ],
      },
      {
        title: 'Doses & Gin',
        items: [
          { num: '115', name: 'Vodka Smirnoff', price: 'R$ 24,90' },
          { num: '110', name: "Gin Tônica (Gordon's / Tanqueray / Bulldog / Bombay)", price: 'R$ 55,00' },
          { num: '124', name: 'Absolut Vodka', price: 'R$ 39,00' },
          { num: '125', name: 'Vodka Grey Goose (France)', price: 'R$ 49,00' },
          { num: '114', name: 'Energético Red Bull (Tradicional, Tropical, Coco)', price: 'R$ 27,90' },
        ],
      },
      {
        title: 'Coquetéis & Caipirinha',
        items: [
          { num: '101', name: 'Aperol Spritz', price: 'R$ 44,90' },
          { num: '130', name: 'Alexander', price: 'R$ 44,90' },
          { num: '131', name: 'Côco', price: 'R$ 39,00' },
          { num: '201', name: 'Espumante Terra Nova Moscatel (taça)', price: 'R$ 44,90' },
          { num: '137', name: 'Caipirinha Vodka Smirnoff', desc: 'Limão Taiti, Lima da Pérsia, Morango, Maracujá, Uva, etc.', price: 'R$ 39,00' },
          { num: '138', name: 'Caipirinha Bacardi / Steinhaeger', price: 'R$ 39,00' },
          { num: '140', name: 'Sangria (vinho com fruta)', price: 'R$ 89,00' },
          { num: '141', name: 'Caipirinha Absolut', price: 'R$ 49,00' },
        ],
      },
      {
        title: 'Cervejas',
        items: [
          { num: '150', name: 'Cerveja Corona 600ml', price: 'R$ 29,90' },
          { num: '4', name: 'Cerveja Heineken 600ml (Puro Malte)', price: 'R$ 29,90' },
          { num: '228', name: 'Cerveja IPA 600ml T.A. 6.9% — Saint Beer', price: 'R$ 39,00' },
          { num: '151', name: 'Cerveja Original 600ml', price: 'R$ 27,50' },
          { num: '156', name: 'Cerveja Heineken Zero 355ml', price: 'R$ 21,00' },
          { num: '158', name: 'Chopp Brahma 300ml', price: 'R$ 21,00' },
        ],
      },
      {
        title: 'Refrigerantes & Águas',
        items: [
          { num: '161', name: 'Coca-Cola / Coca Zero ks', price: 'R$ 12,90' },
          { num: '162', name: 'Guaraná / Guaraná Zero', price: 'R$ 12,90' },
          { num: '163', name: 'Sprite ks', price: 'R$ 12,90' },
          { num: '159', name: 'Água Mineral 500ml (sem gás)', price: 'R$ 12,90' },
          { num: '160', name: 'Água Mineral 500ml (com gás)', price: 'R$ 12,90' },
          { num: '189', name: 'Água Mineral Perrier (Francesa)', price: 'R$ 35,90' },
          { num: '203', name: 'Água San Pellegrino 505ml (Italiana)', price: 'R$ 37,90' },
        ],
      },
      {
        title: 'Sucos & Especiais',
        items: [
          { num: '127', name: 'Suco Detox', desc: 'Couve, Espinafre, Abacaxi, Limão, Maçã e Gengibre', price: 'R$ 39,00' },
          { num: '155', name: 'Suco Tropical', desc: 'Laranja, Morango, Banana', price: 'R$ 31,00' },
          { num: '154', name: 'Limonada Suíça', price: 'R$ 18,90' },
          { num: '192', name: 'Soda Italiana Maçã Verde', price: 'R$ 27,90' },
          { num: '193', name: 'Soda Italiana Hibisco', price: 'R$ 27,90' },
          { num: '167', name: 'Sucos Naturais', desc: 'Laranja, Maracujá, Limão, Abacaxi, Melancia, Acerola, Morango, Abacaxi c/ Hortelã, Uva, Pêssego', price: '—' },
          { num: '143', name: 'Licores: Drambuie, Baileys, Amarula, Frangelico, Jagermeister, Cointreau', price: 'R$ 36,90' },
        ],
      },
    ],
  },
]
