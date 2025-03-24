import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket,ChartNoAxesCombined,Icon  } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

 const adminSidebarMenuItems = [
    {
      id:"dashboard",
      label:"dashboard",
      path:"/admin/dashboard",
      Icon:<LayoutDashboard />
    },
    {
      id:"products",
      label:"products",
      path:"/admin/products",
      Icon:<ShoppingBasket />
    },
    {
      id:"orders",
      label:"orders",
      path:"/admin/orders",
      Icon:<BadgeCheck />
    }
  ]


function MenuItems({setOpen}){
    const navigate = useNavigate()

    return <nav className="mt-8 flex-col flex gap-2"> 
    {adminSidebarMenuItems.map(menuItem => <div key={menuItem.path} className="flex items-center gap-2 rounded-md py-2 px-3 cursor-pointer" 
    onClick={() => {navigate(menuItem.path)
      setOpen ?  setOpen(false):null

    }}>
            {menuItem.Icon}
            <span>{menuItem.label}</span>
        </div>)

    }
    </nav>
}


function AdminSidebar({open,setOpen}) {
  
    const navigate = useNavigate()
    return ( 
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent side="left" className="w-64 ">
                <div className="flex flex-col h-full">
                  <SheetHeader className="border-b">
                    <SheetTitle className="flex gap-2 mt-5" >
                    <ChartNoAxesCombined size={30}/>

                      <span className="text-2xl font-extrabold">Admin panel</span>

                    </SheetTitle>
                  </SheetHeader>
                  <MenuItems setOpen={setOpen}/>
                </div>

              </SheetContent>

            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate("/admin/dashboard")} className="flex cursor-pointer items-center gap-2">
                    <ChartNoAxesCombined size={30}/>
                    <h5 className="text-xl font-extrabold">admin panel</h5>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
     );
}

export default AdminSidebar;