export default async function Home() {
  return (
    <main className="flex justify-center w-screen h-screen">
      <object
        className="size-5/6 border rounded-xl mt-6"
        data="slides/presentation.pdf"
        type="application/pdf"
      ></object>
    </main>
  );
}
