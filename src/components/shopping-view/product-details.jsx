import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { getMyCart , addToCart} from "../../srore/shop/cart-slice";
import { setProductDetails } from "../../srore/shop/products-slice";


function ProductDetailsDialog({open,setOpen,productDetails}) {

    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

      function handleAddToCart(getCurrentProductId){
        dispatch(addToCart({userId: user?.id, productId:getCurrentProductId,quantity:1})
      ).then((data) => {
        console.log(data);
        
        if(data?.payload?.success){
          dispatch(getMyCart(user?.id));
        }
      })
        
      }
      function handleDialogClose(){
        setOpen(false)
        dispatch(setProductDetails())
      }
    return ( 
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-0   max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img src={productDetails?.image}
                     alt={productDetails?.alt} 
                     width={600}
                      height={600}
                    className="aspect-square w-full object-cover p-9"

                      />
                </div>
                <div className="pt-9 mr-7">
                <div>
                    <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                    <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>${productDetails?.price}</p>
                    {productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p> : null}
                </div>
                <div className="flex items-center gap-2 mt-2">
                <dvi className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </dvi>
                                <span className="text-muted-foreground">{4.5}</span>
                </div>
                <div className="mt-5 mb-5">
                    <Button onClick={()=> handleAddToCart(productDetails?._id)} className="w-full">Add to Cart</Button>
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6">
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">sss</h3>
                                </div>
                                <dvi className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </dvi>
                                <p className="text-muted-foreground">good quilty</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">sss</h3>
                                </div>
                                <dvi className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </dvi>
                                <p className="text-muted-foreground">good quilty</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">sss</h3>
                                </div>
                                <dvi className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </dvi>
                                <p className="text-muted-foreground">good quilty</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">sss</h3>
                                </div>
                                <dvi className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </dvi>
                                <p className="text-muted-foreground">good quilty</p>
                            </div>
                        </div>

                        </div>
                        <div className="mt-10 flex-col flex gap-2">
                            <Label>Write a review</Label>
                            <Button>submit</Button>
                        </div>
                    </div>
              
                </div>
            </DialogContent>
        </Dialog>
     );
}

export default ProductDetailsDialog;