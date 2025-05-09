import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { fetchSingleAnimeById } from "~/hooks/animeApi";

export default function Anime({ params }: { params: { animeId: string } }) {
  console.log("Anime ID:", params.animeId);
  const { data: anime } = fetchSingleAnimeById(params.animeId);
  console.log("Anime Data:", anime);
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
      className="h-full flex flex-col items-center pb-5 text-white"
    >
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      >
        <Link to="/">
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "white", mt: 2 }}
          >
            Back
          </Button>
        </Link>
      </Box>
      <Container
        maxWidth={false}
        sx={{
          mx: "auto",
          my: 2,
          width: "80%",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 2, xl: 2 }}
            component="div"
            className="flex flex-col items-center"
          >
            <img
              src={anime?.images.jpg.image_url}
              alt={anime?.title}
              loading="lazy"
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 10, xl: 10 }}
            component="div"
            className="flex flex-col items-left"
          >
            <Typography variant="h5">{anime?.title}</Typography>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              English: {anime?.title_english}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              Japanese: {anime?.title_japanese}
            </Typography>
            <hr
              style={{
                width: "100%",
                border: "1px solid white",
                margin: "16px 0",
              }}
            />
            <Typography variant="subtitle1">Sysnopsis</Typography>
            <Typography variant="body1">{anime?.synopsis}</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px solid white",
                  borderRadius: 1,
                  display: "inline-block",
                  backgroundColor: "rgba(12, 131, 75, 0.76)",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Score
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {anime?.score || "N/A"}
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                  Score by : {anime?.scored_by || "N/A"}
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px solid white",
                  borderRadius: 1,
                  display: "inline-block",
                  backgroundColor: "rgba(48, 154, 241, 0.83)",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Rank
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  # {anime?.rank || "N/A"}
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px solid white",
                  borderRadius: 1,
                  display: "inline-block",
                  backgroundColor: "rgba(230, 36, 236, 0.57)",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Popularity
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  # {anime?.popularity || "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
