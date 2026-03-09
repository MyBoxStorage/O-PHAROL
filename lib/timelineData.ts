export type TimelineItem = { year: string; text: string }
export type TimelineDecade = { decade: string; items: TimelineItem[] }

export const timeline: TimelineDecade[] = [
  {
    decade: 'Década de 1980',
    items: [
      {
        year: '1980s',
        text: 'Surge a ideia de abrir um restaurante de frutos do mar na orla de Balneário Camboriú, apostando no potencial turístico da Avenida Atlântica.',
      },
      {
        year: '1986',
        text: 'Fundação do Restaurante O Pharol — um nome inspirado no farol que guia navegantes, agora guiando os amantes da boa gastronomia.',
      },
      {
        year: 'Final dos anos 80',
        text: 'Consolidação como referência em frutos do mar na orla, conquistando clientes locais e os primeiros turistas.',
      },
    ],
  },
  {
    decade: 'Década de 1990',
    items: [
      {
        year: 'Início dos 90',
        text: 'O aumento expressivo do turismo em Balneário Camboriú impulsiona o movimento do restaurante, consolidando sua posição estratégica na Av. Atlântica.',
      },
      {
        year: '1990–1995',
        text: 'O Pharol torna-se um ponto gastronômico incontornável da orla, referência obrigatória para quem visita a cidade.',
      },
      {
        year: 'Meados dos 90',
        text: 'Ampliação da estrutura para atender a crescente demanda, aumentando significativamente a capacidade de atendimento.',
      },
      {
        year: 'Final dos 90',
        text: 'Popularização entre turistas argentinos e brasileiros, tornando-se destino gastronômico internacional na orla catarinense.',
      },
    ],
  },
  {
    decade: 'Década de 2000',
    items: [
      {
        year: 'Início dos 2000',
        text: 'Consolidação definitiva como restaurante tradicional da orla de Balneário Camboriú, com clientela fiel e reputação sólida.',
      },
      {
        year: '2000–2005',
        text: 'Expansão e diversificação do cardápio, incorporando carnes nobres e pratos internacionais sem perder a essência dos frutos do mar.',
      },
      {
        year: '2005',
        text: 'Modernização do ambiente interno, elevando o padrão de conforto e sofisticação para os clientes.',
      },
      {
        year: '2006–2010',
        text: 'Fortalecimento da marca entre os restaurantes clássicos da cidade, reconhecido pelos guias turísticos da região.',
      },
    ],
  },
  {
    decade: 'Década de 2010',
    items: [
      {
        year: '2013',
        text: 'Reestruturação jurídica da empresa com nova razão social, modernizando a gestão mantendo toda a tradição e qualidade da marca.',
      },
      {
        year: '2014',
        text: 'Ampliação do atendimento para grandes grupos e eventos corporativos, consolidando capacidade para até 700 pessoas.',
      },
      {
        year: '2015–2019',
        text: 'Consolidação como um dos restaurantes de maior capacidade da orla catarinense, referência para grandes eventos gastronômicos.',
      },
    ],
  },
  {
    decade: 'Presente',
    items: [
      {
        year: '2020–2021',
        text: 'Adaptações operacionais durante a pandemia e retomada gradual do turismo, mantendo os padrões de excelência e segurança.',
      },
      {
        year: '2022–2023',
        text: "Fortalecimento da presença digital, reconhecimento no Tripadvisor com prêmio Travellers' Choice — Top 10% mundial.",
      },
      {
        year: '2024–Hoje',
        text: 'Continuidade como restaurante histórico e consolidado da Avenida Atlântica. 38 anos de história, um legado de sabor.',
      },
    ],
  },
]
