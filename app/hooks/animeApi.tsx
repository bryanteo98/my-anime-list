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
}

export interface AnimePagination {
  current_page: number;
  has_next_page: boolean;
  last_visible_page: number;
}

export function fetchAnimeNewSeason(page: number) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setData([]); // Clear the data before fetching new data
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/seasons/now?page=${page}`
        );
        setData(response.data.data);
        setPagination(response.data.pagination);
        setMaxPage(response.data.pagination.last_visible_page);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);
  return { data, loading, pagination, maxPage };
}

export function fetchAnimeSearch(query: string) {
  const [data, setData] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        setData([]); // Clear the data if query is empty
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${query}`
        );
        setData(response.data.data || []); // Replace data with new results
        setMaxPage(response.data.pagination.last_visible_page);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setData([]); // Clear the data in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  console.log("searchData", data);
  return { data, loading, maxPage };
}
