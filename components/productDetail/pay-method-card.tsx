import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBrandPaypalFilled } from "@tabler/icons-react";

const PayMethodCard: React.FC = () => {
  return (
    <Card className="w-2/3 ml-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Pay method</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 justify-center items-center">
        <IconBrandPaypalFilled size={60} color="blue" />
        <p className="font-semibold">PayPal</p>
      </CardContent>
    </Card>
  );
};

export default PayMethodCard;
