import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card,CardHeader,CardTitle,CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { TableHead,TableBody,TableCell,TableHeader,TableRow,Table } from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch,useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, restOrderDetails } from "../../srore/admin/orders-slice";
import { Badge } from "../ui/badge";


function AdminOrdersView() {
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
    const {orderList,orderDetails} = useSelector((state) => state.adminOrder)
    const dispatch = useDispatch()


    function handleGetOrderDetails(getId){
        dispatch(getOrderDetailsForAdmin(getId))
        console.log(getId);
        
    }


    useEffect(()=>{
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    useEffect(()=> {
        if(orderDetails !== null) setOpenDetailsDialog(true)
    },[orderDetails])

    console.log(orderDetails,"orderList");


    return ( 
        <Card  >
        <CardHeader>
            <CardTitle>All Order </CardTitle>
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
                orderList.map((orderItem) => 

                    <TableRow>
                           <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
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
                                setOpenDetailsDialog(false);
                                dispatch(restOrderDetails())
                            }}>
                           <Button onClick={()=> handleGetOrderDetails(orderItem?._id)} >View Deatails</Button>
                            <AdminOrderDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView;