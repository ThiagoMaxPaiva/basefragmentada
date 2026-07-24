import { db } from "../server/db";
import { questions } from "../shared/schema";

const eagsSinQuestions = [
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "A unidade básica de tratamento de informação é o byte (bynary term). Com um byte, cujo código é de 8 bits, é possível realizar quantas representações diversas efetuando todos os arranjos possíveis?",
    options: ["8", "16", "128", "256"],
    correctOption: 3,
    explanation: "Como 1 byte tem 8 bits, o número de arranjos possíveis é 2^8 = 256."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "Ciclo de memória é:",
    options: [
      "O tempo gasto para a memória realizar uma pesquisa binária",
      "O intervalo mínimo de tempo entre dois acessos sucessivos à memória",
      "O espaço de memória necessário para realizar uma operação aritmetica simples",
      "O intervalo mínimo de espaço expresso em bits, que uma memória precisa para armazenar um caractere"
    ],
    correctOption: 1,
    explanation: "O ciclo de memória corresponde ao tempo decorrido entre o início de uma operação de acesso à memória e o instante em que a memória está pronta para iniciar o próximo acesso."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "Indique a opção que completa corretamente a lacuna da assertativa a seguir:\nUm processador _____________ reconhece um número limitado de instruções que, em contrapartida, são otimizadas para que sejam executadas com mais rapidez.",
    options: ["CISC", "LISP", "MIBS", "RISC"],
    correctOption: 3,
    explanation: "RISC (Reduced Instruction Set Computer) possui um conjunto reduzido de instruções otimizadas para execução rápida, normalmente em um único ciclo de clock."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "Memória Cache é:",
    options: [
      "Um dispositivo especial de memória, que pode ser interposto entre a memória principal e a unidade central de processamento ou já vir inserido no próprio microprocessador, que tem por finalidade agilizar o processamento.",
      "Um dispositivo interposto entre o disco rígido e o processador, com a função de aumentar a capacidade de armazenamento do disco rígido",
      "Uma área do disco rígido utilizada para guardar uma cópia do sistema operacional",
      "Uma área da memória utilizada somente para realizar operações matemáticas."
    ],
    correctOption: 0,
    explanation: "A memória cache atua como um buffer ultrarrápido entre a CPU e a RAM, armazenando os dados mais frequentemente acessados para acelerar o processamento."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "São exemplos de formatos de Placa-Mãe:",
    options: ["AT,ATX e ITX", "ATX,AGP e PCI", "LISP, JAVA e DELPHI", "Pentium, Athlon e Duron"],
    correctOption: 0,
    explanation: "AT, ATX e ITX são padrões de fator de forma (form factor) que definem o tamanho físico e o layout das placas-mãe."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "O que é OverClock?",
    options: [
      "Técnica de se configurar qualquer tipo de componente eletrônico a trabalhar em um clock acima do especificado",
      "Técnica de se configurar determinados dispositivos de um computador",
      "Técnica que eleva o clock e muitos fabricantes recomendam.",
      "Técnica aplicável exclusivamente para processadores de 800MHz"
    ],
    correctOption: 0,
    explanation: "Overclocking consiste em configurar um componente (como CPU, GPU ou RAM) para operar com uma frequência (clock) mais alta do que a definida originalmente pelo fabricante."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "O que é barramento?",
    options: [
      "Conjunto de circuitos presentes na Placa-Mãe",
      "Dispositivo de entrada de dados, requerendo processamento",
      "Caminho de comunicação entre dois ou mais circuitos",
      "Comunicação entre circuitos eletrônicos e software."
    ],
    correctOption: 2,
    explanation: "Barramento (bus) é um conjunto de linhas de comunicação compartilhadas que conectam múltiplos subsistemas ou componentes de um computador."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "O local utilizado pelo processador para armazenar as informações de todos os programas que estiverem sendo executados em um computador denomina-se",
    options: ["memória ROM.", "memória SSD.", "memória HD.", "vídeo RAM.", "memória RAM."],
    correctOption: 4,
    explanation: "A memória RAM (Random Access Memory) é a memória volátil de trabalho do sistema, que armazena os dados dos programas em execução para acesso rápido do processador."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Em um computador, PCI, AGP e ISA são exemplos de barramentos de:",
    options: ["entrada/saída;", "cache;", "processador;", "memória;"],
    correctOption: 0,
    explanation: "PCI, AGP e o antigo ISA são padrões de barramento de entrada e saída (E/S ou I/O) usados para conectar placas de expansão e periféricos à placa-mãe."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "Um computador baseado em uma Unidade Central de Processamento do tipo RISC.",
    options: [
      "não faz uso de pipeline.",
      "executa cada instrução em um ciclo de relógio",
      "possui instruções de tamanho variável.",
      "possui muitos modos de endereçamento"
    ],
    correctOption: 1,
    explanation: "Uma das premissas clássicas da arquitetura RISC é buscar executar a maioria de suas instruções simples em um único ciclo de clock (ou ciclo de relógio)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Arquitetura de Computadores",
    questionText: "A arquitetura RISC de um computador possui as seguintes características, EXCETO:",
    options: [
      "Formatos simples de instruções.",
      "Modos simples de endereçamento.",
      "Operações memória-para-memória.",
      "Uma instrução por ciclo."
    ],
    correctOption: 2,
    explanation: "Na arquitetura RISC, as operações são feitas preferencialmente em registradores (Load/Store). Operações memória-para-memória são características de processadores CISC."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas de Numeração",
    questionText: "O número decimal 199 é representado nos sistemas hexadecimal e binário, respectivamente, como:",
    options: ["D8 e 11000111", "D8 e 11010111", "C7 e 11010111", "C7 e 11000111"],
    correctOption: 3,
    explanation: "199 em hexadecimal é C7 (C=12*16=192 + 7=199). Em binário, C (1100) e 7 (0111), logo 11000111."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Assinale a alternativa que preenche corretamenta a lacuna da assertativa a seguir:\nOs discos rígidos IDE têm um circuito chamado _______. Essa tecnologia é capaz de detectar erros no disco rígido antes mesmo que aconteçam",
    options: ["MTBF", "SMART", "HDBR", "SRHD"],
    correctOption: 1,
    explanation: "S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) é um sistema de monitoramento em discos rígidos (e SSDs) que relata indicadores de confiabilidade."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "Qual nome dado a um arquivo gravado no HD (Disco Rígido) que, ao invés de memorizar os dados do programas, memorizam os dados que o sistema não conseguiu escrever/ler nas memórias RAM?",
    options: ["Memória Virtual", "Memória Randômica", "Memória DIMM", "Memória DDR-3"],
    correctOption: 0,
    explanation: "A memória virtual (usando arquivo de paginação ou partição swap) é utilizada pelo SO para armazenar páginas de memória que não cabem na RAM física ou que não estão sendo acessadas no momento."
  }
];

async function seed() {
  console.log("Iniciando injeção de missões táticas (Questões EAGS SIN) no Banco de Dados...");
  
  try {
    await db.insert(questions).values(eagsSinQuestions);
    console.log(`[SUCESSO] ${eagsSinQuestions.length} questões do EAGS SIN inseridas no banco de dados com êxito.`);
    console.log("Comando: Prontidão Operacional Aumentada.");
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
