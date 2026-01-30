// Dados iniciais
let isAdmin = false; // Começa como false (modo usuário)
let currentPage = 'home';
let mcData = [];
let beatsData = [];
let videosData = [];
let photosData = [];
let eventsData = [];
let currentAudio = null;
let currentAudioElement = null;
let isPlaying = false;

// Inicialização quando o DOM carrega
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    loadInitialData();
    
    // Configurar navegação
    setupNavigation();
    
    // Configurar eventos dos filtros
    setupFilters();
    
    // Configurar eventos dos modais
    setupModals();
    
    // Configurar eventos do modo admin
    setupAdminMode();
    
    // Inicializar a página home
    loadHomePage();
    
    // Iniciar sempre como usuário
    updateUIForUserType();
});

// Configurar modo admin
function setupAdminMode() {
    // Link de Admin Page no footer
    const adminPageLink = document.getElementById('adminPageLink');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const cancelAdminLogin = document.getElementById('cancelAdminLogin');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const backToUserMode = document.getElementById('backToUserMode');
    
    // Clicar no link "Admin Page" no footer
    if (adminPageLink) {
        adminPageLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isAdmin) {
                adminLoginModal.classList.remove('hidden');
            } else {
                // Se já for admin, apenas mostrar notificação
                showNotification('Você já está no modo administrador!', 'info');
            }
        });
    }
    
    // Cancelar login admin
    if (cancelAdminLogin) {
        cancelAdminLogin.addEventListener('click', function() {
            adminLoginModal.classList.add('hidden');
        });
    }
    
    // Formulário de login admin
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            
            // Senha padrão
            if (password === '1') {
                isAdmin = true;
                adminLoginModal.classList.add('hidden');
                updateUIForUserType();
                showNotification('Modo administrador ativado!', 'success');
                
                // Ir para a página home no modo admin
                document.querySelector('[data-page="home"]').click();
            } else {
                showNotification('Senha incorreta! Tente novamente.', 'error');
            }
        });
    }
    
    // Clicar na logo para voltar ao modo usuário (quando em modo admin)
    if (backToUserMode) {
        backToUserMode.addEventListener('click', function(e) {
            // Se estiver no modo admin, voltar ao modo usuário
            if (isAdmin) {
                isAdmin = false;
                updateUIForUserType();
                showNotification('Modo usuário ativado!', 'info');
                
                // Ir para a página home
                document.querySelector('[data-page="home"]').click();
            }
        });
    }
}

// Atualizar UI baseado no tipo de usuário
function updateUIForUserType() {
    const adminElements = document.querySelectorAll('.admin-controls, #rankingAdminHeader');
    const body = document.body;
    const adminLoginModal = document.getElementById('adminLoginModal');
    
    if (isAdmin) {
        // Modo administrador
        adminElements.forEach(el => el.classList.remove('hidden'));
        body.classList.add('modo-admin');
        
        // Esconder link de admin page no footer
        const adminPageLink = document.getElementById('adminPageLink');
        if (adminPageLink) {
            adminPageLink.style.display = 'none';
        }
        
        // Fechar modal de login se estiver aberto
        if (adminLoginModal) {
            adminLoginModal.classList.add('hidden');
        }
    } else {
        // Modo usuário
        adminElements.forEach(el => el.classList.add('hidden'));
        body.classList.remove('modo-admin');
        
        // Mostrar link de admin page no footer
        const adminPageLink = document.getElementById('adminPageLink');
        if (adminPageLink) {
            adminPageLink.style.display = 'block';
        }
    }
    
    // Recarregar página atual
    loadPageContent(currentPage);
}

