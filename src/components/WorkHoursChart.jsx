import React from 'react';

const BAR_DATA = [
  { hours: 0, frequency: 58 },
  { hours: 6, frequency: 10 },
  { hours: 11, frequency: 12 },
  { hours: 16, frequency: 14 },
  { hours: 20, frequency: 38 },
  { hours: 25, frequency: 22 },
  { hours: 30, frequency: 33 },
  { hours: 35, frequency: 35 },
  { hours: 40, frequency: 205 },
  { hours: 45, frequency: 28 },
  { hours: 50, frequency: 14 },
  { hours: 55, frequency: 8 },
  { hours: 60, frequency: 6 },
  { hours: 72, frequency: 1 },
];

const PLOT = {
  xMin: 94,
  xMax: 777,
  yTop: 61,
  yBottom: 424,
  yMax: 200,
};

const MEDIAN_HOURS = 40;
const MAX_HOURS = 80;
const MIN_LABEL_SEPARATION = 105;
const LABEL_LEFT_BOUND = PLOT.xMin - 12;
const LABEL_RIGHT_BOUND = PLOT.xMax + 12;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function xFromHours(hours) {
  const clamped = clamp(hours, 0, MAX_HOURS);
  return PLOT.xMin + (clamped / MAX_HOURS) * (PLOT.xMax - PLOT.xMin);
}

function yFromFrequency(freq) {
  const clamped = clamp(freq, 0, PLOT.yMax);
  const ratio = clamped / PLOT.yMax;
  return PLOT.yBottom - ratio * (PLOT.yBottom - PLOT.yTop);
}

function formatHoursLabel(hours) {
  const rounded = Math.round(hours);
  return rounded === 1 ? `${rounded}hr per` : `${rounded}hrs per`;
}

