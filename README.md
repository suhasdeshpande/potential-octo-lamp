# potential-octo-lamp

Use [Raspberry PI](https://www.raspberrypi.org/) and [Courier](https://www.courier.com/) to get notified about water leaks.

## Why?

For Fun? But on a serious note, I did experience a leak in our condo. I am a first time house owner and I've been told how serious, expensive and time consuming it can be to fix leaks or any plumbing issues in the USA. While I can't drill holes in dry walls all the time to detect moister nor can I afford to have plumber come in and fix the problem all the time, I started thinking is there a way for me to get _notified_ about this problem the moment it starts becoming a problem? To my surprise, I stumbled upon a hackernews post that explains how one can use Raspberry PI to do what I wanted to accompolish. To my advantage, I didn't have to setup any of the notification system. I would rather learn plumbing than to to build a yet another notification system for my little project, specially didn't make sense when you have Courier. (Not just because I work there, I do not get paid to write this content :D)


## Prerequisite
- [Raspberry Pi 4 Model B](https://www.amazon.com/dp/B07WYC73LF?psc=1&ref=ppx_yo2_dt_b_product_details)
- [Floor Water Sensor for Flood and Leak Detection](https://www.amazon.com/dp/B079YB1T8J?psc=1&ref=ppx_yo2_dt_b_product_details)
- [SanDisk 128GB Ultra MicroSDXC UHS-I Memory Card with Adapter](https://www.amazon.com/dp/B08GYKNCCP?psc=1&ref=ppx_yo2_dt_b_product_details)
- [GPIO Breakout Expansion Kit for Raspberry Pi 4B](https://www.amazon.com/dp/B08736NSPK?psc=1&ref=ppx_yo2_dt_b_product_details)


### Setup

- Sign up to any of your favorite Notification service (Twilio, SendGrid) and [Courier](https://app.courier.com/)
- Configure Twilio in Courier using steps mentioned [here](https://www.courier.com/docs/guides/providers/sms/twilio/)
- Try sending a test notification sms to yourself using following test payload
- Get Authorization Token from your Courier [API Keys page](https://app.courier.com/settings/api-keys)


```ts
import axios from "axios";

(async function notifyMe() {
  const options = {
    method: 'POST',
    url: 'https://p6vem4oy1b.execute-api.us-east-1.amazonaws.com/dev/send',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer pk_prod_N0W3NG57XX4XY6HVC2CH121P1TZR',
    },
    data: {
      message: {
        to: { phone_number: '+14156236302' },
        content: { title: 'hello', body: 'You will get notified about your leaks' },
      },
    },
  };
  await axios.request(options);
})();
```

### Repo setup

Create a `.env` file in the root of the folder with Courier AUTH Token that you can get by signing up for _free_. Your token will look something like following...

```
COURIER_AUTH_TOKEN=pk_prod_EVSN8VH4V54W7MNFV5308TPPX4VT
```

### 
- Setup your Raspberry with Floor Water Sensor for Flood and Leak Detection [Setup](https://www.youtube.com/watch?v=KwKiiWYQies) video gives a good idea on how to connect raspberry pi + flood sensor
- Clone this repo in your Raspberry

```bash
~/c/potential-octo-lamp ❯  npm install
~/c/potential-octo-lamp ❯  npm run build
~/c/potential-octo-lamp ❯  npm run start
```





