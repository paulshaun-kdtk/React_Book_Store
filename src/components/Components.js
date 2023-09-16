import React, { useState } from 'react';
import Header from './Header';
import './Main.css';
// end imports

function Components() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  if (isLoading) {
    <div className="Container">
      <Header />
      return
      {' '}
      <div>Loading...</div>
      ;
    </div>;
  }

  return (
    <div className="Container">
      <Header />
      <div>
        <h1>
          !Welcome to the components page:
          <br />
          Please Note this part of the website is still under construction.
        </h1>
      </div>
    </div>
  );
}

export default Components;
