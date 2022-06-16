import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import "./../src/index.css";

configure(require.context("../src", true, /\.stories\.(js|mdx|tsx)$/), module);
configure(require.context("../examples", true, /\.stories\.(js|mdx|tsx)$/), module);
addDecorator(withKnobs);
