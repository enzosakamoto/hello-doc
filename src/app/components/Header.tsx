import { Flex, Heading, Separator } from '@radix-ui/themes'

export function Header() {
  return (
    <>
      <Flex justify="between">
        <Heading size="8" weight="bold">
          Hello Doc
        </Heading>
        <Flex gap="6">
          <Heading as="h2" size="5" className="flex items-center">
            Home
          </Heading>
          <Heading as="h2" size="5" className="flex items-center">
            About
          </Heading>
        </Flex>
      </Flex>
      <Separator my="3" size="4" />
    </>
  )
}
