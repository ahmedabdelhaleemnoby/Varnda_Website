import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PropertySection.css';

const PropertySection = ({ propertiesForSale, propertiesForRent, heading }) => {
  const [expansionState, setExpansionState] = useState({});

  const toggleExpand = (category) => {
    setExpansionState(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  const [activeTab, setActiveTab] = useState('للبيع');
  const currentProperties = activeTab === 'للبيع' ? propertiesForSale : propertiesForRent;

  return (
    <div className="property-section container">
      <h2 className="h1">الأكثر بحثاً في {heading}</h2>
      <div className="tabs">
        <span className={`tab ${activeTab === 'للبيع' ? 'active' : ''}`} onClick={() => setActiveTab('للبيع')}>للبيع</span>
        <span className={`tab ${activeTab === 'للايجار' ? 'active' : ''}`} onClick={() => setActiveTab('للايجار')}>للايجار</span>
      </div>
      <div className="property-lists">
        {Object.entries(currentProperties).map(([category, items], index) => (
          <div key={index} className="property-category">
            <h3>{category}</h3>
            <ul>
              {items.slice(0, expansionState[category] ? items.length : 3).map((item, idx) => (
                <li key={idx}>
                  <Link to={`/search/${item}`}>{item}</Link>
                </li>
              ))}
            </ul>
            {items.length > 3 && (
              <div className='togglr-cont'>
                <span className="toggle" onClick={() => toggleExpand(category)}>
                  {expansionState[category] ? 'عرض أقل' : 'عرض الكل'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySection;
