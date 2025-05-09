import { Card, Grid, Skeleton } from "@mui/material";
import { Link } from "react-router";
import type { AnimeSeasonData } from "~/hooks/animeApi";

export default function AnimeGrid({
  data,
  loading,
}: {
  data: AnimeSeasonData[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <Grid container spacing={2} component="div">
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid
            size={{ xs: 12, sm: 3, xl: 2.4 }}
            component="div"
            className="flex flex-col items-center"
            key={index}
          >
            <Skeleton
              variant="rectangular"
              width={225}
              height={320}
              sx={{ bgcolor: "gray" }}
            />
            <Skeleton variant="text" width={225} sx={{ bgcolor: "gray" }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} component="div">
      {data.map((anime) => (
        <Grid
          size={{ xs: 12, sm: 3, xl: 2.4 }}
          component="div"
          className="flex flex-col items-center"
          key={anime.mal_id}
        >
          <Link to={`anime/${anime.mal_id}`}>
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
            <h5 className="w-[225px] pt-2 text-white">{anime.title}</h5>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
