/**
 * Artigos padrão do blog — conteúdo 100% baseado nas informações reais do
 * site original (atendimento 24h em Santa Fé do Sul e região, plataforma
 * hidráulica de 11 metros, guincho lança pesada, veículos atendidos e formas
 * de pagamento). Nenhum número, preço, depoimento ou estatística inventado.
 */

export type SeedPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  published: boolean
  publishedAt: Date
}

function ctas(): string {
  return `## Precisou de guincho? É só chamar

O **Auto Socorro MG** atende 24 horas por dia, todos os dias da semana, em **Santa Fé do Sul e região**. Envie sua localização pelo WhatsApp e receba a orientação da equipe para o atendimento adequado ao seu veículo.`
}

export const seedPosts: SeedPost[] = [
  {
    slug: 'guincho-24h-em-santa-fe-do-sul-como-funciona',
    title: 'Guincho 24 horas em Santa Fé do Sul: como funciona o atendimento',
    excerpt:
      'Pane à meia-noite ou imprevisto na estrada? Entenda como funciona o atendimento de guincho 24h em Santa Fé do Sul e região, do primeiro contato até a entrega do veículo.',
    coverImage: '/img/frota.webp',
    published: true,
    publishedAt: new Date('2025-01-15T10:00:00-03:00'),
    content: `Precisar de um guincho não escolhe hora. Uma pane pode acontecer de manhã, na saída do trabalho ou no meio da madrugada, e é justamente nesses momentos que saber **quem chamar** faz toda a diferença. Neste artigo, explicamos como funciona o atendimento de guincho 24 horas do Auto Socorro MG em Santa Fé do Sul e região.

## O que significa atendimento 24h?

O atendimento 24 horas significa que a equipe está disponível para receber o seu chamado **a qualquer momento**: madrugada, feriados e fins de semana. Você fala diretamente com uma pessoa da equipe, que entende a sua necessidade e organiza a operação.

## Passo a passo do atendimento

### 1. Conte o que aconteceu

A primeira etapa é simples: fale pelo telefone ou pelo WhatsApp e explique a situação. Informe **qual veículo** precisa de atendimento (carro, caminhonete, caminhão, ônibus, máquina agrícola ou lancha) e **o que aconteceu**.

### 2. Envie sua localização

Compartilhe onde você está — pode ser um endereço, um marco de referência ou a localização do mapa do celular. Quanto mais precisa a localização, mais rápido o deslocamento.

### 3. A equipe orienta você

Com as informações em mãos, a equipe confirma os detalhes e orienta sobre o equipamento adequado e o andamento do atendimento.

## Por que atender a região é importante

O Auto Socorro MG atua em **Santa Fé do Sul e região**, com conhecimento das vias locais e das estradas da área. Essa familiaridade ajuda no deslocamento e no posicionamento correto do equipamento para cada tipo de resgate.

## Que tipos de veículo são atendidos?

- Carros e caminhonetes;
- Caminhões e ônibus;
- Máquinas agrícolas;
- Lanchas e outros veículos.

${ctas()}`,
  },
  {
    slug: 'quanto-custa-um-servico-de-guincho',
    title: 'Quanto custa um serviço de guincho? Entenda o que influencia no valor',
    excerpt:
      'O valor de um reboque não é igual para toda situação. Veja quais fatores pesam no orçamento — e por que o preço justo começa pelo atendimento direto, sem intermediários.',
    coverImage: '/img/operacao-rodovia.webp',
    published: true,
    publishedAt: new Date('2025-02-10T10:00:00-03:00'),
    content: `"Quanto custa o guincho?" é a pergunta mais comum no atendimento — e a mais justa. A resposta honesta é: **depende da situação**. Neste artigo, explicamos os fatores que influenciam o valor para você entender exatamente o que está pagando.

## Os fatores que pesam no orçamento

### Distância do deslocamento

Quanto maior a distância entre o local do atendimento e o destino do veículo, maior o tempo de operação. Por isso, a localização e o destino são as primeiras informações pedidas.

### Tipo e porte do veículo

Reboque de um carro de passeio e remoção de um caminhão ou de uma máquina agrícola exigem **equipamentos diferentes**. O porte do veículo define qual da frota será usada na operação.

### Condições da ocorrência

Um veículo em um lugar de fácil acesso e um veículo atirado para fora da pista são situações muito distintas. A condição do resgate interfere no tempo e no equipamento necessário.

## Por que o preço justo começa no atendimento direto

Quando você chama o Auto Socorro MG, fala **diretamente com a equipe que realiza o serviço**. Sem intermediários, sem repasse de comissão: o orçamento reflete a operação real.

> Você recebe a orientação e o valor antes de qualquer deslocamento. Sem surpresa no final.

## Como conseguir um orçamento rápido

1. Chame no WhatsApp ou ligue para a equipe;
2. Informe o tipo de veículo e o que aconteceu;
3. Envie a sua localização e o destino desejado.

Com esses três dados, a equipe consegue orientar o equipamento adequado e informar o valor da operação.

${ctas()}`,
  },
  {
    slug: 'reboque-de-veiculos-pesados-caminhoes-onibus-e-maquinas',
    title: 'Reboque de veículos pesados: caminhões, ônibus, máquinas agrícolas e lanchas',
    excerpt:
      'Não é todo guincho que remove um caminhão carregado ou uma máquina agrícola. Conheça os cuidados e a estrutura necessária para o transporte de veículos pesados.',
    coverImage: '/img/socorro-pesado.webp',
    published: true,
    publishedAt: new Date('2025-03-05T10:00:00-03:00'),
    content: `Carro pequeno é uma coisa. **Caminhão, ônibus, máquina agrícola e lancha** são outra completamente diferente — em peso, em dimensões e em técnica. Remover veículos pesados exige equipamento específico e equipe experiente.

## Por que veículos pesados exigem estrutura própria

O peso de um caminhão ou de uma máquina agrícola é muito superior ao de um carro de passeio. Isso significa que:

- O equipamento precisa ter **capacidade real** para o transporte;
- O posicionamento do veículo sobre a plataforma precisa ser **calculado**;
- A amarração e a fixação seguem critérios próprios para evitar danos.

## Plataforma hidráulica de 11 metros

A plataforma hidráulica de 11 metros do Auto Socorro MG foi projetada para o transporte seguro de **veículos leves e pesados**, incluindo caminhões, ônibus, máquinas agrícolas e lanchas. A rampa hidráulica facilita o carregamento e reduz o risco de danos durante a subida do veículo.

## Guincho lança pesada

Para remoção e movimentação de veículos pesados — inclusive em situações em que o veículo não rola por conta própria — o guincho lança pesado é o equipamento dedicado, operado por equipe preparada para conduzir a operação com segurança.

## Lanchas também são transportadas

Pouca gente lembra, mas lanchas e embarcações de pequeno porte também precisam de reboque em mudanças, manutenção ou imprevistos. O transporte é feito com os mesmos critérios de fixação e segurança aplicados aos demais veículos.

${ctas()}`,
  },
  {
    slug: 'pane-ou-acidente-na-rodovia-o-que-fazer',
    title: 'Pane ou acidente na rodovia: o que fazer antes de chamar o guincho',
    excerpt:
      'Um roteiro simples e seguro para os primeiros minutos de uma pane ou acidente na estrada: proteja as pessoas, sinalize o local e chame o atendimento.',
    coverImage: '/img/frota-aerea.webp',
    published: true,
    publishedAt: new Date('2025-04-12T10:00:00-03:00'),
    content: `Uma pane na rodovia sempre pega o motorista de surpresa. Manter a calma e seguir uma sequência simples de ações protege você, os passageiros e as demais pessoas na via. Confira o passo a passo.

## 1. Priorize a segurança das pessoas

Se houver feridos, o primeiro contato deve ser com o **serviço de emergência**. Nenhuma carga, veículo ou prazo é mais importante do que a integridade das pessoas.

## 2. Saia da pista e sinalize o local

Sempre que for seguro:

- Remova o veículo da pista de rolamento ou posicione-se **fora** do alcance da via;
- Acione o pisca-alerta;
- Posicione o triângulo a uma distância segura para dar visibilidade aos demais motoristas.

## 3. Identifique sua localização

Localização é a informação mais valiosa em um atendimento de guincho. Use:

- A quilometragem da rodovia (placas no acostamento);
- Marcas de referência (postos, restaurantes, cruzamentos);
- A **localização do mapa do celular** — você pode enviar direto no WhatsApp.

## 4. Chame o atendimento e informe o veículo

Ao chamar a equipe, informe **o que aconteceu** e **qual veículo** precisa de atendimento. Essas duas informações definem o equipamento certo: carro, caminhonete, caminhão, ônibus, máquina agrícola ou lancha.

## 5. Reúna documentos e aguarde com segurança

Com o chamado feito, aguarde em local protegido, com os documentos do veículo em mãos. A equipe confirma os detalhes e orienta o andamento.

${ctas()}`,
  },
  {
    slug: 'plataforma-hidraulica-ou-guincho-lanca',
    title: 'Plataforma hidráulica ou guincho lança: qual equipamento o seu veículo precisa?',
    excerpt:
      'Cada ocorrência pede um equipamento. Entenda a diferença entre a plataforma hidráulica de 11 metros e o guincho lança pesada — e quando cada um é indicado.',
    coverImage: '/img/escavadeira.webp',
    published: true,
    publishedAt: new Date('2025-05-08T10:00:00-03:00'),
    content: `No atendimento de guincho, escolher o equipamento certo é o que garante um transporte **seguro e sem danos**. Veja quando cada equipamento da frota do Auto Socorro MG é indicado.

## Plataforma hidráulica de 11 metros

A plataforma hidráulica é o equipamento de transporte por excelência. Com **11 metros de comprimento**, ela comporta desde carros até veículos pesados.

### Quando é indicada

- Transporte de carros, caminhonetes, caminhões, ônibus e máquinas agrícolas;
- Veículos que **rolam** (entram por conta própria na rampa) ou precisam de tração auxiliar;
- Deslocamentos em que o veículo precisa ficar **totalmente apoiado** sobre a plataforma.

### Vantagens

- Rampa hidráulica que facilita o carregamento;
- Apoio total do veículo, sem arraste;
- Compatível com veículos leves e pesados, incluindo lanchas.

## Guincho lança pesada

O guincho lança pesado é o equipamento dedicado à **remoção e movimentação** de veículos pesados.

### Quando é indicado

- Remoção de veículos pesados em situações de ocorrência;
- Movimentação de veículos que não podem entrar em plataforma por conta própria;
- Operações que exigem força de tração controlada.

## Como a equipe decide

Você não precisa saber qual equipamento chamar: ao **relatar a situação e o tipo de veículo**, a equipe define a estrutura adequada e orienta o atendimento.

${ctas()}`,
  },
  {
    slug: 'pagamento-do-servico-de-guincho-dinheiro-pix-e-cartoes',
    title: 'Como funciona o pagamento do serviço de guincho: dinheiro, Pix e cartões',
    excerpt:
      'Dinheiro, Pix, cartão de crédito ou débito: o pagamento do atendimento de guincho pode ser feito do jeito que for mais prático para você.',
    coverImage: '/img/reboque-caminhao.webp',
    published: true,
    publishedAt: new Date('2025-06-14T10:00:00-03:00'),
    content: `Imprevisto na estrada já é suficiente estresse — pagar pelo atendimento não pode ser. O Auto Socorro MG trabalha com **formas de pagamento flexíveis** para facilitar o dia do cliente.

## Quais são as formas de pagamento aceitas

- **Dinheiro**;
- **Pix** — praticidade e confirmação imediata;
- **Cartões de crédito e débito**.

## Por que oferecer flexibilidade

Uma ocorrência de guincho acontece longe de casa, muitas vezes fora do horário comercial. Ter opções de pagamento evita que a falta de troco ou de uma maquininha se torne um problema a mais no dia do cliente.

## Transparência do início ao fim

O valor é combinado **antes** do deslocamento, a partir de informações simples:

1. Tipo de veículo que precisa de atendimento;
2. O que aconteceu;
3. Localização e destino.

Com esses dados, a equipe orienta o equipamento adequado e informa o valor — sem surpresas no fechamento do serviço.

## Precisou? É só chamar

Guarde o número na agenda: em Santa Fé do Sul e região, o atendimento é 24 horas, todos os dias da semana.

${ctas()}`,
  },
]
