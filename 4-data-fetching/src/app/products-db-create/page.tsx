import { addProduct } from "@/prisma-pg";
import { redirect } from "next/navigation";
import { Submit } from "../components/submit";

export default function AddProductPage() {
  async function createProduct(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    await addProduct(title, parseInt(price), description);

    redirect("/products-db");
  }

  return (
    <form action={createProduct} className="p-4 space-y-4 max-w-96">
      <label className="text-zinc-400">
        Title
        <input
          type="text"
          className="block w-full p-2 text-black border rounded"
          name="title"
        />
      </label>
      <label className="text-zinc-400">
        Price
        <input
          type="number"
          className="block w-full p-2 text-black border rounded"
          name="price"
        />
      </label>
      <label className="text-zinc-400">
        Description
        <textarea
          className="block w-full p-2 text-black border rounded"
          name="description"
        />
      </label>
      <Submit />
    </form>
  );
}
