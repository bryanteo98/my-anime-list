import axios from "axios";
import { useState, useEffect, useRef } from "react";

export interface AnimeSeasonData {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  title: string;
  title_english: string;
  title_japanese: string;
  synopsis: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
}

export interface AnimePagination {
  current_page: number;
  has_next_page: boolean;
  last_visible_page: number;
}

export function fetchAnimeNewSeason(page: number) {
  const [data, setData] = useState<AnimeSeasonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<AnimePagination | null>(null);
  const [maxPage, setMaxPage] = useState(1);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.jikan.moe/v4/seasons/now?page=${page}`
          );
          const uniqueData = Array.from(
            new Map(
              (response.data.data as AnimeSeasonData[]).map(
                (anime: AnimeSeasonData) => [anime.mal_id, anime]
              )
            ).values()
          );
          setData(uniqueData);
          setPagination(response.data.pagination);
          setMaxPage(response.data.pagination.last_visible_page);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          setData([]); // Clear the data in case of an error
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [page]);
  return { data, loading, pagination, maxPage };
}

export function fetchAnimeSearch(query: string, page: number) {
  const [data, setData] = useState<AnimeSeasonData[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`
          );
          const uniqueData = Array.from(
            new Map(
              (response.data.data as AnimeSeasonData[]).map(
                (anime: AnimeSeasonData) => [anime.mal_id, anime]
              )
            ).values()
          );
          setData(uniqueData);
          setMaxPage(response.data.pagination.last_visible_page);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          setData([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 400); // 400ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, page]);

  return { data, loading, maxPage };
}

export function fetchSingleAnimeById(id: string) {
  const [data, setData] = useState<AnimeSeasonData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  return { data, loading };
}
