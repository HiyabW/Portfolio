import Chip from "@mui/material/Chip"
import { border } from "@mui/system"
import styled from "@mui/system/styled"

const SkillsBadge = styled(Chip)({
    borderRadius: '30px',
    cursor: 'text',
    backgroundColor: 'var(--primary-text-color)',
    border: '0.5px solid var(--primary-text-color)',

    '& .MuiChip-label': {
        fontSize: '14px',
        fontStyle: 'normal',
        padding: '10px 14px',
        fontFamily: 'Libre Franklin',
        letterSpacing: '0.55px',
        color: 'white',
    },
})

export default SkillsBadge
