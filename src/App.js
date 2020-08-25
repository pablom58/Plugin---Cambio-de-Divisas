import React , { useState } from 'react'

import ChangeData from './components/ChangeData'
import RegisterHistory from './components/RegisterHistory'
import { default as SettingsPanel } from './components/Settings'
import ShortCode from './components/ShortCode'
import Header from './components/Header'

import {
    Tabs,
    Tab,
    Box,
    Grid
} from '@material-ui/core'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import TrendingUp from '@material-ui/icons/TrendingUp'
import ListAlt from '@material-ui/icons/ListAlt'
import Settings from '@material-ui/icons/Settings'
import ShortText from '@material-ui/icons/ShortText'

const TabPanel = props => {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {
                value === index && (
                    <Box p={3}>
                        {children}
                    </Box>
                )
            }        
        </div>
    )
}

const a11yProps = index => {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#23272a',
        color: '#fff',
        minHeight: '100vh'
    }
}))

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#2196f3',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
    }
}))(props => <Tab disableRipple {...props} />)

const App = props => {

    const classes = useStyles()
    const [value,setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Grid 
            container
            direction='row'
            justify-content='space-between'
            alignItems='flex-start'
            className={classes.root}
        >
            <Grid item xs={12} md={12} sm={12}>
                <Header />
            </Grid>
            <Grid item xs={12} md={12} sm={12} style={{minHeight:'80vh'}}>
                <StyledTabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="styled tabs example"
                >
                    <StyledTab label='Cambio' icon={<TrendingUp />} {...a11yProps(0)} />
                    <StyledTab label='Registro' icon={<ListAlt />} {...a11yProps(1)} />
                    <StyledTab label='Settings' icon={<Settings />} {...a11yProps(2)} />
                    <StyledTab label='Shortcode' icon={<ShortText />} {...a11yProps(3)} />
                </StyledTabs>
                <TabPanel value={value} index={0}>
                    <ChangeData />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RegisterHistory />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SettingsPanel />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ShortCode />
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default App