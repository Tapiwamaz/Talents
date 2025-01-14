import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div>
      <h1>Error</h1>
      <text>{error}</text>
    </div>
  );
};

export default ErrorPage;
