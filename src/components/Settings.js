import React , { useState } from 'react'

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    List,
    CardHeader,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    Button,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1,2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto'
    },
    button: {
        margin: theme.spacing(0.5,0)
    }
}))

const not = (a,b) => a.filter(value => b.indexOf(value) === -1)

const intersection = (a,b) => a.filter(value => b.indexOf(value) !== -1)

const union = (a,b) => [...a , ...not(b,a)]

const Settings = props => {
    const classes = useStyles()

    const [checked,setChecked] = useState([])
    const [left,setLeft] = useState([0,1,2,3])
    const [right,setRight] = useState([4,5,6,7])

    const leftChecked = intersection(checked,left)
    const rightChecked = intersection(checked,right)

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }

        setChecked(newChecked)
    }

    const numberOfChecked = items => intersection(checked,items).length

    const handleToggleAll = items => () => {
        if(numberOfChecked(items) === items.length){
            setChecked(not(checked,items))
        }else{
            setChecked(union(checked,items))
        }
    }

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    const customList = (title, items) => (
        <Card>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                disabled={items.length === 0}
                inputProps={{ 'aria-label': 'all items selected' }}
              />
            }
            title={title}
            subheader={`${numberOfChecked(items)}/${items.length} selected`}
          />
          <Divider />
          <List style={{minWidth: '100%'}} className={classes.list} dense component="div" role="list">
            {
                items.map(value => <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                                        <ListItemIcon>
                                        <Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': `transfer-list-all-item-${value}-label` }}
                                        />
                                        </ListItemIcon>
                                        <ListItemText id={`transfer-list-all-item-${value}-label`} primary={`List item ${value + 1}`} />
                                    </ListItem>)
            }
            <ListItem />
          </List>
        </Card>
    )

    return (
        <Box mt={2} mb={2}>
            <Card>
                <CardContent>
                    <Box mt={2} mb={2}>
                        <Typography variant='h5' gutterBottom>
                            Settings
                        </Typography>
                    </Box>
                    <Divider />
                    <Grid 
                        container
                        direction='row'
                        justify='flex-start'
                        align-items='flex-start'
                        spacing={4}
                    >
                        <Grid item xs={12} md={12} sm={12}>
                            <Box mt={2} mb={2}>
                                <Typography variant='subtitle1' gutterBottom style={{fontWeight: 'bold'}} >
                                    Salida del cambio de divisas
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Esta opcion es para habilitar o desabilitar los cambio por default en la salida.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                            <Box mt={2} mb={2}>
                                <Grid container spacing={2} alignItems="center" className={classes.root}>
                                    <Grid item xs={4} md={4} sm={4} >
                                        {customList('Ocultos', left)}
                                    </Grid>
                                    <Grid item xs={4} md={4} sm={4}>
                                        <Grid container direction="column" alignItems="center">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                className={classes.button}
                                                onClick={handleCheckedRight}
                                                disabled={leftChecked.length === 0}
                                                aria-label="move selected right"
                                            >
                                                &gt;
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                className={classes.button}
                                                onClick={handleCheckedLeft}
                                                disabled={rightChecked.length === 0}
                                                aria-label="move selected left"
                                            >
                                                &lt;
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} md={4} sm={4}>
                                        {customList('En Vista', right)}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                            <Button
                                variant='contained'
                                fullWidth
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Settings