import Input from "@/common/Input/Input";
import LoginForm from "@/common/LoginForm/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      <h1 className="mb-4 text-xl font-bold text-center">{t("title")}</h1>
      <Input
        label="Petar Georgiev"
        value="The starter will get better"
        name="peturgeorgievv"
      />
      <LoginForm />
    </main>
  );
}
