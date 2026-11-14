import React from 'react';
import { profile } from '../data';

const Footer = () => (
  <footer className="site-footer">
    <div>© {new Date().getFullYear()} {profile.name} — built with React &amp; Three.js</div>
  </footer>
);

export default Footer;