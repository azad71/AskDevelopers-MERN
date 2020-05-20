import React from "react";
// import "./footer.styles.scss";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-2 text-center">
      Copyright &copy; {new Date().getFullYear()} AskDevelopers
    </footer>
  );
};
export default Footer;
