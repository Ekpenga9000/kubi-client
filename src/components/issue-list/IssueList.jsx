import React from "react";
import "./IssueList.scss";
import Issue from "../issue/Issue";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function IssueList({ issues }) {
  return (
    <div className="issue-list">
      <SortableContext items={issues} strategy={verticalListSortingStrategy}>
        {issues?.map((issue) => {
          const { id, ticketNumber, summary, type, priority } = issue;
          return (
            <Issue
              key={id}
              id={id}
              ticketNumber={ticketNumber}
              summary={summary}
              type={type}
              priority={priority}
            />
          );
        })}
      </SortableContext>
    </div>
  );
}

export default IssueList;
