const AGREEMENT_SCORE = {
  'Strongly agree': 5,
  Agree: 4,
  Neutral: 1,
  Disagree: 0,
  'Strongly disagree': 0,
};

const MENTAL_STATE_SCORE = {
  Poor: 5,
  'Below average': 4,
  Average: 1,
  Good: 0,
  Excellent: 0,
};

const MENTAL_HEALTH_COLUMNS = [
  'experience anxiety or depression',
  'struggling with restful sleep',
  'fluctuating appetite patterns',
  'difficulty connecting socially',
  'lost joy in activities',
  'constantly feeling overwhelmed',
  'feel trapped',
  'losing temper',
  'health issues hinder care',
  'constant worry when away',
  'fear of not doing enough',
];

const UNMET_NEED_COLUMNS = [
  'unmet caregiver need_financial',
  'unmet caregiver need_training',
  'unmet caregiver need_access',
  'unmet caregiver need_groups',
  'unmet caregiver need_counseling',
  'unmet caregiver need_respite care',
  'unmet caregiver need_loved one physician',
  'unmet caregiver need_ employer accommodation',
];

const SUPPORT_COLUMNS = [
  'lacking any support',
  'training_support',
  'access_support',
  'group_support',
  'counselling_support',
  'respite care_support',
  'loved one physician_support',
  'financial_support',
  'employer accommodation_support',
  'fund_ All the care they receive is free or donated',
  'fund_family contributions',
  'fund_pension, savings, or retirement fund',
  'fund_medicare, medicaid, SSDI, or VA benefits',
  'fund_medical insurance',
  'fund_long-term care insurance',
  'received_federal state local fund',
];

function isFilled(value) {
  return value != null && String(value).trim().length > 0;
}

function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function startsWithVowelSound(word) {
  return /^[aeiou]/i.test(String(word).trim());
}

function withArticle(phrase) {
  const trimmed = String(phrase).trim();
  return `${startsWithVowelSound(trimmed) ? 'an' : 'a'} ${trimmed}`;
}

function ageDecadePhrase(ageNumeric) {
  const age = Number.parseInt(ageNumeric, 10);
  if (!Number.isFinite(age)) return 'unknown age';
  if (age <= 19) return 'late teens';
  if (age <= 29) return 'twenties';
  if (age <= 39) return 'thirties';
  if (age <= 49) return 'forties';
  if (age <= 59) return 'fifties';
  if (age <= 69) return 'sixties';
  if (age <= 79) return 'seventies';
  if (age <= 89) return 'eighties';
  return 'nineties';
}

function formatRelationship(relationship) {
  const map = {
    Parent: 'parent',
    'Spouse/Partner': 'spouse/partner',
    'Friend/Neighbor': 'friend/neighbor',
    'Other family member': 'family member',
    'Other (please specify)': 'care recipient',
  };
  return map[relationship] || String(relationship || 'care recipient').toLowerCase();
}

function formatCareExperience(experience) {
  if (!experience) return 'some time';
  if (experience === 'Less than a year') return 'less than a year';
  return experience;
}

function employmentLabel(category, schoolStatus) {
  if (category === 'Retired') return 'retirement';
  if (category === 'Unemployed' && schoolStatus === 'in_school') return 'studies';
  if (category === 'Unemployed') return 'unemployment';
  if (category === 'Full-time') return 'full-time work';
  if (category === 'Part-time') return 'part-time work';
  return 'work and caregiving responsibilities';
}

function occupationLabelForBio(category, schoolStatus, careerTitle) {
  if (category === 'Unemployed' && schoolStatus === 'in_school') return 'student';
  if (category === 'Retired') return `retired ${careerTitle}`;
  if (category === 'Unemployed') return `unemployed ${careerTitle}`;
  if (category === 'Part-time') return `part-time ${careerTitle}`;
  if (category === 'Full-time') return `full-time ${careerTitle}`;
  return careerTitle || 'caregiver';
}

function pronounSubject(profile) {
  return capitalize(profile.Pronoun_Subject || 'They');
}

function possessive(profile) {
  return profile.Pronoun_Possessive || 'their';
}