// Carregar dados iniciais
function loadInitialData() {
    // Dados de exemplo para MCs
    mcData = [
        {
            id: 1,
            name: "Guri Mc",
            image: "../assets/images/Guri.png",
            vitorias: 15,
            derrotas: 3,
            twolalas: 8,
            participacoes: 18,
            winrate: 83.3,
            isWeeklyChampion: true,
            banner: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 2,
            name: "Solo Mc",
            image: "../assets/images/SoloMc.png",
            vitorias: 12,
            derrotas: 6,
            twolalas: 5,
            participacoes: 18,
            winrate: 66.7
        },
        {
            id: 3,
            name: "MCharles",
            image: "../assets/images/Mcharles.png",
            vitorias: 10,
            derrotas: 8,
            twolalas: 4,
            participacoes: 18,
            winrate: 55.6
        },
        {
            id: 4,
            name: "Snart",
            image: "../assets/images/Snart.png",
            vitorias: 8,
            derrotas: 10,
            twolalas: 3,
            participacoes: 18,
            winrate: 44.4
        },
        {
            id: 5,
            name: "Tonhão",
            image: "../assets/images/Tonhao.png",
            vitorias: 6,
            derrotas: 12,
            twolalas: 2,
            participacoes: 18,
            winrate: 33.3
        },
        {
            id: 6,
            name: "Mandacaru",
            image: "../assets/images/Mandacaru.png",
            vitorias: 5,
            derrotas: 13,
            twolalas: 1,
            participacoes: 18,
            winrate: 27.8
        }
    ];

    // Dados de exemplo para beats
    beatsData = [
        {
            id: 1,
            name: "Sertão Trap",
            producer: "DJ Cangaço",
            style: "trap",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            edicao: "Edição 15",
            round: "1",
            mca: "MC Lampião",
            mcb: "MC Cangaço",
            bpm: 140,
            downloads: 42
        },
        {
            id: 2,
            name: "Nordeste Drill",
            producer: "Beatmaker Sertão",
            style: "drill",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            edicao: "Edição 14",
            round: "2",
            mca: "MC Nordeste",
            mcb: "MC Sertão",
            bpm: 150,
            downloads: 35
        },
        {
            id: 3,
            name: "Boom Bap Raiz",
            producer: "Produtor Nordestino",
            style: "boombap",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            edicao: "Edição 13",
            round: "3",
            mca: "MC Raiz",
            mcb: "MC Cordel",
            bpm: 90,
            downloads: 28
        },
        {
            id: 4,
            name: "Forró Trap",
            producer: "DJ Xaxado",
            style: "trap",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            edicao: "Edição 12",
            round: "1",
            mca: "MC Lampião",
            mcb: "MC Nordeste",
            bpm: 130,
            downloads: 31
        }
    ];

    // Dados de exemplo para vídeos
    videosData = [
        {
            id: 1,
            title: "BDL 03",
            url: "https://www.youtube.com/embed/IRpRJSMTywg?start=4&modestbranding=1&rel=0",
            description: "Terceira Edição da Batalha do Lampião<br>📌 Serrinha, Fortaleza(CE)",
            featured: true
        },
        {
            id: 2,
            title: "BDL 02",
            url: "https://www.youtube.com/embed/IRpRJSMTywg?start=4&modestbranding=1&rel=0",
            description: "Segunda Edição da Batalha do Lampião<br>📌 Serrinha, Fortaleza(CE)"
        },
        {
            id: 3,
            title: "BDL 01",
            url: "https://www.youtube.com/embed/IRpRJSMTywg?start=4&modestbranding=1&rel=0",
            description: "Primeira Edição da Batalha do Lampião<br>📌 Serrinha, Fortaleza(CE)"
        }
    ];

    // Dados de exemplo para fotos
    photosData = [
        "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3150822:1634859348/MCharles_Créditos_%20Rui%20Mendes%20(1).jpg?f=16x9&h=698&w=1280&$p$f$h$w=c61aec9",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_NyATV_vlDq-pEzIAwOcBIwIpCNTYLFbbmQ&s",
        "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3708801:1762893099/snart.jpeg?f=default&$p$f=836dbc8",
        "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3707058:1762446492/cururu-skate-e-rap%20(23).jpeg?f=1x1&h=1280&w=1280&$p$f$h$w=ede9f86"
    ];

    // Dados de exemplo para eventos
    eventsData = [
        {
            date: "15/10/2026",
            location: "Centro Cultural do Nordeste - Fortaleza/CE",
            description: "4ª Edição Batalha do Lampião"
        }
    ];
}

// Configurar navegação
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    
    // Navegação por clique nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            
            // Atualizar links ativos
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar página correspondente
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                    currentPage = pageId;
                    
                    // Carregar conteúdo específico da página
                    loadPageContent(pageId);
                }
            });
            
            // Fechar menu móvel se estiver aberto
            if (window.innerWidth <= 768) {
                navLeft.classList.remove('active');
                navRight.classList.remove('active');
            }
        });
    });
    
    // Menu móvel
    mobileMenuBtn.addEventListener('click', function() {
        navLeft.classList.toggle('active');
        navRight.classList.toggle('active');
    });
    
    // Logo também leva para home
    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('[data-page="home"]').click();
    });
}

// Configurar filtros
function setupFilters() {
    // Filtros de stats
    const sortBy = document.getElementById('sortBy');
    const orderBy = document.getElementById('orderBy');
    const searchMC = document.getElementById('searchMC');
    
    const updateMCGrid = debounce(function() {
        loadStatsPage();
    }, 300);
    
    sortBy.addEventListener('change', updateMCGrid);
    orderBy.addEventListener('change', updateMCGrid);
    searchMC.addEventListener('input', updateMCGrid);
    
    // Filtros de beats
    const filterBeatStyle = document.getElementById('filterBeatStyle');
    const filterBeatSearch = document.getElementById('filterBeatSearch');
    
    const updateBeatsGrid = debounce(function() {
        loadBeatsPage();
    }, 300);
    
    filterBeatStyle.addEventListener('change', updateBeatsGrid);
    filterBeatSearch.addEventListener('input', updateBeatsGrid);
    
    // Filtros de temporada (ranking)
    const seasonBtns = document.querySelectorAll('.season-btn');
    seasonBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            seasonBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadRankingPage();
        });
    });
}

