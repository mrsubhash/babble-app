import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

export default ({ children, onClick, tipTitle, tipClassName, btnClassName }) => (
    <Tooltip title={tipTitle} placement="top" className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)

