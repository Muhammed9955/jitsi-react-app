import { JitsiMeeting } from "@jitsi/react-sdk";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function JitsiMeetingCard() {
  let navigate = useNavigate();
  let params = useParams();
  console.log({ params });
  const roomName =
    params.type === "DOC"
      ? `ptdronlineid${params.id}`
      : `pthcponlineid${params.id}`;
  return (
    <JitsiMeeting
      configOverwrite={{
        startWithAudioMuted: true,
        hiddenPremeetingButtons: ["microphone"],
      }}
      roomName={roomName}
      getIFrameRef={(node) => (node.style.height = "100vh")}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      }}
      onReadyToClose={() => {
        window.location.replace("/");

        navigate("/");
      }}
    />
  );
}
