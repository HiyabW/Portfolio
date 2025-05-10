import Button from "@mui/material/Button"
import { fontSize, padding } from "@mui/system";
import styled from "@mui/system/styled"

const SkillsBadge = styled(Button)(({ theme }) => ({
display: 'flex',
    padding: '0.625vw 0.9375vw',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30px',
    border: '0.5px solid #0091E7',
    cursor: 'text',

    [theme.breakpoints.up("sm")]: {
        padding: '1vw 1.5vw'
    }
}));

export default SkillsBadge