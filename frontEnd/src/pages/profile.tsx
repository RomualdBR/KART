import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<{ id: number; pseudo: string; mail: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user data...");
      const token = localStorage.getItem("token");
      if (!token){
        return console.error("No token found, user is not authenticated");
      }

      try {
        const response = await fetch("http://localhost:3000/api/user/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log("User data fetched successfully:", userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <h2>Profile Information</h2>
          <p>ID: {user.id}</p>
          <p>Pseudo: {user.pseudo}</p>
          <p>Email: {user.mail}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}