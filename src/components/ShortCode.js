import React from 'react'

import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    TextField
} from '@material-ui/core'

const ShortCode = props => {
    return (
        <Box mt={2} mb={2}>
            <Card>
                <CardContent>
                    <Box mt={2} mb={2}>
                        <Typography variant='h5' gutterBottom>
                            Shortcode
                        </Typography>
                    </Box>
                    <Divider />
                    <Box mt={2} mb={2}>
                        <TextField
                            type='text'
                            placeholder='[monitordollar]'
                            value='[monitordollar]'
                            label='Shortcode'
                            disabled
                            fullWidth
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ShortCode