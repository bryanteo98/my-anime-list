import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { fetchSingleAnimeById } from "~/hooks/animeApi";

export default function Anime({ params }: { params: { animeId: string } }) {
  // Fetching anime data
  const { data: anime, loading: animeLoading } = fetchSingleAnimeById(
    params.animeId
  );

  if (animeLoading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          mx: "auto",
          my: 2,
          width: { xs: "100%", md: "calc(100% - 200px)" },
          border: "2px solid white",
          borderRadius: 1,
          p: { xs: 1, sm: 2 },
        }}
        className="h-full flex flex-col items-center pb-5 text-white"
      >
        <Container
          maxWidth={false}
          sx={{
            mx: "auto",
            my: 2,
            width: { xs: "100%", sm: "90%", md: "80%" },
            p: { xs: 0, sm: 2 },
          }}
        >
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 2 }}
              component={"div"}
              className="flex flex-col items-center"
            >
              <Skeleton
                variant="rectangular"
                width={225}
                height={320}
                sx={{ bgcolor: "gray" }}
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 8, md: 8, lg: 8, xl: 10 }}
              component={"div"}
              className="flex flex-col items-left"
            >
              <Skeleton variant="text" width={225} sx={{ bgcolor: "gray" }} />
              <Skeleton variant="text" width={225} sx={{ bgcolor: "gray" }} />
              <Skeleton variant="text" width={225} sx={{ bgcolor: "gray" }} />
              <hr
                style={{
                  width: "100%",
                  border: "1px solid white",
                  margin: "16px 0",
                }}
              />
              <Skeleton variant="text" width={225} sx={{ bgcolor: "gray" }} />
              <Skeleton
                variant="text"
                width={500}
                height={100}
                sx={{ bgcolor: "gray" }}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  mt: 2,
                  alignItems: { xs: "center", sm: "stretch" },
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    border: "1px solid white",
                    borderRadius: 1,
                    backgroundColor: "rgba(12, 131, 75, 0.76)",
                    flex: 1,
                    minWidth: 150,
                    maxWidth: 250,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"auto"}
                    height={90}
                    sx={{ bgcolor: "gray" }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    border: "1px solid white",
                    borderRadius: 1,
                    backgroundColor: "rgba(48, 154, 241, 0.83)",
                    flex: 1,
                    minWidth: 150,
                    maxWidth: 250,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"auto"}
                    height={90}
                    sx={{ bgcolor: "gray" }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    border: "1px solid white",
                    borderRadius: 1,
                    backgroundColor: "rgba(230, 36, 236, 0.57)",
                    flex: 1,
                    height: "auto",
                    minWidth: 150,
                    maxWidth: 250,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"auto"}
                    height={90}
                    sx={{ bgcolor: "gray" }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        mx: "auto",
        my: 2,
        width: { xs: "100%", md: "calc(100% - 200px)" },
        border: "2px solid white",
        borderRadius: 1,
        p: { xs: 1, sm: 2 },
      }}
      className="h-full flex flex-col items-center pb-5 text-white"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
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
          width: { xs: "100%", sm: "90%", md: "80%" },
          p: { xs: 0, sm: 2 },
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 2 }}
            component={"div"}
            className="flex flex-col items-center"
          >
            <Box
              component="img"
              src={anime?.images.jpg.image_url}
              alt={anime?.title}
              loading="lazy"
              sx={{
                width: { xs: "70%", sm: "100%", xl: "100%" },
                maxWidth: 250,
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 8, md: 8, lg: 8, xl: 10 }}
            component={"div"}
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
            <Typography variant="subtitle1">Synopsis</Typography>
            <Typography variant="body1">{anime?.synopsis}</Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                mt: 2,
                alignItems: { xs: "center", sm: "stretch" },
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px solid white",
                  borderRadius: 1,
                  backgroundColor: "rgba(12, 131, 75, 0.76)",
                  flex: 1,
                  minWidth: 150,
                  maxWidth: 250,
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Score
                </Typography>
                <Typography
                  variant="h5"
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
                  backgroundColor: "rgba(48, 154, 241, 0.83)",
                  flex: 1,
                  minWidth: 150,
                  maxWidth: 250,
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Rank
                </Typography>
                <Typography
                  variant="h5"
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
                  backgroundColor: "rgba(230, 36, 236, 0.57)",
                  flex: 1,
                  height: "auto",
                  minWidth: 150,
                  maxWidth: 250,
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Popularity
                </Typography>
                <Typography
                  variant="h5"
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
