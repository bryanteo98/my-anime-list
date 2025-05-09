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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "REACT Anime List" },
    { name: "description", content: "Welcome to REACT Anime List!" },
  ];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [animeData, setAnimeData] = useState([]);

  // Fetching anime data
  const {
    data: newSeasonData,
    maxPage,
  }: { data: AnimeSeasonData[]; maxPage: number } = fetchAnimeNewSeason(page);
  // Fetching anime search data
  const { data: searchData }: { data: AnimeSeasonData[]; loading: boolean } =
    fetchAnimeSearch(searchQuery);

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
        <Grid container spacing={2} component="div">
          {(searchQuery == "" ? newSeasonData : searchData).map((anime) => (
            <Grid
              size={{ xs: 12, sm: 3, xl: 2.4 }}
              component="div"
              className="flex flex-col items-center"
              key={anime.mal_id}
            >
              <Card
                variant="outlined"
                sx={{
                  height: "auto",
                  width: "225px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  loading="lazy"
                />
              </Card>
              <h5 className="w-[225px] pt-2 text-white">
                {anime.title_english}
              </h5>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={searchQuery == "" ? maxPage : 10}
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
