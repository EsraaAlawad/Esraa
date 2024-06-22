import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Registration App</h1>
      <Link href="/regist">
        <span>Go to Registration Page</span>
      </Link>
    </div>
  );
};

export default Home;
