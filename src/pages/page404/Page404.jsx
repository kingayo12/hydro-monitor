import React, { useEffect, useState } from "react";
import LoadingAnimation from "../../components/LoadingAnimation";

const Page404 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className='chat'>error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</div>
      )}
    </>
  );
};

export default Page404;
