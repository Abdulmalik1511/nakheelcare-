import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Nakheel Care 🌴</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(46, 204, 113, 0.3)',
  },
  title: {
    fontSize: '1.8rem',
    margin: 0,
  },
};

export default Header;
