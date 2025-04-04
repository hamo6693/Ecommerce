import bannarOne from "../../assets/banner-1.webp";
import bannarTwo from "../../assets/banner-2.webp";
import bannarThree from "../../assets/banner-3.webp";
import { Button } from "../../components/ui/button";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  icons,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAllProducts, getProductDetails } from "../../srore/shop/products-slice";
import ShoppingProductsList from "../../components/shopping-view/product-list";
import { useNavigate } from "react-router-dom";
import { addToCart, getMyCart } from "../../srore/shop/cart-slice";
import { useToast } from "../../hooks/use-toast";
import { getFeatureImages } from "../../srore/common-slice";


const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icons: Shirt },
  { id: "adidas", label: "Adidas", icons: WashingMachine },
  { id: "puma", label: "Puma", icons: ShoppingBasket },
  { id: "levi", label: "Levi's", icons: Airplay },
  { id: "zara", label: "Zara", icons: Images },
  { id: "h&m", label: "H&M", icons: Heater },
];

function ShoppingHome() {
  const slides = [bannarOne, bannarTwo, bannarThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const {user} = useSelector((state) => state.auth)
  const { productList } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);

       const {toast} = useToast()
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();
 
  console.log(productList);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    Navigate("/shop/listing");
  }

   function handleGetProductDeatils(getCurrentProductId){
      dispatch(getProductDetails(getCurrentProductId))
      
    }

    function handleAddToCart(getCurrentProductId){
        dispatch(addToCart({userId: user?.id, productId:getCurrentProductId,quantity:1})
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Product is added to cart",
          });
          dispatch(getMyCart(user?.id));

        } else {
          
          toast({
            title: data?.payload?.message,
          });
        }
       
      })
    }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      filterAllProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0 ?
         featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={` ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }  absolute top-0 left-0 w-full object-cover transition-opacity duration-1000 `}
          />
        )):null}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="h-4 w-4 " />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" >
            {categoriesWithIcon.map((categoryItem) => (
              <Card
              
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icons className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductsList
                   product={productItem}
                    handleGetProductDeatils={handleGetProductDeatils}
                    handleAddToCart={handleAddToCart}
                    />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
