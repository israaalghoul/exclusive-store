import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../../services/api";
import { ProductItem } from "../product-item";
import { useSearchParams } from "react-router";

export function ProductList({
  limit = 10,
  offset = 0,
  showOffer,
  offerColor,
  discount,
  swiper = true,
  useSelected = true,
  allListed = false,
  selectedIndex = 0,
  onSelectIndex = () => {},
}) {
  const theme = useTheme();
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  // Search query
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const {
    isLoading,
    isError,
    error,
    data: fetchedData = [],
  } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: async () => await ProductsService.getAll(searchQuery),
  });
  // Limit product
  const [productsLimit, setProductsLimit] = useState([]);
  // All product
  const list = allListed || swiper || !useSelected ? productsLimit : fetchedData;
  // Online & Offline
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  // Online & Offline state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Limit product state
  useEffect(() => {
    const loadProducts = async () => {
      const data = await ProductsService.getProducts(limit, offset);
      setProductsLimit(data);
    };
    loadProducts();
  }, [limit, offset]);

  // Reset list
  useEffect(() => {
    itemRefs.current = new Array(list.length);
  }, [list.length]);


  useEffect(() => {
    if (!useSelected || list.length === 0) return;
    const idx = Math.max(0, Math.min(selectedIndex, list.length - 1));

    if (swiper && swiperRef.current?.slideTo) {
      swiperRef.current.slideTo(idx);
    } else {
      const el = itemRefs.current[idx];
      const container = containerRef.current;
      if (el && container) {
        const elLeft = el.offsetLeft;
        const elWidth = el.offsetWidth;
        const containerWidth = container.offsetWidth;

        container.scrollTo({
          left: elLeft - containerWidth / 2 + elWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex, list, swiper, useSelected]);

  // Error
  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <p style={{ color: "red", fontSize: "1.25rem" }}>
          {error?.message ?? "حدث خطأ"}
        </p>
      </Box>
    );
  }
  // Skeletons loading & offline
  if (!isOnline || isLoading) {
    return (
      <Box sx={{ display: "flex", gap: 3, overflow: "hidden", pb: 4 }}>
        {[...Array(4)].map((_, i) => (
          <Box key={i} sx={{ width: 270 }}>
            <Skeleton
              variant="rectangular"
              width={270}
              height={250}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="40%" />
          </Box>
        ))}
      </Box>
    );
  }
  // No data
  if (!list || list.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom : "4.0rem" }}>
        <p style={{ color: "#db4444", fontSize: "2.25rem" }}>No data found</p>
      </Box>
    );
  }

  const handleItemClick = (index) => {
    onSelectIndex(index);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ position: "relative", overflow: "visible", p: 0 }}
    >
      <Box sx={{ overflow: "visible"}}>
        {swiper ? (
          <Swiper
            modules={[SwiperPagination]}
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{ clickable: true }}
            onSwiper={(s) => (swiperRef.current = s)}
            style={{ overflow: "visible", paddingBottom: 40 }}
          >
            {productsLimit.map((item, index) => (
              <SwiperSlide
                key={item.id ?? index}
                style={{
                  width: 270,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  ref={(el) => (itemRefs.current[index] = el)}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    cursor: "pointer",
                    transform:
                      index === selectedIndex ? "translateY(-6px)" : "none",
                    boxShadow:
                      index === selectedIndex
                        ? "0 10px 30px rgba(0,0,0,0.12)"
                        : "none",
                    border: `2px solid ${
                      index === selectedIndex
                        ? theme.palette.primary.main
                        : "transparent"
                    }`,
                    borderRadius: 2,
                    transition: "all .18s ease",
                  }}
                >
                  <ProductItem
                    key={item.id}
                    {...item}
                    isSelected={index === selectedIndex}
                    showOffer={showOffer}
                    offerColor={offerColor}
                    discount={discount}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : allListed ? (
          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: "3.0rem",
              width: "100%",
              flexWrap: "wrap",
              overflowX: "auto",
              "&::-webkit-scrollbar": { height: 8 },
            }}
          >
            {productsLimit.map((item, index) => (
              <Box
                key={item.id ?? index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleItemClick(index)}
                sx={{
                  minWidth: 270,
                  cursor: "pointer",
                  borderRadius: 2,
                  transition:
                    "transform .18s, box-shadow .18s, border-color .18s",
                  transform:
                    index === selectedIndex ? "translateY(-6px)" : "none",
                  boxShadow:
                    index === selectedIndex
                      ? "0 10px 30px rgba(0,0,0,0.12)"
                      : "none",
                  border: `2px solid ${
                    index === selectedIndex
                      ? theme.palette.primary.main
                      : "transparent"
                  }`,
                  backgroundColor: "background.paper",
                }}
              >
                <ProductItem
                  key={item.id}
                  {...item}
                  isSelected={index === selectedIndex}
                  showOffer={showOffer}
                  offerColor={offerColor}
                  discount={discount}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: "3.0rem",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {productsLimit.map((item, index) => (
              <ProductItem
                key={item.id}
                {...item}
                discount={discount}
                showOffer={showOffer}
                offerColor={offerColor}
              />
            ))}
          </Box>
        )}

        {/* pagination style */}
        <style>{`
          .swiper-pagination { bottom: 8px !important; }
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #ccc;
            opacity: 1;
            margin: 0 5px !important;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: ${theme.palette.custom.btnPrimary.main};
            transform: scale(1.3);
          }
        `}</style>
      </Box>
    </Container>
  );
}
