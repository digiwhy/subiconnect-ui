export default function IndexPage() {
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 items-center justify-center">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">WorldPay</h1>
      </div>
      <img
        width={64}
        height={64}
        src={'/logo.gif'}
        alt="WorldPay"
        className="w-1/2 h-auto"
      />
    </main>
  );
}
