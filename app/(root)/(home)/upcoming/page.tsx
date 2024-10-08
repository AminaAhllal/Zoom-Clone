import CallList from '@/components/CallList';

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-black">
      <h1 className="text-3xl font-bold ">Réunion à venir</h1>

      <CallList type="Prochain" />
    </section>
  );
};

export default UpcomingPage;
