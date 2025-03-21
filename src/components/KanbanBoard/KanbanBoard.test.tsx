// import * as React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import KanbanBoard from './KanbanBoard';

// // Mock the react-beautiful-dnd components
// jest.mock('react-beautiful-dnd', () => ({
//   DragDropContext: ({ children }: { children: React.ReactNode }) => (
//     <div>{children}</div>
//   ),
//   Droppable: ({ children }: { 
//     children: (
//       provided: any, 
//       snapshot: { isDraggingOver: boolean }
//     ) => React.ReactNode 
//   }) => children(
//     { innerRef: jest.fn(), droppableProps: {} },
//     { isDraggingOver: false }
//   ),
//   Draggable: ({ children }: { 
//     children: (
//       provided: any,
//       snapshot: { isDragging: boolean }
//     ) => React.ReactNode 
//   }) => children(
//     { innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} },
//     { isDragging: false }
//   )
// }));

// describe('KanbanBoard', () => {
//   it('should move task from inProgress to backlog', async () => {
//     // Render the component
//     const { container } = render(<KanbanBoard />);

//     // Find the inProgress column
//     const inProgressColumn = screen.getByText('inProgress');
//     expect(inProgressColumn).toBeInTheDocument();

//     // Find the backlog column
//     const backlogColumn = screen.getByText('backlog');
//     expect(backlogColumn).toBeInTheDocument();

//     // Get the first task in inProgress
//     const task = screen.getByText('Implement dark mode');
//     expect(task).toBeInTheDocument();

//     // Simulate drag start
//     fireEvent.dragStart(task);

//     // Simulate drag over backlog column
//     fireEvent.dragOver(backlogColumn);

//     // Simulate drop
//     fireEvent.drop(backlogColumn);

//     // Verify task moved to backlog
//     const movedTask = await screen.findByText('Implement dark mode');
//     expect(movedTask).toBeInTheDocument();
//     expect(backlogColumn).toContainElement(movedTask);
//   });
// });
