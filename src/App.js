import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SwitchCase from "./components/switchCase/SwitchCase";
import InfinityScroll from "./components/infiniteScroll/InfinityScroll";

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [window.location.pathname]);

  const challenges = [
    { id: 1, title: "Tic-Tac-Toe with Bot (Vanilla JS)", path: "/tic-tac-toe" },
    { id: 2, title: "Feature Flag Component (React)", path: "/feature-flag" },
    { id: 3, title: "Multi-Stepper Component (React)", path: "/multi-stepper" },
    { id: 4, title: "Switch-Case Component (React)", path: "/switch-case", component: SwitchCase },
    { id: 5, title: "Infinite Scroll (React)", path: "/infinite-scroll", component: InfinityScroll },
    { id: 6, title: "Two-Step Login Form (React)", path: "/two-step-login" },
    { id: 7, title: "Todo List (React)", path: "/todo-list" },
    { id: 8, title: "Search with Pagination (React)", path: "/search-pagination" },
    { id: 9, title: "Responsive Slideshow (Vanilla JS)", path: "/responsive-slideshow" },
    { id: 10, title: "Responsive Slideshow Gallery (Vanilla JS)", path: "/slideshow-gallery" },
    { id: 11, title: "Lightbox (React)", path: "/lightbox" },
    { id: 12, title: "Functional Modal (React)", path: "/functional-modal" },
    { id: 13, title: "Detect Overlapping Circles (React)", path: "/overlapping-circles" },
    { id: 14, title: "Animate Elements in Sequence (React)", path: "/animate-sequence" },
    { id: 15, title: "Preview Zoomed Image on Hover (React)", path: "/zoom-image" },
    { id: 16, title: "Search with Autocomplete (React)", path: "/autocomplete" },
    { id: 17, title: "Image Auto-Carousel (React)", path: "/auto-carousel" },
    { id: 18, title: "Search with Autosuggestion (Vanilla JS)", path: "/autosuggestion" },
    { id: 19, title: "Pagination Component (React)", path: "/pagination" },
    { id: 20, title: "Word Typing Effect (React)", path: "/typing-effect" },
    { id: 21, title: "Scroll Indicator (React)", path: "/scroll-indicator" },
    { id: 22, title: "Toggle Switch (React)", path: "/toggle-switch" },
    { id: 23, title: "Accordion (React)", path: "/accordion" },
    { id: 24, title: "Capture Product in Viewport (React)", path: "/viewport-product" },
    { id: 25, title: "Website Walkthrough Assistance (JavaScript)", path: "/walkthrough" },
    { id: 26, title: "Number Increment Counter (React)", path: "/increment-counter" },
    { id: 27, title: "Highlight Text on Selection (JavaScript)", path: "/text-highlight" },
    { id: 28, title: "Batch API Calls in Sequence (JavaScript)", path: "/batch-api" },
    { id: 29, title: "Time in Human-Readable Format (React)", path: "/human-readable-time" },
    { id: 30, title: "Image Comparison Slider (React)", path: "/image-comparison" },
    { id: 31, title: "Preview Selected Color Swatches (React)", path: "/color-swatches" },
    { id: 32, title: "To-Do Card List (React)", path: "/todo-card-list" },
    { id: 33, title: "Multi-Stepper Form (React)", path: "/multi-stepper-form" },
    { id: 34, title: "Grid Component (React)", path: "/grid-component" },
    { id: 35, title: "Spinner with CSS", path: "/spinner" },
  ];

  const navigationCategories = [
    { title: "React Challenges", submenu: challenges.filter(challenge => challenge.title.includes('(React)')) },
    { title: "JavaScript Challenges", submenu: challenges.filter(challenge => challenge.title.includes('(Vanilla JS)') || challenge.title.includes('(JavaScript)')) },
    { title: "UI Components", submenu: challenges.filter(challenge => challenge.title.includes('Component') || challenge.title.includes('Modal') || challenge.title.includes('Accordion') || challenge.title.includes('Slider')) }
  ];

  const LandingPage = () => (
    <>
      <section className="intro-section">
        <div className="content-card">
          <h2 className="section-title">🎯 Why This Repository?</h2>
          <div className="grid-container">
            <div className="feature-card"><h3>Real Interview Questions</h3><p>Curated from actual interviews at top tech companies</p></div>
            <div className="feature-card"><h3>Hands-On Practice</h3><p>Build with React, Vanilla JS, and CSS</p></div>
            <div className="feature-card"><h3>Comprehensive Coverage</h3><p>From Todo Lists to Advanced Challenges</p></div>
            <div className="feature-card"><h3>Interview-Ready</h3><p>Learn best practices and edge cases</p></div>
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="content-card">
          <h2 className="section-title">📋 Machine-Coding Challenges</h2>
          <div className="challenges-grid">
            {challenges.map((challenge) => (
              <Link key={challenge.id} to={challenge.path} className="challenge-card" style={{ textDecoration: "none" }}>
                <div className="challenge-number">{challenge.id}.</div>
                <div className="challenge-title">{challenge.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <Router>
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="header-brand">
            <span className="logo-emoji">🚀</span>
            <h1 className="header-title">Frontend Interview Prep</h1>
          </Link>
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <nav className={`main-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="nav-category">
              <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            </div>
            {navigationCategories.map((category, index) => (
              <div className={`nav-category dropdown ${openDropdown === index ? 'open' : ''}`} key={index}>
                <span className="nav-link dropdown-toggle" onClick={() => handleDropdownToggle(index)}>
                  {category.title} <span className="arrow">▾</span>
                </span>
                <div className="dropdown-menu">
                  {category.submenu.map(challenge => (
                    <Link key={challenge.path} to={challenge.path} className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="challenge-number">{challenge.id}.</span>
                      {challenge.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="nav-category">
              <a href="https://github.com/nitindahiya-dev/machine-coding-prep" target="_blank" rel="noopener noreferrer" className="nav-link github-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="github-emoji">📂</span> GitHub
              </a>
            </div>
          </nav>
        </div>
      </header>
      <div className="landing-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/switch-case" element={<SwitchCase />} />
          <Route path="/infinite-scroll" element={<InfinityScroll />} />
          {challenges.filter(challenge => challenge.path !== "/switch-case" && challenge.path !== "/infinite-scroll").map(challenge => (
            <Route key={challenge.path} path={challenge.path} element={<div className="content-card"><h2>{challenge.title}</h2><p>Coming soon! This component is not yet implemented.</p><Link to="/">Back to Home</Link></div>} />
          ))}
        </Routes>
        <footer className="footer">
          <p>© {new Date().getFullYear()} Frontend Interview Prep. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/nitindahiya-dev/machine-coding-prep" target="_blank" rel="noopener noreferrer"><button className="repo-button">View Repository</button></a>
            <a href="https://github.com/nitindahiya-dev/machine-coding-prep" target="_blank" rel="noopener noreferrer"><button className="contact-button">Contribute</button></a>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;