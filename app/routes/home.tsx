import type { Route } from "./+types/home";
import {
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  fetchAnimeNewSeason,
  fetchAnimeSearch,
  type AnimeSeasonData,
} from "~/hooks/animeApi";
import { useState } from "react";
import { Link } from "react-router";
import AnimeGrid from "~/components/animeGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "REACT Anime List" },
    { name: "description", content: "Welcome to REACT Anime List!" },
  ];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Fetching anime data
  const {
    data: newSeasonData,
    maxPage: newSeasonMaxPage,
    loading: newSeasonLoading,
  }: {
    data: AnimeSeasonData[];
    maxPage: number;
    loading: boolean;
  } = fetchAnimeNewSeason(page);
  // Fetching anime search data
  const {
    data: searchData,
    maxPage: searchMaxPage,
    loading: searchLoading,
  }: {
    data: AnimeSeasonData[];
    maxPage: number;
    loading: boolean;
  } = fetchAnimeSearch(searchQuery, page);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Handle page change
    setPage(value);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        mx: "auto",
        my: 2,
        width: "calc(100% - 200px)",
        border: "2px solid white",
        borderRadius: 1,
      }}
      className="h-full flex flex-col items-center pb-5"
    >
      <Box sx={{ mb: 4, mt: 4, width: "80%" }}>
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" className="text-white" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 28,
                border: "1px solid white",
                color: "white",
              },
            },
          }}
        />
      </Box>

      <Container
        maxWidth={false}
        sx={{
          mx: "auto",
          my: 2,
          width: "80%",
        }}
      >
        <AnimeGrid
          data={searchQuery == "" ? newSeasonData : searchData}
          loading={searchQuery == "" ? newSeasonLoading : searchLoading}
        />

        <Pagination
          count={searchQuery == "" ? newSeasonMaxPage : searchMaxPage}
          variant="outlined"
          shape="rounded"
          className="flex justify-center mt-4"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              borderColor: "white",
            },
            "& .Mui-selected": {
              backgroundColor: "white !important",
              color: "black !important",
            },
          }}
          onChange={handleChangePage}
        />
      </Container>
    </Container>
  );
}
