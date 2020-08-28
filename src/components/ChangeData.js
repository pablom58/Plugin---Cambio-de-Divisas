import React, {  useState , useEffect , Fragment } from 'react'
import clsx from 'clsx'

import * as Changes from '../api/Changes'

import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    TextField,
    Button,
    CircularProgress
} from '@material-ui/core'

import {
    TrendingUp,
    TrendingDown,
    TrendingFlat
} from '@material-ui/icons'

import {
    green,
    yellow,
    red
} from '@material-ui/core/colors'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    buttonSuccess: {
        backgroundColor: '#2196f3',
    },
    buttonProgress: {
        color: '#fff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const ChangeData = props => {

    const classes = useStyles()

    const [fetching,setFetching] = useState(false)

    const [data,setData] = useState({
                                usd: {
                                    value: 0,
                                    icon: <TrendingUp style={{marginLeft: '15px', color: green[500]}} />
                                },
                                cop: {
                                    value: 0,
                                    icon: <TrendingUp style={{marginLeft: '15px', color: green[500]}} />
                                },
                                bcv: {
                                    value: 0,
                                    icon: <TrendingUp style={{marginLeft: '15px', color: green[500]}} />
                                },
                                date: '',
                                user: ''
                            })

    const [inputState,setInputState] = useState({
                                            usd: 1,
                                            cop: 1,
                                            bcv: 1
                                        })

    const trendingIcon = (actual,prev) => {
        if(actual > prev){
            return <TrendingUp style={{marginLeft: '15px', color: green[500]}} />
        }else if(actual < prev){
            return <TrendingDown style={{marginLeft: '15px', color: red[500]}} />
        }

        return <TrendingFlat style={{marginLeft: '15px', color: yellow[700]}} />
    }

    useEffect(() => {
        setFetching(true)
        Changes.getData()
            .then(response => {
                if(response.length){
                    setData({
                        ...data,
                        usd: {
                            value: response[0].dollar,
                            icon: trendingIcon(parseFloat(response[0].dollar),parseFloat(response[1] !== undefined ? response[1].dollar : 0))
                        },
                        cop: {
                            value: response[0].peso,
                            icon: trendingIcon(parseFloat(response[0].peso),parseFloat(response[1] !== undefined ? response[1].peso : 0))
                        },
                        bcv: {
                            value: response[0].bcv,
                            icon: trendingIcon(parseFloat(response[0].bcv),parseFloat(response[1] !== undefined ? response[1].bcv : 0))
                        },
                        date: response.dateInfo,
                        user: response[0].username
                    })
    
                    setInputState({
                        ...inputState,
                        usd: parseFloat(response[0].dollar),
                        cop: parseFloat(response[0].peso),
                        bcv: parseFloat(response[0].bcv),
                    })

                    setFetching(false)
                }
            })
            .catch(error => console.error(error))
    },[])

    const info = [
        {
            label: 'Dolar',
            value: data.usd.value,
            icon: data.usd.icon
        },
        {
            label: 'Peso',
            value: data.cop.value,
            icon: data.cop.icon
        },
        {
            label: 'BCV',
            value: data.bcv.value,
            icon: data.bcv.icon
        },
        {
            label: 'Fecha',
            value: '08/21/20 a las 10:58pm'
        },
        {
            label: 'Usuario',
            value: data.user
        }
    ]

    const inputs = [        
        {
            label: 'Dolar',
            value: inputState.usd,
            name: 'usd'
        },
        {
            label: 'Peso',
            value: inputState.cop,
            name: 'cop'
        },
        {
            label: 'BCV',
            value: inputState.bcv,
            name: 'bcv'
        },
    ]

    const buttonClassname = clsx({
        [classes.buttonSuccess]: fetching,
    })

    const handleChange = input => {
        setInputState({
            ...inputState,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = btn => {

        if (!fetching) {
            setFetching(true)

            Changes.putData({
                dollar: inputState.usd,
                peso: inputState.cop,
                bcv: inputState.bcv
            })
                .then(response => {
                    if(response.success && response.statusCode === 200){
                        let prevData = {...data}
                        setData({
                            ...data,
                            usd: {
                                value: inputState.usd,
                                icon: trendingIcon(parseFloat(inputState.usd),parseFloat(prevData.usd.value))
                            },
                            cop: {
                                value: inputState.cop,
                                icon: trendingIcon(parseFloat(inputState.cop),parseFloat(prevData.cop.value))
                            },
                            bcv: {
                                value: inputState.bcv,
                                icon: trendingIcon(parseFloat(inputState.bcv),parseFloat(prevData.bcv.value))
                            },
                        })
                    }
                    
                    setFetching(false)
                })
                .catch(error => console.error(error))
        }
    }

    return (
        <Box mt={2} mb={2}>
            <Grid
                container
                direction='row'
                justify='space-around'
                alignItems='flex-start'
                spacing={4}
            >
                <Grid item xs={12} md={6} sm={12}>
                    <Card>
                        <CardContent>
                            <Box mb={2}>
                                <Typography variant='h5' gutterBottom>
                                    Cambio
                                </Typography>
                            </Box>
                            <Divider />
                            <Box mt={2} mb={2}>
                                <Typography variant='h6' gutterBottom>
                                    Cambio Actual:
                                </Typography>
                            </Box>
                            {
                                !fetching
                                    ? (info.length
                                        ?   info.map(data => <Fragment key={info.indexOf(data)}>
                                                                <Box mt={2} mb={2}>
                                                                    <Typography variant='subtitle1' gutterBottom style={{fontWeight: 'bold',display: 'flex', alignItems: 'center'}}>
                                                                        { `${data.label}: ` }
                                                                        <Typography variant='body1' style={{marginLeft: '15px',display: 'flex', alignItems: 'center'}}>
                                                                            { `${data.value} ` }
                                                                            {
                                                                                data.icon ? data.icon : ''
                                                                            }
                                                                        </Typography>
                                                                    </Typography>
                                                                    
                                                                </Box>
                                                             </Fragment>)
                                        :   <Fragment />)
                                    :   <Box mt={2} mb={2} align='center'>
                                            <CircularProgress />
                                        </Box>
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                    <Card>
                        <CardContent>
                            <Box mb={2}>
                                <Typography variant='h5' gutterBottom>
                                    Modificar Datos
                                </Typography>
                            </Box>
                            <Divider />
                            {
                                inputs.length
                                    ?   inputs.map(input => <Fragment key={inputs.indexOf(input)}>
                                                                <Box mt={3} mb={3}>
                                                                    <TextField
                                                                        type='number'
                                                                        label={input.label}
                                                                        name={input.name}
                                                                        value={input.value}
                                                                        inputProps={{
                                                                            min: 1,
                                                                            step: 0.001
                                                                        }}
                                                                        onChange={handleChange}
                                                                        fullWidth
                                                                    />
                                                                </Box>
                                                            </Fragment>)
                                    :   <Fragment />
                            }                            
                        </CardContent>
                    </Card>
                    <Box mt={7} style={{position: 'relative'}}>
                        <Button
                            variant='outlined'
                            style={{
                                borderColor: fetching ? '#2196f3' : '#fff',
                                color: fetching ? '#2196f3' : '#fff'
                            }}
                            disabled={fetching}
                            className={buttonClassname}
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Guardar
                        </Button>
                        {
                            fetching && <CircularProgress size={24} className={classes.buttonProgress} />
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
   )
}

export default ChangeData