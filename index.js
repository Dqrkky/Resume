const load = async () => {
    window.config = {
        "username": "Dqrkky",
        "about": [
            {
                "text": "👋 Hey there!",
                "span": "I’m a 20-year-old backend developer with a passion for programming that kicked off when I was just 12.\nEver since I wrote my first line of code, I’ve been hooked on solving complex problems and creating efficient backend systems that power seamless user experiences."
            },
            {
                "text": "💻 What I specialize in:",
                "span": "Designing and building scalable APIs and server-side architectures.\nWorking with databases (SQL, NoSQL) to ensure data reliability and performance.\nImplementing secure and efficient backend solutions with a focus on maintainability.\nExploring emerging technologies to stay ahead in the ever-evolving tech world."
            },
            {
                "text": "🌟 What sets me apart:",
                "span": "A deep curiosity for understanding how things work under the hood.\nStrong attention to clean, maintainable, and well-documented code.\nAbility to quickly adapt to new technologies and frameworks.\nCollaborative spirit—I love working with teams and contributing to open-source projects."
            },
            {
                "text": "⚙️ Tech Stack I Love:",
                "span": "Languages: Python, Node.js, Java, php\nFrameworks: Express.js, Flask, Hono.js\nDatabases: PostgreSQL, MongoDB, MySQL, Redis, MariaDB\nTools: Docker, Git, CI/CD Pipelines"
            },
            {
                "text": "🚀 My Journey So Far:",
                "span": "From building simple command-line programs as a kid to architecting full-fledged backend systems, coding has always been my creative outlet.\nI’ve worked on everything from personal side projects to collaborative, real-world applications."
            },
            {
                "text": "🌱 What I’m learning:",
                "span": "I’m currently diving deeper into cloud computing (AWS) and microservices to sharpen my expertise in modern backend development."
            },
            {
                "text": "📂 Check out my work:",
                "span": "Take a look at some of my projects and contributions on GitHub"
            },
            {
                "text": "💡 Fun Fact:",
                "span": "When I’m not coding, I’m probably brainstorming new ideas, gaming, or exploring how to automate something cool."
            },
            {
                "text": "Let’s connect and build something awesome together! 🚧✨",
                "text": "Made With ❤️ By Dqrkky"
            }
        ],
        "contact": [
            {
                "type": "email",
                "label": "staurospapadogiannopoulos@gmail.com",
                "url": "mailto:staurospapadogiannopoulos@gmail.com"
            },
            {
                "type": "linkedin",
                "label": "linkedin.com/in/staurosp",
                "url": "https://linkedin.com/in/staurosp"
            },
            {
                "type": "github",
                "label": "github.com/Dqrkky",
                "url": "https://github.com/Dqrkky"
            }
        ],
        "elements": {
            "about": document.getElementById('about'),
            "skills": document.getElementById('skills'),
            "projects": document.getElementById('projects'),
            "experience": document.getElementById('experience'),
            "contact": document.getElementById("contact"),
            "copyright": document.getElementById("copyright"),
            "fadeintext": document.querySelectorAll('.fade-in-text'),
            "popupOverlay": document.getElementById('popupOverlay'),
            "popup": document.getElementById('popup'),
            "confirmBtn": document.getElementById('confirmBtn'),
            "cancelBtn": document.getElementById('cancelBtn'),
            "redirecttext": document.getElementById("redirecttext")
        },
        "popup": {
            "open": (text) => {
                window.config.elements.redirecttext.innerText = text;
                document.body.classList.add('active-popup');
                window.config.elements.popupOverlay.style.display = 'flex';
            },
            "close": () => {
                window.config.elements.popupOverlay.style.display = 'none';
                document.body.classList.remove('active-popup');
            }
        },
        "date": new Date()
    };
    window.config.about.forEach((item, index) => {
        const _p = document.createElement('p');
        _p.classList.add('fade-in-text');
        _p.style.animationDelay = `${index * 0.3}s`;
        _p.innerHTML = `${item.text}`;

        _p.appendChild(document.createElement("br"));

        if (item.span) {
            const _span = document.createElement('span');
            _span.style.animationDelay = `${0.1 * index}s`;
            _span.innerText = item.span;
            _p.appendChild(_span);
        };

        window.config.elements.about.appendChild(_p);
    });

    // Close popup when the cancel button is clicked
    window.config.elements.cancelBtn.addEventListener('click', () => {
        window.config.popup.close();
    });

    // Close popup if the user clicks outside the popup
    window.config.elements.popupOverlay.addEventListener('click', (e) => {
        if (e.target === window.config.elements.popupOverlay) {
            window.config.popup.close();
        }
    });

    // Dragging logic
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    window.config.elements.popupHeader = window.config.elements.popup.querySelector('.popup-header');
    window.config.elements.popupHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = popup.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            window.config.elements.popup.style.cursor = 'grabbing';
            window.config.elements.popup.style.position = 'absolute';
            window.config.elements.popup.style.left = `${initialLeft + dx}px`;
            window.config.elements.popup.style.top = `${initialTop + dy}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
        window.config.elements.popup.style.cursor = 'grab';
    });

    window.config.contact.forEach((contact) => {
        const _div = document.createElement("div");
        _div.classList.add("socials");

        const _span = document.createElement("span");
        _span.textContent = contact.label;
        _span.onclick = () => {
            window.config.elements.confirmBtn.addEventListener('click', () => {
                window.config.elements.popupOverlay.style.display = 'none';
                document.body.classList.remove('active-popup');
                window.open(contact.url, "_self");
            });
            window.config.popup.open(`You're about to be redirected to ${contact.url}.`);
        };
        _div.appendChild(_span);

        window.config.elements.contact.getElementsByClassName("card")[0].appendChild(_div);
    });
    window.config.elements.copyright.textContent = `© ${window.config.date.getFullYear()} ${window.config.username}.\nAll rights reserved.`;
    window.config.elements.fadeintext.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        Array.from(el.getElementsByTagName("span")).forEach((span, spanindex) => {
            span.style.animationDelay = `${spanindex * 0.2}s`;
        });
    });
};