// Configurar modais
function setupModals() {
    // Modal de MC
    const mcModal = document.getElementById('mcModal');
    const cancelModal = document.getElementById('cancelModal');
    const mcForm = document.getElementById('mcForm');
    
    cancelModal.addEventListener('click', function() {
        mcModal.classList.add('hidden');
    });
    
    mcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Em uma implementação real, isso salvaria no backend
        showNotification('MC salvo com sucesso!', 'success');
        mcModal.classList.add('hidden');
        loadStatsPage();
    });
    
    // Modal de beat
    const beatModal = document.getElementById('beatModal');
    const cancelBeatModal = document.getElementById('cancelBeatModal');
    const beatForm = document.getElementById('beatForm');
    
    cancelBeatModal.addEventListener('click', function() {
        beatModal.classList.add('hidden');
    });
    
    beatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Em uma implementação real, isso salvaria no backend
        showNotification('Beat adicionado com sucesso!', 'success');
        beatModal.classList.add('hidden');
        loadBeatsPage();
    });
    
    // Modal de vídeo
    const videoModal = document.getElementById('videoModal');
    const cancelVideoModal = document.getElementById('cancelVideoModal');
    const videoForm = document.getElementById('videoForm');
    
    cancelVideoModal.addEventListener('click', function() {
        videoModal.classList.add('hidden');
    });
    
    videoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Em uma implementação real, isso salvaria no backend
        showNotification('Vídeo adicionado com sucesso!', 'success');
        videoModal.classList.add('hidden');
        loadMidiaPage();
    });
}

// Carregar conteúdo da página
function loadPageContent(pageId) {
    switch(pageId) {
        case 'home':
            loadHomePage();
            break;
        case 'stats':
            loadStatsPage();
            break;
        case 'ranking':
            loadRankingPage();
            break;
        case 'beats':
            loadBeatsPage();
            break;
        case 'midia':
            loadMidiaPage();
            break;
        case 'sobre':
            // Sobre nós não precisa de carregamento adicional
            break;
    }
}

// Carregar página Home
function loadHomePage() {
    // Carregar campeão semanal
    const champion = mcData.find(mc => mc.isWeeklyChampion);
    const championSection = document.getElementById('weeklyChampion');
    
    if (champion && championSection) {
        championSection.innerHTML = `
            <div class="champion-image">
                <img src="${champion.image}" alt="${champion.name}">
            </div>
            <div class="champion-info">
                <h4>${champion.name}</h4>
                <p>Campeão da Semana</p>
                <div class="champion-stats">
                    <div class="stat-badge win">
                        <i class="fas fa-trophy"></i>
                        <span>${champion.vitorias} Vitórias</span>
                    </div>
                    <div class="stat-badge lose">
                        <i class="fas fa-times"></i>
                        <span>${champion.derrotas} Derrotas</span>
                    </div>
                    <div class="stat-badge win">
                        <i class="fas fa-star"></i>
                        <span>${champion.twolalas} Twolalas</span>
                    </div>
                </div>
                <p class="winrate">Winrate: <strong>${champion.winrate}%</strong></p>
            </div>
        `;
    }
    
    // Carregar vídeo em destaque
    const featuredVideo = videosData.find(video => video.featured);
    const videoSection = document.getElementById('featuredVideo');
    
    if (featuredVideo && videoSection) {
        videoSection.innerHTML = `
            <div class="video-container">
                <iframe src="${featuredVideo.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="video-info">
                <h4>${featuredVideo.title}</h4>
                <p>${featuredVideo.description}</p>
            </div>
        `;
    }
    
    // Carregar galeria de fotos
    const gallerySection = document.getElementById('battleGallery');
    
    if (gallerySection) {
        gallerySection.innerHTML = photosData.map(photo => `
            <div class="gallery-item">
                <img src="${photo}" alt="Batalha do Lampião">
            </div>
        `).join('');
    }
    
    // Carregar próximas batalhas
    const eventsSection = document.getElementById('upcomingBattles');
    
    if (eventsSection) {
        eventsSection.innerHTML = eventsData.map(event => `
            <div class="event-card">
                <div class="event-date">${event.date}</div>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="event-description">${event.description}</div>
            </div>
        `).join('');
    }
}

