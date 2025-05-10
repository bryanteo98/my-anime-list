import type { Route } from "./+types/home";
import {
  Box,
  Container,
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to the first page on new search
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        mx: "auto",
        my: 2,
        px: { xs: 1, sm: 2, md: 4 },
        width: { xs: "100%", md: "calc(100% - 200px)" },
        border: { xs: "none", md: "2px solid white" },
        borderRadius: { xs: 0, md: 1 },
      }}
      className="h-full flex flex-col items-center pb-5"
    >
      <Box sx={{ mb: 4, mt: 4, width: { xs: "100%", sm: "90%", md: "80%" } }}>
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
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
          width: { xs: "100%", sm: "90%", md: "80%" },
          px: { xs: 0, sm: 2 },
        }}
      >
        <AnimeGrid
          data={searchQuery == "" ? newSeasonData : searchData}
          loading={searchQuery == "" ? newSeasonLoading : searchLoading}
        />

        <Box
          className="flex justify-center mt-4"
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Pagination
            count={searchQuery == "" ? newSeasonMaxPage : searchMaxPage}
            variant="outlined"
            shape="rounded"
            page={page}
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
        </Box>
      </Container>
    </Container>
  );
}
