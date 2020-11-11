import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

const Copyright = () => {

    return (
        <Typography variant="body2">
            {'Copyright © '}
            <Link color="inherit" href="http://www.clinbioinfosspa.es/" target="_blank">
                Developed by CBA
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <footer>
            <Container maxWidth="sm">
                <Typography
                    variant="body1"
                >
                    MechACov
                </Typography>
                <Copyright />
            </Container>
        </footer>
    );
}