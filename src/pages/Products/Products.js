import style from "./Products.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterSection from "../../components/filterSection/filterSection";
import { Helmet } from "react-helmet-async";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const Products = () => {
  const [title, setTitle] = useState("All Products");
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalItems = Products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter data based on the current page
  const currentPageData = Products.slice(startIndex, endIndex);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}product/AllProducts`
        );
        if (response) {
          setProducts(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Equilibre - products</title>
        <meta name="decription" content="" />
      </Helmet>
      <main className={style.mainContainer}>
        <FilterSection
          setProductLoading={setLoading}
          setProducts={setProducts}
          setTitle={setTitle}
        />
        <section className={style.cardsContainer}>
          <h1 className={style.pageTitle}>{title}</h1>
          <SearchBar
            setProductLoading={setLoading}
            setProducts={setProducts}
            setTitle={setTitle}
          />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={style.cardsWrapper}>
              {Products.length === 0 ? (
                <p>No products available for this filter.</p>
              ) : (
                currentPageData &&
                currentPageData.map((product, index) => (
                  <ProductCard
                    id={product._id}
                    key={index}
                    name={product.name}
                    description={product.description}
                    size={product.sizes}
                    imgurl={product.image}
                    offerId={product.offerId}
                    slug={product.slug}
                  />
                ))
              )}
            </div>
          )}
          <Stack spacing={2} mt={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </section>
      </main>
    </>
  );
};

export default Products;
