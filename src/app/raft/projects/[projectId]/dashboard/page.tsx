// File: app/raft/projects/[projectId]/dashboard/page.tsx

import dynamic from 'next/dynamic';

// Dynamically import your client-side components
const KanbanBoard = dynamic(() => import('@/components/kanban/KanbanBoard'), { ssr: false });
const LeftNavbar = dynamic(() => import('@/components/common/LeftNavbar'), { ssr: false });

const mockProjects = [
    {
        id: "1",
        name: "Website Redesign",
        description: "Redesign the company website with new branding",
    },
    {
        id: "2",
        name: "Mobile App Development",
        description: "Develop a new mobile app for customers",
    },
    {
        id: "3",
        name: "Marketing Campaign",
        description: "Q2 marketing campaign for new product launch",
    },
    {
        id: "4",
        name: "Database Migration",
        description: "Migrate from MySQL to PostgreSQL",
    },
];

export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    projectId: project.id,
  }));
}

export default function DashboardPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;

  const project = mockProjects.find((p) => p.id === projectId);

  return (
    <div className="flex">
      <LeftNavbar>
        <KanbanBoard projectName={project.name}/>
      </LeftNavbar>
    </div>
  );
}
