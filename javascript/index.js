document.addEventListener("DOMContentLoaded", async () => {
    window.config = {
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
            },
            "start": (url) => {
                window.config.elements.confirmBtn.addEventListener('click', () => {
                    window.config.elements.popupOverlay.style.display = 'none';
                    document.body.classList.remove('active-popup');
                    window.config.redirect(url);
                });
                window.config.popup.open(`You're about to be redirected to ${url}.`);
            }
        },
        "date": new Date(),
        "redirect": (url) => {
            window.open(url, "_self");
        },
        "createCard": {
            "about": ({text, span}, index) => {
                const p = document.createElement('p');
                p.classList.add('fade-in-text');
                p.style.animationDelay = `${index * 0.3}s`;
                p.innerHTML = `${text}`;

                p.appendChild(document.createElement("br"));

                if (span) {
                    const _span = document.createElement('span');
                    _span.style.animationDelay = `${0.1 * index}s`;
                    _span.innerText = span;
                    p.appendChild(_span);
                };

                return p;
            },
            "skill": ({name, description}) => {
                const div = document.createElement("div");
                div.classList.add("card");
        
                const h3 = document.createElement("h3");
                h3.innerText = name;
                div.appendChild(h3);
        
                const p = document.createElement("p");
                p.innerText = description;
                div.appendChild(p);
        
                return div;
            },
            "experience": ({name, description, company, date}) => {
                const card = document.createElement("div");
                card.classList.add("card");
            
                const h3 = document.createElement("h3");
                h3.textContent = name;
                card.appendChild(h3);
            
                const p0 = document.createElement("span");
                p0.innerText = company.name;
                p0.classList.add("element_url");
                p0.onclick = () => {
                    window.config.popup.start(company.url);
                };
                card.append(p0, ` | ${date}`);
            
                const p1 = document.createElement("p");
                p1.innerText = description;
                card.appendChild(p1);
        
                return card;
            },
            "contact": ({label, url}) => {
                const div = document.createElement("div");
                div.classList.add("socials");

                const span = document.createElement("span");
                span.innerText = label;
                span.onclick = () => {
                    window.config.popup.start(url);
                };
                div.appendChild(span);

                return div;
            }
        }
    };
    // Close popup when the cancel button is clicked
    window.config.elements.cancelBtn.addEventListener('click', () => {
        window.config.popup.close();
    });
    // Close popup if the user clicks outside the popup
    window.config.elements.popupOverlay.addEventListener('click', (e) => {
        if (e.target === window.config.elements.popupOverlay) {
            window.config.popup.close();
        };
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
        };
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
        window.config.elements.popup.style.cursor = 'grab';
    });
    window.config.elements.fadeintext.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        Array.from(el.getElementsByTagName("span")).forEach((span, spanindex) => {
            span.style.animationDelay = `${spanindex * 0.2}s`;
        });
    });
});