// script.js - Single JavaScript file for all pages

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Initialize page-specific functionality based on current page
    const currentPage = getCurrentPage();

    // Highlight active navigation link
    highlightActiveNavLink(currentPage);

    // Initialize page-specific features
    switch (currentPage) {
        case 'notes':
            initNotesPage();
            break;
        case 'glossary':
            initGlossaryPage();
            break;
        case 'resources':
            initResourcesPage();
            break;
        case 'index':
        case 'topics':
        case 'about':
            // No special initialization needed for these pages
            break;
    }

    // Add event listeners for interactive elements
    addGlobalEventListeners();
});

// Get the current page name from the URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
}

// Highlight the active navigation link
function highlightActiveNavLink(currentPage) {
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').replace('.html', '');
        if (linkPage === currentPage || (currentPage === 'index' && linkPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize Notes page functionality
function initNotesPage() {
    // Sample notes data
    const notesData = [
        {
            id: 1,
            title: "Algebra Basics",
            subject: "math",
            date: "2023-10-15",
            content: "Algebra is the branch of mathematics that uses symbols to represent numbers and express relationships between them. Key concepts include variables, equations, and functions.",
            tags: ["algebra", "equations", "variables"]
        },
        {
            id: 2,
            title: "Photosynthesis Process",
            subject: "science",
            date: "2023-10-10",
            content: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water.",
            tags: ["biology", "plants", "energy"]
        },
        {
            id: 3,
            title: "HTML Structure",
            subject: "cs",
            date: "2023-10-05",
            content: "HTML documents are structured with elements that define content hierarchy. The basic structure includes DOCTYPE, html, head, and body elements.",
            tags: ["web", "html", "structure"]
        },
        {
            id: 4,
            title: "French Grammar Rules",
            subject: "language",
            date: "2023-10-01",
            content: "French nouns have genders (masculine/feminine) and must agree with articles and adjectives. Verb conjugation follows regular patterns with some exceptions.",
            tags: ["french", "grammar", "language"]
        },
        {
            id: 5,
            title: "Renaissance Art",
            subject: "arts",
            date: "2023-09-28",
            content: "The Renaissance period saw a revival of classical art forms and humanist philosophy. Key artists include Leonardo da Vinci, Michelangelo, and Raphael.",
            tags: ["art", "history", "renaissance"]
        },
        {
            id: 6,
            title: "Probability Theory",
            subject: "math",
            date: "2023-09-25",
            content: "Probability measures the likelihood of events occurring. Basic concepts include sample spaces, events, probability distributions, and conditional probability.",
            tags: ["statistics", "probability", "math"]
        }
    ];

    // Populate notes grid
    const notesContainer = document.getElementById('notes-container');
    if (notesContainer) {
        displayNotes(notesData, notesContainer);
    }

    // Set up search functionality
    const searchInput = document.getElementById('search-notes');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterNotes(notesData, this.value.toLowerCase());
        });
    }

    // Set up filter functionality
    const filterSelect = document.getElementById('filter-subject');
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            filterNotesBySubject(notesData, this.value);
        });
    }

    // Add note button functionality
    const addNoteBtn = document.getElementById('add-note-btn');
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', function () {
            alert('In a real application, this would open a form to add a new note. For this demo, try searching or filtering existing notes.');
        });
    }
}

// Display notes in the container
function displayNotes(notes, container) {
    container.innerHTML = '';

    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const subjectClass = getSubjectClass(note.subject);

        noteCard.innerHTML = `
            <div class="note-header">
                <div>
                    <div class="note-title">${note.title}</div>
                    <span class="note-subject ${subjectClass}">${getSubjectName(note.subject)}</span>
                </div>
                <div class="note-date">${formatDate(note.date)}</div>
            </div>
            <div class="note-content">${note.content}</div>
            <div class="note-tags">
                ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
            </div>
        `;

        container.appendChild(noteCard);
    });
}

