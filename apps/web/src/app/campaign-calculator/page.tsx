import { env } from '~/env';

export default function CampaignCalculatorPage() {
  return (
    <iframe
      src={`http://localhost:${env.WAR_MACHINES_APP_PORT}`}
      className="w-screen h-screen border-none"
    />
  );
}
