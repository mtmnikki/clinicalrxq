import { useCallback } from 'react';
import { MEDICATION_CLASSES, CLASS_DISPLAY_NAMES } from '../lib/constants';

export function useMedicationClass() {
  const detectClass = useCallback((drugName: string): string => {
    if (!drugName) return '';

    const lowerName = drugName.toLowerCase();

    for (const [classKey, drugs] of Object.entries(MEDICATION_CLASSES)) {
      for (const drug of drugs) {
        if (lowerName.includes(drug.toLowerCase())) {
          return CLASS_DISPLAY_NAMES[classKey] || classKey;
        }
      }
    }

    return '';
  }, []);

  return { detectClass };
}
