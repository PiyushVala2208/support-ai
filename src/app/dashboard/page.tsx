import DashboardClient from "@/components/DashboardClient";
import { getSession } from "@/lib/getSession";

const DashboardPage = async () => {
  const session = await getSession();

  return (
    <>
      <DashboardClient ownerId={session?.user?.id!} />
    </>
  );
};

export default DashboardPage;
