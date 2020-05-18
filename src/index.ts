import * as core from '@actions/core'
import * as github from '@actions/github'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    const sha = github.context.payload.pull_request?.head?.sha || github.context.sha
    let short = ''

    await exec.exec('git', ['rev-parse', '--short', sha], {
      listeners: {
        stdout: (data: Buffer) => {
          short += data.toString()
        },
      },
    })

    core.setOutput('sha', sha)
    core.setOutput('short', short.trim())
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
