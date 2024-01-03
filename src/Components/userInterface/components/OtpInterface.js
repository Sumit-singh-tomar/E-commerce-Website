import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { postData } from "../../../services/FetchNodeServices";
import { useDispatch } from "react-redux";

function OtpInterface({ productCart, openOtpDialog, setOpenOtpDialog, otp, mobileNumber }) {
    var otpValue = new Array(4).fill('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpenOtpDialog(false)
    }

    const handleOtp1 = () => {
        if (document.getElementById("one").value.length == 1) {
            otpValue[0] = document.getElementById("one").value
            document.getElementById("two").focus()
        }
    }

    const handleOtp2 = () => {
        if (document.getElementById("two").value.length == 1) {
            otpValue[1] = document.getElementById("two").value
            document.getElementById("three").focus()
        }
    }

    const handleOtp3 = () => {
        if (document.getElementById("three").value.length == 1) {
            otpValue[2] = document.getElementById("three").value
            document.getElementById("four").focus()
        }
    }

    const handleOtp4 = () => {
        if (document.getElementById("one").value.length == 1) {
            otpValue[3] = document.getElementById("four").value
        }
    }

    const handleSubmitOTP = async () => {
        let enteredOtp = otpValue.join('')
        if (enteredOtp == otp) {
            var result = await postData('userinterface/check_Account_Exist', { mobilenumber: mobileNumber })
            if (result.status) {
                dispatch({type:'ADD_USER',payload:[result.data.mobilenumber,result.data]})
                navigate('/shipping', { state: { productCart: productCart, userData: result.data } })
            }
            else {
                navigate('/createAccount', { state: { productCart: productCart, mobileNumber: mobileNumber } })
            }
        }
        else {
            alert("Invalid Otp")
        }
    }
    return (
        <div>
            <Dialog open={openOtpDialog} style={{ backdropFilter: 'blur(3px)' }}>
                <DialogActions style={{ background: '#191919', color: '#fff' }}><CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} /></DialogActions>
                <DialogContent style={{ background: '#191919', width: '25vw', padding: '20px 80px 40px 80px' }}>
                    <DialogContentText style={{ color: '#fff', textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>VERIFY WITH OTP</div>
                        <div style={{ marginTop: '5%', fontWeight: 100, fontSize: 14 }}>sent to {mobileNumber}</div>
                        <div style={{ marginTop: '10%', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <TextField onKeyUp={handleOtp1} id="one" sx={{ width: "15%", border: "1px solid #fff", borderRadius: '5px', 'input': { color: '#fff', textAlign: 'center' }, "& fieldset": { border: 'none' } }}></TextField>
                            <TextField onKeyUp={handleOtp2} id="two" sx={{ width: "15%", border: "1px solid #fff", borderRadius: '5px', 'input': { color: '#fff', textAlign: 'center' }, "& fieldset": { border: 'none' } }} autoFocus></TextField>
                            <TextField onKeyUp={handleOtp3} id="three" sx={{ width: "15%", border: "1px solid #fff", borderRadius: '5px', 'input': { color: '#fff', textAlign: 'center' }, "& fieldset": { border: 'none' } }}></TextField>
                            <TextField onKeyUp={handleOtp4} id="four" sx={{ width: "15%", border: "1px solid #fff", borderRadius: '5px', 'input': { color: '#fff', textAlign: 'center' }, "& fieldset": { border: 'none' } }}></TextField>
                        </div>
                        <div style={{ marginTop: '10%' }}>Resend OTP in 00.3 sec</div>
                        <Button onClick={handleSubmitOTP} fullWidth size="large" style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '5%', borderRadius: '10px', textTransform: 'none', background: '#12daa8', color: '#fff', borderColor: '#353535' }} variant="outlined">Submit Otp</Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default OtpInterface