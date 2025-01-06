import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ customArrowIcon2, linkArrowIcon }) => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="nav-item">
          <Link to="https://dynamicmediainstitute.org/dmi-experience/" className="nav-link-2">
            <div className="name">
              <h4>What is DMI?</h4>
            </div>
            {customArrowIcon2 && (
              <div
                className="arrow3"
                dangerouslySetInnerHTML={{ __html: customArrowIcon2 }}
              />
            )}
          </Link>
        </div>
        <div className="nav-item">
          <Link to="https://dynamicmediainstitute.org/student-work/case-studies/" className="nav-link-2">
            <h4>Case Studies</h4>
            {customArrowIcon2 && (
              <div
                className="arrow3"
                dangerouslySetInnerHTML={{ __html: customArrowIcon2 }}
              />
            )}
          </Link>
        </div>
      </div>
      <div className="footer-info">
        <div className="nav-item">
          <a
            href="https://www.linkedin.com/in/efe-ozalp/" // Replace with your portfolio link
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-2"
          >
            <h4>UI/UX & Development by Efe Ozalp</h4>
            {linkArrowIcon && (
              <div
                className="arrow3"
                dangerouslySetInnerHTML={{ __html: linkArrowIcon }}
              />
            )}
          </a>
        </div>
        <div className="nav-item">
          <a
            href="https://www.instagram.com/yxuart/" // Replace with the illustrator's profile link
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-2"
          >
            <h4>Illustrations by Yiner Xu @yxuart</h4>
            {linkArrowIcon && (
              <div
                className="arrow3"
                dangerouslySetInnerHTML={{ __html: linkArrowIcon }}
              />
            )}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
