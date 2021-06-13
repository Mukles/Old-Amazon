import React from 'react';
import PropTypes from 'prop-types';
import { Box,FormControl, OutlinedInput, InputAdornment, InputLabel , Typography, Tab, Tabs, makeStyles, TextField } from '@material-ui/core'
import BuildIcon from '@material-ui/icons/Build';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import ListAltIcon from '@material-ui/icons/ListAlt';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 250,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const ProductTab = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
      >
        <Tab fullWidth label="General" icon={<BuildIcon fontSize="small" />} {...a11yProps(0)} />
        <Tab label="Inventory" icon={<LoyaltyIcon fontSize='small' />} {...a11yProps(1)} />
        <Tab label="Shoping" icon={<LocalMallIcon fontSize='small' />} {...a11yProps(2)} />
        <Tab label="Linking" icon={<InsertLinkIcon fontSize='small' /> } {...a11yProps(3)} />
        <Tab label="Attribute" icon={<ListAltIcon fontSize='small' />} {...a11yProps(4)} />
      </Tabs>
      <TabPanel className='100%' value={value} index={0}>
        <div className=''>
        <TextField
          className='d-block'
          fullwidth
          required 
          id="regular-price" 
          name='regularPrice'
          label="Regular Price" 
          type='number'
        />
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value
           
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>

        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}

export default ProductTab;