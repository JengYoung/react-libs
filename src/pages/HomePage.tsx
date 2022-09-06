import React from 'react';
import { useSelector } from 'react-redux';

function HomePage() {
  const globalState = useSelector((state) => {
    return state.posts;
  });
  console.log(globalState);
  return <div>HomePage</div>;
}

export default React.memo(HomePage);
