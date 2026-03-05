// =========================================================================
// BANCO DE DADOS HÍBRIDO (MÁXIMA CAPACIDADE)
// =========================================================================

// Matriz massiva com todas as questões desenvolvidas.
const defaultQuestions = [
    { cat: "Especialidade", q: "Linux: Permissão '-rwxr-x---' em octal?", options: ["750", "751", "754", "777"], correct: 0, explanation: "Dono(7)+Grupo(5)+Outros(0)." },
    { cat: "Português", q: "Regência 'Aspirar' (desejar)?", options: ["VTD", "VTI (exige 'a')", "Intransitivo", "VTI (exige 'de')"], correct: 1, explanation: "Aspirar ao cargo." },
    { cat: "Especialidade", q: "SQL: Apagar tabela completa?", options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"], correct: 2, explanation: "DROP TABLE remove estrutura e dados." },
    { cat: "Especialidade", q: "Hosts em /27?", options: ["32", "30", "16", "14"], correct: 1, explanation: "32 IPs - 2 = 30 Hosts." },
    { cat: "Português", q: "Crase obrigatória?", options: ["Fui a pé", "Vou à escola", "Falei a ela", "Venda a prazo"], correct: 1, explanation: "Vou a + a escola." },
    { cat: "Especialidade", q: "Transporte confiável?", options: ["UDP", "IP", "TCP", "ICMP"], correct: 2, explanation: "TCP garante entrega." },
    { cat: "Especialidade", q: "Diferença M.2 SATA vs NVMe?", options: ["NVMe usa PCIe (rápido)", "Iguais", "SATA mais rápido", "USB"], correct: 0, explanation: "NVMe via PCIe é superior." },
    { cat: "Especialidade", q: "Selo 80 Plus?", options: ["80% potência", "Eficiência >= 80%", "80 Volts", "Durabilidade"], correct: 1, explanation: "Eficiência energética." },
    { cat: "Especialidade", q: "Hyper-Threading?", options: ["Overclock", "2 threads por núcleo", "Virtualização", "Cache"], correct: 1, explanation: "Simula núcleos lógicos." },
    { cat: "Especialidade", q: "Bateria CR2032?", options: ["CPU", "BIOS/Relógio", "LED", "SSD"], correct: 1, explanation: "Mantém CMOS." },
    { cat: "Especialidade", q: "STP (Spanning Tree)?", options: ["Velocidade", "Evitar loops L2", "Roteamento", "Cripto"], correct: 1, explanation: "Evita broadcast storms." },
    { cat: "Especialidade", q: "IP APIPA?", options: ["192.168.x.x", "10.x.x.x", "169.254.x.x", "172.16.x.x"], correct: 2, explanation: "Sem DHCP." },
    { cat: "Especialidade", q: "Wi-Fi 6 (802.11ax)?", options: ["Alcance", "2.4GHz só", "Eficiência (OFDMA)", "Segurança"], correct: 2, explanation: "Alta densidade." },
    { cat: "Especialidade", q: "Porta Tronco (Cisco)?", options: ["access", "trunk", "vlan", "interface"], correct: 1, explanation: "switchport mode trunk." },
    { cat: "Especialidade", q: "Default Gateway?", options: ["DNS", "Roteador de saída", "Broadcast", "Máscara"], correct: 1, explanation: "Saída para internet." },
    { cat: "Especialidade", q: "Linux: Espaço em disco (pasta)?", options: ["df", "du", "free", "ls"], correct: 1, explanation: "Disk Usage." },
    { cat: "Especialidade", q: "Linux: 'touch' arquivo existente?", options: ["Apaga", "Copia", "Atualiza data", "Renomeia"], correct: 2, explanation: "Timestamp." },
    { cat: "Especialidade", q: "Linux: Config DNS?", options: ["hosts", "resolv.conf", "network", "dns"], correct: 1, explanation: "/etc/resolv.conf." },
    { cat: "Especialidade", q: "Sticky bit /tmp?", options: ["Leitura", "Só dono apaga", "Oculto", "Link"], correct: 1, explanation: "Segurança." },
    { cat: "Especialidade", q: "Msg kernel boot?", options: ["syslog", "dmesg", "uname", "last"], correct: 1, explanation: "Ring buffer." },
    { cat: "Especialidade", q: "AD: Trusts?", options: ["Acesso entre domínios", "Bloqueio", "Backup", "Impressão"], correct: 0, explanation: "Confiança." },
    { cat: "Especialidade", q: "Windows: Gerenciar disco?", options: ["chkdsk", "diskmgmt.msc", "taskmgr", "regedit"], correct: 1, explanation: "Partições." },
    { cat: "Especialidade", q: "SYSVOL?", options: ["Scripts/GPO", "SO", "Swap", "Backup"], correct: 0, explanation: "Replicado." },
    { cat: "Especialidade", q: "PowerShell listar serviços?", options: ["ls", "dir", "Get-Service", "Show"], correct: 2, explanation: "Cmdlet." },
    { cat: "Especialidade", q: "NTFS: Negar vs Permitir?", options: ["Negar vence", "Permitir vence", "Admin", "Nada"], correct: 0, explanation: "Deny ganha." },
    { cat: "Especialidade", q: "IDS vs IPS?", options: ["IDS detecta, IPS bloqueia", "IDS bloqueia", "Iguais", "Hw"], correct: 0, explanation: "Passivo vs Ativo." },
    { cat: "Especialidade", q: "Engenharia Social?", options: ["Código", "Manipulação humana", "Força bruta", "Wifi"], correct: 1, explanation: "Psicológico." },
    { cat: "Especialidade", q: "DMZ?", options: ["Isolar serviços públicos", "Acelerar", "Wifi", "Backup"], correct: 0, explanation: "Zona desmilitarizada." },
    { cat: "Especialidade", q: "Confidencialidade?", options: ["Backup", "Hash", "Criptografia", "Redundância"], correct: 2, explanation: "Sigilo." },
    { cat: "Especialidade", q: "Certificado A1 vs A3?", options: ["A1 arquivo, A3 token", "A3 inseguro", "A1 eterno", "A3 grátis"], correct: 0, explanation: "A3 é físico." },
    { cat: "Especialidade", q: "HTML5 lista ordenada?", options: ["ul", "li", "ol", "dl"], correct: 2, explanation: "Ordered List." },
    { cat: "Especialidade", q: "CSS cor texto?", options: ["text-color", "font-color", "color", "bg"], correct: 2, explanation: "color." },
    { cat: "Especialidade", q: "Variável Booleana?", options: ["Texto", "Real", "Verdadeiro/Falso", "Data"], correct: 2, explanation: "Lógica." },
    { cat: "Especialidade", q: "SQL WHERE vs HAVING?", options: ["Iguais", "WHERE linhas, HAVING grupos", "Rápido", "Números"], correct: 1, explanation: "Having pós-agrupamento." },
    { cat: "Português", q: "Erro concordância?", options: ["Anexas", "Em anexo", "Elas mesmas", "É proibida entrada"], correct: 3, explanation: "Sem artigo, é proibido." },
    { cat: "Português", q: "Oração 'É necessário QUE...'", options: ["Subjetiva", "Objetiva", "Sindética", "Adjetiva"], correct: 0, explanation: "Sujeito oracional." },
    { cat: "Especialidade", q: "Conector de energia principal da placa-mãe?", options: ["ATX 24 pinos", "EPS 8 pinos", "PCIe 6 pinos", "Molex"], correct: 0, explanation: "Alimenta a placa." },
    { cat: "Especialidade", q: "Conector de energia extra da CPU?", options: ["ATX 24", "EPS 12V (4 ou 8 pinos)", "SATA", "PCIe"], correct: 1, explanation: "Alimenta o processador." },
    { cat: "Especialidade", q: "Cabo par trançado blindado?", options: ["UTP", "STP", "Coaxial", "Fibra"], correct: 1, explanation: "Shielded Twisted Pair." },
    { cat: "Especialidade", q: "Categoria cabo rede 10Gbps?", options: ["Cat5", "Cat5e", "Cat6a", "Cat3"], correct: 2, explanation: "Cat6a suporta 10G até 100m." },
    { cat: "Especialidade", q: "Fibra conector quadrado grande?", options: ["ST", "SC", "LC", "MTRJ"], correct: 1, explanation: "SC (Subscriber Connector)." },
    { cat: "Especialidade", q: "Fibra conector pequeno trava?", options: ["ST", "SC", "LC", "FC"], correct: 2, explanation: "LC (Lucent Connector)." },
    { cat: "Especialidade", q: "Fibra conector redondo baioneta?", options: ["ST", "SC", "LC", "MTRJ"], correct: 0, explanation: "ST (Straight Tip)." },
    { cat: "Especialidade", q: "Wi-Fi 2.4GHz canais não sobrepostos?", options: ["1, 6, 11", "1, 2, 3", "1, 5, 9", "Todos"], correct: 0, explanation: "Para evitar interferência." },
    { cat: "Especialidade", q: "Padrão Wi-Fi 5?", options: ["802.11n", "802.11ac", "802.11ax", "802.11g"], correct: 1, explanation: "AC é Wi-Fi 5." },
    { cat: "Especialidade", q: "CSMA/CD é usado em?", options: ["Wi-Fi", "Ethernet (Cabo)", "Bluetooth", "Fibra"], correct: 1, explanation: "Detecção de colisão." },
    { cat: "Especialidade", q: "WAN: Protocolo MPLS?", options: ["Roteamento por rótulos (Labels)", "Criptografia", "VPN", "Wi-Fi"], correct: 0, explanation: "Multiprotocol Label Switching." },
    { cat: "Especialidade", q: "DNS: Registro CNAME?", options: ["Apelido (Alias)", "IP", "Email", "Texto"], correct: 0, explanation: "Canonical Name." },
    { cat: "Especialidade", q: "DNS: Registro NS?", options: ["Name Server (Autoridade)", "IP", "Email", "Alias"], correct: 0, explanation: "Indica o servidor DNS do domínio." },
    { cat: "Especialidade", q: "Linux: 'ln -s' cria?", options: ["Hard Link", "Soft/Symbolic Link", "Cópia", "Arquivo"], correct: 1, explanation: "Atalho (ponteiro)." },
    { cat: "Especialidade", q: "Linux: SUID bit?", options: ["Executa como dono", "Executa como grupo", "Sticky", "Leitura"], correct: 0, explanation: "Set User ID." },
    { cat: "Especialidade", q: "Linux: 'find / -name arquivo'?", options: ["Busca por nome na raiz", "Busca texto", "Lista", "Apaga"], correct: 0, explanation: "Procura na árvore." },
    { cat: "Especialidade", q: "Linux: 'systemctl restart'?", options: ["Reinicia serviço", "Reinicia PC", "Para serviço", "Status"], correct: 0, explanation: "Systemd control." },
    { cat: "Especialidade", q: "Windows: 'diskpart'?", options: ["Gerenciador partições CLI", "Verifica erro", "Limpa disco", "Desfragmenta"], correct: 0, explanation: "Ferramenta de disco." },
    { cat: "Especialidade", q: "Windows: Hive HKCU?", options: ["HKEY_CURRENT_USER", "Local Machine", "Users", "Root"], correct: 0, explanation: "Config do usuário logado." },
    { cat: "Especialidade", q: "Segurança: Vishing?", options: ["Phishing por voz (fone)", "SMS", "Email", "Vídeo"], correct: 0, explanation: "Voice Phishing." },
    { cat: "Especialidade", q: "Hash SHA-256 bits?", options: ["256 bits", "128 bits", "512 bits", "64 bits"], correct: 0, explanation: "Seguro." },
    { cat: "Especialidade", q: "VPN: IPsec modo túnel?", options: ["Cifra cabeçalho e dados", "Só dados", "Só cabeçalho", "Nada"], correct: 0, explanation: "Protege todo o pacote." },
    { cat: "Especialidade", q: "Prog: Memória Heap?", options: ["Alocação dinâmica", "Estática", "Pilha", "Código"], correct: 0, explanation: "Objetos (new)." },
    { cat: "Especialidade", q: "Prog: Passagem por Valor?", options: ["Copia o dado", "Passa endereço", "Referência", "Ponteiro"], correct: 0, explanation: "Original não muda." },
    { cat: "Especialidade", q: "HTML: Tag <article>?", options: ["Conteúdo independente", "Seção genérica", "Rodapé", "Menu"], correct: 0, explanation: "Semântica." },
    { cat: "Especialidade", q: "CSS: Box Model (Dentro p/ Fora)?", options: ["Content, Padding, Border, Margin", "Margin, Border, Padding", "Border, Padding", "Padding, Margin"], correct: 0, explanation: "Ordem correta." },
    { cat: "Especialidade", q: "Porta 587?", options: ["SMTP Submission (Seguro)", "SMTP Antigo", "POP3", "IMAP"], correct: 0, explanation: "Substitui a 25." },
    { cat: "Especialidade", q: "Porta 993?", options: ["IMAPS (Seguro)", "IMAP", "POP3", "SMTP"], correct: 0, explanation: "IMAP com SSL." },
    { cat: "Especialidade", q: "Linux: '/dev/null'?", options: ["Buraco negro (descarta dados)", "Arquivo vazio", "Zero", "Erro"], correct: 0, explanation: "Descarta saída." },
    { cat: "Especialidade", q: "Linux: '2>&1'?", options: ["Redireciona Erro para Saída Padrão", "Saída para Erro", "Apaga", "Copia"], correct: 0, explanation: "STDERR para STDOUT." },
    { cat: "Especialidade", q: "SQL: 'UNION'?", options: ["Combina resultados sem duplicatas", "Combina tudo", "Interseção", "Diferença"], correct: 0, explanation: "Remove repetidos." },
    { cat: "Especialidade", q: "Malware: Trojan?", options: ["Falso legítimo", "Replica rede", "Criptografa", "Boot"], correct: 0, explanation: "Cavalo de Troia." },
    { cat: "Português", q: "Fig. Ling: 'O pé da mesa'?", options: ["Catacrese", "Metáfora", "Metonímia", "Sinestesia"], correct: 0, explanation: "Empréstimo por falta de termo." },
    { cat: "Português", q: "Antítese vs Paradoxo?", options: ["Oposição possível vs Contradição impossível", "Iguais", "Oposição impossível", "Nenhum"], correct: 0, explanation: "Alto/Baixo (Antítese). Ferida que dói e não se sente (Paradoxo)." },
    { cat: "Português", q: "Conjunção 'Portanto'?", options: ["Conclusiva", "Adversativa", "Explicativa", "Aditiva"], correct: 0, explanation: "Conclusão." },
    { cat: "Português", q: "Crase: 'À uma hora' (tempo)?", options: ["Com crase", "Sem crase", "Facultativo", "Erro"], correct: 0, explanation: "Hora determinada." },
    { cat: "Português", q: "Plural: 'Segunda-feira'?", options: ["Segundas-feiras", "Segunda-feiras", "Segundas-feira", "Segunda feira"], correct: 0, explanation: "Ambos variam." },
    { cat: "Português", q: "Verbo 'Ver' (Tu - Futuro Subj)?", options: ["Vires", "Veres", "Vires", "Virs"], correct: 0, explanation: "Quando tu vires." },
    { cat: "Português", q: "Acentuação 'Pólen'?", options: ["Paroxítona terminada em N", "Oxítona", "Proparoxítona", "Hiato"], correct: 0, explanation: "Terminada em N." },
    { cat: "Português", q: "Acentuação 'Hifens'?", options: ["Sem acento", "Com acento", "Hífens", "Hiféns"], correct: 0, explanation: "Paroxítona terminada em ENS não acentua." },
    { cat: "Português", q: "Uso do 'Senão' (junto)?", options: ["Caso contrário / A não ser", "Se não", "Verbo", "Erro"], correct: 0, explanation: "Do contrário." },
    { cat: "Português", q: "Sessão (SS)?", options: ["Tempo/Reunião", "Departamento", "Ceder", "Corte"], correct: 0, explanation: "Sessão de cinema." },
    { cat: "Português", q: "Eminente?", options: ["Elevado/Nobre", "Próximo", "Rápido", "Antigo"], correct: 0, explanation: "Excelência." },
    { cat: "Português", q: "Voz Passiva Sintética?", options: ["Vende-se", "Foi vendido", "Vendi", "Vendendo"], correct: 0, explanation: "Verbo + SE." },
    { cat: "Português", q: "Vocativo?", options: ["Maria, venha", "A Maria veio", "Vi Maria", "Para Maria"], correct: 0, explanation: "Chamamento." },
    { cat: "Especialidade", q: "Qual a função do protocolo SMTP?", options: ["Envio de Email", "Recebimento", "Web", "Arquivo"], correct: 0, explanation: "Simple Mail Transfer Protocol." },
    { cat: "Especialidade", q: "Camada OSI que lida com Frames?", options: ["Enlace (Data Link)", "Física", "Rede", "Transporte"], correct: 0, explanation: "Camada 2." },
    { cat: "Especialidade", q: "Comando 'ipconfig /release'?", options: ["Libera o IP atual", "Renova o IP", "Mostra o IP", "Apaga"], correct: 0, explanation: "Libera a concessão DHCP." },
    { cat: "Especialidade", q: "Switch Layer 3?", options: ["Switch que faz roteamento", "Burro", "Hub", "Roteador puro"], correct: 0, explanation: "Opera nas camadas 2 e 3." },
    { cat: "Especialidade", q: "Ping -t no Windows?", options: ["Ping infinito", "1 vez", "Reverso", "Rápido"], correct: 0, explanation: "Até ser interrompido." },
    { cat: "Especialidade", q: "Samba no Linux?", options: ["Servidor de arquivos p/ Windows", "Dança", "Firewall", "Editor"], correct: 0, explanation: "Protocolo SMB/CIFS." },
    { cat: "Especialidade", q: "Tag <b> HTML?", options: ["Negrito", "Itálico", "Sublinhado", "Link"], correct: 0, explanation: "Bold." },
    { cat: "Português", q: "Plural de pé-de-moleque?", options: ["Pés-de-moleque", "Pé-de-moleques", "Pés-de-moleques", "Pé de moleque"], correct: 0, explanation: "Subst + Prep + Subst = Só o 1º varia." },
    { cat: "Português", q: "Diminutivo de Gota?", options: ["Gotícula", "Gotinha", "Gotazinha", "Gota"], correct: 0, explanation: "Forma erudita." }
];

// O Motor de Geração Inteligente - Produz o volume necessário (400+ questões)
function generateDynamicQuestions(count) {
    const generated = [];
    
    const ports = [
        {p: 20, s: "FTP Dados"}, {p: 21, s: "FTP Controle"}, {p: 22, s: "SSH"}, {p: 23, s: "Telnet"},
        {p: 25, s: "SMTP"}, {p: 53, s: "DNS"}, {p: 80, s: "HTTP"}, {p: 110, s: "POP3"},
        {p: 143, s: "IMAP"}, {p: 443, s: "HTTPS"}, {p: 3389, s: "RDP"}, {p: 3306, s: "MySQL"},
        {p: 161, s: "SNMP"}, {p: 445, s: "SMB"}, {p: 69, s: "TFTP"}, {p: 123, s: "NTP"},
        {p: 587, s: "SMTP (Submission)"}, {p: 993, s: "IMAPS"}, {p: 995, s: "POP3S"}
    ];
    
    const linuxDirs = [
        {d: "/bin", u: "Binários de usuário"}, {d: "/sbin", u: "Binários de sistema"},
        {d: "/etc", u: "Configurações"}, {d: "/dev", u: "Dispositivos"},
        {d: "/proc", u: "Info do kernel"}, {d: "/var", u: "Logs e variáveis"},
        {d: "/tmp", u: "Temporários"}, {d: "/home", u: "Usuários"}
    ];

    const acronyms = [
        {a: "CPU", m: "Central Processing Unit"}, {a: "RAM", m: "Random Access Memory"},
        {a: "SSD", m: "Solid State Drive"}, {a: "HDD", m: "Hard Disk Drive"},
        {a: "BIOS", m: "Basic Input/Output System"}, {a: "UEFI", m: "Unified Extensible Firmware Interface"},
        {a: "HTTP", m: "HyperText Transfer Protocol"}, {a: "HTML", m: "HyperText Markup Language"},
        {a: "SQL", m: "Structured Query Language"}, {a: "VPN", m: "Virtual Private Network"},
        {a: "LAN", m: "Local Area Network"}, {a: "WAN", m: "Wide Area Network"}
    ];

    for(let i=0; i<count; i++) {
        const type = i % 7; 
        if (type === 0) {
            const hosts = Math.pow(2, Math.floor(Math.random() * 6) + 2) - 2; 
            const mask = 32 - Math.log2(hosts + 2);
            generated.push({ cat: "Especialidade", q: `[Dinâmica] Máscara CIDR para suportar pelo menos ${hosts} hosts?`, options: [`/${mask}`, `/${mask+1}`, `/${mask-1}`, `/${mask+2}`], correct: 0, explanation: `2^n - 2 >= ${hosts}. Máscara = /${mask}.`});
        } 
        else if (type === 1) {
            const val = Math.floor(Math.random() * 255);
            const bin = val.toString(2).padStart(8, '0');
            const hex = val.toString(16).toUpperCase();
            generated.push({ cat: "Especialidade", q: `[Dinâmica] Hexadecimal do binário ${bin}?`, options: [hex, (val+1).toString(16).toUpperCase(), (val-1).toString(16).toUpperCase(), "FF"], correct: 0, explanation: `${bin} = ${val} dec = ${hex} hex.`});
        }
        else if (type === 2) {
            const p = ports[Math.floor(Math.random() * ports.length)];
            const wrong = ports[(ports.indexOf(p) + 1) % ports.length];
            generated.push({ cat: "Especialidade", q: `[Dinâmica] Porta do serviço ${p.s}?`, options: [p.p.toString(), wrong.p.toString(), (p.p+1).toString(), "8080"], correct: 0, explanation: `Padrão é ${p.p}.`});
        }
        else if (type === 3) {
            const A = Math.random() > 0.5;
            const B = Math.random() > 0.5;
            const res = A && B;
            generated.push({ cat: "Especialidade", q: `[Dinâmica] Lógica: A=${A}, B=${B}. Qual o resultado de (A AND B)?`, options: [res.toString(), (!res).toString(), "Nulo", "Erro"], correct: 0, explanation: `Ambos verdadeiros.`});
        }
        else if (type === 4) {
            const d = linuxDirs[Math.floor(Math.random() * linuxDirs.length)];
            generated.push({ cat: "Especialidade", q: `[Dinâmica] Linux: Diretório '${d.d}'?`, options: [d.u, "Arquivos", "Drivers", "Logs"], correct: 0, explanation: `${d.d}: ${d.u}.`});
        }
        else if (type === 5) {
            const a = acronyms[Math.floor(Math.random() * acronyms.length)];
            generated.push({ cat: "Especialidade", q: `[Dinâmica] Sigla '${a.a}'?`, options: [a.m, "Network Protocol", "System Control", "Data Transfer"], correct: 0, explanation: `${a.a} = ${a.m}.`});
        }
        else {
            const val = Math.floor(Math.random() * 64);
            const bin = val.toString(2).padStart(6, '0');
            generated.push({ cat: "Especialidade", q: `[Dinâmica] Converter decimal ${val} para binário (6 bits):`, options: [bin, (val+1).toString(2), (val-1).toString(2), "111111"], correct: 0, explanation: `${val} = ${bin}.`});
        }
    }
    return generated;
}

// =========================================================================
// VARIÁVEIS GLOBAIS E INICIALIZAÇÃO
// =========================================================================
let questionBank = [];
let currentCycleIndex = 0;
let currentPoolIndex = 0;
let stats = { port: 0, sin: 0, errors: 0 };
let missedQuestions = [];
let isReviewMode = false;
let activePool = [];

window.onload = () => {
    loadQuestions();
    initApp();
    updateCountdown();
    updateTotalCounter();
};

function loadQuestions() {
    const userQuestions = JSON.parse(localStorage.getItem('userQuestions_EAGS')) || [];
    // Gerador convocado: Gera mais 450 questões e soma com o banco fixo
    const generated = generateDynamicQuestions(450); 
    questionBank = [...defaultQuestions, ...generated, ...userQuestions];
}

function initApp() {
    activePool = shuffleArray([...questionBank]);
    currentCycleIndex = 0;
    currentPoolIndex = 0;
    stats = { port: 0, sin: 0, errors: 0 };
    missedQuestions = [];
    renderQuestion();
    updateStatsDisplay();
}

function escapeHtml(text) {
    if (!text) return text;
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
}

// =========================================================================
// LÓGICA DO SIMULADO
// =========================================================================
function renderQuestion() {
    if (currentPoolIndex >= activePool.length && !isReviewMode) {
        showResults();
        return;
    }

    const q = activePool[currentPoolIndex];

    const catLabel = document.getElementById('quiz-category');
    if(catLabel) {
        catLabel.innerText = q.cat;
        catLabel.className = q.cat === 'Português' 
            ? "px-4 py-1 bg-green-100 text-green-800 text-[10px] font-black rounded-full uppercase border border-green-200 tracking-widest"
            : "px-4 py-1 bg-blue-100 text-blue-800 text-[10px] font-black rounded-full uppercase border border-blue-200 tracking-widest";
    }

    const modeLabel = document.getElementById('quiz-mode-label');
    if(modeLabel) {
        modeLabel.innerText = isReviewMode ? "Modo Recuperação" : "Operação Normal";
        modeLabel.className = isReviewMode 
            ? "text-[10px] font-black px-3 py-1 bg-red-600 text-white rounded-full uppercase italic tracking-widest" 
            : "text-[10px] font-black px-3 py-1 bg-slate-950 text-white rounded-full uppercase italic tracking-widest";
    }
    
    const counter = document.getElementById('quiz-counter');
    if(counter) counter.innerText = `Questão ${currentCycleIndex + 1}`;

    const progress = ((currentCycleIndex + 1) / questionBank.length) * 100;
    const bar = document.getElementById('progress-bar-fill');
    if(bar) bar.style.width = `${progress}%`;

    const qText = document.getElementById('quiz-question');
    if(qText) qText.innerHTML = escapeHtml(q.q);

    const optionsHtml = q.options.map((opt, i) => `
        <button onclick="checkAnswer(${i})" class="quiz-opt w-full text-left p-4 md:p-6 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition flex items-center group">
            <span class="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-slate-100 rounded-lg mr-4 text-slate-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">${String.fromCharCode(65+i)}</span>
            <span class="text-sm font-medium text-slate-700">${escapeHtml(opt)}</span>
        </button>
    `).join('');
    
    const optContainer = document.getElementById('quiz-options');
    if(optContainer) optContainer.innerHTML = optionsHtml;

    document.getElementById('explanation-box').classList.add('hidden');
    document.getElementById('btn-next').classList.add('hidden');
}

function checkAnswer(idx) {
    const q = activePool[currentPoolIndex];
    const opts = document.querySelectorAll('.quiz-opt');
    const expBox = document.getElementById('explanation-box');
    const expText = document.getElementById('explanation-text');
    
    opts.forEach(b => b.disabled = true);
    const isCorrect = idx === parseInt(q.correct);

    if (isCorrect) {
        opts[idx].classList.replace('border-slate-100', 'border-green-500');
        opts[idx].classList.add('bg-green-50');
        opts[idx].querySelector('span').classList.add('bg-green-600', 'text-white');
        
        if (!isReviewMode) {
            if(q.cat === "Português") stats.port++; else stats.sin++;
        }
        if(expBox) expBox.className = "p-6 rounded-2xl border-l-4 border-green-500 bg-green-50 mb-6 block animate-fade";
    } else {
        opts[idx].classList.replace('border-slate-100', 'border-red-500');
        opts[idx].classList.add('bg-red-50');
        opts[idx].querySelector('span').classList.add('bg-red-600', 'text-white');
        
        opts[q.correct].classList.replace('border-slate-100', 'border-green-500');
        opts[q.correct].querySelector('span').classList.add('bg-green-600', 'text-white');
        
        if (!isReviewMode) {
            if(!missedQuestions.some(mq => mq.q === q.q)) {
                missedQuestions.push(q);
                stats.errors++;
            }
        }
        if(expBox) expBox.className = "p-6 rounded-2xl border-l-4 border-red-500 bg-red-50 mb-6 block animate-fade";
    }

    if(expText) {
        let extraMsg = "<br><br><span class='text-indigo-600 font-bold'>Dica:</span> Se não entendeu, vá até a aba Mentor IA!";
        expText.innerHTML = escapeHtml(q.explanation || "Sem explicação cadastrada.") + extraMsg;
        expBox.classList.remove('hidden');
    }
    
    document.getElementById('btn-next').classList.remove('hidden');
    updateStatsDisplay();
}

function nextQuestion() {
    currentCycleIndex++;
    currentPoolIndex++;
    renderQuestion();
}

function showResults() {
    document.getElementById('quiz-main').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    
    document.getElementById('final-hits').innerText = stats.port + stats.sin;
    document.getElementById('final-misses').innerText = stats.errors;
    
    const total = questionBank.length;
    const perc = total > 0 ? Math.round(((stats.port + stats.sin) / total) * 100) : 0;
    document.getElementById('final-perc').innerText = perc + "%";

    const btnReview = document.getElementById('btn-review');
    if(btnReview) {
        if(missedQuestions.length === 0) {
            btnReview.disabled = true;
            btnReview.innerText = "NADA A REVISAR (100%)";
            btnReview.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            btnReview.disabled = false;
            btnReview.innerText = `REVISAR ${missedQuestions.length} ERROS`;
            btnReview.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

function startReviewMode() {
    isReviewMode = true;
    activePool = [...missedQuestions];
    currentPoolIndex = 0;
    currentCycleIndex = 0;
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-main').classList.remove('hidden');
    renderQuestion();
}

function resetCycle() {
    location.reload();
}

// =========================================================================
// UTILITÁRIOS E ADD QUESTÕES
// =========================================================================
function saveUserQuestion(e) {
    e.preventDefault();
    const newQ = {
        cat: document.getElementById('new-cat').value,
        q: document.getElementById('new-q').value,
        options: [
            document.getElementById('new-opt0').value,
            document.getElementById('new-opt1').value,
            document.getElementById('new-opt2').value,
            document.getElementById('new-opt3').value
        ],
        correct: parseInt(document.getElementById('new-correct').value),
        explanation: document.getElementById('new-exp').value
    };
    const userQuestions = JSON.parse(localStorage.getItem('userQuestions_EAGS')) || [];
    userQuestions.push(newQ);
    localStorage.setItem('userQuestions_EAGS', JSON.stringify(userQuestions));
    document.getElementById('save-msg').classList.remove('hidden');
    setTimeout(() => document.getElementById('save-msg').classList.add('hidden'), 2000);
    document.getElementById('form-create').reset();
    loadQuestions();
    updateTotalCounter();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateStatsDisplay() {
    const elP = document.getElementById('stats-port');
    if(elP) elP.innerText = stats.port;
    const elS = document.getElementById('stats-sin');
    if(elS) elS.innerText = stats.sin;
    const elE = document.getElementById('stats-errors');
    if(elE) elE.innerText = stats.errors;
    const elT = document.getElementById('stats-total-hits');
    if(elT) elT.innerText = stats.port + stats.sin;
}

function updateTotalCounter() {
    const el = document.getElementById('total-questions-display');
    if(el && questionBank) el.innerText = questionBank.length;
}

function updateCountdown() {
    const el = document.getElementById('countdown');
    if(!el) return;
    const targetDate = new Date('2026-04-12');
    const today = new Date();
    const diff = targetDate - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    el.innerText = days > 0 ? days : "HOJE!";
}

// Pomodoro
let timeLeftPomodoro = 25 * 60;
let timerRunningPomodoro = false;
let timerIntervalPomodoro;
const toggleBtnP = document.getElementById('timer-toggle');
if(toggleBtnP) {
    toggleBtnP.onclick = function() {
        if(timerRunningPomodoro) {
            clearInterval(timerIntervalPomodoro);
            this.innerText = "INICIAR";
        } else {
            this.innerText = "PAUSAR";
            timerIntervalPomodoro = setInterval(() => {
                timeLeftPomodoro--;
                const m = Math.floor(timeLeftPomodoro / 60).toString().padStart(2, '0');
                const s = (timeLeftPomodoro % 60).toString().padStart(2, '0');
                document.getElementById('timer-display').innerText = `${m}:${s}`;
                if(timeLeftPomodoro <= 0) { clearInterval(timerIntervalPomodoro); alert("Ciclo Finalizado!"); }
            }, 1000);
        }
        timerRunningPomodoro = !timerRunningPomodoro;
    };
}
const resetBtnP = document.getElementById('timer-reset');
if(resetBtnP) {
    resetBtnP.onclick = function() {
        clearInterval(timerIntervalPomodoro);
        timerRunningPomodoro = false;
        timeLeftPomodoro = 25 * 60;
        document.getElementById('timer-display').innerText = "25:00";
        if(toggleBtnP) toggleBtnP.innerText = "INICIAR";
    };
}