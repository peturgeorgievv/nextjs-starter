"use server";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactFormResponse = {
  message?: string;
  error?: string;
};

export async function sendDiscordMessage(
  data: ContactFormData
): Promise<ContactFormResponse> {
  const { name, email, message } = data;

  const payload = {
    embeds: [
      {
        title: "[Contact Form] New message",
        fields: [
          { name: "Name", value: name },
          { name: "Email", value: email },
          { name: "Message", value: message },
        ],
      },
    ],
  };

  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.error("Discord webhook URL is not set");
    return { error: "Something went wrong" };
  }

  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { message: "Message sent successfully" };
    } else {
      return { error: "Failed to send message" };
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Failed to send message" };
  }
}
