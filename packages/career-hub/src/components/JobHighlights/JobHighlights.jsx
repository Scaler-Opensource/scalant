import React from 'react';
import PropTypes from 'prop-types';

/**
 * JobHighlights - Conditional highlights section (placeholder)
 * 
 * Layout Component:
 * - Will contain: CompleteTasksCta, HighlightsList, Keywords, IneligibleMessage
 * - Currently placeholder - full implementation in PR 2
 */
const JobHighlights = ({ highlights, eligibilityCriteria }) => {
  if (!highlights || !highlights.highlights || highlights.highlights.length === 0) {
    return null;
  }

  return (
    <div>
      Job Highlights - Content to be added 
    </div>
  );
};

JobHighlights.propTypes = {
  highlights: PropTypes.shape({
    highlights: PropTypes.arrayOf(PropTypes.string),
    keywords: PropTypes.arrayOf(PropTypes.string),
    qualityScore: PropTypes.string,
  }),
  eligibilityCriteria: PropTypes.shape({
    isEligible: PropTypes.bool,
    reasons: PropTypes.arrayOf(PropTypes.object),
  }),
};

JobHighlights.defaultProps = {
  highlights: null,
  eligibilityCriteria: null,
};

export default JobHighlights;

