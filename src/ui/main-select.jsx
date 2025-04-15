import { useEffect, useRef, useState } from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';

const MainSelect = ({ label, options, currentOption, setOption }) => {
  const [selectListOpen, setSelectListOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setSelectListOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="main-select"
      onClick={() => setSelectListOpen(!selectListOpen)}
      ref={selectRef}
    >
      <span className="main-select_label">{label}</span>
      <div className="main-select_selected">
        <span>{currentOption}</span>
        {selectListOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {selectListOpen && (
        <ul className="main-select_list">
          {options.map((option) => (
            <li
              key={option}
              className="main-select_item"
              onClick={(e) => {
                e.stopPropagation();
                setOption(option);
                setSelectListOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainSelect;