// Filter notes based on search term
function filterNotes(notes, searchTerm) {
    const container = document.getElementById('notes-container');
    const filteredNotes = searchTerm ?
        notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        ) : notes;

    displayNotes(filteredNotes, container);
}

// Filter notes by subject
function filterNotesBySubject(notes, subject) {
    const container = document.getElementById('notes-container');
    const filteredNotes = subject === 'all' ?
        notes :
        notes.filter(note => note.subject === subject);

    displayNotes(filteredNotes, container);
}

// Initialize Glossary page functionality
function initGlossaryPage() {
    // Sample glossary data
    const glossaryData = [
        {
            term: "Algorithm",
            definition: "A step-by-step procedure or formula for solving a problem or accomplishing a task.",
            subject: "cs",
            letter: "a"
        },
        {
            term: "Biome",
            definition: "A large naturally occurring community of flora and fauna occupying a major habitat.",
            subject: "science",
            letter: "b"
        },
        {
            term: "Calculus",
            definition: "The mathematical study of continuous change, focusing on derivatives and integrals.",
            subject: "math",
            letter: "c"
        },
        {
            term: "Democracy",
            definition: "A system of government where power is held by the people through elected representatives.",
            subject: "social",
            letter: "d"
        },
        {
            term: "Ecosystem",
            definition: "A biological community of interacting organisms and their physical environment.",
            subject: "science",
            letter: "e"
        },
        {
            term: "Fraction",
            definition: "A numerical quantity that is not a whole number, representing a part of a whole.",
            subject: "math",
            letter: "f"
        },
        {
            term: "Geometry",
            definition: "The branch of mathematics concerned with the properties and relations of points, lines, surfaces, and solids.",
            subject: "math",
            letter: "g"
        },
        {
            term: "Hypothesis",
            definition: "A proposed explanation made on the basis of limited evidence as a starting point for further investigation.",
            subject: "science",
            letter: "h"
        },
        {
            term: "Integral",
            definition: "A mathematical concept representing the area under a curve or the accumulation of quantities.",
            subject: "math",
            letter: "i"
        },
        {
            term: "JavaScript",
            definition: "A programming language used to create interactive effects within web browsers.",
            subject: "cs",
            letter: "j"
        },
        {
            term: "Kinetic Energy",
            definition: "The energy possessed by an object due to its motion.",
            subject: "science",
            letter: "k"
        },
        {
            term: "Logarithm",
            definition: "The exponent to which a base must be raised to produce a given number.",
            subject: "math",
            letter: "l"
        },
        {
            term: "Metaphor",
            definition: "A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable.",
            subject: "language",
            letter: "m"
        },
        {
            term: "Noun",
            definition: "A word that names a person, place, thing, or idea.",
            subject: "language",
            letter: "n"
        },
        {
            term: "Oxidation",
            definition: "A chemical reaction that involves the loss of electrons or an increase in oxidation state.",
            subject: "science",
            letter: "o"
        },
        {
            term: "Photosynthesis",
            definition: "The process by which green plants use sunlight to synthesize foods from carbon dioxide and water.",
            subject: "science",
            letter: "p"
        },
        {
            term: "Quantum",
            definition: "The smallest discrete amount of any physical property, such as energy or matter.",
            subject: "science",
            letter: "q"
        },
        {
            term: "Ratio",
            definition: "The quantitative relation between two amounts showing the number of times one value contains or is contained within the other.",
            subject: "math",
            letter: "r"
        },
        {
            term: "Syntax",
            definition: "The arrangement of words and phrases to create well-formed sentences in a language.",
            subject: "language",
            letter: "s"
        },
        {
            term: "Theorem",
            definition: "A statement that has been proven on the basis of previously established statements.",
            subject: "math",
            letter: "t"
        },
        {
            term: "Variable",
            definition: "A symbol used to represent an unknown or changing quantity in mathematics and programming.",
            subject: "math",
            letter: "v"
        }
    ];

    // Populate alphabet filter
    const alphabetFilter = document.getElementById('alphabet-filter');
    if (alphabetFilter) {
        // Generate alphabet letters
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        alphabet.forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter.toUpperCase();
            span.dataset.letter = letter;
            alphabetFilter.appendChild(span);
        });

        // Add event listeners to alphabet filter
        const alphabetSpans = alphabetFilter.querySelectorAll('span');
        alphabetSpans.forEach(span => {
            span.addEventListener('click', function () {
                // Remove active class from all spans
                alphabetSpans.forEach(s => s.classList.remove('active'));
                // Add active class to clicked span
                this.classList.add('active');

                // Filter glossary by selected letter
                const selectedLetter = this.dataset.letter;
                filterGlossary(glossaryData, selectedLetter);
            });
        });
    }

    // Display all glossary items initially
    const glossaryContainer = document.getElementById('glossary-container');
    if (glossaryContainer) {
        displayGlossaryItems(glossaryData, glossaryContainer);
    }

    // Set up search functionality
    const searchInput = document.getElementById('search-glossary');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            searchGlossary(glossaryData, this.value.toLowerCase());
        });
    }

    // Add term button functionality
    const addTermBtn = document.getElementById('add-term-btn');
    if (addTermBtn) {
        addTermBtn.addEventListener('click', function () {
            alert('In a real application, this would open a form to suggest a new glossary term. For this demo, try searching existing terms using the alphabet filter or search box.');
        });
    }
}

