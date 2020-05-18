import * as crypto from 'crypto'
import * as path from 'path'
import { stdout } from 'stdout-stderr'

describe('SHA', () => {
  const sha = crypto.createHash('sha1').digest('hex')

  beforeAll(() => {
    process.env.GITHUB_ACTION = 'ployssha'
    process.env.GITHUB_ACTOR = 'ploys'
    process.env.GITHUB_REF = sha
    process.env.GITHUB_REPOSITORY = 'ploys/tests'
    process.env.GITHUB_SHA = sha
    process.env.GITHUB_WORKFLOW = 'ci'
  })

  beforeEach(() => {
    jest.resetModules()
  })

  test('gets the push event sha', async done => {
    process.env.GITHUB_EVENT_NAME = 'push'
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/push.json')

    stdout.start()

    await import('../src')

    stdout.stop()

    expect(stdout.output).toBe(`::set-output name=sha::${sha}\n`)
    done()
  })

  test('gets the pull request event sha', async done => {
    process.env.GITHUB_EVENT_NAME = 'pull_request'
    process.env.GITHUB_EVENT_PATH = path.join(__dirname, 'fixtures/pull_request.json')

    stdout.start()

    await import('../src')

    stdout.stop()

    expect(stdout.output).toBe('::set-output name=sha::4468e5deabf5e6d0740cd1a77df56f67093ec943\n')
    done()
  })
})
