import React from 'react';

const ProfileSidebar = ({ logoImage, dotOffset, scrollToSection }) => {
  return (
    <>
      <div className="profile-logo-fixed">
        <img src={logoImage} alt="Caregiver Persona Sampler logo" className="profile-logo" />
      </div>

      <div className="profile-sidebar-fixed">
        <div className="profile-navigator-container">
          <div className="profile-navigator-bg">
            <div className="profile-navigation-links">
              <button className="profile-nav-link" onClick={() => scrollToSection('profile-header')}>
                Caregiver&apos;s Bio
              </button>
              <button className="profile-nav-link" onClick={() => scrollToSection('profile-more-about-caregivers')}>
                More info about Caregivers:
              </button>
              <div className="profile-nav-group">
                <button className="profile-nav-link" onClick={() => scrollToSection('profile-age-groups')}>
                  Age Groups
                </button>
                <button className="profile-nav-link" onClick={() => scrollToSection('profile-care-vs-work')}>
                  Working hours
                </button>
                <button className="profile-nav-link" onClick={() => scrollToSection('profile-financial-mental-health')}>
                  Financial & Mental Health
                </button>
              </div>
            </div>
            <div
              className="profile-navigation-indicator"
              style={{
                top: `${dotOffset}px`,
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
