export default function UserInfo(token: string) {
  const fetchLoggedUserInfo = async () => {
    try {
      if (!token) {
        throw new Error("No token provided");
      }

      const response = await fetch(`http://localhost:3000/userlogged`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userInfo = await response.json();

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      return userInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  return fetchLoggedUserInfo();
}
