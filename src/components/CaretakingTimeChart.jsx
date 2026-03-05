import React from 'react';

const BAR_DATA = [
  { hours: 5, frequency: 145 },
  { hours: 10, frequency: 202 },
  { hours: 15, frequency: 116 },
  { hours: 22, frequency: 128 },
  { hours: 28, frequency: 65 },
  { hours: 34, frequency: 13 },
  { hours: 40, frequency: 30 },
  { hours: 46, frequency: 3 },
  { hours: 52, frequency: 19 },
  { hours: 58, frequency: 10 },
  { hours: 74, frequency: 14 },
  { hours: 79, frequency: 9 },
  { hours: 85, frequency: 2 },
  { hours: 98, frequency: 4 },
];

const PLOT = {
  xMin: 64,
  xMax: 755,
  yTop: 61,
  yBottom: 424,
  yMax: 200,
};

const MEDIAN_HOURS = 15;
const MIN_LABEL_SEPARATION = 105;
const LABEL_LEFT_BOUND = PLOT.xMin - 10;
const LABEL_RIGHT_BOUND = PLOT.xMax + 10;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function xFromHours(hours) {
  const clamped = clamp(hours, 0, 100);
  return PLOT.xMin + (clamped / 100) * (PLOT.xMax - PLOT.xMin);
}

function yFromFrequency(freq) {
  const clamped = clamp(freq, 0, PLOT.yMax);
  const ratio = clamped / PLOT.yMax;
  return PLOT.yBottom - ratio * (PLOT.yBottom - PLOT.yTop);
}

