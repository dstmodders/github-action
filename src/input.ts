import * as core from '@actions/core';

export interface Input {
  busted: boolean;
  ignoreCheckVersions: boolean;
  ignoreFailure: boolean;
  ignoreSetOutput: boolean;
  ldoc: boolean;
  luacheck: boolean;
  prettier: boolean;
  slack: boolean;
  slackLuacheckFormat: string;
  slackPrettierFormat: string;
  slackStyLuaFormat: string;
  stylua: boolean;
}

function getSlackFormat(name: string): string {
  const value = core.getInput(name);
  if (
    value.length > 0 &&
    (value === 'failures' || value === 'issues' || value === 'passes')
  ) {
    return value;
  }
  if (value.length === 0) {
    return 'issues';
  }
  throw new Error(
    `Invalid ${name} input value. Should be: failures|issues|passes`,
  );
}

export async function get(): Promise<Input> {
  try {
    const input: Input = <Input>{};
    input.busted = core.getBooleanInput('busted');
    input.ignoreCheckVersions = core.getBooleanInput('ignore-check-versions');
    input.ignoreFailure = core.getBooleanInput('ignore-failure');
    input.ignoreSetOutput = core.getBooleanInput('ignore-set-output');
    input.ldoc = core.getBooleanInput('ldoc');
    input.luacheck = core.getBooleanInput('luacheck');
    input.prettier = core.getBooleanInput('prettier');
    input.slack = core.getBooleanInput('slack');
    input.slackLuacheckFormat = getSlackFormat('slack-luacheck-format');
    input.slackPrettierFormat = getSlackFormat('slack-prettier-format');
    input.slackStyLuaFormat = getSlackFormat('slack-stylua-format');
    input.stylua = core.getBooleanInput('stylua');
    return input;
  } catch (error) {
    return Promise.reject(error);
  }
}
