import { Box, Button, Text } from "./components";

export default function Home() {
  return (
    <main>
      <Box padding={4} background="blue100">
        <Text variant="h1" marginBottom={3}>
          Welcome to Island UI
        </Text>
        <Text variant="p" marginBottom={4}>
          This is a demonstration of Island UI components in a Turborepo
          monorepo.
        </Text>
        <Button variant="primary">Click Me</Button>
      </Box>
    </main>
  );
}
