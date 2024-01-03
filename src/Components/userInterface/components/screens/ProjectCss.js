import { makeStyles } from "@mui/styles";

const useStyles=makeStyles({
    home_root:{
        height:'100vh',
        width:'100vw',
        background:'#191919',
        overflow:'auto'
    },
    ProductScreen_Root: {
        height: '100vh',
        width: '100vw',
        background:'#191919',
        overflow:'auto'
    },
    ProductScreen_Main_Box: {
        width: '100%',
        display:'flex',
    },
    ProductScreen_Box1: {
        width: '25%',
        display:'flex',
    },
    ProductScreen_Box2: {
        width: '75%',
    },
    ProductPurchaseScreen_Root:{
        width:'100vw',
        height:'100vh',
        background:'#191919',
        overflow:'auto'
    },
    ProductPurchaseScreen_Main_Box:{
        width:'100%',
        display:'flex'
    },
    ProductPurchaseScreen_Left_Box:{
        width:'50%',
        display:'flex'
    },
    ProductPurchaseScreen_Right_Box:{
        width:'50%',
    },
    Cart_Root:{
        height:'100vh',
        width:'100vw',
        background:'#f9f9f9',
        overflow:'auto'
    },
    Cart_Main_Box:{
        width:'100%',
        display:'flex',
    },
    Cart_Left_Box:{
        width:'65%',
        display:'flex',
        justifyContent:'right',
    },
    Cart_Right_Box:{
        width:'35%',
        height:'100%',
    },
    Create_Account_Page:{
        width:'100vw',
        height:'100vh',
        background:'#f9f9f9',
        overflow:'auto'
    },
    Create_Account_Page_Main_Box:{
        width:'100%',
        display:'flex'
    },
    Create_Account_Page_Left_Box:{
        width:'65%'
    },
    Create_Account_Page_Right_Box:{
        width:'35%',
    },
    Shipping_Root:{
        width:'100vw',
        height:'100vh',
        background:'#f9f9f9',
        overflow:'auto'
    },
    Shipping_Main_Box:{
        width:'100%',
        display:'flex'
    },
    Shipping_Left_Box:{
        width:'65%'
    },
    Shipping_Right_Box:{
        width:'35%',
    }
})

export {useStyles}