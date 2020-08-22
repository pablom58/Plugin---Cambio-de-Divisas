import React , { useState } from 'react'

import ItemOne from './components/ItemOne'

import {
    Tabs,
    Tab,
    Typography,
    Box
} from '@material-ui/core'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import TrendingUp from '@material-ui/icons/TrendingUp'

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
                        <Typography>
                            {children}
                        </Typography>
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
        backgroundColor: '#2e1534',
        color: '#fff'
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
            backgroundColor: '#635ee7',
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
        <div className={classes.root}>
            <StyledTabs 
                value={value} 
                onChange={handleChange} 
                aria-label="styled tabs example"
            >
                <StyledTab label='Cambio' icon={<TrendingUp />} {...a11yProps(0)} />
                <StyledTab label='Item One' icon={<TrendingUp />} {...a11yProps(1)} />
                <StyledTab label='Item One' icon={<TrendingUp />} {...a11yProps(2)} />
            </StyledTabs>
            <TabPanel value={value} index={0}>
                <ItemOne />
            </TabPanel>
            <TabPanel value={value} index={1}>
                item 1
            </TabPanel>
            <TabPanel value={value} index={2}>
                item 2
            </TabPanel>
        </div>
    )
}

export default App