const CaretakingTimeChart = ({ profileHours = 0 }) => {
  const safeProfileHours = Number.isFinite(profileHours) ? clamp(profileHours, 0, 100) : 0;
  const profileX = xFromHours(safeProfileHours);
  const medianX = xFromHours(MEDIAN_HOURS);
  const useTopLegend = safeProfileHours >= 75;
  const labelsOverlap = Math.abs(safeProfileHours - MEDIAN_HOURS) < 0.01;
  const topLabelLine1Y = useTopLegend ? 84 : 22;
  const topLabelLine2Y = useTopLegend ? 111 : 49;
  let profileLabelX = profileX - 4;
  let medianLabelX = medianX + 10;

  if (!labelsOverlap) {
    const profileIsLeft = profileLabelX <= medianLabelX;
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
    <div className="profile-caretaking-time-chart" role="img" aria-label="Caretaking time distribution chart">
      <svg
        className="profile-caretaking-time-chart-svg"
        viewBox="0 -30 930 560"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* y-axis labels */}
        {[200, 175, 150, 125, 100, 75, 50, 25, 0].map((tick) => (
          <text
            key={tick}
            x="44"
            y={yFromFrequency(tick) + 6}
            className="caretaking-time-axis-label"
          >
            {tick}
          </text>
        ))}

        {/* x-axis labels */}
        {[20, 40, 60, 80, 100].map((tick) => (
          <text
            key={tick}
            x={xFromHours(tick)}
            y="440"
            textAnchor="middle"
            className="caretaking-time-axis-label"
          >
            {tick}
          </text>
        ))}

        {/* bars */}
        {BAR_DATA.map((bar) => (
          <line
            key={`${bar.hours}-${bar.frequency}`}
            x1={xFromHours(bar.hours)}
            y1={yFromFrequency(bar.frequency)}
            x2={xFromHours(bar.hours)}
            y2={PLOT.yBottom}
            className="caretaking-time-bar"
          />
        ))}

        {/* profile and median markers */}
        <line
          x1={profileX}
          y1={PLOT.yTop}
          x2={profileX}
          y2={PLOT.yBottom}
          className="caretaking-time-profile-marker"
        />
        <line
          x1={medianX}
          y1={PLOT.yTop}
          x2={medianX}
          y2={PLOT.yBottom}
          className="caretaking-time-median-marker"
        />

        {/* axis titles */}
        <text x="410" y="486" className="caretaking-time-axis-title" textAnchor="middle">
          Hours spent on caregiving each week
        </text>
        <text
          x="14"
          y="248"
          className="caretaking-time-y-axis-title"
          transform="rotate(-90 14 248)"
          textAnchor="middle"
        >
          Number of caregivers in this group
        </text>

        {/* top marker labels */}
        {labelsOverlap ? (
          <>
            <text x={medianX} y={topLabelLine1Y} className="caretaking-time-top-label" textAnchor="middle">
              15hrs per
            </text>
            <text x={medianX} y={topLabelLine2Y} className="caretaking-time-top-label" textAnchor="middle">
              week
            </text>
          </>
        ) : (
          <>
            <text x={profileLabelX} y={topLabelLine1Y} className="caretaking-time-top-label" textAnchor="middle">
              {`${Math.round(safeProfileHours)}hrs per`}
            </text>
            <text x={profileLabelX} y={topLabelLine2Y} className="caretaking-time-top-label" textAnchor="middle">
              week
            </text>
            <text x={medianLabelX} y={topLabelLine1Y} className="caretaking-time-top-label" textAnchor="middle">
              15hrs per
            </text>
            <text x={medianLabelX} y={topLabelLine2Y} className="caretaking-time-top-label" textAnchor="middle">
              week
            </text>
          </>
        )}

        {/* legend */}
        {useTopLegend ? (
          <g transform="translate(30, -18)">
            <g>
              <line x1="0" y1="12" x2="46" y2="12" className="caretaking-time-bar-legend" />
              <text x="58" y="14" className="caretaking-time-legend-label-compact">
                Caregiving Time
              </text>
              <text x="58" y="36" className="caretaking-time-legend-label-compact">
                Frequency Among
              </text>
              <text x="58" y="58" className="caretaking-time-legend-label-compact">
                Caretakers
              </text>
            </g>
            <g transform="translate(310, 0)">
              <line x1="0" y1="12" x2="46" y2="12" className="caretaking-time-median-marker" />
              <text x="58" y="14" className="caretaking-time-legend-label-compact">
                Caregiving Time&apos;s
              </text>
              <text x="58" y="36" className="caretaking-time-legend-label-compact">
                Median Among
              </text>
              <text x="58" y="58" className="caretaking-time-legend-label-compact">
                Caretakers
              </text>
            </g>
            <g transform="translate(620, 0)">
              <line x1="0" y1="12" x2="46" y2="12" className="caretaking-time-profile-marker" />
              <text x="58" y="14" className="caretaking-time-legend-label-compact">
                Caregiving Time of
              </text>
              <text x="58" y="36" className="caretaking-time-legend-label-compact">
                This Profile
              </text>
            </g>
          </g>
        ) : (
          <g transform="translate(580, 54)">
            <line x1="0" y1="0" x2="58" y2="0" className="caretaking-time-bar-legend" />
            <text x="74" y="5" className="caretaking-time-legend-label">
              Caregiving Time
            </text>
            <text x="74" y="29" className="caretaking-time-legend-label">
              Frequency Among
            </text>
            <text x="74" y="53" className="caretaking-time-legend-label">
              Caretakers
            </text>

            <line x1="0" y1="96" x2="58" y2="96" className="caretaking-time-median-marker" />
            <text x="74" y="101" className="caretaking-time-legend-label">
              Caregiving Time&apos;s
            </text>
            <text x="74" y="125" className="caretaking-time-legend-label">
              Median Among
            </text>
            <text x="74" y="149" className="caretaking-time-legend-label">
              Caretakers
            </text>

            <line x1="0" y1="194" x2="58" y2="194" className="caretaking-time-profile-marker" />
            <text x="74" y="199" className="caretaking-time-legend-label">
              Caregiving Time of
            </text>
            <text x="74" y="223" className="caretaking-time-legend-label">
              This Profile
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default CaretakingTimeChart;
