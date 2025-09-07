'use client';

import { Flex, Grid } from '@mantine/core';

export default function Home() {
  return (
    <Grid className="p-6" grow gutter={{ base: 24 }}>
      <Grid.Col span={12}>
        <Flex className="bg-red-900" justify="center">1</Flex>
      </Grid.Col>

      <Grid.Col span={6}>
        <Flex className="bg-red-900" justify="center">2</Flex>
      </Grid.Col>
      <Grid.Col span={6}>
        <Flex className="bg-red-900" justify="center">3</Flex>
      </Grid.Col>

      <Grid.Col span={8}>
        <Flex className="bg-red-900" justify="center">4</Flex>
      </Grid.Col>
      <Grid.Col span={4}>
        <Flex className="bg-red-900" justify="center">5</Flex>
      </Grid.Col>

      <Grid.Col span={12}>
        <Flex className="bg-red-900" justify="center">6</Flex>
      </Grid.Col>
    </Grid>
  );
}
