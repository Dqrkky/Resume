document.addEventListener("DOMContentLoaded", async () => {
    window.config = Object.assign(window.config, {
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
        ]
    });
    window.config.about.forEach((item, index) => {
        window.config.elements.about.appendChild(window.config.createCard.about(item, index));
    });
    window.config.elements.skills.getElementsByClassName("skills")[0].appendChild(window.config.createCard.skill({
        name: "JavaScript",
        description: "Probably the most used languege in every project"
    }));
    // window.config.elements.projects.getElementsByClassName("projects")[0].appendChild(window.config.createCard.skill({
    //     name: "JavaScript",
    //     description: "Probably the most used languege in every project"
    // }));
    window.config.elements.experience.getElementsByClassName("experience")[0].appendChild(window.config.createCard.experience({
        name: "Backend Developer",
        description: "My own little company for open source and tinkering!!",
        company: {
            name: "@UnDentified-Network",
            url: "https://github.com/UnDentified-Network"
        },
        date: "Aug 21, 2024"
    }));
    window.config.contact.forEach((contact) => {
        window.config.elements.contact.getElementsByClassName("card")[0].appendChild(window.config.createCard.contact(contact));
    });
    window.config.elements.copyright.textContent = `© ${window.config.date.getFullYear()} ${window.config.username}.\nAll rights reserved.`;
});