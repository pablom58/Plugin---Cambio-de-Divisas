import React, {  useState , useEffect , Fragment } from 'react'

import * as Changes from '../api/Changes'

import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    TextField,
    Button
} from '@material-ui/core'

import {
    TrendingUp,
    TrendingDown,
    TrendingFlat
} from '@material-ui/icons'

const ChangeData = props => {

    const [data,setData] = useState({
                                usd: {
                                    value: 0,
                                    icon: <TrendingUp style={{marginLeft: '15px'}} />
                                },
                                cop: {
                                    value: 0,
                                    icon: <TrendingUp style={{marginLeft: '15px'}} />
                                },
                                bcv: {
                                    value: 0,
                                    icon: <TrendingUp style={{marginLeft: '15px'}} />
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
            return <TrendingUp style={{marginLeft: '15px'}} />
        }else if(actual < prev){
            return <TrendingDown style={{marginLeft: '15px'}} />
        }

        return <TrendingFlat style={{marginLeft: '15px'}} />
    }

    useEffect(() => {
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

    const handleChange = input => {
        setInputState({
            ...inputState,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = btn => {
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
            })
            .catch(error => console.error(error))
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
                                info.length
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
                                    :   <Fragment />
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
                                                                        variant='outlined'
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
                    <Box mt={7}>
                        <Button
                            variant='outlined'
                            style={{
                                borderColor: '#fff',
                                color: '#fff'
                            }}
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Guardar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
   )
}

export default ChangeData