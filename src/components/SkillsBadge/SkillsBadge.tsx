import Button from "@mui/material/Button"
import styled from "@mui/system/styled"

const SkillsBadge = styled(Button)(({ theme }) => ({
    display: 'flex',
    padding: '10px 15px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30px',
    border: '0.5px solid #0091E7',
    cursor: 'text'
}));

export default SkillsBadge