// Carregar página Stats
function loadStatsPage() {
    const mcGrid = document.getElementById('mcGrid');
    const sortBy = document.getElementById('sortBy').value;
    const orderBy = document.getElementById('orderBy').value;
    const searchMC = document.getElementById('searchMC').value.toLowerCase();
    
    // Filtrar MCs
    let filteredMCs = mcData.filter(mc => 
        mc.name.toLowerCase().includes(searchMC)
    );
    
    // Ordenar MCs
    filteredMCs.sort((a, b) => {
        let aValue, bValue;
        
        switch(sortBy) {
            case 'vitorias': aValue = a.vitorias; bValue = b.vitorias; break;
            case 'derrotas': aValue = a.derrotas; bValue = b.derrotas; break;
            case 'twolalas': aValue = a.twolalas; bValue = b.twolalas; break;
            case 'participacoes': aValue = a.participacoes; bValue = b.participacoes; break;
            case 'winrate': aValue = a.winrate; bValue = b.winrate; break;
            default: aValue = a.vitorias; bValue = b.vitorias;
        }
        
        return orderBy === 'desc' ? bValue - aValue : aValue - bValue;
    });
    
    // Atualizar contadores
    document.getElementById('totalMCs').textContent = filteredMCs.length;
    
    // Encontrar melhor winrate
    if (filteredMCs.length > 0) {
        const bestWinrate = Math.max(...filteredMCs.map(mc => mc.winrate));
        document.getElementById('bestWinrate').textContent = bestWinrate.toFixed(1);
    }
    
    // Renderizar MCs
    if (mcGrid) {
        mcGrid.innerHTML = filteredMCs.map(mc => `
            <div class="mc-card" data-id="${mc.id}">
                ${mc.isWeeklyChampion ? '<div class="champion-badge" title="Campeão Semanal"><i class="fas fa-crown"></i></div>' : ''}
                
                <div class="mc-card-header">
                    <div class="mc-image">
                        <img src="${mc.image}" alt="${mc.name}">
                    </div>
                    <div class="mc-name">${mc.name}</div>
                </div>
                
                <div class="mc-card-body">
                    <div class="mc-stats">
                        <div class="mc-stat">
                            <div class="stat-value">${mc.vitorias}</div>
                            <div class="stat-label">Vitórias</div>
                        </div>
                        <div class="mc-stat">
                            <div class="stat-value">${mc.derrotas}</div>
                            <div class="stat-label">Derrotas</div>
                        </div>
                        <div class="mc-stat">
                            <div class="stat-value">${mc.twolalas}</div>
                            <div class="stat-label">Twolalas</div>
                        </div>
                        <div class="mc-stat">
                            <div class="stat-value">${mc.participacoes}</div>
                            <div class="stat-label">Participações</div>
                        </div>
                    </div>
                    
                    <div class="winrate-bar">
                        <div class="winrate-label">
                            <span>Winrate</span>
                            <span class="winrate-value">${mc.winrate}%</span>
                        </div>
                        <div class="winrate-bar-bg">
                            <div class="winrate-bar-fill" style="width: ${Math.min(mc.winrate, 100)}%"></div>
                        </div>
                    </div>
                </div>
                
                ${isAdmin ? `
                <div class="mc-card-footer">
                    <div class="mc-actions">
                        <button class="mc-action-btn edit-btn" onclick="editMC(${mc.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="mc-action-btn delete-btn" onclick="deleteMC(${mc.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    
                    ${!mc.isWeeklyChampion ? `
                    <button class="crown-btn" onclick="setWeeklyChampion(${mc.id})">
                        <i class="fas fa-crown"></i>
                        Tornar Campeão
                    </button>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Configurar botões do admin
    if (isAdmin) {
        document.getElementById('addMC').addEventListener('click', function() {
            document.getElementById('mcModal').classList.remove('hidden');
            document.getElementById('modalTitle').textContent = 'Adicionar Novo MC';
            document.getElementById('mcForm').reset();
        });
        
        document.getElementById('setWeeklyChampion').addEventListener('click', function() {
            showNotification('Selecione um MC clicando no botão "Tornar Campeão"', 'info');
        });
        
        // Configurar eventos do modal de MC
        document.getElementById('cancelModal').addEventListener('click', function() {
            document.getElementById('mcModal').classList.add('hidden');
        });
        
        document.getElementById('cancelModal2').addEventListener('click', function() {
            document.getElementById('mcModal').classList.add('hidden');
        });
    }
}

// Carregar página Ranking
function loadRankingPage() {
    const rankingTableBody = document.getElementById('rankingTableBody');
    const activeSeasonBtn = document.querySelector('.season-btn.active');
    const season = activeSeasonBtn ? activeSeasonBtn.getAttribute('data-season') : 'current';
    
    // Em uma implementação real, os dados seriam filtrados por temporada
    // Aqui usamos os mesmos dados para todas as temporadas
    
    // Ordenar por winrate (para ranking)
    let rankedMCs = [...mcData].sort((a, b) => b.winrate - a.winrate);
    
    // Renderizar tabela de ranking
    if (rankingTableBody) {
        rankingTableBody.innerHTML = rankedMCs.map((mc, index) => `
            <tr>
                <td>
                    <div class="ranking-position ${index === 0 ? 'position-1' : index === 1 ? 'position-2' : index === 2 ? 'position-3' : ''}">
                        #${index + 1}
                    </div>
                </td>
                <td>
                    <div class="ranking-mc">
                        <div class="ranking-mc-image">
                            <img src="${mc.image}" alt="${mc.name}">
                        </div>
                        <div>
                            <div class="mc-name">${mc.name}</div>
                            ${mc.isWeeklyChampion ? '<div class="weekly-badge"><i class="fas fa-crown"></i> Campeão Semanal</div>' : ''}
                        </div>
                    </div>
                </td>
                <td>${mc.vitorias}</td>
                <td>${mc.derrotas}</td>
                <td>${mc.twolalas}</td>
                <td>${mc.participacoes}</td>
                <td><strong>${mc.winrate}%</strong></td>
                ${isAdmin ? `
                <td>
                    <button class="action-btn edit-btn" onclick="editMC(${mc.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteMC(${mc.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                ` : ''}
            </tr>
        `).join('');
    }
}

// Carregar página Beats
function loadBeatsPage() {
    const beatsGrid = document.getElementById('beatsGrid');
    const filterBeatStyle = document.getElementById('filterBeatStyle').value;
    const filterBeatSearch = document.getElementById('filterBeatSearch').value.toLowerCase();
    
    // Filtrar beats
    let filteredBeats = beatsData.filter(beat => {
        const matchesStyle = !filterBeatStyle || beat.style === filterBeatStyle;
        const matchesSearch = !filterBeatSearch || 
            beat.name.toLowerCase().includes(filterBeatSearch) || 
            beat.producer.toLowerCase().includes(filterBeatSearch);
        return matchesStyle && matchesSearch;
    });
    
    // Atualizar contadores
    document.getElementById('totalBeats').textContent = filteredBeats.length;
    document.getElementById('playingNow').textContent = isPlaying ? '1' : '0';
    
    // Renderizar beats com player customizado
    if (beatsGrid) {
        beatsGrid.innerHTML = filteredBeats.map(beat => `
            <div class="beat-card ${currentAudioElement && currentAudioElement.dataset.id == beat.id ? 'beat-playing' : ''}" data-id="${beat.id}">
                ${currentAudioElement && currentAudioElement.dataset.id == beat.id ? '<div class="beat-playing-indicator"></div>' : ''}
                
                <div class="beat-card-header">
                    <div class="beat-style-tag">${getStyleIcon(beat.style)} ${beat.style.toUpperCase()}</div>
                    <div class="beat-name">${beat.name}</div>
                    <div class="beat-producer">
                        <i class="fas fa-user"></i>
                        <span>${beat.producer}</span>
                    </div>
                </div>
                
                <div class="beat-player-custom">
                    <div class="player-container">
                        <div class="player-controls">
                            <button class="play-pause-btn ${currentAudioElement && currentAudioElement.dataset.id == beat.id && isPlaying ? 'playing' : ''}" 
                                    data-id="${beat.id}"
                                    onclick="togglePlay('${beat.id}', '${beat.url}', '${beat.name}', '${beat.producer}')">
                                <i class="fas ${currentAudioElement && currentAudioElement.dataset.id == beat.id && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                            </button>
                            
                            <div class="player-info">
                                <div class="player-time">
                                    <span class="current-time" id="currentTime-${beat.id}">0:00</span>
                                    <span class="duration" id="duration-${beat.id}">0:00</span>
                                </div>
                                <div class="progress-container" onclick="seekAudio(event, '${beat.id}')">
                                    <div class="progress-bar" id="progressBar-${beat.id}" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="volume-control">
                            <i class="fas fa-volume-up volume-icon"></i>
                            <div class="volume-slider" onclick="setVolume(event, '${beat.id}')">
                                <div class="volume-level" id="volumeLevel-${beat.id}"></div>
                            </div>
                        </div>
                            
                    </div>
                    
                    <div class="beat-info-details">
                        <div class="beat-info-row">
                            <span class="beat-info-label"><i class="fas fa-calendar-alt"></i> Edição:</span>
                            <span class="beat-info-value">${beat.edicao || 'N/A'}</span>
                        </div>
                        <div class="beat-info-row">
                            <span class="beat-info-label"><i class="fas fa-layer-group"></i> Round:</span>
                            <span class="beat-info-value">${beat.round ? `Round ${beat.round}` : 'N/A'}</span>
                        </div>
                        <div class="beat-info-row">
                            <span class="beat-info-label"><i class="fas fa-microphone"></i> Batalha:</span>
                            <span class="beat-info-value">${beat.mca || 'MC A'} vs ${beat.mcb || 'MC B'}</span>
                        </div>
                        <div class="beat-info-row">
                            <span class="beat-info-label"><i class="fas fa-tachometer-alt"></i> BPM:</span>
                            <span class="beat-info-value">${beat.bpm || '120'}</span>
                        </div>
                    </div>
                </div>
                
                ${isAdmin ? `
                <div class="beat-card-footer">
                    <div class="beat-downloads">
                        <i class="fas fa-download"></i>
                        <span>${beat.downloads || '0'} downloads</span>
                    </div>
                    <div class="beat-actions">
                        <button class="beat-action-btn" onclick="downloadBeat('${beat.id}')" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="beat-action-btn" onclick="editBeat(${beat.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="beat-action-btn" onclick="deleteBeat(${beat.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ` : `
                <div class="beat-card-footer">
                    <div class="beat-downloads">
                        <i class="fas fa-download"></i>
                        <span>${beat.downloads || '0'} downloads</span>
                    </div>
                    <button class="beat-action-btn" onclick="downloadBeat('${beat.id}')" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
                `}
            </div>
        `).join('');
    }
    
    // Configurar botões do admin
    if (isAdmin) {
        // Preencher selects do filtro especial com nomes de MCs
        const filterMCA = document.getElementById('filterMCA');
        const filterMCB = document.getElementById('filterMCB');
        
        if (filterMCA && filterMCB) {
            filterMCA.innerHTML = '<option value="">Selecione MC A</option>' + 
                mcData.map(mc => `<option value="${mc.name}">${mc.name}</option>`).join('');
            
            filterMCB.innerHTML = '<option value="">Selecione MC B</option>' + 
                mcData.map(mc => `<option value="${mc.name}">${mc.name}</option>`).join('');
        }
        
        // Aplicar filtro especial
        document.getElementById('applySpecialFilter').addEventListener('click', function() {
            const mca = document.getElementById('filterMCA').value;
            const mcb = document.getElementById('filterMCB').value;
            const edicao = document.getElementById('filterEdicao').value;
            const round = document.getElementById('filterRound').value;
            const style = document.getElementById('filterStyle').value;
            
            // Filtrar beats com base nos critérios especiais
            let specialFilteredBeats = beatsData.filter(beat => {
                const matchesMCA = !mca || beat.mca === mca;
                const matchesMCB = !mcb || beat.mcb === mcb;
                const matchesEdicao = !edicao || beat.edicao.includes(edicao);
                const matchesRound = !round || beat.round === round;
                const matchesStyle = !style || beat.style === style;
                
                return matchesMCA && matchesMCB && matchesEdicao && matchesRound && matchesStyle;
            });
            
            // Atualizar grid com beats filtrados
            if (beatsGrid) {
                beatsGrid.innerHTML = specialFilteredBeats.map(beat => `
                    <div class="beat-card" data-id="${beat.id}">
                        <div class="beat-card-header">
                            <div class="beat-style-tag">${getStyleIcon(beat.style)} ${beat.style.toUpperCase()}</div>
                            <div class="beat-name">${beat.name}</div>
                            <div class="beat-producer">
                                <i class="fas fa-user"></i>
                                <span>${beat.producer}</span>
                            </div>
                        </div>
                        
                        <div class="beat-player-custom">
                            <div class="player-container">
                                <div class="player-controls">
                                    <button class="play-pause-btn" 
                                            data-id="${beat.id}"
                                            onclick="togglePlay('${beat.id}', '${beat.url}', '${beat.name}', '${beat.producer}')">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    
                                    <div class="player-info">
                                        <div class="player-time">
                                            <span class="current-time" id="currentTime-${beat.id}">0:00</span>
                                            <span class="duration" id="duration-${beat.id}">0:00</span>
                                        </div>
                                        <div class="progress-container" onclick="seekAudio(event, '${beat.id}')">
                                            <div class="progress-bar" id="progressBar-${beat.id}" style="width: 0%"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="volume-control">
                                    <i class="fas fa-volume-up volume-icon"></i>
                                    <div class="volume-slider" onclick="setVolume(event, '${beat.id}')">
                                        <div class="volume-level" id="volumeLevel-${beat.id}"></div>
                                    </div>
                                </div>
                                
                                <div class="waveform" id="waveform-${beat.id}">
                                    ${generateWaveform()}
                                </div>
                            </div>
                            
                            <div class="beat-info-details">
                                <div class="beat-info-row">
                                    <span class="beat-info-label"><i class="fas fa-calendar-alt"></i> Edição:</span>
                                    <span class="beat-info-value">${beat.edicao || 'N/A'}</span>
                                </div>
                                <div class="beat-info-row">
                                    <span class="beat-info-label"><i class="fas fa-layer-group"></i> Round:</span>
                                    <span class="beat-info-value">${beat.round ? `Round ${beat.round}` : 'N/A'}</span>
                                </div>
                                <div class="beat-info-row">
                                    <span class="beat-info-label"><i class="fas fa-microphone"></i> Batalha:</span>
                                    <span class="beat-info-value">${beat.mca || 'MC A'} vs ${beat.mcb || 'MC B'}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="beat-card-footer">
                            <div class="beat-downloads">
                                <i class="fas fa-download"></i>
                                <span>${beat.downloads || '0'} downloads</span>
                            </div>
                            <div class="beat-actions">
                                <button class="beat-action-btn" onclick="downloadBeat('${beat.id}')" title="Download">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="beat-action-btn" onclick="editBeat(${beat.id})" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="beat-action-btn" onclick="deleteBeat(${beat.id})" title="Excluir">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        });
        
        // Limpar filtro especial
        document.getElementById('clearSpecialFilter').addEventListener('click', function() {
            document.getElementById('filterMCA').value = '';
            document.getElementById('filterMCB').value = '';
            document.getElementById('filterEdicao').value = '';
            document.getElementById('filterRound').value = '';
            document.getElementById('filterStyle').value = '';
            loadBeatsPage();
        });
        
        // Adicionar beat
        document.getElementById('addBeat').addEventListener('click', function() {
            document.getElementById('beatModal').classList.remove('hidden');
        });
        
        // Cancelar modal de beat
        document.getElementById('cancelBeatModal').addEventListener('click', function() {
            document.getElementById('beatModal').classList.add('hidden');
        });
        
        document.getElementById('cancelBeatModal2').addEventListener('click', function() {
            document.getElementById('beatModal').classList.add('hidden');
        });
    }
}

// Funções do Player Customizado
function togglePlay(beatId, audioUrl, beatName, producer) {
    const button = document.querySelector(`.play-pause-btn[data-id="${beatId}"]`);
    const icon = button.querySelector('i');
    
    // Se já está tocando este beat, pausar
    if (currentAudioElement && currentAudioElement.dataset.id === beatId && isPlaying) {
        pauseAudio();
        return;
    }
    
    // Se está tocando outro beat, parar ele
    if (currentAudio && currentAudioElement && currentAudioElement.dataset.id !== beatId) {
        pauseAudio();
    }
    
    // Se não está tocando ou é outro beat, começar a tocar
    if (!currentAudio || currentAudioElement.dataset.id !== beatId) {
        // Remover classe de playing de todos os cards
        document.querySelectorAll('.beat-card').forEach(card => {
            card.classList.remove('beat-playing');
        });
        
        // Adicionar classe de playing ao card atual
        const beatCard = document.querySelector(`.beat-card[data-id="${beatId}"]`);
        beatCard.classList.add('beat-playing');
        
        // Criar ou reusar elemento de áudio
        if (!currentAudio || currentAudioElement.dataset.id !== beatId) {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
            
            currentAudio = new Audio(audioUrl);
            currentAudioElement = document.createElement('div');
            currentAudioElement.dataset.id = beatId;
            
            // Configurar eventos do áudio
            currentAudio.addEventListener('timeupdate', function() {
                updateProgress(beatId);
            });
            
            currentAudio.addEventListener('loadedmetadata', function() {
                updateDuration(beatId);
            });
            
            currentAudio.addEventListener('ended', function() {
                resetPlayer(beatId);
            });
            
            currentAudio.volume = 0.7;
            updateVolumeDisplay(beatId);
        }
        
        // Atualizar botões
        document.querySelectorAll('.play-pause-btn').forEach(btn => {
            btn.classList.remove('playing');
            btn.querySelector('i').className = 'fas fa-play';
        });
        
        // Tocar áudio
        currentAudio.play()
            .then(() => {
                isPlaying = true;
                button.classList.add('playing');
                icon.className = 'fas fa-pause';
                updatePlayingNowCount();
            })
            .catch(error => {
                console.error('Erro ao tocar áudio:', error);
                showNotification('Erro ao reproduzir o beat. Verifique a URL do áudio.', 'error');
            });
    } else {
        // Continuar tocando o mesmo áudio
        currentAudio.play()
            .then(() => {
                isPlaying = true;
                button.classList.add('playing');
                icon.className = 'fas fa-pause';
                updatePlayingNowCount();
            });
    }
}

function pauseAudio() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        
        // Atualizar botões
        document.querySelectorAll('.play-pause-btn').forEach(btn => {
            btn.classList.remove('playing');
            btn.querySelector('i').className = 'fas fa-play';
        });
        
        // Remover classe de playing de todos os cards
        document.querySelectorAll('.beat-card').forEach(card => {
            card.classList.remove('beat-playing');
        });
        
        updatePlayingNowCount();
    }
}

