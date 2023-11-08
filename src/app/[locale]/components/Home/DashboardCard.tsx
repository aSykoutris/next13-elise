'use client';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import dynamic from 'next/dynamic';
const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false,
});

type DashboardCardProps = {
  title: string;
  count: number;
  footer: string;
  daysCount: string;
  handleClick: () => void;
};

export default function DashboardCard({ title, count, footer, daysCount, handleClick }: DashboardCardProps) {
  return (
    <Card
      shadow="md"
      isPressable
      onPress={() => handleClick()}
      className="min-w-[40%] hover:bg-primary"
      classNames={{
        header: 'justify-center text-xl font-medium text-default-500',
        body: 'place-items-center overflow-visible p-0 self-center justify-center font-bold text-8xl text-primary',
        footer: 'text-center justify-center text-xl font-medium flex flex-col items-center text-default-500',
      }}
    >
      <CardHeader>{title}</CardHeader>
      <CardBody>
        {count !== 0 ? (
          <AnimatedNumbers
            includeComma
            animateToNumber={count}
            configs={[
              { mass: 1, tension: 220, friction: 100 },
              { mass: 1, tension: 180, friction: 130 },
              { mass: 1, tension: 280, friction: 90 },
              { mass: 1, tension: 180, friction: 135 },
              { mass: 1, tension: 260, friction: 100 },
              { mass: 1, tension: 210, friction: 180 },
            ]}
          ></AnimatedNumbers>
        ) : (
          count
        )}
      </CardBody>
      <CardFooter>
        <span>{footer}</span>
        <span>{daysCount}</span>
      </CardFooter>
    </Card>
  );
}