// Display glossary items
function displayGlossaryItems(items, container) {
    container.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'glossary-item';

        itemElement.innerHTML = `
            <div class="term">${item.term}</div>
            <div class="definition">${item.definition}</div>
            <div>
                <span class="subject-tag">${getSubjectName(item.subject)}</span>
            </div>
        `;

        container.appendChild(itemElement);
    });
}

// Filter glossary by letter
function filterGlossary(glossaryData, letter) {
    const container = document.getElementById('glossary-container');

    if (letter === 'all') {
        displayGlossaryItems(glossaryData, container);
        return;
    }

    const filteredItems = glossaryData.filter(item => item.letter === letter);
    displayGlossaryItems(filteredItems, container);
}

// Search glossary terms
function searchGlossary(glossaryData, searchTerm) {
    const container = document.getElementById('glossary-container');

    if (!searchTerm) {
        // Reset to show all items
        const activeLetter = document.querySelector('.alphabet-filter span.active');
        if (activeLetter && activeLetter.dataset.letter !== 'all') {
            filterGlossary(glossaryData, activeLetter.dataset.letter);
        } else {
            displayGlossaryItems(glossaryData, container);
        }
        return;
    }

    const filteredItems = glossaryData.filter(item =>
        item.term.toLowerCase().includes(searchTerm) ||
        item.definition.toLowerCase().includes(searchTerm)
    );

    displayGlossaryItems(filteredItems, container);
}

