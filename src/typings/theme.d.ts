import { DefaultMantineColor, MantineGradient, Tuple } from '@mantine/core';

type CustomColours =
  | 'brand'
  | 'accent-pink'
  | 'accent-green'
  | 'accent-blue'
  | DefaultMantineColor;

type GradientColours = 'brand';

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColours, Tuple<string, 10>>;
  }

  export interface MantineThemeOther {
    gradients: Record<GradientColours, MantineGradient>;
  }
}
