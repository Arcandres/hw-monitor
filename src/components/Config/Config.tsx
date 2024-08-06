import React, { useState, ChangeEvent } from "react";
import { useTranslation } from 'react-i18next';
import ProcessesConfig from "./ProcessesConfig";
import PerformanceConfig from "./PerformanceConfig";
import { invoke } from "@tauri-apps/api/tauri";

import { Wrapper, Container, StyledButton, Label, Select, Header } from "./Styles/style"; // Updated import
import SensorsConfig from "./SensorsConfig";
import DisksConfig from "./DisksConfig";
import NavbarConfig from "./NavbarConfig";
import HeatbarConfig from "./HeatbarConfig";

const Config: React.FC = () => {
  const { i18n } = useTranslation();
  const [reloadFlag, setReloadFlag] = useState(false);

  const load_default_config = async () => {
    try {
      await invoke("set_default_config");
      setReloadFlag((prevFlag) => !prevFlag);
    } catch (error) {
      console.error("Error fetching performance config:", error);
    }
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Wrapper>
      <Header>
        <StyledButton onClick={load_default_config}>Load Default Config</StyledButton>
        <Label htmlFor="language-select" style={{color: 'white'}}>
          Lang:
          <Select id="language-select" onChange={handleLanguageChange} defaultValue={i18n.language}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">Deutsh</option>
          </Select>
        </Label>
      </Header>
      <Container key={reloadFlag ? "reload" : "no-reload"}>
        <ProcessesConfig />
        <PerformanceConfig />
        <SensorsConfig />
        <DisksConfig />
        <HeatbarConfig />
        <NavbarConfig />
      </Container>
    </Wrapper>
  );
};

export default Config;
