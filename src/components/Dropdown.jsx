import { useState } from "react";

const Dropdown = ({ title, children, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen); // Call the callback function if provided
    }
  };

  return (
    <li className="dropdown">
      <button type="button" onClick={handleClick} aria-haspopup="true">
        {title}
      </button>
      {isOpen && <ul className="dropdown-content">{children}</ul>}
    </li>
  );
};

export default Dropdown;
