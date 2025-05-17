//src/components/switchCase/SwitchCase.jsx

import React, { useState } from 'react'
import Switch from './Switch'
import Case from './Case'

const SwitchCase = () => {
  const [currentCase, setCurrentCase] = useState('z')

  return (
    <div className="switch-case-container">
      <h1>Switch Case Demo</h1>

      <div className="case-selector">
        {['x', 'y', 'z'].map((caseType) => (
          <button
            key={caseType}
            className={`case-button ${currentCase === caseType ? 'active' : ''}`}
            onClick={() => setCurrentCase(caseType)}
          >
            Case {caseType.toUpperCase()}
          </button>
        ))}
      </div>

      <Switch on={currentCase}>
        <Case value="x">
          <div className="case-content" data-case="x">
            <h2>Welcome to Case X</h2>
            <p>Discover amazing content tailored just for you. Explore new possibilities and unlock hidden features.</p>
          </div>
        </Case>
        <Case value="y">
          <div className="case-content" data-case="y">
            <h2>Case Y Activated</h2>
            <p>Experience premium features with enhanced security. Your data is protected with advanced encryption.</p>
          </div>
        </Case>
        <Case value="z">
          <div className="case-content" data-case="z">
            <h2>Maximum Power: Case Z</h2>
            <p>You've unlocked all premium features. Enjoy unlimited access to our exclusive resources and tools.</p>
          </div>
        </Case>
      </Switch>
    </div>
  )
}

export default SwitchCase