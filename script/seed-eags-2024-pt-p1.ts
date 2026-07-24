import { db } from "../server/db";
import { questions } from "../shared/schema";

const eags2024PtPart1 = [
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "Leia o texto 'O pavão' de Rubem Braga: \n\n'Eu considerei a glória de um pavão ostentando o esplendor de suas cores; é um luxo imperial... O que há são minúsculas bolhas d’água em que a luz se fragmenta, como em um prisma. O pavão é um arco-íris de plumas. Eu considerei que este é o luxo do grande artista, atingir o máximo de matizes com um mínimo de elementos. De água e luz ele faz seu esplendor; seu grande mistério é a simplicidade. Considerei, por fim, que assim é o amor, oh minha amada; de tudo que ele suscita e esplende e estremece e delira em mim existem apenas meus olhos recebendo a luz do teu olhar. Ele me cobre de glórias e me faz magnífico.'\n\nAvalie as informações abaixo acerca do texto.\nI- O texto tem como objetivo desconstruir o conceito já estabelecido sobre a pigmentação das penas do pavão.\nII- As metáforas construídas para o pavão encaminham o texto para as conclusões pessoais do autor sobre o sentimento amoroso.\nIII- O emprego da linguagem figurada, no primeiro parágrafo, objetiva reforçar a necessidade de se exaltar a simplicidade e a criatividade do grande artista.\nIV- O uso das expressões “máximo de matizes” e “mínimas bolhas” coloca em evidência o contraste entre a pequenez de quem ama e a grandiosidade da pessoa amada.",
    options: ["II somente.", "IV somente.", "I, II e III.", "I, III e IV."],
    correctOption: 0,
    explanation: "A assertiva I está errada porque o objetivo não é desconstruir a biologia do pavão, mas criar uma alegoria poética. A III está errada pois o grande artista é a natureza, não o foco principal do texto em si que é chegar no amor. A IV está incorreta pois o contraste de grandiosidade refere-se ao pavão (matizes e elementos) e, metaforicamente, à simplicidade do olhar que gera muito amor, não à 'pequenez de quem ama'. Logo, apenas a II está correta."
  },
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "Ainda sobre o texto 'O pavão', quanto às ideias presentes no primeiro parágrafo, pode-se depreender que:",
    options: [
      "a glória de um pavão tem relação somente com o fenômeno que acontece no arco-íris.",
      "as cores esplendorosas do pavão é algo inquestionável devido à beleza que ele proporciona.",
      "a relação estabelecida entre o pavão e o arco-íris tem como objetivo explicar que não existe o fenômeno da fragmentação da luz.",
      "o luxo imperial do pavão, na verdade, não existe, pois a ocorrência de cores de sua pena é similar ao fenômeno que acontece em um prisma."
    ],
    correctOption: 3,
    explanation: "O autor afirma no texto que as cores físicas não existem (são bolhas de água onde a luz se fragmenta), comparando-o a um prisma. Logo, as cores do 'luxo imperial' são um efeito luminoso."
  },
  {
    subject: "Português",
    topic: "Significação das Palavras (Sinônimos)",
    questionText: "Assinale a alternativa que contém os respectivos sinônimos para as formas verbais destacadas no trecho abaixo, considerando o texto.\n“... de tudo que ele suscita e esplende e estremece e delira em mim existem apenas meus olhos recebendo a luz do teu olhar.”",
    options: [
      "estimula - cintila - treme - exala",
      "susta - expele - vibra - enlouquece",
      "instiga - brilha - esmorece - definha",
      "desperta - resplandece - abala - alucina"
    ],
    correctOption: 3,
    explanation: "Suscita é acordar, causar, despertar. Esplende é brilhar muito, resplandecer. Estremece é abalar, agitar. Delira é sair da razão, alucinar."
  },
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "Leia: “Eu considerei que este é o luxo do grande artista, atingir o máximo de matizes com um número mínimo de elementos”.\nSobre esse trecho, pode-se afirmar que:",
    options: [
      "o exímio artista carece de muitos e variados elementos para produzir uma arte luxuosa.",
      "o auge da combinação de cores alcançado pelo grande artista está na utilização que ele faz de um ínfimo de elementos.",
      "a maestria do grande artista está na sua capacidade de gerar cores perfeitas a partir de uma variação de elementos simples.",
      "para o autor, o luxo do grande artista se mostra somente na capacidade deste de atingir o auge da combinação de cores."
    ],
    correctOption: 1,
    explanation: "O texto deixa claro que a genialidade (o luxo do artista) está em conseguir um resultado gigante ('máximo de matizes') utilizando muito pouco ('mínimo de elementos')."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Predicativo)",
    questionText: "Assinale a alternativa que contém um predicativo do sujeito.",
    options: [
      "Acho você elegante com esse vestido.",
      "Os estudantes acharam interessante a apresentação musical.",
      "Os professores retornaram animados das férias para o início das aulas.",
      "As alegres andorinhas fizeram ninhos primorosos na copa daquela árvore."
    ],
    correctOption: 2,
    explanation: "Na opção C, 'animados' é um adjetivo que caracteriza o sujeito 'Os professores' durante a ação de retornar (Verbo de ação com predicativo = predicado verbo-nominal). Nas letras A e B, os adjetivos caracterizam o objeto (predicativo do objeto). Na D, são apenas adjuntos adnominais."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Adjunto Adverbial)",
    questionText: "Analise os adjuntos adverbiais destacados nas frases abaixo. Depois assinale a alternativa que contém a sequência correta quanto às circunstâncias que eles indicam.\nI- *Apesar das dores*, saímos.\nII- Quando era jovem, passeava *de trem*.\nIII- *Com a tempestade*, a cidade foi destruída.\nIV- Registrou *com entusiasmo* o acontecimento.",
    options: [
      "modo - meio - modo - causa",
      "causa - modo - causa - causa",
      "concessão - meio - causa - modo",
      "concessão - modo - modo - modo"
    ],
    correctOption: 2,
    explanation: "Apesar de = Concessão. De trem = Meio (transporte). Com a tempestade = Causa (motivo de ser destruída). Com entusiasmo = Modo."
  },
  {
    subject: "Português",
    topic: "Morfologia (Adjetivos)",
    questionText: "Leia:\nInfelizmente, depois que meu pai fez 70 anos, ganhou um corpo *de velho* e passou a apresentar problemas *no pescoço*, *nos quadris* e *no fígado*.\nSubstitua as locuções adjetivas pelos adjetivos correspondentes, depois assinale a alternativa com a sequência correta.",
    options: [
      "viril - ciáticos - cervicais - hepáticos",
      "senil - cervicais - ciáticos - hepáticos",
      "viril - cervicais - ciáticos - renais",
      "senil - ciáticos - cervicais - renais"
    ],
    correctOption: 1,
    explanation: "De velho = senil; do pescoço = cervicais; dos quadris = ciáticos; do fígado = hepáticos."
  },
  {
    subject: "Português",
    topic: "Ortografia",
    questionText: "Assinale a alternativa em que todas as palavras devem ser completadas com a letra indicada entre parênteses.",
    options: [
      "influ__; bas__lar; arr__amento; requ__sito (i)",
      "__iboia; man__ericão; vare__ista; trá__icas (j)",
      "encai__ar; en__ugar; capi__aba; apetre__os (x)",
      "exce__ão; interce__ão; absten__ão; expan__ão (ç)"
    ],
    correctOption: 0,
    explanation: "Todos com I: influir, basilar, arriamento, requisito. Jiboia, manjericão e varejista são com J, mas trágicas é com G. Encaixar e enxugar são com X, mas apetrechos e capixaba (é com x? Sim) apetrechos é com CH. Exceção e abstenção com Ç, mas expansão é com S."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Tipos de Sujeito)",
    questionText: "Assinale a alternativa que apresenta oração sem sujeito.",
    options: [
      "Já haviam feito o trabalho de casa.",
      "Naquela tarde, fazia um calor intenso.",
      "Ninguém trouxe o material para a aula de hoje.",
      "De qualquer modo, foi lamentável a morte do animal."
    ],
    correctOption: 1,
    explanation: "Verbo Fazer indicando tempo ou fenômeno da natureza (fazia calor) é verbo impessoal e constitui oração sem sujeito."
  },
  {
    subject: "Português",
    topic: "Morfologia (Pronomes)",
    questionText: "Leia:\n*Ninguém* vai esquecer *o* que aconteceu na noite chuvosa de sábado, quando nuvens negras quase engoliram o vilarejo e espalharam a morte pelo local. *Tais* ações desesperaram *muitos* munícipes e despertaram a comoção em *todos*.\nOs pronomes em destaque classificam-se, respectivamente, como:",
    options: [
      "indefinido, átono, indefinido, demonstrativo, indefinido.",
      "indefinido, demonstrativo, demonstrativo, indefinido, indefinido.",
      "demonstrativo, átono, demonstrativo, demonstrativo, demonstrativo.",
      "demonstrativo, demonstrativo, indefinido, indefinido, demonstrativo."
    ],
    correctOption: 1,
    explanation: "Ninguém (indefinido). 'o' antes de 'que' equivale a 'aquilo' (demonstrativo). Tais (demonstrativo). Muitos e todos (indefinidos)."
  },
  {
    subject: "Português",
    topic: "Regência Nominal",
    questionText: "Considerando a norma culta da língua, assinale a alternativa correta quanto à regência nominal dos termos destacados.",
    options: [
      "As alunas por que tenho simpatia já estão aptas *com o* trabalho.",
      "As informações *às quais* tive acesso são relativas *ao* novo reitor.",
      "Estou convencido de que as alunas premiadas terão notas coerentes *para com* o seu desempenho.",
      "Os dois estudantes demonstravam desprezo *às* futilidades e ficavam alheios *para os* comentários maldosos."
    ],
    correctOption: 1,
    explanation: "Acesso rege 'a' (acesso às quais). Relativas rege 'a' (relativas ao). Na letra A o correto é aptas 'para o'. Na C, coerentes 'com'. Na D, alheios 'a' (aos comentários)."
  },
  {
    subject: "Português",
    topic: "Figuras de Linguagem",
    questionText: "Em qual das alternativas abaixo encontra-se hipérbole?",
    options: [
      "Fugimos das salas, do mundo talvez / Inda era mais bela rendida ao cansaço / Morrendo de amores em tal languidez! (Casimiro de Abreu)",
      "As plantas sofrem como nós sofremos. / Por que não sofreriam (Carlos D. Andrade)",
      "Era a luz de um crepúsculo indeciso / Entre os clarões de um sol que já vai longe (Raimundo Correa)",
      "A Natureza é um templo onde vivos pilares / Deixam sair às vezes palavras confusas (Charles Baudelaire)"
    ],
    correctOption: 0,
    explanation: "A hipérbole é o exagero intencional, presente na expressão 'Morrendo de amores'."
  },
  {
    subject: "Português",
    topic: "Figuras de Linguagem",
    questionText: "Assinale a alternativa que contém a figura de linguagem presente no texto abaixo.\nOs oceanos poluídos pedem socorro\nas algas marinhas gemem inconformadas\nos peixes e os golfinhos se consolam\nE o céu só olha, e nada pode fazer.",
    options: ["eufemismo", "hipérbole", "antítese", "prosopopeia"],
    correctOption: 3,
    explanation: "Atribuir ações e sentimentos humanos a seres irracionais e inanimados (oceanos pedem socorro, algas gemem) constitui a Prosopopeia ou Personificação."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Conjunções)",
    questionText: "Leia:\nOs policiais agiram com rigor, *como* determina o regulamento.\nA conjunção subordinativa presente na frase acima exprime circunstância de:",
    options: ["causa.", "condição.", "consequência.", "conformidade."],
    correctOption: 3,
    explanation: "A conjunção 'como', quando pode ser substituída por 'conforme' ou 'segundo', indica conformidade."
  },
  {
    subject: "Português",
    topic: "Morfologia (Adjetivos)",
    questionText: "Assinale a alternativa com a sequência correta quanto ao que se diz sobre a formação dos adjetivos destacados.\nI- Meu primo assistiu ao jogo do time *bogotano*.\nII- O trabalho *excessivo* pode causar problemas cardíacos.\nIII- Sob os cabelos *encaracolados* daquela mulher, reluziam os brincos dourados.\nIV- As situações *socioeconômicas* atraem os candidatos em época de eleição.",
    options: [
      "pátrio - simples - derivado - simples",
      "pátrio - derivado - derivado - composto",
      "derivado - simples - composto - derivado",
      "derivado - derivado - composto - composto"
    ],
    correctOption: 1,
    explanation: "Bogotano (pátrio, relativo a Bogotá). Excessivo (derivado do substantivo excesso). Encaracolados (derivado, particípio do verbo encaracolar). Socioeconômicas (composto, sócio + econômica)."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Termos da Oração)",
    questionText: "Assinale a alternativa que classifica, correta e respectivamente, os termos destacados na frase abaixo.\nA filha *de Maria* tinha *no rosto* uma terrível expressão *de dor*.",
    options: [
      "adjunto adnominal - adjunto adverbial - adjunto adnominal",
      "complemento nominal - adjunto adverbial - adjunto adnominal",
      "adjunto adnominal - adjunto adnominal - complemento nominal",
      "complemento nominal - adjunto adnominal - complemento nominal"
    ],
    correctOption: 0,
    explanation: "A filha 'de Maria' (posse, ligado a substantivo concreto) = Adjunto Adnominal. 'no rosto' (circunstância de lugar) = Adjunto Adverbial. expressão 'de dor' (tipo de expressão, classificador) = Adjunto Adnominal (a dor não sofre a ação de expressar)."
  },
  {
    subject: "Português",
    topic: "Morfologia (Verbos)",
    questionText: "Leia:\n*Voltem* logo para casa hoje, meninas, pois meus pais *exigem* que *estejam* presentes à cerimônia... Vocês não *podem* faltar...\nOs verbos destacados encontram-se conjugados, respectivamente, no:",
    options: [
      "presente do subjuntivo, imperativo afirmativo, presente do subjuntivo, presente do indicativo.",
      "imperativo afirmativo, presente do indicativo, presente do subjuntivo, presente do indicativo.",
      "presente do subjuntivo, imperativo afirmativo, presente do indicativo, imperativo afirmativo.",
      "imperativo afirmativo, presente do indicativo, presente do indicativo, imperativo afirmativo."
    ],
    correctOption: 1,
    explanation: "Voltem = exprime ordem (Imperativo Afirmativo). Exigem = tempo atual certo (Presente do Indicativo). Estejam = possibilidade/desejo no presente (Presente do Subjuntivo). Podem = tempo atual certo (Presente do Indicativo)."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Predicativo)",
    questionText: "Quanto aos termos destacados, marque 1 para predicativo do sujeito e 2 para predicativo do objeto.\n( ) A vítima bateu *impaciente* à porta...\n( ) Os advogados julgaram *indiscutíveis* os argumentos...\n( ) A literatura aclamou Castro Alves *o poeta dos escravos*.\n( ) *Inconformados* com a prefeitura estavam os moradores...\nAssinale a sequência correta.",
    options: ["1 - 1 - 2 - 2", "2 - 2 - 1 - 1", "1 - 2 - 2 - 1", "2 - 1 - 1 - 2"],
    correctOption: 2,
    explanation: "1- 'impaciente' qualifica o sujeito 'A vítima'. 2- 'indiscutíveis' qualifica o objeto 'os argumentos'. 3- 'o poeta' qualifica o objeto 'Castro Alves'. 4- 'Inconformados' qualifica o sujeito 'os moradores'."
  },
  {
    subject: "Português",
    topic: "Concordância Verbal",
    questionText: "Leia:\nI- No jardim, viam-se as borboletas e os passarinhos.\nII- Não haviam muitas opções no cardápio daquele restaurante.\nIII- Mais de um professor se ofenderam com a manifestação feita pelos alunos.\nIV- Existe, no Brasil, inúmeros cientistas empenhados no estudo da COVID 19.\nHá erro de concordância verbal em:",
    options: ["I e II.", "I e III.", "II e IV.", "III e IV."],
    correctOption: 2,
    explanation: "Na II, o verbo 'haver' com sentido de 'existir' é impessoal (deveria ser 'Não havia...'). Na IV, o verbo deveria concordar com o sujeito plural 'Existem... inúmeros cientistas'."
  },
  {
    subject: "Português",
    topic: "Sintaxe (Vozes Verbais)",
    questionText: "Em qual alternativa se encontra um Agente da Passiva?",
    options: [
      "Viveu todos os seus dias pelas crianças daquele orfanato.",
      "Naquele ano, os condôminos foram difamados pela síndica.",
      "Durante o evento, moradores clamaram pela atenção do prefeito.",
      "Todas as quartas-feiras, você será responsável pela disciplina desta sala."
    ],
    correctOption: 1,
    explanation: "O agente da passiva indica quem pratica a ação sobre o sujeito paciente na voz passiva. 'pela síndica' é quem praticou a ação de difamar 'os condôminos'."
  }
];

async function seed() {
  console.log("Iniciando injeção de missões táticas (Questões EAGS SIN 2024 - Português P1) no Banco de Dados...");
  
  try {
    await db.insert(questions).values(eags2024PtPart1);
    console.log(`[SUCESSO] ${eags2024PtPart1.length} questões inseridas no banco de dados com êxito.`);
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
