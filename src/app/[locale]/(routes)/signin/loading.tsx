'use client';
import { Skeleton } from '@nextui-org/react';

export default function SignInPage() {
  return (
    <section className=" flex justify-center px-6 py-12">
      <Skeleton className="rounded-lg w-1/3  h-[30rem] self-center">
        <div className="flex  min-h-full flex-col justify-center px-6 py-12 lg:px-8"></div>
      </Skeleton>
    </section>
  );
}
