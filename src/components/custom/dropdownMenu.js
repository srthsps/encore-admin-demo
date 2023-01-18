import React from "react";

const DropDown = ({ title, actions, data }) => {
  return (
    <>
      <div className="dropdown">
        <button
          type="button"
          style={{ border: "none", backgroundColor: "white" }}
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {title}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {actions?.map((item, idx) => {
            return (
              <li key={idx}>
                <a
                  onClick={() => item.value(data)}
                  className="dropdown-item"
                  href="#"
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DropDown;
