import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        paddingTop: 12,
        paddingBottom: 12,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginTop: 3,
        color: "white",
        backgroundColor: '#5c6bc0',
    },
}));