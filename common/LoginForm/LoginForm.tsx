import { useTranslations } from "next-intl";

const LoginForm = () => {
  const t = useTranslations("home");

  return (
    <form>
      <div className="mb-4 font-semibold">{t("title")}</div>
    </form>
  );
};

export default LoginForm;
