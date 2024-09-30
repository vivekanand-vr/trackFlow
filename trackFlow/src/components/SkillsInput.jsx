import React, { useState } from 'react';

function SkillsInput({ skills, onSkillsChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (!skills.includes(newSkill)) {
        onSkillsChange([...skills, newSkill]);
      }
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill & press Enter"
        className="border border-gray-300 w-full rounded px-4 py-2 mb-2"
      />
      <div className="flex flex-wrap overflow-y-auto gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-300"
          >
            {skill}
            <button
              className="ml-2 text-blue-500 hover:text-blue-700"
              onClick={() => handleRemoveSkill(skill)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsInput;