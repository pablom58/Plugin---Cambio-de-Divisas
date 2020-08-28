import React, { useState , useEffect } from 'react'

import * as History from '../api/History'

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
    TableRow,
    CircularProgress
} from '@material-ui/core'

import { makeStyles , withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    },
    contCircularProgress: {
        minHeight: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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

    const [fetching,setFetching] = useState(false)

    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(10)

    const [registers,setRegisters] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    useEffect(() => {
        setFetching(true)
        History.getData()
            .then(response => {
                setRegisters(response)
                setFetching(false)
            })
            .catch(error => console.error(error))
    },[])

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
                    {
                        !fetching
                            ?   (<Box mt={3} mb={2}>
                                <Paper className={classes.root}>
                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label='sticky table'>
                                            <TableHead style={{textAlign: 'center',fontWeight: 'bold'}}>
                                                <TableRow>
                                                    <StyledTableCell>USUARIO</StyledTableCell>
                                                    <StyledTableCell>PESO</StyledTableCell>
                                                    <StyledTableCell>DOLAR</StyledTableCell>
                                                    <StyledTableCell>BCV</StyledTableCell>
                                                    <StyledTableCell>FECHA</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    registers.slice((page*rowsPerPage),((page+1)*rowsPerPage)).map(register => <TableRow key={registers.indexOf(register)}>
                                                                                            <TableCell>{register.username}</TableCell>
                                                                                            <TableCell>{register.peso}</TableCell>
                                                                                            <TableCell>{register.dollar}</TableCell>
                                                                                            <TableCell>{register.bcv}</TableCell>
                                                                                            <TableCell>{register.dateinfo}</TableCell>
                                                                                        </TableRow>)
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component='div'
                                        count={registers.length}
                                        rowsPerPage={rowsPerPage}
                                        labelRowsPerPage='Cantidad de Registros por Pagina: '
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </Box>)
                        :   <Box mt={2} mb={2} className={classes.contCircularProgress}>
                                <CircularProgress />
                            </Box>
                    }                 
                </CardContent>
            </Card>
        </Box>
   )
}

export default RegisterHistory