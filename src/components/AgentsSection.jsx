// src/components/AgentsSection/AgentsSection.js
import React from 'react';
import '../Css/AgentsSection.css';

const AgentsSection = () => {
  const agents = [
    {
      id: 1,
      name: 'Robert Davis',
      role: 'Senior Agent',
      properties: 42,
      image: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    {
      id: 2,
      name: 'Jennifer Wilson',
      role: 'Luxury Specialist',
      properties: 28,
      image: 'https://randomuser.me/api/portraits/women/41.jpg'
    },
    {
      id: 3,
      name: 'David Thompson',
      role: 'Commercial Expert',
      properties: 35,
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 4,
      name: 'Amanda Lee',
      role: 'First-time Buyer Specialist',
      properties: 19,
      image: 'https://randomuser.me/api/portraits/women/22.jpg'
    }
  ];

  return (
    <section className="agents-section">
      <div className="section-header">
        <h2>Our Top Agents</h2>
        <p>Meet our experienced and dedicated real estate professionals</p>
      </div>
      <div className="agents-grid">
        {agents.map(agent => (
          <div key={agent.id} className="agent-card">
            <img src={agent.image} alt={agent.name} className="agent-image" />
            <div className="agent-info">
              <h3>{agent.name}</h3>
              <p className="agent-role">{agent.role}</p>
              <p className="agent-properties">{agent.properties} Properties</p>
            </div>
            <button className="contact-agent-btn">Contact</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgentsSection;