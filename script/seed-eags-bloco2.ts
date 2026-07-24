import { db } from "../server/db";
import { questions } from "../shared/schema";

const eagsBloco2Questions = [

  // ============================================================
  //  LÍNGUA PORTUGUESA — Bloco 2
  // ============================================================

  // --- Pronomes ---
  {
    subject: "Português",
    topic: "Pronomes",
    questionText: "Na frase 'Entregaram-lhe o documento sigiloso', o pronome 'lhe' exerce a função de:",
    options: [
      "objeto direto.",
      "objeto indireto.",
      "sujeito.",
      "adjunto adnominal."
    ],
    correctOption: 1,
    explanation: "O pronome oblíquo 'lhe' sempre exerce função de objeto indireto (equivalente a 'a ele/a ela'). 'Entregaram a ele o documento sigiloso'. Os pronomes oblíquos o, a, os, as são objetos diretos."
  },
  {
    subject: "Português",
    topic: "Pronomes",
    questionText: "Assinale a alternativa em que o pronome relativo está empregado CORRETAMENTE.",
    options: [
      "O livro que eu me referi é excelente.",
      "A cidade aonde nasci é pequena.",
      "O filme a que assistimos foi emocionante.",
      "A pessoa onde conversei era simpática."
    ],
    correctOption: 2,
    explanation: "'O filme a que assistimos' — o verbo 'assistir' (ver) é VTI e rege a preposição 'a', que aparece antes do pronome relativo 'que'. Em A, falta 'a que'; em B, 'aonde' exige verbo de movimento; em D, 'onde' refere-se a lugar."
  },
  {
    subject: "Português",
    topic: "Pronomes",
    questionText: "Na frase 'Cada um cuide de SI mesmo', o pronome 'si' classifica-se como pronome:",
    options: [
      "pessoal do caso reto.",
      "pessoal oblíquo reflexivo.",
      "demonstrativo.",
      "possessivo."
    ],
    correctOption: 1,
    explanation: "'Si' é um pronome pessoal oblíquo tônico de 3ª pessoa com valor reflexivo, usado após preposição. Indica que a ação recai sobre o próprio sujeito."
  },

  // --- Conjunções ---
  {
    subject: "Português",
    topic: "Conjunções",
    questionText: "Em 'Embora estivesse chovendo, saímos para treinar', a conjunção 'embora' introduz uma oração subordinada:",
    options: [
      "causal.",
      "concessiva.",
      "condicional.",
      "consecutiva."
    ],
    correctOption: 1,
    explanation: "'Embora' é uma conjunção subordinativa concessiva, indicando que a ação principal ocorre apesar de uma circunstância contrária. Outras concessivas: ainda que, mesmo que, conquanto, posto que."
  },
  {
    subject: "Português",
    topic: "Conjunções",
    questionText: "A conjunção 'portanto' classifica-se como conjunção coordenativa:",
    options: [
      "aditiva.",
      "adversativa.",
      "conclusiva.",
      "explicativa."
    ],
    correctOption: 2,
    explanation: "'Portanto' é uma conjunção coordenativa conclusiva, indicando conclusão ou consequência lógica. Outras conclusivas: logo, assim, por isso, por conseguinte, então. Não confundir com explicativas (pois antes do verbo, porque, que)."
  },
  {
    subject: "Português",
    topic: "Conjunções",
    questionText: "Em 'Estudou tanto QUE passou em primeiro lugar', a conjunção 'que' expressa ideia de:",
    options: [
      "causa.",
      "comparação.",
      "consequência.",
      "finalidade."
    ],
    correctOption: 2,
    explanation: "A conjunção 'que' precedida de 'tanto/tão/tal/tamanho' introduz uma oração subordinada adverbial consecutiva, indicando a consequência de uma ação intensa. 'Estudou tanto (causa intensiva) que passou (consequência)'."
  },

  // --- Formação de Palavras ---
  {
    subject: "Português",
    topic: "Formação de Palavras",
    questionText: "A palavra 'infelizmente' é formada pelo processo de:",
    options: [
      "derivação prefixal.",
      "derivação sufixal.",
      "derivação prefixal e sufixal.",
      "derivação parassintética."
    ],
    correctOption: 2,
    explanation: "'Infelizmente' = in (prefixo) + feliz (radical) + mente (sufixo). Trata-se de derivação prefixal e sufixal (os afixos são adicionados em etapas distintas). Na parassintética, os afixos são adicionados simultaneamente (ex: anoitecer = a + noite + ecer)."
  },
  {
    subject: "Português",
    topic: "Formação de Palavras",
    questionText: "A palavra 'planalto' é formada pelo processo de:",
    options: [
      "derivação prefixal.",
      "derivação sufixal.",
      "composição por justaposição.",
      "composição por aglutinação."
    ],
    correctOption: 3,
    explanation: "'Planalto' = plano + alto. Na composição por aglutinação, há fusão dos radicais com perda de elementos fonéticos ('o' de plano desaparece). Na justaposição, os radicais se mantêm íntegros (ex: guarda-chuva)."
  },

  // --- Período Composto ---
  {
    subject: "Português",
    topic: "Período Composto",
    questionText: "Na frase 'Se chover amanhã, o treinamento será cancelado', a oração 'Se chover amanhã' é classificada como subordinada adverbial:",
    options: [
      "temporal.",
      "causal.",
      "condicional.",
      "concessiva."
    ],
    correctOption: 2,
    explanation: "A conjunção 'se' introduz uma oração subordinada adverbial condicional, estabelecendo uma condição para que a ação da oração principal se realize. Outras condicionais: caso, desde que, contanto que."
  },
  {
    subject: "Português",
    topic: "Período Composto",
    questionText: "Em 'O soldado que venceu a maratona recebeu a medalha', a oração 'que venceu a maratona' é classificada como subordinada adjetiva:",
    options: [
      "explicativa.",
      "restritiva.",
      "apositiva.",
      "temporal."
    ],
    correctOption: 1,
    explanation: "A oração adjetiva restritiva restringe o sentido do substantivo antecedente, especificando QUAL soldado recebeu a medalha. Não é isolada por vírgulas. A explicativa (entre vírgulas) acrescenta informação acessória sem restringir."
  },

  // --- Variação Linguística ---
  {
    subject: "Português",
    topic: "Variação Linguística",
    questionText: "A variação linguística que se relaciona com a região geográfica do falante é chamada de variação:",
    options: [
      "diastrática.",
      "diatópica.",
      "diafásica.",
      "diacrônica."
    ],
    correctOption: 1,
    explanation: "Variação diatópica (ou regional) está ligada à região geográfica. Diastrática relaciona-se ao grupo social. Diafásica refere-se ao contexto/situação de comunicação. Diacrônica envolve mudanças ao longo do tempo."
  },

  // --- Figuras de Linguagem (mais) ---
  {
    subject: "Português",
    topic: "Figuras de Linguagem",
    questionText: "Na frase 'Ele comeu dois pratos no almoço', temos a figura de linguagem chamada:",
    options: [
      "metáfora.",
      "metonímia.",
      "eufemismo.",
      "personificação."
    ],
    correctOption: 1,
    explanation: "Metonímia é a substituição de um termo por outro que com ele mantém relação de contiguidade. 'Comeu dois pratos' = comeu o conteúdo de dois pratos (o continente pelo conteúdo). Na metáfora, a relação é de semelhança."
  },
  {
    subject: "Português",
    topic: "Figuras de Linguagem",
    questionText: "Em 'As flores sorriam no jardim', a figura de linguagem presente é:",
    options: [
      "hipérbole.",
      "antítese.",
      "prosopopeia (personificação).",
      "pleonasmo."
    ],
    correctOption: 2,
    explanation: "Prosopopeia (ou personificação) é a atribuição de características humanas a seres inanimados ou irracionais. Flores não 'sorriem' — essa qualidade humana foi atribuída a elas."
  },
  {
    subject: "Português",
    topic: "Figuras de Linguagem",
    questionText: "Em 'Ele é tão alto que encosta a cabeça no teto', a figura de linguagem presente é:",
    options: [
      "eufemismo.",
      "ironia.",
      "hipérbole.",
      "litotes."
    ],
    correctOption: 2,
    explanation: "Hipérbole é a figura de linguagem que consiste no exagero intencional de uma ideia para dar ênfase. 'Encostar a cabeça no teto' é um exagero para enfatizar que a pessoa é muito alta."
  },
  {
    subject: "Português",
    topic: "Figuras de Linguagem",
    questionText: "Na frase 'Vida e morte, alegria e tristeza, tudo faz parte da existência', temos a figura de linguagem chamada:",
    options: [
      "antítese.",
      "paradoxo.",
      "metonímia.",
      "sinestesia."
    ],
    correctOption: 0,
    explanation: "Antítese é a aproximação de palavras ou ideias de sentido oposto: vida/morte, alegria/tristeza. Diferencia-se do paradoxo, que expressa ideias contraditórias em um mesmo enunciado (ex: 'O amor é fogo que arde sem se ver')."
  },

  // --- Mais Sintaxe ---
  {
    subject: "Português",
    topic: "Sintaxe",
    questionText: "Em 'O candidato necessita de apoio', o termo 'de apoio' é classificado como:",
    options: [
      "objeto direto.",
      "objeto indireto.",
      "complemento nominal.",
      "adjunto adverbial."
    ],
    correctOption: 1,
    explanation: "'De apoio' é objeto indireto, pois complementa o verbo transitivo indireto 'necessitar', que rege a preposição 'de'. O complemento nominal completa o sentido de nomes (substantivos, adjetivos ou advérbios), não de verbos."
  },
  {
    subject: "Português",
    topic: "Sintaxe",
    questionText: "Na oração 'O livro de capa azul está na estante', o termo 'de capa azul' exerce a função de:",
    options: [
      "adjunto adnominal.",
      "complemento nominal.",
      "aposto.",
      "predicativo do sujeito."
    ],
    correctOption: 0,
    explanation: "'De capa azul' é adjunto adnominal, pois caracteriza e especifica o substantivo 'livro' sem ser exigido por ele. O adjunto adnominal é um termo acessório que delimita ou qualifica o núcleo do sintagma nominal."
  },

  // --- Vozes Verbais ---
  {
    subject: "Português",
    topic: "Vozes Verbais",
    questionText: "Transpondo a frase 'Os militares cumpriram a missão' para a voz passiva analítica, obtemos:",
    options: [
      "A missão cumpriu-se pelos militares.",
      "A missão foi cumprida pelos militares.",
      "Cumpriu-se a missão pelos militares.",
      "A missão foi cumprindo pelos militares."
    ],
    correctOption: 1,
    explanation: "Voz passiva analítica: sujeito paciente + verbo ser (no tempo do verbo da ativa) + particípio + agente da passiva. 'Os militares cumpriram a missão' → 'A missão foi cumprida pelos militares'."
  },

  // --- Mais Concordância ---
  {
    subject: "Português",
    topic: "Concordância Verbal",
    questionText: "Assinale a alternativa CORRETA quanto à concordância verbal.",
    options: [
      "Cada um dos soldados receberam a condecoração.",
      "Mais de um aluno faltou à aula.",
      "A maioria dos candidatos foram reprovados.",
      "Fui eu quem fez o relatório."
    ],
    correctOption: 1,
    explanation: "'Mais de um' leva o verbo ao singular: 'Mais de um aluno faltou'. Em A, 'cada um' pede singular (recebeu). Em C, a concordância com 'a maioria' pode ser singular ou plural (ambas aceitas). Em D, com 'quem' o verbo vai para 3ª pessoa do singular (fez) — esta está correta também, mas a B é a mais claramente correta."
  },

  // --- Interpretação de Texto ---
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "Leia: 'A disciplina é a ponte entre os objetivos e as conquistas.' (Jim Rohn). É possível inferir do texto que:",
    options: [
      "objetivos e conquistas são a mesma coisa.",
      "sem disciplina, os objetivos não se transformam em conquistas.",
      "a disciplina é um obstáculo entre os objetivos e as conquistas.",
      "as conquistas independem dos objetivos traçados."
    ],
    correctOption: 1,
    explanation: "A metáfora da 'ponte' indica que a disciplina é o elo que conecta (e permite a passagem de) os objetivos às conquistas. Sem ela, há uma lacuna intransponível entre desejar e alcançar."
  },

  // --- Tipos Textuais ---
  {
    subject: "Português",
    topic: "Tipos Textuais",
    questionText: "O texto injuntivo (ou instrucional) tem como principal objetivo:",
    options: [
      "narrar uma sequência de acontecimentos.",
      "descrever as características de um objeto ou cenário.",
      "instruir, orientar ou indicar procedimentos.",
      "convencer o leitor sobre um ponto de vista."
    ],
    correctOption: 2,
    explanation: "O texto injuntivo orienta, instrui ou prescreve ações. Exemplos: manuais de instrução, receitas culinárias, bulas de remédio, regulamentos. Utiliza verbos no imperativo ou infinitivo."
  },

  // --- Gêneros Textuais ---
  {
    subject: "Português",
    topic: "Gêneros Textuais",
    questionText: "O editorial é um gênero textual que se caracteriza por:",
    options: [
      "narrar fatos reais de forma imparcial e objetiva.",
      "apresentar a opinião do jornal ou revista sobre um tema da atualidade.",
      "instruir o leitor sobre como realizar uma atividade.",
      "descrever detalhadamente a biografia de uma personalidade."
    ],
    correctOption: 1,
    explanation: "O editorial é um texto opinativo publicado em jornais e revistas que expressa a posição do veículo de comunicação sobre um tema relevante da atualidade. Diferente da notícia (informativo e imparcial) e da crônica (literário)."
  },

  // --- Mais Acentuação ---
  {
    subject: "Português",
    topic: "Acentuação Gráfica",
    questionText: "Assinale a alternativa que justifica CORRETAMENTE a acentuação da palavra 'herói'.",
    options: [
      "Paroxítona terminada em ditongo crescente.",
      "Oxítona terminada em 'oi' aberto.",
      "Proparoxítona.",
      "Hiato."
    ],
    correctOption: 1,
    explanation: "'Herói' é acentuada por ser oxítona terminada em ditongo aberto 'ói'. Assim como papéis (éi), troféu (éu), anéis (éi). Regra: acentuam-se as oxítonas com ditongos abertos éi, éu, ói."
  },

  // --- Mais Ortografia ---
  {
    subject: "Português",
    topic: "Ortografia",
    questionText: "Assinale a alternativa em que o emprego do 'porquê' está CORRETO.",
    options: [
      "Não sei por que ele faltou. (separado, sem acento)",
      "Por quê você não veio? (separado, com acento, início de frase)",
      "Ele faltou porque estava doente. (junto, sem acento — conjunção causal)",
      "Todas estão corretas."
    ],
    correctOption: 3,
    explanation: "Todas estão corretas: 'por que' (separado) = por qual razão ou pelo qual; 'por quê' (separado com acento) = antes de ponto ou em fim de frase; 'porque' (junto) = conjunção causal/explicativa. 'Porquê' (junto com acento) = substantivo."
  },

  // --- Mais Regência ---
  {
    subject: "Português",
    topic: "Regência Verbal",
    questionText: "O verbo 'implicar', no sentido de 'acarretar', é, de acordo com a norma culta:",
    options: [
      "transitivo direto: A decisão implica consequências graves.",
      "transitivo indireto: A decisão implica em consequências graves.",
      "intransitivo: A decisão implica.",
      "bitransitivo: A decisão implica ao chefe consequências."
    ],
    correctOption: 0,
    explanation: "No sentido de 'acarretar, resultar em', o verbo 'implicar' é transitivo direto: 'A decisão implica consequências graves' (sem preposição). O uso com 'em' (implicar em) é muito comum na fala, mas considerado incorreto pela norma culta."
  },

  // --- Mais Pontuação ---
  {
    subject: "Português",
    topic: "Pontuação",
    questionText: "Assinale a alternativa em que o uso dos dois-pontos está CORRETO.",
    options: [
      "Os ingredientes são: farinha, açúcar e ovos.",
      "Ele disse que: viria amanhã.",
      "Compramos: frutas no mercado.",
      "Os alunos: estudaram muito."
    ],
    correctOption: 0,
    explanation: "Os dois-pontos são usados para introduzir enumeração (A), citação direta, explicação ou aposto. Nas demais, o uso é inadequado: não se coloca dois-pontos entre o verbo e o complemento (B, C) nem entre sujeito e predicado (D)."
  },

  // --- Semântica ---
  {
    subject: "Português",
    topic: "Semântica",
    questionText: "Assinale a alternativa que contém um par de ANTÔNIMOS.",
    options: [
      "efêmero / passageiro",
      "prolixo / conciso",
      "audacioso / ousado",
      "benévolo / bondoso"
    ],
    correctOption: 1,
    explanation: "Prolixo (extenso, demorado) e conciso (breve, sucinto) são antônimos. As demais são pares de sinônimos: efêmero = passageiro; audacioso = ousado; benévolo = bondoso."
  },

  // --- Termos Acessórios ---
  {
    subject: "Português",
    topic: "Sintaxe",
    questionText: "Na oração 'Mário, excelente atleta, venceu a competição', o termo 'excelente atleta' é classificado como:",
    options: [
      "adjunto adnominal.",
      "vocativo.",
      "aposto.",
      "predicativo do sujeito."
    ],
    correctOption: 2,
    explanation: "Aposto é o termo que explica, esclarece ou resume um termo anterior. 'Excelente atleta' é um aposto explicativo que se refere a 'Mário'. O vocativo seria se estivesse chamando alguém (ex: 'Mário, venha cá!')."
  },

  // ============================================================
  //  CONHECIMENTOS ESPECIALIZADOS — INFORMÁTICA / TI — Bloco 2
  // ============================================================

  // --- Mais Redes de Computadores ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo UDP (User Datagram Protocol) se diferencia do TCP principalmente por:",
    options: [
      "ser orientado à conexão e garantir a entrega dos pacotes.",
      "não ser orientado à conexão, sendo mais rápido, porém sem garantia de entrega.",
      "operar na camada de Rede do modelo OSI.",
      "utilizar three-way handshake para estabelecer comunicação."
    ],
    correctOption: 1,
    explanation: "O UDP é não orientado à conexão (connectionless) e não garante a entrega dos pacotes, a ordem ou a integridade. Em contrapartida, é mais rápido que o TCP. É ideal para streaming, VoIP, jogos online e DNS."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O padrão de rede sem fio IEEE 802.11 é mais conhecido comercialmente como:",
    options: [
      "Bluetooth.",
      "Ethernet.",
      "Wi-Fi.",
      "Zigbee."
    ],
    correctOption: 2,
    explanation: "O padrão IEEE 802.11 define as especificações para redes locais sem fio (WLAN) e é comercialmente conhecido como Wi-Fi. Bluetooth é IEEE 802.15, Ethernet é IEEE 802.3 e Zigbee é IEEE 802.15.4."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "VLAN (Virtual Local Area Network) permite:",
    options: [
      "aumentar a velocidade de transmissão dos dados na rede.",
      "segmentar logicamente uma rede física em múltiplas redes virtuais independentes.",
      "criptografar todo o tráfego da rede automaticamente.",
      "substituir a necessidade de roteadores na rede."
    ],
    correctOption: 1,
    explanation: "VLANs permitem segmentar logicamente uma rede física em múltiplas redes virtuais, melhorando a segurança, o desempenho e a organização. Dispositivos em VLANs diferentes não se comunicam diretamente sem um roteador (roteamento inter-VLAN)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Qual classe de endereços IPv4 reserva endereços para redes de grande porte, com o primeiro octeto variando de 1 a 126?",
    options: [
      "Classe A",
      "Classe B",
      "Classe C",
      "Classe D"
    ],
    correctOption: 0,
    explanation: "Classe A: 1.0.0.0 a 126.255.255.255 (redes de grande porte, ~16 milhões de hosts). Classe B: 128.0.0.0 a 191.255.255.255 (redes médias). Classe C: 192.0.0.0 a 223.255.255.255 (redes pequenas, 254 hosts). Classe D: multicast."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O endereço IP 192.168.1.0 com máscara 255.255.255.0 classifica o endereço 192.168.1.255 como:",
    options: [
      "endereço de host válido.",
      "endereço de loopback.",
      "endereço de broadcast da rede.",
      "endereço de gateway padrão."
    ],
    correctOption: 2,
    explanation: "Em uma rede /24 (255.255.255.0), o último endereço (todos os bits de host em 1) é o endereço de broadcast, usado para enviar pacotes a todos os hosts da rede. O primeiro endereço (.0) é o endereço da rede."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo DNS (Domain Name System) opera na porta padrão:",
    options: [
      "21",
      "80",
      "53",
      "443"
    ],
    correctOption: 2,
    explanation: "O DNS opera na porta 53, usando tanto TCP quanto UDP. Porta 21 é FTP (controle), porta 80 é HTTP e porta 443 é HTTPS."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O endereço de loopback utilizado para testar a pilha TCP/IP do próprio host é:",
    options: [
      "0.0.0.0",
      "255.255.255.255",
      "192.168.0.1",
      "127.0.0.1"
    ],
    correctOption: 3,
    explanation: "O endereço 127.0.0.1 (localhost) é o endereço de loopback, utilizado para testar se a pilha TCP/IP está funcionando corretamente no próprio dispositivo. Qualquer endereço na faixa 127.0.0.0/8 é reservado para loopback."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "Uma VPN (Virtual Private Network) tem como principal finalidade:",
    options: [
      "acelerar a conexão de internet do usuário.",
      "criar um túnel criptografado para comunicação segura sobre uma rede pública.",
      "substituir o firewall na proteção da rede.",
      "aumentar a largura de banda disponível para download."
    ],
    correctOption: 1,
    explanation: "A VPN cria um túnel criptografado sobre uma rede pública (como a Internet), permitindo a comunicação segura e privada entre redes remotas ou entre um usuário remoto e a rede corporativa. Não acelera a internet nem substitui o firewall."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo ICMP (Internet Control Message Protocol) é utilizado pelo comando:",
    options: [
      "nslookup",
      "ftp",
      "ping",
      "ssh"
    ],
    correctOption: 2,
    explanation: "O comando 'ping' utiliza o protocolo ICMP para enviar mensagens Echo Request e receber Echo Reply, testando a conectividade entre dois hosts. O ICMP opera na camada de Rede e também é usado pelo traceroute."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "No cabeamento estruturado, o padrão EIA/TIA-568A e EIA/TIA-568B se referem à:",
    options: [
      "velocidade de transmissão do cabo de fibra óptica.",
      "ordem de disposição dos fios em conectores RJ-45.",
      "distância máxima de transmissão de cabos coaxiais.",
      "frequência de operação das antenas Wi-Fi."
    ],
    correctOption: 1,
    explanation: "Os padrões T568A e T568B definem a ordem das cores dos pares trançados nos conectores RJ-45. Para cabo direto (straight), ambas as pontas usam o mesmo padrão. Para cabo cruzado (crossover), uma ponta usa T568A e outra T568B."
  },

  // --- Mais Segurança da Informação ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "O tipo de malware que se disfarça de programa legítimo para enganar o usuário e executar ações maliciosas é chamado de:",
    options: [
      "Worm.",
      "Trojan Horse (Cavalo de Troia).",
      "Rootkit.",
      "Adware."
    ],
    correctOption: 1,
    explanation: "O Trojan Horse (Cavalo de Troia) se disfarça de software legítimo e útil para enganar o usuário, mas executa ações maliciosas em segundo plano. Diferente do Worm (se autorreplica), Rootkit (esconde presença no sistema) e Adware (exibe propagandas)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "O tipo de ataque em que o invasor se posiciona entre duas partes comunicantes, interceptando e potencialmente alterando a comunicação, é chamado de:",
    options: [
      "SQL Injection.",
      "Cross-Site Scripting (XSS).",
      "Man-in-the-Middle (MitM).",
      "Buffer Overflow."
    ],
    correctOption: 2,
    explanation: "No ataque Man-in-the-Middle (MitM), o atacante intercepta a comunicação entre duas partes sem que elas percebam, podendo ler, alterar ou injetar dados. SQL Injection injeta comandos SQL, XSS injeta scripts em páginas web e Buffer Overflow explora falhas de memória."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "Um IDS (Intrusion Detection System) tem como função:",
    options: [
      "bloquear automaticamente tráfego malicioso na rede.",
      "detectar e alertar sobre atividades suspeitas ou potenciais intrusões na rede.",
      "criptografar dados em trânsito na rede.",
      "gerenciar certificados digitais."
    ],
    correctOption: 1,
    explanation: "O IDS (Sistema de Detecção de Intrusão) monitora o tráfego da rede e alerta sobre atividades suspeitas, mas não bloqueia automaticamente. O IPS (Intrusion Prevention System) é que detecta E bloqueia. O IDS é passivo, o IPS é ativo."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "A autenticação de dois fatores (2FA) combina tipicamente:",
    options: [
      "dois fatores do tipo 'algo que você sabe' (ex: duas senhas diferentes).",
      "um fator 'algo que você sabe' com um fator 'algo que você tem' ou 'algo que você é'.",
      "apenas biometria facial e digital.",
      "criptografia simétrica e assimétrica simultaneamente."
    ],
    correctOption: 1,
    explanation: "A autenticação de dois fatores (2FA) combina dois tipos diferentes de fatores: algo que você sabe (senha, PIN), algo que você tem (token, celular, smart card) e/ou algo que você é (biometria — digital, face, íris). Dois fatores do mesmo tipo NÃO constituem 2FA."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "O Worm se diferencia do Vírus por:",
    options: [
      "necessitar de um programa hospedeiro para se replicar.",
      "ser capaz de se propagar automaticamente pela rede sem necessidade de interação do usuário.",
      "ser inofensivo e não causar danos ao sistema.",
      "funcionar apenas em sistemas operacionais Linux."
    ],
    correctOption: 1,
    explanation: "O Worm se propaga automaticamente pela rede, explorando vulnerabilidades, sem precisar de um arquivo hospedeiro ou interação do usuário. O Vírus precisa de um hospedeiro (arquivo executável) e depende da ação do usuário para se espalhar."
  },

  // --- Mais Sistemas Operacionais ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o comando 'ps aux' é utilizado para:",
    options: [
      "exibir o espaço em disco utilizado.",
      "listar todos os processos em execução no sistema.",
      "exibir a tabela de roteamento.",
      "criar um novo processo."
    ],
    correctOption: 1,
    explanation: "O comando 'ps aux' lista todos os processos em execução no sistema, mostrando PID, usuário, uso de CPU/memória, etc. 'df' exibe espaço em disco, 'route' ou 'ip route' exibe a tabela de roteamento e 'fork' cria processos."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o comando utilizado para encerrar (matar) um processo pelo seu PID é:",
    options: [
      "rm",
      "kill",
      "stop",
      "end"
    ],
    correctOption: 1,
    explanation: "O comando 'kill' seguido do PID encerra um processo no Linux. Ex: 'kill 1234' envia o sinal SIGTERM ao processo com PID 1234. 'kill -9 1234' envia SIGKILL (forçado). 'rm' remove arquivos. 'stop' e 'end' não são comandos padrão do Linux."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o diretório '/etc' armazena tipicamente:",
    options: [
      "arquivos temporários do sistema.",
      "arquivos de configuração do sistema e serviços.",
      "arquivos pessoais dos usuários.",
      "bibliotecas compartilhadas do sistema."
    ],
    correctOption: 1,
    explanation: "O diretório '/etc' contém arquivos de configuração do sistema e serviços (ex: /etc/passwd, /etc/hosts, /etc/network). '/tmp' armazena temporários, '/home' armazena dados dos usuários e '/lib' contém bibliotecas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "A memória virtual é uma técnica que permite:",
    options: [
      "substituir a memória RAM por memória ROM.",
      "utilizar parte do disco rígido como extensão da memória RAM.",
      "acelerar a velocidade do processador.",
      "aumentar a capacidade de armazenamento permanente."
    ],
    correctOption: 1,
    explanation: "A memória virtual utiliza uma área do disco rígido (arquivo de troca/swap) como extensão da RAM, permitindo executar programas maiores que a RAM física disponível. O sistema operacional gerencia a transferência de páginas entre RAM e disco."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "No Linux, o comando para criar um novo diretório é:",
    options: [
      "touch",
      "mkdir",
      "newdir",
      "create"
    ],
    correctOption: 1,
    explanation: "'mkdir' (make directory) cria novos diretórios no Linux. Ex: 'mkdir /home/user/documentos'. 'touch' cria arquivos vazios ou atualiza timestamps. 'newdir' e 'create' não são comandos padrão do Linux."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "O comando Linux 'tar -czvf backup.tar.gz /pasta' realiza qual operação?",
    options: [
      "Descompacta o arquivo backup.tar.gz na pasta.",
      "Compacta a pasta em um arquivo .tar.gz com compressão gzip.",
      "Lista o conteúdo do arquivo backup.tar.gz.",
      "Remove a pasta e cria um backup."
    ],
    correctOption: 1,
    explanation: "As flags: -c (create/criar), -z (gzip/comprimir), -v (verbose/detalhado), -f (file/arquivo). Então o comando cria um arquivo compactado .tar.gz da pasta especificada. Para descompactar, usa-se -x (extract) no lugar de -c."
  },

  // --- Mais Hardware ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "O componente responsável por converter sinais digitais em analógicos para transmissão por linhas telefônicas é o:",
    options: [
      "Roteador.",
      "Switch.",
      "Modem.",
      "Hub."
    ],
    correctOption: 2,
    explanation: "O Modem (MOdulador-DEModulador) converte sinais digitais em analógicos (modulação) para envio por linhas telefônicas e vice-versa (demodulação). Roteadores encaminham pacotes entre redes, switches comutam quadros em redes locais."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "A placa-mãe (motherboard) de um computador tem como função principal:",
    options: [
      "processar os dados e executar instruções de software.",
      "armazenar permanentemente o sistema operacional.",
      "interconectar e permitir a comunicação entre todos os componentes do computador.",
      "converter energia elétrica de corrente alternada para corrente contínua."
    ],
    correctOption: 2,
    explanation: "A placa-mãe é a placa de circuito principal que interconecta todos os componentes do computador (CPU, RAM, HD, GPU, etc.) através de barramentos, slots e conectores. O processador processa dados (A) e a fonte converte energia (D)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "O conector RJ-45 é utilizado em:",
    options: [
      "cabos de fibra óptica.",
      "cabos de par trançado (UTP/STP) para redes Ethernet.",
      "cabos coaxiais para TV a cabo.",
      "cabos de energia elétrica."
    ],
    correctOption: 1,
    explanation: "O conector RJ-45 é o conector padrão para cabos de par trançado (UTP/STP) em redes Ethernet. Possui 8 pinos e é utilizado nos padrões T568A e T568B. Fibra óptica usa conectores como SC, LC e ST."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "A fonte de alimentação de um computador tem como função:",
    options: [
      "processar instruções do sistema operacional.",
      "converter energia elétrica de corrente alternada (AC) para corrente contínua (DC).",
      "armazenar dados temporariamente para acesso rápido.",
      "resfriar os componentes internos do computador."
    ],
    correctOption: 1,
    explanation: "A fonte de alimentação (PSU — Power Supply Unit) converte a energia da tomada (corrente alternada — AC) em corrente contínua (DC) nas voltagens adequadas (3.3V, 5V, 12V) para alimentar os componentes internos do computador."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "RAID 1 (Redundant Array of Independent Disks) utiliza a técnica de:",
    options: [
      "striping — divisão dos dados entre múltiplos discos sem redundância.",
      "mirroring — espelhamento dos dados em dois ou mais discos idênticos.",
      "paridade distribuída — distribuição de dados e paridade entre três ou mais discos.",
      "concatenação — união da capacidade de múltiplos discos em um volume lógico."
    ],
    correctOption: 1,
    explanation: "RAID 1 utiliza espelhamento (mirroring): os dados são duplicados identicamente em dois ou mais discos. Se um disco falhar, o outro mantém a cópia. RAID 0 usa striping (sem redundância) e RAID 5 usa paridade distribuída."
  },

  // --- Mais Banco de Dados ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em SQL, a junção (JOIN) que retorna apenas os registros que possuem correspondência em AMBAS as tabelas é a:",
    options: [
      "LEFT JOIN.",
      "RIGHT JOIN.",
      "INNER JOIN.",
      "FULL OUTER JOIN."
    ],
    correctOption: 2,
    explanation: "INNER JOIN retorna somente os registros que possuem correspondência em ambas as tabelas. LEFT JOIN retorna todos da tabela esquerda + correspondências. RIGHT JOIN retorna todos da tabela direita + correspondências. FULL OUTER JOIN retorna todos de ambas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "No Modelo Entidade-Relacionamento (MER), um losango representa:",
    options: [
      "uma entidade.",
      "um atributo.",
      "um relacionamento.",
      "uma chave primária."
    ],
    correctOption: 2,
    explanation: "No Diagrama Entidade-Relacionamento (DER): retângulos representam entidades, losangos representam relacionamentos, elipses representam atributos e linhas conectam os elementos mostrando a cardinalidade."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "A Primeira Forma Normal (1FN) exige que:",
    options: [
      "todos os atributos dependam exclusivamente da chave primária completa.",
      "não existam dependências transitivas entre atributos não-chave.",
      "cada campo da tabela contenha apenas valores atômicos (indivisíveis).",
      "a tabela possua no mínimo duas chaves candidatas."
    ],
    correctOption: 2,
    explanation: "A 1FN (Primeira Forma Normal) exige que todos os campos contenham valores atômicos (indivisíveis) — sem grupos repetitivos ou campos multivalorados. A 2FN elimina dependências parciais e a 3FN elimina dependências transitivas."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em SQL, qual função de agregação retorna o número de linhas em um conjunto de resultados?",
    options: [
      "SUM()",
      "AVG()",
      "COUNT()",
      "MAX()"
    ],
    correctOption: 2,
    explanation: "COUNT() conta o número de linhas/registros. SUM() calcula a soma dos valores, AVG() calcula a média aritmética e MAX() retorna o maior valor. Todas são funções de agregação usadas com GROUP BY."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "O comando SQL utilizado para remover TODOS os registros de uma tabela sem remover a estrutura da tabela é:",
    options: [
      "DROP TABLE.",
      "DELETE FROM tabela (sem WHERE).",
      "ALTER TABLE.",
      "REMOVE TABLE."
    ],
    correctOption: 1,
    explanation: "'DELETE FROM tabela' (sem cláusula WHERE) remove todos os registros da tabela, mantendo sua estrutura intacta. 'DROP TABLE' remove a tabela inteira (dados + estrutura). TRUNCATE TABLE também remove todos os dados, mas de forma mais eficiente. 'REMOVE TABLE' não existe em SQL padrão."
  },

  // --- Mais Programação ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Em Java, uma classe abstrata se diferencia de uma interface porque:",
    options: [
      "uma classe abstrata não pode ter métodos implementados.",
      "uma classe abstrata pode ter atributos de instância e métodos com implementação.",
      "uma interface pode ter construtores.",
      "uma classe abstrata permite herança múltipla."
    ],
    correctOption: 1,
    explanation: "Uma classe abstrata pode ter atributos, construtores e métodos com implementação (além de métodos abstratos). Uma interface (antes do Java 8) só tinha métodos abstratos e constantes. Java não permite herança múltipla de classes, apenas de interfaces."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "Em Java, o operador '==' compara:",
    options: [
      "o conteúdo de dois objetos.",
      "a referência (endereço de memória) de dois objetos.",
      "o tipo de dois objetos.",
      "o hashCode de dois objetos."
    ],
    correctOption: 1,
    explanation: "O operador '==' compara referências (endereços de memória) de objetos, verificando se apontam para o mesmo objeto. Para comparar o conteúdo/valor de objetos, usa-se o método .equals(). Para tipos primitivos, '==' compara valores."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Programação Orientada a Objetos (Java)",
    questionText: "O tratamento de exceções em Java utiliza os blocos:",
    options: [
      "if-else-finally.",
      "try-catch-finally.",
      "do-while-catch.",
      "switch-case-default."
    ],
    correctOption: 1,
    explanation: "Em Java, o tratamento de exceções usa: 'try' (bloco monitorado), 'catch' (captura e trata a exceção) e 'finally' (executado sempre, com ou sem exceção — útil para liberar recursos). Pode haver múltiplos catches para diferentes tipos de exceção."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Qual será o valor de RESULTADO após a execução do pseudocódigo?\n\nRESULTADO ← 0\nPARA i DE 1 ATÉ 5 FAÇA\n  RESULTADO ← RESULTADO + i\nFIM PARA",
    options: [
      "10",
      "15",
      "20",
      "5"
    ],
    correctOption: 1,
    explanation: "O laço soma os valores de i de 1 a 5: RESULTADO = 0+1+2+3+4+5 = 15. É a soma dos primeiros 5 números naturais, que pode ser calculada pela fórmula n×(n+1)/2 = 5×6/2 = 15."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Em lógica booleana, o resultado da expressão (V AND F) OR (V AND V) é:",
    options: [
      "Falso.",
      "Verdadeiro.",
      "Indefinido.",
      "Nulo."
    ],
    correctOption: 1,
    explanation: "(V AND F) = F; (V AND V) = V. F OR V = V (Verdadeiro). Na operação AND, ambos precisam ser verdadeiros. Na operação OR, basta um ser verdadeiro para o resultado ser verdadeiro."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Um algoritmo de busca binária em um vetor ordenado tem complexidade de tempo:",
    options: [
      "O(n) — linear.",
      "O(n²) — quadrática.",
      "O(log n) — logarítmica.",
      "O(1) — constante."
    ],
    correctOption: 2,
    explanation: "A busca binária divide o vetor ao meio a cada iteração, resultando em complexidade O(log n). Ela exige que o vetor esteja ordenado. A busca sequencial (linear) tem complexidade O(n), pois percorre elemento por elemento."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Uma variável do tipo 'boolean' em linguagens de programação pode armazenar:",
    options: [
      "qualquer número inteiro.",
      "caracteres alfanuméricos.",
      "apenas os valores 'true' ou 'false'.",
      "números decimais de ponto flutuante."
    ],
    correctOption: 2,
    explanation: "O tipo boolean armazena apenas dois valores possíveis: true (verdadeiro) ou false (falso). É utilizado em condições, laços e operações lógicas. Inteiros usam 'int', caracteres usam 'char' e decimais usam 'float' ou 'double'."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Lógica de Programação",
    questionText: "Uma lista encadeada (linked list) se diferencia de um vetor (array) principalmente por:",
    options: [
      "armazenar elementos de forma contígua na memória.",
      "ter tamanho fixo definido na declaração.",
      "utilizar ponteiros para conectar elementos espalhados na memória.",
      "permitir apenas acesso sequencial aos elementos, sem uso de ponteiros."
    ],
    correctOption: 2,
    explanation: "Em uma lista encadeada, cada nó contém o dado e um ponteiro para o próximo nó, permitindo que os elementos estejam espalhados na memória. Um array aloca memória contígua e tem tamanho fixo. A lista encadeada é dinâmica e facilita inserções/remoções."
  },

  // --- Mais Engenharia de Software ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "No Scrum, o período fixo de tempo no qual a equipe desenvolve um incremento funcional do produto é chamado de:",
    options: [
      "Backlog.",
      "Sprint.",
      "Release.",
      "Milestone."
    ],
    correctOption: 1,
    explanation: "A Sprint é um período fixo (geralmente 1 a 4 semanas) no qual a equipe Scrum desenvolve e entrega um incremento funcional do produto. O Backlog é a lista de requisitos priorizados. Release é a entrega ao cliente e Milestone é um marco do projeto."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "No contexto de versionamento de código, o Git é classificado como um sistema de controle de versão:",
    options: [
      "centralizado.",
      "distribuído.",
      "linear.",
      "sequencial."
    ],
    correctOption: 1,
    explanation: "O Git é um sistema de controle de versão distribuído (DVCS), onde cada desenvolvedor possui uma cópia completa do repositório, incluindo todo o histórico. SVN e CVS são exemplos de sistemas centralizados, onde há apenas um servidor central."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "Os requisitos funcionais de um sistema descrevem:",
    options: [
      "as restrições de desempenho, segurança e usabilidade.",
      "as funcionalidades e comportamentos que o sistema deve apresentar.",
      "o hardware necessário para executar o sistema.",
      "o cronograma e orçamento do projeto."
    ],
    correctOption: 1,
    explanation: "Requisitos funcionais descrevem O QUE o sistema deve fazer — suas funcionalidades, comportamentos e operações. Requisitos não-funcionais descrevem COMO ele deve fazer — desempenho, segurança, usabilidade, portabilidade, etc."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "O Diagrama de Sequência da UML é utilizado para representar:",
    options: [
      "a estrutura de classes e seus atributos.",
      "a interação temporal entre objetos, mostrando a troca de mensagens ao longo do tempo.",
      "os estados possíveis de um objeto durante seu ciclo de vida.",
      "a distribuição dos componentes em servidores físicos."
    ],
    correctOption: 1,
    explanation: "O Diagrama de Sequência modela a interação entre objetos ao longo do tempo, mostrando a ordem das mensagens trocadas. É um diagrama de comportamento/interação. O Diagrama de Estados mostra transições de estado e o de Classes mostra a estrutura estática."
  },

  // --- Mais Sistemas de Numeração ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas de Numeração",
    questionText: "O número hexadecimal 'A3' convertido para decimal equivale a:",
    options: [
      "143",
      "163",
      "193",
      "103"
    ],
    correctOption: 1,
    explanation: "Conversão: A (=10) × 16 + 3 × 1 = 160 + 3 = 163. Em hexadecimal: A=10, B=11, C=12, D=13, E=14, F=15."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas de Numeração",
    questionText: "Quantos bytes existem em 1 Kilobyte (KB) na convenção binária?",
    options: [
      "1000 bytes.",
      "1024 bytes.",
      "512 bytes.",
      "2048 bytes."
    ],
    correctOption: 1,
    explanation: "Na convenção binária (usada em computação), 1 KB = 2^10 = 1024 bytes. Na convenção decimal (SI), 1 kB = 1000 bytes. Em provas de concurso, geralmente adota-se a convenção binária."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas de Numeração",
    questionText: "O complemento de 1 do número binário 10110 é:",
    options: [
      "01001",
      "10111",
      "01010",
      "11001"
    ],
    correctOption: 0,
    explanation: "O complemento de 1 é obtido invertendo-se todos os bits: 0→1 e 1→0. Então: 10110 → 01001. O complemento de 1 é utilizado em operações aritméticas binárias e representação de números negativos."
  },

  // --- Questões extras de IT ---
  {
    subject: "Specialized IT Knowledge",
    topic: "Redes de Computadores",
    questionText: "O protocolo SSH (Secure Shell) utiliza a porta padrão:",
    options: [
      "21",
      "22",
      "23",
      "25"
    ],
    correctOption: 1,
    explanation: "O SSH opera na porta 22 e fornece acesso remoto seguro (criptografado) a servidores. Porta 21 é FTP, porta 23 é Telnet (não criptografado — não recomendado) e porta 25 é SMTP."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Segurança da Informação",
    questionText: "O princípio do menor privilégio em segurança da informação estabelece que:",
    options: [
      "todos os usuários devem ter acesso de administrador para facilitar o trabalho.",
      "cada usuário deve ter apenas os privilégios mínimos necessários para executar suas funções.",
      "o sistema deve ter o menor número possível de senhas.",
      "apenas o administrador pode acessar o sistema."
    ],
    correctOption: 1,
    explanation: "O princípio do menor privilégio (Least Privilege) determina que cada usuário, processo ou programa deve operar com o nível mínimo de permissões necessárias para realizar suas tarefas. Isso reduz a superfície de ataque e limita danos em caso de comprometimento."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Banco de Dados",
    questionText: "Em SQL, a cláusula LIKE é utilizada para:",
    options: [
      "comparar valores numéricos exatos.",
      "realizar buscas com padrões de texto usando curingas (% e _).",
      "ordenar os resultados da consulta.",
      "agrupar registros por categorias."
    ],
    correctOption: 1,
    explanation: "A cláusula LIKE permite buscas por padrões em campos de texto. O curinga '%' substitui zero ou mais caracteres e '_' substitui exatamente um caractere. Ex: WHERE nome LIKE 'Jo%' encontra João, José, Joaquim."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Sistemas Operacionais",
    questionText: "O algoritmo de escalonamento Round Robin se caracteriza por:",
    options: [
      "executar primeiro o processo com menor tempo de execução.",
      "atribuir a cada processo uma fatia de tempo (quantum) de CPU de forma circular.",
      "executar primeiro o processo com maior prioridade.",
      "executar os processos na ordem de chegada sem interrupção."
    ],
    correctOption: 1,
    explanation: "O Round Robin atribui a cada processo uma fatia de tempo (quantum) igual. Quando o quantum expira, o processo é movido para o fim da fila e o próximo recebe a CPU. É justo e evita starvation (inanição). FCFS executa por ordem de chegada."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Hardware",
    questionText: "O clock (relógio) de um processador, medido em GHz, indica:",
    options: [
      "a quantidade de memória RAM que o processador pode acessar.",
      "a frequência de ciclos de operação por segundo do processador.",
      "a velocidade de transferência de dados do disco rígido.",
      "a resolução máxima suportada pela placa de vídeo."
    ],
    correctOption: 1,
    explanation: "O clock indica a frequência de operação do processador em ciclos por segundo. 1 GHz = 1 bilhão de ciclos por segundo. Quanto maior o clock, mais operações o processador pode executar por segundo (embora não seja o único fator de desempenho)."
  },
  {
    subject: "Specialized IT Knowledge",
    topic: "Engenharia de Software",
    questionText: "A licença de software GPL (General Public License) permite:",
    options: [
      "usar o software apenas para fins pessoais.",
      "modificar e redistribuir o software, desde que o código derivado também seja livre (copyleft).",
      "vender o software sem disponibilizar o código-fonte.",
      "usar o software apenas em ambientes acadêmicos."
    ],
    correctOption: 1,
    explanation: "A GPL é uma licença de software livre com copyleft: permite usar, modificar e redistribuir, mas qualquer software derivado DEVE também ser distribuído sob GPL com código-fonte aberto. Isso garante que o software permaneça livre."
  },

  // --- Mais Português (completando 100) ---
  {
    subject: "Português",
    topic: "Sintaxe",
    questionText: "Na oração 'Chove muito em Manaus', o sujeito é classificado como:",
    options: [
      "sujeito simples.",
      "sujeito composto.",
      "sujeito oculto (desinencial).",
      "sujeito inexistente (oração sem sujeito)."
    ],
    correctOption: 3,
    explanation: "O verbo 'chover', quando indica fenômeno da natureza, é impessoal — não possui sujeito. A oração é classificada como 'sem sujeito' ou 'sujeito inexistente'. Outros verbos impessoais: 'haver' (existir/tempo) e 'fazer' (tempo/clima)."
  },
  {
    subject: "Português",
    topic: "Morfologia",
    questionText: "Na oração 'O caminhar faz bem à saúde', a palavra 'caminhar' é classificada como:",
    options: [
      "verbo.",
      "substantivo.",
      "adjetivo.",
      "advérbio."
    ],
    correctOption: 1,
    explanation: "Quando precedido de artigo ('O caminhar'), um verbo no infinitivo se substantiva — passa a funcionar como substantivo. Esse processo é chamado de derivação imprópria ou conversão."
  },
  {
    subject: "Português",
    topic: "Concordância Verbal",
    questionText: "Na frase 'Faz dois meses que não chove', o verbo 'fazer' está no singular porque:",
    options: [
      "concorda com o sujeito oculto 'ele'.",
      "é impessoal quando indica tempo decorrido.",
      "está no modo subjuntivo.",
      "o sujeito é 'dois meses'."
    ],
    correctOption: 1,
    explanation: "O verbo 'fazer' indicando tempo decorrido é impessoal (sem sujeito) e permanece sempre na 3ª pessoa do singular: 'faz dois meses', 'fazia três anos'. O mesmo ocorre com 'haver' indicando tempo: 'há dois meses'."
  },
  {
    subject: "Português",
    topic: "Funções da Linguagem",
    questionText: "A função metalinguística da linguagem ocorre quando:",
    options: [
      "o foco está no emissor e suas emoções.",
      "o foco está no canal de comunicação.",
      "o código é usado para explicar o próprio código (a linguagem explica a linguagem).",
      "o foco está no receptor, buscando persuadi-lo."
    ],
    correctOption: 2,
    explanation: "A função metalinguística ocorre quando a linguagem é usada para falar sobre si mesma: um dicionário (palavras explicando palavras), uma gramática, um poema sobre poesia. O foco está no código linguístico."
  },
  {
    subject: "Português",
    topic: "Interpretação de Texto",
    questionText: "A diferença fundamental entre FATO e OPINIÃO em um texto é que:",
    options: [
      "fatos são sempre verdadeiros e opiniões são sempre falsas.",
      "fatos são informações verificáveis e opiniões expressam juízos de valor pessoais.",
      "opiniões são mais importantes que fatos em textos jornalísticos.",
      "não existe diferença prática entre fato e opinião."
    ],
    correctOption: 1,
    explanation: "Fato é uma informação objetiva, verificável e comprovável (ex: 'O Brasil é o maior país da América do Sul'). Opinião é um juízo de valor subjetivo e pessoal (ex: 'O Brasil é o melhor país do mundo'). Distinguir fato de opinião é essencial em provas de interpretação."
  }
];

async function seed() {
  console.log("============================================================");
  console.log("  OPERAÇÃO CARGA TÁTICA II — Bloco 2 de Questões EAGS SIN");
  console.log("  Temas: Português + Informática (avançado e complementar)");
  console.log("============================================================");
  console.log(`Total de questões a injetar: ${eagsBloco2Questions.length}`);
  
  try {
    const batchSize = 25;
    let inserted = 0;

    for (let i = 0; i < eagsBloco2Questions.length; i += batchSize) {
      const batch = eagsBloco2Questions.slice(i, i + batchSize);
      await db.insert(questions).values(batch);
      inserted += batch.length;
      console.log(`[PROGRESSO] ${inserted}/${eagsBloco2Questions.length} questões inseridas...`);
    }

    console.log("============================================================");
    console.log(`[SUCESSO] Todas as ${eagsBloco2Questions.length} questões foram inseridas!`);
    console.log("Arsenal Tático: REFORÇADO.");
    console.log("============================================================");
  } catch (error) {
    console.error("[FALHA CRÍTICA] Erro ao importar questões:", error);
    process.exit(1);
  }
  process.exit(0);
}

seed();
