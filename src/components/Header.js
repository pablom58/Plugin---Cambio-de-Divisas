import React , { Fragment } from 'react'

import {
    Box,
    Typography,
} from '@material-ui/core'

const Header = props => {
    return (
        <Fragment>
            <Box mt={2} mb={2} pl={4} pt={4}>
                <Typography variant='h4' gutterBottom>
                    Cambio de Divisas
                </Typography>
            </Box>
            <Box mt={2} mb={2} pl={4}>
                <i>Versión: 0.0.2 - Todos los derechos reservados a <a href='https://seocontenidos.net/' style={{color: '#1afffe',textDecoration: 'none'}} target='_blank' >SeoContenidos</a> - Contacto: <span style={{color: '#1afffe'}}>support@seocontenidos.net</span></i>
            </Box>
        </Fragment>
    )
}

export default Header