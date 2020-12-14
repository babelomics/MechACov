import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Box } from '@material-ui/core'

const Copyright = () => {

    return (
        <Typography variant="body2">
            {`Copyright © ${new Date().getFullYear()}  `}
            <Link color="inherit" href="http://www.clinbioinfosspa.es/" target="_blank">
                Developed by CBA
            </Link>
        </Typography>
    );
}

function Footer() {
    return (
        <Box position="fixed" marginBottom={0} paddingBottom={0} className="footer" width="100%" padding={2}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1} />
                <strong>MechACov</strong>&nbsp;&nbsp;
                <Copyright />
                <Box flexGrow={1} />
            </Box>
        </Box>
    );
}


export default Footer;