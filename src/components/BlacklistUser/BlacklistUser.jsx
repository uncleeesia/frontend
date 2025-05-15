import { useEffect, useState } from "react";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import { FaUserSlash, FaUserCheck } from "react-icons/fa";

const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Homeowner", blacklisted: false },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Cleaner", blacklisted: false },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Cleaner", blacklisted: true, reason: "Violation of policy" },
];

const BlacklistUser = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const toggleBlacklist = (user) => {
    if (!user.blacklisted) {
      setSelectedUser(user);
      setShowModal(true);
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, blacklisted: false, reason: "" } : u
        )
      );
    }
  };

  const confirmBlacklist = () => {
    if (!reason.trim()) {
      alert("Please provide a reason for blacklisting.");
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === selectedUser.id
          ? { ...u, blacklisted: true, reason: reason.trim() }
          : u
      )
    );
    setReason("");
    setSelectedUser(null);
    setShowModal(false);
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
                {user.blacklisted && (
                  <p className="text-sm text-red-400 mt-1">
                    Reason: {user.reason}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant={user.blacklisted ? "outline" : "destructive"}
                onClick={() => toggleBlacklist(user)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md">
            <Typography variant="h5" className="text-white mb-2">
              Blacklist {selectedUser?.name}
            </Typography>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for blacklisting"
              className="w-full h-24 p-2 text-sm bg-gray-800 text-white border border-gray-600 rounded-md resize-none mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmBlacklist}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlacklistUser;
