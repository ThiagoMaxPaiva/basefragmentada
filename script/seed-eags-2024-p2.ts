import { db } from "../server/db";
import { questions } from "../shared/schema";

const eags2024QuestionsPart2 = [
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores (IPsec)",
    questionText: "Avalie as informações abaixo sobre o IPsec.\nI- É orientado a conexões.\nII- Pode ser usado nos modos transporte e tunelamento.\nIII- Possui três partes principais: cabeçalho, corpo e mensagem.\nIV- Possui dados de protocolo chamados de associação de conexão remota.",
    options: ["I e II.", "I e IV.", "II e III.", "III e IV."],
    correctOption: 0,
    explanation: "O IPsec é orientado à conexão (Security Associations) e opera basicamente em dois modos: Transporte (criptografa apenas o payload) e Tunelamento (criptografa o pacote IP inteiro)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores (DNS)",
    questionText: "Em relação ao protocolo Domain Name System (DNS), marque V para verdadeiro ou F para falso nas sentenças abaixo.\n( ) A essência do DNS é a criação de um sistema distribuído de atribuição de IPs.\n( ) Os tipos de domínios de nível superior são divididos em dois: genéricos e de países.\n( ) O DNS é utilizado somente para publicar endereços IP em servidores através de um banco de dados local.\n( ) Uma organização chamada ICANN (Internet Corporation for Assigned Names and Numbers) controla o topo da hierarquia de nomes para a internet.",
    options: ["F - V - F - V", "V - F - F - V", "V - F - V - F", "F - V - V - F"],
    correctOption: 0,
    explanation: "O DNS não atribui IPs (quem faz isso é o DHCP), ele resolve nomes (F). TLDs (Top-Level Domains) são genéricos (.com, .org) e ccTLDs de países (.br, .uk) (V). O DNS é um sistema hierárquico e distribuído globalmente, não apenas banco local (F). A ICANN administra a raiz do DNS (V)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos",
    questionText: "Relacione as colunas quanto aos conceitos de POO.\n1 – Classe\n2 – Objeto\n3 – Construtor\n( ) É uma estrutura dinâmica que encapsula estado e comportamento.\n( ) É executado automaticamente quando um objeto é instanciado utilizando o operador 'new'.\n( ) Trata-se de modelo ou template que permite a criação de idênticas estruturas dinâmicas.",
    options: ["1 - 2 - 3", "2 - 3 - 1", "3 - 1 - 2", "3 - 2 - 1"],
    correctOption: 1,
    explanation: "Objeto é a estrutura dinâmica/instância (2). O construtor é o método invocado no 'new' (3). A classe é o molde/template (1)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistema Operacional Linux",
    questionText: "Maria e Alice foram escaladas para a Comissão de Recebimento de Material da seção de Licitações. Cada uma recebeu um arquivo contendo uma lista com os materiais. Ao iniciar a tarefa, elas quiseram verificar a diferença de conteúdo nos dois arquivos de texto. Para efetuar essa operação no Sistema Operacional Linux, devem utilizar o seguinte comando:",
    options: ["diff", "du", "df", "tail"],
    correctOption: 0,
    explanation: "O comando 'diff' compara arquivos linha por linha para encontrar diferenças. 'du' mostra o uso de disco de arquivos, 'df' o espaço livre em partições e 'tail' lê o final de um arquivo."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados (SQL)",
    questionText: "Na linguagem SQL ocorre a subdivisão de comandos de acordo com as funções que desempenham. As duas principais subdivisões são DDL (Data Definition Language) e DML (Data Manipulation Language). Assinale a alternativa que apresenta somente comandos SQL DML utilizados no SGBD MySQL.",
    options: [
      "INSERT - ALTER DATABASE - DROP DATABASE",
      "DROP DATABASE - UPDATE - MERGE",
      "UPDATE - CONSTRAINT - MERGE",
      "INSERT - UPDATE - DELETE"
    ],
    correctOption: 3,
    explanation: "INSERT, UPDATE e DELETE são os principais comandos de Manipulação de Dados (DML). ALTER, DROP e CREATE são de Definição de Dados (DDL)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores (IPv4)",
    questionText: "Em relação ao protocolo IP versão 4 (IPv4), marque V para verdadeiro ou F para falso.\n( ) O campo deslocamento de fragmento permite que o host de origem determine a qual pacote pertence o datagrama.\n( ) O campo tamanho total informa tudo o que há no datagrama - cabeçalho e dados.\n( ) O campo TTL é um contador utilizado para limitar a vida útil dos pacotes.\n( ) O campo identificação é onde vai o endereço IP de origem e destino.",
    options: ["V - F - V - F", "F - V - F - V", "F - V - V - F", "V - F - F - V"],
    correctOption: 2,
    explanation: "O deslocamento (offset) indica a posição do fragmento, quem identifica a qual datagrama original pertence é o campo Identificação (F). O tamanho total engloba Header + Payload (V). TTL limita a sobrevida do pacote em saltos de roteadores (V). Identificação não guarda os IPs de origem e destino, eles têm campos próprios (F)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Relacione as colunas quanto aos protocolos e suas respectivas camadas no modelo de referência TCP/IP.\n1 – Transporte\n2 – Aplicação\n3 – Enlace\n( ) HTTP\n( ) SMTP\n( ) UDP\n( ) TCP\n( ) DSL",
    options: ["3 - 2 - 1 - 3 - 2", "2 - 3 - 3 - 1 - 1", "2 - 2 - 1 - 1 - 3", "3 - 1 - 2 - 2 - 3"],
    correctOption: 2,
    explanation: "HTTP e SMTP são protocolos da camada de Aplicação (2). UDP e TCP são da camada de Transporte (1). DSL opera na camada de Enlace/Acesso à rede (3)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Avalie as informações abaixo quanto à memória RAM.\nI- A quantidade de soquetes de memória presentes na placa-mãe determinará o limite de memória do computador.\nII- A instalação de mais memória RAM sempre deixará o computador com processamento mais rápido.\nIII- Memórias ECC são usadas em servidores por possuírem um algoritimo que identifica e corrige erros (Código de Correção de Erros).\nIV- A memória do computador não precisa ser compatível com o barramento de dados do processador.",
    options: ["I e IV.", "I e III.", "III e II.", "II e IV."],
    correctOption: 1,
    explanation: "Os soquetes são um dos limitadores de expansão física (I). Colocar mais RAM não garante processamento mais rápido se o gargalo for a CPU (II falsa). ECC (Error-Correcting Code) corrige corrupções em tempo real (III verdadeira). A memória deve ser compatível com as frequências suportadas (IV falsa)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em relação às formas normais, marque V para verdadeiro ou F para falso.\n( ) Atributos compostos, multivalorados ou grupo repetidos de dados são permitidos na tabela que está na 1FN.\n( ) A 2FN só é aplicável para tabelas que possuam uma chave primária composta e que, além disso, tenham outros atributos que não façam parte da chave primária.\n( ) A tabela que está na 3FN possui dependências transitivas.\n( ) Toda tabela está na 1FN se os seus atributos forem atômicos.\n( ) A dependência transitiva é eliminada criando-se uma nova tabela que conterá o atributo que depende mais o atributo do qual ele é dependente.",
    options: ["F - F - V - F - V", "V - V - F - V - F", "F - V - F - V - V", "V - F - V - F - V"],
    correctOption: 2,
    explanation: "1FN não permite dados repetidos ou multivalorados (F). 2FN remove dependências parciais, o que só faz sentido se a chave for composta (V). 3FN não permite dependências transitivas (F). 1FN requer atributos atômicos indivisíveis (V). Retira-se a dependência transitiva movendo o atributo para uma nova tabela (V)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Com o crescimento da internet, os endereços IPv4 se tornaram escassos. O endereçamento IPv6 seria a solução para o problema, mas a transição total de endereços ainda irá demorar um tempo. Para que não faltassem endereços IP foi necessária uma correção. Assinale a alternativa que indique a tecnologia usada para essa correção.",
    options: ["CIDR", "NAT", "UDP", "FTP"],
    correctOption: 1,
    explanation: "O NAT (Network Address Translation) mascara e mapeia múltiplos endereços IP privados internos sob um único endereço IP público válido na Internet, atenuando a falta do IPv4."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores (Topologias)",
    questionText: "Em relação às topologias de rede, marque V para verdadeiro ou F para falso nas sentenças abaixo.\n( ) Barramento - Contém apenas um cabo backbone terminado em suas extremidades ao qual os hosts são todos conectados.\n( ) Anel - Liga um host ao outro; e o último, a um ponto central.\n( ) Estrela - Liga os hosts a um ponto central.\n( ) Malha - Liga cada host a todos os outros hosts.\n( ) Hierárquica - Une hosts ligados em malha a um ponto central.",
    options: ["V - F - V - F - F", "F - V - F - V - V", "F - V - F - F - V", "V - F - V - V - F"],
    correctOption: 3,
    explanation: "Barramento tem o cabo backbone (V). Anel liga o último ao primeiro host, fechando o loop, e não a um ponto central (F). Estrela usa nó central como switch/hub (V). Malha (Mesh) interliga todos entre si (V). Hierárquica (Árvore) interliga hubs/switches em níveis, não requer malha plena na base (F)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Marque a alternativa com o tipo de fibra óptica mais caro e muito utilizado em longas distâncias.",
    options: ["Monomodo", "Multimodo", "Coaxial", "FTTH"],
    correctOption: 0,
    explanation: "A fibra Monomodo tem um núcleo muito fino onde transita apenas um feixe de luz (laser). É mais cara de se fabricar e as interfaces também são mais caras, alcançando distâncias de dezenas de quilômetros."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "Assinale a alternativa que completa correta e respectivamente as lacunas das sentenças abaixo.\nO gerenciamento de arquivos é realizado pelo SO... a parte que trata dos arquivos é conhecida como _________________.\n...uma das principais funções do Sistema Operacional é _____________ todos os dispositivos _________________ de um computador.\n...o primeiro programa a ser executado ao se ligar um computador, em um processo chamado de _________________.",
    options: [
      "Sistema de Arquivos - controlar - de E/S (Entrada/ Saída) - Bootstrapping",
      "Sistema de Início - controlar - de Entrada - Bootstrapping",
      "Sistema de Arquivos - separar - de Saída - Init",
      "Bootstrapping - separar - de Hardware - Init"
    ],
    correctOption: 0,
    explanation: "Gerencia arquivos = Sistema de Arquivos (File System). Controla dispositivos de I/O (Entrada e Saída). O processo de inicialização e carregamento do SO do disco para a RAM chama-se Bootstrapping (Boot)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Desenvolvimento Web (PHP)",
    questionText: "Analise o algoritmo abaixo, escrito em PHP, e assinale a alternativa que contém a correta saída da variável $o.\nfor ($o= 2; $o < 9; $o++)\n{\n  print $o;\n}\n?>",
    options: ["12345678910", "23456789", "2345678", "9"],
    correctOption: 2,
    explanation: "O laço inicia com o valor 2 e repete enquanto for estritamente menor que 9 (ou seja, até 8). Ele imprimirá os números sequenciais grudados: 2345678."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O departamento pessoal e o setor de finanças de uma organização estão conectados à rede local por um mesmo switch. O administrador dessa rede precisa separar o tráfego de rede dos setores citados via software. Assinale a alternativa que contém um recurso possível de ser utilizado pelo administrador da rede.",
    options: ["Gateway de aplicação", "Spanning Tree", "LAN virtual", "Broadcast"],
    correctOption: 2,
    explanation: "A VLAN (Virtual LAN / LAN virtual) permite a segmentação lógica de uma rede física, isolando os domínios de broadcast por software, configurando-se no switch quais portas pertencem a cada rede."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Desenvolvimento Web",
    questionText: "Assinale a alternativa que indica um Sistema Gerenciador de Banco de Dados (SGBD) não compatível com o PHP.",
    options: ["SQLite", "MySQL", "TableQSL", "PostgreSQL"],
    correctOption: 2,
    explanation: "SQLite, MySQL e PostgreSQL são SGBDs robustos amplamente utilizados e nativamente compatíveis com PHP. 'TableQSL' é uma nomenclatura inventada pela banca."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software (UML)",
    questionText: "Em UML, os limites inferior e superior da quantidade de objetos aos quais outro objeto pode ser associado são chamados de multiplicidades. Em relação às multiplicidades, analise a figura [ Atendente 1 ---- 0..* Venda ] e assinale a alternativa correta.",
    options: [
      "O objeto da classe Atendente está associado a um, e a somente um, objeto da classe Venda.",
      "O objeto da classe Venda está associado a um, e a somente um, objeto da classe Atendente.",
      "O objeto da classe Venda está associado a vários objetos da classe Atendente.",
      "O objeto da classe Atendente possui 10 associações."
    ],
    correctOption: 1,
    explanation: "A multiplicidade é lida da classe de origem para o lado oposto. Uma Venda (lendo para a esquerda) possui exatamente 1 (um) Atendente."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Assinale a alternativa que completa corretamente a lacuna da frase abaixo.\n______________ são conectores de vídeo que utilizam sinais digitais.",
    options: ["VGA, DisplayPort e S-Vídeo", "VGA, DVI-A e S-Vídeo", "HDMI, DVI e VGA", "HDMI, DisplayPort e Thunderbolt"],
    correctOption: 3,
    explanation: "VGA, S-Vídeo e DVI-A utilizam sinais analógicos. HDMI, DisplayPort e Thunderbolt transmitem imagens digitalmente."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistema Operacional Linux",
    questionText: "Os computadores são capazes de realizar várias tarefas ao mesmo tempo, sendo aparente para o usuário os processos em primeiro plano. Como são chamados os processos realizados em segundo plano, com a finalidade de tratar alguma atividade, como por exemplo páginas web e impressão?",
    options: ["Gerenciadores.", "Registradores.", "Daemons.", "System."],
    correctOption: 2,
    explanation: "Em sistemas UNIX-like/Linux, processos de sistema que rodam invisíveis em background prestando serviços são chamados de Daemons (ex: httpd, cupsd, sshd)."
  }
];

async function seed() {
  console.log("Iniciando injeção de missões táticas (Questões EAGS SIN 2024 - 2ª Parte) no Banco de Dados...");
  
  try {
    await db.insert(questions).values(eags2024QuestionsPart2);
    console.log(`[SUCESSO] ${eags2024QuestionsPart2.length} questões inseridas no banco de dados com êxito.`);
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
