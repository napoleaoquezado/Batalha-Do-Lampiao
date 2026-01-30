// Funções administrativas

// Funções para MCs
function editMC(id) {
    const mc = mcData.find(mc => mc.id === id);
    if (!mc) return;
    
    // Preencher formulário com dados do MC
    document.getElementById('mcName').value = mc.name;
    document.getElementById('mcImage').value = mc.image;
    document.getElementById('mcVitorias').value = mc.vitorias;
    document.getElementById('mcDerrotas').value = mc.derrotas;
    document.getElementById('mcTwolalas').value = mc.twolalas;
    document.getElementById('mcParticipacoes').value = mc.participacoes;
    
    // Mostrar modal
    document.getElementById('mcModal').classList.remove('hidden');
    document.getElementById('modalTitle').textContent = 'Editar MC';
    
    // Alterar comportamento do formulário para edição
    const form = document.getElementById('mcForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        // Atualizar dados do MC
        mc.name = document.getElementById('mcName').value;
        mc.image = document.getElementById('mcImage').value;
        mc.vitorias = parseInt(document.getElementById('mcVitorias').value);
        mc.derrotas = parseInt(document.getElementById('mcDerrotas').value);
        mc.twolalas = parseInt(document.getElementById('mcTwolalas').value);
        mc.participacoes = parseInt(document.getElementById('mcParticipacoes').value);
        mc.winrate = mc.participacoes > 0 ? parseFloat(((mc.vitorias / mc.participacoes) * 100).toFixed(1)) : 0;
        
        showNotification('MC atualizado com sucesso!', 'success');
        document.getElementById('mcModal').classList.add('hidden');
        
        // Recarregar páginas relevantes
        if (currentPage === 'stats') loadStatsPage();
        if (currentPage === 'ranking') loadRankingPage();
        if (currentPage === 'home' && mc.isWeeklyChampion) loadHomePage();
    };
}

function deleteMC(id) {
    if (confirm('Tem certeza que deseja excluir este MC?')) {
        const index = mcData.findIndex(mc => mc.id === id);
        if (index !== -1) {
            mcData.splice(index, 1);
            showNotification('MC excluído com sucesso!', 'success');
            
            // Recarregar páginas relevantes
            if (currentPage === 'stats') loadStatsPage();
            if (currentPage === 'ranking') loadRankingPage();
        }
    }
}

function setWeeklyChampion(id) {
    const mc = mcData.find(mc => mc.id === id);
    if (!mc) return;
    
    // Remover campeão semanal anterior
    mcData.forEach(mc => mc.isWeeklyChampion = false);
    
    // Definir novo campeão semanal
    mc.isWeeklyChampion = true;
    
    showNotification(`${mc.name} agora é o campeão semanal!`, 'success');
    
    // Recarregar home page
    if (currentPage === 'stats') loadStatsPage();
    if (currentPage === 'home') loadHomePage();
}

// Funções para Beats
function editBeat(id) {
    const beat = beatsData.find(beat => beat.id === id);
    if (!beat) return;
    
    // Preencher formulário com dados do beat
    document.getElementById('beatName').value = beat.name;
    document.getElementById('beatProducer').value = beat.producer;
    document.getElementById('beatStyle').value = beat.style;
    document.getElementById('beatURL').value = beat.url;
    document.getElementById('beatEdicao').value = beat.edicao;
    document.getElementById('beatRound').value = beat.round;
    
    // Mostrar modal
    document.getElementById('beatModal').classList.remove('hidden');
    
    // Alterar comportamento do formulário para edição
    const form = document.getElementById('beatForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        // Atualizar dados do beat
        beat.name = document.getElementById('beatName').value;
        beat.producer = document.getElementById('beatProducer').value;
        beat.style = document.getElementById('beatStyle').value;
        beat.url = document.getElementById('beatURL').value;
        beat.edicao = document.getElementById('beatEdicao').value;
        beat.round = document.getElementById('beatRound').value;
        
        showNotification('Beat atualizado com sucesso!', 'success');
        document.getElementById('beatModal').classList.add('hidden');
        
        // Recarregar página de beats
        if (currentPage === 'beats') loadBeatsPage();
    };
}

function deleteBeat(id) {
    if (confirm('Tem certeza que deseja excluir este beat?')) {
        const index = beatsData.findIndex(beat => beat.id === id);
        if (index !== -1) {
            beatsData.splice(index, 1);
            showNotification('Beat excluído com sucesso!', 'success');
            
            // Recarregar página de beats
            if (currentPage === 'beats') loadBeatsPage();
        }
    }
}

// Funções para Vídeos
function editVideo(id) {
    const video = videosData.find(video => video.id === id);
    if (!video) return;
    
    // Preencher formulário com dados do vídeo
    document.getElementById('videoTitle').value = video.title;
    document.getElementById('videoURL').value = video.url;
    document.getElementById('videoDescription').value = video.description || '';
    document.getElementById('videoFeatured').checked = video.featured || false;
    
    // Mostrar modal
    document.getElementById('videoModal').classList.remove('hidden');
    
    // Alterar comportamento do formulário para edição
    const form = document.getElementById('videoForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        // Atualizar dados do vídeo
        video.title = document.getElementById('videoTitle').value;
        video.url = document.getElementById('videoURL').value;
        video.description = document.getElementById('videoDescription').value;
        video.featured = document.getElementById('videoFeatured').checked;
        
        // Se este vídeo for marcado como destacado, remover destaque dos outros
        if (video.featured) {
            videosData.forEach(v => {
                if (v.id !== id) v.featured = false;
            });
        }
        
        showNotification('Vídeo atualizado com sucesso!', 'success');
        document.getElementById('videoModal').classList.add('hidden');
        
        // Recarregar páginas relevantes
        if (currentPage === 'midia') loadMidiaPage();
        if (currentPage === 'home') loadHomePage();
    };
}

function deleteVideo(id) {
    if (confirm('Tem certeza que deseja excluir este vídeo?')) {
        const index = videosData.findIndex(video => video.id === id);
        if (index !== -1) {
            videosData.splice(index, 1);
            showNotification('Vídeo excluído com sucesso!', 'success');
            
            // Recarregar página de mídia
            if (currentPage === 'midia') loadMidiaPage();
        }
    }
}

function setFeaturedVideo(id) {
    const video = videosData.find(video => video.id === id);
    if (!video) return;
    
    // Remover destaque de todos os vídeos
    videosData.forEach(v => v.featured = false);
    
    // Definir novo vídeo destacado
    video.featured = true;
    
    showNotification(`${video.title} agora está na tela inicial!`, 'success');
    
    // Recarregar páginas relevantes
    if (currentPage === 'midia') loadMidiaPage();
    if (currentPage === 'home') loadHomePage();
}