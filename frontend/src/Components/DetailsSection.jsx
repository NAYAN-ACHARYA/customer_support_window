import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Or any icon library

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button className="accordion-button" onClick={() => setOpen(!open)}>
        {title}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const DetailsSection = () => {
  return (
    <div className="details-section">
      <div className="text-info">
        <p>
          <strong>Assignee:</strong> Brian Byrne
        </p>
        <p>
          <strong>Team:</strong> Unassigned
        </p>
      </div>

      <div className="accordion-list">
        <AccordionItem title="Links">
          <div className="space-y-2">
            <div className="flex-between">
              <span>Tracker ticket</span> <button className="btn-plus">+</button>
            </div>
            <div className="flex-between">
              <span>Back-office tickets</span> <button className="btn-plus">+</button>
            </div>
            <div className="flex-between">
              <span>Side conversations</span> <button className="btn-plus">+</button>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem title="User Data">No user data available.</AccordionItem>
        <AccordionItem title="Conversation Attributes">No attributes found.</AccordionItem>
        <AccordionItem title="Company Details">Acme Corp — Active</AccordionItem>
        <AccordionItem title="Salesforce">Synced with Salesforce CRM.</AccordionItem>
        <AccordionItem title="Stripe">Customer ID: cus_ABC123</AccordionItem>
        <AccordionItem title="Jira for Tickets">No linked Jira tickets.</AccordionItem>
      </div>
    </div>
  );
};

export default DetailsSection;
