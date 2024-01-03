import { Button } from "@mui/material"
import { useMediaQuery } from "@mui/material"
import LoginInterface from "./LoginInterface"
import { useState } from "react"
import useRazorpay from "react-razorpay"
import { serverURL } from "../../../services/FetchNodeServices"
import { useSelector } from "react-redux"

function OrderSummary({ productCart, screen }) {
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const matches = useMediaQuery('(max-width:1050px)')
    const [Razorpay] = useRazorpay()
    let user=useSelector(state=>state.user)
    let userData=Object.values(user)[0]

    let data = productCart
    let originalAmount = data.reduce((p1, p2) => {
        return parseInt(p1) + parseInt(p2.price * p2.qty)
    }, 0)

    let actualAmount = data.reduce((p1, p2) => {
        return parseInt(p1) + parseInt(p2.offerprice * p2.qty)
    }, 0)

    const handleClick = () => {
        setOpenLoginDialog(true)
    }

    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
        amount: actualAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Electronics Bazzar",
        description: "Test Transaction",
        image: `${serverURL}/images/croma.webp`,
        // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_signature);
        },
        prefill: {
            name:userData?.name,
            email: userData?.emailid,
            contact: userData?.mobilenumber,
        },
        notes: {
            address: "Razorpay Corporate Office",
        },
        theme: {
            color: "#3399cc",
        },
    }


    const handleProceedToPayment =async () => {

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    };

    // const handleProceedToPayment = () => {
    //     alert('dj')
    // }


    let savingAmount = originalAmount - actualAmount
    return (
        <div style={{ width: matches ? '92%' : '80%', background: '#fff', marginTop: matches ? '3%' : '22%', padding: '15px' }}>
             <div style={{ fontSize: '18px', fontWeight: 500 }}>Order Summary ({productCart?.length} item)</div>
            <div style={{ display: 'flex', marginTop: '3%' }}>
                <div>Original Price</div>
                <div style={{ marginLeft: 'auto' }}>&#8377;{originalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
            </div>

            <div style={{ display: 'flex', marginTop: '3%' }}>
                <div>Delivery</div>
                <div style={{ marginLeft: 'auto', textDecoration: 'line-through' }}>&#8377;60 </div>
                <div>Free</div>
            </div>

            <div style={{ display: 'flex', marginTop: '3%' }}>
                <div>Saving</div>
                <div style={{ marginLeft: 'auto' }}>-&#8377;{savingAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
            </div>

            <div style={{ display: 'flex', marginTop: '3%' }}>
                <div>Total</div>
                <div style={{ marginLeft: 'auto' }}>&#8377;{actualAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</div>
            </div>


            <div style={{ marginTop: '3%' }}>
                {screen == "shipping" ?
                    <Button onClick={handleProceedToPayment} fullWidth style={{ background: '#12daa8', marginTop: '5%', borderColor: '#12daa8', color: '#000', textTransform: 'none', borderRadius: '10px', fontWeight: 'bold' }} variant="outlined">Proceed To Payment</Button>
                    :
                    <Button onClick={handleClick} fullWidth style={{ background: '#12daa8', marginTop: '5%', borderColor: '#12daa8', color: '#000', textTransform: 'none', borderRadius: '10px', fontWeight: 'bold' }} variant="outlined">Checkout</Button>}
            </div>

            <LoginInterface productCart={productCart} openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog} />

        </div > 
    )
}

export default OrderSummary