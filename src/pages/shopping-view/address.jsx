import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CommonForm from "../../components/common/form";
import { useEffect, useState } from "react";
import { addressFormControls } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../../srore/shop/address-slice";
import AddressCard from "../../components/shopping-view/address-card";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
function Address({setCurrentSelectAddress}) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [getCurrentEditId, setGetCurrentEditId] = useState(null);


  function handleMangeAddress(event) {
    event.preventDefault();

    getCurrentEditId !== null ? 
    dispatch(
        updateAddress({
        userId:user?.id,
        addressId:getCurrentEditId,
        formData
    })
).then((data) => {
    console.log(data);
        if(data?.payload?.success){
         
    

            dispatch(getAddress(user?.id))
            setGetCurrentEditId(null)
            setFormData(initialAddressFormData)
        }
    }):
    
    dispatch(
      addAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(getAddress(user?.id));
        setFormData(initialAddressFormData);
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  
  useEffect(() => {
    dispatch(getAddress(user?.id));
  }, [dispatch]);

  function handleDeletAddress(getCurrentIdAddress) {
    console.log(getCurrentIdAddress, "getCurrentIdAddress");

    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentIdAddress._id })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(getAddress(user?.id));
      }
    });
  }
  
  function handleEditAddress(getCurrentAdderssId) {
    setGetCurrentEditId(getCurrentAdderssId?._id);
    setFormData({
      ...formData,
      address: getCurrentAdderssId?.address,
      city: getCurrentAdderssId?.city,
      phone: getCurrentAdderssId?.phone,
      pincode: getCurrentAdderssId?.pincode,
      notes: getCurrentAdderssId?.notes,
    });
  }

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2    gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addresItem) => (
              <AddressCard
                handleDeletAddress={handleDeletAddress}
                handleEditAddress={handleEditAddress}
                addressInfo={addresItem}
                setCurrentSelectAddress={setCurrentSelectAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
    {getCurrentEditId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText=    {getCurrentEditId !== null ? "Edit Address" : "Add New Address"}

          onSumbit={handleMangeAddress}
          isButtonDisapled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