function updateProgress(beatId) {
    if (!currentAudio) return;
    
    const progressBar = document.getElementById(`progressBar-${beatId}`);
    const currentTime = document.getElementById(`currentTime-${beatId}`);
    
    if (progressBar && currentTime) {
        const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        
        // Formatar tempo atual
        const minutes = Math.floor(currentAudio.currentTime / 60);
        const seconds = Math.floor(currentAudio.currentTime % 60);
        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateDuration(beatId) {
    const duration = document.getElementById(`duration-${beatId}`);
    if (duration && currentAudio) {
        const minutes = Math.floor(currentAudio.duration / 60);
        const seconds = Math.floor(currentAudio.duration % 60);
        duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function seekAudio(event, beatId) {
    if (!currentAudio || currentAudioElement.dataset.id !== beatId) return;
    
    const progressContainer = event.currentTarget;
    const rect = progressContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percent = (x / width);
    
    currentAudio.currentTime = percent * currentAudio.duration;
}

function setVolume(event, beatId) {
    if (!currentAudio) return;
    
    const volumeSlider = event.currentTarget;
    const rect = volumeSlider.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    let volume = x / width;
    
    // Limitar volume entre 0 e 1
    volume = Math.max(0, Math.min(1, volume));
    
    currentAudio.volume = volume;
    updateVolumeDisplay(beatId);
}

function updateVolumeDisplay(beatId) {
    if (!currentAudio) return;
    
    const volumeLevel = document.getElementById(`volumeLevel-${beatId}`);
    if (volumeLevel) {
        volumeLevel.style.width = `${currentAudio.volume * 100}%`;
    }
}

function resetPlayer(beatId) {
    isPlaying = false;
    
    const button = document.querySelector(`.play-pause-btn[data-id="${beatId}"]`);
    if (button) {
        button.classList.remove('playing');
        button.querySelector('i').className = 'fas fa-play';
    }
    
    const progressBar = document.getElementById(`progressBar-${beatId}`);
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    const currentTime = document.getElementById(`currentTime-${beatId}`);
    if (currentTime) {
        currentTime.textContent = '0:00';
    }
    
    // Remover classe de playing do card
    const beatCard = document.querySelector(`.beat-card[data-id="${beatId}"]`);
    if (beatCard) {
        beatCard.classList.remove('beat-playing');
    }
    
    updatePlayingNowCount();
}

function updatePlayingNowCount() {
    const playingNow = document.getElementById('playingNow');
    if (playingNow) {
        playingNow.textContent = isPlaying ? '1' : '0';
    }
}

// Carregar página Mídia
function loadMidiaPage() {
    const videosGrid = document.getElementById('videosGrid');
    const photosGrid = document.getElementById('photosGrid');
    
    // Renderizar vídeos
    if (videosGrid) {
        videosGrid.innerHTML = videosData.map(video => `
            <div class="video-card">
                <div class="video-thumbnail">
                    <img src="https://img.youtube.com/vi/${getYouTubeID(video.url)}/hqdefault.jpg" alt="${video.title}">
                    <div class="video-play-btn" onclick="playVideo('${video.url}')">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-card-info">
                    <h4>${video.title}</h4>
                    <p>${video.description}</p>
                </div>
                ${isAdmin ? `
                <div class="video-card-footer">
                    <button class="action-btn edit-btn" onclick="editVideo(${video.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteVideo(${video.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${!video.featured ? `
                    <button class="action-btn featured-btn" onclick="setFeaturedVideo(${video.id})">
                        <i class="fas fa-home"></i> Colocar na Inicial
                    </button>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Renderizar fotos
    if (photosGrid) {
        photosGrid.innerHTML = photosData.map((photo, index) => `
            <div class="photo-card">
                <img src="${photo}" alt="Foto da batalha ${index + 1}">
            </div>
        `).join('');
    }
    
    // Configurar botões do admin
    if (isAdmin) {
        document.getElementById('addVideo').addEventListener('click', function() {
            document.getElementById('videoModal').classList.remove('hidden');
        });
    }
}

// Funções auxiliares
function getStyleIcon(style) {
    const icons = {
        'trap': '🎵',
        'drill': '🔥',
        'boombap': '🎤',
        'rnb': '💎',
        'funk': '✨'
    };
    return icons[style] || '🎶';
}

function generateWaveform() {
    let waveform = '';
    for (let i = 0; i < 20; i++) {
        const height = Math.floor(Math.random() * 60) + 20;
        const delay = Math.random() * 1.5;
        waveform += `<div class="wave-bar" style="height: ${height}%; animation-delay: ${delay}s"></div>`;
    }
    return waveform;
}

function downloadBeat(beatId) {
    const beat = beatsData.find(b => b.id == beatId);
    if (beat) {
        // Incrementar contador de downloads
        if (!beat.downloads) beat.downloads = 0;
        beat.downloads++;
        
        // Simular download
        showNotification(`Download de "${beat.name}" iniciado!`, 'success');
        
        // Atualizar página se estiver na página de beats
        if (currentPage === 'beats') {
            loadBeatsPage();
        }
    }
}

function getYouTubeID(url) {
    // Extrair ID do vídeo do YouTube a partir da URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ';
}

function playVideo(url) {
    // Em uma implementação real, isso abriria um modal com o vídeo
    window.open(url, '_blank');
}

function showNotification(message, type) {
    // Criar notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#00cc66' : type === 'error' ? '#ff3333' : '#3399ff'};
        color: white;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: slideInLeft 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Adicionar estilos CSS para fadeOut
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);