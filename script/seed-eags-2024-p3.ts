import { db } from "../server/db";
import { questions } from "../shared/schema";

const eags2024QuestionsPart3 = [
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores (Modelo OSI)",
    questionText: "Avalie as sentenças abaixo, considerando o modelo de referência OSI e marque V para verdadeiro ou F para falso.\n( ) A camada de enlace de dados transmite bits.\n( ) A camada de rede faz controle de congestionamento de pacotes.\n( ) A camada de apresentação está ligada à sintaxe e à semântica nas transmissões de informações.\n( ) A camada de transporte é responsável por determinar o tipo de serviço a ser fornecido à camada de enlace.",
    options: ["V - F - F - V", "F - V - F - V", "V - F - V - F", "F - V - V - F"],
    correctOption: 3,
    explanation: "A camada de Enlace não lida diretamente com os bits, quem faz isso é a Física (F). A camada de Rede lida também com o controle de congestionamento do roteamento no modelo OSI (V). A Apresentação é responsável pela sintaxe e semântica, como criptografia/compressão (V). A camada de Transporte não provê serviço para Enlace, pois esta fica em camadas inferiores (F)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Desenvolvimento Web (PHP)",
    questionText: "Assinale a alternativa que corresponde a um comando condicional no PHP.",
    options: ["while", "switch", "foreach", "do...while"],
    correctOption: 1,
    explanation: "No PHP, 'while', 'foreach' e 'do...while' são estruturas de repetição (loops). O 'switch' é uma estrutura de desvio condicional."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware (Armazenamento)",
    questionText: "Entre as alternativas, assinale a que apresenta o modo RAID que se utiliza da técnica de divisão de dados e grava informações de paridade.",
    options: ["RAID 5", "RAID 1", "RAID 10", "RAID 0+1"],
    correctOption: 0,
    explanation: "O RAID 5 utiliza a distribuição/divisão (striping) dos dados somada a um bloco de paridade que é distribuído entre todos os discos do array, permitindo recuperar dados em caso de falha de 1 disco."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistema Operacional Linux",
    questionText: "Relacione as colunas quanto aos comandos utilizados para gerenciamento de redes no SO Linux.\n1 – ping\n2 – netstat\n3 – tcpdump\n4 – traceroute\n( ) Revela a sequencia de gateways até alcançar o IP de destino.\n( ) Analisa pacotes, fazendo o registro daqueles que atendem o critério...\n( ) Serve para testar segmentos de rede e o estado dos hosts.\n( ) Apresenta informações sobre portas TCP e UDP ativas.",
    options: ["1 - 2 - 3 - 4", "4 - 3 - 1 - 2", "2 - 4 - 1 - 3", "4 - 3 - 2 - 1"],
    correctOption: 1,
    explanation: "Traceroute mapeia os nós/gateways até o destino (4). Tcpdump captura e analisa pacotes brutos (3). Ping testa o estado de ICMP/Echo dos hosts (1). Netstat mostra conexões ativas TCP/UDP (2)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Desenvolvimento Web (PHP)",
    questionText: "Para exibir as strings fornecidas no PHP, utiliza-se a função ____.",
    options: ["cut", "split", "print", "dump"],
    correctOption: 2,
    explanation: "A instrução 'print' no PHP (assim como o construto da linguagem 'echo') é utilizada para enviar saídas e strings para a tela do navegador."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software (Testes)",
    questionText: "Durante o desenvolvimento de software podem ocorrer muitas alterações... Para garantir que uma alteração não introduza um erro capaz de danificar o sistema inteiro é fundamental testar novamente. Assinale a alternativa que apresenta o nome do teste realizado com essas ações.",
    options: ["Caixa branca", "Caixa preta", "Estrutura", "Regressão"],
    correctOption: 3,
    explanation: "Testes de Regressão consistem em aplicar as validações do passado sempre que o software sofre modificações, para garantir que nada do que funcionava antes foi quebrado."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistema Operacional Linux",
    questionText: "Wallace deseja alterar as permissões de um arquivo criado por ele para que seus amigos de turma possam realizar alterações. Qual comando ele deverá usar para que os membros do grupo informática possam realizar alterações no arquivo 'Simulado'? \nAtual: - rwx r-- r-- 1 wallace informática ... Simulado",
    options: [
      "chmod -R 744 /home/Simulado",
      "chmod 751 /home/Simulado",
      "chmod 760 /home/Simulado",
      "chmod 444 /home/Simulado"
    ],
    correctOption: 2,
    explanation: "Atualmente, o grupo 'informática' tem apenas leitura (r=4). Ele deseja que o grupo altere e leia, portanto rw (4+2=6). As permissões seriam Dono: 7(rwx), Grupo: 6(rw-), Outros: 0(---) ou similar. O comando chmod 760 configura perfeitamente."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Desenvolvimento Web (PHP)",
    questionText: "Relacione as colunas quanto à linguagem de programação PHP.\n1 – Coerção de tipo\n2 – Booleano\n3 – Depurador\n4 – Compilação\n( ) Adjetivo que se refere à lógica verdadeiro ou falso.\n( ) Expressão que explicitamente requisita a conversão de um tipo para outro.\n( ) Tradução de arquivo de texto em programa executável.\n( ) Software que localiza bugs.",
    options: ["2 - 3 - 4 - 1", "1 - 4 - 3 - 2", "2 - 1 - 4 - 3", "1 - 2 - 3 - 4"],
    correctOption: 2,
    explanation: "Booleano lida com V ou F (2). Coerção de tipo (Type Casting) converte variáveis (1). Compilação traduz o texto pra executável (4). Depurador auxilia em localizar bugs (3)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Assinale a alternativa que apresenta a saída do trecho de programa em português estruturado. Considere A=8, B=2, C=4 e D=9.\nse (C>=1) .ou. (D<=7) então\n  X ← (A + C)*(10 / B)\nsenão\n  X ← (D-1)/2\nfim_se\nescreva X",
    options: ["3", "4", "45", "60"],
    correctOption: 3,
    explanation: "A condição (C>=1) é 4>=1 que é Verdadeiro. No 'ou' logico (OR), se uma for verdadeira a sentença entra no bloco 'então'. Logo: X = (8 + 4) * (10 / 2) => 12 * 5 => 60."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistema Operacional Linux",
    questionText: "Relacione as colunas quanto à estrutura básica de diretórios do Sistema Operacional Linux.\n1 – /etc\n2 – /bin\n3 – /home\n4 – /boot\n( ) Contém arquivos executáveis, acessados pelos usuários.\n( ) Contém arquivos dos usuários.\n( ) Contém arquivos que controlam a inicialização do sistema.\n( ) Contém arquivos de configuração do Sistema Operacional.",
    options: ["4 - 3 - 1 - 2", "2 - 1 - 3 - 4", "1 - 4 - 3 - 2", "2 - 3 - 4 - 1"],
    correctOption: 3,
    explanation: "A pasta /bin abriga os binários essenciais dos usuários (2). A pasta /home guarda as pastas de arquivos pessoais dos usuários (3). O /boot hospeda o Kernel e Grub da inicialização (4). O /etc agrupa os arquivos de configuração (1)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Em relação à forma com que os dados são transmitidos, marque V para verdadeiro ou F para falso.\n( ) Os bits são transmitidos simultaneamente na transmissão paralela.\n( ) A transmissão em série pode ser assíncrona ou síncrona.\n( ) A maior desvantagem da transmissão em série é a alta susceptibilidade a ruídos, devido à quantidade de fios.\n( ) A transmissão paralela sempre será mais rápida que a transmissão em série.",
    options: ["V - F - V - F", "V - V - F - F", "F - F - V - V", "F - V - F - F"],
    correctOption: 1,
    explanation: "Na paralela há vários bits enviados juntos (V). A serial tem modos síncronos e assíncronos (V). A alta susceptibilidade a ruídos em fios em paralelo é um defeito da Paralela e não da Série (F). E hoje sabemos que cabos seriais (como SATA e USB 3+) são mais velozes que os velhos paralelos, devido a superação de problemas de interferência (F)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Em relação a tipos de dados em português estruturado, marque V ou F...\n( ) O operador relacional utilizado para representar que um valor é diferente de outro é o “<>”.\n( ) Os operadores multiplicação e divisão podem ser representados por “mult” e “div”.\n( ) Uma variável contendo um número será do tipo caractere, mesmo se não indicada entre aspas (“”).\n( ) Os dados do tipo lógico ou booleano deverão ser delimitados pelo caractere ponto. Por exemplo: .Falso. e .Verdadeiro.",
    options: ["V - F - F - V", "V - V - F - F", "F - F - V - V", "F - V - V - F"],
    correctOption: 0,
    explanation: "O sinal matemático de diferente comumente no portugol é `<>` (V). Os sinais básicos matemáticos são `*` e `/` (F). Variável numérica vira string apenas quando usamos aspas (F). Os booleanos na notação do VisuAlg usam pontos `.Falso.` (V)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "O tipo de lógica que tem como característica dividir um problema proposto em vários subproblemas a fim de facilitar a análise de cada rotina separadamente, é chamado de",
    options: ["lógica linear.", "lógica modular.", "lógica hierárquica.", "lógica estruturada."],
    correctOption: 1,
    explanation: "Lógica modular ou programação modular trata da decomposição de um grande problema em pequenos módulos mais fáceis de analisar, criar e gerenciar isoladamente."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Assinale a alternativa que completa corretamente as lacunas abaixo.\nA______________ é a maior placa de circuito impresso dentro do computador... Para conexão de dispositivos externos ao computador, são utilizadas portas do tipo __________.",
    options: ["Placa-mãe - eSATA", "Placa de vídeo - SATA", "Placa de rede - PATA", "Placa USB - RATA"],
    correctOption: 0,
    explanation: "A maior placa é a Placa-mãe (Motherboard). Dispositivos de armazenamento externos utilizam portas compatíveis, como o eSATA (external SATA)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados (SQL)",
    questionText: "Heitor recebeu a tarefa de adicionar o campo “SITUACAO” do tipo VARCHAR (20) na tabela tbAluno criada no banco de dados EEAR. Para realizar essa tarefa no MySQL, qual comando?",
    options: [
      "ALTER TABLE EEAR ADD SITUACAO VARCHAR (20);",
      "ALTER TABLE EEAR ADD VARCHAR (20) SITUACAO;",
      "ALTER TABLE tbAluno ADD SITUACAO VARCHAR (20);",
      "ALTER CAMPO tbAluno DROP SITUACAO VARCHAR (20);"
    ],
    correctOption: 2,
    explanation: "A sintaxe correta no MySQL é: ALTER TABLE <nome_da_tabela> ADD <nome_da_coluna> <tipo_de_dado>. Como a tabela se chama tbAluno, a opção correta é a letra C."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos",
    questionText: "Assinale a alternativa que completa a lacuna do texto abaixo.\nA POO oferece um tipo especial de classe que não pode ser instanciada. Trata-se da classe ____________.",
    options: ["empacotada", "concreta", "abstrata", "oculta"],
    correctOption: 2,
    explanation: "Uma Classe Abstrata (Abstract Class) atua apenas como modelo (superclasse) obrigando as subclasses a implementar seus métodos, impossibilitando a criação (instanciação) de objetos diretamente nela."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Considerando a variável X=2, Y=5, Z=“EEAR” assinale a alternativa que corresponde à saída do seguinte código em português estruturado:\nse X<1 .ou. (Z = “FAB”) então\n  escreva “Bem-vindo à EEAR”\nsenão\n  se Y<7 .e. (Z=“EEAR”) então\n    escreva “Bem-vindo à Escola de Especialistas da Aeronáutica”\n  senão\n    escreva Z",
    options: [
      "Bem-vindo à Escola de Especialistas da Aeronáutica",
      "Bem-vindo à EEAR",
      "EEAR",
      "FAB"
    ],
    correctOption: 0,
    explanation: "A primeira condição é Falsa, logo ele entra no 'senão'. A segunda condição avalia se (Y<7) E (Z=\"EEAR\"). Ambas são verdadeiras, então o programa executa a string contendo a mensagem longa de boas vindas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos",
    questionText: "Herança é um dos conceitos fundamentais da Programação Orientada a Objetos. Analise as afirmativas:\nI- As classes inferiores da hierarquia não herdam automaticamente todas as propriedades e os métodos das classes superiores.\nII- A herança permite basear uma nova classe na definição de uma classe previamente existente.\nIII- A classe filha é conhecida como superclasse e a classe progenitora como subclasse.\nIV- A herança permite o agrupamento de classes relacionadas.",
    options: ["I e II.", "I e IV.", "II e III.", "II e IV."],
    correctOption: 3,
    explanation: "I é falsa, pois herdam sim (só não conseguem acessar campos privados). II é verdadeira, é o conceito da herança. III é falsa pois o correto é filho = subclasse, e progenitora = superclasse. IV é verdadeira."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Relacione as colunas, considerando o assunto Lógica de Programação...\n1 – Diagrama de Chapin\n2 – Diagrama de Bloco\n3 – Formas de Representação Gráfica\n( ) Permite descrever o método e a sequência do processo dos planos num computador.\n( ) Permite apresentar uma visão hierárquica e estruturada da lógica do programa.\n( ) Permite apresentar os dados sobre uma superfície plana, de maneira simples e concisa...",
    options: ["1 - 2 - 3", "1 - 3 - 2", "2 - 3 - 1", "2 - 1 - 3"],
    correctOption: 3,
    explanation: "Fluxograma ou Diagrama de blocos descreve o método sequencial do algoritmo através de símbolos. O Diagrama de Nassi-Shneiderman (Chapin) exibe blocos hierárquicos encaixados na lógica do programa."
  }
];

async function seed() {
  console.log("Iniciando injeção de missões táticas (Questões EAGS SIN 2024 - 3ª Parte) no Banco de Dados...");
  
  try {
    await db.insert(questions).values(eags2024QuestionsPart3);
    console.log(`[SUCESSO] ${eags2024QuestionsPart3.length} questões inseridas no banco de dados com êxito.`);
    console.log("Comando: Prontidão Operacional Aumentada (Todas as questões injetadas).");
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
