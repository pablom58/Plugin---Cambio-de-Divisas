import React, { Fragment } from 'react'

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

const ItemOne = props => {

    const info = [
        {
            label: 'Peso',
            value: 10
        },
        {
            label: 'Dolar',
            value: 10
        },
        {
            label: 'Peso',
            value: 10
        },
        {
            label: 'BCV',
            value: 10
        },
        {
            label: 'Fecha',
            value: '08/21/20 a las 10:58pm'
        },
        {
            label: 'Usuario',
            value: 'Aldo'
        }
    ]

    const inputs = [
        {
            label: 'Peso',
            value: 10,
            name: 'cop'
        },
        {
            label: 'Dolar',
            value: 10,
            name: 'usd'
        },
        {
            label: 'BCV',
            value: 10,
            name: 'bcv'
        },
    ]

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
                                <Typography component='span' variant='h5' gutterBottom>
                                    Cambio
                                </Typography>
                            </Box>
                            <Divider />
                            <Box mt={2} mb={2}>
                                <Typography component='span' variant='h6' gutterBottom>
                                    Cambio Actual:
                                </Typography>
                            </Box>
                            {
                                info.length
                                    ?   info.map(data => <Fragment key={info.indexOf(data)}>
                                                            <Box mt={2} mb={2} style={{display: 'flex', alignItems: 'center'}}>
                                                                <Typography component='span' variant='subtitle1' gutterBottom style={{fontWeight: 'bold'}}>
                                                                    { `${data.label}: ` }
                                                                </Typography>
                                                                <Typography component='span' variant='body1' gutterBottom style={{marginLeft: '15px'}}>
                                                                    { data.value }
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
                                <Typography component='span' variant='h5' gutterBottom>
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
                                                                        defaultValue={input.value}
                                                                        inputProps={{
                                                                            min: 1,
                                                                            step: 0.001
                                                                        }}
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

export default ItemOne