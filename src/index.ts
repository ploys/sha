import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const sha = github.context.payload.pull_request?.head?.sha || github.context.sha

    core.setOutput('sha', sha)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
