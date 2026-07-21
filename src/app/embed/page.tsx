import EmbedClient from "@/components/EmbedClient";
import { getSession } from "@/lib/getSession";

const EmbedPage = async () => {
  const session = await getSession();
  return (
    <div>
      <EmbedClient ownerId={session?.user?.id!} />
    </div>
  );
};

export default EmbedPage;
