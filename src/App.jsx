import React, { useState } from 'react';
import Profile from './Profile.jsx';
import coverImage from './assets/cover.svg';
import logoImage from './assets/logo.svg';
import peepsThumbnail from './assets/peeps_thumbnail.svg';
import sortByImage from './assets/buttons/sort_by.svg';
import ageGroupImage from './assets/buttons/age_group_selection.svg';
import occupationImage from './assets/buttons/occupation.svg';
import relationshipImage from './assets/buttons/relationship_selection.svg';
import randomProfileImage from './assets/buttons/random_profile_btn.svg';
import './App.css';

const App = () => {
  const [showProfileSampler, setShowProfileSampler] = useState(false);

  if (showProfileSampler) {
    return <Profile />;
  }

  return (
    <div className="app-root">
      {/* Cover section */}
      <div className="cover-section">
        {/* Left: main illustration */}
        <div className="illustration">
          <img src={coverImage} alt="Two caregivers illustration" className="cover-image" />
        </div>

        {/* Right: logo + copy column */}
        <div className="cover-right">
          <div className="cover-logo-row">
            <img
              src={logoImage}
              alt="Caregiver Persona Sampler logo"
              className="cover-logo"
            />
          </div>

          <div className="cover-copy">
            <h1 className="cover-title">
              Spotlighting the hidden heroes in our society
            </h1>

            <p className="cover-lead">
              Need help designing for caregivers but unsure what their life looks like?
            </p>

            <p className="cover-body">
              Caregiver Persona Sampler creates realistic caregiver personas using real survey data.
              Whether you&apos;re building a product or developing a project for the caregiver
              community, this tool helps you better understand your users so you can move smoothly
              into the solution phase.
            </p>
          </div>
        </div>
      </div>

      {/* Sort controls */}
      <div className="sort-row">
        <img src={sortByImage} alt="Sort by" className="sort-label-image" />

        {[
          { id: 'age', label: 'Age Groups', image: ageGroupImage },
          { id: 'occupation', label: 'Occupation', image: occupationImage },
          { id: 'relationship', label: 'Relationship Categories', image: relationshipImage }
        ].map((option) => (
          <div
            key={option.id}
            className="sort-button"
          >
            <img src={option.image} alt={option.label} className="sort-button-image" />
          </div>
        ))}
      </div>

      {/* Explanation + persona grid + random profile button */}
      <div className="cover-section-two">
        {/* Left: text + random profile button */}
        <div className="cover-section-two-left">
          <h2 className="section-subtitle">
            How can this tool support your ideas?
          </h2>

          <p className="section-text">
          Unlike AI persona generators that rely on entirely made-up content, 
          this sampler draws directly from real caregiver survey responses to sample profiles 
          that closely reflect caregivers actual circumstances. It also provides valuable insights 
          into caregivers’ lives and well-being, helping you understand this group holistically and 
          accurately.
          </p>

          <p className="section-text">
            To use the sampler, simply select a profile and filter by age group, occupation, or
            relationship to the care receiver. You can also begin by exploring a random profile
            below.
          </p>

          <button
            type="button"
            onClick={() => setShowProfileSampler(true)}
            className="random-profile-btn"
          >
            <img src={randomProfileImage} alt="Random profile" className="random-profile-image" />
          </button>
        </div>

        {/* Right: persona thumbnail illustration */}
        <div className="cover-section-two-right">
          <div className="personas-card">
            <img
              src={peepsThumbnail}
              alt="Grid of caregiver personas"
              className="personas-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


