import React from "react";
import JitsiMeetingCard from "../components/JitsiMeetingCard";

export default function MeetingRoom() {
  console.log("meeting room");
  return (
    <div className="w-full h-full">
      {/* <p>MeetingRoom</p> */}
      <JitsiMeetingCard />
    </div>
  );
}
