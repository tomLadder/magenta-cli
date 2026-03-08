#!/usr/bin/env bun
import { createCLI } from './cli/index.ts';

const program = createCLI();
program.parse(process.argv);
