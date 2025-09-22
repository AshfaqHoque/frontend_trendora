"use client";
import { useEffect } from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export default function BeamsInit() {
useEffect(() => {
if (typeof window === "undefined") return;

const init = async () => {
  try {
    // Make sure /service-worker.js exists (see step above)
    const registration = await navigator.serviceWorker.register("/service-worker.js");

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notifications not granted");
      return;
    }

    const beamsClient = new PusherPushNotifications.Client({
      instanceId: "a28916f1-afbf-4114-86f8-d0b25639c37b",
    });

    await beamsClient.start();
    await beamsClient.addDeviceInterest("hello");
    console.log("Successfully registered and subscribed!");
  } catch (e) {
    console.error("Beams init error:", e);
  }
};

init();
}, []);

return null;
}