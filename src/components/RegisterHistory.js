import React, { useState } from 'react'

import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core'

import { makeStyles , withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    }
}))

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#2196f3',
        color: '#fff',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const RegisterHistory = props => {

    const classes = useStyles()

    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Box mt={2} mb={2}>
            <Card>
                <CardContent>
                    <Box mb={2}>
                        <Typography variant='h5' gutterBottom>
                            Registro
                        </Typography>
                    </Box>
                    <Divider />
                    <Box mt={2} mb={2}>
                        <TextField
                            type='text'
                            variant='outlined'
                            label='Buscar Username'
                            fullWidth
                        />
                    </Box> 
                    <Box mt={3} mb={2}>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label='sticky table'>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Hola</StyledTableCell>
                                            <StyledTableCell>Hola</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hola body</TableCell>
                                            <TableCell>Hola body</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component='div'
                                count={100}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>                 
                </CardContent>
            </Card>
        </Box>
   )
}

export default RegisterHistory