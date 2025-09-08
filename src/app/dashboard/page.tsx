import { Flex, Grid, GridCol } from '@mantine/core';


const DashboardPage = () => {
  return (
    <Grid className="p-6" grow gutter={{ base: 24 }}>
      <GridCol span={12}>
        <Flex className="bg-red-900" justify="center">1</Flex>
      </GridCol>

      <GridCol span={6}>
        <Flex className="bg-red-900" justify="center">2</Flex>
      </GridCol>
      <GridCol span={6}>
        <Flex className="bg-red-900" justify="center">3</Flex>
      </GridCol>

      <GridCol span={8}>
        <Flex className="bg-red-900" justify="center">4</Flex>
      </GridCol>
      <GridCol span={4}>
        <Flex className="bg-red-900" justify="center">5</Flex>
      </GridCol>

      <GridCol span={12}>
        <Flex className="bg-red-900" justify="center">6</Flex>
      </GridCol>
    </Grid>
  );
}

export default DashboardPage;