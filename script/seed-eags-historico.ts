import { db } from "../server/db";
import { questions } from "../shared/schema";

const eagsHistoricoQuestions = [

  // ============================================================
  //  LÍNGUA PORTUGUESA — Interpretação, Gramática, Sintaxe
  // ============================================================

  // --- Morfologia ---
  {
    subject: "Português",
    topic: "Morfologia",
    questionText: "Assinale a alternativa em que a palavra destacada é um ADJETIVO.",
    options: [
      "O brasileiro é um povo esperançoso.",
      "Brasileiro adora futebol.",
      "Compramos produtos brasileiro e importados.",
      "O brasileiro chegou cedo ao trabalho."
    ],
    correctOption: 0,
    explanation: "Em 'O brasileiro é um povo esperançoso', a palavra 'esperançoso' qualifica o substantivo 'povo', exercendo função de adjetivo. Nas demais alternativas, 'brasileiro' funciona como substantivo."
  },
  {
    subject: "Português",
    topic: "Morfologia",
    questionText: "Em relação às classes gramaticais, assinale a alternativa CORRETA.",
    options: [
      "Artigos são palavras que acompanham o verbo, modificando-o.",
      "Advérbio é a palavra que modifica o substantivo.",
      "Preposição é a palavra invariável que liga dois termos entre si.",
      "Conjunção é a palavra que substitui o nome."
    ],
    correctOption: 2,
    explanation: "A preposição é, por definição, uma palavra invariável que estabelece uma relação de subordinação entre dois termos. Artigos acompanham substantivos, advérbios modificam verbos/adjetivos/outros advérbios, e pronomes substituem o nome."
  },
  {
    subject: "Português",
    topic: "Morfologia",
    questionText: "Assinale a alternativa que contém apenas substantivos abstratos.",
    options: [
      "amor, saudade, felicidade, tristeza",
      "mesa, cadeira, amor, pedra",
      "sol, lua, estrela, beleza",
      "homem, mulher, criança, alegria"
    ],
    correctOption: 0,
    explanation: "Substantivos abstratos designam qualidades, sentimentos, estados ou ações: amor, saudade, felicidade e tristeza. Nas demais opções, há mistura com substantivos concretos (mesa, cadeira, sol, homem, etc.)."
  },

  // --- Sintaxe ---
  {
    subject: "Português",
    topic: "Sintaxe",
    questionText: "Em 'Os alunos consideraram a prova difícil', o termo 'difícil' exerce a função sintática de:",
    options: [
      "adjunto adnominal.",
      "predicativo do objeto.",
      "objeto direto.",
      "complemento nominal."
    ],
    correctOption: 1,
    explanation: "O termo 'difícil' atribui uma qualidade ao objeto direto 'a prova', exercendo a função de predicativo do objeto. Nesse caso, o verbo 'considerar' é transobjetivo (VTD + predicativo do objeto)."
  },
  {
    subject: "Português",
    topic: "Sintaxe",
    questionText: "Assinale a alternativa que apresenta oração subordinada substantiva objetiva direta.",
    options: [
      "É necessário que todos participem.",
      "Desejo que você seja feliz.",
      "A verdade é que ele mentiu.",
      "Tenho medo de que chova."
    ],
    correctOption: 1,
    explanation: "'Desejo que você seja feliz' — a oração 'que você seja feliz' funciona como objeto direto do verbo 'desejo'. As demais são: subjetiva (A), predicativa (C) e completiva nominal (D)."
  },
  {
    subject: "Português",
    topic: "Sintaxe",
    questionText: "Em 'Assistiu ao filme e gostou dele', a regência dos verbos 'assistir' e 'gostar' está:",
    options: [
      "incorreta em ambos os casos.",
      "correta apenas em 'assistir'.",
      "correta apenas em 'gostar'.",
      "correta em ambos os casos."
    ],
    correctOption: 3,
    explanation: "'Assistir' no sentido de 'ver' é VTI e rege a preposição 'a' (assistiu ao filme). 'Gostar' é VTI e rege a preposição 'de' (gostou dele). Ambas as regências estão corretas conforme a norma padrão."
  },

  // --- Concordância ---
  {
    subject: "Português",
    topic: "Concordância Verbal",
    questionText: "Assinale a alternativa em que a concordância verbal está de acordo com a norma-padrão.",
    options: [
      "Fazem cinco anos que não viajo.",
      "Houveram muitos acidentes na estrada.",
      "Existem pessoas que não concordam.",
      "Aluga-se casas na praia."
    ],
    correctOption: 2,
    explanation: "'Existem pessoas' — o verbo 'existir' é pessoal e concorda com o sujeito 'pessoas'. 'Fazer' indicando tempo é impessoal (faz cinco anos). 'Haver' significando 'existir' é impessoal (houve acidentes). 'Alugam-se casas' — voz passiva sintética, o verbo concorda com 'casas'."
  },
  {
    subject: "Português",
    topic: "Concordância Nominal",
    questionText: "Em relação à concordância nominal, assinale a alternativa CORRETA.",
    options: [
      "As meninas mesmas fizeram o bolo.",
      "Ela disse: muito obrigado!",
      "É proibido entrada de menores.",
      "Segue anexo as fotografias."
    ],
    correctOption: 2,
    explanation: "'É proibido entrada' — quando o sujeito não é precedido de artigo, o predicativo permanece no masculino singular (proibido). Com artigo: 'É proibida a entrada'. As demais apresentam erros: 'mesmas' (correto), 'obrigada' (para falante feminino), 'anexas' (concorda com 'fotografias')."
  },

  // --- Regência ---
  {
    subject: "Português",
    topic: "Regência Verbal",
    questionText: "Assinale a alternativa cuja regência verbal está INCORRETA de acordo com a norma culta.",
    options: [
      "Aspiramos a uma vida melhor.",
      "Prefiro cinema do que teatro.",
      "Obedeça aos seus superiores.",
      "Informei ao diretor o ocorrido."
    ],
    correctOption: 1,
    explanation: "O verbo 'preferir' não admite 'do que'. A construção correta é: 'Prefiro cinema a teatro'. As demais estão corretas: aspirar a (desejar), obedecer a, informar alguém de algo ou informar a alguém algo."
  },

  // --- Crase ---
  {
    subject: "Português",
    topic: "Crase",
    questionText: "Assinale a alternativa em que o emprego do acento indicativo de crase está CORRETO.",
    options: [
      "Refiro-me à Vossa Excelência.",
      "Irei à Roma antiga.",
      "Ele chegou à casa cansado.",
      "Vendemos à prazo."
    ],
    correctOption: 1,
    explanation: "'Irei à Roma antiga' — quando o nome de cidade vem acompanhado de especificador (antiga, moderna, etc.), admite artigo e, portanto, crase. Não se usa crase antes de pronomes de tratamento (exceto senhora/senhorita), antes de 'casa' sem especificador, nem antes de palavras masculinas."
  },
  {
    subject: "Português",
    topic: "Crase",
    questionText: "Assinale a alternativa em que a crase é FACULTATIVA.",
    options: [
      "Entreguei o relatório à diretora.",
      "Fui à escola pela manhã.",
      "Refiro-me à sua proposta.",
      "Dirija-se àquela sala."
    ],
    correctOption: 2,
    explanation: "A crase é facultativa antes de pronomes possessivos femininos: 'Refiro-me a/à sua proposta'. Ambas as formas estão corretas. Nos demais casos a crase é obrigatória."
  },

  // --- Figuras de Linguagem ---
  {
    subject: "Português",
    topic: "Figuras de Linguagem",
    questionText: "Na frase 'Aquele homem é uma fera nos negócios', temos a figura de linguagem chamada:",
    options: [
      "metonímia.",
      "metáfora.",
      "hipérbole.",
      "ironia."
    ],
    correctOption: 1,
    explanation: "Metáfora é a comparação implícita (sem conectivo comparativo) entre dois elementos de naturezas distintas. Chamar o homem de 'fera' é uma comparação implícita com a ferocidade/competência de um animal."
  },

  // --- Pontuação ---
  {
    subject: "Português",
    topic: "Pontuação",
    questionText: "Assinale a alternativa em que a vírgula está empregada CORRETAMENTE.",
    options: [
      "Os alunos, estudaram muito para a prova.",
      "Pedro, que é meu vizinho, viajou ontem.",
      "Comprei maçãs laranjas, e bananas.",
      "O professor disse, que todos passaram."
    ],
    correctOption: 1,
    explanation: "A vírgula isola a oração adjetiva explicativa 'que é meu vizinho'. Não se separa sujeito de predicado (A), não se usa vírgula antes de 'que' em oração substantiva (D), e a vírgula na enumeração (C) está mal posicionada."
  },

  // --- Interpretação de Texto ---
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "Leia o trecho: 'A educação não transforma o mundo. A educação muda as pessoas. Pessoas transformam o mundo.' (Paulo Freire). A ideia central do texto é que:",
    options: [
      "a educação é incapaz de promover mudanças no mundo.",
      "somente as pessoas podem mudar o mundo, independentemente da educação.",
      "a educação age indiretamente sobre o mundo, pois transforma as pessoas que, por sua vez, transformam o mundo.",
      "Paulo Freire não acreditava no poder da educação."
    ],
    correctOption: 2,
    explanation: "O texto estabelece uma relação de causa e consequência indireta: educação → transforma pessoas → pessoas transformam o mundo. Não se trata de negar o poder da educação, mas de mostrar que ela age através das pessoas."
  },
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "A intertextualidade é um recurso linguístico que consiste em:",
    options: [
      "utilizar palavras com sentido conotativo.",
      "fazer referência a outros textos dentro de um texto.",
      "repetir palavras para dar ênfase ao texto.",
      "criar neologismos para enriquecer o vocabulário."
    ],
    correctOption: 1,
    explanation: "Intertextualidade é o diálogo entre textos, quando um texto faz referência (explícita ou implícita) a outro texto pré-existente. É um recurso muito cobrado em provas de concursos militares."
  },

  // --- Acentuação ---
  {
    subject: "Português",
    topic: "Acentuação Gráfica",
    questionText: "Assinale a alternativa em que TODAS as palavras estão acentuadas corretamente.",
    options: [
      "saúde, baú, raíz, caída",
      "saúde, baú, raiz, caída",
      "saúde, baú, raíz, caida",
      "saude, baú, raiz, caída"
    ],
    correctOption: 1,
    explanation: "'Saúde' e 'baú' — hiato com 'u' tônico. 'Raiz' — o 'i' é seguido de 'z', formando sílaba com a consoante seguinte (ra-iz), portanto não se acentua. 'Caída' — hiato com 'i' tônico isolado na sílaba (ca-í-da)."
  },
  {
    subject: "Português",
    topic: "Acentuação Gráfica",
    questionText: "Assinale a alternativa que apresenta apenas palavras proparoxítonas.",
    options: [
      "lâmpada, árvore, pêssego, médico",
      "também, café, jacaré, avô",
      "fácil, amável, túnel, hífen",
      "caju, abacaxi, urubu, saci"
    ],
    correctOption: 0,
    explanation: "Proparoxítonas são acentuadas na antepenúltima sílaba: lâm-pa-da, ár-vo-re, pês-se-go, mé-di-co. A alternativa B tem oxítonas, C tem paroxítonas e D tem oxítonas não acentuadas."
  },

  // --- Ortografia ---
  {
    subject: "Português",
    topic: "Ortografia",
    questionText: "Assinale a alternativa em que todas as palavras estão grafadas CORRETAMENTE.",
    options: [
      "exceção, excessivo, espontâneo, excelência",
      "excessão, excessivo, espontâneo, excelência",
      "exceção, escecivo, expontâneo, excelência",
      "exceção, excessivo, expontâneo, escelência"
    ],
    correctOption: 0,
    explanation: "Exceção (com ç), excessivo (com ss), espontâneo (com 's' inicial) e excelência (com xc) estão todas corretas na alternativa A. As demais possuem erros de grafia."
  },

  // --- Vozes Verbais ---
  {
    subject: "Português",
    topic: "Vozes Verbais",
    questionText: "A frase 'O relatório foi elaborado pelo sargento' está na voz:",
    options: [
      "ativa.",
      "passiva analítica.",
      "passiva sintética.",
      "reflexiva."
    ],
    correctOption: 1,
    explanation: "Voz passiva analítica é formada por verbo auxiliar (ser/estar) + particípio: 'foi elaborado'. O agente da passiva é 'pelo sargento'. Na voz passiva sintética, usa-se o pronome 'se' (Elaborou-se o relatório)."
  },

  // ============================================================
  //  CONHECIMENTOS ESPECIALIZADOS — INFORMÁTICA / TI
  // ============================================================

  // --- Redes de Computadores ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "No modelo de referência OSI, a camada responsável pelo roteamento dos pacotes e determinação do melhor caminho é a camada de:",
    options: [
      "Enlace de Dados.",
      "Transporte.",
      "Rede.",
      "Sessão."
    ],
    correctOption: 2,
    explanation: "A camada 3 (Rede) do modelo OSI é responsável pelo roteamento de pacotes, determinação do melhor caminho entre origem e destino, e endereçamento lógico (IP). O protocolo IP opera nesta camada."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo ARP (Address Resolution Protocol) tem como função:",
    options: [
      "traduzir nomes de domínio em endereços IP.",
      "mapear endereços IP em endereços MAC (físicos).",
      "realizar o roteamento de pacotes entre redes.",
      "estabelecer sessões de comunicação entre hosts."
    ],
    correctOption: 1,
    explanation: "O ARP resolve endereços lógicos (IP) em endereços físicos (MAC). Quando um host precisa enviar dados na rede local, ele usa o ARP para descobrir o endereço MAC do destino. DNS traduz nomes em IPs (alternativa A)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Qual das alternativas apresenta CORRETAMENTE a correspondência entre protocolo e sua porta padrão?",
    options: [
      "HTTP — porta 443, HTTPS — porta 80",
      "FTP (dados) — porta 20, FTP (controle) — porta 21",
      "SMTP — porta 110, POP3 — porta 25",
      "DNS — porta 53, Telnet — porta 22"
    ],
    correctOption: 1,
    explanation: "FTP usa a porta 20 para transferência de dados e a porta 21 para controle. HTTP usa 80 (não 443), HTTPS usa 443. SMTP usa 25 e POP3 usa 110 (invertidos na C). DNS usa 53 (correto), mas Telnet usa 23, não 22 (que é SSH)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Sobre o protocolo TCP (Transmission Control Protocol), é CORRETO afirmar que:",
    options: [
      "é um protocolo não orientado à conexão e não confiável.",
      "opera na camada de Rede do modelo OSI.",
      "utiliza o mecanismo de three-way handshake para estabelecer conexão.",
      "não possui controle de fluxo nem controle de congestionamento."
    ],
    correctOption: 2,
    explanation: "O TCP é orientado à conexão e utiliza o three-way handshake (SYN → SYN-ACK → ACK) para estabelecer conexão. Ele opera na camada de Transporte (não Rede), é confiável e possui controle de fluxo e congestionamento."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Em uma rede com máscara de sub-rede 255.255.255.0 (/24), quantos endereços de host são utilizáveis?",
    options: [
      "256",
      "254",
      "255",
      "252"
    ],
    correctOption: 1,
    explanation: "Com máscara /24, temos 256 endereços (2^8). Subtraindo o endereço de rede (primeiro) e o endereço de broadcast (último), restam 254 endereços utilizáveis para hosts."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Qual a principal diferença entre um HUB e um SWITCH?",
    options: [
      "O HUB opera na camada de Rede e o Switch na camada Física.",
      "O Switch envia os dados apenas para a porta de destino, enquanto o HUB envia para todas as portas.",
      "O HUB é mais rápido que o Switch por não processar endereços.",
      "O Switch não possui tabela de endereços MAC."
    ],
    correctOption: 1,
    explanation: "O Switch opera na camada 2 (Enlace) e mantém uma tabela MAC que mapeia portas a endereços físicos, encaminhando quadros apenas para a porta de destino. O HUB opera na camada 1 (Física) e replica o sinal para todas as portas, gerando colisões."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O modelo TCP/IP possui quantas camadas?",
    options: [
      "7 camadas.",
      "5 camadas.",
      "4 camadas.",
      "3 camadas."
    ],
    correctOption: 2,
    explanation: "O modelo TCP/IP possui 4 camadas: Acesso à Rede (ou Interface de Rede), Internet, Transporte e Aplicação. Diferencia-se do modelo OSI que possui 7 camadas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo DHCP (Dynamic Host Configuration Protocol) é utilizado para:",
    options: [
      "traduzir nomes de domínio em endereços IP.",
      "atribuir endereços IP automaticamente aos hosts de uma rede.",
      "criptografar a comunicação entre dois hosts.",
      "monitorar o tráfego da rede em tempo real."
    ],
    correctOption: 1,
    explanation: "O DHCP atribui automaticamente endereços IP, máscara de sub-rede, gateway padrão e DNS aos dispositivos que se conectam à rede. Isso elimina a necessidade de configuração manual. DNS resolve nomes (A)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Sobre os cabos de rede, o cabo UTP categoria 5e (Cat 5e) suporta velocidades de até:",
    options: [
      "100 Mbps.",
      "1 Gbps.",
      "10 Gbps.",
      "10 Mbps."
    ],
    correctOption: 1,
    explanation: "O cabo UTP Cat 5e (enhanced) suporta velocidades de até 1 Gbps (Gigabit Ethernet) com frequência de 100 MHz. O Cat 5 original suportava 100 Mbps e o Cat 6 suporta até 10 Gbps em distâncias curtas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "A topologia de rede em que todos os computadores estão conectados a um cabo central (backbone) é chamada de:",
    options: [
      "Estrela.",
      "Anel.",
      "Barramento.",
      "Malha."
    ],
    correctOption: 2,
    explanation: "Na topologia Barramento (Bus), todos os dispositivos são conectados a um único cabo central (backbone). Na Estrela, conectam-se a um ponto central (switch/hub). No Anel, formam um circuito fechado. Na Malha, cada nó se conecta a vários outros."
  },

  // --- Segurança da Informação ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Os três pilares fundamentais da Segurança da Informação são:",
    options: [
      "Confidencialidade, Integridade e Disponibilidade.",
      "Autenticidade, Privacidade e Confiabilidade.",
      "Criptografia, Firewall e Antivírus.",
      "Backup, Redundância e Monitoramento."
    ],
    correctOption: 0,
    explanation: "A tríade da Segurança da Informação é conhecida como CID: Confidencialidade (acesso restrito), Integridade (dados íntegros e não alterados) e Disponibilidade (informação acessível quando necessária). Esse é o conceito mais cobrado em provas EAGS."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "O tipo de malware que sequestra os dados do computador, criptografando-os, e exige um resgate para liberá-los é chamado de:",
    options: [
      "Worm.",
      "Trojan Horse.",
      "Ransomware.",
      "Spyware."
    ],
    correctOption: 2,
    explanation: "Ransomware é o malware que criptografa os dados da vítima e exige pagamento (resgate/ransom) para fornecer a chave de descriptografia. Worm se replica automaticamente, Trojan se disfarça de software legítimo e Spyware espiona o usuário."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "O Firewall é um dispositivo de segurança de rede cuja função principal é:",
    options: [
      "detectar e remover vírus dos computadores.",
      "criptografar dados transmitidos pela rede.",
      "filtrar o tráfego de rede com base em regras de segurança predefinidas.",
      "realizar backup automático dos dados do servidor."
    ],
    correctOption: 2,
    explanation: "O Firewall atua como uma barreira entre a rede interna (confiável) e a rede externa (não confiável), filtrando pacotes de entrada e saída com base em regras de segurança. Ele não remove vírus (antivírus), não criptografa dados (VPN/SSL) e não faz backup."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "A técnica de engenharia social conhecida como Phishing consiste em:",
    options: [
      "explorar vulnerabilidades de software para obter acesso não autorizado.",
      "enviar mensagens fraudulentas que se passam por entidades confiáveis para obter dados sensíveis.",
      "inundar um servidor com requisições para tirá-lo do ar.",
      "interceptar dados em trânsito na rede sem autorização."
    ],
    correctOption: 1,
    explanation: "Phishing é uma técnica de engenharia social que utiliza e-mails, sites ou mensagens fraudulentas que imitam entidades legítimas (bancos, empresas) para enganar o usuário e obter dados pessoais, senhas ou informações financeiras."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Sobre criptografia, é CORRETO afirmar que:",
    options: [
      "na criptografia simétrica, são usadas duas chaves diferentes: uma pública e uma privada.",
      "na criptografia assimétrica, a mesma chave é usada para cifrar e decifrar.",
      "o algoritmo AES é um exemplo de criptografia simétrica.",
      "o algoritmo RSA é um exemplo de criptografia simétrica."
    ],
    correctOption: 2,
    explanation: "O AES (Advanced Encryption Standard) é um algoritmo de criptografia simétrica (mesma chave para cifrar e decifrar). O RSA é assimétrico (chave pública e privada). As alternativas A e B invertem os conceitos de simétrica e assimétrica."
  },

  // --- Sistemas Operacionais / Linux ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No sistema operacional Linux, o comando utilizado para alterar as permissões de acesso a um arquivo é:",
    options: [
      "chown",
      "chmod",
      "chgrp",
      "passwd"
    ],
    correctOption: 1,
    explanation: "O comando 'chmod' (change mode) altera as permissões de leitura (r), escrita (w) e execução (x) de arquivos e diretórios. 'chown' altera o proprietário, 'chgrp' altera o grupo e 'passwd' altera a senha do usuário."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o diretório raiz do sistema de arquivos é representado por:",
    options: [
      "C:\\",
      "/root",
      "/",
      "/home"
    ],
    correctOption: 2,
    explanation: "No Linux, o diretório raiz é representado pela barra '/' (forward slash). Todos os outros diretórios são subdiretórios do '/'. O '/root' é o diretório pessoal do superusuário e '/home' contém os diretórios dos usuários comuns."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "Qual comando Linux é utilizado para exibir o conteúdo de um arquivo de texto no terminal?",
    options: [
      "ls",
      "cat",
      "mkdir",
      "rm"
    ],
    correctOption: 1,
    explanation: "O comando 'cat' (concatenate) exibe o conteúdo de arquivos de texto no terminal. 'ls' lista arquivos de um diretório, 'mkdir' cria diretórios e 'rm' remove arquivos."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o comando 'ifconfig' (ou 'ip addr' em distribuições mais recentes) é utilizado para:",
    options: [
      "verificar o espaço em disco disponível.",
      "listar os processos em execução.",
      "configurar e exibir as interfaces de rede.",
      "gerenciar os serviços do sistema."
    ],
    correctOption: 2,
    explanation: "'ifconfig' (ou seu substituto moderno 'ip addr') exibe e configura interfaces de rede, mostrando endereço IP, máscara de sub-rede, endereço MAC, entre outras informações. 'df' verifica espaço em disco, 'ps' lista processos."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, as permissões de um arquivo representadas por 'rwxr-xr--' significam que:",
    options: [
      "o dono pode ler, escrever e executar; o grupo pode ler e executar; outros podem apenas ler.",
      "todos podem ler, escrever e executar.",
      "o dono pode apenas ler; o grupo pode ler e executar; outros podem ler, escrever e executar.",
      "o dono pode ler e escrever; o grupo pode executar; outros não têm permissão."
    ],
    correctOption: 0,
    explanation: "As permissões são divididas em 3 blocos de 3 caracteres: dono (rwx = leitura+escrita+execução), grupo (r-x = leitura+execução) e outros (r-- = apenas leitura). Em octal, seria 754."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "O comando Linux utilizado para verificar a rota percorrida por um pacote até um destino remoto é:",
    options: [
      "ping",
      "traceroute",
      "nslookup",
      "netstat"
    ],
    correctOption: 1,
    explanation: "O 'traceroute' (tracert no Windows) rastreia o caminho que os pacotes percorrem até um destino, exibindo cada salto (hop) intermediário. 'ping' testa a conectividade, 'nslookup' consulta DNS e 'netstat' exibe conexões de rede ativas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "Sobre os tipos de sistemas operacionais, um sistema multiusuário é aquele que:",
    options: [
      "permite a execução de múltiplas tarefas simultaneamente.",
      "permite que mais de um usuário utilize o sistema ao mesmo tempo.",
      "possui interface gráfica e linha de comando.",
      "pode ser instalado em mais de um computador."
    ],
    correctOption: 1,
    explanation: "Sistema multiusuário permite que vários usuários acessem e utilizem os recursos do sistema simultaneamente (ex.: Linux com SSH). Multitarefa (A) permite múltiplas tarefas, que é um conceito diferente."
  },

  // --- Hardware ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "A memória RAM (Random Access Memory) é classificada como memória:",
    options: [
      "não volátil e de armazenamento permanente.",
      "volátil e de acesso aleatório.",
      "não volátil e de acesso sequencial.",
      "volátil e somente de leitura."
    ],
    correctOption: 1,
    explanation: "A memória RAM é volátil (perde dados quando desligada) e de acesso aleatório (qualquer posição pode ser acessada diretamente). Diferente da ROM (somente leitura e não volátil) e do HD/SSD (não volátil e de armazenamento permanente)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "A unidade responsável por realizar os cálculos aritméticos e as operações lógicas em um processador é:",
    options: [
      "Unidade de Controle (UC).",
      "Unidade Lógica e Aritmética (ULA).",
      "Registradores.",
      "Memória Cache."
    ],
    correctOption: 1,
    explanation: "A ULA (Unidade Lógica e Aritmética) é o componente do processador responsável por executar operações aritméticas (soma, subtração, etc.) e lógicas (AND, OR, NOT). A Unidade de Controle coordena as operações, registradores armazenam dados temporários."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Sobre os tipos de memória, a memória Cache tem como principal função:",
    options: [
      "armazenar dados permanentemente, substituindo o disco rígido.",
      "aumentar a capacidade de armazenamento da RAM.",
      "acelerar o acesso a dados frequentemente utilizados pelo processador.",
      "servir como memória de backup em caso de falha da RAM."
    ],
    correctOption: 2,
    explanation: "A memória Cache é uma memória ultrarrápida, localizada entre o processador e a RAM, que armazena cópias de dados e instruções frequentemente acessados para acelerar o processamento. Ela existe em níveis (L1, L2, L3), sendo L1 a mais rápida e menor."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Assinale a alternativa que apresenta apenas dispositivos de ENTRADA.",
    options: [
      "teclado, mouse, scanner",
      "monitor, impressora, caixa de som",
      "teclado, monitor, mouse",
      "scanner, impressora, teclado"
    ],
    correctOption: 0,
    explanation: "Dispositivos de entrada enviam dados para o computador: teclado, mouse e scanner. Monitor, impressora e caixa de som são dispositivos de saída (exibem/emitem dados processados)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "A BIOS (Basic Input/Output System) de um computador está armazenada na memória:",
    options: [
      "RAM.",
      "Cache.",
      "ROM/Flash.",
      "Virtual."
    ],
    correctOption: 2,
    explanation: "A BIOS é armazenada em uma memória ROM (Read-Only Memory) ou Flash, que é não volátil — ou seja, mantém os dados mesmo com o computador desligado. Ela é responsável pela inicialização do hardware durante o boot."
  },

  // --- Banco de Dados ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em SQL, o comando utilizado para inserir dados em uma tabela é:",
    options: [
      "UPDATE",
      "INSERT INTO",
      "SELECT",
      "ALTER TABLE"
    ],
    correctOption: 1,
    explanation: "O comando 'INSERT INTO' é usado para inserir novos registros em uma tabela SQL. 'UPDATE' atualiza dados existentes, 'SELECT' consulta dados e 'ALTER TABLE' modifica a estrutura da tabela."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Os comandos CREATE TABLE, DROP TABLE e ALTER TABLE pertencem à sublinguagem SQL chamada:",
    options: [
      "DML — Data Manipulation Language.",
      "DDL — Data Definition Language.",
      "DCL — Data Control Language.",
      "DQL — Data Query Language."
    ],
    correctOption: 1,
    explanation: "DDL (Data Definition Language) engloba os comandos que definem a estrutura do banco: CREATE, DROP, ALTER e TRUNCATE. DML (INSERT, UPDATE, DELETE) manipula dados. DCL (GRANT, REVOKE) controla permissões. DQL (SELECT) consulta dados."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em um banco de dados relacional, a Chave Primária (Primary Key) tem como característica:",
    options: [
      "permitir valores nulos e duplicados.",
      "identificar de forma única cada registro da tabela, não permitindo valores nulos.",
      "referenciar registros de outra tabela.",
      "ser sempre do tipo numérico e autoincremental."
    ],
    correctOption: 1,
    explanation: "A Chave Primária identifica de forma única cada linha/registro da tabela. Ela não aceita valores nulos (NOT NULL) e não permite duplicatas (UNIQUE). Chave Estrangeira (FK) é que referencia outra tabela. A PK pode ser de qualquer tipo, não necessariamente numérica."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Qual cláusula SQL é utilizada para filtrar grupos de registros criados pela cláusula GROUP BY?",
    options: [
      "WHERE",
      "ORDER BY",
      "HAVING",
      "DISTINCT"
    ],
    correctOption: 2,
    explanation: "A cláusula HAVING filtra os resultados de agrupamentos (GROUP BY), diferente da cláusula WHERE que filtra linhas individuais antes do agrupamento. ORDER BY ordena resultados e DISTINCT remove duplicatas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "No modelo relacional, a Normalização de dados tem como principal objetivo:",
    options: [
      "aumentar a velocidade de consultas ao banco de dados.",
      "reduzir a redundância de dados e evitar anomalias de inserção, exclusão e atualização.",
      "criar índices em todas as colunas para otimizar buscas.",
      "converter um banco NoSQL em um banco relacional."
    ],
    correctOption: 1,
    explanation: "A Normalização visa eliminar a redundância de dados e prevenir anomalias (inserção, exclusão, atualização) organizando as tabelas em formas normais (1FN, 2FN, 3FN, FNBC). Embora possa impactar a performance, seu objetivo principal é a integridade dos dados."
  },

  // --- Programação / Lógica ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Em um fluxograma, o símbolo de losango (diamante) representa:",
    options: [
      "um processo ou ação.",
      "uma decisão ou condição.",
      "entrada ou saída de dados.",
      "início ou fim do programa."
    ],
    correctOption: 1,
    explanation: "No fluxograma, o losango representa uma decisão/condição (teste lógico com saídas Sim/Não ou Verdadeiro/Falso). O retângulo representa processo/ação, o paralelogramo representa entrada/saída de dados e a elipse/oval representa início/fim."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Em pseudocódigo, qual estrutura de repetição executa o bloco de comandos pelo menos uma vez antes de verificar a condição?",
    options: [
      "enquanto...faça (while...do)",
      "para...de...até (for...to)",
      "repita...até (do...while)",
      "se...então...senão (if...then...else)"
    ],
    correctOption: 2,
    explanation: "A estrutura 'repita...até' (equivalente ao do...while em linguagens como C e Java) executa o bloco de comandos pelo menos uma vez e só verifica a condição de parada ao final de cada iteração. O 'enquanto' verifica a condição antes."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Na Programação Orientada a Objetos, o conceito de Encapsulamento refere-se a:",
    options: [
      "criar subclasses que herdam atributos e métodos de uma superclasse.",
      "ocultar os detalhes internos de implementação e expor apenas uma interface pública.",
      "permitir que um mesmo método tenha comportamentos diferentes conforme a classe que o implementa.",
      "criar objetos a partir de classes abstratas."
    ],
    correctOption: 1,
    explanation: "Encapsulamento é o princípio de esconder os detalhes internos de um objeto, controlando o acesso aos seus atributos e métodos através de modificadores de acesso (public, private, protected). Herança (A), Polimorfismo (C) e Abstração (D) são outros pilares da POO."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Em Java, qual palavra-chave é usada para indicar que uma classe herda de outra?",
    options: [
      "implements",
      "extends",
      "inherits",
      "super"
    ],
    correctOption: 1,
    explanation: "A palavra-chave 'extends' indica herança de classes em Java (ex: class Gato extends Animal). 'implements' é usado para implementar interfaces. 'super' referencia a superclasse dentro de um método. 'inherits' não existe em Java."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Polimorfismo, um dos pilares da Programação Orientada a Objetos, pode ser definido como:",
    options: [
      "a capacidade de ocultar os detalhes de implementação de um objeto.",
      "a capacidade de um mesmo método apresentar comportamentos diferentes em classes diferentes.",
      "a criação de múltiplos construtores em uma mesma classe.",
      "a capacidade de uma classe ter apenas métodos abstratos."
    ],
    correctOption: 1,
    explanation: "Polimorfismo (muitas formas) permite que um mesmo método tenha implementações diferentes em classes diferentes. Pode ser de sobrecarga (overloading — mesmo nome, parâmetros diferentes) ou sobrescrita (overriding — redefinição em subclasse)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Qual será o valor de X após a execução do trecho de pseudocódigo abaixo?\n\nX ← 5\nY ← 3\nX ← X + Y * 2\n",
    options: [
      "16",
      "11",
      "13",
      "10"
    ],
    correctOption: 1,
    explanation: "Seguindo a precedência de operadores: Y * 2 = 6, depois X + 6 = 5 + 6 = 11. A multiplicação tem prioridade sobre a adição. Se fosse (X + Y) * 2, o resultado seria 16."
  },

  // --- Engenharia de Software ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "O modelo de desenvolvimento de software que segue uma abordagem sequencial e linear, onde cada fase deve ser concluída antes de iniciar a próxima, é chamado de:",
    options: [
      "Modelo Espiral.",
      "Modelo Cascata (Waterfall).",
      "Modelo Incremental.",
      "Modelo Ágil (Scrum)."
    ],
    correctOption: 1,
    explanation: "O modelo Cascata (Waterfall) segue etapas sequenciais e lineares: Requisitos → Projeto → Implementação → Testes → Manutenção. Cada fase deve ser concluída antes de avançar. O Espiral é iterativo com análise de riscos, o Incremental entrega partes funcionais e o Scrum é ágil e iterativo."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "Na UML (Unified Modeling Language), o diagrama utilizado para representar a sequência de ações e fluxos de trabalho de um sistema é o:",
    options: [
      "Diagrama de Classes.",
      "Diagrama de Atividades.",
      "Diagrama de Implantação.",
      "Diagrama de Componentes."
    ],
    correctOption: 1,
    explanation: "O Diagrama de Atividades modela o fluxo de trabalho (workflow) de um sistema, representando ações, decisões e fluxos paralelos. O Diagrama de Classes representa a estrutura estática, o de Implantação mostra a distribuição física e o de Componentes mostra módulos do sistema."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "Em testes de software, o tipo de teste que verifica o funcionamento interno do código, examinando a lógica e a estrutura, é chamado de:",
    options: [
      "Teste Caixa-Preta (Black-box).",
      "Teste Caixa-Branca (White-box).",
      "Teste de Aceitação.",
      "Teste de Regressão."
    ],
    correctOption: 1,
    explanation: "O Teste Caixa-Branca examina a estrutura interna e a lógica do código. O Teste Caixa-Preta verifica as funcionalidades sem conhecer a implementação interna. O de Aceitação valida com o cliente e o de Regressão verifica se alterações não quebraram funcionalidades existentes."
  },

  // --- Questões diversas de IT ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas de Numeração",
    questionText: "O número binário 11001010 convertido para decimal equivale a:",
    options: [
      "192",
      "202",
      "210",
      "200"
    ],
    correctOption: 1,
    explanation: "Conversão: 1×128 + 1×64 + 0×32 + 0×16 + 1×8 + 0×4 + 1×2 + 0×1 = 128 + 64 + 8 + 2 = 202."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas de Numeração",
    questionText: "O número decimal 255 convertido para hexadecimal é:",
    options: [
      "FE",
      "FF",
      "EF",
      "F0"
    ],
    correctOption: 1,
    explanation: "255 ÷ 16 = 15 resto 15. Em hexadecimal, 15 = F. Portanto, 255 decimal = FF em hexadecimal. Bizú: 255 é o valor máximo de um byte (8 bits), então FF é o valor máximo hexadecimal de 2 dígitos."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O endereço IPv4 é composto por:",
    options: [
      "16 bits divididos em 2 octetos.",
      "32 bits divididos em 4 octetos.",
      "64 bits divididos em 8 octetos.",
      "128 bits divididos em 8 grupos de 16 bits."
    ],
    correctOption: 1,
    explanation: "O IPv4 utiliza endereços de 32 bits, divididos em 4 octetos (4 grupos de 8 bits), representados em notação decimal pontuada (ex: 192.168.1.1). O IPv6 utiliza 128 bits divididos em 8 grupos de 16 bits."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "O barramento responsável por transportar os endereços de memória que o processador deseja acessar é o:",
    options: [
      "barramento de dados.",
      "barramento de controle.",
      "barramento de endereços.",
      "barramento de expansão."
    ],
    correctOption: 2,
    explanation: "O barramento de endereços transporta os endereços das posições de memória que a CPU deseja ler ou escrever. O barramento de dados transporta os dados propriamente ditos e o barramento de controle transporta sinais de controle (leitura, escrita, interrupções)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Uma assinatura digital garante principalmente os princípios de:",
    options: [
      "confidencialidade e disponibilidade.",
      "autenticidade, integridade e não-repúdio.",
      "confidencialidade e autenticidade.",
      "disponibilidade e integridade."
    ],
    correctOption: 1,
    explanation: "A assinatura digital garante: Autenticidade (confirma a identidade do autor), Integridade (garante que o documento não foi alterado) e Não-repúdio (o autor não pode negar a autoria). Ela NÃO garante confidencialidade — para isso, usa-se criptografia."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "A propriedade ACID de transações em banco de dados NÃO inclui:",
    options: [
      "Atomicidade.",
      "Consistência.",
      "Integridade.",
      "Durabilidade."
    ],
    correctOption: 2,
    explanation: "ACID significa: Atomicidade (tudo ou nada), Consistência (estado válido), Isolamento (transações independentes) e Durabilidade (dados persistentes após confirmação). 'Integridade' não faz parte da sigla ACID — o 'I' refere-se a Isolamento (Isolation)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Em Java, os modificadores de acesso, do mais restritivo ao menos restritivo, são:",
    options: [
      "public, protected, default, private",
      "private, default, protected, public",
      "private, protected, public, default",
      "default, private, protected, public"
    ],
    correctOption: 1,
    explanation: "Do mais restritivo ao menos restritivo: private (apenas a própria classe) → default/package-private (mesmo pacote) → protected (mesmo pacote + subclasses) → public (acesso total). Esse é um bizú clássico de Java para EAGS."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "Em sistemas operacionais, Deadlock (impasse) ocorre quando:",
    options: [
      "o sistema operacional fica sem memória RAM disponível.",
      "dois ou mais processos ficam bloqueados permanentemente, cada um esperando pelo recurso que o outro possui.",
      "um processo consome todo o tempo de CPU sem liberar para outros.",
      "o disco rígido fica fragmentado e prejudica a performance."
    ],
    correctOption: 1,
    explanation: "Deadlock é a situação em que dois ou mais processos ficam em espera circular, cada um bloqueando um recurso que o outro precisa, resultando em paralisia mútua permanente. As 4 condições necessárias para deadlock são: exclusão mútua, posse e espera, não preempção e espera circular."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Uma pilha (stack) é uma estrutura de dados que segue o princípio:",
    options: [
      "FIFO — First In, First Out.",
      "LIFO — Last In, First Out.",
      "FCFS — First Come, First Served.",
      "Random Access — acesso aleatório."
    ],
    correctOption: 1,
    explanation: "A Pilha (Stack) segue o princípio LIFO (Last In, First Out — último a entrar, primeiro a sair). A Fila (Queue) segue o FIFO (First In, First Out — primeiro a entrar, primeiro a sair). É como uma pilha de pratos: o último colocado é o primeiro retirado."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Uma fila (queue) é uma estrutura de dados que segue o princípio:",
    options: [
      "LIFO — Last In, First Out.",
      "FIFO — First In, First Out.",
      "LIFO — Last In, First Out.",
      "Random Access — acesso aleatório."
    ],
    correctOption: 1,
    explanation: "A Fila (Queue) segue o princípio FIFO (First In, First Out — primeiro a entrar, primeiro a sair). Como uma fila de banco: quem chega primeiro é atendido primeiro."
  },

  // --- Mais Redes ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo utilizado para envio de e-mails é o:",
    options: [
      "POP3",
      "IMAP",
      "SMTP",
      "FTP"
    ],
    correctOption: 2,
    explanation: "O SMTP (Simple Mail Transfer Protocol) é responsável pelo ENVIO de e-mails, operando na porta 25 (ou 587 com autenticação). POP3 (porta 110) e IMAP (porta 143) são usados para RECEBIMENTO/leitura de e-mails. FTP é para transferência de arquivos."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Qual tipo de rede se limita a uma área geográfica restrita, como um prédio ou campus?",
    options: [
      "WAN (Wide Area Network)",
      "MAN (Metropolitan Area Network)",
      "LAN (Local Area Network)",
      "PAN (Personal Area Network)"
    ],
    correctOption: 2,
    explanation: "LAN (Local Area Network) é uma rede local que cobre uma área restrita como um prédio, escritório ou campus. WAN cobre grandes áreas (cidades, países), MAN cobre uma região metropolitana e PAN é uma rede pessoal (ex: Bluetooth)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "No modelo OSI, a camada responsável por estabelecer, gerenciar e encerrar sessões entre aplicações é a camada de:",
    options: [
      "Transporte.",
      "Sessão.",
      "Apresentação.",
      "Aplicação."
    ],
    correctOption: 1,
    explanation: "A Camada 5 (Sessão) do modelo OSI é responsável por estabelecer, manter e encerrar sessões de comunicação entre processos. Ela também gerencia o controle de diálogo (half-duplex/full-duplex) e sincronização."
  },

  // --- Mais Linux ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o comando utilizado para buscar um padrão de texto dentro de arquivos é:",
    options: [
      "find",
      "grep",
      "locate",
      "which"
    ],
    correctOption: 1,
    explanation: "O comando 'grep' busca padrões de texto dentro de arquivos (ex: grep 'erro' log.txt). 'find' busca arquivos pelo nome/atributos no sistema de arquivos. 'locate' busca por nome usando um banco de dados indexado. 'which' localiza o caminho de executáveis."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o superusuário (administrador do sistema) é identificado pelo nome:",
    options: [
      "admin",
      "sudo",
      "root",
      "master"
    ],
    correctOption: 2,
    explanation: "O 'root' é o superusuário do Linux com UID 0, possuindo acesso irrestrito a todos os arquivos e processos do sistema. 'sudo' é um comando que permite executar ações como root temporariamente. 'admin' e 'master' não são padrão."
  },

  // --- Mais Segurança ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Um ataque de Negação de Serviço (DoS — Denial of Service) tem como objetivo:",
    options: [
      "roubar dados sigilosos de um servidor.",
      "tornar um serviço ou recurso de rede indisponível para seus usuários legítimos.",
      "modificar dados em trânsito na rede.",
      "obter acesso não autorizado a um sistema."
    ],
    correctOption: 1,
    explanation: "O ataque DoS (ou DDoS, quando distribuído) visa sobrecarregar um servidor ou rede com um volume massivo de requisições, tornando o serviço indisponível para usuários legítimos. Ele não rouba dados, mas ataca a Disponibilidade (um dos pilares CID)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "O backup que copia apenas os arquivos que foram alterados desde o último backup completo é chamado de:",
    options: [
      "Backup Completo (Full).",
      "Backup Diferencial.",
      "Backup Incremental.",
      "Backup Espelhado (Mirror)."
    ],
    correctOption: 1,
    explanation: "O Backup Diferencial copia todos os arquivos alterados desde o último backup COMPLETO. O Backup Incremental copia apenas os alterados desde o último backup (de qualquer tipo). O Diferencial é acumulativo e cresce ao longo do tempo até o próximo backup completo."
  },

  // --- Mais Hardware ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "Qual é a ordem CORRETA da hierarquia de memória, da mais rápida para a mais lenta?",
    options: [
      "Registradores → Cache → RAM → Disco (HD/SSD)",
      "RAM → Cache → Registradores → Disco (HD/SSD)",
      "Cache → Registradores → RAM → Disco (HD/SSD)",
      "Registradores → RAM → Cache → Disco (HD/SSD)"
    ],
    correctOption: 0,
    explanation: "A hierarquia de memória, da mais rápida (e cara) para a mais lenta (e barata): Registradores → Cache (L1, L2, L3) → Memória RAM → Armazenamento Secundário (HD/SSD). À medida que desce na hierarquia, aumenta a capacidade e diminui a velocidade."
  },

  // --- Mais Banco de Dados ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em SQL, a cláusula utilizada para ordenar os resultados de uma consulta é:",
    options: [
      "GROUP BY",
      "ORDER BY",
      "SORT BY",
      "ARRANGE BY"
    ],
    correctOption: 1,
    explanation: "ORDER BY ordena os resultados de uma consulta SQL em ordem crescente (ASC, padrão) ou decrescente (DESC). GROUP BY agrupa registros com valores iguais. 'SORT BY' e 'ARRANGE BY' não são cláusulas SQL padrão."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "A Chave Estrangeira (Foreign Key) em um banco de dados relacional serve para:",
    options: [
      "identificar unicamente cada registro de uma tabela.",
      "criar um índice para acelerar consultas.",
      "estabelecer uma relação de referência entre duas tabelas.",
      "criptografar os dados da coluna."
    ],
    correctOption: 2,
    explanation: "A Chave Estrangeira (FK) estabelece um vínculo entre duas tabelas, referenciando a Chave Primária (PK) de outra tabela. Ela garante a integridade referencial, impedindo que registros órfãos sejam criados."
  },

  // --- Mais Engenharia de Software ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "Na metodologia ágil Scrum, a reunião diária de curta duração (geralmente 15 minutos) em que a equipe relata o progresso é chamada de:",
    options: [
      "Sprint Planning.",
      "Sprint Review.",
      "Daily Scrum (Stand-up).",
      "Sprint Retrospective."
    ],
    correctOption: 2,
    explanation: "A Daily Scrum (ou Stand-up Meeting) é a reunião diária de até 15 minutos onde cada membro responde: O que fiz ontem? O que farei hoje? Há impedimentos? Sprint Planning planeja o sprint, Sprint Review apresenta entregas e Retrospective avalia o processo."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "O Diagrama de Casos de Uso da UML é utilizado para:",
    options: [
      "representar a estrutura estática de classes e seus relacionamentos.",
      "representar as funcionalidades do sistema do ponto de vista do usuário (ator).",
      "modelar o fluxo de dados entre componentes do sistema.",
      "representar a distribuição física dos componentes de hardware."
    ],
    correctOption: 1,
    explanation: "O Diagrama de Casos de Uso modela as funcionalidades (requisitos funcionais) de um sistema sob a perspectiva do usuário (ator externo). Mostra 'o que' o sistema faz, não 'como'. O Diagrama de Classes mostra a estrutura estática."
  },

  // --- Questões extras de Português ---
  {
    subject: "Português",
    topic: "Coesão e Coerência",
    questionText: "Na frase 'João estudou bastante, PORÉM não passou na prova', a conjunção destacada estabelece uma relação de:",
    options: [
      "adição.",
      "causa.",
      "adversidade.",
      "conclusão."
    ],
    correctOption: 2,
    explanation: "'Porém' é uma conjunção coordenativa adversativa, indicando oposição/contraste entre as ideias. Outras adversativas: mas, contudo, todavia, no entanto, entretanto."
  },
  {
    subject: "Português",
    topic: "Coesão e Coerência",
    questionText: "Na frase 'Maria comprou um vestido. ELE era azul', o pronome destacado exerce a função coesiva de:",
    options: [
      "catáfora — faz referência a um termo que será mencionado posteriormente.",
      "anáfora — retoma um termo mencionado anteriormente.",
      "dêixis — faz referência ao contexto situacional.",
      "elipse — oculta um termo já mencionado."
    ],
    correctOption: 1,
    explanation: "Anáfora é o mecanismo de coesão em que um pronome (ou outro termo) retoma algo já mencionado anteriormente no texto. 'Ele' retoma 'vestido'. Catáfora antecipa algo que será dito depois."
  },
  {
    subject: "Português",
    topic: "Semântica",
    questionText: "Assinale a alternativa que apresenta um par de palavras PARÔNIMAS.",
    options: [
      "comprimento / cumprimento",
      "manga (fruta) / manga (da camisa)",
      "belo / bonito",
      "frio / quente"
    ],
    correctOption: 0,
    explanation: "Parônimas são palavras com grafia e pronúncia semelhantes, mas significados diferentes: comprimento (extensão) / cumprimento (saudação ou ato de cumprir). Homônimas (B) possuem a mesma grafia/pronúncia com significados diferentes. Sinônimas (C) e Antônimas (D)."
  },

  // --- Mais questões de IT avançadas ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo que opera na camada de aplicação e é utilizado para transferência de páginas web é o:",
    options: [
      "TCP",
      "IP",
      "HTTP",
      "ARP"
    ],
    correctOption: 2,
    explanation: "O HTTP (HyperText Transfer Protocol) opera na camada de Aplicação e é o protocolo padrão para transferência de páginas web. TCP opera na camada de Transporte, IP na camada de Rede e ARP na camada de Enlace/Rede."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Um certificado digital é emitido por uma:",
    options: [
      "Autoridade Certificadora (AC).",
      "Autoridade de Registro (AR).",
      "Provedor de Serviços de Internet (ISP).",
      "Empresa de Antivírus."
    ],
    correctOption: 0,
    explanation: "A Autoridade Certificadora (AC) é a entidade responsável por emitir, revogar e gerenciar certificados digitais. A Autoridade de Registro (AR) é a interface entre o usuário e a AC, realizando a validação da identidade do solicitante."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Em Java, uma interface define:",
    options: [
      "um tipo especial de classe com atributos privados e métodos públicos.",
      "um contrato de métodos que uma classe deve implementar.",
      "uma classe que não pode ser instanciada, mas possui implementação de métodos.",
      "um mecanismo de herança múltipla com atributos e construtores."
    ],
    correctOption: 1,
    explanation: "Uma interface em Java define um contrato (conjunto de métodos abstratos) que as classes implementadoras devem obrigatoriamente codificar. A partir do Java 8, interfaces podem ter métodos default e static. Classes abstratas podem ter implementação de métodos (C)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "Em um sistema operacional, o escalonamento de processos é responsabilidade do:",
    options: [
      "compilador.",
      "sistema de arquivos.",
      "kernel (núcleo do sistema operacional).",
      "gerenciador de memória virtual."
    ],
    correctOption: 2,
    explanation: "O Kernel (núcleo) do sistema operacional é responsável pelo escalonamento de processos, gerenciando a alternância da CPU entre os processos prontos para execução. Ele utiliza algoritmos de escalonamento como FIFO, SJF, Round Robin, entre outros."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "A tecnologia SSD (Solid State Drive) se diferencia do HD (Hard Disk) tradicional principalmente por:",
    options: [
      "usar discos magnéticos giratórios para armazenar dados.",
      "usar memória flash (sem partes mecânicas móveis), proporcionando maior velocidade.",
      "ser mais barato por gigabyte armazenado.",
      "possuir maior capacidade de armazenamento."
    ],
    correctOption: 1,
    explanation: "O SSD utiliza memória flash NAND (sem partes mecânicas), o que lhe confere maior velocidade de leitura/escrita, menor consumo de energia e maior resistência a impactos em comparação ao HD que possui discos magnéticos giratórios e cabeças de leitura mecânicas."
  },

  // --- Mais Português ---
  {
    subject: "Português",
    topic: "Funções da Linguagem",
    questionText: "A função da linguagem que tem foco no emissor, expressando suas emoções e sentimentos, é a função:",
    options: [
      "referencial.",
      "emotiva (ou expressiva).",
      "conativa (ou apelativa).",
      "fática."
    ],
    correctOption: 1,
    explanation: "A função Emotiva/Expressiva foca no emissor, expressando suas emoções, opiniões e sentimentos (uso de 1ª pessoa, interjeições, exclamações). A Referencial foca na informação, a Conativa no receptor e a Fática no canal de comunicação."
  },
  {
    subject: "Português",
    topic: "Tipos Textuais",
    questionText: "O tipo textual que tem como objetivo convencer ou persuadir o leitor a respeito de uma tese é o texto:",
    options: [
      "narrativo.",
      "descritivo.",
      "dissertativo-argumentativo.",
      "injuntivo."
    ],
    correctOption: 2,
    explanation: "O texto dissertativo-argumentativo defende uma tese usando argumentos lógicos para convencer o leitor. O narrativo conta uma história, o descritivo detalha características e o injuntivo orienta/instrui (ex: manuais, receitas)."
  }
];

async function seed() {
  console.log("============================================================");
  console.log("  OPERAÇÃO CARGA TÁTICA — Questões Históricas EAGS SIN");
  console.log("  Período: 2016–2025 (Conteúdo baseado nos temas recorrentes)");
  console.log("============================================================");
  console.log(`Total de questões a injetar: ${eagsHistoricoQuestions.length}`);
  
  try {
    // Insert in batches to avoid overwhelming the database
    const batchSize = 25;
    let inserted = 0;

    for (let i = 0; i < eagsHistoricoQuestions.length; i += batchSize) {
      const batch = eagsHistoricoQuestions.slice(i, i + batchSize);
      await db.insert(questions).values(batch);
      inserted += batch.length;
      console.log(`[PROGRESSO] ${inserted}/${eagsHistoricoQuestions.length} questões inseridas...`);
    }

    console.log("============================================================");
    console.log(`[SUCESSO] Todas as ${eagsHistoricoQuestions.length} questões foram inseridas!`);
    console.log("Prontidão Operacional: MÁXIMA.");
    console.log("============================================================");
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
