import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";

import CommonForm from "@/components/common/form";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProducts, editProducts, getAllProducts } from "../../srore/admin/products-slice";
import AdminProductList from "./product-list";
import { useToast } from "../../hooks/use-toast";



function AdminProducts() {

   

    const initialFormData = {
        image:"null",
        title:"",
        description:"",
        category:"",
        price:"",
        salePrice:"",
        totalStock:""

    }
    const [openCreateProductDialog,setOpenCreateProductDialog] = useState(false)
    const [formData,setFormData] = useState(initialFormData)
    const [imageFile,setImageFile] = useState(null)
    const [uploadImageUrl,setUploadImageUrl] = useState("");
    const {productList} = useSelector((state) => state.adminProducts)
         const {toast} = useToast()
    
    const dispatch = useDispatch()
    const [imageLoadingState,setImageLoadingState] = useState(false)
    const [currentEditId,setCurrentEditId] = useState(null)



    function onSubmit(event) {
        event.preventDefault();
        currentEditId !== null ? 
        dispatch(editProducts({
            id:currentEditId,
            formData:formData
        })).then((data) => {
            console.log(data);
            if(data?.payload?.success){
                dispatch(getAllProducts())
                setFormData(initialFormData)
                setOpenCreateProductDialog(false)
                setCurrentEditId(null)
            }
            
        })
        :dispatch(
            addProduct({
            ...formData,
            image:uploadImageUrl
        })).then((data)=> {

            if(data?.payload?.success){
                toast({
                    title: "Product add successfully",
                  });
                dispatch(getAllProducts())
                setOpenCreateProductDialog(false)
                setImageFile(null)
                setFormData(initialFormData)
            }
            
        })
    }

    function handleDelete(getCurrentProductId){
        dispatch(deleteProducts(getCurrentProductId)).then(data=>{
            if(data.payload?.success){
                console.log(data);
                dispatch(getAllProducts())
                
            }
        })
        

    }

    function isFormValid(){
        return Object.keys(formData)
        .map((key) => formData[key] !== "")
        .every((item) =>  item)
    } 

    
    
    useEffect(() => {
        dispatch(getAllProducts())
    },[dispatch])
    
    console.log(productList,uploadImageUrl,formData,"productList");
    
    return (
       <Fragment>
        <div className="mb-5 w-full flex justify-end ">
            <Button  onClick={() => setOpenCreateProductDialog(true)} >add new product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
                productList && productList.length > 0 ?
                productList.map(productItem => 

                <AdminProductList 
                setOpenCreateProductDialog={setOpenCreateProductDialog} 
                setFormData={setFormData} 
                setCurrentEditId={setCurrentEditId} 
                product={productItem}
                handleDelete={handleDelete}
                />)
                :null
            }
        </div>
        <Sheet open={openCreateProductDialog} onOpenChange={() =>{ setOpenCreateProductDialog(false)
        setCurrentEditId(null)
        setFormData(initialFormData)
        }}>
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>
                        {
                            currentEditId !== null ?
                            "Edit Product" : "Add New Product"
                        }
                    </SheetTitle>
                </SheetHeader>
                <ProductImageUpload 
                imageFile={imageFile} 
                setImageFile={setImageFile} 

                uploadImageUrl={uploadImageUrl} 
                setUploadImageUrl={setUploadImageUrl}

                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}

                isEditMode={currentEditId !== null}

                />
                <div className="py-6">
                    <CommonForm
                    formData={formData}
                    setFormData={setFormData}
                    formControls={addProductFormElements}
                    buttonText={currentEditId !== null ? "Edit":"Add"}
                    onSumbit={onSubmit}
                    isButtonDisapled={!isFormValid()}
                    />
                </div>
            </SheetContent>
        </Sheet>
       </Fragment>
      );
}

export default AdminProducts;