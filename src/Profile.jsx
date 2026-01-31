import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import agathaImage from './assets/personas/Agatha.svg';
import logoImage from './assets/profile/logo.svg';
import ageIcon from './assets/profile/age_icon.svg';
import occupationIcon from './assets/profile/work_icon.svg';
import relationshipIcon from './assets/profile/relationship_icon.svg';
import navigatorBg from './assets/profile/navigator_bg.svg';
import './Profile.css';

const Profile = () => {
  const [allData, setAllData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/caregivers_samples.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data.filter((row) => row.Age);
            setAllData(rows);
            setLoading(false);
          },
        });
      });
  }, []);

  const handleNextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % allData.length);
  };

  if (loading || allData.length === 0) {
    return <div className="profile-page-loading">Loading caregiver profiles…</div>;
  }

  const profile = allData[currentIndex];

  const age = profile.Age || '—';
  const relationship = profile['Relationship Categories'] || 'Caregiver';
  const experience = profile['Care giving experience'] || 'N/A';
  const bioText = profile.Bio || '';

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

  return (
    <div className="profile-page-root">
      {/* Fixed logo - independent positioning */}
      <div className="profile-logo-fixed">
        <img src={logoImage} alt="Caregiver Persona Sampler logo" className="profile-logo" />
      </div>

      {/* Fixed navigation card - independent positioning */}
      <div className="profile-sidebar-fixed">
        <img src={navigatorBg} alt="Navigation" className="profile-navigator-bg" />
      </div>

      {/* Scrollable content area */}
      <div className="profile-content-wrapper">
        {/* Buttons row */}
        <div className="profile-header-buttons">
          <div className="profile-tag-row">
            <span className="profile-tag">
              {age}
              <img src={ageIcon} alt="Age" className="profile-tag-icon" />
            </span>
            <span className="profile-tag">
              {experience}
              <img src={occupationIcon} alt="Work" className="profile-tag-icon" />
            </span>
            <span className="profile-tag">
              {relationship}
              <img src={relationshipIcon} alt="Relationship" className="profile-tag-icon" />
            </span>
          </div>
        </div>

        {/* Name */}
        <div className="profile-header-name">
          <h1 className="profile-name">Agatha</h1>
        </div>

        {/* Hero layout: illustration + bio */}
        <div className="profile-hero">
          <div className="profile-hero-left">
            <div className="profile-portrait-card">
              <img src={agathaImage} alt="Caregiver illustration" className="profile-portrait-image" />
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
        <div className="profile-card-grid">
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

        <div className="profile-footer-nav">
          <button type="button" className="profile-next-button" onClick={handleNextProfile}>
            Next Caregiver&apos;s Profile →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
