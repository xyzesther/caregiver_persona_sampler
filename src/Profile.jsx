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
  const occupations = profile['Occupations'] || 'Unknown';
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
