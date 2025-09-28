// Skills data structure for better organization and maintainability
export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  experience: string;
  category: 'expert' | 'advanced' | 'intermediate';
  description?: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillsData: Record<string, SkillCategory> = {
  frontend: {
    id: 'frontend',
    label: 'Frontend',
    title: 'Frontend',
    description: 'Crafting pixel-perfect user interfaces',
    skills: [
      {
        name: 'React',
        level: 'Expert',
        experience: '4+',
        category: 'expert',
        description: 'Enterprise-scale applications with performance optimization'
      },
      {
        name: 'Angular',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'Financial services applications and refund management systems'
      },
      {
        name: 'Next.js',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'Full-stack React framework with SSR/SSG capabilities'
      },
      {
        name: 'TypeScript',
        level: 'Expert',
        experience: '4+',
        category: 'expert',
        description: 'Type-safe JavaScript for scalable enterprise applications'
      },
      {
        name: 'Responsive Design',
        level: 'Expert',
        experience: '5+',
        category: 'expert',
        description: 'Cross-platform consistency across iOS, Android, and web'
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'Utility-first CSS framework for rapid UI development'
      }
    ]
  },
  backend: {
    id: 'backend',
    label: 'Backend',
    title: 'Backend',
    description: 'Building robust server-side solutions',
    skills: [
      {
        name: 'Node.js',
        level: 'Expert',
        experience: '4+',
        category: 'expert',
        description: 'Scalable APIs and microservices for portfolio management platforms'
      },
      {
        name: '.NET Core',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'RESTful APIs for financial services and automation solutions'
      },
      {
        name: 'C#',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'Enterprise automation and business intelligence platforms'
      },
      {
        name: 'SQL Server',
        level: 'Expert',
        experience: '4+',
        category: 'expert',
        description: 'Data extraction, business intelligence, and enterprise databases'
      },
      {
        name: 'Oracle',
        level: 'Advanced',
        experience: '2+',
        category: 'advanced',
        description: 'Enterprise database systems and automated data extraction'
      },
      {
        name: 'RESTful APIs',
        level: 'Expert',
        experience: '4+',
        category: 'expert',
        description: 'API design, documentation, and third-party integrations'
      }
    ]
  },
  cloud: {
    id: 'cloud',
    label: 'Cloud & DevOps',
    title: 'Cloud & DevOps',
    description: 'Scalable infrastructure and deployment',
    skills: [
      {
        name: 'AWS',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'Multi-tenant microservices, ECS, RDS, S3, VPC architecture'
      },
      {
        name: 'Azure',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'Functions, WebApps, SQL Database, DevOps pipelines'
      },
      {
        name: 'CI/CD',
        level: 'Expert',
        experience: '4+',
        category: 'expert',
        description: 'Automated pipelines with 20% deployment time reduction'
      },
      {
        name: 'Docker',
        level: 'Advanced',
        experience: '3+',
        category: 'advanced',
        description: 'Containerization for microservices architecture'
      },
      {
        name: 'Microservices',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'Multi-tenant distributed architecture design'
      }
    ]
  },
  tools: {
    id: 'tools',
    label: 'Tools & CMS',
    title: 'Tools & CMS',
    description: 'Content management and development tools',
    skills: [
      {
        name: 'WordPress',
        level: 'Advanced',
        experience: '3+',
        category: 'advanced',
        description: 'Custom themes, plugins, and enterprise website development'
      },
      {
        name: 'Business Intelligence',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'KPI visualization, server diagrams, and decision-making tools'
      },
      {
        name: 'Process Automation',
        level: 'Expert',
        experience: '3+',
        category: 'expert',
        description: 'No-code solutions reducing manual processing by 80%'
      },
      {
        name: 'Technical Leadership',
        level: 'Expert',
        experience: '4+',
        category: 'expert',
        description: 'Cross-functional teams and stakeholder management'
      }
    ]
  },
  ai: {
    id: 'ai',
    label: 'AI & ML',
    title: 'AI & ML',
    description: 'Artificial intelligence and machine learning',
    skills: [
      {
        name: 'LangChain',
        level: 'Intermediate',
        experience: '1+',
        category: 'intermediate',
        description: 'Framework for developing applications with large language models'
      },
      {
        name: 'OpenAI API',
        level: 'Intermediate',
        experience: '1+',
        category: 'intermediate',
        description: 'Integrating GPT models into applications and workflows'
      },
      {
        name: 'MCPs (Model Context Protocol)',
        level: 'Intermediate',
        experience: '1+',
        category: 'intermediate',
        description: 'Context management for AI model interactions'
      },
      {
        name: 'AI Integration',
        level: 'Intermediate',
        experience: '1+',
        category: 'intermediate',
        description: 'Implementing AI solutions in enterprise applications'
      }
    ]
  }
};

export const tabs = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'tools', label: 'Tools & CMS' },
  { id: 'ai', label: 'AI & ML' },
];

// Helper functions for easy data access
export const getSkillsByCategory = (categoryId: string): Skill[] => {
  return skillsData[categoryId]?.skills || [];
};

export const getCategoryInfo = (categoryId: string): SkillCategory | null => {
  return skillsData[categoryId] || null;
};

export const getAllSkills = (): Skill[] => {
  return Object.values(skillsData).flatMap(category => category.skills);
};