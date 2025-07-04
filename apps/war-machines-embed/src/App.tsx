import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { WarMachines } from './features/war-machines/screens/WarMachines';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WarMachines />
    </QueryClientProvider>
  );
}
