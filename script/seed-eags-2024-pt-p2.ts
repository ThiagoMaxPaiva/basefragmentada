import { db } from "../server/db";
import { questions } from "../shared/schema";

const eags2024PtPart2 = [
  {
    subject: "Português",
    topic: "Sintaxe (Orações Subordinadas Adjetivas)",
    questionText: "Assinale a alternativa que *não* possui uma oração subordinada adjetiva.",
    options: [
      "O locutor disse que não pode realizar o programa.",
      "Bebi o café que eu mesmo preparei.",
      "A apresentadora que fez o discurso não teve ética com o público.",
      "O país que não trata a educação como prioridade não pode ser considerado civilizado."
    ],
    correctOption: 0,
    explanation: "Na opção A, 'que não pode realizar o programa' é uma Oração Subordinada Substantiva Objetiva Direta (disse ISSO). Nas demais opções, o 'que' é um pronome relativo equivalendo a 'o qual / a qual', introduzindo orações adjetivas."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Vozes Verbais)",
    questionText: "Avalie as vozes verbais presentes nas frases abaixo.\nI- Com as flores e as fitas de cetim sobre a mesa a criança incomodou-se.\nII- Foram deixadas as flores e as fitas de cetim sobre a mesa.\nIII- Puseram-se as flores e as fitas de cetim sobre a mesa.\nIV- Com as flores e as fitas de cetim a criança enfeitou-se.\nPode-se dizer que há voz:",
    options: [
      "passiva em I, II e III; reflexiva em IV.",
      "passiva em I; ativa em II; reflexiva em III e IV.",
      "ativa em I; passiva em II e III; reflexiva em IV.",
      "reflexiva em I; passiva em II e III; ativa em IV."
    ],
    correctOption: 2,
    explanation: "Em I, a criança praticou a ação/estado de se incomodar (Ativa - a gramática tradicional costuma classificar verbos pronominais assim ou como média). Em II, voz passiva analítica (Foram deixadas). Em III, voz passiva sintética (Puseram-se = foram postas). Em IV, a criança enfeitou a si mesma (Reflexiva)."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Colocação Pronominal)",
    questionText: "Assinale a alternativa que completa, respectivamente, as lacunas do texto abaixo, considerando a colocação pronominal.\n_________ a intromissão, criança! Eu não _________ a seguir pelo caminho que __________. É que __________ que ele jamais __________ à casa da vovó, e sim diretamente à toca do Lobo Mau.",
    options: [
      "Desculpe-me - a aconselho - lhe indicaram - lhe omitiram - a levará",
      "Me desculpe - a aconselho - lhe indicaram - omitiram-lhe - a levará",
      "Me desculpe - aconselho-a - indicaram-lhe - omitiram-lhe - levá-la-á",
      "Desculpe-me - aconselho-a - indicaram-lhe - lhe omitiram - levá-la-á"
    ],
    correctOption: 0,
    explanation: "Início de frase com imperativo exige ênclise (Desculpe-me). Palavras atrativas (não, que, que, jamais) exigem próclise (a aconselho, lhe indicaram, lhe omitiram, a levará)."
  },
  {
    subject: "Português",
    topic: "Pontuação",
    questionText: "Leia:\nO sertanejo é antes de tudo um forte. Não tem o raquitismo exaustivo dos mestiços neurastênicos do litoral. [...] A sua aparência entretanto ao primeiro lance de vista revela o contrário. Falta-lhe a plástica impecável o desempeno a estrutura corretíssima das organizações atléticas.\nDo texto acima foram retiradas todas as vírgulas. Assinale a alternativa que aponta quantas devem ser obrigatoriamente usadas.",
    options: ["5", "6", "7", "8"],
    correctOption: 0,
    explanation: "A pontuação correta seria: 'A sua aparência, entretanto, ao primeiro lance de vista, revela o contrário. Falta-lhe a plástica impecável, o desempeno, a estrutura corretíssima das organizações atléticas.' Totalizando 5 vírgulas."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Objeto Direto e Indireto)",
    questionText: "Analise os termos destacados nas frases abaixo.\nI- Diante do ocorrido, nada *me* disse.\nII- A *mim*, não *me* ensinaram como chegar àquela cidade.\nIII- Uma menina, que nunca *nos* visitara, apareceu...\nIV- “A gente *à crença antiga* se acostuma.”\nQuanto à classificação sintática dos termos destacados, é correto afirmar que:",
    options: [
      "I e III são objeto direto.",
      "II e IV são objeto indireto.",
      "I, II e IV são objeto direto.",
      "II, III e IV são objeto indireto."
    ],
    correctOption: 1,
    explanation: "Em II, 'A mim' e 'me' são objetos indiretos do verbo ensinar (ensinar algo A alguém). Em IV, 'à crença antiga' é objeto indireto do verbo acostumar (acostumar-se A algo)."
  },
  {
    subject: "Português",
    topic: "Acentuação Gráfica",
    questionText: "Assinale a alternativa em que as duas palavras são proparoxítonas. (Obs.: Não foram usados propositadamente os acentos gráficos.)",
    options: [
      "hieroglifo - rubrica",
      "filantropo - levedo",
      "interim - crisantemo",
      "juniores - prototipo"
    ],
    correctOption: 2,
    explanation: "Ínterim e crisântemo são proparoxítonas. Rubrica, filantropo e levedo são paroxítonas. Hieróglifo pode ser proparoxítona ou paroxítona (hieroglifo)."
  },
  {
    subject: "Português",
    topic: "Formação de Palavras",
    questionText: "Assinale a alternativa que aponta o correto processo de formação das duas palavras.",
    options: [
      "indispor - jogador (derivação sufixal)",
      "desvalorização - amaciar (derivação prefixal)",
      "planalto - emudecer (derivação parassintética)",
      "passatempo - televisão (composição por justaposição)"
    ],
    correctOption: 3,
    explanation: "Passa + tempo (justaposição). Tele + visão (justaposição/hibridismo, tratado como composição). Planalto é composição; indispor é prefixal; desvalorização possui prefixo e sufixo."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Vocativo)",
    questionText: "Assinale a alternativa em que não há vocativo.",
    options: [
      "“Quando você for embora, / Moça branca como a neve, / me leve.” (F. Gullar)",
      "“Quando a teus pés um homem terno e curvo / Jurar amor... / Não creias não, mulher: ele te engana!” (M. A de Almeida)",
      "“Come chocolates, pequena, / Come chocolates!...” (F. Pessoa)",
      "“Olha que coisa mais linda / Mais cheia de graça / É ela, a menina / Que vem e que passa...” (V. Moraes)"
    ],
    correctOption: 3,
    explanation: "Na letra D, 'a menina' não é um termo de chamamento/invocação (vocativo), mas atua como sujeito/aposto explicativo do termo 'ela'."
  },
  {
    subject: "Português",
    topic: "Regência Verbal",
    questionText: "Em relação à regência dos verbos das frases, marque C para certo ou E para errado.\n( ) O diretor do clube chamou-o maluco durante a partida.\n( ) Os torcedores preferiam muito mais ficar no clube a ir para o estádio.\n( ) O diretor não visava a lucros, mas ao bem do clube.\n( ) Rogo-lhe que perdoe ao meu irmão.",
    options: ["C - C - E - E", "C - E - C - C", "E - C - E - E", "E - E - C - C"],
    correctOption: 1,
    explanation: "Chamar admite objeto direto + predicativo do objeto sem preposição (C). O verbo preferir repudia intensificadores como 'muito mais' na norma culta (E). Visar no sentido de almejar exige preposição 'a' (C). Perdoar a pessoa exige preposição 'a' (C)."
  },
  {
    subject: "Português",
    topic: "Morfologia (Plural dos Substantivos Compostos)",
    questionText: "Assinale a alternativa em que há erro quanto à flexão de número dos substantivos destacados.",
    options: [
      "Os ladrões arrancaram os fios e provocaram vários *curtos-circuitos*.",
      "Os criminosos... quebraram os *corrimãos* da saída principal.",
      "Foi necessária a efetiva participação dos *tenente-coronéis* da Polícia...",
      "No final da investigação, chegou-se à conclusão de que os *vilãos*..."
    ],
    correctOption: 2,
    explanation: "Em compostos formados por dois substantivos, a regra geral indica que ambos variam (tenentes-coronéis). A banca considerou tenente-coronéis como o erro da questão."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Orações Coordenadas)",
    questionText: "Observe as orações no período abaixo:\nSua imaginação povoava o mundo de demônios, *e esse mundo fantástico não só continuava como também se alargava* em seus sonhos e meditações.\nCom relação às orações coordenadas sindéticas, é correto afirmar que existem:",
    options: ["2 aditivas.", "3 aditivas.", "1 aditiva e 1 adversativa.", "2 aditivas e 1 adversativa."],
    correctOption: 0,
    explanation: "Há duas orações coordenadas sindéticas aditivas no trecho: 1) introduzida por 'e' (e esse mundo...). 2) introduzida por 'como também' (como também se alargava)."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Orações Subordinadas Reduzidas)",
    questionText: "Em relação à classificação das orações subordinadas substantivas reduzidas destacadas, avalie as afirmações.\n( ) Habituamo-nos *a chamá-lo de filho*. (objetiva indireta)\n( ) Nosso sonho sempre foi *adotar um cão labrador*. (objetiva direta)\n( ) Estávamos dispostos *a levar o cãozinho para casa*. (objetiva indireta)\n( ) Não convém, no momento, *reclamar do comportamento do cão*. (subjetiva)",
    options: ["V - V - F - F", "F - V - V - V", "F - F - V - F", "V - F - F - V"],
    correctOption: 3,
    explanation: "A primeira é Obj. Indireta (habituar-se a algo) -> V. A segunda é Predicativa (depois do verbo ser) -> F. A terceira é Completiva Nominal (disposto é adjetivo/nome) -> F. A quarta é Subjetiva (o que não convém? Reclamar) -> V."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Complemento Nominal)",
    questionText: "Assinale a alternativa que contém um complemento nominal.",
    options: [
      "Tenho confiança em você.",
      "A sua ausência atrapalhou a todos.",
      "Todas as pessoas aqui acreditam em sua liderança.",
      "A avaliação não foi validada por nenhuma professora."
    ],
    correctOption: 0,
    explanation: "Na alternativa A, 'em você' completa o sentido do substantivo abstrato 'confiança', sendo alvo desse sentimento. Nas outras, temos objetos indiretos e agente da passiva."
  },
  {
    subject: "Português",
    topic: "Morfologia (Gênero dos Substantivos)",
    questionText: "Quanto ao gênero dos substantivos, assinale a alternativa em que todos pertencem ao mesmo grupo.",
    options: [
      "capivara - criatura - girafa - formiga (epicenos)",
      "sultana - sacerdotisa - baronesa - condessa (biformes)",
      "vítima - pessoa - testemunha - imigrante (sobrecomuns)",
      "indivíduo - jovem - estudante - cônjuge (comuns de dois gêneros)"
    ],
    correctOption: 1,
    explanation: "Sultão/sultana, sacerdote/sacerdotisa, barão/baronesa, conde/condessa. Todos apresentam duas formas distintas para o gênero, sendo biformes."
  },
  {
    subject: "Português",
    topic: "Morfologia (Pronomes)",
    questionText: "Assinale a alternativa em que há erro no emprego dos pronomes.",
    options: [
      "Para mim, fazer amizades é essencial.",
      "Um diálogo entre mim e você é muito importante.",
      "O meu desejo é este: comprar uma casa confortável.",
      "Por favor, passe esta caneta que está aí perto de você."
    ],
    correctOption: 3,
    explanation: "Quando o objeto está perto da pessoa com quem se fala (perto de você), deve-se usar o pronome demonstrativo 'essa', e não 'esta' (que indica perto de quem fala)."
  },
  {
    subject: "Português",
    topic: "Morfologia (Verbos Defectivos)",
    questionText: "Avalie os verbos destacados nas frases abaixo.\nI- Não *cabe* o cinza nas tardes de outono.\nII- A pandemia foi a culpada por minha empresa *falir*.\nIII- Temos um objetivo: *abolir* do nosso dicionário amoroso a palavra briga.\nIV- Cuidado para não *moer* sua dignidade em nome do poder.\nClassificam-se como defectivos os verbos destacados em:",
    options: ["I e IV.", "II e III.", "I, III e IV.", "II, III e IV."],
    correctOption: 1,
    explanation: "Verbos defectivos são aqueles que não possuem a conjugação completa. 'Falir' e 'Abolir' não possuem, por exemplo, a primeira pessoa do singular do presente do indicativo."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Tipos de Predicado)",
    questionText: "Relacione as colunas quanto à classificação do predicado.\n1 – Predicado verbal\n2 – Predicado nominal\n3 – Predicado verbo-nominal\n( ) A aluna ficou fascinada pela aula...\n( ) No parque aquático, há garantia de diversão...\n( ) As atitudes de algumas mulheres públicas são inaceitáveis.\n( ) Os trabalhadores voltaram cansados...",
    options: ["2 - 2 - 3 - 1", "1 - 3 - 2 - 3", "2 - 1 - 2 - 3", "3 - 2 - 1 - 2"],
    correctOption: 2,
    explanation: "Ficou fascinada (Nominal - 2). Há garantia (Verbal - 1). São inaceitáveis (Nominal - 2). Voltaram cansados (Verbo de ação + estado/predicativo = Verbo-Nominal - 3)."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Orações Subordinadas Adverbiais)",
    questionText: "Leia:\n*Enquanto a primavera mostrava todo o seu esplendor*, as andorinhas sentiam o perigo que rondava seus irmãos.\nA oração subordinada adverbial presente no texto acima classifica-se como:",
    options: ["causal.", "temporal.", "concessiva.", "consecutiva."],
    correctOption: 1,
    explanation: "A conjunção 'Enquanto' expressa uma ideia de tempo (simultaneidade), introduzindo uma Oração Subordinada Adverbial Temporal."
  },
  {
    subject: "Português",
    topic: "Acentuação Gráfica",
    questionText: "Assinale a alternativa em que todas as palavras estão corretamente acentuadas (conforme o Novo Acordo Ortográfico).",
    options: [
      "idéia - anéis - rústico - propósito",
      "bênção - colméia - heróico - amável",
      "chapéus - sóis - vatapá - beneficiário",
      "históricos - extraordinário - víssemos - estréiam"
    ],
    correctOption: 2,
    explanation: "O Novo Acordo retirou o acento dos ditongos abertos (ei, oi) das palavras paroxítonas (logo, ideia, colmeia, heroico, estreiam perderam o acento). Em oxítonas e monossílabos tônicos (chapéus, sóis) o acento foi mantido."
  },
  {
    subject: "Português",
    topic: "Morfologia (Conjugação Verbal)",
    questionText: "Assinale a alternativa que preenche, correta e respectivamente, o texto abaixo.\nA Polícia _________ com firmeza na briga... O policial _________ o chefe da torcida e __________ a carteira roubada.",
    options: [
      "interveio - reteve - requereu",
      "interveio - reteu - requereu",
      "interviu - reteve - requis",
      "interviu - reteu - requis"
    ],
    correctOption: 0,
    explanation: "Intervir deriva de vir (ele interveio, assim como ele veio). Reter deriva de ter (ele reteve, assim como ele teve). Requerer não segue o verbo querer em todas as formas, seu pretérito perfeito é 'ele requereu'."
  }
];

async function seed() {
  console.log("Iniciando injeção de missões táticas (Questões EAGS SIN 2024 - Português P2) no Banco de Dados...");
  
  try {
    await db.insert(questions).values(eags2024PtPart2);
    console.log(`[SUCESSO] ${eags2024PtPart2.length} questões de Português inseridas no banco de dados com êxito.`);
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
