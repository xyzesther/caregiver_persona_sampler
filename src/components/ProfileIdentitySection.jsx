import React from 'react';

const ProfileIdentitySection = ({ profileName, personaImage, bioText, behaviorItems, coreNeeds }) => {
  return (
    <>
      <div id="profile-name" className="profile-header-name">
        <h1 className="profile-name">{profileName}</h1>
      </div>

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
    </>
  );
};

export default ProfileIdentitySection;
