export default async function Home() {
  return (
    <main className="flex justify-center size-full">
      <object
        className="size-5/6 border rounded-xl mt-6"
        data="slides/presentation.pdf"
        type="application/pdf"
      ></object>
    </main>
  );
}