function mentalHealthSentence(column, value, profile) {
  const subject = pronounSubject(profile);
  const poss = possessive(profile);

  const templates = {
    'experience anxiety or depression': {
      'Strongly agree': `${subject} strongly agrees that caregiving contributes to anxiety or depression.`,
      Agree: `${subject} reports experiencing anxiety or depression related to caregiving.`,
    },
    'struggling with restful sleep': {
      'Strongly agree': `${subject} strongly agrees that restful sleep is difficult because of caregiving demands.`,
      Agree: `${subject} struggles to maintain restful sleep while managing caregiving responsibilities.`,
    },
    'fluctuating appetite patterns': {
      'Strongly agree': `${subject} strongly agrees that appetite patterns fluctuate under caregiving stress.`,
      Agree: `${subject} reports fluctuating appetite patterns during periods of caregiving pressure.`,
    },
    'difficulty connecting socially': {
      'Strongly agree': `${subject} strongly agrees that caregiving makes social connection difficult.`,
      Agree: `${subject} experiences difficulty connecting socially while providing care.`,
    },
    'lost joy in activities': {
      'Strongly agree': `${subject} strongly agrees that caregiving has reduced joy in everyday activities.`,
      Agree: `${subject} reports losing joy in activities that used to feel meaningful.`,
    },
    'constantly feeling overwhelmed': {
      'Strongly agree': `${subject} strongly agrees that caregiving responsibilities feel constantly overwhelming.`,
      Agree: `${subject} often feels overwhelmed by caregiving responsibilities.`,
    },
    'feel trapped': {
      'Strongly agree': `${subject} strongly agrees that caregiving responsibilities can feel trapping.`,
      Agree: `${subject} sometimes feels trapped between caregiving duties and personal needs.`,
    },
    'losing temper': {
      'Strongly agree': `${subject} strongly agrees that stress sometimes leads to losing patience while caregiving.`,
      Agree: `${subject} reports difficulty managing temper under sustained caregiving stress.`,
    },
    'health issues hinder care': {
      'Strongly agree': `${subject} strongly agrees that personal health issues hinder caregiving capacity.`,
      Agree: `${subject} reports that health issues sometimes interfere with caregiving duties.`,
    },
    'constant worry when away': {
      'Strongly agree': `${subject} strongly agrees that worry continues even when away from the care recipient.`,
      Agree: `${subject} experiences constant worry about the care recipient when not present.`,
    },
    'fear of not doing enough': {
      'Strongly agree': `${subject} strongly agrees with fear of not doing enough as a caregiver.`,
      Agree: `${subject} worries about whether ${poss} care is sufficient for the recipient's needs.`,
    },
  };

  return templates[column]?.[value] || null;
}

function mentalStateSentence(value, profile) {
  const subject = pronounSubject(profile);
  if (value === 'Poor') {
    return `${subject} describes ${possessive(profile)} overall mental state as poor.`;
  }
  if (value === 'Below average') {
    return `${subject} describes ${possessive(profile)} overall mental state as below average.`;
  }
  return null;
}

function contextualBehaviorSentence(key, profile) {
  const subject = pronounSubject(profile);
  const poss = possessive(profile);
  const relationship = formatRelationship(profile['relationship to the person you care for']);
  const careHours = Number.parseFloat(profile['hours spent for care_weekly']);
  const workHours = Number.parseFloat(profile['hours works at job']);

  switch (key) {
    case 'relationship to the person you care for':
      return `${subject} provides care for ${poss} ${relationship}.`;
    case 'Care giving experience':
      return `${subject} has ${formatCareExperience(profile['Care giving experience'])} of caregiving experience.`;
    case 'sole caregiver or not':
      if (profile['sole caregiver or not'] === 'Yes') {
        return `${subject} is the sole caregiver and carries primary responsibility for daily care.`;
      }
      return `${subject} shares caregiving responsibilities with at least one other person.`;
    case 'hours spent for care_weekly':
      if (Number.isFinite(careHours) && careHours >= 40) {
        return `${subject} provides intensive care at about ${Math.round(careHours)} hours per week.`;
      }
      if (Number.isFinite(careHours)) {
        return `${subject} spends about ${Math.round(careHours)} hours per week on caregiving tasks.`;
      }
      return null;
    case 'hours works at job':
      if (Number.isFinite(workHours) && workHours >= 40) {
        return `${subject} also maintains full-time paid work at about ${Math.round(workHours)} hours per week.`;
      }
      if (Number.isFinite(workHours) && workHours > 0) {
        return `${subject} balances paid work at about ${Math.round(workHours)} hours per week with caregiving.`;
      }
      if (Number.isFinite(workHours) && workHours === 0) {
        return `${subject} is not currently working paid hours while providing care.`;
      }
      return null;
    case 'living situation':
      if (!isFilled(profile['living situation'])) return null;
      return `The care recipient's living situation is: ${profile['living situation']}.`;
    default:
      return null;
  }
}

