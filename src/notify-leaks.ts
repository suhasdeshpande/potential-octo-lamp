import "dotenv/config";

import { CourierClient, ICourierClient } from "@trycourier/courier";

const client: ICourierClient = CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

export async function notifyLeaks() {
  await client.send({
    message: {
      to: {
        list_id: "pigeons-on-call",
      },
      content: {
        body: "There are leaks in the pipes",
        title: "Pipe leak alert",
      },
      routing: {
        channels: ["sms", "email"],
        method: "all",
      },
    },
  });
}
