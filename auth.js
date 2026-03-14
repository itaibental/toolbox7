function initDashboard() {
    const categoryMap = {
        'הבחירות שלי': 0, 'שיתופיות': 1, 'אינטראקטיביות': 2, 'עיצוב ויצירה': 3, 'משחקים': 4,
        'כלים שעושים חיים קלים': 5, 'מאגרי מדיה': 6, 'כלי גוגל': 7, 'סימולציות': 8
    };

    const presentations = [
        { id: 1, title: "Padlet", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1EJkXEIy4E1De2FD1pdPY8Ux9jPEQIHe5/view?usp=sharing", siteUrl: "https://padlet.com", description: "לוח קיר דיגיטלי לריכוז רעיונות ותוצרים ויזואליים בזמן אמת.", info: "• ניהול סיעור מוחות כיתתי.\n• איסוף תוצרי למידה." },
        { id: 2, title: "ThingLink", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/1_TS0ZEg3vJW2uPbbnO12vneIdTavgLz6/view?usp=sharing", siteUrl: "https://www.thinglink.com", description: "הפוך כל תמונה למפת למידה אינטראקטיבית עם נקודות מידע.", info: "• העשרת תמונות.\n• סיורים וירטואליים." },
        { id: 34, title: "Google Keep", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1gZaplTezjXfM3xSXFPeqb2HUfgWT8ery/view?usp=drive_link", siteUrl: "https://keep.google.com", description: "פנקס רשימות דיגיטלי לניהול רעיונות ותזכורות.", info: "• ארגון אישי.\n• סנכרון מלא." },
        { id: 35, title: "Google Tasks", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1U-2v9ww4vafP6P4cDyUZ4Y2Jwdpk-GlM/view?usp=drive_link", siteUrl: "https://tasks.google.com", description: "ניהול משימות פשוט וממוקד בתוך Gmail והיומן.", info: "• ניהול זמן.\n• שילוב עם Calendar." },
        { id: 43, title: "Cymath", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1Cs8lKyCbSii0ZcE6OV3In1F-IgAX1Y_0/view?usp=sharing", siteUrl: "https://www.cymath.com", description: "פתרון בעיות מתמטיות צעד אחר צעד במגוון נושאי לימוד.", info: "• פתרון משוואות.\n• הסברים שלב אחר שלב." },
        { id: 44, title: "סימולטור Chemistry", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1XVcVQFyhKXxyqOcNtP-0WuhSEvQpT8km/view?usp=sharing", siteUrl: "https://interactives.ck12.org/simulations/chemistry.html", description: "סימולציות אינטראקטיביות בכימיה לחקר משתנים.", info: "• חקר תופעות.\n• המחשה ויזואלית." },
        { id: 45, title: "סימולטור Physics", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1JdUbGhrJBrRMtjgsJAvmnFM7eIGppJXs/view?usp=sharing", siteUrl: "https://interactives.ck12.org/simulations/physics.html", description: "סימולציות פיזיקליות הממחישות חוקים מהעולם האמיתי.", info: "• ניסוי וטעייה.\n• עולם אמיתי." }
        // ניתן להמשיך להוסיף את שאר הכלים כאן באותו מבנה
    ];

    const grid = document.getElementById('presentationsGrid');
    const desktopFilterBar = document.getElementById('desktopFilterBar');
    const mobileModalList = document.getElementById('mobileModalList');
    const themeToggleBtn = document.getElementById('theme-toggle');

    let activeCategory = null; 
    let searchQuery = '';

    const categoryStyles = {
        'הבחירות שלי': { color: '#10b981' },
        'שיתופיות': { color: '#22d3ee' }, 'אינטראקטיביות': { color: '#10b981' },
        'עיצוב ויצירה': { color: '#f43f5e' }, 'משחקים': { color: '#6366f1' },
        'כלים שעושים חיים קלים': { color: '#f59e0b' }, 'מאגרי מדיה': { color: '#d946ef' },
        'כלי גוגל': { color: '#8b5cf6' }, 'סימולציות': { color: '#BED4CB' }, 'default': { color: '#3b82f6' }
    };
    
    if (!window.userChoices) window.userChoices = [];

    // פונקציית בחירת כלי
    window.toggleChoice = async function(id) {
        const index = window.userChoices.indexOf(id);
        if (index > -1) window.userChoices.splice(index, 1);
        else window.userChoices.push(id);
        
        if (window.saveUserPreferences) await window.saveUserPreferences(window.userChoices);
        if (activeCategory === 'הבחירות שלי') renderPresentations();
    };

    function hexToRgba(hex, opacity) { 
        let r = "0x" + hex[1] + hex[2], g = "0x" + hex[3] + hex[4], b = "0x" + hex[5] + hex[6];
        return `rgba(${+r}, ${+g}, ${+b}, ${opacity})`; 
    }

    function renderFilters() {
        const categories = Object.keys(categoryMap);
        const buttonsHtml = categories.map(cat => {
            const isActive = activeCategory === cat;
            const style = categoryStyles[cat] || categoryStyles['default'];
            return `<button onclick="setFilter('${cat}')" class="filter-btn ${isActive ? 'active-filter' : ''}">
                <span class="category-num-badge" style="background: ${style.color}">${categoryMap[cat]}</span>
                ${cat}
            </button>`;
        }).join('');
        if (desktopFilterBar) desktopFilterBar.innerHTML = buttonsHtml;
    }

    window.setFilter = function(category) { activeCategory = category; renderFilters(); renderPresentations(); }
    window.handleSearch = function() { searchQuery = document.getElementById('searchInput').value.toLowerCase(); renderPresentations(); }

    function renderPresentations() {
        if (!grid) return;
        
        let filtered;
        if (activeCategory === 'הבחירות שלי') {
            filtered = presentations.filter(p => window.userChoices.includes(p.id));
        } else {
            filtered = activeCategory ? presentations.filter(p => p.category === activeCategory) : presentations;
        }

        if (searchQuery) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));
        
        if (filtered.length === 0) { 
            grid.innerHTML = `<div class="col-span-full text-center py-20 text-slate-500 font-bold">לא נמצאו כלים...</div>`; 
            return; 
        }

        grid.innerHTML = filtered.map(p => {
            const isChecked = window.userChoices.includes(p.id) ? 'checked' : '';
            const style = categoryStyles[p.category] || categoryStyles['default'];
            const finalCenter = hexToRgba(style.color, 0.9);
            const finalEdge = hexToRgba(style.color, 0.45);
            return `
            <div class="card-3d p-8 flex flex-col justify-between" style="--category-color: ${style.color}; --card-gradient-center: ${finalCenter}; --card-gradient-edge: ${finalEdge};">
                <div class="choice-checkbox-container" title="שמור בבחירות שלי">
                    <input type="checkbox" class="choice-checkbox" onchange="toggleChoice(${p.id})" ${isChecked}>
                    <span class="selected-check">✔️</span>
                </div>
                <div>
                    <div class="category-chip" style="border-right-color: ${style.color}">
                        <span class="category-num-badge" style="background: ${style.color}">${categoryMap[p.category] || 0}</span>
                        ${p.category}
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-white">${p.title}</h3>
                    <p class="text-white/90 mb-10 leading-relaxed">${p.description}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="openModal(${p.id})" class="yellow-action-btn py-3 px-2 text-xs font-bold">מידע</button>
                        <a href="${p.siteUrl}" target="_blank" class="yellow-action-btn py-3 px-2 text-xs font-bold text-center flex items-center justify-center">כניסה</a>
                    </div>
                    ${p.driveUrl ? `<a href="${p.driveUrl}" target="_blank" class="bg-orange-600 hover:bg-orange-500 text-white py-3 px-4 text-center text-xs font-bold rounded">מצגת הדרכה</a>` : ''}
                </div>
            </div>`;
        }).join('');
    }

    window.openModal = function(id) { 
        const p = presentations.find(item => item.id === id); 
        document.getElementById('modalTitle').innerText = p.title;
        document.getElementById('modalBody').innerText = p.info; 
        document.getElementById('infoModal').style.display = 'flex'; 
    }
    window.closeModal = function() { document.getElementById('infoModal').style.display = 'none'; }
    
    renderFilters();
    renderPresentations();
}
window.initDashboard = initDashboard;
