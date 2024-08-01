"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const categoryDiscriminatedUnion = z.discriminatedUnion("categoryId", [
  z.object({
    categoryId: z.literal(1),
    ram: z.string({
      message: "RAM is required.",
    }),
  }),
  z.object({
    categoryId: z.literal(2),
    pages: z
      .string({
        message: "Pages is required.",
      })
      .min(5, {
        message: "Pages must be at least 5.",
      }),
  }),
  z.object({
    categoryId: z.literal(3),
    size: z.string({
      message: "Size is required.",
    }),
  }),
]);

const productFormSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    categoryId: z.number(),
    size: z.string().nullish(), // Clothing
    ram: z.string().nullish(), // Electronics
    pages: z.string().nullish(), // Books
  })
  .and(categoryDiscriminatedUnion);

type ProductFormSchema = z.infer<typeof productFormSchema>;

const SimpleForm = () => {
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: ProductFormSchema) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="mx-auto max-w-[1170px] mb-8 mt-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Category ID"
                    {...field}
                    {...form.register("categoryId", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Size"
                    {...field}
                    value={field.value || undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RAM</FormLabel>
                <FormControl>
                  <Input
                    placeholder="RAM"
                    {...field}
                    value={field.value || undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pages</FormLabel>
                <FormControl>
                  <Input
                    placeholder="pages"
                    {...field}
                    value={field.value || undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SimpleForm;
