import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionMap, categoryOptionMap } from "../../config";

function ShoppingProductsList({
  product,
  handleGetProductDeatils,
  handleAddToCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDeatils(product?._id)}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          {
          product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Out of Stock
          </Badge>
          ): product?.totalStock < 6 ? 
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
          {`Only ${product?.totalStock} items left `}
        </Badge>:
          product.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              sale
            </Badge>
          ) : null}
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionMap[product.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionMap[product.brand]}
            </span>
          </div>

          <div className="justify-between flex">
            <span
              className={`${
                product.salePrice > 0 ? `line-through` : ""
              } text-lg font-semibold text-primary`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {
          product?.totalStock === 0 ?
          <Button
          className="w-full cursor-not-allowed opacity-60"

        >
          Out of Stock
        </Button>:

        
        <Button
          onClick={() => handleAddToCart(product?._id,product?.totalStock)}
          className="w-full"
        >
          Add to cart
        </Button>
}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductsList;
