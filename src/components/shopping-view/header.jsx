import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SheetTrigger,Sheet, SheetContent } from "../ui/sheet";
import { Avatar,AvatarFallback } from "../ui/avatar";

import { DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
     } from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import { logoutUser } from "../../srore/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { getMyCart } from "../../srore/shop/cart-slice";
import { Label } from "../ui/label";




function ShoppingHeader() {
    const {user} = useSelector((state) => state.auth)
    const {cartItems } = useSelector((state) => state.shopCart)

    
    const [openCartSheet,setOpenCartSheet] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout(){
        dispatch(logoutUser())
    }

    useEffect(() => {
        dispatch(getMyCart(user?.id));
    },[dispatch])
    
    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem("filters");
        const currentFilter = getCurrentMenuItem.id !== "home"  ?
        
             {
                category: [getCurrentMenuItem.id],
              } : null
              sessionStorage.setItem("filters", JSON.stringify(currentFilter));
              navigate(getCurrentMenuItem.path)


    }

    function HeaderRightContent (){
        const navigate = useNavigate()

       

        return(
            <div className="flex lg:items-center lg:flex-row  flex-col gap-4  ">
                <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
                <Button 
                onClick={()=> 
                setOpenCartSheet(true)}
                 variant="outline" 
                 size="icon" 
                 className="relative">

                    <ShoppingCart className="w-6 h-6"  />
                    <span className="sr-only">user cart</span>
                </Button>
                <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items:[] }/>
                </Sheet>
               
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="bg-black">
                            <AvatarFallback className="bg-black text-white font-extrabold">
                                {user.name[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" className="w-56 ">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex" onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4 flex mt-1 my-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex" onClick={() => handleLogout()}>
            <LogOut className="mr-2 h-4 w-4 mt-1 my-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }

    function MenuItems (){
        return(
            <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
                {
                    shoppingViewHeaderMenuItems.map(menuItem=> 
                    <Label onClick={() => handleNavigate(menuItem)}  className="text-sm font-medium cursor-pointer" key={menuItem.id}>
                      {menuItem.label}
                      </Label>)
                }
            </nav>
        )
    }
    return ( 
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home"className="flex items-center gap-2 " >
                <HousePlug className="h-6 w-6"/>
                <span className="font-bold">Ecommerce </span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden ">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle header Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs ">
                        <MenuItems/>
                        <HeaderRightContent/>
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems/>
                </div>

                <div className="hidden lg:block" >
                     <HeaderRightContent />
                     </div>
                
                </div>
                
         
        </header>
     );
}

export default ShoppingHeader;