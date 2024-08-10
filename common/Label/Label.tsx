import { Label as ShadcnLabel } from "@/components/ui/label";

type LabelProps = {
  htmlFor: string;
  label: string;
};

function Label({ htmlFor, label }: LabelProps) {
  return <ShadcnLabel htmlFor={htmlFor}>{label}</ShadcnLabel>;
}

export default Label;
