import { useEffect, useState } from "react";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import { FaUserSlash, FaUserCheck } from "react-icons/fa";

const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Homeowner", blacklisted: false },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Cleaner", blacklisted: false },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Cleaner", blacklisted: true },
];

const BlacklistUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // In real case, fetch from API or localStorage
    setUsers(mockUsers);
  }, []);

  const toggleBlacklist = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, blacklisted: !user.blacklisted } : user
      )
    );
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-5 bg-gray-800">
      <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-xl shadow-lg">
        <Typography variant="h4" className="text-white text-center mb-4">
          Admin - Manage Blacklist
        </Typography>

        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
            >
              <div>
                <Typography variant="h6" className="text-white">
                  {user.name} ({user.role})
                </Typography>
                <p className="text-sm text-gray-300">{user.email}</p>
              </div>
              <Button
                type="button"
                variant={user.blacklisted ? "outline" : "destructive"}
                onClick={() => toggleBlacklist(user.id)}
              >
                {user.blacklisted ? (
                  <span className="flex items-center gap-1">
                    <FaUserCheck /> Unblacklist
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <FaUserSlash /> Blacklist
                  </span>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlacklistUser;
