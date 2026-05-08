document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS ---
    const terminalOutput = document.getElementById('terminal-output');
    const cursorLine = document.getElementById('terminal-cursor-line');
    const terminalInput = document.getElementById('terminal-input');
    const navCommands = document.querySelectorAll('.nav-cmd');
    
    // Mobile Drawer Elements
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    // --- PHASE 2: NAVIGATION & SHELL ---

    function openDrawer() {
        mobileDrawer.classList.remove('-translate-x-full');
        drawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        // Set focus to the close button for accessibility
        setTimeout(() => menuClose.focus(), 300);
    }

    function closeDrawer() {
        mobileDrawer.classList.add('-translate-x-full');
        drawerOverlay.classList.add('opacity-0', 'pointer-events-none');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        menuToggle.focus();
    }

    // Event Listeners for Mobile Drawer
    if (menuToggle) menuToggle.addEventListener('click', openDrawer);
    if (menuClose) menuClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
    
    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.getAttribute('aria-hidden') === 'false') {
            closeDrawer();
        }
    });

    // Smooth Scroll with Header Offset
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 100; // Account for fixed header
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // If on mobile, close drawer after navigating
        if (mobileDrawer.getAttribute('aria-hidden') === 'false') {
            closeDrawer();
        }
    }

    // --- PHASE 3: TERMINAL COMMAND ENGINE ---

    let terminalState = 'idle'; // 'idle' | 'running'

    // Command Registry
    const commandDefinitions = [
        {
            name: 'home',
            aliases: ['cd /home', 'cd ~'],
            description: 'Navigate to start',
            action: () => scrollToSection('home'),
            response: `
                Returning to root directory...<br/>
                <span class="text-surface-tint">drwxr-xr-x</span> 1 rishabh_soni root 4096 May 6 10:00 .<br/>
                <span class="text-surface-tint">drwxr-xr-x</span> 1 rishabh_soni root 4096 May 6 10:00 ..<br/>
                <span class="text-secondary-fixed-dim">-rw-r--r--</span> 1 rishabh_soni root  235 May 6 10:01 bio.txt<br/>
                <span class="text-secondary-fixed-dim">-rw-r--r--</span> 1 rishabh_soni root 1024 May 6 10:02 resume.pdf<br/>
            `
        },
        {
            name: 'about',
            aliases: ['whoami', 'cd about', 'whoami --bio'],
            description: 'Identity profile',
            action: () => scrollToSection('about'),
            response: `
                [INIT] Starting Rishabh_Soni_Identity.sh...<br/>
                [SUCCESS] Core loaded in 12ms.<br/><br/>
                <span class="text-secondary-fixed-dim">USER:</span> Rishabh Soni<br/>
                <span class="text-secondary-fixed-dim">ROLE:</span> Senior Software Engineer<br/>
                <span class="text-secondary-fixed-dim">LOC:</span> San Francisco, CA<br/>
                <span class="text-secondary-fixed-dim">DESC:</span> Crafting high-performance digital ecosystems with a focus on low-latency architectures and retro-futuristic UI/UX design. Obsessed with terminal productivity and distributed systems.<br/><br/>
            `
        },
        {
            name: 'projects',
            aliases: ['cd projects', 'cd /projects', './view_projects.sh'],
            description: 'View project index',
            action: () => scrollToSection('projects'),
            response: `
                Loading active projects...<br/><br/>
                <span class="text-surface-tint">[1] NEURAL_NET_VISUALIZER</span><br/>
                - Desc: Interactive 3D map of neural connections using WebGL & Rust.<br/>
                - Status: <span class="text-surface-tint">ONLINE</span><br/><br/>
                <span class="text-secondary-fixed-dim">[2] QUANTUM_AUTH_SYS</span><br/>
                - Desc: Next-gen biometric authentication gateway.<br/>
                - Status: <span class="text-secondary-fixed-dim">STABLE</span>
            `
        },
        {
            name: 'stack',
            aliases: ['cd stack', 'cd /stack', 'cat package.json'],
            description: 'View technology stack',
            action: () => scrollToSection('stats'),
            response: `
                {<br/>
                &nbsp;&nbsp;<span class="text-surface-tint">"react"</span>: "^18.2.0",<br/>
                &nbsp;&nbsp;<span class="text-surface-tint">"rust"</span>: "cargo-1.70",<br/>
                &nbsp;&nbsp;<span class="text-surface-tint">"aws-sdk"</span>: "^3.0.0",<br/>
                &nbsp;&nbsp;<span class="text-secondary-fixed-dim">"tailwind"</span>: "^3.4.0",<br/>
                &nbsp;&nbsp;<span class="text-secondary-fixed-dim">"docker"</span>: "latest"<br/>
                }
            `
        },
        {
            name: 'experience',
            aliases: ['cd experience', 'cd /experience', 'cat experience.log', 'cat experience'],
            description: 'View timeline',
            action: () => scrollToSection('experience'),
            response: `
                Opening experience log...<br/><br/>
                <span class="text-surface-tint">[LATEST ENTRY]</span><br/>
                Company: Tech_Corp Global<br/>
                Role: Lead Systems Architect<br/>
                Status: <span class="text-surface-tint">ACTIVE</span>
            `
        },
        {
            name: 'contact',
            aliases: ['cd contact', 'cd /contact', 'ssh contact'],
            description: 'Open contact channel',
            action: () => scrollToSection('contact'),
            response: `
                Establishing secure connection... <span class="text-surface-tint">SUCCESS</span><br/><br/>
                <span class="text-secondary-fixed-dim">EMAIL:</span> hello@rishabhsoni.dev<br/>
                <span class="text-secondary-fixed-dim">GITHUB:</span> github.com/rishabhsoni<br/>
                <span class="text-secondary-fixed-dim">LINKEDIN:</span> linkedin.com/in/rishabhsoni<br/><br/>
                Awaiting transmission...
            `
        },
        {
            name: 'clear',
            aliases: ['cls'],
            description: 'Clear terminal output',
            action: () => {
                while (terminalOutput.firstChild) {
                    terminalOutput.removeChild(terminalOutput.firstChild);
                }
            },
            response: null
        },
        {
            name: 'help',
            aliases: ['ls'],
            description: 'List all available commands',
            action: () => {},
            response: () => {
                let res = `AVAILABLE COMMANDS:<br/>`;
                commandDefinitions.forEach(c => {
                    const paddedName = c.name.padEnd(12, '&nbsp;');
                    res += `<span class="text-surface-tint">${paddedName}</span> - ${c.description}<br/>`;
                });
                return res;
            }
        }
    ];

    // Command Lookup Layer
    const commandMap = new Map();
    commandDefinitions.forEach(cmd => {
        commandMap.set(cmd.name, cmd);
        cmd.aliases.forEach(alias => commandMap.set(alias, cmd));
    });

    // --- TERMINAL UI LOGIC ---

    function getTimeStamp() {
        const now = new Date();
        return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    }

    function printCommand(commandText) {
        const cmdDiv = document.createElement('div');
        cmdDiv.className = 'flex gap-sm mt-sm';
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'text-surface-tint';
        promptSpan.textContent = '➜';
        
        const cmdSpan = document.createElement('span');
        cmdSpan.className = 'text-on-surface flex-1';
        cmdSpan.textContent = '~ ' + commandText;
        
        cmdDiv.appendChild(promptSpan);
        cmdDiv.appendChild(cmdSpan);
        
        terminalOutput.appendChild(cmdDiv);
        scrollToBottom();
    }

    function typeWriter(element, htmlContent, speed, callback) {
        element.innerHTML = '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        const nodes = Array.from(tempDiv.childNodes);
        
        function processNode(node, parent, onComplete) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                let i = 0;
                function typeChar() {
                    if (i < text.length) {
                        parent.appendChild(document.createTextNode(text.charAt(i)));
                        i++;
                        scrollToBottom();
                        setTimeout(typeChar, speed);
                    } else {
                        onComplete();
                    }
                }
                typeChar();
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const newElem = document.createElement(node.tagName);
                Array.from(node.attributes).forEach(attr => newElem.setAttribute(attr.name, attr.value));
                parent.appendChild(newElem);
                
                const children = Array.from(node.childNodes);
                let childIdx = 0;
                
                function nextChild() {
                    if (childIdx < children.length) {
                        processNode(children[childIdx], newElem, () => {
                            childIdx++;
                            nextChild();
                        });
                    } else {
                        onComplete();
                    }
                }
                nextChild();
            } else {
                onComplete();
            }
        }
        
        let rootIdx = 0;
        function nextRoot() {
            if (rootIdx < nodes.length) {
                processNode(nodes[rootIdx], element, () => {
                    rootIdx++;
                    nextRoot();
                });
            } else {
                if (callback) callback();
            }
        }
        nextRoot();
    }

    function printResponse(htmlContent, disableTyping = false, onComplete = null) {
        if (!htmlContent) {
            if (onComplete) onComplete();
            return; // For commands like 'clear'
        }
        
        const contentStr = typeof htmlContent === 'function' ? htmlContent() : htmlContent;
        
        const responseDiv = document.createElement('div');
        responseDiv.className = 'text-on-surface-variant pl-md mb-md mt-sm';
        
        const timeStamp = `<span class="text-secondary-fixed-dim">${getTimeStamp()}</span> `;
        
        terminalOutput.appendChild(responseDiv);
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion || disableTyping) {
            responseDiv.innerHTML = timeStamp + contentStr;
            scrollToBottom();
            if (onComplete) onComplete();
        } else {
            typeWriter(responseDiv, timeStamp + contentStr, 5, onComplete); // 5ms per char
        }
    }

    function scrollToBottom() {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Input reliability
    function normalizeCommand(input) {
        return input.trim().toLowerCase();
    }

    // Handle command execution
    function executeCommand(inputString) {
        if (terminalState === 'running') return;
        
        const typedCommand = inputString.trim();
        if (typedCommand === '') return;
        
        terminalState = 'running';
        const lowerCmd = normalizeCommand(inputString);
        
        // Command Map Lookup Layer
        const matchedCommand = commandMap.get(lowerCmd);
        
        printCommand(typedCommand);
        
        if (matchedCommand) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const delay = prefersReducedMotion ? 0 : 300;
            
            setTimeout(() => {
                printResponse(matchedCommand.response, false, () => {
                    if (matchedCommand.action) {
                        matchedCommand.action();
                    }
                    terminalState = 'idle';
                });
            }, delay);
        } else {
            // Unknown command fallback
            printResponse(`Command not found: ${typedCommand}. Type <span class="text-surface-tint">help</span> for available commands.`, false, () => {
                terminalState = 'idle';
            });
        }
    }

    // Attach text input listener
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const typed = terminalInput.value;
                if (terminalState !== 'running') {
                    terminalInput.value = ''; // clear input
                    executeCommand(typed);
                }
            }
        });

        // Auto focus back on terminal click
        terminalOutput.addEventListener('click', () => {
            terminalInput.focus();
        });

        // Trigger boot sequence animation
        const initialTerminalBlock = document.getElementById('initial-terminal-block');
        if (initialTerminalBlock) {
            const html = initialTerminalBlock.innerHTML;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            terminalState = 'running';
            if (!prefersReducedMotion) {
                initialTerminalBlock.innerHTML = '';
                typeWriter(initialTerminalBlock, html, 5, () => {
                    terminalInput.focus();
                    terminalState = 'idle';
                });
            } else {
                terminalState = 'idle';
            }
        }
    }

    // Attach click listeners to all elements with data-command attribute
    navCommands.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const commandKey = button.getAttribute('data-command');
            executeCommand(commandKey);
        });
    });

    // --- PHASE 4/5/6: RENDER CONTENT FROM DATA MODEL ---

    function renderAboutSection() {
        const container = document.getElementById('about-container');
        if (!container || typeof portfolioData === 'undefined') return;

        const { profile, skills } = portfolioData;

        // Render Bio
        const bioHtml = `
            <div class="md:col-span-5 space-y-md">
                <div class="font-headline-lg text-headline-lg text-surface-tint mb-sm">${profile.name}</div>
                <div class="font-code-sm text-code-sm text-secondary-fixed-dim uppercase mb-lg">&lt; ${profile.role} &gt;</div>
                <p class="font-code-sm text-code-sm text-on-surface leading-relaxed border-l-2 border-surface-tint pl-md">
                    ${profile.summary}
                </p>
                <div class="flex items-center gap-sm mt-md font-code-sm text-code-sm text-on-surface-variant">
                    <span class="material-symbols-outlined text-sm">location_on</span>
                    ${profile.location}
                </div>
            </div>
        `;

        // Render Skills
        let skillsHtml = '<div class="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-md">';
        skills.forEach(skillGroup => {
            skillsHtml += `
                <div class="premium-card p-md group">
                    <h4 class="font-label-caps text-label-caps text-secondary-fixed-dim mb-sm uppercase group-hover:text-surface-tint transition-colors">${skillGroup.category}</h4>
                    <ul class="space-y-xs font-code-sm text-[12px] text-on-surface">
                        ${skillGroup.items.map(item => `<li><span class="text-surface-tint mr-xs opacity-50 group-hover:opacity-100">»</span>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        skillsHtml += '</div>';

        container.innerHTML = bioHtml + skillsHtml;
    }

    function renderProjectsSection() {
        const container = document.getElementById('projects-container');
        if (!container || typeof portfolioData === 'undefined') return;

        const { projects } = portfolioData;

        // Separate featured from others
        const featuredProject = projects.find(p => p.featured);
        const otherProjects = projects.filter(p => !p.featured);

        let html = '';

        if (featuredProject) {
            html += `
                <div class="premium-card relative group overflow-hidden h-[400px] mb-lg">
                    <img class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 grayscale" alt="${featuredProject.imageAlt || featuredProject.title}" src="${featuredProject.imageUrl || ''}" loading="lazy"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent p-lg flex flex-col justify-end">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
                            <div>
                                <span class="text-surface-tint font-label-caps text-label-caps mb-xs uppercase">/FEATURED_PROJECT</span>
                                <h3 class="font-headline-lg text-headline-lg text-white uppercase mb-sm">${featuredProject.title}</h3>
                                <p class="text-on-surface-variant font-code-sm max-w-2xl mb-md">${featuredProject.description}</p>
                                <div class="flex gap-sm flex-wrap">
                                    ${featuredProject.stack.map(tech => `<span class="border border-secondary-fixed-dim px-sm py-xs font-code-sm text-[10px] text-secondary-fixed-dim uppercase">${tech}</span>`).join('')}
                                </div>
                            </div>
                            <div class="flex gap-md shrink-0">
                                <a href="${featuredProject.githubUrl}" class="text-link font-code-sm text-sm uppercase outline-none">GITHUB →</a>
                                <a href="${featuredProject.liveUrl}" class="text-link font-code-sm text-sm uppercase outline-none text-surface-tint hover:text-surface-tint">VIEW LIVE →</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-lg">';
        otherProjects.forEach(project => {
            html += `
                <article class="premium-card p-lg relative group flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-start mb-sm">
                            <span class="text-secondary-fixed-dim font-label-caps text-label-caps uppercase">/${project.id.replace('-', '_')}</span>
                            ${project.icon ? `<span class="material-symbols-outlined text-outline-variant group-hover:text-surface-tint transition-colors">${project.icon}</span>` : ''}
                        </div>
                        <h3 class="font-headline-lg text-[24px] leading-tight text-white uppercase mb-sm">${project.title}</h3>
                        <p class="text-on-surface-variant font-code-sm mb-md">${project.description}</p>
                    </div>
                    <div class="mt-lg">
                        <div class="flex gap-sm mb-md flex-wrap">
                            ${project.stack.map(tech => `<span class="border border-secondary-fixed-dim px-sm py-xs font-code-sm text-[10px] text-secondary-fixed-dim uppercase">${tech}</span>`).join('')}
                        </div>
                        <div class="flex gap-md border-t border-outline-variant/30 pt-md mt-auto">
                            <a href="${project.githubUrl}" class="text-link font-code-sm text-[12px] uppercase outline-none">GITHUB →</a>
                            <a href="${project.liveUrl}" class="text-link font-code-sm text-[12px] uppercase outline-none text-surface-tint hover:text-surface-tint">VIEW LIVE →</a>
                        </div>
                    </div>
                </article>
            `;
        });
        html += '</div>';

        container.innerHTML = html;
    }

    function renderExperienceSection() {
        const container = document.getElementById('experience-container');
        if (!container || typeof portfolioData === 'undefined') return;

        const { experience } = portfolioData;
        let html = '';

        experience.forEach(exp => {
            html += `
                <div class="relative group">
                    <div class="absolute -left-[calc(1.5rem+8px)] md:-left-[calc(2rem+8px)] top-1 w-4 h-4 bg-background border-2 border-surface-tint rounded-full group-hover:bg-surface-tint group-hover:shadow-[0_0_10px_rgba(0,255,136,0.8)] transition-all duration-300"></div>
                    <div class="premium-card p-md md:p-lg">
                        <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-sm gap-sm">
                            <div>
                                <h3 class="font-headline-lg text-[20px] text-surface-tint uppercase mb-xs">${exp.company}</h3>
                                <div class="font-code-sm text-secondary-fixed-dim uppercase">${exp.role}</div>
                            </div>
                            <time class="font-code-sm text-[12px] text-muted whitespace-nowrap bg-background px-sm py-xs border border-outline-variant">
                                ${exp.startDate} — ${exp.endDate}
                            </time>
                        </div>
                        <ul class="space-y-sm font-code-sm text-on-surface mt-md">
                            ${exp.description.map(desc => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-surface-tint opacity-50 mt-[2px] shrink-0">»</span>
                                    <span>${desc}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Initialize content rendering
    renderAboutSection();
    renderProjectsSection();
    renderExperienceSection();

    // --- PHASE 1 POLISH: FOOTER ---
    function renderFooter() {
        const copyright = document.getElementById('footer-copyright');
        const socialsContainer = document.getElementById('footer-socials');
        if (!copyright || !socialsContainer || typeof portfolioData === 'undefined') return;

        const year = new Date().getFullYear();
        copyright.innerHTML = `© ${year} ${portfolioData.profile.name.toUpperCase()}. ALL RIGHTS RESERVED.`;

        const { socials } = portfolioData.profile;
        let socialsHtml = '';
        if (socials.github) socialsHtml += `<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary-fixed-dim transition-colors duration-300 cursor-pointer uppercase" href="${socials.github}">GITHUB</a>`;
        if (socials.linkedin) socialsHtml += `<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary-fixed-dim transition-colors duration-300 cursor-pointer uppercase" href="${socials.linkedin}">LINKEDIN</a>`;
        if (socials.x) socialsHtml += `<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary-fixed-dim transition-colors duration-300 cursor-pointer uppercase" href="${socials.x}">X_CORP</a>`;

        socialsContainer.innerHTML = socialsHtml;
    }
    renderFooter();

    // --- PHASE 8: CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    const contactSubmit = document.getElementById('contact-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            contactStatus.classList.remove('hidden', 'text-surface-tint', 'text-danger', 'text-warning', 'text-secondary-fixed-dim');
            
            if (!name || !email || !message) {
                contactStatus.classList.add('text-danger');
                contactStatus.textContent = '[ERROR] Missing required parameters. Transmission aborted.';
                return;
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                contactStatus.classList.add('text-danger');
                contactStatus.textContent = '[ERROR] Invalid return address format.';
                return;
            }

            // Simulated Submission State
            contactSubmit.disabled = true;
            contactSubmit.textContent = 'TRANSMITTING...';
            contactStatus.classList.add('text-secondary-fixed-dim');
            contactStatus.textContent = 'Establishing secure handshake...';

            setTimeout(() => {
                contactStatus.textContent = 'Encrypting payload...';
                
                setTimeout(() => {
                    // Success state
                    contactSubmit.disabled = false;
                    contactSubmit.textContent = 'TRANSMIT_PAYLOAD';
                    
                    window.location.href = `mailto:${portfolioData.profile.email}?subject=Contact from Portfolio&body=${encodeURIComponent(message)}%0A%0AFrom: ${name} <${email}>`;
                    
                    contactForm.reset();
                    
                    contactStatus.classList.remove('text-secondary-fixed-dim', 'text-warning', 'text-danger');
                    contactStatus.classList.add('text-surface-tint');
                    contactStatus.textContent = '[SUCCESS] Transmission confirmed. Mail client launched.';
                }, 800);
            }, 600);
        });
    }

    // --- PHASE 10: SCROLL ANIMATION OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!prefersReducedMotion) {
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                } else {
                    entry.target.classList.remove('opacity-0');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Skip home section as it's above the fold
        if (section.id !== 'home') {
            if (!prefersReducedMotion) {
                section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
            } else {
                section.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            }
            sectionObserver.observe(section);
        }
    });

    // --- PHASE 1 POLISH: NAV ACTIVE OBSERVER & BACK-TO-TOP ---
    const activeNavObserver = new IntersectionObserver((entries) => {
        let activeSectionId = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSectionId = entry.target.id;
            }
        });

        if (activeSectionId) {
            navCommands.forEach(link => {
                const command = link.getAttribute('data-command');
                const sectionCommandMap = {
                    'home': 'home',
                    'about': 'whoami',
                    'stats': 'stack',
                    'projects': 'projects',
                    'experience': 'experience',
                    'contact': 'contact'
                };
                
                if (sectionCommandMap[activeSectionId] === command) {
                    if (link.closest('#mobile-drawer')) {
                        link.classList.remove('text-on-surface');
                        link.classList.add('bg-surface-tint', 'text-black', 'shadow-[0_0_20px_rgba(2,230,0,0.5)]');
                    } else {
                        link.classList.remove('text-on-surface-variant');
                        link.classList.add('text-primary-fixed-dim');
                    }
                } else {
                    if (link.closest('#mobile-drawer')) {
                        link.classList.remove('bg-surface-tint', 'text-black', 'shadow-[0_0_20px_rgba(2,230,0,0.5)]');
                        link.classList.add('text-on-surface');
                    } else {
                        link.classList.remove('text-primary-fixed-dim');
                        link.classList.add('text-on-surface-variant');
                    }
                }
            });
        }
    }, { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" });

    document.querySelectorAll('section[id]').forEach(section => {
        activeNavObserver.observe(section);
    });

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            scrollToSection('home');
        });
    }

});
