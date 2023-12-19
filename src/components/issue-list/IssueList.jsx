import React from 'react'; 
import "./IssueList.scss";
import Issue from '../issue/Issue';

function IssueList({issues}) {

  return (
      <div className='issue-list'>
          {
              issues?.map((issue) => {
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