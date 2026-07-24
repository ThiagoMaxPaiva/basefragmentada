import { db } from "../server/db";
import { questions } from "../shared/schema";

const eags2022Questions = [
  // --- LÍNGUA PORTUGUESA ---
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "Texto: 'O pulo do gato'. No terceiro parágrafo, o autor narra um episódio fictício. Pode-se depreender que sua intenção, com isso, é:",
    options: [
      "denunciar crimes bárbaros que acontecem sem que a população saiba.",
      "mostrar que não é necessário usar adjetivos para emocionar.",
      "exemplificar o pulo do gato, numa referência ao título.",
      "mostrar que um texto pode ser racional e frio."
    ],
    correctOption: 1,
    explanation: "O autor afirma que jornalistas acham que adjetivos emocionam, mas ele discorda. Ele usa o episódio brutal descrito de forma despida para mostrar que os fatos por si só emocionam, não os adjetivos."
  },
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "Considerando as manchetes fictícias apresentadas abaixo, sobre a pandemia de 2020, assinale aquela que está de acordo com o que o texto defende.",
    options: [
      "Desleixadas campanhas não conseguiram conter a pandemia.",
      "A irremediável Covid-19 afetou grande parte da população.",
      "O brilhante caso das pessoas que se recuperaram.",
      "Governo propõe retomada das atividades."
    ],
    correctOption: 3,
    explanation: "A alternativa D é a única despida de adjetivos ('desleixadas', 'irremediável', 'brilhante'), indo de encontro à tese do autor de que o bom jornalismo deve ser isento de adjetivação excessiva."
  },
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "A expressão “pulo do gato” no título faz referência a quê?",
    options: [
      "Ao uso correto de palavras que só a experiência porporciona.",
      "À diferenciação entre jornalismo e psicologia.",
      "À distinção entre razão e emoção.",
      "Ao uso de adjetivos."
    ],
    correctOption: 2,
    explanation: "O texto afirma diretamente: 'O texto deve saber dosar emoção e razão, e é nesse equilíbrio que está o chamado pulo do gato'."
  },
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "O autor do texto afirma que jornalismo é equilíbrio entre razão e emoção — o que resulta no chamado “pulo do gato”. Essa ideia equivale a dizer que:",
    options: [
      "a redação de uma frase despida e cortante nada tem que ver com estilo e com capacidade de articulação linguística.",
      "o texto jornalístico não pode ser feito sem uso de linguagem literária, que possibilita muitos usos para além da adjetivação.",
      "tudo tem de ser usado no texto com parcimônia: a sociologia, a literariedade e a objetividade, principalmente em se tratando de reportagem.",
      "o uso consciente e racional do recurso linguístico é o que pode estar no texto jornalístico em si; a emoção esperada segue implícita, como jogo entre escritor e leitor."
    ],
    correctOption: 3,
    explanation: "A opção D resume perfeitamente o texto: a linguagem crua e racional (o recurso) provoca a emoção no leitor, criando esse equilíbrio implícito."
  },
  {
    subject: "Português",
    topic: "Regência Nominal",
    questionText: "Assinale a alternativa que apresenta desvio de norma padrão, em relação à regência nominal.",
    options: [
      "Era um homem ambicioso com a fama. Não descansava sua mente, que projetava delírios de sucesso.",
      "A moça era filha da melhor doceira que já existira na região. E ela seguiu os passos de sua mãe, mas não era delicada de mão.",
      "Sim, havia um fato, e ele percorreu ruas, casas, redes sociais... Evidente era mais a curiosidade em dizer do que em saber.",
      "O filho queria brincar. Pedia que pedia à mãe. Coitada! Estava tão atarefada em encomendas! Suas mãos sabiam, e o coração doía."
    ],
    correctOption: 2,
    explanation: "O desvio ocorre em 'curiosidade em'. O correto seria 'curiosidade de dizer'. Os demais termos ('ambicioso por/com', 'delicada de', 'atarefada em') estão aceitáveis nos contextos gramaticais clássicos."
  },

  // --- INFORMÁTICA ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Em relação ao conceito de roteamento em rede de computadores, marque V para verdadeiro e F para falso.\n( ) O algoritmo de roteamento é a parte do software da camada de rede responsável pela decisão sobre a interface de saída a ser usada na transmissão do pacote de entrada.\n( ) Algoritmos não adaptativos baseiam suas rotas através da análise da rede em tempo real.\n( ) O algoritmo de roteamento RIP pertence à classe “Vetor de Distância”\n( ) Flooding é uma técnica na qual cada pacote de entrada é enviado para todas as interfaces de saída, exceto para aquela em que chegou.",
    options: [
      "V - V - F - F",
      "V - F - V - V",
      "F - F - V - F",
      "F - V - F - V"
    ],
    correctOption: 1,
    explanation: "1-Verdadeiro (o algoritmo de roteamento determina a interface de saída). 2-Falso (algoritmos não adaptativos são estáticos e não analisam em tempo real). 3-Verdadeiro (RIP é Distance Vector). 4-Verdadeiro (Flooding funciona espelhando para todas as portas exceto a de origem). *Contexto 2026: Apesar das redes definidas por software (SDN) centralizarem o controle hoje, as regras clássicas de protocolos IGP como RIP e o comportamento de flooding continuam sendo alicerces teóricos para concursos.*"
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Sabe-se que em JAVA, todas as classes herdam características direta, ou indiretamente, de uma classe específica. Assinale a alternativa que contém tal classe.",
    options: [
      "this",
      "object",
      "string",
      "override"
    ],
    correctOption: 1,
    explanation: "Em Java, a superclasse raiz de todas as classes é 'Object' (na alternativa aparece em minúsculo 'object'). 'this' é palavra-chave de escopo, 'string' é classe e 'override' é anotação."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Com relação aos operadores aritméticos, assinale a alternativa que apresenta a sequência correta da ordem de prioridade de operações.",
    options: [
      "divisão, adição, subtração e multiplicação",
      "exponenciação, multiplicação, adição e inversão de sinal",
      "inversão de sinal, exponenciação, multiplicação e subtração",
      "multiplicação, adição, manutenção de sinal e inversão de sinal"
    ],
    correctOption: 2,
    explanation: "A ordem de precedência padrão matemática e em linguagens clássicas é: 1º Operadores unários (inversão de sinal); 2º Exponenciação; 3º Multiplicação e Divisão; 4º Adição e Subtração."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Estruturas de Repetição",
    questionText: "Qual instrução, quando executada dentro de um while, for, do...while ou switch, ocasiona a saída imediata dessa instrução?",
    options: [
      "break",
      "public",
      "private",
      "extends"
    ],
    correctOption: 0,
    explanation: "A instrução 'break' força o encerramento imediato do loop de repetição ou bloco 'switch' em que se encontra, transferindo o fluxo para a linha de código imediatamente abaixo da estrutura."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Qual o nome da técnica pela qual um processo confirma que seu parceiro na comunicação é quem afirma ser e não um impostor?",
    options: [
      "Three Way Hand Shake",
      "autenticação",
      "criptografia",
      "IPSec"
    ],
    correctOption: 1,
    explanation: "A Autenticação (Authentication) é a garantia de identidade. Diferencia-se de Autorização (permissões) e Confidencialidade (criptografia). *Contexto 2026: Atualmente vemos o uso de Zero Trust Architecture (ZTA) e autenticações contínuas multifatoriais (MFA biometria comportamental), mas o conceito raiz de provar 'quem você é' continua sendo Autenticação.*"
  }
];

async function seed() {
  console.log("Iniciando injeção de missões táticas (Questões EAGS 2022) no Banco de Dados...");
  
  try {
    await db.insert(questions).values(eags2022Questions);
    console.log(`[SUCESSO] ${eags2022Questions.length} questões inseridas no banco de dados com êxito.`);
    console.log("Comando: Prontidão Operacional Aumentada.");
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