const WorkHoursChart = ({ profileHours = 0 }) => {
  const safeProfileHours = Number.isFinite(profileHours) ? clamp(profileHours, 0, MAX_HOURS) : 0;
  const profileX = xFromHours(safeProfileHours);
  const medianX = xFromHours(MEDIAN_HOURS);
  const useTopLegend = safeProfileHours >= 75;
  const labelsOverlap = Math.abs(safeProfileHours - MEDIAN_HOURS) < 0.01;
  const topLabelLine1Y = useTopLegend ? 84 : 22;
  const topLabelLine2Y = useTopLegend ? 111 : 49;

  let profileLabelX = profileX - 4;
  let medianLabelX = medianX + 10;

  if (!labelsOverlap) {
    const profileIsLeft = profileX <= medianX;
    const left = profileIsLeft ? profileLabelX : medianLabelX;
    const right = profileIsLeft ? medianLabelX : profileLabelX;
    const currentGap = right - left;

    if (currentGap < MIN_LABEL_SEPARATION) {
      const center = (profileLabelX + medianLabelX) / 2;
      const halfGap = MIN_LABEL_SEPARATION / 2;

      if (profileIsLeft) {
        profileLabelX = center - halfGap;
        medianLabelX = center + halfGap;
      } else {
        medianLabelX = center - halfGap;
        profileLabelX = center + halfGap;
      }
    }

    if (profileLabelX < LABEL_LEFT_BOUND) {
      const shift = LABEL_LEFT_BOUND - profileLabelX;
      profileLabelX += shift;
      medianLabelX += shift;
    }
    if (medianLabelX > LABEL_RIGHT_BOUND) {
      const shift = medianLabelX - LABEL_RIGHT_BOUND;
      profileLabelX -= shift;
      medianLabelX -= shift;
    }
  }

  return (
    <div className="profile-work-hours-chart" role="img" aria-label="Job hours distribution chart">
      <svg className="profile-work-hours-chart-svg" viewBox="0 -30 880 560" preserveAspectRatio="xMidYMid meet">
        {[200, 175, 150, 125, 100, 75, 50, 25, 0].map((tick) => (
          <text key={tick} x="44" y={yFromFrequency(tick) + 6} className="work-hours-axis-label">
            {tick}
          </text>
        ))}

        {[20, 40, 60, 80].map((tick) => (
          <text key={tick} x={xFromHours(tick)} y="440" textAnchor="middle" className="work-hours-axis-label">
            {tick}
          </text>
        ))}

        {BAR_DATA.map((bar) => (
          <line
            key={`${bar.hours}-${bar.frequency}`}
            x1={xFromHours(bar.hours)}
            y1={yFromFrequency(bar.frequency)}
            x2={xFromHours(bar.hours)}
            y2={PLOT.yBottom}
            className="work-hours-bar"
          />
        ))}

        <line x1={profileX} y1={PLOT.yTop} x2={profileX} y2={PLOT.yBottom} className="work-hours-profile-marker" />
        <line x1={medianX} y1={PLOT.yTop} x2={medianX} y2={PLOT.yBottom} className="work-hours-median-marker" />

        <text x="448" y="486" className="work-hours-axis-title" textAnchor="middle">
          Hours spent at work Each week
        </text>
        <text
          x="14"
          y="248"
          className="work-hours-y-axis-title"
          transform="rotate(-90 14 248)"
          textAnchor="middle"
        >
          Number of caregivers in this group
        </text>

        {labelsOverlap ? (
          <>
            <text x={medianX} y={topLabelLine1Y} className="work-hours-top-label" textAnchor="middle">
              40hrs per
            </text>
            <text x={medianX} y={topLabelLine2Y} className="work-hours-top-label" textAnchor="middle">
              week
            </text>
          </>
        ) : (
          <>
            <text x={profileLabelX} y={topLabelLine1Y} className="work-hours-top-label" textAnchor="middle">
              {formatHoursLabel(safeProfileHours)}
            </text>
            <text x={profileLabelX} y={topLabelLine2Y} className="work-hours-top-label" textAnchor="middle">
              week
            </text>
            <text x={medianLabelX} y={topLabelLine1Y} className="work-hours-top-label" textAnchor="middle">
              40hrs per
            </text>
            <text x={medianLabelX} y={topLabelLine2Y} className="work-hours-top-label" textAnchor="middle">
              week
            </text>
          </>
        )}

        {useTopLegend ? (
          <g transform="translate(30, -18)">
            <g>
              <line x1="0" y1="12" x2="46" y2="12" className="work-hours-bar-legend" />
              <text x="58" y="14" className="work-hours-legend-label-compact">
                Job hours
              </text>
              <text x="58" y="36" className="work-hours-legend-label-compact">
                Frequency Among
              </text>
              <text x="58" y="58" className="work-hours-legend-label-compact">
                Caretakers
              </text>
            </g>
            <g transform="translate(290, 0)">
              <line x1="0" y1="12" x2="46" y2="12" className="work-hours-median-marker" />
              <text x="58" y="14" className="work-hours-legend-label-compact">
                Job hours&apos;
              </text>
              <text x="58" y="36" className="work-hours-legend-label-compact">
                Median Among
              </text>
              <text x="58" y="58" className="work-hours-legend-label-compact">
                Caretakers
              </text>
            </g>
            <g transform="translate(565, 0)">
              <line x1="0" y1="12" x2="46" y2="12" className="work-hours-profile-marker" />
              <text x="58" y="14" className="work-hours-legend-label-compact">
                Job hours of
              </text>
              <text x="58" y="36" className="work-hours-legend-label-compact">
                This Profile
              </text>
            </g>
          </g>
        ) : (
          <g transform="translate(580, 55)">
            <line x1="0" y1="0" x2="58" y2="0" className="work-hours-bar-legend" />
            <text x="74" y="5" className="work-hours-legend-label">
              Job hours
            </text>
            <text x="74" y="29" className="work-hours-legend-label">
              Frequency Among
            </text>
            <text x="74" y="53" className="work-hours-legend-label">
              Caretakers
            </text>

            <line x1="0" y1="96" x2="58" y2="96" className="work-hours-median-marker" />
            <text x="74" y="101" className="work-hours-legend-label">
              Job hours&apos;
            </text>
            <text x="74" y="125" className="work-hours-legend-label">
              Median Among
            </text>
            <text x="74" y="149" className="work-hours-legend-label">
              Caretakers
            </text>

            <line x1="0" y1="194" x2="58" y2="194" className="work-hours-profile-marker" />
            <text x="74" y="199" className="work-hours-legend-label">
              Job hours of
            </text>
            <text x="74" y="223" className="work-hours-legend-label">
              This Profile
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default WorkHoursChart;
