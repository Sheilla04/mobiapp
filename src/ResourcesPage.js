// src/ResourcesPage.js
import React from 'react';
import './ResourcesPage.css';

const resources = [
  { title: 'Resource 1', description: 'Description for resource 1', link: '#' },
  { title: 'Resource 2', description: 'Description for resource 2', link: '#' },
  { title: 'Resource 3', description: 'Description for resource 3', link: '#' },
  { title: 'Resource 4', description: 'Description for resource 4', link: '#' },
];

const ResourcesPage = () => {
  return (
    <div className='resource-container' style={{ paddingTop: '50px' }}>
      <div className="resources-page" >
        <h2>Resources</h2>
        <div className="cards-container">
          {resources.map((resource, index) => (
            <div className="card" key={index}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link}>Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </div>  
  );
};

export default ResourcesPage;
