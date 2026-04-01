import { useState, useCallback, useRef } from 'react';
import type { DrugSearchResult } from '../types';

export function useDrugSearch() {
  const [results, setResults] = useState<DrugSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const searchDrugs = useCallback(async (query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    timeoutRef.current = window.setTimeout(async () => {
      setLoading(true);

      try {
        const url = `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${encodeURIComponent(query)}&maxList=12`;
        const response = await fetch(url);
        const data = await response.json();

        const names = data[1] || [];
        setResults(names.map((name: string) => ({ name })));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return { results, loading, searchDrugs, clearResults };
}
