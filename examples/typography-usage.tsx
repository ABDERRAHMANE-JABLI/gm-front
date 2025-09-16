/* Example Typography Usage Component */
import React from 'react';

interface TypographyExampleProps {
  title: string;
  description: string;
  isNews?: boolean;
}

export const TypographyExample: React.FC<TypographyExampleProps> = ({
  title,
  description,
  isNews = false
}) => {
  return (
    <div className="typography-example">
      {/* Using utility classes */}
      <h1 className={isNews ? "text-news-title" : "text-card-title"}>
        {title}
      </h1>
      
      {/* Using CSS variables directly with inline styles */}
      <p style={{
        fontFamily: 'var(--page-detail-main-title-font-family)',
        fontSize: 'var(--page-detail-main-title-font-size)',
        fontWeight: 'var(--page-detail-main-title-font-weight)',
        lineHeight: 'var(--page-detail-main-title-line-height)',
      }}>
        {description}
      </p>
      
      {/* Button with typography class */}
      <button className="text-button">
        Learn More
      </button>
    </div>
  );
};

// CSS Module example (create a .module.css file)
export const typographyExampleStyles = `
.cardTitle {
  font-family: var(--card-title-font-family);
  font-size: var(--card-title-font-size);
  font-weight: var(--card-title-font-weight);
  line-height: var(--card-title-line-height);
}

.bottleKind {
  font-family: var(--bottle-card-kind-font-family);
  font-size: var(--bottle-card-kind-font-size);
  font-weight: var(--bottle-card-kind-font-weight);
  line-height: var(--bottle-card-kind-line-height);
}

.filterTitle {
  font-family: var(--filter-title-font-family);
  font-size: var(--filter-title-font-size);
  font-weight: var(--filter-title-font-weight);
  line-height: var(--filter-title-line-height);
}

/* Responsive typography example */
.responsiveTitle {
  font-family: var(--page-detail-title-font-family);
  font-weight: var(--page-detail-title-font-weight);
  line-height: var(--page-detail-title-line-height);
  
  /* Use clamp for responsive sizing */
  font-size: clamp(24px, var(--page-detail-title-font-size), 48px);
}

@media (max-width: 768px) {
  .responsiveTitle {
    font-size: var(--card-title-font-size);
    line-height: var(--card-title-line-height);
  }
}
`;

export default TypographyExample;
