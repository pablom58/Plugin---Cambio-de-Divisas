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
                <Typography variant='subtitle1' style={{fontWeight: 'normal'}}>
                    Versión: 0.0.2 - Todos los derechos reservados a SeoContenidos - Contacto: support@seocontenidos.net
                </Typography>
            </Box>
        </Fragment>
    )
}

export default Header