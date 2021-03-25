import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faExclamationTriangle,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  CATEGORY_ACADEMIC,
  CATEGORY_PERSONAL,
  CATEGORY_SOCIAL,
  URGENCY_HIGH,
  URGENCY_LOW,
  URGENCY_MEDIUM,
} from "../../constants";

const getIconAndStyles = ({ name, isSelected }) => {
  let icon, iconColor;

  switch (name) {
    case URGENCY_LOW:
      icon = faExclamationTriangle;
      iconColor = "grey";
      break;
    case URGENCY_MEDIUM:
      icon = faExclamationTriangle;
      iconColor = "yellow";
      break;
    case URGENCY_HIGH:
      icon = faExclamationTriangle;
      iconColor = "red";
      break;
    case CATEGORY_PERSONAL:
      icon = faUser;
      iconColor = "cyan";
      break;
    case CATEGORY_ACADEMIC:
      icon = faBook;
      iconColor = "grey";
      break;
    case CATEGORY_SOCIAL:
      icon = faUsers;
      iconColor = "orange";
      break;
    default:
      break;
  }
  const styles = {
    margin: "auto",
    height: isSelected ? "80%" : "50%",
    width: isSelected ? "80%" : "50%",
    display: "block",
    color: iconColor,
  };
  return { icon, styles };
};

export const Filter = React.memo(({ filters, onToggle }) => {
  return (
    <div className="block filters">
      <div>
        {filters.map((f) => {
          const { icon, styles } = getIconAndStyles(f);
          return (
            <div key={f.name} onClick={onToggle.bind(null, f.name)}>
              <FontAwesomeIcon icon={icon} style={styles} />
            </div>
          );
        })}
      </div>
      <p>Filter Todos</p>
    </div>
  );
});
