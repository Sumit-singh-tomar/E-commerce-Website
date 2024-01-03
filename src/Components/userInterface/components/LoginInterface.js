import { Button, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormHelperText, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import OtpInterface from "./OtpInterface";
import { useState } from "react";

function LoginInterface({ productCart, openLoginDialog, setOpenLoginDialog }) {
    const [openOtpDialog, setOpenOtpDialog] = useState(false)
    const [otp, setOtp] = useState(null)
    const [mobileNumber, setMobileNumber] = useState('')
    const [errors, setErrors] = useState({})

    const handleClose = () => {
        setOpenLoginDialog(false)
    }

    const generateOTP = () => {
        return parseInt((Math.random() * 8999) + 1000)
    }

    const validation = () => {
        let error = false
        if (mobileNumber.length == 0) {
            error = true
            handleError('*Mobile Number/Email ID must be Required', 'mobilenumber')
        }
        if (mobileNumber.length>=1 && mobileNumber.length<=9 ) {
            error = true
            handleError('*Mobile Number length must be 10', 'mobilenumber')
        }
        return error
    }

    const handleContinue = () => {
        let error = validation()
        if (error == false) {
            setOpenLoginDialog(false)
            setOpenOtpDialog(true)
            let otp = generateOTP()
            setOtp(otp)
            alert(otp)
        }
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const handleMobileNumber = (event) => {
        if (event.target.value.length <= 10) {
            setMobileNumber(event.target.value)
            if (event.target.value.length == 10)
                handleError('', 'mobilenumber')
        }
        else {
            handleError('Mobile Number must be of 10 numbers only', 'mobilenumber')
        }
    }
    return (
        <div>
            <Dialog open={openLoginDialog} style={{ backdropFilter: "blur(3px)" }}>
                <DialogActions style={{ background: '#191919', color: '#fff' }}><CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} /></DialogActions>
                <DialogContent style={{ background: '#191919', padding: '10px 50px 50px 50px', width: '30vw' }}>
                    <DialogContentText style={{ color: '#fff' }}>
                        <div style={{ display: 'flex', width: '100%', border: '1px solid #353535', borderRadius: '5px', fontSize: '14px' }}>
                            <div style={{ width: '50%', textAlign: 'center', padding: '10px 0px' }}>Login</div>
                            <div style={{ width: '1px', background: '#353535' }}></div>
                            <div style={{ width: '49%', textAlign: 'center', padding: '10px 0px' }}>Create Account</div>
                        </div>
                        <div style={{ marginTop: '5%', fontSize: '14px', textAlign: 'center' }}>Please Enter Your Email ID or Phone number</div>
                        <FormControl fullWidth error={errors.mobilenumber}>
                            <TextField
                                onFocus={() => handleError('', 'mobilenumber')}
                                onChange={handleMobileNumber}
                                sx={{ marginTop: '5%', border: '1px solid #fff', borderRadius: '10px', background: '#191919', color: 'white', 'input': { color: '#fff' }, "& fieldset": { border: 'none' }, "& input::placeholder": { color: 'white' } }}
                                placeholder="Enter Your Email ID or Phone number"
                            />
                            <FormHelperText>{errors.mobilenumber}</FormHelperText>
                        </FormControl>
                        <div style={{ marginTop: '5%', fontSize: '12px', fontWeight: 100, textAlign: 'center' }}>By continuing you agree to our <span style={{ color: '#12daa8', textDecoration: 'underline' }}>Terms of Use </span>&<span style={{ color: '#12daa8', textDecoration: 'underline' }}>Privacy Policy</span></div>
                        <Button onClick={handleContinue} size="large" fullWidth style={{ marginTop: '5%', background: '#12daa8', borderColor: '#12daa8', color: '#000', textTransform: 'none', borderRadius: '10px', fontWeight: 'bold' }} variant="outlined">Continue</Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <OtpInterface productCart={productCart} openOtpDialog={openOtpDialog} setOpenOtpDialog={setOpenOtpDialog} otp={otp} mobileNumber={mobileNumber} />
        </div>
    )
}

export default LoginInterface