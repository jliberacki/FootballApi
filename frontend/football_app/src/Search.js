/* eslint-disable no-use-before-define */
import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function SearchComponent() {

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const [teams, setTeams] = useState([]);
    const [teamInfo, setTeamInfo] = useState(null);
    const [teamName, setTeamName] = useState(null);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/teams/")
            .then(response => response.json())
            .then(data => setTeams(data))
    }, [])

    const fetchTeam = () =>
    {
        const name = teamName && teamName.split(' ').join('_');
        fetch(`http://127.0.0.1:8000/api/teams/${name}`)
            .then(response => response.json())
            .then(data => setTeamInfo(data))
    }

    const renderSearch = () =>
        (
            <div style={{ width: 700 }}>
                <Autocomplete
                    freeSolo
                    options={teams}
                    onChange={(event, newValue) => {
                        setTeamName(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="" margin="normal" variant="outlined" />
                    )}
                />
                {teamName ? <Button onClick={() => fetchTeam()} variant="contained" color="primary" >
                    Search
                </Button> : null}
            </div>
        )

    const renderRow = (name, value) => (
        <TableRow key={value}>
            <TableCell component="th" scope="row">
                {name}:
            </TableCell>
            <TableCell component="th" scope="row">
                {value}
            </TableCell>
        </TableRow>
    )

    const renderTeamInfo = () =>
        (
            <div style={{ width: 700 }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            {teamInfo.name ? renderRow('Name', teamInfo.name) : null}
                            {teamInfo.league ? renderRow('League', teamInfo.league): null}
                            {teamInfo.position ? renderRow('Position', teamInfo.position): null}
                            {teamInfo.record ? renderRow('Record', teamInfo.record): null}
                            {teamInfo.points ? renderRow('Points', teamInfo.points) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={() => setTeamInfo(null)} variant="contained" color="primary" >
                    Go Back
                </Button>
            </div>

        )

    return (
        teamInfo ? renderTeamInfo() : renderSearch()
    );
}
