import ImageCard from "./product-card";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = () => {
  const style = {
    list: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 3fr) )",
      gap: "50px",
      marginLeft: "auto",
      maxWidth: "690px",
      marginRight: "auto",
    },
  };

  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  // const [pageIndex, setPageIndex] = useState(10);
  const length = 100;
  const getProducts = async (pageSize) => {
    let size = pageSize || 0;
    let index = 50;
    return await axios.get(
      `https://dummyjson.com/products?limit=${index}&skip=${size}`
    );
  };

  const fetchData = async () => {
    setPageSize(pageSize + 50);
    // setPageIndex(pageIndex + 10);
    const result = await getProducts(pageSize + 50);
    let newProducts = products.concat(result?.data?.products);
    setProducts(newProducts);
  };

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data.products));
  }, []);
  console.log(products);
  return (
    products.length !== 0 && (
      <InfiniteScroll
        dataLength={products.length} //This is important field to render the next data
        next={fetchData}
        hasMore={products?.length < length}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.8}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div style={style.list}>
          {products.map((product) => {
            return (
              <ImageCard
                key={product.id}
                image={product.images[0]}
                title={product.title}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    )
  );
};

export default ProductList;
