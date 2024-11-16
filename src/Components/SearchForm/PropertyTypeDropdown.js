
import React from 'react';

const PropertyTypeDropdown = ({ propertyType, setPropertyType, subType, setSubType }) => {
  const residentialOptions = ['شقة', 'فيلا', 'دوبلكس', 'بنتهاوس', 'شاليه', 'أرض سكنية', 'عقارات سكنية أخرى'];
  const commercialOptions = ['مكتب', 'محل', 'مستودع', 'عقار تجاري آخر'];

  return (
    <div>
      <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
        <option value="سكني">سكني</option>
        <option value="تجاري">تجاري</option>
      </select>
      <div>
        {propertyType === 'سكني' && (
          residentialOptions.map((option) => (
            <button key={option} onClick={() => setSubType(option)}>{option}</button>
          ))
        )}
        {propertyType === 'تجاري' && (
          commercialOptions.map((option) => (
            <button key={option} onClick={() => setSubType(option)}>{option}</button>
          ))
        )}
      </div>
      <div>
        <button onClick={() => setSubType('')}>إعادة ضبط</button>
      </div>
    </div>
  );
};

export default PropertyTypeDropdown;