function bioOverviewSentence(profile) {
  const subject = pronounSubject(profile);
  const sentences = [];

  if (profile['sole caregiver or not'] === 'Yes') {
    sentences.push(
      `As the sole caregiver, ${subject.toLowerCase()} carries full responsibility for coordinating and delivering care.`
    );
  }

  if (isFilled(profile['living situation'])) {
    sentences.push(livingSituationOverview(profile));
  }

  if (isFilled(profile['lacking any support'])) {
    sentences.push(`${subject} reports lacking adequate support resources for caregiving.`);
  }

  const topMental = pickTopMentalHealthSignals(profile, 1)[0];
  if (topMental?.sentence) {
    sentences.push(topMental.sentence);
  }

  return sentences.slice(0, 2).join(' ');
}

function livingSituationOverview(profile) {
  const subject = pronounSubject(profile);
  const poss = possessive(profile);
  const situation = String(profile['living situation']);

  if (situation.startsWith('They live with me')) {
    return `${subject} cares for someone who lives with ${poss} or another caregiver.`;
  }
  if (situation.startsWith('In a home or apartment')) {
    return `${subject} cares for someone living in a home or apartment with family or a roommate.`;
  }

  return `${subject} cares for someone whose living situation is: ${situation}.`;
}

function pickTopMentalHealthSignals(profile, limit) {
  const signals = [];

  for (const column of MENTAL_HEALTH_COLUMNS) {
    const value = profile[column];
    const score = AGREEMENT_SCORE[value];
    if (!score || score < 4) continue;
    const sentence = mentalHealthSentence(column, value, profile);
    if (sentence) signals.push({ score, sentence, column });
  }

  const mentalState = profile['mental state self description'];
  const mentalStateScore = MENTAL_STATE_SCORE[mentalState];
  const mentalStateSentenceText = mentalStateSentence(mentalState, profile);
  if (mentalStateScore >= 4 && mentalStateSentenceText) {
    signals.push({ score: mentalStateScore, sentence: mentalStateSentenceText, column: 'mental state self description' });
  }

  return signals.sort((a, b) => b.score - a.score).slice(0, limit);
}

function needSentenceFromValue(value, profile) {
  const text = String(value).trim();
  const lower = text.toLowerCase();

  if (lower.includes('financial')) return 'Needs financial support to manage caregiving-related costs.';
  if (lower.includes('training')) return 'Needs training to build caregiving skills and confidence.';
  if (lower.includes('access')) return 'Needs help getting access to caregiving services and community resources.';
  if (lower.includes('group')) return 'Needs support groups to connect with other caregivers.';
  if (lower.includes('counsel')) return 'Needs counseling support to cope with caregiving stress.';
  if (lower.includes('respite')) return 'Needs respite care to take breaks from continuous caregiving duties.';
  if (lower.includes('physician')) return 'Needs stronger support from healthcare providers involved in care.';
  if (lower.includes('employer') || lower.includes('accommodation')) {
    return 'Needs employer accommodations that make caregiving and work more manageable.';
  }
  if (lower.includes('lacking') || lower.includes('not currently receive')) {
    return `${pronounSubject(profile)} currently lacks sufficient formal caregiving support.`;
  }

  return `Needs ${text.charAt(0).toLowerCase()}${text.slice(1)}.`;
}

function supportGapSentence(column, profile) {
  if (column === 'lacking any support' && isFilled(profile[column])) {
    return `${pronounSubject(profile)} reports lacking any current caregiving support.`;
  }

  const supportLabels = {
    training_support: 'training resources',
    access_support: 'help accessing services',
    group_support: 'caregiver support groups',
    counselling_support: 'counseling support',
    'respite care_support': 'respite care services',
    'loved one physician_support': 'support from healthcare providers',
    financial_support: 'financial support',
    'employer accommodation_support': 'employer accommodations',
    'fund_ All the care they receive is free or donated': 'reliable no-cost care funding',
    'fund_family contributions': 'family financial contributions',
    'fund_pension, savings, or retirement fund': 'retirement or savings-based funding',
    'fund_medicare, medicaid, SSDI, or VA benefits': 'public benefits coverage',
    'fund_medical insurance': 'medical insurance coverage',
    'fund_long-term care insurance': 'long-term care insurance coverage',
    'received_federal state local fund': 'federal, state, or local funding support',
  };

  if (!isFilled(profile[column])) {
    const label = supportLabels[column];
    if (label) return `Would benefit from additional ${label}.`;
  }

  return null;
}

