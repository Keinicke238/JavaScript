// STRATEGI-PLAN: Data struktur for bøger
// Denne funktion parser filnavne og udtrækker titel og forfatter
function parseBookInfo(filename) {
    // Fjern sti og filendelse
    const cleanName = filename.split('/').pop().replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
    
    // Split på bindestreger og konverter tilbage til mellemrum
    const parts = cleanName.split('-').map(part => 
        part.split('_').join(' ')
    );
    
    // Forsøg at identificere forfatter og titel baseret på mønstre
    let title = cleanName.split('-').join(' ').split('_').join(' ');
    let author = 'Ukendt forfatter';
    
    // Specifik parsing for kendte bøger fra dit skærmbillede
    const knownBooks = [
        { pattern: /balm.*soul/i, title: 'A Balm for Your Soul', author: 'The Six Seeds of Happiness' },
        { pattern: /wolf.*king/i, title: 'WOLF KING', author: 'Jason Nelson' },
        { pattern: /fake.*pretend.*wife/i, title: 'FAKE WITH A PRETEND WIFE', author: 'Kathy Asher, Bella Jacobs' },
        { pattern: /king.*tower/i, title: 'KING TOWER', author: 'Amy Boyles, C.N. Crawford' },
        { pattern: /pretend.*wife/i, title: 'Pretend Wife to the Ma...', author: 'Asher, Kathy' },
        { pattern: /how.*fake.*it/i, title: 'How To Fake It With A ...', author: 'Boyles, Amy' },
        { pattern: /avalon.*tower/i, title: 'Avalon Tower: A Fantas...', author: 'Crawford, C.N.; Rivers, Alex' },
        { pattern: /speeding.*into/i, title: 'SPEEDING INTO OVER...', author: 'P., Kanitha' },
        { pattern: /his.*for.*week/i, title: 'HIS FOR A WEEK', author: 'EM BROWN' },
        { pattern: /bought/i, title: 'BOUGHT', author: 'SUMMER COOPER' },
        { pattern: /secret/i, title: 'SECRET', author: 'JULIETTE N. BANKS' },
        { pattern: /unknown/i, title: 'UNKNOWN', author: 'R.G. ANGEL' },
        { pattern: /savage.*alpha/i, title: 'SAVAGE ALPHA', author: 'SCARLETT REIGN' },
        { pattern: /omega/i, title: 'OMEGA', author: 'V.T. BONDS' },
        { pattern: /auctioned/i, title: 'Auctioned', author: '' }
    ];
    
    // Tjek om filen matcher en kendt bog
    for (const book of knownBooks) {
        if (book.pattern.test(cleanName)) {
            title = book.title;
            author = book.author;
            break;
        }
    }
    
    // Hvis ingen match, prøv at gætte ud fra filnavn
    if (author === 'Ukendt forfatter') {
        if (parts.length > 1) {
            // Sidste del kunne være forfatter
            author = parts.pop().trim();
            title = parts.join(' ').trim();
        }
    }
    
    return { title, author, filename: cleanName };
}

// SCOPE-PLAN: Liste over billeder i mappen
// DU SKAL ERSTATTE DISSE MED DINE FAKTISKE FILNAVNE!
const bookImages = [
    'images/balm-for-your-soul.jpg',
    'images/wolf-king.jpg',
    'images/fake-with-a-pretend-wife.jpg',
    'images/king-tower.jpg',
    'images/pretend-wife.jpg',
    'images/how-to-fake-it.jpg',
    'images/avalon-tower.jpg',
    'images/speeding-into-over.jpg',
    'images/his-for-a-week.jpg',
    'images/bought.jpg',
    'images/secret.jpg',
    'images/unknown.jpg',
    'images/savage-alpha.jpg',
    'images/omega.jpg',
    'images/auctioned.jpg'
];

// STRUKTUR-PLAN: Funktion til at generere HTML for hver bog
function createBookCard(imagePath) {
    const bookInfo = parseBookInfo(imagePath);
    
    // Opret article element
    const article = document.createElement('article');
    article.className = 'book-card';
    article.setAttribute('role', 'gridcell');
    article.setAttribute('aria-labelledby', `book-${bookInfo.filename}-title`);
    
    // Generer unikt ID til titlen
    const titleId = `book-${bookInfo.filename}-title`.replace(/[^a-zA-Z0-9]/g, '-');
    
    // HTML struktur for bogen
    article.innerHTML = `
        <div class="cover-container">
            <a href="${imagePath}" 
               class="cover-link" 
               target="_blank"
               aria-label="Se cover til ${bookInfo.title}">
                <div class="book-cover">
                    <img src="${imagePath}" 
                         alt="" 
                         class="cover-image"
                         onerror="this.style.display='none'; this.parentElement.classList.add('cover-fallback'); this.parentElement.innerHTML += '<div class=\\'cover-fallback-content\\'><span>${bookInfo.title}</span></div>';">
                </div>
            </a>
        </div>
        <div class="book-metadata">
            <h3 class="book-title" id="${titleId}">${bookInfo.title}</h3>
            <p class="book-author">${bookInfo.author}</p>
        </div>
    `;
    
    return article;
}

// SKELETON-PLAN: Indsæt alle bøger i grid'et
function renderLibrary() {
    const booksGrid = document.getElementById('books-grid');
    
    // Ryd eventuelle eksisterende børn
    booksGrid.innerHTML = '';
    
    // Loop gennem alle billeder og opret book cards
    bookImages.forEach(imagePath => {
        const bookCard = createBookCard(imagePath);
        booksGrid.appendChild(bookCard);
    });
    
    // TÆL hvor mange bøger der blev indsat
    console.log(`Bibliotek indlæst: ${bookImages.length} bøger`);
}

// OVERFLADE-PLAN: Kør når DOM'en er loaded
document.addEventListener('DOMContentLoaded', renderLibrary);

// Fremtidig funktionalitet: Søgning og filtrering
function filterBooks(searchTerm) {
    // Dette kunne implementeres senere
    console.log('Søg efter:', searchTerm);
}

function sortBooks(criteria) {
    // Dette kunne implementeres senere
    console.log('Sorter efter:', criteria);
}