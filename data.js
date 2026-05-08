const portfolioData = {
    profile: {
        name: "Rishabh Soni",
        role: "Senior Software Engineer / Creative Technologist",
        location: "San Francisco, CA",
        summary: "Crafting high-performance digital ecosystems with a focus on low-latency architectures and retro-futuristic UI/UX design. Obsessed with terminal productivity and distributed systems.",
        email: "hello@rishabhsoni.dev",
        socials: {
            github: "https://github.com/rishabhsoni",
            linkedin: "https://linkedin.com/in/rishabhsoni",
            x: "https://twitter.com/rishabhsoni"
        }
    },

    skills: [
        {
            category: "Frontend",
            items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "WebGL"]
        },
        {
            category: "Backend",
            items: ["Node.js", "Rust", "PostgreSQL", "GraphQL", "Redis"]
        },
        {
            category: "Systems & Cloud",
            items: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"]
        }
    ],

    projects: [
        {
            id: "project-01",
            title: "NEURAL_NET_VISUALIZER",
            description: "An interactive 3D map of neural connections using WebGL and Rust-based processing.",
            stack: ["WebGL", "Rust", "React"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true,
            status: "ONLINE",
            imageAlt: "A futuristic cybersecurity operation center with massive screens displaying complex data visualizations.",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAba98R7KkdR5CNGiX-Zw6LsuUdsja7yklhTWJhM_pOrcDGBRtSDcy7yfLUCq-HptWGut5UY9x7053C8agzVe5_9KcPCXLVYRIeugLN2qNZFIRPew-8VZ_Rm1K6RKM6L4HPiL2WXbHDZdBELtLcTU2JW7_UYOmO-yGjjZO_uSCRLMdxpvcW_2UkM2t6pILbW2AbYsdb50kCcGRjkV4NFZjFsxs27GAgKNRSkXUTpFd98_gsVCc1HvAUZrtX-Dbm5R7q9gQHdZVWF_me"
        },
        {
            id: "project-02",
            title: "QUANTUM_AUTH_SYS",
            description: "Next-gen biometric authentication gateway utilizing experimental quantum cryptography techniques.",
            stack: ["Node.js", "WebAuthn", "Crypto"],
            githubUrl: "#",
            liveUrl: "#",
            featured: false,
            status: "STABLE",
            icon: "fingerprint"
        },
        {
            id: "project-03",
            title: "DISTRIBUTED_KV_STORE",
            description: "A lightweight, highly available distributed key-value store built in Rust with a custom raft implementation.",
            stack: ["Rust", "Raft", "gRPC"],
            githubUrl: "#",
            liveUrl: "#",
            featured: false,
            status: "MAINTENANCE",
            icon: "database"
        }
    ],

    experience: [
        {
            id: "exp-01",
            company: "Tech_Corp Global",
            role: "Lead Systems Architect",
            startDate: "2021",
            endDate: "Present",
            description: [
                "Architected a globally distributed microservices architecture serving 10M+ daily active users.",
                "Reduced infrastructure costs by 40% through aggressive Kubernetes auto-scaling optimization.",
                "Mentored a team of 15+ engineers across three time zones."
            ]
        },
        {
            id: "exp-02",
            company: "Startup_Incubation_Labs",
            role: "Senior Full-Stack Engineer",
            startDate: "2018",
            endDate: "2021",
            description: [
                "Led the frontend development of a real-time data visualization dashboard using React and WebSockets.",
                "Integrated secure payment gateways processing over $5M in monthly transactions.",
                "Established CI/CD pipelines reducing deployment times from 45 minutes to 5 minutes."
            ]
        },
        {
            id: "exp-03",
            company: "Digital_Agency",
            role: "Software Developer",
            startDate: "2015",
            endDate: "2018",
            description: [
                "Developed responsive, high-performance web applications for Fortune 500 clients.",
                "Implemented accessibility best practices achieving WCAG 2.1 AA compliance across all major projects."
            ]
        }
    ]
};
