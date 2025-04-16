import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; {new Date().getFullYear()} Nakheel Care. All Rights Reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    boxShadow: '0 -5px 15px rgba(46, 204, 113, 0.3)',
  },
  text: {
    margin: 0,
    fontSize: '0.9rem',
  },
};

export default Footer;
