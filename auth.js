function initDashboard() {
    const categoryMap = {
        'הבחירות שלי': 0, 'שיתופיות': 1, 'אינטראקטיביות': 2, 'עיצוב ויצירה': 3, 'משחקים': 4,
        'כלים שעושים חיים קלים': 5, 'מאגרי מדיה': 6, 'כלי גוגל': 7, 'סימולציות': 8
    };

    const categoryStyles = {
        'הבחירות שלי': { color: '#10b981' }, 'שיתופיות': { color: '#22d3ee' }, 
        'אינטראקטיביות': { color: '#10b981' }, 'עיצוב ויצירה': { color: '#f43f5e' }, 
        'משחקים': { color: '#6366f1' }, 'כלים שעושים חיים קלים': { color: '#f59e0b' }, 
        'מאגרי מדיה': { color: '#d946ef' }, 'כלי גוגל': { color: '#8b5cf6' }, 
        'סימולציות': { color: '#BED4CB' }, 'default': { color: '#3b82f6' }
    };

    const presentations = [
        { id: 1, title: "Padlet", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1EJkXEIy4E1De2FD1pdPY8Ux9jPEQIHe5/view", siteUrl: "https://padlet.com", description: "לוח קיר דיגיטלי לריכוז רעיונות ותוצרים.", info: "ניהול סיעור מוחות כיתתי וריכוז תוצרי למידה." },
        { id: 2, title: "ThingLink", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/1_TS0ZEg3vJW2uPbbnO12vneIdTavgLz6/view", siteUrl: "https://www.thinglink.com", description: "תמונות ומפות למידה אינטראקטיביות.", info: "הוספת נקודות מידע על גבי תמונות וסיורים וירטואליים." },
        { id: 43, title: "Cymath", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1Cs8lKyCbSii0ZcE6OV3In1F-IgAX1Y_0/view", siteUrl: "https://www.cymath.com", description: "פתרון בעיות מתמטיות צעד אחר צעד.", info: "תמיכה באלגברה וחדו\"א עם הסברים מפורטים." },
        { id: 44, title: "סימולטור Chemistry", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1XVcVQFyhKXxyqOcNtP-0WuhSEvQpT8km/view", siteUrl: "https://interactives.ck12.org/simulations/chemistry.html", description: "סימולציות אינטראקטיביות בכימיה.", info: "חקר תופעות וביצוע ניסויים וירטואליים." },
        { id: 45, title: "סימולטור Physics", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1JdUbGhrJBrRMtjgsJAvmnFM7eIGppJXs/view", siteUrl: "https://interactives.ck12.org/simulations/physics.html", description: "סימולציות פיזיקליות מהעולם האמיתי.", info: "המחשת חוקי הפיזיקה ושינוי משתנים בזמן אמת." }
    ];

    const grid = document.getElementById('presentationsGrid');
    const desktopFilterBar = document.getElementById('desktopFilterBar');
    let activeCategory = null;
    let searchQuery = '';

    if (!window.userChoices) window.userChoices = [];

    window.toggleChoice = async function(id) {
        const idStr = String(id);
        const index = window.userChoices.indexOf(idStr);
        if (index > -1) window.userChoices.splice(index, 1);
        else window.userChoices.push(idStr);
        
        if (window.saveUserPreferences) await window.saveUserPreferences(window.userChoices);
        if (activeCategory === 'הבחירות שלי') renderPresentations();
    };

    window.setFilter = function(category) { activeCategory = category; renderFilters(); renderPresentations(); };
    window.handleSearch = function() { searchQuery = document.getElementById('searchInput').value.toLowerCase(); renderPresentations(); };

    function renderFilters() {
        if (!desktopFilterBar) return;
        const categories = Object.keys(categoryMap);
        desktopFilterBar.innerHTML = categories.map(cat => {
            const style = categoryStyles[cat] || categoryStyles['default'];
            return `<button onclick="setFilter('${cat}')" class="filter-btn ${activeCategory === cat ? 'active-filter' : ''}">
                <span class="category-num-badge" style="background: ${style.color}">${categoryMap[cat]}</span>
                ${cat}
            </button>`;
        }).join('');
    }

    function renderPresentations() {
        if (!grid) return;
        let filtered = activeCategory === 'הבחירות שלי' ? 
                       presentations.filter(p => window.userChoices.includes(String(p.id))) : 
                       (activeCategory ? presentations.filter(p => p.category === activeCategory) : presentations);
        
        if (searchQuery) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery));
        
        grid.innerHTML = filtered.map(p => {
            const style = categoryStyles[p.category] || categoryStyles['default'];
            const isChecked = window.userChoices.includes(String(p.id)) ? 'checked' : '';
            return `
            <div class="card-3d p-8 flex flex-col justify-between" style="--category-glow: ${style.color}40;">
                <div class="choice-checkbox-container">
                    <input type="checkbox" class="choice-checkbox" onchange="toggleChoice(${p.id})" ${isChecked}>
                    <span class="selected-check">✔️</span>
                </div>
                <div>
                    <div class="category-chip">
                        <span class="category-num-badge" style="background: ${style.color}">${categoryMap[p.category]}</span>
                        ${p.category}
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">${p.title}</h3>
                    <p class="text-white/80 text-sm mb-4">${p.description}</p>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="openModal(${p.id})" class="yellow-action-btn py-2 text-xs">מידע</button>
                    <a href="${p.siteUrl}" target="_blank" class="yellow-action-btn py-2 text-xs text-center">כניסה</a>
                </div>
            </div>`;
        }).join('');
    }

    window.openModal = function(id) {
        const p = presentations.find(i => i.id === id);
        if (!p) return;
        document.getElementById('modalTitle').innerText = p.title;
        document.getElementById('modalBody').innerText = p.info;
        document.getElementById('infoModal').style.display = 'flex';
    };
    
    window.closeModal = () => { document.getElementById('infoModal').style.display = 'none'; };

    renderFilters();
    renderPresentations();
}
window.initDashboard = initDashboard;
