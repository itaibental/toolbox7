function initDashboard() {
    const categoryMap = {
        'הבחירות שלי': 0, 'שיתופיות': 1, 'אינטראקטיביות': 2, 'עיצוב ויצירה': 3, 'משחקים': 4,
        'כלים שעושים חיים קלים': 5, 'מאגרי מדיה': 6, 'כלי גוגל': 7, 'סימולציות': 8
    };
 
    const presentations = [
        { id: 1, title: "Padlet", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1EJkXEIy4E1De2FD1pdPY8Ux9jPEQIHe5/view?usp=sharing", siteUrl: "https://padlet.com", description: "לוח קיר דיגיטלי לריכוז רעיונות ותוצרים ויזואליים בזמן אמת.", info: "• ניהול סיעור מוחות כיתתי: כולם כותבים בו-זמנית על קיר אחד משותף.\n• איסוף תוצרי למידה: ריכוז תמונות, קבצים, קישורים וסרטונים שיצרו התלמידים במקום אחד.\n• הערכת עמיתים (Peer Assessment): התלמידים יכולים להגיב זה לזה, לסמן 'לייק' ולדרג עבודות." },
        { id: 2, title: "ThingLink", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/1_TS0ZEg3vJW2uPbbnO12vneIdTavgLz6/view?usp=sharing", siteUrl: "https://www.thinglink.com", description: "הפוך כל תמונה למפת למידה אינטראקטיבית עם נקודות מידע.", info: "• העשרת תמונות: הוספת נקודות חמות (Hotspots) הכוללות טקסט, אודיו, וידאו וקישורים.\n• סיורים וירטואליים: יצירת חווית למידה סוחפת באמצעות תמונות 360 מעלות." },
        { id: 34, title: "Google Keep", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1gZaplTezjXfM3xSXFPeqb2HUfgWT8ery/view?usp=drive_link", siteUrl: "https://keep.google.com", description: "פנקס רשימות דיגיטלי לניהול רעיונות ותזכורות.", info: "• ארגון אישי: יצירת פתקיות צבעוניות ורשימות תיוג.\n• סנכרון מלא: המידע נגיש מהטלפון ומהמחשב." },
        { id: 35, title: "Google Tasks", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1U-2v9ww4vafP6P4cDyUZ4Y2Jwdpk-GlM/view?usp=drive_link", siteUrl: "https://tasks.google.com", description: "ניהול משימות פשוט וממוקד המוטמע בתוך המייל והיומן.", info: "• ניהול זמן: יצירת רשימות משימות מהירות.\n• שילוב עם Gmail: הפיכת אימיילים למשימות." },
        { id: 36, title: "Google Sites", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1od4KE3XRaA_71InAjECTQnY864o-DZaK/view?usp=drive_link", siteUrl: "https://sites.google.com", description: "בניית אתרים פשוטה ואינטואיטיבית ללא צורך בכתיבת קוד.", info: "• מרכזי למידה: יצירת אתר המרכז את כל חומרי הלימוד.\n• פורטפוליו דיגיטלי: תלמידים בונים אתר אישי." },
        { id: 37, title: "Google Gemini", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1Jkq0NO9GQ2IgdfiWsdDPFv_ctPCoOfeh/view?usp=drive_link", siteUrl: "https://gemini.google.com", description: "עוזר בינה מלאכותית (AI) רב-תחומי ליצירת תוכן ומחקר.", info: "• סיעור מוחות פדגוגי: קבלת רעיונות למערכי שיעור.\n• כתיבת תוכן: ניסוח מיילים להורים ופישוט טקסטים." },
        { id: 40, title: "Nano Banana", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1qaGQFcsYv12G32TNnCrdTmsuQuakLQ1U/view?usp=drive_link", siteUrl: "https://gemini.google.com", description: "המודל המתקדם של גוגל ליצירת תמונות מרהיבות מטקסט.", info: "• המחשה ויזואלית: יצירת תמונות המבוססות על תיאור מילולי.\n• התאמת סגנון: ניתן לבקש תמונות בסגנונות אמנותיים שונים." },
        { id: 41, title: "Google Gems", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1Jkq0NO9GQ2IgdfiWsdDPFv_ctPCoOfeh/view?usp=drive_link", siteUrl: "https://gemini.google.com/gems", description: "בניית מומחי AI מותאמים אישית לצרכים פדגוגיים ספציפיים.", info: "• מומחים נושאיים: יצירת 'ג'ם' המתמחה במקצוע מסוים.\n• עוזר הוראה: בניית בוט שעוזר למורה בבדיקת עבודות." },
        { id: 42, title: "Google Earth", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1eNzEVxvUDarurT1q1Op0zSSZLTmBQ2Fe/view?usp=drive_link", siteUrl: "https://earth.google.com", description: "חקר העולם בתלת-ממד, סיורים וירטואליים ומפות היסטוריות.", info: "• חקר גיאוגרפי: סיור בכל נקודה על פני הגלובוס.\n• Timelapse: צפייה בשינויים שעבר כדור הארץ ב-40 השנים האחרונות." },
        { id: 38, title: "Google Vids", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/18OTH4Y6Q5S59IR2pZciMtWMEEO2UCv1g/view?usp=drive_link", siteUrl: "https://vids.google.com", description: "אפליקציה ליצירת סרטוני עבודה והדרכה מבוססת בינה מלאכותית.", info: "• יצירת סרטונים מהירה: ה-AI עוזר לבנות תסריט.\n• עריכה פשוטה: ממשק המבוסס על שקפים." },
        { id: 39, title: "NotebookLM", category: "כלי גוגל", driveUrl: "https://drive.google.com/file/d/1rugVVLRSUFbrk--CjkZOraXCWlzalPb3/view?usp=drive_link", siteUrl: "https://notebooklm.google.com", description: "עוזר מחקר אישי מבוסס AI המשתמש במסמכים שלכם כמקור ידע.", info: "• מחקר מבוסס מקורות: עונה רק על סמך המסמכים שהעליתם.\n• פודקאסט שמע: הפיכת מסמכים לשיחה קולית מרתקת." },
        { id: 27, title: "אורט קמפוס", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/1yjxfdbD3IVMULEEtEGH86pjSzf0lUFg2/view?usp=sharing", siteUrl: "https://campus.ort.org.il/", description: "הקמפוס הווירטואלי של רשת אורט. פלטפורמה לניהול למידה.", info: "• קורסים דיגיטליים: גישה למאות קורסים במקצועות הליבה.\n• Moodle מבוסס: מערכת ניהול למידה מתקדמת." },
        { id: 3, title: "Mentimeter", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1ocybR8PcGro2Ue6GyS4a8FgwhDWB9Gzx/view?usp=sharing", siteUrl: "https://www.mentimeter.com", description: "מצגות אינטראקטיביות לשיתוף קהל ומשוב חי במגוון סקרים.", info: "• מעורבות: הפיכת הקהל למשתתף אקטיבי.\n• ענני מילים: כלי מצוין לסיעור מוחות כיתתי." },
        { id: 4, title: "Canva", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1cDj4dBegxxz_0x3Q0n4_QaefX196Gqy8/view?usp=sharing", siteUrl: "https://www.canva.com", description: "פלטפורמת עיצוב גרפי ליצירת מצגות ותוכן ויזואלי.", info: "• עיצוב מקצועי בקלות: שימוש באלפי תבניות מוכנות.\n• Canva for Education: גישה מלאה לכל הכלים בחינם למורים." },
        { id: 18, title: "Photopea", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1w1bpkfQJyLOPvlsAG6YHxabKc39PLOyv/view?usp=sharing", siteUrl: "https://www.photopea.com", description: "עורך תמונות מקצועי וחינמי בדפדפן, תואם פוטושופ.", info: "• עריכה מקצועית: עבודה עם שכבות ומסכות.\n• תואם PSD: תמיכה מלאה בקבצי פוטושופ." },
        { id: 33, title: "Figma", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1K5kVSCYpnKUUf8KtB-q8EOvODL5s8jOk/view?usp=drive_link", siteUrl: "https://www.figma.com", description: "פלטפורמה מקצועית לעיצוב ממשקים (UI/UX) ושיתוף פעולה ויזואלי.", info: "• עיצוב מוצר: בניית אבות-טיפוס של אפליקציות.\n• FigJam: לוח לבן שיתופי לסיעור מוחות." },
        { id: 31, title: "Tinkercad", category: "עיצוב ויצירה", driveUrl: "https://drive.google.com/file/d/1ZbsYfD5GEP298ccEJWdb3UdsPKDGjsyD/view?usp=sharing", siteUrl: "https://www.tinkercad.com", description: "פלטפורמה לתכנון בתלת-ממד ועיצוב מעגלים אלקטרוניים.", info: "• עיצוב 3D: בניית מודלים להדפסת תלת-ממד.\n• סימולציית מעגלים: תכנון ובדיקת מעגלים אלקטרוניים." },
        { id: 6, title: "Genially", category: "אינטראקטיביות", driveUrl: "https://drive.google.com/file/d/11lWrpl9ZwvyuED-13lEyh06SIAOHTaAx/view?usp=sharing", siteUrl: "https://genial.ly", description: "יצירת מצגות, משחקים ואינפוגרפיקות אינטראקטיביות.", info: "• גיימיפיקציה: בניית חדרי בריחה דיגיטליים.\n• אינפוגרפיקות חיות: תרשימים שמתעוררים לחיים." },
        { id: 5, title: "Kahoot!", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1v5jVMrb3jEtjNpRVX7Qs8eDKrtb5zij8/view?usp=sharing", siteUrl: "https://kahoot.com", description: "הפוך למידה למשחק דרך חידונים תחרותיים.", info: "• למידה חווייתית: הפיכת בדיקת הידע לתחרות.\n• חידונים מהירים: שאלות טריוויה עם מוזיקה." },
        { id: 13, title: "Quizizz", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1uZ1NXKhmRR5ZQKnpuhGDay1HwLDXdSwL/view?usp=sharing", siteUrl: "https://quizizz.com", description: "חידונים בקצב אישי הכוללים דוחות התקדמות.", info: "• קצב אישי: התלמידים עונים בקצב שלהם.\n• הנגשה: הכלי כולל הקראת שאלות בקול." },
        { id: 16, title: "Baamboozle", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1W0FoGzCh50iKb1ko4UD7R5WKoC0CSUlN/view?usp=sharing", siteUrl: "https://www.baamboozle.com", description: "משחקי צוותים ללא צורך במכשירים אישיים.", info: "• פשטות: אין צורך בטלפון לכל תלמיד.\n• גיבוש כיתתי: חלוקה לצוותים המתחרים זה בזה." },
        { id: 17, title: "Nearpod", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1vZDlkiWFT-QzLBNmWiemms6ZxTipCiCz/view?usp=sharing", siteUrl: "https://nearpod.com", description: "שיעורים אינטראקטיביים המשלבת מצגות ומשחקים.", info: "• שליטה מלאה: המורה מעביר שקפים לכל התלמידים.\n• מציאות מדומה: יציאה לסיורים וירטואליים." },
        { id: 20, title: "Flippity", category: "משחקים", driveUrl: "https://drive.google.com/file/d/1EquhXBSUh1gzf8-G08hjNjJmq-H6yOoU/view?usp=drive_link", siteUrl: "https://www.flippity.net", description: "הפוך גליונות גוגל למשחקים כמו גלגלי מזל.", info: "• גלגל מזל: כלי לבחירה אקראית של תלמידים.\n• מנעולי פריצה: יצירת חדרי בריחה דיגיטליים." },
        { id: 10, title: "Wordwall", category: "משחקים", driveUrl: "https://drive.google.com/file/d/16Kaql2LZyy9-VCAUuoOBBFyEMwqMmLAV/view?usp=drive_link", siteUrl: "https://wordwall.net", description: "יצירת פעילויות מותאמות אישית במגוון תבניות משחק.", info: "• מגוון תבניות: המרת תוכן למגוון משחקים.\n• גרסאות להדפסה: הורדה כדפי עבודה ב-PDF." },
        { id: 11, title: "Classroomscreen", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1pJDqx_K1ZKV-bEtRGHj6Sx8YUgcwuwC6/view?usp=sharing", siteUrl: "https://classroomscreen.com", description: "ניהול מסך הכיתה עם כלים כמו טיימר ורמות רעש.", info: "• ארגון המסך: הצגת הנחיות וטיימר.\n• מד רעש: כלי ויזואלי לעוצמת הדיבור." },
        { id: 32, title: "Classe", category: "שיתופיות", driveUrl: "https://drive.google.com/file/d/1-A4JjSMc5G3XhFszhUiPaEdp7V0P7UZh/view?usp=sharing", siteUrl: "https://www.classe.world", description: "מערכת לניהול כיתה חכם, הכוללת מפות הושבה.", info: "• מפת הושבה דינמית: בניית סידור ישיבה חכם.\n• חלוקה לקבוצות: יצירת צוותים בלחיצת כפתור." },
        { id: 7, title: "remove.bg", category: "כלים שעושים חיים קלים", driveUrl: "", siteUrl: "https://www.remove.bg", description: "הסרת רקע מתמונות בתוך שניות בעזרת AI.", info: "• הסרה אוטומטית: ניקוי הרקע ללא ידע גרפי.\n• עיצוב נקי: יצירת קבצי PNG שקופים." },
        { id: 8, title: "iLovePDF", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1KOA268-vL0hoBkxBhtFtyqWitg5Oz5kY/view?usp=sharing", siteUrl: "https://www.ilovepdf.com", description: "סט כלים לניהול, המרה ועריכת קבצי PDF בקלות.", info: "• מיזוג ופיצול: חיבור מספר קבצי PDF.\n• המרת קבצים: הפיכת PDF ל-Word ו-Excel." },
        { id: 28, title: "123Apps", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1LufYcD-Ok5nuWM_inhMN612JbjHmjEZl/view?usp=sharing", siteUrl: "https://123apps.com/", description: "סט כלים מקוון לעריכת וידאו, אודיו וניהול PDF.", info: "• עריכת וידאו: חיתוך סרטונים והוספת כתוביות.\n• הקלטה: הקלטת מסך המחשב להדרכות." },
        { id: 30, title: "TinyWow", category: "כלים שעושים חיים קלים", driveUrl: "https://drive.google.com/file/d/1PgRcU5CiKHKVJFKgTCjT4vCDFbPPHeMW/view?usp=drive_link", siteUrl: "https://tinywow.com/", description: "מאות כלים חינמיים לטיפול בקבצים ותמונות.", info: "• כלי AI: כתיבת טקסטים ושיפור ניסוחים.\n• חילוץ טקסט: הפיכת תמונות לטקסט חי (OCR)." },
        { id: 9, title: "Pixabay", category: "מאגרי מדיה", driveUrl: "https://drive.google.com/file/d/1S_HBANOnFfFrMjtJ_q7l5tf_JKqu2s1W/view?usp=sharing", siteUrl: "https://pixabay.com", description: "מאגר תמונות וסרטונים לשימוש חופשי.", info: "• מאגר ענק: מיליוני תמונות וסרטונים בחינם.\n• זכויות יוצרים: מדיה לשימוש חופשי (CC0)." },
        { id: 12, title: "Unsplash", category: "מאגרי מדיה", driveUrl: "https://drive.google.com/file/d/1F-ZV_XWo3fQKpTRmCv1UAxb9kOL8HVc4/view?usp=sharing", siteUrl: "https://unsplash.com", description: "מאגר צילומי אמנותיים ואיכותיים ברזולוציה גבוהה.", info: "• צילום אמנותי: מאגר המבוסס על צלמים מקצועיים.\n• איכות: תמונות במראה אמנותי ואיכותי במיוחד." },
        { id: 43, title: "Cymath", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1Cs8lKyCbSii0ZcE6OV3In1F-IgAX1Y_0/view?usp=sharing", siteUrl: "https://www.cymath.com", description: "פתרון בעיות מתמטיות צעד אחר צעד במגוון נושאי לימוד.", info: "• הסברים שלב אחר שלב: הצגת דרך הפתרון המלאה.\n• תמיכה רחבה: אלגברה, חדו\"א ונושאים מתקדמים." },
        { id: 44, title: "סימולטור Chemistry", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1XVcVQFyhKXxyqOcNtP-0WuhSEvQpT8km/view?usp=sharing", siteUrl: "https://interactives.ck12.org/simulations/chemistry.html", description: "סימולציות אינטראקטיביות בכימיה המאפשרות חקר של משתנים.", info: "• חקר תופעות: ביצוע ניסויים וירטואליים בכימיה.\n• המחשה ויזואלית: צפייה במודלים מולקולריים מרהיבים." },
        { id: 45, title: "סימולטור Physics", category: "סימולציות", driveUrl: "https://drive.google.com/file/d/1JdUbGhrJBrRMtjgsJAvmnFM7eIGppJXs/view?usp=sharing", siteUrl: "https://interactives.ck12.org/simulations/physics.html", description: "מגוון רחב של סימולציות פיזיקליות הממחישות חוקים מהעולם האמיתי.", info: "• ניסוי וטעייה: שינוי פרמטרים כמו מסה וכוח.\n• המחשת חוקים: צפייה בגרפים תוך כדי תנועה." }
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
