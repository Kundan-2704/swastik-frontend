import ProfileFieldCard from "./ProfileFieldCard";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const UserDetails = () => {
  const { user } = useAppSelector((state) => state.user);

  const completion = Math.min(
    100,
    (user?.fullName ? 30 : 0) +
      (user?.email ? 30 : 0) +
      (user?.mobile ? 40 : 0)
  );

  return (
    <div className="space-y-6">

      {/* PROFILE COMPLETION */}
      <div className="bg-[#FFF5E7] p-4 rounded-xl border border-[#E3D4B6]">
        <p className="text-sm font-medium mb-2">Profile Completion</p>
        <div className="w-full bg-[#E3D4B6] h-2 rounded-full">
          <div
            className="h-2 bg-[#B9935A] rounded-full transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* BASIC INFO */}
      <ProfileFieldCard keys="Name" value={user?.fullName} />
      <ProfileFieldCard keys="Email" value={user?.email} />
      <ProfileFieldCard keys="Mobile" value={user?.mobile || "Not Provided"} />

      {/* SECURITY */}
      <ProfileFieldCard keys="Password" value="********" />
      <ProfileFieldCard keys="Last Login" value="Today" />

      {/* PREFERENCES */}
      <ProfileFieldCard keys="Language" value="English" />
      <ProfileFieldCard keys="Notifications" value="Enabled" />

      {/* DANGER ZONE */}
      <div className="border border-red-300 bg-red-50 p-4 rounded-xl">
        <button className="text-red-600 text-sm font-medium">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
