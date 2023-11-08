'use client';
import { Card, Skeleton, Snippet } from '@nextui-org/react';

export default function loading() {
  return (
    <section className="container mx-auto flex flex-col  justify-items-center items-center gap-10">
      {/* <Skeleton className='mt-20 w-max rounded-lg'>
        <div className='font-bold text-center text-2xl mt-20'>
          <Skeleton className='h-0.5 w-36 rounded-lg' />
        </div>
      </Skeleton>

      <div className='text-center'></div> */}

      <section className="container mx-auto place-content-stretch place-items-center sm:place-items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4  auto-rows-auto">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Card className="flex justify-between w-[30em] space-y-10 p-4" radius="md" key={i}>
              <Skeleton className="rounded-lg">
                <div className=" h-14 rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-lg">
                <Snippet
                  size="sm"
                  symbol=""
                  tooltipProps={{
                    color: 'foreground',
                    content: 'Copy this snippet',
                    placement: 'top',
                    closeDelay: 0,
                  }}
                  variant="bordered"
                  color="default"
                  classNames={{
                    pre: 'text-sm font-medium',
                    copyButton: 'hover:text-primary',
                  }}
                >
                  1234567890
                </Snippet>
              </Skeleton>
            </Card>
          ))}
      </section>
    </section>
  );
}
