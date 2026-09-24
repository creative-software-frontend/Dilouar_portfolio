// Master Skill Categories Configuration
// These act as baseline data and can be dynamically enhanced with live GitHub statistics.

export const initialSkillCategories = [
  {
    id: "frontend",
    category: "Frontend Development",
    iconName: "FaCode",
    color: "from-blue-500 to-indigo-500",
    skills: [
      { name: "HTML / HTML5", level: 95, key: "HTML" },
      { name: "CSS / Tailwind CSS", level: 92, key: "CSS" },
      { name: "JavaScript (ES6+)", level: 90, key: "JavaScript" },
      { name: "TypeScript", level: 82, key: "TypeScript" },
      { name: "React.js / Next.js", level: 88, key: "React" },
      { name: "Framer Motion & GSAP", level: 85, key: "Animation" },
    ],
  },
  {
    id: "backend",
    category: "Backend & Database",
    iconName: "FaServer",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Node.js & Express.js", level: 84, key: "Node" },
      { name: "RESTful APIs", level: 88, key: "API" },
      { name: "MongoDB & Mongoose", level: 85, key: "MongoDB" },
      { name: "JWT & NextAuth", level: 82, key: "Auth" },
      { name: "Stripe Payment Integration", level: 78, key: "Payment" },
    ],
  },
  {
    id: "tools",
    category: "Tools & Workflow",
    iconName: "FaTools",
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Git & GitHub", level: 90, key: "Git" },
      { name: "VS Code & Antigravity IDE", level: 95, key: "IDE" },
      { name: "Postman & API Testing", level: 88, key: "Testing" },
      { name: "Vercel & Netlify Deployment", level: 92, key: "Deployment" },
      { name: "Responsive & Mobile-First Design", level: 95, key: "Design" },
    ],
  },
];
