import { ArrowUpDown } from "lucide-react";
import ProductFilter from "../../components/shopping-view/filter";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { sortOptions } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShoppingProductsList from "../../components/shopping-view/product-list";
import { useSearchParams } from "react-router-dom";
import { filterAllProducts, getProductDetails } from "../../srore/shop/products-slice";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { addToCart, getMyCart } from "../../srore/shop/cart-slice";



function createSearchParamsHelper(filterParams){
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");

}


function ShoppingListing() {

  const dispatch = useDispatch()
  const { productList,productDetails } = useSelector(
    (state) => state.shopProducts)
  const{user} = useSelector((state) => state.auth)
  const [filters,setFilters] = useState({})
  const [sort,setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)

  //for sort
  function handleSort(value){
    setSort(value)
    console.log(value);
    
  }

  function handleFilters(getSectionId,getCurrentOption){
    //filter (brand,category)
    console.log(getSectionId);
    //filter (nike,men)
    console.log(getCurrentOption);

    let copyFilters = {...filters}
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
    //تحديد وعرض العناصر 
    if(indexOfCurrentSection === -1) {
      copyFilters={
        ...copyFilters,
        [getSectionId]:[getCurrentOption]
      }
    }else{
      //تحديد عنصر اخر
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption)
      if(indexOfCurrentOption === -1) copyFilters[getSectionId].push(getCurrentOption)
        //حذف عنصر
        else copyFilters[getSectionId].splice(indexOfCurrentOption,1)
    }
    console.log(copyFilters);
    //حفظ العنصر
    setFilters(copyFilters);
    //حفظ التحديث مؤقت
    sessionStorage.setItem("filters",JSON.stringify(copyFilters))
    console.log(filters,searchParams);

  }

  function handleGetProductDeatils(getCurrentProductId){
    console.log(getCurrentProductId, "getCurrentProductId");
    dispatch(getProductDetails(getCurrentProductId))
    
  }

  function handleAddToCart(getCurrentProductId){
    dispatch(addToCart({userId: user?.id, productId:getCurrentProductId,quantity:1})
  ).then((data) => {
    if(data?.payload?.success){
      dispatch(getMyCart(user?.id));
    }
  })
    
  }
  //عمل تحديث للعناصر 
  useEffect(() => {
    //جلب القيمة البدائية 
    setSort("price-lowtohigh")
    //جلب العناصر بعد التحديث
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || { })
  },[categorySearchParam])


  //show search in url
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  },[filters])
  

  useEffect(() => {
    if (filters !== null && sort !== null)

    dispatch(
      filterAllProducts({filterParams:filters,sortParams:sort})
    );
  },[dispatch,sort,filters])
  console.log(productDetails,"productDetails");

  useEffect(() => {
    if(productDetails !== null) setOpenDetailsDialog(true);
  },[productDetails])
  

  return (
  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
    <ProductFilter filters={filters} handleFilters={handleFilters} />
    <div className="bg-background w-full rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-extrabold">All Products</h2>
        <div  className="flex items-center gap-3">
          <span className="text-muted-foreground">{productList.length} Products</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"
                  size="sm"
                  className="flex items-center gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort by</span>

                  </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
              {sortOptions.map((sortItem) =>( 
                <DropdownMenuRadioItem
                 key={sortItem.id}
                 value={sortItem.id}
                 >
                  {sortItem.label} 
                  </DropdownMenuRadioItem>
                  ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
          </DropdownMenu>
     
       
          </div>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {productList && productList.length > 0 ? 
      productList.map(productItem => 
      <ShoppingProductsList 
      handleGetProductDeatils={handleGetProductDeatils}
       product={productItem} 
       handleAddToCart={handleAddToCart}
       />) : null  
      }
      </div>
    </div>
    <ProductDetailsDialog 
    open={openDetailsDialog} 
    setOpen={setOpenDetailsDialog} 
    productDetails={productDetails} />
  </div>
  )
}

export default ShoppingListing;
