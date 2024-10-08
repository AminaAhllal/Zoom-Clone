"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-bold text-slate-600 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-black">
      <h1 className="text-xl font-bold lg:text-3xl">Salle de réunion personnelle</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]" >
        <Table title="Sujet" description={`${user?.username}'s Salle de réunion`} />
        <Table title="ID de réunion" description={meetingId!} />
        <Table title="Lien d'invitation" description={meetingLink} />
      </div>
      <div className="flex gap-10 items-center justify-center">
        <Button className="bg-blue-1 text-black" onClick={startRoom}>
        Commencer la réunion
        </Button>
        <Button
          className="bg-[#402a23]"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Lien copié",
            });
          }}
        >
          Copier l&apos; invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
