// noinspection HtmlUnknownTarget

import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Group, Title, useMantineTheme } from '@mantine/core';
import styles from './index.module.scss';
import Button from '@components/base/Button';
import CTAButton from '@components/base/CTAButton';
import { ArrowUpRight } from 'tabler-icons-react';

const Home: NextPage = () => {
  const { other, colors } = useMantineTheme();

  return (
    <div className={styles.container}>
      <Head>
        <title>Voyage UI components</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Title order={3} style={{ color: 'white', textAlign: 'center' }}>
            Buttons
          </Title>
          <Group direction="column">
            <Group>
              <Button size="s">Primary small</Button>
              <Button>Primary Regular</Button>
              <Button size="l">Primary Large</Button>
              <Button size="xl">Primary XL</Button>
            </Group>
            <Group>
              <Button size="s" kind="secondary">
                Primary small
              </Button>
              <Button kind="secondary">Primary Regular</Button>
              <Button size="l" kind="secondary">
                Primary Large
              </Button>
              <Button size="xl" kind="secondary">
                Primary XL
              </Button>
            </Group>
            <Group>
              <Button kind="cancel" size="s">
                Primary small
              </Button>
              <Button kind="cancel">Primary Regular</Button>
              <Button kind="cancel" size="l">
                Primary Large
              </Button>
              <Button kind="cancel" size="xl">
                Primary XL
              </Button>
            </Group>
            <Group>
              <Button loading>Primary Regular</Button>
              <Button loading size="l">
                Primary Large
              </Button>
              <Button loading size="xl">
                Primary XL
              </Button>
            </Group>
            <Group>
              <Button disabled size="s">
                Primary small
              </Button>
              <Button disabled>Primary Regular</Button>
              <Button disabled size="l">
                Primary Large
              </Button>
              <Button disabled size="xl">
                Primary XL
              </Button>
            </Group>
          </Group>
        </div>
        <div>
          <Title order={3} style={{ color: 'white', textAlign: 'center' }}>
            Call to action
          </Title>
          <Group direction="column">
            <Group>
              <CTAButton>Call to action</CTAButton>
              <CTAButton
                icon={
                  <ArrowUpRight
                    color={colors.brand[6]}
                    style={{ padding: 4 }}
                  />
                }
              >
                Call to action
              </CTAButton>
              <CTAButton
                icon={
                  <ArrowUpRight
                    color={colors.brand[6]}
                    style={{ padding: 4 }}
                  />
                }
                iconPosition="right"
              >
                Call to action
              </CTAButton>
            </Group>
          </Group>
        </div>
      </main>
    </div>
  );
};

export default Home;
