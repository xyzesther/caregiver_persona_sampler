import React from 'react';

const ProfileTagRow = ({ age, occupations, relationship, ageIcon, occupationIcon, relationshipIcon }) => {
  return (
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
  );
};

export default ProfileTagRow;
