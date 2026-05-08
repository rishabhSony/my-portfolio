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
            description: 'Learn about me',
            action: () => scrollToSection('about'),
            response: () => `
                [INIT] Starting Identity.sh...<br/>
                [SUCCESS] Core loaded in 12ms.<br/><br/>
                <span class="text-secondary-fixed-dim">USER:</span> ${portfolioData.profile.fullName}<br/>
                <span class="text-secondary-fixed-dim">ROLE:</span> ${portfolioData.profile.currentRole}<br/>
                <span class="text-secondary-fixed-dim">LOC:</span> ${portfolioData.profile.location}<br/><br/>
                <span class="text-surface-tint">SPECIALIZATIONS:</span><br/>
                &nbsp;&nbsp;• Building AI-powered applications<br/>
                &nbsp;&nbsp;• LLM integration and prompt engineering<br/>
                &nbsp;&nbsp;• RAG pipelines and vector search systems<br/>
                &nbsp;&nbsp;• AI agents, automation, and workflow tools<br/>
                &nbsp;&nbsp;• Full-stack AI product development<br/>
            `
        },
        {
            name: 'projects',
            aliases: ['cd projects', 'cd /projects', './view_projects.sh'],
            description: 'View AI projects',
            action: () => scrollToSection('projects'),
            response: () => `
                Loading active projects...<br/><br/>
                ${portfolioData.projects.map((p, i) => `
                <span class="${p.featured ? 'text-surface-tint' : 'text-secondary-fixed-dim'}">[${i + 1}] ${p.name.toUpperCase()}</span><br/>
                - ${p.description}<br/>
                - Status: <span class="${p.featured ? 'text-surface-tint' : 'text-secondary-fixed-dim'}">${p.featured ? 'FEATURED' : 'ONLINE'}</span><br/><br/>
                `).join('')}
            `
        },
        {
            name: 'stack',
            aliases: ['skills', 'cd stack', 'cd /stack', 'cat package.json'],
            description: 'View AI engineering stack',
            action: () => scrollToSection('stats'),
            response: () => {
                let res = `[AI ENGINEERING STACK]:<br/><br/>`;
                portfolioData.skills.forEach(cat => {
                    res += `<span class="text-surface-tint">${cat.category.toUpperCase()}</span><br/>`;
                    cat.items.forEach(item => {
                        res += `&nbsp;&nbsp;<span class="text-secondary-fixed-dim">├─</span> ${item}<br/>`;
                    });
                    res += `<br/>`;
                });
                return res;
            }
        },
        {
            name: 'experience',
            aliases: ['cd experience', 'cd /experience', 'cat experience.log', 'cat experience'],
            description: 'View roles & responsibilities',
            action: () => scrollToSection('experience'),
            response: () => {
                const exp = portfolioData.experience[0];
                if (!exp) return 'No experience data found.';
                let res = `Opening experience log...<br/><br/>`;
                res += `<span class="text-surface-tint">[${exp.role.toUpperCase()}]</span> — ${exp.startDate} to ${exp.endDate}<br/><br/>`;
                exp.achievements.forEach(a => {
                    res += `&nbsp;&nbsp;<span class="text-secondary-fixed-dim">✓</span> ${a}<br/>`;
                });
                return res;
            }
        },
        {
            name: 'contact',
            aliases: ['cd contact', 'cd /contact', 'ssh contact'],
            description: 'Get in touch',
            action: () => scrollToSection('contact'),
            response: () => `
                Establishing secure connection... <span class="text-surface-tint">SUCCESS</span><br/><br/>
                <span class="text-secondary-fixed-dim">EMAIL:</span> ${portfolioData.profile.email}<br/>
                <span class="text-secondary-fixed-dim">GITHUB:</span> ${portfolioData.profile.socials.github}<br/>
                <span class="text-secondary-fixed-dim">LINKEDIN:</span> ${portfolioData.profile.socials.linkedin}<br/><br/>
                Awaiting transmission...
            `
        },
        {
            name: 'resume',
            aliases: ['cv', 'download resume'],
            description: 'Download my resume',
            action: () => {
                window.open('resume.pdf', '_blank');
            },
            response: `Downloading resume.pdf...<br/><span class="text-surface-tint">[OK]</span> Opening in new tab.`
        },
        {
            name: 'socials',
            aliases: ['social', 'links'],
            description: 'Connect with me',
            action: () => { },
            response: () => `
                <span class="text-surface-tint">[SOCIAL LINKS]</span><br/><br/>
                <span class="text-secondary-fixed-dim">GITHUB:</span> ${portfolioData.profile.socials.github}<br/>
                <span class="text-secondary-fixed-dim">LINKEDIN:</span> ${portfolioData.profile.socials.linkedin}<br/>
                <span class="text-secondary-fixed-dim">X/TWITTER:</span> ${portfolioData.profile.socials.x}<br/>
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
            action: () => { },
            response: () => {
                let res = `AVAILABLE COMMANDS:<br/>`;
                commandDefinitions.forEach(c => {
                    const paddedName = c.name.padEnd(12, '&nbsp;');
                    res += `<span class="text-surface-tint">${paddedName}</span> - ${c.description}<br/>`;
                });
                return res;
            }
        },
        {
            name: 'itsm',
            aliases: ['project itsm', 'nextgen'],
            description: 'View Next-Gen ITSM project',
            action: () => scrollToSection('projects'),
            response: () => {
                const p = portfolioData.projects.find(p => p.slug === 'nextgen-itsm');
                if (!p) return 'Project not found.';
                return `
                Loading project: ${p.name}...<br/>
                Architecture: ${p.architecture ? p.architecture.join(' → ') : ''}<br/>
                Focus: Agentic automation, Zero Trust, and secure tool-calling.<br/>
                `;
            }
        },
        {
            name: 'cloudflow',
            aliases: ['project cloudflow'],
            description: 'View CloudFlow Analytics project',
            action: () => scrollToSection('projects'),
            response: () => {
                const p = portfolioData.projects.find(p => p.slug === 'cloudflow-analytics');
                if (!p) return 'Project not found.';
                return `
                Loading project: ${p.name}...<br/>
                Pipeline: ${p.architecture ? p.architecture.join(' → ') : ''}<br/>
                Focus: raw network data to visualization and security analytics.<br/>
                `;
            }
        },
        {
            name: 'aws',
            aliases: [],
            description: 'View AWS services used',
            action: () => { },
            response: () => {
                const awsServices = [];
                portfolioData.projects.forEach(p => {
                    if (p.techStack) {
                        p.techStack.forEach(t => {
                            if ((t.startsWith('Amazon') || t.startsWith('AWS') || t.startsWith('SageMaker') || t === 'IAM' || t === 'JupyterLab') && !awsServices.includes(t)) {
                                awsServices.push(t);
                            }
                        });
                    }
                });
                return `
                <span class="text-surface-tint">[AWS SERVICES ACROSS PROJECTS]</span><br/>
                ${awsServices.map(s => `<span class="text-secondary-fixed-dim">├─</span> ${s}`).join('<br/>')}
                `;
            }
        },
        {
            name: 'genai',
            aliases: ['project genai'],
            description: 'View GenAI App project',
            action: () => scrollToSection('projects'),
            response: () => {
                const p = portfolioData.projects.find(p => p.slug === 'enterprise-generative-ai-aws');
                if (!p) return 'Project not found.';
                return `
                Loading project: ${p.name}...<br/>
                Flow: S3 → CloudFront → API Gateway → Lambda → SageMaker Endpoint<br/>
                Focus: serverless AI inference and enterprise prompt-based generation.<br/>
                `;
            }
        },
        {
            name: 'ai',
            aliases: [],
            description: 'View GenAI architecture',
            action: () => { },
            response: () => {
                const p = portfolioData.projects.find(p => p.slug === 'enterprise-generative-ai-aws');
                if (!p) return 'Project not found.';
                return `
                [GENAI ARCHITECTURE]:<br/>
                ${p.architecture.join(' → ')}
                `;
            }
        },
        {
            name: 'sagemaker',
            aliases: [],
            description: 'View SageMaker stack',
            action: () => { },
            response: () => {
                return `
                SageMaker stack:<br/>
                - SageMaker Studio<br/>
                - JupyterLab<br/>
                - SageMaker Endpoint<br/>
                - SageMaker Runtime<br/>
                - Lambda integration through boto3
                `;
            }
        },
        {
            name: 'lex',
            aliases: [],
            description: 'View AWS Lex GenAI Voice Chatbot project',
            action: () => scrollToSection('projects'),
            response: () => {
                const p = portfolioData.projects.find(p => p.slug === 'readers-are-leaders-lex-genai-chatbot');
                if (!p) return 'Project not found.';
                return `
                Loading project: ${p.name}...<br/>
                Flow: Web UI → Cognito → Lex → Lambda → SageMaker Endpoint<br/>
                Focus: conversational AI chatbot with text and voice interaction.<br/>
                `;
            }
        },
        {
            name: 'chatbot',
            aliases: [],
            description: 'View Chatbot Architecture',
            action: () => scrollToSection('projects'),
            response: () => {
                const p = portfolioData.projects.find(p => p.slug === 'readers-are-leaders-lex-genai-chatbot');
                if (!p) return 'Project not found.';
                return `
                [CHATBOT ARCHITECTURE]:<br/>
                ${p.architecture.join(' → ')}
                `;
            }
        },
        {
            name: 'readers',
            aliases: ['project readers'],
            description: 'Scroll to AWS Lex GenAI Voice Chatbot project',
            action: () => scrollToSection('projects'),
            response: () => {
                return `Navigating to AWS Lex GenAI Voice Chatbot project...`;
            }
        },
        {
            name: 'voicebot',
            aliases: [],
            description: 'View Voicebot features',
            action: () => { },
            response: () => {
                return `
                Voice mode enabled through Amazon Lex language settings.<br/>
                Voice: Joanna for English responses.<br/>
                Purpose: allow users to interact with the chatbot using voice output.
                `;
            }
        },
        {
            name: 'langchain',
            aliases: [],
            description: 'View LangChain integration',
            action: () => { },
            response: () => {
                return `LangChain was packaged as a Python 3.9 Lambda layer and attached to the Lambda fulfillment function.`;
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
                <div class="font-headline-lg text-headline-lg text-surface-tint mb-sm">${profile.fullName}</div>
                <div class="font-code-sm text-code-sm text-secondary-fixed-dim uppercase mb-lg">&lt; ${profile.currentRole} &gt;</div>
                <p class="font-code-sm text-code-sm text-on-surface leading-relaxed border-l-2 border-surface-tint pl-md">
                    ${profile.shortBio}
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
            const hasLinks = featuredProject.githubUrl || featuredProject.liveUrl;
            const githubAttr = featuredProject.githubUrl ? `href="${featuredProject.githubUrl}"` : 'disabled aria-disabled="true"';
            const liveAttr = featuredProject.liveUrl ? `href="${featuredProject.liveUrl}"` : 'disabled aria-disabled="true"';

            html += `
                <article class="premium-card relative group overflow-hidden mb-lg flex flex-col">
                    <div class="p-lg flex flex-col justify-between h-full bg-surface-container-low/80">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-start gap-lg w-full">
                            <div class="flex-1">
                                <div class="flex gap-sm items-center mb-sm">
                                    <span class="text-surface-tint font-label-caps text-label-caps uppercase bg-surface-tint/10 px-xs py-unit border border-surface-tint/30">/FEATURED_PROJECT</span>
                                    <span class="text-secondary-fixed-dim font-code-sm text-[12px] uppercase">${featuredProject.category}</span>
                                </div>
                                <h3 class="font-headline-lg text-[28px] text-white uppercase mb-sm leading-tight">${featuredProject.name}</h3>
                                <p class="text-on-surface font-code-sm max-w-3xl mb-md">${featuredProject.longDescription || featuredProject.description}</p>
                                <div class="flex gap-sm flex-wrap mb-md">
                                    ${featuredProject.techStack.map(tech => `<span class="border border-secondary-fixed-dim px-sm py-xs font-code-sm text-[10px] text-secondary-fixed-dim uppercase">${tech}</span>`).join('')}
                                </div>
                                ${featuredProject.highlights ? `
                                <div class="mb-md">
                                    <h4 class="font-label-caps text-secondary-fixed-dim mb-xs uppercase">Highlights</h4>
                                    <ul class="space-y-xs font-code-sm text-[13px] text-on-surface">
                                        ${featuredProject.highlights.map(hl => `<li><span class="text-surface-tint opacity-50 mr-xs">»</span>${hl}</li>`).join('')}
                                    </ul>
                                </div>
                                ` : ''}
                                ${featuredProject.architecture ? `
                                <div class="mt-md border border-outline-variant/50 bg-background/50 p-md rounded-none">
                                    <h4 class="font-label-caps text-secondary-fixed-dim mb-sm">ARCHITECTURE FLOW</h4>
                                    <div class="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-sm font-code-sm text-[12px] text-on-surface-variant">
                                        ${featuredProject.architecture.map((step, idx) => `
                                            <span class="flex items-center gap-sm">
                                                <span class="text-white">${step}</span>
                                                ${idx < featuredProject.architecture.length - 1 ? '<span class="text-surface-tint hidden md:inline">→</span><span class="text-surface-tint md:hidden">↓</span>' : ''}
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>
                                ` : ''}
                                ${featuredProject.useCases ? `
                                <div class="mt-md border border-outline-variant/50 bg-background/50 p-md rounded-none">
                                    <h4 class="font-label-caps text-surface-tint mb-sm">ANALYTICS USE CASES</h4>
                                    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xs font-code-sm text-[12px] text-on-surface">
                                        ${featuredProject.useCases.map(uc => `<li><span class="text-secondary-fixed-dim mr-xs">»</span>${uc}</li>`).join('')}
                                    </ul>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        <div class="flex gap-md shrink-0 mt-lg border-t border-outline-variant/30 pt-md">
                            <a ${githubAttr} class="text-link font-code-sm text-sm uppercase outline-none ${featuredProject.githubUrl ? 'hover:text-surface-tint' : 'text-muted cursor-not-allowed'}">${featuredProject.githubUrl ? 'GITHUB →' : 'GITHUB (COMING SOON)'}</a>
                            <a ${liveAttr} class="text-link font-code-sm text-sm uppercase outline-none ${featuredProject.liveUrl ? 'text-surface-tint hover:text-white' : 'text-muted cursor-not-allowed'}">${featuredProject.liveUrl ? 'VIEW LIVE →' : 'LIVE (COMING SOON)'}</a>
                            ${featuredProject.details ? `<button class="view-details-btn text-link font-code-sm text-sm uppercase outline-none text-surface-tint hover:text-white ml-auto" data-slug="${featuredProject.slug}">VIEW DETAILS →</button>` : ''}
                        </div>
                    </div>
                </article>
            `;
        }

        html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-lg">';
        otherProjects.forEach(project => {
            html += `
                <article class="premium-card p-lg relative group flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-start mb-sm">
                            <span class="text-secondary-fixed-dim font-label-caps text-label-caps uppercase">/${project.slug.replace(/-/g, '_')}</span>
                        </div>
                        <h3 class="font-headline-lg text-[24px] leading-tight text-white uppercase mb-sm">${project.name}</h3>
                        <p class="text-on-surface-variant font-code-sm mb-md">${project.description}</p>
                    </div>
                    <div class="mt-lg">
                        ${project.highlights ? `
                        <div class="mb-md">
                            <h4 class="font-label-caps text-secondary-fixed-dim mb-xs uppercase">Highlights</h4>
                            <ul class="space-y-xs font-code-sm text-[11px] text-on-surface">
                                ${project.highlights.map(hl => `<li><span class="text-surface-tint opacity-50 mr-xs">»</span>${hl}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        ${project.architecture ? `
                        <div class="mb-md border border-outline-variant/30 bg-background/30 p-sm rounded-none">
                            <h4 class="font-label-caps text-[10px] text-secondary-fixed-dim mb-xs uppercase">Architecture Flow</h4>
                            <div class="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-xs font-code-sm text-[10px] text-on-surface-variant">
                                ${project.architecture.map((step, idx) => `
                                    <span class="flex items-center gap-xs">
                                        <span class="text-white">${step}</span>
                                        ${idx < project.architecture.length - 1 ? '<span class="text-surface-tint hidden md:inline">→</span><span class="text-surface-tint md:hidden">↓</span>' : ''}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        <div class="flex gap-sm mb-md flex-wrap">
                            ${project.techStack.map(tech => `<span class="border border-secondary-fixed-dim px-sm py-xs font-code-sm text-[10px] text-secondary-fixed-dim uppercase">${tech}</span>`).join('')}
                        </div>
                        <div class="flex gap-md border-t border-outline-variant/30 pt-md mt-auto">
                            <a ${project.githubUrl && project.githubUrl !== '#' ? `href="${project.githubUrl}"` : 'disabled aria-disabled="true"'} class="text-link font-code-sm text-[12px] uppercase outline-none ${project.githubUrl && project.githubUrl !== '#' ? '' : 'text-muted cursor-not-allowed'}">${project.githubUrl && project.githubUrl !== '#' ? 'GITHUB →' : 'GITHUB (N/A)'}</a>
                            <a ${project.liveUrl && project.liveUrl !== '#' ? `href="${project.liveUrl}"` : 'disabled aria-disabled="true"'} class="text-link font-code-sm text-[12px] uppercase outline-none ${project.liveUrl && project.liveUrl !== '#' ? 'text-surface-tint hover:text-white' : 'text-muted cursor-not-allowed'}">${project.liveUrl && project.liveUrl !== '#' ? 'VIEW LIVE →' : 'LIVE (N/A)'}</a>
                            ${project.details ? `<button class="view-details-btn text-link font-code-sm text-[12px] uppercase outline-none text-surface-tint hover:text-white ml-auto" data-slug="${project.slug}">VIEW DETAILS →</button>` : ''}
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
                            ${(exp.achievements || []).map(desc => `
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
        copyright.innerHTML = `© ${year} ${portfolioData.profile.fullName.toUpperCase()}. ALL RIGHTS RESERVED.`;

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

    // --- PHASE 11: PROJECT DETAILS MODAL ---
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCategory = document.getElementById('modal-project-category');
    const modalFooter = document.getElementById('modal-footer');

    if (projectModal && typeof portfolioData !== 'undefined') {
        // Attach event listeners for open buttons
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.view-details-btn')) {
                const btn = e.target.closest('.view-details-btn');
                const slug = btn.getAttribute('data-slug');
                const project = portfolioData.projects.find(p => p.slug === slug);
                if (project && project.details) {
                    openProjectModal(project);
                }
            }
        });

        closeModalBtn.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.hasAttribute('open')) {
                closeProjectModal();
            }
        });

        function openProjectModal(project) {
            modalCategory.textContent = `/${project.category.replace(/ /g, '_').toUpperCase()}`;

            // Build Content
            let html = `
                <div class="mb-xl">
                    <h2 class="font-headline-lg text-3xl md:text-4xl text-white uppercase mb-sm leading-tight">${project.name}</h2>
                    <p class="text-on-surface-variant font-code-sm text-base md:text-lg">${project.longDescription || project.description}</p>
                </div>
            `;

            if (project.details.problemStatement) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/PROBLEM_STATEMENT</h3>
                        <p class="text-on-surface">${project.details.problemStatement}</p>
                    </div>
                `;
            }

            if (project.architecture) {
                html += `
                    <div class="mb-lg p-md bg-background border border-outline-variant">
                        <h3 class="font-label-caps text-secondary-fixed-dim uppercase mb-md">/ARCHITECTURE_FLOW</h3>
                        <div class="flex flex-col gap-xs font-code-sm">
                            ${project.architecture.map((step, idx) => `
                                <div class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim shrink-0">[${String(idx + 1).padStart(2, '0')}]</span>
                                    <span class="text-white">${step}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            if (project.techStack) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/AWS_SERVICES_&_STACK</h3>
                        <div class="flex flex-wrap gap-sm">
                            ${project.techStack.map(tech => `<span class="border border-secondary-fixed-dim px-sm py-xs font-code-sm text-[12px] text-secondary-fixed-dim uppercase">${tech}</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            if (project.details.dataPipelineSteps) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/DATA_PIPELINE_STEPS</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.dataPipelineSteps.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.frontendWorkflow) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/FRONTEND_WORKFLOW</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.frontendWorkflow.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.backendWorkflow) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/BACKEND_WORKFLOW</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.backendWorkflow.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.apiGatewayIntegration) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/API_GATEWAY_INTEGRATION</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.apiGatewayIntegration.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.deploymentSteps) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/DEPLOYMENT_STEPS</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.deploymentSteps.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.sagemakerSetup) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/SAGEMAKER_SETUP</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.sagemakerSetup.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.lambdaFulfillment) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/LAMBDA_FULFILLMENT</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.lambdaFulfillment.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.langchainLayer) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/LANGCHAIN_LAYER</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.langchainLayer.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.lexBotConfiguration) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/LEX_BOT_CONFIGURATION</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.lexBotConfiguration.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.voiceInteraction) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/VOICE_INTERACTION</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.voiceInteraction.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.webUiCognitoAccess) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/WEB_UI_&_COGNITO</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.webUiCognitoAccess.map(step => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.useCases) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/USE_CASES</h3>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-sm text-on-surface">
                            ${project.useCases.map(uc => `
                                <li class="flex gap-xs items-start">
                                    <span class="text-secondary-fixed-dim shrink-0">»</span>
                                    <span>${uc}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.securityInsights) {
                html += `
                    <div class="mb-lg p-md bg-surface-container-highest border border-outline-variant">
                        <h3 class="font-label-caps text-tertiary-fixed-dim uppercase mb-sm">/SECURITY_INSIGHTS</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.securityInsights.map(insight => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-tertiary-fixed-dim shrink-0">#</span>
                                    <span>${insight}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.challenges) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-warning uppercase mb-sm border-b border-warning/30 pb-xs inline-block">/CHALLENGES</h3>
                        <p class="text-on-surface">${project.details.challenges}</p>
                    </div>
                `;
            }

            if (project.details.learnings) {
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/WHAT_I_LEARNED</h3>
                        <p class="text-on-surface">${project.details.learnings}</p>
                    </div>
                `;
            }

            if (project.details.learningOutcomes || project.learningOutcomes) {
                const outcomes = project.details.learningOutcomes || project.learningOutcomes;
                html += `
                    <div class="mb-lg">
                        <h3 class="font-label-caps text-surface-tint uppercase mb-sm border-b border-surface-tint/30 pb-xs inline-block">/LEARNING_OUTCOMES</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${outcomes.map(outcome => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${outcome}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            if (project.details.futureImprovements) {
                html += `
                    <div class="mb-lg border-t border-outline-variant/50 pt-lg">
                        <h3 class="font-label-caps text-secondary-fixed-dim uppercase mb-sm border-b border-secondary-fixed-dim/30 pb-xs inline-block">/FUTURE_IMPROVEMENTS</h3>
                        <ul class="space-y-sm text-on-surface">
                            ${project.details.futureImprovements.map(imp => `
                                <li class="flex gap-sm items-start">
                                    <span class="text-secondary-fixed-dim opacity-50 shrink-0">»</span>
                                    <span>${imp}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }

            modalContent.innerHTML = html;

            // Build Footer Links
            let footerHtml = '';
            if (project.githubUrl) {
                footerHtml += `<a href="${project.githubUrl}" target="_blank" class="text-link font-code-sm text-sm uppercase outline-none hover:text-surface-tint">GITHUB →</a>`;
            }
            if (project.liveUrl) {
                footerHtml += `<a href="${project.liveUrl}" target="_blank" class="text-link font-code-sm text-sm uppercase outline-none text-surface-tint hover:text-white">VIEW LIVE →</a>`;
            }
            modalFooter.innerHTML = footerHtml || '<span class="text-muted font-code-sm text-sm uppercase">LINKS UNAVAILABLE</span>';

            document.body.style.overflow = 'hidden'; // prevent background scrolling
            projectModal.showModal();
            modalContent.scrollTop = 0; // reset scroll position
        }

        function closeProjectModal() {
            projectModal.close();
            document.body.style.overflow = ''; // restore scrolling
        }
    }

});
