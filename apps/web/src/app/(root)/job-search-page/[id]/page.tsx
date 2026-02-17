import JobDetails from "@/features/company/components/job-details";
import { notFound } from "next/navigation";

// Mock data - in real app, this would come from your API
const mockJobs = {
  "1": {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salaryMin: 120000,
    salaryMax: 180000,
    employmentType: "Full-time",
    postedDate: "2024-01-15",
    description: `We are looking for a senior frontend developer to join our team and help build amazing user experiences.

## About the Role
As a Senior Frontend Developer, you will be responsible for building and maintaining our web applications using modern technologies. You'll work closely with our design team and backend developers to create seamless user experiences.

## Key Responsibilities
- Develop and maintain responsive web applications using React and TypeScript
- Collaborate with designers to implement pixel-perfect UI components
- Optimize applications for maximum speed and scalability
- Write clean, maintainable, and well-documented code
- Mentor junior developers and conduct code reviews
- Stay up-to-date with the latest frontend technologies and best practices

## Requirements
- 5+ years of experience in frontend development
- Strong proficiency in React, TypeScript, and Next.js
- Experience with modern CSS frameworks (Tailwind CSS, Styled Components)
- Knowledge of state management libraries (Redux, Zustand)
- Experience with testing frameworks (Jest, React Testing Library)
- Strong understanding of web performance optimization
- Excellent communication and collaboration skills

## Nice to Have
- Experience with GraphQL
- Knowledge of server-side rendering (SSR)
- Experience with micro-frontends
- Previous experience in a startup environment`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: true,
    experience: "5+ years",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  "2": {
    id: "2",
    title: "Product Manager",
    company: "InnovateLab",
    location: "New York, NY",
    salaryMin: 130000,
    salaryMax: 200000,
    employmentType: "Full-time",
    postedDate: "2024-01-14",
    description: `Lead product development and strategy for our flagship products.

## About the Role
We're seeking an experienced Product Manager to drive the vision and strategy for our core products. You'll work cross-functionally with engineering, design, and business teams to deliver exceptional user experiences.

## Key Responsibilities
- Define product strategy and roadmap
- Collaborate with stakeholders to gather requirements
- Work with engineering teams to deliver features on time
- Analyze user data and feedback to inform product decisions
- Manage product launches and go-to-market strategies
- Conduct competitive analysis and market research

## Requirements
- 3+ years of product management experience
- Strong analytical and problem-solving skills
- Experience with agile development methodologies
- Excellent communication and presentation skills
- Bachelor's degree in related field
- Experience with data analysis tools

## Nice to Have
- Technical background or experience
- Experience in B2B SaaS products
- MBA or advanced degree
- Experience with user research and testing`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: false,
    experience: "3+ years",
    skills: ["Product Management", "Agile", "Analytics", "Strategy"],
  },
  "3": {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Austin, TX",
    salaryMin: 80000,
    salaryMax: 120000,
    employmentType: "Contract",
    postedDate: "2024-01-13",
    description: `Create amazing user experiences for our digital products.

## About the Role
We're looking for a talented UX Designer to join our creative team and help shape the future of our digital products. You'll work on a variety of projects from concept to completion.

## Key Responsibilities
- Conduct user research and usability testing
- Create wireframes, prototypes, and high-fidelity designs
- Collaborate with product managers and developers
- Develop design systems and style guides
- Present design concepts to stakeholders
- Iterate on designs based on user feedback

## Requirements
- 2+ years of UX design experience
- Proficiency in Figma and other design tools
- Strong portfolio demonstrating UX process
- Experience with user research methods
- Knowledge of design principles and best practices
- Excellent communication and presentation skills

## Nice to Have
- Experience with frontend development
- Knowledge of accessibility standards
- Experience with mobile app design
- Previous agency experience`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: true,
    experience: "2+ years",
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
  },
  "4": {
    id: "4",
    title: "Backend Engineer",
    company: "DataFlow Systems",
    location: "Seattle, WA",
    salaryMin: 110000,
    salaryMax: 160000,
    employmentType: "Full-time",
    postedDate: "2024-01-12",
    description: `Build scalable backend systems and APIs.

## About the Role
Join our backend engineering team to build robust, scalable systems that power our platform. You'll work with cutting-edge technologies and have the opportunity to shape our technical architecture.

## Key Responsibilities
- Design and implement RESTful APIs
- Build and maintain microservices
- Optimize database performance and queries
- Implement security best practices
- Write comprehensive tests
- Collaborate with frontend and DevOps teams

## Requirements
- 4+ years of backend development experience
- Strong proficiency in Node.js and Python
- Experience with cloud platforms (AWS, GCP, Azure)
- Knowledge of database systems (PostgreSQL, MongoDB)
- Experience with containerization (Docker, Kubernetes)
- Strong problem-solving and debugging skills

## Nice to Have
- Experience with GraphQL
- Knowledge of event-driven architectures
- Experience with CI/CD pipelines
- Previous startup experience`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: false,
    experience: "4+ years",
    skills: ["Node.js", "Python", "AWS", "PostgreSQL"],
  },
  "5": {
    id: "5",
    title: "Marketing Specialist",
    company: "GrowthCo",
    location: "Chicago, IL",
    salaryMin: 60000,
    salaryMax: 90000,
    employmentType: "Part-time",
    postedDate: "2024-01-11",
    description: `Drive marketing campaigns and brand awareness.

## About the Role
We're seeking a creative and data-driven Marketing Specialist to help grow our brand and drive customer acquisition. You'll work on a variety of marketing initiatives across digital channels.

## Key Responsibilities
- Develop and execute digital marketing campaigns
- Manage social media presence and content
- Analyze campaign performance and optimize ROI
- Create engaging content for various channels
- Collaborate with design and sales teams
- Track and report on marketing metrics

## Requirements
- 1+ years of marketing experience
- Knowledge of digital marketing channels
- Experience with social media management
- Basic understanding of analytics tools
- Strong written and verbal communication skills
- Creative thinking and problem-solving abilities

## Nice to Have
- Experience with email marketing platforms
- Knowledge of SEO and SEM
- Graphic design skills
- Previous B2B marketing experience`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: true,
    experience: "1+ years",
    skills: ["Digital Marketing", "Social Media", "Analytics", "Content"],
  },
  "6": {
    id: "6",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Denver, CO",
    salaryMin: 100000,
    salaryMax: 150000,
    employmentType: "Full-time",
    postedDate: "2024-01-10",
    description: `Manage cloud infrastructure and deployment pipelines.

## About the Role
Join our DevOps team to help build and maintain our cloud infrastructure. You'll work on automation, monitoring, and ensuring our systems are reliable and scalable.

## Key Responsibilities
- Design and implement CI/CD pipelines
- Manage cloud infrastructure and services
- Monitor system performance and reliability
- Automate deployment and scaling processes
- Implement security best practices
- Troubleshoot infrastructure issues

## Requirements
- 3+ years of DevOps experience
- Strong knowledge of Docker and Kubernetes
- Experience with cloud platforms (AWS, GCP, Azure)
- Knowledge of infrastructure as code (Terraform, CloudFormation)
- Experience with monitoring tools (Prometheus, Grafana)
- Strong scripting skills (Bash, Python)

## Nice to Have
- Experience with microservices architecture
- Knowledge of service mesh technologies
- Experience with GitOps workflows
- Previous experience with high-traffic systems`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: true,
    experience: "3+ years",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  "7": {
    id: "7",
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Boston, MA",
    salaryMin: 95000,
    salaryMax: 140000,
    employmentType: "Full-time",
    postedDate: "2024-01-09",
    description: `Analyze complex data sets to drive business insights.

## About the Role
We're looking for a Data Scientist to join our analytics team and help extract valuable insights from our data. You'll work on a variety of projects from exploratory analysis to machine learning models.

## Key Responsibilities
- Analyze large datasets to identify trends and patterns
- Build and deploy machine learning models
- Create data visualizations and reports
- Collaborate with business stakeholders
- Clean and preprocess data
- Present findings to technical and non-technical audiences

## Requirements
- 3+ years of data science experience
- Strong proficiency in Python and SQL
- Experience with machine learning libraries (scikit-learn, pandas)
- Knowledge of statistical analysis and modeling
- Experience with data visualization tools
- Strong analytical and problem-solving skills

## Nice to Have
- Experience with deep learning frameworks
- Knowledge of big data technologies (Spark, Hadoop)
- Experience with cloud ML platforms
- Previous experience in your industry`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: false,
    experience: "3+ years",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
  },
  "8": {
    id: "8",
    title: "Sales Manager",
    company: "RevenueMax",
    location: "Miami, FL",
    salaryMin: 70000,
    salaryMax: 120000,
    employmentType: "Full-time",
    postedDate: "2024-01-08",
    description: `Lead sales team and drive revenue growth.

## About the Role
We're seeking an experienced Sales Manager to lead our sales team and drive revenue growth. You'll be responsible for developing sales strategies, managing the team, and building relationships with key clients.

## Key Responsibilities
- Lead and manage the sales team
- Develop and implement sales strategies
- Build and maintain client relationships
- Track sales performance and metrics
- Collaborate with marketing and product teams
- Train and mentor sales representatives

## Requirements
- 4+ years of sales experience
- Previous management experience
- Strong leadership and communication skills
- Experience with CRM systems
- Proven track record of meeting sales targets
- Bachelor's degree in related field

## Nice to Have
- Experience in B2B sales
- Knowledge of sales automation tools
- Previous experience in your industry
- Advanced degree or certifications`,
    companyLogo: "/api/placeholder/60/60",
    isRemote: false,
    experience: "4+ years",
    skills: ["Sales", "CRM", "Leadership", "Negotiation"],
  },
};

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = mockJobs[params.id as keyof typeof mockJobs];

  if (!job) {
    notFound();
  }

  return <JobDetails id={params.id} />;
}

export async function generateStaticParams() {
  // In a real app, this would fetch job IDs from your API
  return Object.keys(mockJobs).map((id) => ({
    id,
  }));
}
