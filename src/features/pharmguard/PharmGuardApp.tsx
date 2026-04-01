import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TabNav, TabType } from './components/TabNav';
import { LogForm } from './components/LogForm';
import { Dashboard } from './components/Dashboard';
import { History } from './components/History';
import { Toast } from './components/Toast';
import { useInterventions } from './hooks/useInterventions';
import type { InterventionFormData } from './types';

export function PharmGuardApp() {
  const [activeTab, setActiveTab] = useState<TabType>('log');
  const [pharmacySite, setPharmacySite] = useState('');
  const [pharmacistId, setPharmacistId] = useState('');
  const [toast, setToast] = useState<{ message: string; isError: boolean } | null>(null);

  const { interventions, loading, addIntervention, clearAllInterventions } = useInterventions();

  const showToast = useCallback((message: string, isError = false) => {
    setToast({ message, isError });
  }, []);

  const handleSubmit = useCallback(async (data: InterventionFormData): Promise<boolean> => {
    const success = await addIntervention(data);
    if (success) {
      showToast('Intervention logged successfully');
    } else {
      showToast('Failed to save intervention. Please try again.', true);
    }
    return success;
  }, [addIntervention, showToast]);

  const handleClearAll = useCallback(async (): Promise<boolean> => {
    const success = await clearAllInterventions();
    if (success) {
      showToast('All data cleared.');
    } else {
      showToast('Failed to clear data. Please try again.', true);
    }
    return success;
  }, [clearAllInterventions, showToast]);

  return (
    <div className="min-h-screen bg-[#F4EFE5] text-[#1A1825] font-sans bg-[linear-gradient(rgba(26,24,37,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(26,24,37,0.045)_1px,transparent_1px)] bg-[size:32px_32px]">
      <Header
        pharmacySite={pharmacySite}
        pharmacistId={pharmacistId}
        onPharmacySiteChange={setPharmacySite}
        onPharmacistIdChange={setPharmacistId}
      />
      <TabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        interventionCount={interventions.length}
      />
      <main className="max-w-[960px] mx-auto px-3 sm:px-6 py-4 sm:py-7 pb-12 sm:pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#1B3460] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'log' && (
              <LogForm
                pharmacySite={pharmacySite}
                pharmacistId={pharmacistId}
                onSubmit={handleSubmit}
              />
            )}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'history' && (
              <History
                interventions={interventions}
                onClearAll={handleClearAll}
              />
            )}
          </>
        )}
      </main>
      {toast && (
        <Toast
          message={toast.message}
          isError={toast.isError}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}


