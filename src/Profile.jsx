import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import logoImage from './assets/profile/logo.svg';
import ageIcon from './assets/profile/age_icon.svg';
import occupationIcon from './assets/profile/work_icon.svg';
import relationshipIcon from './assets/profile/relationship_icon.svg';
import nextProfileBtn from './assets/profile/next_profile_btn.svg';
import disclaimerImage from './assets/profile/disclaimer.svg';
import caretakingTimeImage from './assets/care_vs_work/caretaking_time.svg';
import workHoursImage from './assets/care_vs_work/work_hours.svg';
import timeRelationGraphImage from './assets/care_vs_work/time_relation_graph.svg';
import './Profile.css';

// Import all age group images
import ageGroup1 from './assets/age_groups/1.svg';
import ageGroup2 from './assets/age_groups/2.svg';
import ageGroup3 from './assets/age_groups/3.svg';
import ageGroup4 from './assets/age_groups/4.svg';
import ageGroup5 from './assets/age_groups/5.svg';
import ageGroup6 from './assets/age_groups/6.svg';
import ageGroup7 from './assets/age_groups/7.svg';
import ageGroup8 from './assets/age_groups/8.svg';
import ageGroup9 from './assets/age_groups/9.svg';

// Map age group numbers to images
const ageGroupImages = {
  1: ageGroup1,
  2: ageGroup2,
  3: ageGroup3,
  4: ageGroup4,
  5: ageGroup5,
  6: ageGroup6,
  7: ageGroup7,
  8: ageGroup8,
  9: ageGroup9,
};

// Import all persona images
import ashleyImage from './assets/personas/Ashley.svg';
import barbaraImage from './assets/personas/Barbara.svg';
import dorothyImage from './assets/personas/Dorothy.svg';
import eleanorImage from './assets/personas/Eleanor.svg';
import frankImage from './assets/personas/Frank.svg';
import haroldImage from './assets/personas/Harold.svg';
import helenImage from './assets/personas/Helen.svg';
import jenniferImage from './assets/personas/Jennifer.svg';
import lindaImage from './assets/personas/Linda.svg';
import margaretImage from './assets/personas/Margaret.svg';
import mariaImage from './assets/personas/Maria.svg';
import michaelImage from './assets/personas/Michael.svg';
import patriciaImage from './assets/personas/Patricia.svg';
import robertImage from './assets/personas/Robert.svg';

// Map names to images
const personaImages = {
  'Ashley': ashleyImage,
  'Barbara': barbaraImage,
  'Dorothy': dorothyImage,
  'Eleanor': eleanorImage,
  'Frank': frankImage,
  'Harold': haroldImage,
  'Helen': helenImage,
  'Jennifer': jenniferImage,
  'Linda': lindaImage,
  'Margaret': margaretImage,
  'Maria': mariaImage,
  'Michael': michaelImage,
  'Patricia': patriciaImage,
  'Robert': robertImage,
};

