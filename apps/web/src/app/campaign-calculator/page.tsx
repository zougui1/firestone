import { env } from '~/env';

export default function CampaignCalculatorPage() {
  return (
    <iframe
      src={env.WAR_MACHINES_APP_URL ?? `http://${env.WAR_MACHINES_APP_DOMAIN}:${env.WAR_MACHINES_APP_PORT}`}
      className="w-screen h-screen border-none"
    />
  );
}
