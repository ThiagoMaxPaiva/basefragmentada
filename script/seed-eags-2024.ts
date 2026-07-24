import { db } from "../server/db";
import { questions } from "../shared/schema";

const eags2024Questions = [
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Assinale a alternativa que preenche corretamente a lacuna do texto abaixo, a respeito de Lógica de Programação.\nPara se evitar que um mesmo trecho de código se repita várias vezes em um mesmo programa e se torne um algoritmo complexo, é possível dividir o código em partes menores, utilizando-se de ____________, o que pode gerar um programa menor e mais fácil de ser alterado futuramente.",
    options: ["matrizes", "parâmetros", "sub-rotinas", "métodos de pesquisa"],
    correctOption: 2,
    explanation: "Sub-rotinas (ou funções/procedimentos) são blocos de código isolados que realizam tarefas específicas e podem ser reaproveitados em várias partes do programa principal."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistema Operacional Linux",
    questionText: "Em relação aos processos periódicos do Sistema Operacional Linux, marque V para verdadeiro ou F para falso nas sentenças abaixo. Em seguida, assinale a alternativa com a sequência correta.\n( ) A execução de tarefas periódicas é tratada pelo daemon cron e permanece em execução até realizar 3 ciclos.\n( ) Crontab é o nome dado ao arquivo de configuração do cron.\n( ) As atividades realizadas pelo cron são registradas em logs por meio do systemlog.\n( ) O cron, ao ser iniciado, lê todos seus arquivos de configuração, armazena-os na memória e entra em estado de repouso.",
    options: ["V - V - F - F", "F - V - F - V", "F - F - V - V", "V - F - V - F"],
    correctOption: 1,
    explanation: "O daemon cron executa indefinidamente, não para em 3 ciclos (F). Crontab é de fato o arquivo de configuração (V). O syslog registra os logs, não 'systemlog' ou o log depende da distro (F). O cron lê os arquivos de configuração na memória e repousa até o momento da execução (V)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Para se obter uma área de trabalho maior é possível trabalhar com mais de um monitor conectado ao computador. A quantidade de monitores de vídeo suportada dependerá de qual componente?",
    options: ["Hub.", "Placa-mãe.", "Placa de vídeo.", "Processador gráfico."],
    correctOption: 2,
    explanation: "A quantidade de monitores simultâneos depende principalmente das saídas físicas disponíveis e suportadas pela placa de vídeo (GPU + circuito da placa)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Em relação à máscara de rede 255.255.255.192, assinale a alternativa que apresenta a correta notação binária.",
    options: [
      "11111111.11111111.11111111.00000000",
      "11111111.11111111.11111111.10000000",
      "11111111.11111111.11111111.11000000",
      "11111111.11111111.11111111.11100000"
    ],
    correctOption: 2,
    explanation: "255 é 11111111 em binário. O valor 192 é formado pelos dois primeiros bits mais significativos ligados (128 + 64), ou seja, 11000000."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software (UML)",
    questionText: "A UML (Unified Modeling Language) é uma linguagem de modelagem padrão que oferece um rico conjunto de notações para modelar classes. Na UML, a imagem abaixo representa uma classe, na qual a caixa superior contém o nome da classe e a inferior contém as operações. Assinale a alternativa que indique o estereótipo que a caixa central pode conter.\n<<Nome da Classe>>\n[Caixa Central]\n<<Operações>>",
    options: ["<<Relacionamentos>>", "<<Métodos>>", "<<Interfaces>>", "<<Atributos>>"],
    correctOption: 3,
    explanation: "No diagrama de classes da UML, uma classe é dividida em três compartimentos principais: o nome da classe (superior), os atributos (meio) e as operações/métodos (inferior)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores (Protocolos)",
    questionText: "Em relação ao protocolo UDP, marque V para verdadeiro ou F para falso nas sentenças abaixo. Em seguida, assinale a alternativa com a sequência correta.\n( ) Transmite segmentos com cabeçalhos de 8 bytes, seguido pela carga útil.\n( ) É um protocolo de transporte não orientado à conexão.\n( ) Não é muito útil nas solicitações cliente-servidor.\n( ) Realiza controle de fluxo e congestionamento.",
    options: ["F - F - V - V", "F - F - V - F", "V - V - F - V", "V - V - F - F"],
    correctOption: 3,
    explanation: "O cabeçalho UDP tem exatamente 8 bytes (V). É não orientado a conexão (V). É muito útil em consultas cliente-servidor rápidas como DNS (F). Não realiza controle de fluxo ou congestionamento; o TCP que faz isso (F)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos",
    questionText: "Relacione as colunas quanto a conceitos e tipos de polimorfismo. Em seguida, assinale a alternativa com a sequência correta.\n1 – Sobreposição\n2 – Polimorfismo\n3 – Sobrecarga\n( ) Pode também receber o nome de polimorfismo ad-hoc.\n( ) Permite que o método seja declarado com o mesmo nome, mesmo tipo de retorno e mesma lista de parâmetros da sua progenitora.\n( ) Permite o uso do mesmo nome de método para muitos métodos diferentes. Cada método difere apenas no número e no tipo de seus parâmetros.\n( ) Permite, em POO, que classes derivadas de uma mesma superclasse tenham métodos iguais, mas comportamentos diferentes, redefinidos em cada uma das classes filhas.",
    options: ["3 - 2 - 2 - 1", "2 - 1 - 3 - 1", "2 - 2 - 1 - 3", "3 - 1 - 3 - 2"],
    correctOption: 3,
    explanation: "Polimorfismo ad-hoc é Sobrecarga (3). O método com a exata mesma assinatura da progenitora é Sobreposição/Override (1). Uso do mesmo nome com parâmetros diferentes é Sobrecarga (3). Classes filhas com comportamentos diferentes para o mesmo método é Polimorfismo (2)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Relacione as colunas quanto ao padrão Ethernet. Em seguida, assinale a alternativa com a sequência correta. Obs.: Os números podem ser usados mais de uma vez.\n1 – Hub\n2 – Switch\n( ) Caracterizam-se por estações no mesmo domínio de colisão.\n( ) Melhora o isolamento do tráfego, evitando que ele escape com facilidade.\n( ) Necessita do algoritmo de CSMA/CD para programar suas transmissões.\n( ) Encaminham o tráfego somente para as portas às quais eles foram destinados.\n( ) Cada porta é seu próprio domínio de colisão.",
    options: ["1 - 2 - 1 - 2 - 2", "2 - 1 - 2 - 2 - 1", "1 - 2 - 2 - 1 - 1", "2 - 1 - 1 - 1 - 2"],
    correctOption: 0,
    explanation: "Estações no mesmo domínio de colisão é o Hub (1). Melhora o isolamento do tráfego é o Switch (2). CSMA/CD é fundamental em redes legadas com Hubs (1). Encaminha só pra porta destino é o Switch (2). Cada porta é seu próprio domínio de colisão no Switch (2)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Relacione as colunas referentes aos componentes internos de um computador. Em seguida, assinale a alternativa com a sequência correta.\n1 – Processador\n2 – Placa-mãe\n3 – Memória RAM\n4 – Cooler do processador\n( ) Local onde são instalados os componentes internos e a maioria dos componentes externos do computador.\n( ) Local onde o processador busca instruções para serem processadas.\n( ) Componente que realiza o processamento de dados.\n( ) Componente que serve para refrigerar o processador.",
    options: ["2 - 4 - 1 - 3", "3 - 2 - 4 - 1", "2 - 3 - 1 - 4", "4 - 1 - 3 - 2"],
    correctOption: 2,
    explanation: "Placa-mãe (2) conecta tudo. Memória RAM (3) guarda instruções ativas. Processador (1) realiza o processamento. Cooler (4) refrigera."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Avalie as informações abaixo sobre algoritmos de chave pública e simétrica.\nI- Algoritmos de chaves simétricas utilizam a mesma chave para codificação e decodificação.\nII- DES, em sua forma original, é um exemplo de algoritmo de chave simétrica.\nIII- RSA foi o primeiro algoritmo de chave simétrica criado.\nIV- A criptografia de chave pública exige que cada usuário tenha apenas uma única chave.",
    options: ["I e II.", "I e III.", "II e IV.", "III e IV."],
    correctOption: 0,
    explanation: "I e II são verdadeiras. III é falsa (RSA é assimétrico). IV é falsa (chave pública exige par de chaves: pública e privada)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software (Padrões de Projeto)",
    questionText: "Visando auxiliar muitos projetistas e programadores, a comunidade de Orientação a Objetos listou padrões de projetos contendo identificação, nomeação e descrição dos conceitos de projetos recorrentes. Referente a esse assunto, assinale a alternativa que apresenta somente padrões de projeto.",
    options: [
      "Iterator - Proxy - Adapter",
      "Adapter - Iterator - Unidade",
      "Adapter - Integração - Proxy",
      "Proxy - Integração - Unidade"
    ],
    correctOption: 0,
    explanation: "Iterator, Proxy e Adapter são padrões de projeto (Design Patterns) do GoF. 'Unidade' e 'Integração' referem-se a testes de software."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Desenvolvimento Web (PHP)",
    questionText: "Assinale a alternativa que indica qual deve ser a primeira função a ser chamada, antes de qualquer saída produzida pelo browser, ao se utilizar o método de cookies para armazenar o identificador da sessão no PHP.",
    options: ["session.id", "session_start", "session_register", "session.use_cookies"],
    correctOption: 1,
    explanation: "A função session_start() no PHP inicia a sessão (ou resume uma existente) e deve ser a primeira coisa no script, antes de qualquer saída HTML, para que os headers de cookies possam ser enviados."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Desenvolvimento Web (PHP)",
    questionText: "Em relação aos métodos do PHP, marque V para verdadeiro ou F para falso. Em seguida, assinale a alternativa com a sequência correta.\n( ) O método POST no PHP é o método padrão para envio de dados.\n( ) O método POST envia os dados do formulário por meio do corpo da mensagem encaminhada ao servidor.\n( ) Os métodos apenas declarados, mas sem implementação fornecida, chamam-se métodos neutros.\n( ) Um método construtor é aquele que será chamado toda vez em que for criado um objeto da classe onde ele foi declarado.",
    options: ["F - V - F - V", "V - F - F - V", "F - V - V - F", "V - F - V - F"],
    correctOption: 0,
    explanation: "O método padrão é o GET, não o POST (F). O POST envia dados no corpo (V). Métodos declarados sem implementação são métodos abstratos, não neutros (F). O construtor é chamado na criação do objeto (V)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Assinale a alternativa que completa corretamente a lacuna do texto abaixo.\n________ são módulos de memória de fácil identificação, pois se diferenciam dos demais módulos por serem os únicos a conter dois chanfrados delimitadores.",
    options: ["DDR1-DIMM", "SIMM-30", "DIMM", "SIPP"],
    correctOption: 2,
    explanation: "A questão refere-se aos antigos módulos DIMM SDR (SDRAM), que possuíam dois chanfros físicos na área dos contatos."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software (UML)",
    questionText: "Analise a figura abaixo e assinale a alternativa que indique o tipo de relacionamento de objeto representado e reconhecido pela UML.\nCliente ----> Fornecedor\n(Seta tracejada)",
    options: ["Generalização", "Dependência", "Composição", "Associação"],
    correctOption: 1,
    explanation: "Na UML, uma linha tracejada com uma seta aberta indica uma relação de Dependência."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software (UML)",
    questionText: "Assinale a alternativa que representa graficamente uma Classe Abstrata, segundo as notações da UML.",
    options: [
      "Nome em negrito normal",
      "Nome itálico na caixa da classe",
      "Nome sublinhado",
      "Estereótipo <<Abstract>>"
    ],
    correctOption: 1,
    explanation: "Em diagramas de classe UML, o nome de uma Classe Abstrata é representado em itálico."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos",
    questionText: "Em relação à Linguagem JAVA, marque V para verdadeiro ou F para falso nas sentenças abaixo. Em seguida, assinale a alternativa com a sequência correta.\n( ) O polimorfismo permite que uma nova classe herde atributos e comportamentos de outra classe.\n( ) Os três pilares da programação orientada a objetos são: classes, atributos e métodos.\n( ) O encapsulamento permite dividir o código em partes menores.\n( ) A herança permite redefinir métodos e atributos previamente existentes.",
    options: ["F - F - V - V", "V - F - F - V", "F - F - V - F", "F - V - V - F"],
    correctOption: 0,
    explanation: "A primeira é Herança, não Polimorfismo (F). Os três pilares fundamentais são Encapsulamento, Herança e Polimorfismo (F). Encapsulamento de fato oculta e modula partes menores do código em abstrações (V). E a herança permite override de métodos e aproveitamento de atributos (V)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em relação aos modelos de Banco de Dados, assinale, entre as alternativas abaixo, o atributo da entidade que identifica apenas um objeto dessa unidade, cujo valor não se repete e não poderá receber valor nulo.",
    options: ["Tupla", "Código", "Chave primária", "Valor secundário"],
    correctOption: 2,
    explanation: "A chave primária (Primary Key) é um identificador único de cada registro em uma tabela e possui restrições inerentes de unicidade e não-nulidade (NOT NULL)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados (SQL)",
    questionText: "Helena precisa modificar a NOTA dos alunos da ESPECIALIDADE de SIN do banco de dados ESCOLA_ESPECIALISTA. Todos os alunos dessa especialidade obtiveram nota 10. Qual comando Helena deverá digitar no terminal de linha de comando do SGBD MySQL para realizar essa modificação?",
    options: [
      "UPDATE ESCOLA_ESPECIALISTA SET NOTA=10;",
      "NEW NOTA SET VALOR=10 WHERE NOME=“SIN”;",
      "UPDATE ALUNOS SET NOTA=10 WHERE ESPECIALIDADE=“SIN”;",
      "MODIFICA NOTA SET VALOR=10 WHEN ESPECIALIDADE=“SIN”;"
    ],
    correctOption: 2,
    explanation: "A instrução correta de alteração de registros no SQL é o UPDATE. O formato é UPDATE tabela SET coluna=valor WHERE condição."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Avalie as informações abaixo sobre segurança da comunicação.\nI- As VPNs (Virtual Private Networks) podem ser construídas diretamente sobre a internet.\nII- O DoS (Denial of Service) caracteriza-se por um ataque cujo objetivo é desativar o destino e não roubar os dados.\nIII- O firewall inspeciona os pacotes que entram e saem da rede, funciona como um filtro de pacotes.\nIV- A DMZ (DeMilitarized Zone) é a parte da rede que cuida da segurança física do perímetro interno.",
    options: ["I, II, III e IV.", "II, III e IV.", "I somente.", "I, II e III."],
    correctOption: 3,
    explanation: "A DMZ é uma sub-rede lógica e não uma segurança 'física' do perímetro interno, ela isola serviços externos (IV é falsa). As outras três assertivas são verdadeiras."
  }
];

async function seed() {
  console.log("Iniciando injeção de missões táticas (Questões EAGS SIN 2024 - 1ª Parte) no Banco de Dados...");
  
  try {
    await db.insert(questions).values(eags2024Questions);
    console.log(`[SUCESSO] ${eags2024Questions.length} questões inseridas no banco de dados com êxito.`);
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
