import React from 'react'; 
import "./IssueList.scss";
import Issue from '../issue/Issue';

function IssueList() {
 const data = [
        {
            id: 1,
            ticketNumber: 'T001',
            summary: 'Implement user authentication',
            type: 'Task',
            priority: 'High'
          },
          {
            id: 2,
            ticketNumber: 'E001',
            summary: 'Create dashboard epic',
            type: 'Epic',
            priority: 'Medium'
          },
          {
            id: 3,
            ticketNumber: 'B001',
            summary: 'Fix navigation menu bug',
            type: 'Bug',
            priority: 'Low'
          },
          {
            id: 4,
            ticketNumber: 'T002',
            summary: 'Refactor database queries',
            type: 'Task',
            priority: 'Medium'
          },
          {
            id: 5,
            ticketNumber: 'E002',
            summary: 'Implement search functionality epic',
            type: 'Epic',
            priority: 'High'
          },
          {
            id: 6,
            ticketNumber: 'B002',
            summary: 'Resolve performance issue bug',
            type: 'Bug',
            priority: 'Medium'
          },
          {
            id: 7,
            ticketNumber: 'T003',
            summary: 'Optimize frontend code',
            type: 'Task',
            priority: 'Low'
          },
          {
            id: 8,
            ticketNumber: 'E003',
            summary: 'Enhance user profile epic',
            type: 'Epic',
            priority: 'High'
          },
          {
            id: 9,
            ticketNumber: 'B003',
            summary: 'Fix broken link bug',
            type: 'Bug',
            priority: 'Medium'
          },
          {
            id: 10,
            ticketNumber: 'T004',
            summary: 'Add unit tests for backend',
            type: 'Task',
            priority: 'High'
          }
    ]
  return (
      <div className='issue-list'>
          {
              data.map((issue) => {
                  const { id, ticketNumber, summary, type, priority } = issue
                  return <Issue key={id} ticketNumber={ticketNumber}
                  summary={summary} type={type} priority={priority}
                  />
              })
          }
    </div>
  )
}

export default IssueList