import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";


function AddressCard({addressInfo,handleEditAddress,handleDeletAddress,setCurrentSelectAddress,currentSelectAddress}){
    return(
        <Card onClick={
            setCurrentSelectAddress 
            ? () => setCurrentSelectAddress(addressInfo)
            : null
            }
            className={`cursor-pointer border-red-700 ${
                currentSelectAddress?._id === addressInfo?._id
                  ? "border-red-900 border-[4px]"
                  : "border-black"
              }`}
            >
            <CardContent className="grid p-4 gap-4">
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>Pincode: {addressInfo?.pincode}</Label>
                <Label>Phone: {addressInfo?.phone}</Label>
                <Label>Notes: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="flex justify-between p-3">
                <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={() => handleDeletAddress(addressInfo)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard