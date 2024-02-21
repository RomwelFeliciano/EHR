import React from "react";

const Loading = () => {
  return (
    <div className="fixed flex h-96 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-b-8 border-t-8 border-pink-400 ease-linear"></div>
      <div className="ml-3 h-10 w-10 animate-spin rounded-full border-b-8 border-t-8 border-pink-600 ease-linear"></div>
      <div className="ml-3 h-10 w-10 animate-spin rounded-full border-b-8 border-t-8 border-pink-800 ease-linear"></div>
    </div>
  );
};

export default Loading;
