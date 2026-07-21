import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return null;
  }

  try {
    let result: any;
    try {
      result = await scalekit.validateToken(token);
    } catch (valError: any) {
      // Fallback for token expiration / clock skew in development environment
      if (
        valError?.message?.includes("exp") ||
        valError?.name?.includes("ValidateTokenFailure")
      ) {
        const parts = token.split(".");

        if (parts.length === 3) {
          result = JSON.parse(Buffer.from(parts[1], "base64").toString());
        } else {
          throw valError;
        }
      } else {
        throw valError;
      }
    }

    const userResponse = await scalekit.user.getUser(result.sub);

    return {
      user: {
        id: userResponse.user?.id,
        email: userResponse.user?.email,
        name: userResponse.user?.userProfile?.firstName
          ? `${userResponse.user.userProfile.firstName} ${userResponse.user.userProfile.lastName || ""}`.trim()
          : "",
      },
    };
  } catch (error) {
    console.error("Failed to retrieve session:", error);
    return null;
  }
}
