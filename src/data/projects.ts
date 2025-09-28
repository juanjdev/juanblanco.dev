// Projects data structure for better organization and maintainability
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  category: 'web-app' | 'mobile' | 'ai' | 'e-commerce' | 'tool';
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
  published: boolean;
  liveDemo?: string;
  code?: string;
  year: number;
  client?: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
  description: string;
}

export const projectCategories: ProjectCategory[] = [
  { id: 'all', label: 'All Projects', description: 'Complete portfolio showcase' },
  { id: 'web-app', label: 'Web Applications', description: 'Full-stack web solutions' },
  { id: 'ai', label: 'AI & ML', description: 'Intelligent applications' },
  { id: 'e-commerce', label: 'E-Commerce', description: 'Online business solutions' },
  { id: 'tool', label: 'Tools & Utilities', description: 'Developer and productivity tools' }
];

export const projectsData: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with AI-powered recommendations, built with Next.js and Stripe integration.',
    longDescription: 'Complete e-commerce platform featuring user authentication, product management, shopping cart, payment processing, order tracking, and AI-powered product recommendations. Built with modern technologies for scalability and performance.',
    image: '/projects/ecommerce-platform.png',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    category: 'e-commerce',
    status: 'completed',
    featured: true,
    published: false,
    liveDemo: 'https://ecommerce-demo.example.com',
    code: 'https://github.com/username/ecommerce-platform',
    year: 2024,
    client: 'Startup Company'
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, and team analytics.',
    longDescription: 'Enterprise-grade task management application with real-time collaboration, advanced filtering, team analytics, time tracking, and integrations with popular tools. Features drag-and-drop interface and mobile-responsive design.',
    image: '/projects/task-management.png',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Material-UI'],
    category: 'web-app',
    status: 'completed',
    featured: true,
    published: false,
    liveDemo: 'https://taskapp-demo.example.com',
    code: 'https://github.com/username/task-management',
    year: 2024
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generator',
    description: 'Content creation platform powered by GPT-4, featuring custom templates and advanced editing capabilities.',
    longDescription: 'AI-powered content creation platform that helps marketers and content creators generate high-quality copy, blog posts, social media content, and marketing materials. Features custom templates, tone adjustment, and collaborative editing.',
    image: '/projects/ai-content-generator.png',
    technologies: ['React', 'OpenAI API', 'TailwindCSS', 'Express', 'Redis', 'Stripe'],
    category: 'ai',
    status: 'completed',
    featured: true,
    published: false,
    liveDemo: 'https://ai-content-demo.example.com',
    code: 'https://github.com/username/ai-content-generator',
    year: 2024
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio',
    description: 'Modern portfolio website built with Astro, featuring animated navigation and responsive design.',
    image: '/projects/portfolio-website.png',
    technologies: ['Astro', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    category: 'web-app',
    status: 'completed',
    featured: false,
    published: false,
    liveDemo: 'https://juanblanco.dev',
    code: 'https://github.com/username/portfolio',
    year: 2024
  },
  {
    id: 'developer-tools',
    title: 'Developer Productivity Suite',
    description: 'Collection of developer tools including code formatters, API testing, and documentation generators.',
    image: '/projects/developer-tools.png',
    technologies: ['Vue.js', 'Node.js', 'Electron', 'TypeScript'],
    category: 'tool',
    status: 'in-progress',
    featured: false,
    published: false,
    code: 'https://github.com/username/dev-tools',
    year: 2024
  }
];

// Helper functions
export const getFeaturedProjects = (): Project[] => {
  return projectsData.filter(project => project.featured && project.published);
};

export const getProjectsByCategory = (categoryId: string): Project[] => {
  const publishedProjects = projectsData.filter(project => project.published);
  if (categoryId === 'all') return publishedProjects;
  return publishedProjects.filter(project => project.category === categoryId);
};

export const getAllPublishedProjects = (): Project[] => {
  return projectsData.filter(project => project.published);
};

export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find(project => project.id === id);
};

export const getProjectsByTechnology = (tech: string): Project[] => {
  return projectsData.filter(project =>
    project.technologies.some(technology =>
      technology.toLowerCase().includes(tech.toLowerCase())
    )
  );
};

export const getProjectsByYear = (year: number): Project[] => {
  return projectsData.filter(project => project.year === year);
};