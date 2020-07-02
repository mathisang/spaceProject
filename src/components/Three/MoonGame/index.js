import React from "react";

export default () => {
  const handleClick1 = () => {
    console.log("1");
  };
  const handleClick2 = () => {
    console.log("2");
  };

  return (
    <div>
      <button onClick={() => handleClick1()}>button 1</button>
      <button onClick={() => handleClick2()}>button 2</button>
    </div>
  );
};
