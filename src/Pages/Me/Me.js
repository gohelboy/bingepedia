import { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";

export default function Me() {
  const [value, setValue] = useState(0);
  const [type, setType] = useState(0);

  return (
    <div>
      <Tabs
        centered
        indicatorColor="primary"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Tab label="Watchlist" style={{ width: "50%" }} />
        <Tab label="Watched" style={{ width: "50%" }} />
      </Tabs>

      {/* movie & seriese tabs */}
      <Tabs
        centered
        indicatorColor="secondary"
        textColor="secondary"
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
        }}
      >
        <Tab label="Movie" />
        <Tab label="Series" />
      </Tabs>
    </div>
  );
}
