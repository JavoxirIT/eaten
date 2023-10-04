import { useState } from "react";
import { UnitContext } from "../../context/Context";
import axios from "axios";

export function UnitState({ children }) {
  const [unit, setUnit] = useState([]);
  function getUnit() {
    axios
      .get(`unit`)
      .then((res) => {
        if (res.status === 200) {
          setUnit(res.data);
        }
      })
      .catch((err) => {
        console.log();
      });
  }
  return (
    <UnitContext.Provider value={{ getUnit, unit }}>
      {children}
    </UnitContext.Provider>
  );
}
