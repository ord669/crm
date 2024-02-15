import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "z2y3x4w5",
      amount: 135,
      status: "pending",
      email: "user21@example.net",
    },
    {
      id: "v6u7t8s9",
      amount: 210,
      status: "success",
      email: "user22@example.org",
    },
    {
      id: "r0q1p2o3",
      amount: 320,
      status: "failed",
      email: "user23@example.co",
    },
    {
      id: "n4m5l6k7",
      amount: 265,
      status: "processing",
      email: "user24@example.io",
    },
    {
      id: "j8i9h0g1",
      amount: 180,
      status: "pending",
      email: "user25@example.biz",
    },
    {
      id: "f2e3d4c5",
      amount: 95,
      status: "success",
      email: "user26@example.ai",
    },
    {
      id: "b6a7z8y9",
      amount: 230,
      status: "failed",
      email: "user27@example.info",
    },
    {
      id: "x0w1v2u3",
      amount: 110,
      status: "processing",
      email: "user28@example.us",
    },
    {
      id: "t4s5r6q7",
      amount: 340,
      status: "pending",
      email: "user29@example.co.uk",
    },
    {
      id: "p8o9n0m1",
      amount: 290,
      status: "success",
      email: "user30@example.ca",
    },
    {
      id: "l2k3j4i5",
      amount: 200,
      status: "failed",
      email: "user31@example.de",
    },
    {
      id: "h6g7f8e9",
      amount: 155,
      status: "processing",
      email: "user32@example.jp",
    },
    {
      id: "d0c1b2a3",
      amount: 175,
      status: "pending",
      email: "user33@example.mx",
    },
    {
      id: "z4y5x6w7",
      amount: 220,
      status: "success",
      email: "user34@example.it",
    },
    {
      id: "u8v9t0s1",
      amount: 300,
      status: "failed",
      email: "user35@example.br",
    },
    {
      id: "q2r3p4o5",
      amount: 270,
      status: "processing",
      email: "user36@example.kr",
    },
    {
      id: "n6m7l8k9",
      amount: 145,
      status: "pending",
      email: "user37@example.nl",
    },
    {
      id: "j0i1h2g3",
      amount: 190,
      status: "success",
      email: "user38@example.sg",
    },
    {
      id: "f4e5d6c7",
      amount: 120,
      status: "failed",
      email: "user39@example.ru",
    },
    {
      id: "b8a9z0y1",
      amount: 160,
      status: "processing",
      email: "user40@example.es",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container h-full    py-1 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
