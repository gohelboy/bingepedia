import * as React from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@mui/material/styles';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';

const useStyle = makeStyles({
  root: {
    width: 500,
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  
  const classes = useStyle();
  const [value, setValue] = React.useState(0);

  return (

    <BottomNavigation
      showLabels
      className={ classes }
      value={value}
      onChange={(event, newValue) => {
      setValue(newValue);
    }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movie" icon={<MovieIcon />} />
        <BottomNavigationAction label="TV Series" icon={<LiveTvIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
  );
}