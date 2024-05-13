import Dropdown from "react-bootstrap/Dropdown";
import { useLanguageContext } from "../../contexts/LanguageContext";
import "./LanguageDropdown.scss";

const LanguageDropdown = () => {
  const { allLanguages, setLang } = useLanguageContext();

  return (
    typeof allLanguages === "object" && (
      <Dropdown className="language-dropdown">
        <Dropdown.Toggle className="dropdown-button">🌍</Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(allLanguages).map((option) => (
            <button className="language-button" onClick={() => setLang(option)}>
              {allLanguages[option]}
            </button>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )
  );
};

export default LanguageDropdown;
