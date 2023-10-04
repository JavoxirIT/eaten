import axios from "axios";
import { SitiesAndDistrictContext } from "../../context/Context";
import { redirect } from "react-router-dom";
import { useState } from "react";

export function SitiesAndDistrictState({ children }) {
  const [sities, setSities] = useState([]);
	const [district, setDistrict] = useState([]);
	

	
  function getСities() {
    axios
      .get("/region")
      .then((res) => {
        if (res.status === 200) {
          setSities(res.data);
        }
      })
      .catch((error) => {
        redirect("/login");
      });
  }

  function getDistrict() {
    axios
      .get("/tuman")
      .then((res) => {
        if (res.status === 200) {
          setDistrict(res.data);
        }
      })
      .catch((error) => {
        redirect("/login");
      });
  }

  const value = { getСities, getDistrict, sities, district };
  return (
    <SitiesAndDistrictContext.Provider value={value}>
      {children}
    </SitiesAndDistrictContext.Provider>
  );
}
