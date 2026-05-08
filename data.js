const portfolioData = {
    profile: {
        fullName: "Rishabh Soni",
        currentRole: "Generative AI Engineer",
        location: "Pune, Maharashtra, India",
        shortBio: "I specialize in building AI-powered applications, LLM integration, RAG pipelines, AI agents, and full-stack AI product development.",
        email: "YOUR_EMAIL", // Replace with your email
        socials: {
            github: "YOUR_GITHUB_URL", // Replace with your GitHub URL
            linkedin: "YOUR_LINKEDIN_URL", // Replace with your LinkedIn URL
            x: "YOUR_X_URL" // Replace with your X URL
        }
    },

    skills: [
        {
            category: "Generative AI & LLMs",
            items: [
                "OpenAI, GPT, Claude, Gemini",
                "Prompt Engineering, Function Calling",
                "AI Agents, Tool Calling, Workflow Automation",
                "LangChain, LlamaIndex, CrewAI"
            ]
        },
        {
            category: "RAG & Vector Databases",
            items: [
                "Retrieval-Augmented Generation",
                "Embeddings, Semantic Search",
                "Pinecone, ChromaDB, FAISS, Weaviate",
                "Document Parsing, Chunking, Ranking"
            ]
        },
        {
            category: "Backend & API Development",
            items: [
                "Python, FastAPI, Flask",
                "Node.js, Express.js",
                "REST APIs, Webhooks, Microservices",
                "Authentication, Rate Limiting, API Security"
            ]
        },
        {
            category: "Frontend Development",
            items: [
                "React, Next.js, TypeScript",
                "Tailwind CSS, Shadcn UI",
                "Chat Interfaces, AI Dashboards",
                "Real-time UI with Streaming Responses"
            ]
        },
        {
            category: "Databases & Cloud",
            items: [
                "PostgreSQL, MongoDB, Redis",
                "Supabase, Firebase",
                "AWS, GCP, Vercel",
                "Docker, CI/CD, GitHub Actions"
            ]
        },
        {
            category: "MLOps & AI Engineering",
            items: [
                "Model Evaluation, Guardrails",
                "LangSmith, OpenTelemetry",
                "Prompt Versioning, A/B Testing",
                "Monitoring, Logging, Cost Optimization"
            ]
        }
    ],

    projects: [
        {
            name: "CloudFlow Analytics — AWS VPC Flow Logs to QuickSight Dashboard",
            slug: "cloudflow-analytics",
            category: "Cloud Security / Data Analytics",
            featured: true,
            description: "Built an end-to-end AWS analytics pipeline that transforms raw VPC Flow Logs into actionable network and security insights using S3, Glue, Athena, and QuickSight.",
            longDescription: "CloudFlow Analytics demonstrates a complete raw-data-to-visualization workflow on AWS. It captures raw VPC network traffic through VPC Flow Logs, stores the logs in Amazon S3, catalogs the schema with AWS Glue, queries the data using Amazon Athena, and visualizes security and traffic insights in Amazon QuickSight.",
            techStack: [
                "AWS VPC",
                "VPC Flow Logs",
                "Amazon S3",
                "AWS Glue",
                "Amazon Athena",
                "Amazon QuickSight",
                "Amazon EC2",
                "Python",
                "AWS CDK",
                "CloudFormation"
            ],
            githubUrl: "", // Replace with actual GitHub URL
            liveUrl: "",   // Replace with actual Live URL
            highlights: [
                "Designed a raw network data pipeline from VPC Flow Logs to QuickSight dashboards.",
                "Configured S3 storage paths for flow logs, Athena assets, and query results.",
                "Used Glue and Athena to make raw traffic logs queryable.",
                "Created analysis patterns for top talkers, rejected traffic, unusual ports, suspicious IPs, and possible scanning activity.",
                "Used an EC2-hosted Python server to generate traffic and validate health-check behavior."
            ],
            architecture: [
                "Raw VPC Traffic",
                "VPC Flow Logs",
                "Amazon S3",
                "AWS Glue Crawler / Data Catalog",
                "Amazon Athena",
                "Athena Query Results in S3",
                "Amazon QuickSight Dashboard"
            ],
            useCases: [
                "Top talkers",
                "Top destinations",
                "Accepted vs rejected traffic",
                "Traffic by port",
                "Bytes by network interface",
                "Suspicious high-traffic IPs",
                "Port scanning detection",
                "Possible DDoS/high request rate",
                "Repeated rejected connections",
                "Unusual ports",
                "Internal lateral movement",
                "Large data exfiltration"
            ],
            details: {
                problemStatement: "Organizations struggle to gain actionable visibility into their AWS VPC network traffic. Raw flow logs are voluminous and difficult to parse manually, making security auditing, traffic anomaly detection, and cost analysis extremely challenging.",
                dataPipelineSteps: [
                    "VPC Flow Logs capture metadata about IP traffic going to and from network interfaces in the VPC.",
                    "Logs are continuously delivered to an Amazon S3 bucket partitioned by date.",
                    "AWS Glue Crawler infers the schema and creates table definitions in the AWS Glue Data Catalog.",
                    "Amazon Athena executes standard SQL queries against the raw log data in S3.",
                    "Amazon QuickSight connects to Athena to visualize the query results in interactive dashboards."
                ],
                securityInsights: [
                    "Identified misconfigured security groups causing high rates of rejected traffic.",
                    "Detected potential port scanning attempts by correlating repeated connection failures across multiple instances.",
                    "Isolated anomalous high-volume data transfers indicative of unauthorized data exfiltration."
                ],
                challenges: "The primary challenge was managing the cost and performance of querying massive volumes of log data. Raw text logs resulted in slow Athena queries and high data-scanned costs.",
                learnings: "I learned how to optimize Athena queries by implementing S3 partitioning and converting logs to columnar formats like Parquet using AWS Glue ETL jobs, which significantly reduced query times and costs.",
                futureImprovements: [
                    "Implement automated alerts using Amazon EventBridge and SNS for immediate notification of suspicious traffic patterns.",
                    "Integrate AWS Lambda to automatically block malicious IP addresses via AWS WAF or Network ACLs.",
                    "Migrate the data transformation step to Amazon Kinesis Data Firehose for near real-time Parquet conversion."
                ]
            }
        },
        {
            name: "Enterprise Generative AI Web App on AWS",
            slug: "enterprise-generative-ai-aws",
            category: "Generative AI / AWS Serverless",
            featured: false,
            description: "Serverless Generative AI web application integrating a static frontend with an Amazon SageMaker model endpoint via an API Gateway and AWS Lambda inference bridge.",
            longDescription: "A proof-of-concept enterprise Generative AI application deployed entirely on AWS serverless infrastructure. The branded interface allows users to submit natural language prompts. Requests route through a globally distributed CloudFront/S3 frontend into an API Gateway. An AWS Lambda inference bridge validates payloads and securely queries a deployed Amazon SageMaker foundation model, returning generated responses dynamically.",
            techStack: [
                "Amazon SageMaker",
                "SageMaker Studio",
                "SageMaker Runtime",
                "AWS Lambda",
                "API Gateway",
                "Amazon S3",
                "Amazon CloudFront",
                "IAM",
                "Python",
                "JavaScript",
                "HTML",
                "CSS",
                "Swagger / OpenAPI"
            ],
            githubUrl: "YOUR_GITHUB_URL",
            liveUrl: "YOUR_LIVE_DEMO_URL",
            featuredImage: "",
            logo: "cloudage_logo.jpeg",
            highlights: [
                "Developed a serverless AI web application for enterprise prompt-based generation.",
                "Deployed a static frontend via Amazon S3 and CloudFront for low-latency global delivery.",
                "Engineered an AWS Lambda (Python 3.11) inference bridge to securely invoke SageMaker Runtime.",
                "Exposed model capabilities through an API Gateway REST API with strict CORS configuration.",
                "Implemented async frontend states, including prompt validation, loading feedback, and error handling.",
                "Utilized environment variables to decouple the backend from specific SageMaker endpoints."
            ],
            architecture: [
                "User Prompt",
                "S3 Static Web App",
                "CloudFront",
                "API Gateway REST API",
                "AWS Lambda",
                "SageMaker Runtime",
                "SageMaker Endpoint",
                "Generated AI Response"
            ],
            useCases: [
                "Enterprise AI assistant",
                "Prompt-based text generation",
                "Internal knowledge assistant prototype",
                "Serverless AI inference workflow",
                "SageMaker model endpoint integration"
            ],
            details: {
                problemStatement: "Providing internal teams access to foundation models often introduces operational overhead if dedicated servers are required. This project demonstrates a low-maintenance, serverless approach to securely exposing SageMaker AI models through an enterprise-branded web interface.",
                frontendWorkflow: [
                    "Static HTML/CSS/JS Single-Page Application (SPA).",
                    "Enterprise-branded interface with dedicated prompt and response displays.",
                    "Loading state while API call runs.",
                    "Error handling for failed API responses.",
                    "Ctrl + Enter support for prompt submission.",
                    "Disclaimer for AI-generated output review."
                ],
                backendWorkflow: [
                    "Python 3.11 AWS Lambda function acting as an inference bridge.",
                    "Integrates the boto3 SageMaker Runtime client.",
                    "Dynamically resolves the target SageMaker endpoint via the ENDPOINT_NAME environment variable.",
                    "Sanitizes incoming request payloads prior to model invocation.",
                    "Invokes the SageMaker endpoint with 'application/json' ContentType.",
                    "Formats and returns JSON responses appended with necessary CORS headers."
                ],
                apiGatewayIntegration: [
                    "API Gateway REST API.",
                    "POST endpoint: /summarize.",
                    "Lambda proxy integration.",
                    "OPTIONS method for CORS.",
                    "Swagger/OpenAPI import used to create API resources."
                ],
                deploymentSteps: [
                    "Provisioned and deployed the foundation model endpoint via Amazon SageMaker Studio and Jupyter notebooks.",
                    "Authored and deployed the Python 3.11 Lambda inference logic.",
                    "Configured the API Gateway REST API and integrated it with the Lambda proxy.",
                    "Uploaded static frontend assets (index.html, logo) to a private Amazon S3 bucket.",
                    "Configured an Amazon CloudFront distribution for global edge caching.",
                    "Secured the S3 bucket using Origin Access Control (OAC) to restrict direct public access."
                ],
                learnings: "Gained practical experience integrating static frontends with serverless AWS APIs. Deepened understanding of IAM permissions required for Lambda-to-SageMaker invocations, API Gateway REST configuration, Lambda Proxy integrations, and handling CORS preflight requests across distributed architectures.",
                futureImprovements: [
                    "Add authentication using Cognito.",
                    "Add request logging and monitoring with CloudWatch.",
                    "Add API rate limiting and usage plans.",
                    "Store prompt history in DynamoDB.",
                    "Add streaming responses.",
                    "Add model selection support.",
                    "Improve frontend with chat-style UI.",
                    "Add CI/CD deployment pipeline."
                ]
            }
        },
        {
            name: "AWS Lex GenAI Voice Chatbot",
            slug: "readers-are-leaders-lex-genai-chatbot",
            category: "Conversational AI / AWS GenAI",
            featured: false,
            description: "Built a Generative AI chatbot using Amazon Lex, AWS Lambda, SageMaker, LangChain, Cognito, and a web-based chat UI with optional voice interaction.",
            longDescription: "This is a cloud-based conversational AI chatbot built on AWS. The system uses Amazon Lex as the conversational interface, AWS Lambda as the fulfillment layer, and a SageMaker-hosted LLM endpoint as the inference backend. The project also uses LangChain as a Lambda layer, Cognito for user access, and a deployed WebUI for end-user interaction.",
            techStack: [
                "Amazon Lex",
                "Amazon SageMaker",
                "SageMaker Studio",
                "JupyterLab",
                "AWS Lambda",
                "Python 3.9",
                "LangChain",
                "Lambda Layers",
                "Amazon S3",
                "Amazon Cognito",
                "IAM",
                "WebUI Stack"
            ],
            githubUrl: "YOUR_GITHUB_URL",
            liveUrl: "YOUR_LIVE_DEMO_URL",
            featuredImage: "",
            highlights: [
                "Built a conversational AI chatbot using Amazon Lex and a SageMaker-hosted LLM endpoint.",
                "Configured Lambda fulfillment to route Lex requests to the SageMaker endpoint.",
                "Packaged LangChain dependencies as a Python 3.9 Lambda layer.",
                "Imported and configured the Lex bot using LexJson.zip.",
                "Enabled English voice response using Amazon Lex Joanna text-to-speech.",
                "Deployed a WebUI experience using Lex Bot ID and Lex Bot Alias ID.",
                "Used Cognito user pools for web application login and access."
            ],
            architecture: [
                "User",
                "Web Chat UI",
                "Cognito Authentication",
                "Amazon Lex Bot",
                "Lex Intent / Bot Alias",
                "AWS Lambda Fulfillment",
                "LangChain Layer",
                "SageMaker Endpoint",
                "LLM Response",
                "Text / Voice Output"
            ],
            useCases: [
                "AI chatbot",
                "Voice-enabled assistant",
                "Conversational AI prototype",
                "SageMaker LLM integration",
                "Lex bot fulfillment workflow",
                "Authenticated chatbot web app"
            ],
            details: {
                problemStatement: "Users need a simple conversational interface to interact with an AI model without directly calling model endpoints or managing infrastructure. This project solves that by using Amazon Lex as the conversation layer, Lambda as the fulfillment bridge, and SageMaker as the LLM inference backend.",
                sagemakerSetup: [
                    "Created a SageMaker Domain and private JupyterLab space.",
                    "Deployed a Foundation Model endpoint via SageMaker Studio."
                ],
                lambdaFulfillment: [
                    "AWS Lambda (Python 3.9) acts as the fulfillment logic for Lex.",
                    "Connected to the SageMaker endpoint using the ENDPOINT_NAME environment variable."
                ],
                langchainLayer: [
                    "Packaged LangChain dependencies as a Python 3.9 Lambda layer.",
                    "Attached the layer to the Lambda fulfillment function to handle conversation formatting."
                ],
                lexBotConfiguration: [
                    "Imported and configured the Amazon Lex bot using a LexJson.zip file.",
                    "Configured Lex aliases and intents to connect to the Lambda fulfillment function."
                ],
                voiceInteraction: [
                    "Enabled English voice response using Amazon Lex Joanna text-to-speech.",
                    "Allows users to interact via voice or text."
                ],
                webUiCognitoAccess: [
                    "Deployed a WebUI connected to Lex using Bot ID and Alias ID.",
                    "Configured Cognito user pools to manage application login and secure access to the chatbot UI."
                ],
                learningOutcomes: [
                    "Created and configured a SageMaker Domain and private JupyterLab space.",
                    "Connected Amazon Lex to Lambda fulfillment.",
                    "Integrated Lambda with a SageMaker endpoint using environment variables.",
                    "Used Lambda layers to package external Python dependencies.",
                    "Configured Lex bot aliases, intents, and voice output.",
                    "Deployed a WebUI connected to Lex using Bot ID and Alias ID.",
                    "Used Cognito to create application users and access the chatbot UI."
                ],
                futureImprovements: [
                    "Add persistent conversation history using DynamoDB.",
                    "Add CloudWatch logging dashboards.",
                    "Add authentication roles for different user types.",
                    "Add streaming response support if supported by the backend.",
                    "Add feedback buttons for generated answers.",
                    "Add fallback intent improvements.",
                    "Add multilingual voice support.",
                    "Add CI/CD for Lambda and Lex deployment.",
                    "Add monitoring and cost controls."
                ]
            }
        }
    ],

    experience: [
        {
            company: "Generative AI Engineering",
            role: "Generative AI Engineer",
            startDate: "2024",
            endDate: "Present",
            achievements: [
                "Designed and developed AI-powered web applications using LLMs and modern APIs.",
                "Built Retrieval-Augmented Generation systems for document search, Q&A, and knowledge bots.",
                "Integrated OpenAI, Claude, Gemini, and other LLM APIs into production applications.",
                "Developed AI agents capable of tool usage, task automation, and multi-step reasoning.",
                "Created prompt pipelines, structured outputs, function calling flows, and evaluation tests.",
                "Implemented vector databases and embedding workflows for semantic search use cases.",
                "Built backend APIs using Python, FastAPI, Node.js, and cloud-based infrastructure.",
                "Developed responsive frontend interfaces for AI chatbots, dashboards, and automation tools.",
                "Improved AI application reliability through logging, guardrails, monitoring, and testing.",
                "Collaborated with product and business teams to convert AI ideas into working products."
            ]
        }
    ]
};
