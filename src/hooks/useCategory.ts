import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;

      const categoryWithAll = [
        {
          category_id: null,
          category_name: "전체"
        },
        ...category
      ];

      setCategory(categoryWithAll);
    })
  }, []);

  return { category };
}