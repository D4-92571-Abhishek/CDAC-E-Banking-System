import React, { useEffect } from "react";

export const About = () => {
  useEffect(() => {
      // Apply page-specific background
      document.body.style.backgroundColor = "#e0e7ff";
  
      // Cleanup when leaving the page
      return () => {
        document.body.style.backgroundColor = "";
      };
    }, []);
  return (
    <div className="container mt-5">
      <h2>About</h2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At doloribus
      quasi ut quia voluptatibus molestias odio magni delectus excepturi,
      eveniet, temporibus officia perferendis amet ducimus. Inventore accusamus
      quo qui maiores mollitia numquam!
    </div>
  );
};
