'use client';

import { Button } from '@mantine/core';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Vire</h1>
      <Button onClick={() => console.log('Hello!')}>Test Button</Button>
    </div>
  );
}
