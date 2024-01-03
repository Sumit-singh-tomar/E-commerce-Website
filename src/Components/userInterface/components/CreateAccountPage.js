import { useLocation, useNavigate } from "react-router-dom"
import OrderSummary from "./OrderSummary"
import { useStyles } from "./screens/ProjectCss"
import Header from "./Header"
import { Button, FormControl, FormHelperText, FormLabel, MenuItem, Select, TextField, } from "@mui/material"
import { useState } from "react"
import { postData } from "../../../services/FetchNodeServices"
import { useDispatch } from "react-redux"

function CrateAccountPage() {
    const classes = useStyles()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch=useDispatch()
    let productCart = location.state.productCart
    const [title, setTitle] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailID, setEmailID] = useState('')
    const [mobilenumber, setmobilenumber] = useState(location.state.mobileNumber)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [errors, setErrors] = useState({})

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        let error = false
        if (title.length == 0) {
            error = true
            handleError('*Select your Title', 'title')
        }
        if (firstName.length == 0) {
            error = true
            handleError('*Enter your first Name', 'firstname')
        }
        if (lastName.length == 0) {
            error = true
            handleError('*Enter your last Name', 'lastname')
        }
        if (emailID.length == 0) {
            error = true
            handleError('*Enter your email Id', 'emailid')
        }
        if (mobilenumber.length == 0) {
            error = true
            handleError('*Enter your mobilenumber', 'mobilenumber')
        }
        if (address.length == 0) {
            error = true
            handleError('*Enter your address', 'address')
        }
        if (city.length == 0) {
            error = true
            handleError('*Enter your city', 'city')
        }
        if (state.length == 0) {
            error = true
            handleError('*Enter your state', 'state')
        }
        if (pincode.length == 0) {
            error = true
            handleError('*Enter your pincode', 'pincode')
        }
        return error
    }

    const handleCreateAccount = async () => {
        let error = validation()
        if (error == false) {
            var body={ emailid: emailID, mobilenumber: mobilenumber, name: `${title} ${firstName} ${middleName} ${lastName}`, address: `${address} ${city} ${state}`, pincode: pincode }
            var result = await postData('userinterface/createAccount',body)
            if (result.status) {
                dispatch({type:'ADD_USER',payload:[mobilenumber,body]})
                navigate('/shipping', { state: { productCart:productCart,userData: body } })
            } 
            else {
                alert('something went wrong')
            }
        }
    }

    console.log(errors)
    return (
        <div className={classes.Create_Account_Page}>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <Header />
            </div>

            <div className={classes.Create_Account_Page_Main_Box}>
                <div className={classes.Create_Account_Page_Left_Box}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '80%', background: '#fff', marginTop: '3%', padding: '10px 20px' }}>
                            <div style={{ textAlign: 'center' }}>Continue Creating Account...</div>
                            <div style={{ fontWeight: 'bold', marginTop: '2%' }}>ENTER SHIPPING INFORMATON</div>
                        </div>

                        <div style={{ width: '80%', background: '#fff', marginTop: '3%', padding: '10px 20px' }}>
                            <div style={{ fontWeight: 'bold' }}>Contact Information</div>

                            <div style={{ width: '100%', display: 'flex', gap: '10px', marginTop: '2%' }}>
                                <div style={{ width: '50%' }}>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl error={errors.title} fullWidth>
                                        <Select
                                            fullWidth
                                            sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                            onFocus={() => handleError('', 'title')}
                                            onChange={(event) => setTitle(event.target.value)}
                                        >
                                            <MenuItem value="Mr">Mr</MenuItem>
                                            <MenuItem value="Mrs">Mrs</MenuItem>
                                            <MenuItem value="Miss">Miss</MenuItem>
                                            <MenuItem value="Ms">Ms</MenuItem>
                                            <MenuItem value="Doctor">Doctor</MenuItem>
                                            <MenuItem value="Prof">Prof</MenuItem>

                                        </Select>
                                        <FormHelperText>{errors.title}</FormHelperText>
                                    </FormControl>
                                </div>

                                <div style={{ width: '50%' }}>
                                    <FormLabel>First Name</FormLabel>
                                    <TextField
                                        onFocus={() => handleError('', 'firstname')}
                                        helperText={errors.firstname}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        fullWidth
                                        error={errors.firstname}
                                        placeholder="Enter first Name"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', gap: '10px', marginTop: '3%' }}>
                                <div style={{ width: '50%' }}>
                                    <FormLabel>Middle Name</FormLabel>
                                    <TextField
                                        onChange={(event) => setMiddleName(event.target.value)}
                                        fullWidth
                                        placeholder="Enter Middle Name"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>

                                <div style={{ width: '50%' }}>
                                    <FormLabel>Last Name</FormLabel>
                                    <TextField
                                        error={errors.lastname}
                                        helperText={errors.lastname}
                                        onFocus={() => handleError('', 'lastname')}
                                        onChange={(event) => setLastName(event.target.value)}
                                        fullWidth
                                        placeholder="Enter Last Name"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', gap: '10px', marginTop: '3%' }}>
                                <div style={{ width: '50%' }}>
                                    <FormLabel>Email ID</FormLabel>
                                    <TextField
                                        error={errors.emailid}
                                        helperText={errors.emailid}
                                        onFocus={() => handleError('', 'emailid')}
                                        onChange={(event) => setEmailID(event.target.value)}
                                        fullWidth
                                        placeholder="Enter Email ID"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>

                                <div style={{ width: '50%' }}>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <TextField
                                        value={mobilenumber}
                                        error={errors.mobilenumber}
                                        helperText={errors.mobilenumber}
                                        onFocus={() => handleError('', 'mobilenumber')}
                                        onChange={(event) => setmobilenumber(event.target.value)}
                                        fullWidth
                                        placeholder="Enter Mobile Number"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', gap: '10px', marginTop: '3%' }}>

                                <div style={{ width: '50%' }}>
                                    <FormLabel>Address</FormLabel>
                                    <TextField
                                        error={errors.address}
                                        helperText={errors.address}
                                        onFocus={() => handleError('', 'address')}
                                        onChange={(event) => setAddress(event.target.value)}
                                        fullWidth
                                        placeholder="Enter Your Address"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>


                                <div style={{ width: '50%' }}>
                                    <FormLabel>City</FormLabel>
                                    <TextField
                                        error={errors.city}
                                        helperText={errors.city}
                                        onFocus={() => handleError('', 'city')}
                                        onChange={(event) => setCity(event.target.value)}
                                        fullWidth
                                        placeholder="Enter City Name"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', gap: '10px', marginTop: '3%' }}>

                                <div style={{ width: '50%' }}>
                                    <FormLabel>State</FormLabel>
                                    <TextField
                                        error={errors.state}
                                        helperText={errors.state}
                                        onFocus={() => handleError('', 'state')}
                                        onChange={(event) => setState(event.target.value)}
                                        fullWidth
                                        placeholder="Enter State Name"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>


                                <div style={{ width: '50%' }}>
                                    <FormLabel>PinCode</FormLabel>
                                    <TextField
                                        error={errors.pincode}
                                        helperText={errors.pincode}
                                        onFocus={() => handleError('', 'pincode')}
                                        onChange={(event) => setPincode(event.target.value)}
                                        fullWidth
                                        placeholder="Enter PinCode"
                                        sx={{ background: '#f6f6f6', borderRadius: '10px', "& fieldset": { border: 'none' } }}
                                    />
                                </div>
                            </div>

                            <div style={{ width: '100%' }}>
                                <Button size="large" onClick={handleCreateAccount} fullWidth style={{ marginTop: '5%', background: '#12daa8', borderColor: '#12daa8', color: '#000', textTransform: 'none', borderRadius: '10px', fontWeight: 'bold' }} variant="outlined">Create Account & proceed to Payment</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.Create_Account_Page_Right_Box}>
                    <OrderSummary productCart={productCart} />
                </div>
            </div>
        </div>
    )
}
export default CrateAccountPage