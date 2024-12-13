"use client";

import { sendDiscordMessage } from "@/app/[locale]/contact-form/contact-form.actions";
import Input from "@/common/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

export default function ContactForm() {
  const t = useTranslations("contactForm");

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await sendDiscordMessage(data);
    console.log(response);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      <h1 className="mb-4 text-xl font-bold text-center">{t("title")}</h1>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <Input label="Name" name="name" register={form.register} />
        <Input label="Email" name="email" register={form.register} />
        <Input label="Message" name="message" register={form.register} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
