import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrdersDetailsView from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOredersByUser, OredersDetails, restOrderDetails } from "../../srore/shop/orders-slice";
import { Badge } from "../ui/badge";


function ShoppingOrders() {

    const [openDetailsDialog , setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {orderList,orderDetails} = useSelector((state) => state.shopOrder)

  

    console.log(orderDetails,"orderDetails");
    console.log(user);

    function handleGetOrderDetails(getOrderId){
        console.log(getOrderId);
        dispatch(OredersDetails(getOrderId))
    }


    useEffect(() => {
        dispatch(getAllOredersByUser(user?.id))
    },[dispatch])

    useEffect(() => {
        if(orderDetails !== null) setOpenDetailsDialog(true)
    },[orderDetails])
    
    

    return ( 
     <Card>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Order ID
                        </TableHead>
                        <TableHead>
                            Order Date
                        </TableHead>
                        <TableHead>
                            Order Status
                        </TableHead>
                        <TableHead>
                            Order Price
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">details</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderList && orderList.length > 0 ? 
                orderList.map(orderItem => 

                    <TableRow>
                           <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                        <TableCell>
                           <Badge className={`py-1 px-3    ${orderItem?.orderStatus === "confirmed"? "bg-green-500"
                                                      : orderItem?.orderStatus === "rejected"
                                                      ? "bg-red-600"
                                                      : "bg-black"
                                                  }`}>
                                                      {orderItem?.orderStatus}
                            </Badge>
                            </TableCell>
                        <TableCell>${orderItem?.totalAmount}</TableCell>
                        <TableCell>
                            <Dialog open={openDetailsDialog} onOpenChange={()=> {
                                setOpenDetailsDialog(false)
                                dispatch(restOrderDetails())
                            }}>
                            <Button onClick={() => handleGetOrderDetails(orderItem?._id)}>View Deatails</Button>
                            <ShoppingOrdersDetailsView orderDetails={orderDetails} />
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ) : null    
                }
                   
                </TableBody>
            </Table>
        </CardContent>
     </Card>
     );
}

export default ShoppingOrders;