const Profile = () => {
  const [allData, setAllData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dotOffset, setDotOffset] = useState(0);

  useEffect(() => {
    fetch('/data/selected_12_caregiver_profiles_0201.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data.filter((row) => row.Name && row.Profile_ID);
            setAllData(rows);
            setLoading(false);
          },
        });
      });
  }, []);

  // Scroll tracking for navigation indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'profile-header', name: 'header' },
        { id: 'profile-hero', name: 'hero' },
        { id: 'profile-more-about-caregivers', name: 'more-about' },
        { id: 'profile-age-groups', name: 'age-groups' },
        { id: 'profile-care-vs-work', name: 'care-vs-work' },
        { id: 'profile-financial-mental-health', name: 'financial-mental' },
      ];

      const scrollPosition = window.scrollY + 200;
      let activeIndex = 0;

      // Find active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop - 100) {
            activeIndex = i;
            break;
          }
        }
      }

      // Calculate dot position based on active navigation link
      const navLinks = document.querySelectorAll('.profile-nav-link');
      if (navLinks[activeIndex]) {
        const linkRect = navLinks[activeIndex].getBoundingClientRect();
        const navContainer = document.querySelector('.profile-navigator-bg');
        if (navContainer) {
          const containerRect = navContainer.getBoundingClientRect();
          const relativeTop = linkRect.top - containerRect.top + linkRect.height / 2;
          setDotOffset(relativeTop);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    // Also recalculate on resize
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % allData.length);
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    // Special case: scroll to top for header
    if (sectionId === 'profile-header' || sectionId === 'profile-header-buttons') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140; // Account for padding-top
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading || allData.length === 0) {
    return <div className="profile-page-loading">Loading caregiver profiles…</div>;
  }

  const profile = allData[currentIndex];

  const age = profile['age_group'] || 'Unknown';
  const relationship = profile['relationship'] || 'Caregiver';
  const occupations = profile['occupation'] || 'Unknown';
  const bioText = profile.Bio || '';
  const profileName = profile.Name || 'Unknown';
  
  // Get persona image based on name
  const personaImage = personaImages[profileName] || mariaImage; // Default to Maria if not found

  const behaviorItems = [
    profile['Behavior 1'],
    profile['Behavior 2'],
    profile['Behavior 3'],
    profile['Behavior 4'],
    profile['Behavior 5'],
  ].filter((item) => item && String(item).trim().length > 0);

  const coreNeeds = [
    profile['Core Needs 1'],
    profile['Core Needs 2'],
    profile['Core Needs 3'],
    profile['Core Needs 4'],
    profile['Core Needs 5'],
  ].filter((item) => item && String(item).trim().length > 0);

  // Function to get age group image based on age_group text
  // Extract the first digit from age_group (e.g., "18 - 19" -> 1, "30 - 39" -> 3, "90+" -> 9)
  const getAgeGroupImage = (ageGroupText) => {
    if (!ageGroupText) return ageGroup1; // Default to 1.svg
    
    // Extract first digit from the age group string
    const match = ageGroupText.match(/^(\d+)/);
    if (match) {
      const firstNumber = parseInt(match[1], 10);
      // Get the first digit (tens place)
      const firstDigit = Math.floor(firstNumber / 10);
      // Map to 1-9 range
      const imageIndex = firstDigit || 1;
      return ageGroupImages[imageIndex] || ageGroup1;
    }
    return ageGroup1; // Default fallback
  };

  const ageGroupDistributionImage = getAgeGroupImage(age);

  return (
    <div className="profile-page-root">
      {/* Fixed logo - independent positioning */}
      <div className="profile-logo-fixed">
        <img src={logoImage} alt="Caregiver Persona Sampler logo" className="profile-logo" />
      </div>

      {/* Fixed navigation card - independent positioning */}
      <div className="profile-sidebar-fixed">
        <div className="profile-navigator-container">
          <div className="profile-navigator-bg">
            <div className="profile-navigation-links">
              <button 
                className="profile-nav-link" 
                onClick={() => scrollToSection('profile-header')}
              >
                Caregiver's Bio
              </button>
              <button 
                className="profile-nav-link" 
                onClick={() => scrollToSection('profile-more-about-caregivers')}
              >
                More info about Caregivers:
              </button>
              <div className="profile-nav-group">
                <button 
                  className="profile-nav-link" 
                  onClick={() => scrollToSection('profile-age-groups')}
                >
                  Age Groups
                </button>
                <button 
                  className="profile-nav-link" 
                  onClick={() => scrollToSection('profile-care-vs-work')}
                >
                  Working hours
                </button>
                <button 
                  className="profile-nav-link" 
                  onClick={() => scrollToSection('profile-financial-mental-health')}
                >
                  Financial & Mental Health
                </button>
              </div>
            </div>
            <div 
              className="profile-navigation-indicator"
              style={{ 
                top: `${dotOffset}px`,
                transform: `translateX(-50%) translateY(-50%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="profile-content-wrapper">
        {/* Buttons row */}
        <div id="profile-header" className="profile-header-buttons">
          <div className="profile-tag-row">
            <div className="profile-tag-wrapper">
              <div className="profile-tag">
                <div className="profile-tag-main">
                  {age}
                  <img src={ageIcon} alt="Age" className="profile-tag-icon" />
                </div>
                <div className="profile-tag-expanded">
                  <div className="profile-tag-header">
                    <span className="profile-tag-title">Age Groups</span>
                    <img src={ageIcon} alt="Age" className="profile-tag-header-icon" />
                  </div>
                  <ul className="profile-tag-list">
                    <li>Age 18 - 19</li>
                    <li>Age 20 - 29</li>
                    <li>Age 30 - 39</li>
                    <li>Age 40 - 49</li>
                    <li>Age 50 - 59</li>
                    <li>Age 60 - 69</li>
                    <li>Age 70 - 79</li>
                    <li>Age 80 - 89</li>
                    <li>Age 90+</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="profile-tag-wrapper">
              <div className="profile-tag">
                <div className="profile-tag-main">
                  {occupations}
                  <img src={occupationIcon} alt="Work" className="profile-tag-icon" />
                </div>
                <div className="profile-tag-expanded">
                  <div className="profile-tag-header">
                    <span className="profile-tag-title">Occupations</span>
                    <img src={occupationIcon} alt="Work" className="profile-tag-header-icon" />
                  </div>
                  <ul className="profile-tag-list">
                    <li>Unemployed</li>
                    <li>Part-time Employed</li>
                    <li>Full-time Employed</li>
                    <li>Retired</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="profile-tag-wrapper">
              <div className="profile-tag">
                <div className="profile-tag-main">
                  {relationship}
                  <img src={relationshipIcon} alt="Relationship" className="profile-tag-icon" />
                </div>
                <div className="profile-tag-expanded">
                  <div className="profile-tag-header">
                    <span className="profile-tag-title">Relationship Categories</span>
                    <img src={relationshipIcon} alt="Relationship" className="profile-tag-header-icon" />
                  </div>
                  <ul className="profile-tag-list">
                    <li>Parent</li>
                    <li>Spouse/Partner</li>
                    <li>Other family member</li>
                    <li>Friend/Neighbor</li>
                    <li>Other</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <div id="profile-name" className="profile-header-name">
          <h1 className="profile-name">{profileName}</h1>
        </div>

        {/* Hero layout: illustration + bio */}
        <div id="profile-hero" className="profile-hero">
          <div className="profile-hero-left">
            <div className="profile-portrait-card">
              <img src={personaImage} alt={`${profileName} illustration`} className="profile-portrait-image" />
            </div>
          </div>

          <div className="profile-hero-right">
            <div className="profile-card profile-card-bio">
              <h2 className="profile-card-title">Bio</h2>
              <p className="profile-card-body">{bioText}</p>
            </div>
          </div>
        </div>

        {/* Behavior and Core Needs cards */}
        <div id="profile-behavior-core" className="profile-card-grid">
          <div className="profile-card">
            <h3 className="profile-card-title">Behavior</h3>
            <ul className="profile-list">
              {behaviorItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="profile-card">
            <h3 className="profile-card-title">Core Needs</h3>
            <ul className="profile-list">
              {coreNeeds.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* More About Caregivers module */}
        <div id="profile-more-about-caregivers" className="profile-more-about-caregivers">
          {/* Title and Disclaimer header row */}
          <div className="profile-more-about-header">
            <h2 className="profile-more-about-title">More About Caregivers</h2>
            <div className="profile-disclaimer-wrapper">
              <img 
                src={disclaimerImage} 
                alt="Disclaimer" 
                className="profile-disclaimer-image" 
              />
            </div>
          </div>
          
          {/* Age Group Distribution section */}
          <div id="profile-age-groups" className="profile-age-group-distribution">
            <div className="profile-age-group-content">
              <div className="profile-age-group-chart">
                <img 
                  src={ageGroupDistributionImage} 
                  alt="Age Group Distribution" 
                  className="profile-age-group-image" 
                />
              </div>
              <div className="profile-age-group-right">
                <h3 className="profile-age-group-title">Age Groups</h3>
                <div className="profile-age-group-text">
                  <p className="profile-age-group-paragraph">
                    Age is an important factor when studying caregivers because it influences their physical capacity, emotional resilience, financial stability, and social support networks. Younger caregivers may struggle with balancing caregiving duties alongside education or early career demands, while older caregivers might face their own health challenges or retirement-related stress.
                  </p>
                  <p className="profile-age-group-paragraph">
                    Understanding age differences helps reveal the diverse needs and pressures caregivers experience at different life stages, allowing for more tailored support systems and resources.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Care taking hours VS Working hours section */}
          <div id="profile-care-vs-work" className="profile-care-vs-work-distribution">
            <h3 className="profile-care-vs-work-title">Care taking hours VS Working hours</h3>
            <div className="profile-care-vs-work-text">
              <div className="profile-care-vs-work-text-left">
                <p className="profile-care-vs-work-paragraph">
                  Working time and caregiving time are both important to understand because they show how much pressure a caregiver might be under. If someone spends many hours at their job and also takes care of another person for a long part of the day, it can be very tiring and overwhelming.
                </p>
              </div>
              <div className="profile-care-vs-work-text-right">
                <p className="profile-care-vs-work-paragraph">
                  They might not have enough time to rest, relax, or take care of their own needs. This can lead to stress or feeling burned out. Looking at how much time people spend working and caregiving helps us see what kind of support they might need, like more flexible schedules or help with caregiving tasks.
                </p>
              </div>
            </div>
            <div className="profile-care-vs-work-charts">
              <img 
                src={caretakingTimeImage} 
                alt="Care taking hours" 
                className="profile-care-vs-work-image" 
              />
              <img 
                src={workHoursImage} 
                alt="Working hours" 
                className="profile-care-vs-work-image" 
              />
            </div>
            
            {/* Care taking hours VS Working hours correlation section */}
            <div className="profile-care-vs-work-correlation">
              <h3 className="profile-care-vs-work-correlation-title">Care taking hours VS Working hours correlation</h3>
              <div className="profile-care-vs-work-correlation-content">
                <div className="profile-care-vs-work-correlation-text">
                  <p className="profile-care-vs-work-correlation-paragraph">
                    According to the voluntary caregiver survey, each additional hour of paid work is associated with a 10-minute decrease in time spent on caregiving.
                  </p>
                  <p className="profile-care-vs-work-correlation-disclaimer">
                    *Graph is not to scale
                  </p>
                </div>
                <div className="profile-care-vs-work-correlation-graph">
                  <img 
                    src={timeRelationGraphImage} 
                    alt="Care taking hours VS Working hours correlation" 
                    className="profile-care-vs-work-correlation-image" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Financial Status and Mental Health section - placeholder */}
          <div id="profile-financial-mental-health" className="profile-financial-mental-health-distribution">
            <h3 className="profile-financial-mental-health-title">Financial Status and Mental Health</h3>
            <div className="profile-financial-mental-health-placeholder">
              <p>Content coming soon...</p>
            </div>
          </div>
        </div>

        <div className="profile-footer-nav">
          <button type="button" className="profile-next-button" onClick={handleNextProfile}>
            <img src={nextProfileBtn} alt="Next Caregiver's Profile" className="profile-next-button-image" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
