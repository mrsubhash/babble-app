export default {
    palette: {
        primary: {
            light: '#9a67ea',
            main: '#673ab7',
            dark: '#320b86',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffff56',
            main: '#ffea00',
            dark: '#c7b800',
            contrastText: '#000000',
        },
    },
    extra: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: "center"
        },
        image: {
            margin: '20px auto 20px auto'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            margin: '10px auto 10px auto',
            position: "relative"
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            position: "absolute"
        },
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        }
    }
}