// Initialize Resources page functionality
function initResourcesPage() {
    // Sample resources data
    const resourcesData = [
        {
            title: "Khan Academy",
            description: "Free online courses, lessons, and practice in math, science, and more.",
            url: "https://www.khanacademy.org",
            type: "websites",
            category: "websites"
        },
        {
            title: "Coursera",
            description: "Online courses from top universities and companies worldwide.",
            url: "https://www.coursera.org",
            type: "courses",
            category: "courses"
        },
        {
            title: "Wolfram Alpha",
            description: "Computational intelligence answering factual questions directly.",
            url: "https://www.wolframalpha.com",
            type: "tools",
            category: "tools"
        },
        {
            title: "Project Gutenberg",
            description: "Free eBooks of classic literature in the public domain.",
            url: "https://www.gutenberg.org",
            type: "books",
            category: "books"
        },
        {
            title: "Codecademy",
            description: "Interactive platform for learning coding and computer science.",
            url: "https://www.codecademy.com",
            type: "courses",
            category: "courses"
        },
        {
            title: "Google Scholar",
            description: "Search engine for scholarly literature across disciplines.",
            url: "https://scholar.google.com",
            type: "tools",
            category: "tools"
        },
        {
            title: "Crash Course YouTube",
            description: "Educational YouTube channel covering various subjects.",
            url: "https://www.youtube.com/crashcourse",
            type: "videos",
            category: "videos"
        },
        {
            title: "MIT OpenCourseWare",
            description: "Free course materials from MIT classes.",
            url: "https://ocw.mit.edu",
            type: "courses",
            category: "courses"
        },
        {
            title: "Duolingo",
            description: "Free language learning platform with gamified lessons.",
            url: "https://www.duolingo.com",
            type: "websites",
            category: "websites"
        },
        {
            title: "Wikipedia",
            description: "Free online encyclopedia with articles on countless topics.",
            url: "https://www.wikipedia.org",
            type: "websites",
            category: "websites"
        },
        {
            title: "3Blue1Brown YouTube",
            description: "YouTube channel visualizing mathematical concepts.",
            url: "https://www.youtube.com/3blue1brown",
            type: "videos",
            category: "videos"
        },
        {
            title: "The Feynman Lectures on Physics",
            description: "Classic physics textbook series by Richard Feynman.",
            url: "https://www.feynmanlectures.caltech.edu",
            type: "books",
            category: "books"
        }
    ];

    // Display all resources initially
    const resourcesContainer = document.getElementById('resources-container');
    if (resourcesContainer) {
        displayResources(resourcesData, resourcesContainer);
    }

    // Set up category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Filter resources by category
            const category = this.dataset.category;
            filterResources(resourcesData, category);
        });
    });
}

// Display resources in the container
function displayResources(resources, container) {
    container.innerHTML = '';

    resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';

        // Get icon based on resource type
        const icon = getResourceIcon(resource.type);

        resourceCard.innerHTML = `
            <div class="resource-icon">
                <i class="${icon}"></i>
            </div>
            <div class="resource-content">
                <div class="resource-title">${resource.title}</div>
                <div class="resource-description">${resource.description}</div>
                <a href="${resource.url}" target="_blank" class="resource-link">
                    Visit Resource <i class="fas fa-external-link-alt"></i>
                </a>
                <div class="resource-type">${resource.type}</div>
            </div>
        `;

        container.appendChild(resourceCard);
    });
}

// Filter resources by category
function filterResources(resources, category) {
    const container = document.getElementById('resources-container');

    if (category === 'all') {
        displayResources(resources, container);
        return;
    }

    const filteredResources = resources.filter(resource => resource.category === category);
    displayResources(filteredResources, container);
}

// Helper function to get resource icon
function getResourceIcon(type) {
    switch (type) {
        case 'websites': return 'fas fa-globe';
        case 'tools': return 'fas fa-tools';
        case 'books': return 'fas fa-book';
        case 'videos': return 'fas fa-video';
        case 'courses': return 'fas fa-graduation-cap';
        default: return 'fas fa-link';
    }
}

// Helper function to get subject class name
function getSubjectClass(subject) {
    switch (subject) {
        case 'math': return 'math-subject';
        case 'science': return 'science-subject';
        case 'cs': return 'cs-subject';
        case 'language': return 'language-subject';
        case 'arts': return 'arts-subject';
        default: return '';
    }
}

// Helper function to get full subject name
function getSubjectName(subject) {
    switch (subject) {
        case 'math': return 'Mathematics';
        case 'science': return 'Science';
        case 'cs': return 'Computer Science';
        case 'language': return 'Languages';
        case 'arts': return 'Arts & Humanities';
        case 'social': return 'Social Sciences';
        default: return subject;
    }
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Add global event listeners (for any page)
function addGlobalEventListeners() {
    // Add a simple page load animation
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.style.opacity = '0';
        pageContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            pageContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}