export function generateBio(profile) {
  const name = profile.Name || 'This caregiver';
  const occupationLabel = occupationLabelForBio(
    profile.Occupation_Category,
    profile.Bio_School_Status,
    profile.Career_Title
  );
  const decade = ageDecadePhrase(profile.Age_Numeric);
  const poss = possessive(profile);

  const opening = `${name} is ${withArticle(occupationLabel)} in ${poss} ${decade}.`;

  const experience = formatCareExperience(profile['Care giving experience']);
  const relationship = formatRelationship(profile['relationship to the person you care for']);
  const careHours = Number.parseFloat(profile['hours spent for care_weekly']);
  const careHoursText = Number.isFinite(careHours) ? Math.round(careHours) : 'regular';
  const employment = employmentLabel(profile.Occupation_Category, profile.Bio_School_Status);

  const caregivingSentence = `${pronounSubject(profile)} spent ${experience} caring for ${poss} ${relationship}, providing ${careHoursText} hours of care weekly while managing ${poss} own ${employment}.`;

  const overview = bioOverviewSentence(profile);
  return [opening, caregivingSentence, overview].filter(Boolean).join(' ');
}

export function generateBehaviorBullets(profile, count = 5) {
  const candidates = [];

  for (const column of MENTAL_HEALTH_COLUMNS) {
    const value = profile[column];
    const score = AGREEMENT_SCORE[value] || 0;
    const sentence = mentalHealthSentence(column, value, profile);
    if (sentence && score >= 4) candidates.push({ score, sentence, key: column });
  }

  const mentalState = profile['mental state self description'];
  const mentalStateScore = MENTAL_STATE_SCORE[mentalState] || 0;
  const mentalStateText = mentalStateSentence(mentalState, profile);
  if (mentalStateText && mentalStateScore >= 4) {
    candidates.push({ score: mentalStateScore, sentence: mentalStateText, key: 'mental state self description' });
  }

  const contextualKeys = [
    'sole caregiver or not',
    'hours spent for care_weekly',
    'hours works at job',
    'living situation',
    'Care giving experience',
    'relationship to the person you care for',
  ];

  for (const key of contextualKeys) {
    const sentence = contextualBehaviorSentence(key, profile);
    if (sentence) candidates.push({ score: 2, sentence, key });
  }

  const seen = new Set();
  const bullets = [];

  for (const item of candidates.sort((a, b) => b.score - a.score)) {
    if (seen.has(item.key)) continue;
    seen.add(item.key);
    bullets.push(item.sentence);
    if (bullets.length >= count) break;
  }

  return bullets;
}

export function generateCoreNeedsBullets(profile, count = 5) {
  const candidates = [];

  for (const column of UNMET_NEED_COLUMNS) {
    if (!isFilled(profile[column])) continue;
    candidates.push({
      score: 5,
      sentence: needSentenceFromValue(profile[column], profile),
      key: column,
    });
  }

  for (const column of SUPPORT_COLUMNS) {
    const sentence = supportGapSentence(column, profile);
    if (sentence) candidates.push({ score: column === 'lacking any support' ? 4 : 2, sentence, key: column });
  }

  const seen = new Set();
  const bullets = [];

  for (const item of candidates.sort((a, b) => b.score - a.score)) {
    if (seen.has(item.key)) continue;
    seen.add(item.key);
    bullets.push(item.sentence);
    if (bullets.length >= count) break;
  }

  return bullets;
}

const DEFAULT_AVATAR_URL = '/avatars/f_60_01.svg';

export function resolveAvatarFilename(avatarFile) {
  if (!avatarFile) return null;

  const filename = String(avatarFile).trim();
  if (filename.endsWith('.svg')) return filename;
  if (filename.endsWith('.png')) return filename.replace(/\.png$/i, '.svg');

  return `${filename}.svg`;
}

export function getProfileAvatarUrl(profile) {
  const filename = resolveAvatarFilename(profile?.Avatar_File);
  return filename ? `/avatars/${filename}` : DEFAULT_AVATAR_URL;
}
