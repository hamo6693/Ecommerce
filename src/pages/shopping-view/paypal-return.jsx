import { useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { capturePayment } from "../../srore/shop/orders-slice";


function PaypalReturnPage() {
    
    const dispatch = useDispatch()
    const location = useLocation()

    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");
    

    useEffect(() => {
        if (paymentId && payerId) {
          const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    
          dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = "/shop/paypal-success";
            }
          });
        }
      }, [paymentId, payerId, dispatch]);
      console.log(payerId);
      

    return ( 
    <Card>
        <CardHeader>
            <CardTitle>
                processing Payment...please wait!
            </CardTitle>
        </CardHeader>
    </Card>
        
        
     );
}

export default PaypalReturnPage;