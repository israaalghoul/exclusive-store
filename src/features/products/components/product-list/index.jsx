import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Skeleton, Button, Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import ProductsService from "../../services/api";
import { ProductItem } from "../product-item";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
  // when true, use the fetched getAll data instead of the limited products list
  useGetAll = false,
  // optional category id to filter products
  categoryId,
}) {
  const theme = useTheme();
  const swiperRef = useRef(null);
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  // Search query
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const location = useLocation();
  const {
    isLoading,
    isError,
    error,
    data: fetchedData = [],
  } = useQuery({
    queryKey: ["products", searchQuery, categoryId],
    queryFn: async () =>
      categoryId
        ? await ProductsService.getByCategory(categoryId)
        : await ProductsService.getAll(searchQuery),
  });
  // infinite query when using getAll pages
  const pageSize = 20;
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["products-infinite", searchQuery, categoryId],
    queryFn: async ({ pageParam = 0 }) => {
      const all = categoryId
        ? await ProductsService.getByCategory(categoryId)
        : await ProductsService.getAll(searchQuery);
      const start = pageParam * pageSize;
      const items = all.slice(start, start + pageSize);
      return { items, total: all.length };
    },
    enabled: useGetAll,
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.length * pageSize;
      return loaded < lastPage.total ? pages.length : undefined;
    },
  });
  // Limit product
  const [productsLimit, setProductsLimit] = useState([]);
  const [pendingHighlightId, setPendingHighlightId] = useState(null);
  // All product
  // If useGetAll is true, display the accumulated pages from infiniteQuery
  const infiniteItems = infiniteQuery.data
    ? infiniteQuery.data.pages.flatMap((p) => p.items)
    : [];
  // for pagination-based All Products view: fetch full list and slice by page
  const [page, setPage] = useState(1);
  const {
    data: allProducts = [],
    isLoading: isAllProductsLoading,
  } = useQuery({
    queryKey: ["products-all", searchQuery, categoryId],
    queryFn: async () =>
      useGetAll
        ? categoryId
          ? await ProductsService.getByCategory(categoryId)
          : await ProductsService.getAll(searchQuery)
        : [],
    enabled: useGetAll,
  });

  const totalPages = useGetAll ? Math.max(1, Math.ceil((allProducts?.length || 0) / pageSize)) : 0;
  const pagedItems = useGetAll ? (allProducts || []).slice((page - 1) * pageSize, page * pageSize) : [];
  const list = useGetAll
    ? pagedItems
    : allListed || swiper || !useSelected
    ? productsLimit
    : fetchedData;
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
      const data = categoryId
        ? await ProductsService.getByCategory(categoryId, limit, offset)
        : await ProductsService.getProducts(limit, offset);
      setProductsLimit(data);
    };
    loadProducts();
  }, [limit, offset, categoryId]);

  // Reset list
  useEffect(() => {
    itemRefs.current = new Array(list.length);
  }, [list.length]);

  // handle highlight from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
  const highlightId = params.get("highlight");
  if (!highlightId) return;
    const idx = list.findIndex((p) => String(p.id) === String(highlightId));
    if (idx === -1) {
      // if not present in the current list, try fetching it by id and prepend so it becomes visible
      (async () => {
        try {
          const res = await ProductsService.getById(highlightId);
          if (res && res.length > 0) {
            const product = res[0];
            // prepend if not exists
            setProductsLimit((prev) => {
              if (prev.find((p) => String(p.id) === String(product.id))) return prev;
              const next = [product, ...prev];
              // keep length similar to previous limit
              return next.slice(0, Math.max(prev.length, 1));
            });
            // mark pending so we can flash after list updates and refs attach
            setPendingHighlightId(String(highlightId));
          }
        } catch (e) {
          // ignore fetch error
        }
      })();
      return;
    }
    // ensure the whole section is visible on the page first
    if (rootRef.current && typeof rootRef.current.scrollIntoView === "function") {
      try {
        rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (e) {
        /* ignore */
      }
    }

    onSelectIndex(idx);
    // flash
    const el = itemRefs.current[idx];
    if (el) {
      const original = el.style.transition;
      el.style.transition = "background-color 0.2s";
      const prevBg = el.style.backgroundColor;
      el.style.backgroundColor = "rgba(255,255,0,0.6)";
      setTimeout(() => {
        el.style.backgroundColor = prevBg || "";
        el.style.transition = original || "";
      }, 600);
    }
  }, [location.search, list]);

  // when we have a pending highlight (we fetched and prepended a product), wait for list to update then flash
  useEffect(() => {
    if (!pendingHighlightId) return;
    const idx = list.findIndex((p) => String(p.id) === String(pendingHighlightId));
    if (idx === -1) return; // still not present

    // ensure section visible
    if (rootRef.current && typeof rootRef.current.scrollIntoView === "function") {
      try {
        rootRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (e) {
        /* ignore */
      }
    }

    onSelectIndex(idx);
    const el = itemRefs.current[idx];
    if (el) {
      const original = el.style.transition;
      el.style.transition = "background-color 0.2s";
      const prevBg = el.style.backgroundColor;
      el.style.backgroundColor = "rgba(255,255,0,0.6)";
      setTimeout(() => {
        el.style.backgroundColor = prevBg || "";
        el.style.transition = original || "";
      }, 600);
    }

    setPendingHighlightId(null);
  }, [pendingHighlightId, list]);


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
          {error?.message ?? "Error"}
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
      ref={rootRef}
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
            {list.map((item, index) => (
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
            {list.map((item, index) => (
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
            {list.map((item, index) => (
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

        {useGetAll && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              onClick={() => infiniteQuery.fetchNextPage()}
              disabled={!infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage}
              variant="contained"
              sx={(theme)=>({backgroundColor:theme.palette.custom.btnPrimary.main,
                color:"#fff",
                padding:"0.8rem 2.4rem"
              })}
            >
              {infiniteQuery.isFetchingNextPage
                ? "Loading..."
                : infiniteQuery.hasNextPage
                ? "Load more"
                : "No more products"}
            </Button>
          </Box>
        )}

        {/* Pagination for All Products view */}
        {useGetAll && !isAllProductsLoading && totalPages > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => {
                setPage(value);
                if (rootRef.current && typeof rootRef.current.scrollIntoView === 'function') {
                  try { rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e){}
                }
              }}
              shape="rounded"
              variant="outlined"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: (theme) => theme.palette.text.primary,
                  borderColor: (theme) => theme.palette.grey[300],
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: (theme) => theme.palette.custom.btnPrimary.main,
                  color: '#fff',
                  borderColor: (theme) => theme.palette.custom.btnPrimary.main,
                }
              }}
            />
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
