import { useState, useCallback } from 'react';
import type { NPIResult } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function useNPILookup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupNPI = useCallback(async (npi: string): Promise<NPIResult | null> => {
    if (!npi || npi.length !== 10) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/npi-lookup?npi=${npi}`,
        {
          headers: {
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch NPI data');
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setError('NPI not found');
        return null;
      }

      const result = data.results[0];
      const basic = result.basic || {};
      const addresses = result.addresses || [];
      const practiceAddress = addresses.find((a: { address_purpose: string }) => a.address_purpose === 'LOCATION') || addresses[0] || {};
      const taxonomies = result.taxonomies || [];
      const primaryTaxonomy = taxonomies.find((t: { primary: boolean }) => t.primary) || taxonomies[0] || {};

      let name = '';
      if (basic.organization_name) {
        name = basic.organization_name;
      } else {
        const firstName = basic.first_name || '';
        const lastName = basic.last_name || '';
        name = `${firstName} ${lastName}`.trim();
      }

      let credentials = basic.credential || '';
      if (!credentials && primaryTaxonomy.license) {
        credentials = primaryTaxonomy.license;
      }

      const mapCredentials = (cred: string): string => {
        const upper = cred.toUpperCase();
        if (upper.includes('M.D.') || upper.includes('MD')) return 'MD';
        if (upper.includes('D.O.') || upper.includes('DO')) return 'DO';
        if (upper.includes('NP') || upper.includes('NURSE PRACTITIONER')) return 'NP';
        if (upper.includes('PA-C') || upper.includes('PA')) return 'PA';
        if (upper.includes('CNM')) return 'CNM';
        if (upper.includes('DDS') || upper.includes('DMD')) return 'DDS / DMD';
        return 'Other';
      };

      const mappedCredentials = credentials ? mapCredentials(credentials) : '';

      const city = practiceAddress.city || '';
      const state = practiceAddress.state || '';
      const location = city && state ? `${city}, ${state}` : city || state || '';

      let practiceType = '';
      if (primaryTaxonomy.desc) {
        const desc = primaryTaxonomy.desc.toLowerCase();
        if (desc.includes('primary care') || desc.includes('family') || desc.includes('internal medicine') || desc.includes('general practice')) {
          practiceType = 'Primary Care';
        } else if (desc.includes('urgent care')) {
          practiceType = 'Urgent Care';
        } else if (desc.includes('hospital') || desc.includes('inpatient')) {
          practiceType = 'Hospital / Inpatient';
        } else if (desc.includes('long-term') || desc.includes('nursing')) {
          practiceType = 'Long-Term Care (LTC)';
        } else if (desc.includes('emergency')) {
          practiceType = 'Emergency Department';
        } else if (desc.includes('obstetric') || desc.includes('gynecol')) {
          practiceType = 'OB/GYN';
        } else if (desc.includes('psychiatr') || desc.includes('mental') || desc.includes('behavioral')) {
          practiceType = 'Behavioral Health';
        } else if (desc.includes('specialist') || desc.includes('cardio') || desc.includes('neuro') || desc.includes('oncol') || desc.includes('dermat')) {
          practiceType = 'Specialty Clinic';
        }
      }

      return {
        number: result.number,
        name,
        credentials: mappedCredentials,
        location,
        practiceType
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to lookup NPI');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { lookupNPI, loading, error };
}
