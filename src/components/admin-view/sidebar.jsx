import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket,ChartNoAxesCombined,Icon, Sheet  } from "lucide-react";




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


function MenuItems(){
    const navigate = useNavigate()

    return <nav className="mt-8 flex-col flex gap-2"> 
    {adminSidebarMenuItems.map(menuItem => <div key={menuItem.path} className="flex items-center gap-2 rounded-md py-2 px-3 cursor-pointer" onClick={() => navigate(menuItem.path)}>
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
            <Sheet open={open} onOpen>

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